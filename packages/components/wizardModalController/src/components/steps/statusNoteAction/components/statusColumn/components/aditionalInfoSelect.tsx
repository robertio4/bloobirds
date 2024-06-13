import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import { BobjectTypes, FIELDS_LOGIC_ROLE, FieldsEntity } from '@bloobirds-it/types';
import {
  api,
  getSobjectTypeFromBobject,
  getValueFromLogicRole,
  isContactSalesforce,
  Sobject,
} from '@bloobirds-it/utils';
import { CustomObjectField, StatusRestrictionInterface } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';

import { ChangeStatusStepDataProps } from '../../../../../../hooks/useChangeStatusStepData';
import { SobjectMandatoryFields } from '../../../../changeStatusSalesforce/animatedSidebar/components/sobjectMandatoryFields';
import { useStatusNoteActionContext } from '../../../hooks/useStatusNoteActions';
import styles from '../statusColumn.module.css';
import { isStatusWithReason, shouldBeAssigned } from '../statusColumnUtils';

//TODO refactor this
const dictionary: Record<Sobject, Record<'resourceField' | 'annexTitle', string>> = {
  Opportunity: {
    resourceField: 'opportunityStatus',
    annexTitle: 'Opportunity status dependencies',
  },
  Lead: { resourceField: 'leadStatus', annexTitle: 'Lead status dependencies' },
  Contact: { resourceField: 'leadStatus', annexTitle: 'Contact status dependencies' },
  Account: { resourceField: 'companyStatus', annexTitle: 'Company status dependencies' },
};

function parseStatusRestrictions(
  salesforceStatusFieldsRequirements: StatusRestrictionInterface[],
  datamodelFields: FieldsEntity[],
) {
  return salesforceStatusFieldsRequirements.reduce((acc, restriction) => {
    acc[restriction.salesforceStatus] = restriction.fields
      .map(({ field, required }) => {
        const matchingField = datamodelFields?.find(({ name }) => name === field);
        if (!matchingField) return null;
        return {
          ...matchingField,
          required,
        };
      })
      ?.filter(Boolean);
    return acc;
  }, {});
}

function parseRequirements(
  salesforceStatusFieldsRequirements: any,
  salesforceDataModelFields: ReturnType<typeof useSalesforceDataModel>['types'],
) {
  return salesforceStatusFieldsRequirements?.reduce((acc, sobject) => {
    const typeInfos = salesforceDataModelFields?.[sobject.objectType.toLowerCase()];
    acc[dictionary[sobject.objectType].resourceField] = parseStatusRestrictions(
      sobject.statusRestrictions,
      typeInfos?.fields,
    );
    return acc;
  }, {} as Record<keyof ChangeStatusStepDataProps, { [status: string]: CustomObjectField[] }>);
}

export const getIconName = bobject => {
  switch (bobject?.id?.typeName) {
    case BobjectTypes.Company:
      return 'company';
    case BobjectTypes.Lead:
      return isContactSalesforce(bobject) ? 'sfdcContacts' : 'personBody';
    case BobjectTypes.Opportunity:
      return 'sfdcOpp';
  }
};

