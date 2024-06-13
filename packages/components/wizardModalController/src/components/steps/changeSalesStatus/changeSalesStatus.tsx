import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  Item,
  Label,
  ModalContent,
  ModalFooter,
  ModalSection,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import {
  BobjectField,
  BobjectType,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getValueFromLogicRole, isLead } from '@bloobirds-it/utils';
import {
  useWizardContext,
  WIZARD_MODALS,
  WizardsModalParams,
} from '@bloobirds-it/wizard-modal-context';
import useSWR from 'swr';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import { useChangeStatusStepData } from '../../../hooks/useChangeStatusStepData';
import { useStatusPicklistValue } from '../../../hooks/useStatusPicklistValue';
import { AVAILABLE_COMPANY_STATUSES, AVAILABLE_LEAD_STATUSES } from './changeSalesStatus.constants';
import styles from './changeSalesStatus.module.css';

interface ChangeSalesStatusProps extends WizardsModalParams {
  handleNext: (companyStatus: string, leadStatus: string) => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
  handleBack?: () => void;
  wizardKey?: WIZARD_MODALS;
}

interface BobjectStatus {
  name: string;
  logicRole: string;
  backgroundColor: string;
  outlineColor: string;
  textColor: string;
}

interface Reason {
  label: string;
  value: string;
}
//TODO refactor
const updateEntity = (idValue: string, data: any) => api.patch(`/bobjects/${idValue}/raw`, data);

const fetcherReason = (url: string) => api.get(url);

