import React, { useEffect, useState } from 'react';

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
import {
  Bobject,
  BobjectField,
  BobjectType,
  BobjectTypes,
  WizardsModalProps,
  BOBJECT_TYPES,
  FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import useSWR from 'swr';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useContactFlow, useLeads, usePicklistValues } from '../../../hooks';
import { BobjectApi } from '../../../misc/api/bobject';
import { ServiceApi } from '../../../misc/api/service';
import { useContactBobjects } from '../../../pages/contactPages/contactPageContext';
import { getFieldByLogicRole, getValueFromLogicRole, isLead } from '../../../utils/bobjects.utils';
import { AVAILABLE_COMPANY_STATUSES, AVAILABLE_LEAD_STATUSES } from './changeSalesStatus.constants';
import styles from './changeSalesStatus.module.css';

interface ChangeSalesStatusProps extends WizardsModalProps {
  handleNext: (companyStatus: string, leadStatus: string) => void;
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

const updateEntity = (id: string, data: any, entity: BobjectType) =>
  BobjectApi.request().bobjectType(entity).partialSet({ bobjectId: id, data });

const fetcherReason = (url: string) =>
  ServiceApi.request({
    url,
    method: 'GET',
  });

const getStatusName = (statusLogicRole: string) => {
  const status = statusLogicRole.split('__')[2];

  return status.toLowerCase();
};

const ChangeSalesStatus = ({
  handleNext,
  handleBack,
  handleSkip,
  buttonsConfig,
}: ChangeSalesStatusProps) => {
  const [selectedReasons, setSelectedReasons] = useState<Array<Reason>>();
  const { changeSalesStatusStepData, setChangeSalesStatusStepData } = useContactFlow();
  const { data: companyReasons } = useSWR(
    '/service/view/field/statusReasons/Company?stage=SALES',
    fetcherReason,
  );
  const { data: leadReasons } = useSWR(
    '/service/view/field/statusReasons/Lead?stage=SALES',
    fetcherReason,
  );
  const { company } = useContactBobjects();
  const { leads } = useLeads('contactFlow');
  const lead = Array.isArray(leads) ? leads[0] : undefined;
  const mainBobject = (lead || company) as Bobject<BobjectTypes.Company | BobjectTypes.Lead>;
  const mainBobjectTypeName = mainBobject?.id?.typeName;
  const mainBobjectStatusKey = `${
    mainBobjectTypeName?.toLowerCase() as Lowercase<BobjectTypes.Company | BobjectTypes.Lead>
  }Status` as const;
  const salesStatus = changeSalesStatusStepData[mainBobjectStatusKey];
  const leadName = lead ? getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) : undefined;
  const companyName = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const bobjectName = leadName || companyName;
  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : true;
  const bobjectStatusesLogicRoles = isLead(mainBobject)
    ? AVAILABLE_LEAD_STATUSES
    : AVAILABLE_COMPANY_STATUSES;
  const getStatusValues = (logicRole: string, availableStatus: Array<string>) => {
    const statusPicklistValues = usePicklistValues({
      picklistLogicRole: logicRole,
    });

    return statusPicklistValues
      .filter(fieldStatus => availableStatus.indexOf(fieldStatus.logicRole) > -1)
      .sort((a, b) => availableStatus?.indexOf(a.logicRole) - availableStatus?.indexOf(b.logicRole))
      .map(fieldStatus => ({
        name: fieldStatus.value,
        logicRole: fieldStatus.logicRole,
        backgroundColor: fieldStatus.backgroundColor,
        outlineColor: fieldStatus.outlineColor,
        textColor: fieldStatus.textColor,
      }));
  };
  const isNurturing =
    (!!lead && changeSalesStatusStepData.leadStatus?.includes('NURTURING')) ||
    (company && changeSalesStatusStepData.companyStatus?.includes('NURTURING'));
  const isDiscarded =
    (!!lead && changeSalesStatusStepData.leadStatus?.includes('DISCARDED')) ||
    (company && changeSalesStatusStepData.companyStatus?.includes('DISCARDED'));

  const bobjectStatuses = getStatusValues(
    FIELDS_LOGIC_ROLE[mainBobject?.id?.typeName]?.SALES_STATUS,
    bobjectStatusesLogicRoles,
  );

  useEffect(() => {
    const mainBobjectSalesStatus = getFieldByLogicRole(
      mainBobject,
      FIELDS_LOGIC_ROLE[mainBobjectTypeName]?.SALES_STATUS,
    )?.valueLogicRole;

    if (mainBobjectSalesStatus) {
      setChangeSalesStatusStepData({
        ...changeSalesStatusStepData,
        [mainBobjectStatusKey]: mainBobjectSalesStatus,
      });
    }
  }, [mainBobject]);