export const AdditionalInfoSelect = () => {
  const {
    bobject,
    handleSelectedStatus: [selectedStatus],
    availableReasons,
    availableUsers,
    handleErrors: [errors],
    handleSelectedReason: [selectedReason, setSelectedReason],
    handleSelectedUser: [selectedUser, setSelectedUser],
    hasNoStatusPlanEnabled,
    buttonsConfig,
  } = useStatusNoteActionContext();
  const { setValue } = useFormContext();
  const { t } = useTranslation();
  const [salesforceError, setSalesforceError] = useState(undefined);
  const bobjectType = bobject?.id?.typeName;
  const isAssigned =
    !!bobject?.assignedTo ||
    !!getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType]?.ASSIGNED_TO);
  const needsAssignedTo = shouldBeAssigned(isAssigned, selectedStatus, hasNoStatusPlanEnabled);
  const reasonedStatus = isStatusWithReason(
    selectedStatus,
    hasNoStatusPlanEnabled && buttonsConfig?.salesforceStatusFields,
  );
  const salesforceDataModel = useSalesforceDataModel();

  const parsedRequirements = parseRequirements(
    buttonsConfig?.salesforceStatusFields,
    salesforceDataModel?.types,
  );
  const aditionalInfoNeeded = needsAssignedTo || reasonedStatus;
  const parsedReqKey = `${bobjectType.toLowerCase()}Status`;
  const canShowNoStatusReqFields =
    hasNoStatusPlanEnabled && !!parsedRequirements?.[parsedReqKey]?.[selectedStatus?.name];
  const sobject = getSobjectTypeFromBobject(bobject);

  useEffect(() => {
    const salesforceId = bobject?.salesforceId;
    const valuesToMap = new Map();
    if (buttonsConfig?.salesforceStatusFields?.length > 0) {
      //Todo use this for getting all the fields
      //buttonsConfig.salesforceStatusFields.forEach(salesforceField => {
      const salesforceField = buttonsConfig?.salesforceStatusFields.find(
        fields => fields.objectType === sobject,
      );
      const sobjectName = salesforceField?.objectType;
      const sobjectFields = salesforceField?.statusRestrictions?.flatMap(status =>
        status?.fields?.map(({ field }) => field),
      );
      api
        .post('/utils/service/salesforce/query', {
          query: `SELECT ${sobjectFields?.join(
            ',',
          )} FROM ${sobjectName} WHERE Id='${salesforceId}'`,
        })
        .then(data => {
          const sobjectValues = data?.data?.reduce((acc, field) => {
            if (field) {
              const fieldValues = Object.entries(field)?.filter(
                ([_, value]) => typeof value === 'string',
              );
              return fieldValues?.reduce((acc, [key, value]) => {
                return {
                  ...acc,
                  [key]: value,
                };
              }, {});
            } else {
              return acc;
            }
          }, {});
          const statusFields = salesforceField?.statusRestrictions?.reduce((acc, status) => {
            return {
              ...acc,
              [status.salesforceStatus]: status?.fields?.reduce((acc, fieldValue) => {
                return { ...acc, [fieldValue.field]: sobjectValues?.[fieldValue.field] };
              }, {}),
            };
          }, {});
          valuesToMap.set(sobjectName, statusFields);
          setValue('salesforceLiveFieldsValues', valuesToMap);
        })
        .catch(errors => {
          const errorString = errors?.response?.data?.message;
          const startIndex = errorString?.indexOf("No such column '");
          const endIndex = errorString?.indexOf("'", startIndex + 16);

          // Extract the error message
          const errorMessage = errorString?.substring(startIndex, endIndex + 1);
          if (errorMessage) setSalesforceError(errorMessage);
        });
    }
  }, []);

  useEffect(() => {
    if (parsedRequirements?.[parsedReqKey]?.[selectedStatus?.name]) {
      setSalesforceError(undefined);
    }
  }, [parsedRequirements?.[parsedReqKey]?.[selectedStatus?.name]]);
  if (!aditionalInfoNeeded) return null;

  return (
    <>
      {reasonedStatus ? (
        canShowNoStatusReqFields ? (
          <div style={{ marginTop: '8px' }}>
            <SobjectMandatoryFields
              iconName={getIconName(bobject)}
              title={dictionary[sobject]?.annexTitle}
              statuses={parsedRequirements[parsedReqKey]?.[selectedStatus?.name]}
              sobject={sobject as Sobject}
              selectedStatus={selectedStatus?.name}
              width="92%"
              error={salesforceError}
            />
          </div>
        ) : (
          availableReasons?.values?.length > 0 && (
            <div className={styles._section__wrapper}>
              <div className={clsx(styles._title__wrapper, styles._title__wrapper__centered)}>
                <Text size="m" weight="medium" color="peanut">
                  {t('changeStatusModal.reasonedStatus.title')}
                </Text>
              </div>
              <div className={styles._content__wrapper}>
                <div className={styles._reason__wrapper}>
                  <Select
                    value={selectedReason}
                    placeholder={t('changeStatusModal.reasonedStatus.placeholder', {
                      bobjectType,
                      selectedStatus: selectedStatus?.name,
                      required: availableReasons.isRequired ? '*' : '',
                    })}
                    width="100%"
                    size="small"
                    onChange={setSelectedReason}
                    error={errors?.statusReason}
                  >
                    {availableReasons?.values?.map(reason => (
                      <Item key={reason.value} value={reason}>
                        {reason.label}
                      </Item>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          )
        )
      ) : null}
      {needsAssignedTo && (
        <div className={styles._section__wrapper}>
          <div className={clsx(styles._title__wrapper, styles._title__wrapper__centered)}>
            <Text size="m" weight="medium" color="peanut">
              {t(`changeStatusModal.assignedTo.${bobjectType}`)}
            </Text>
          </div>
          <div className={styles._content__wrapper}>
            <div className={styles._reason__wrapper}>
              {availableUsers && (
                <Select
                  value={selectedUser?.id}
                  placeholder={t('changeStatusModal.assignedTo.placeholder', {
                    required: availableUsers.isRequired ? '*' : '',
                  })}
                  width="100%"
                  error={errors?.assignedUser}
                  size="small"
                >
                  {availableUsers.values?.map((user: any) => (
                    <Item
                      key={`user-assigned-item-${user?.id}`}
                      value={user?.id}
                      onClick={() => setSelectedUser(user)}
                    >
                      {user.name}
                    </Item>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