const getStatusName = (statusLogicRole: string) => {
  const status = statusLogicRole.split('__')[2];

  return status?.toLowerCase();
};
//TODO this should be COMPLETELY redone
const ChangeSalesStatus = ({
  handleBack,
  handleNext,
  handleSkip,
  buttonsConfig,
  wizardKey,
}: ChangeSalesStatusProps) => {
  const { getWizardProperties } = useWizardContext();
  const { referenceBobject } = getWizardProperties(wizardKey);
  const dataModel = useDataModel();
  const { t } = useTranslation();
  const [selectedReasons, setSelectedReasons] = useState<Array<Reason>>();
  const { changeStatusStepData, setChangeStatusStepData } = useChangeStatusStepData();

  const { activityCompany: company, activityLead: lead } = useActivityRelatedInfo(wizardKey);
  const {
    leadSalesStatusPicklistValues,
    companySalesStatusPicklistValues,
  } = useStatusPicklistValue(dataModel);

  const referenceBobjectType = referenceBobject?.id?.typeName as 'Company' | 'Lead';
  const hasLeadReference = isLead(referenceBobject);
  const mainBobjectStatusKey = `${referenceBobjectType?.toLowerCase()}Status`;

  const salesStatusField = hasLeadReference
    ? getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS)
    : getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS);
  const referenceBobjectName = hasLeadReference
    ? getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
    : getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : true;

  const { data: reasons } = useSWR(
    `/utils/service/view/field/statusReasons/${referenceBobjectType}?stage=SALES`,
    fetcherReason,
  );

  const getStatusValues = () => {
    const statusPicklistValues = hasLeadReference
      ? leadSalesStatusPicklistValues
      : companySalesStatusPicklistValues;
    const availableStatus = hasLeadReference
      ? AVAILABLE_LEAD_STATUSES
      : (AVAILABLE_COMPANY_STATUSES as string[]);
    return statusPicklistValues
      .filter(fieldStatus => availableStatus.indexOf(fieldStatus.logicRole) > -1)
      .sort((a, b) => availableStatus?.indexOf(a.logicRole) - availableStatus?.indexOf(b.logicRole))
      .map(fieldStatus => ({
        name: fieldStatus.name,
        logicRole: fieldStatus.logicRole,
        backgroundColor: fieldStatus.backgroundColor,
        outlineColor: fieldStatus.outlineColor,
        textColor: fieldStatus.textColor,
      }));
  };
  const isNurturing = changeStatusStepData[mainBobjectStatusKey]?.includes('NURTURING');
  const isDiscarded = changeStatusStepData[mainBobjectStatusKey]?.includes('DISCARDED');
  const bobjectStatuses = getStatusValues();

  useEffect(() => {
    if (salesStatusField) {
      setChangeStatusStepData({
        ...changeStatusStepData,
        //TODO this should be solved beforehand
        ...(!changeStatusStepData[mainBobjectStatusKey]
          ? {
              [mainBobjectStatusKey]: (hasLeadReference
                ? leadSalesStatusPicklistValues.find(
                    field => field.logicRole === salesStatusField.valueLogicRole,
                  )
                : companySalesStatusPicklistValues.find(
                    field => field.logicRole === salesStatusField.valueLogicRole,
                  )
              )?.logicRole,
            }
          : {}),
        [`${referenceBobjectType?.toLowerCase()}ReasonToDiscard`]: Array.isArray(selectedReasons)
          ? selectedReasons[0]
          : undefined,
      });
    }
  }, [referenceBobject?.id?.objectId, selectedReasons]);

  useEffect(() => {
    if (isNurturing || isDiscarded) {
      const bobjectTypeName = referenceBobjectType.toUpperCase();
      const bobjectStatus = changeStatusStepData[mainBobjectStatusKey].split('__')[2];
      const reasonsField = reasons?.data.find(
        (field: BobjectField) =>
          field.logicRole === `${bobjectTypeName}__SALES_${bobjectStatus}_REASONS`,
      );
      if (reasonsField) {
        setSelectedReasons(reasonsField.fieldValues);
      }
    }
  }, [changeStatusStepData[mainBobjectStatusKey], reasons]);

  const save = (id: string, status: string, entity: BobjectType, reasonToDiscard: any) => {
    const bobjectTypeName = entity?.toUpperCase();
    const bobjectStatus = status?.split('__')[2];
    let data = {
      [`${bobjectTypeName}__SALES_STATUS`]: status,
    };

    if (reasonToDiscard && (status?.includes('NURTURING') || status?.includes('DISCARDED'))) {
      data = {
        ...data,
        [`${bobjectTypeName}__SALES_${bobjectStatus}_REASONS`]: reasonToDiscard.value,
      };
    }

    updateEntity(referenceBobject.id.value, data);
  };

  const saveAndClose = () => {
    if (hasLeadReference) {
      save(
        lead?.id.objectId,
        changeStatusStepData.leadStatus,
        BobjectTypes.Lead,
        changeStatusStepData.leadReasonToDiscard,
      );
    } else {
      save(
        company?.id.objectId,
        changeStatusStepData.companyStatus,
        BobjectTypes.Company,
        changeStatusStepData.companyReasonToDiscard,
      );
    }
    handleNext(changeStatusStepData.companyStatus, changeStatusStepData.leadStatus);
  };

  return (
    <>
      <ModalContent>
        <ModalSection
          size="l"
          title={t('wizards.steps.changeSalesStatus.title', {
            bobjectType: t('common.' + lead ? 'lead' : 'company'),
          })}
        >
          <div className={styles._section__wrapper}>
            <div className={styles._content__wrapper}>
              <div className={styles._change_company_status__wrapper}>
                <div className={styles._name__wrapper}>
                  <Icon
                    color="verySoftPeanut"
                    name={isLead(referenceBobject) ? 'people' : 'company'}
                  />
                  <Text dataTest="Text-Modal-StatusUpdate" size="m" color="peanut">
                    {referenceBobjectName}
                  </Text>
                </div>
                <div className={styles._list_status}>
                  {bobjectStatuses.map((bobjectStatus: BobjectStatus) => {
                    const key = referenceBobjectType?.toLowerCase();
                    const isSelected =
                      bobjectStatus?.logicRole === changeStatusStepData[`${key}Status`];
                    const style = {
                      backgroundColor: bobjectStatus.backgroundColor,
                      borderColor: bobjectStatus.outlineColor,
                      color: bobjectStatus.textColor,
                    };
                    const overrideStyle = isSelected ? { selectedStyle: style } : null;

                    return (
                      <Label
                        value={bobjectStatus.logicRole}
                        dataTest={bobjectStatus.logicRole}
                        align="center"
                        inline={false}
                        key={`${key}-status-${bobjectStatus.name}`}
                        onClick={value => {
                          setChangeStatusStepData({
                            ...changeStatusStepData,
                            [`${key}ReasonToDiscard`]: null,
                            [`${key}Status`]: value,
                          });
                        }}
                        selected={isSelected}
                        hoverStyle={style}
                        {...overrideStyle}
                      >
                        {bobjectStatus.name}
                      </Label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {(isNurturing || isDiscarded) && selectedReasons?.length > 0 && (
            <div className={styles._section__wrapper}>
              <div className={styles._title__wrapper}>
                <Text size="m" weight="medium" color="peanut">
                  {t('wizards.steps.changeSalesStatus.reason')}
                </Text>
              </div>
              <div className={styles._content__wrapper}>
                <div className={styles._reason__wrapper}>
                  <Select
                    value={
                      changeStatusStepData[`${referenceBobjectType?.toLowerCase()}ReasonToDiscard`]
                        ?.value
                    }
                    placeholder={t('wizards.steps.changeSalesStatus.leadStatusPlaceholder', {
                      status: getStatusName(changeStatusStepData[mainBobjectStatusKey]),
                    })}
                    width="100%"
                  >
                    {selectedReasons?.map((reason: Reason) => (
                      <Item
                        key={`${referenceBobject?.id?.typeName}-reason-item-${reason.value}`}
                        value={reason.value}
                        onClick={() => {
                          setChangeStatusStepData({
                            ...changeStatusStepData,
                            leadReasonToDiscard: reason,
                            companyReasonToDiscard: reason,
                          });
                        }}
                      >
                        {reason.label}
                      </Item>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          )}
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button variant="clear" onClick={handleBack} className={styles.back_button}>
              {buttonsConfig?.previousButtonTitle || t('wizards.common.back')}
            </Button>
          )}
          {showSkipButton && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              {t('wizards.common.skipWizard')}
            </Button>
          )}
          <Button dataTest="Form-Save" onClick={saveAndClose}>
            {isDiscarded
              ? buttonsConfig?.nextButtonTitle || t('wizards.common.saveAndClose')
              : buttonsConfig?.nextButtonAlternativeTitle || t('wizards.common.next')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default ChangeSalesStatus;