  const save = (id: string, status: string, entity: BobjectType, reasonToDiscard: any) => {
    const bobjectTypeName = entity?.toUpperCase();
    const bobjectStatus = status.split('__')[2];
    let data = {
      [`${bobjectTypeName}__SALES_STATUS`]: status,
    };

    if (reasonToDiscard && (status.includes('NURTURING') || status.includes('DISCARDED'))) {
      data = {
        ...data,
        [`${bobjectTypeName}__SALES_${bobjectStatus}_REASONS`]: reasonToDiscard.value,
      };
    }

    updateEntity(id, data, entity);
  };

  useEffect(() => {
    setChangeSalesStatusStepData({
      ...changeSalesStatusStepData,
      [`${mainBobjectTypeName?.toLowerCase()}ReasonToDiscard`]: Array.isArray(selectedReasons)
        ? selectedReasons[0]
        : undefined,
    });
  }, [selectedReasons]);

  useEffect(() => {
    if (salesStatus.includes('NURTURING') || salesStatus.includes('DISCARDED')) {
      const isBobjectLead = isLead(mainBobject);
      const reasons = isBobjectLead ? leadReasons : companyReasons;
      const bobjectTypeName = (isBobjectLead
        ? BOBJECT_TYPES.LEAD
        : BOBJECT_TYPES.COMPANY
      ).toUpperCase();
      const bobjectStatus = salesStatus.split('__')[2];
      const reasonsField = reasons?.find(
        (field: BobjectField) =>
          field.logicRole === `${bobjectTypeName}__SALES_${bobjectStatus}_REASONS`,
      );
      if (reasonsField) {
        setSelectedReasons(reasonsField.fieldValues);
      }
    }
  }, [salesStatus]);

  const saveAndClose = () => {
    const leadStatus = changeSalesStatusStepData.leadStatus;
    const companyStatus = changeSalesStatusStepData.companyStatus;

    if (isLead(mainBobject)) {
      save(
        lead?.id.objectId,
        leadStatus,
        BOBJECT_TYPES.LEAD as BobjectType,
        changeSalesStatusStepData.leadReasonToDiscard,
      );
    } else {
      save(
        company?.id.objectId,
        companyStatus,
        BOBJECT_TYPES.COMPANY as BobjectType,
        changeSalesStatusStepData.companyReasonToDiscard,
      );
    }

    handleNext(companyStatus, leadStatus);
  };

  return (
    <>
      <ModalContent>
        <ModalSection
          size="l"
          title={`Do you want to update the ${lead ? 'lead' : 'company'} status?`}
        >
          <div className={styles._section__wrapper}>
            <div className={styles._content__wrapper}>
              <div className={styles._change_company_status__wrapper}>
                <div className={styles._name__wrapper}>
                  <Icon color="verySoftPeanut" name={isLead(mainBobject) ? 'people' : 'company'} />
                  <Text dataTest="Text-Modal-StatusUpdate" size="m" color="peanut">
                    {bobjectName}
                  </Text>
                </div>
                <div className={styles._list_status}>
                  {bobjectStatuses.map((bobjectStatus: BobjectStatus) => {
                    const key = mainBobject?.id?.typeName?.toLowerCase();
                    const isSelected = bobjectStatus?.logicRole === salesStatus;
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
                          setChangeSalesStatusStepData({
                            ...changeSalesStatusStepData,
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
                  What is the reason for the change in status?
                </Text>
              </div>
              <div className={styles._content__wrapper}>
                <div className={styles._reason__wrapper}>
                  {(isNurturing || isDiscarded) && (
                    <Select
                      value={
                        changeSalesStatusStepData[
                          `${
                            mainBobjectTypeName?.toLowerCase() as Lowercase<
                              BobjectTypes.Company | BobjectTypes.Lead
                            >
                          }ReasonToDiscard`
                        ]?.value
                      }
                      placeholder={`Lead ${getStatusName(salesStatus)} reason`}
                      width="100%"
                    >
                      {selectedReasons?.map((reason: Reason) => (
                        <Item
                          key={`${mainBobjectTypeName?.toLowerCase()}-reason-item-${reason.value}`}
                          value={reason.value}
                          onClick={() => {
                            setChangeSalesStatusStepData({
                              ...changeSalesStatusStepData,
                              leadReasonToDiscard: reason,
                            });
                          }}
                        >
                          {reason.label}
                        </Item>
                      ))}
                    </Select>
                  )}
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
              {buttonsConfig?.previousButtonTitle || 'Back'}
            </Button>
          )}
          {showSkipButton && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              Skip
            </Button>
          )}
          <Button dataTest="Form-Save" onClick={saveAndClose}>
            {isDiscarded
              ? buttonsConfig?.nextButtonTitle || 'Save'
              : buttonsConfig?.nextButtonAlternativeTitle || 'Save and continue'}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default ChangeSalesStatus;
