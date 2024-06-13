import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Callout,
  Icon,
  Item,
  Label,
  ModalContent,
  ModalFooter,
  Text,
  Select,
  Tooltip,
  Radio,
  RadioGroup,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useObjectCreationSettings } from '@bloobirds-it/hooks';
import {
  BobjectField,
  BobjectType,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getValueFromLogicRole } from '@bloobirds-it/utils';
import { useMachine } from '@xstate/react';
import classnames from 'clsx';
import capitalize from 'lodash/capitalize';
import useSWR from 'swr';

import { useContactFlow } from '../../hooks';
import {
  AVAILABLE_COMPANY_STATUSES,
  AVAILABLE_LEAD_STATUSES,
  COMPANY_STATUSES_WITH_MESSAGE,
  tooltipKeys,
} from './changeStatus.constants';
import ChangeStatusMachine from './changeStatus.machine';
import styles from './changeStatus.module.css';

interface Reason {
  label: string;
  value: string;
  logicRole: string;
}

interface ChangeStatusProps {
  handleBack?: () => void;
  handleClose: () => void;
  handleNext: (companyStatus: string, leadStatus: string) => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}

interface Status {
  logicRole: string;
  backgroundColor: string;
  outlineColor: string;
  textColor: string;
}

const updateEntity = (id: any, data: any, bobjectType: BobjectType) =>
  api.patch(`/bobjects/${id.accountId}/${bobjectType}/${id.objectId}/raw`, data);

const fetcherReason = (url: string) => api.get(url);
function getStatusValues(values, availableStatus) {
  const statusOrder = Object.keys(availableStatus);
  return values
    .filter(fieldStatus => !!availableStatus[fieldStatus.logicRole])
    .sort((a, b) => statusOrder?.indexOf(a.logicRole) - statusOrder?.indexOf(b.logicRole));
}
const ChangeStatus = ({ handleBack, handleClose, handleNext, handleSkip }: ChangeStatusProps) => {
  const { enabledObjectCreation } = useObjectCreationSettings();
  const {
    referenceBobject,
    activityLead: lead,
    activityCompany: company,
    changeStatusStepData,
    setChangeStatusStepData,
    companyStatusPicklistValues,
    leadStatusPicklistValues,
    buttonStepConfig,
  } = useContactFlow();
  const { data: reasons } = useSWR<any[]>(
    `/utils/service/view/field/statusReasons/${referenceBobject?.id?.typeName}`,
    /*@ts-ignore*/
    fetcherReason,
  );
  const { settings } = useActiveUserSettings();
  const { t } = useTranslation('translations', { keyPrefix: 'contactFlowModal.changeStatus' });
  const { t: bobjectT } = useTranslation('translations', { keyPrefix: 'bobjectTypes' });

  const [state, send] = useMachine(ChangeStatusMachine, {});
  // @ts-ignore
  const { value: machineStatus }: { value: { company: any; lead: any } } = state;
  const companyStatuses = getStatusValues(companyStatusPicklistValues, AVAILABLE_COMPANY_STATUSES);
  const leadStatuses = getStatusValues(leadStatusPicklistValues, AVAILABLE_LEAD_STATUSES);

  const [selectedLeadReasons, setSelectedLeadReasons] = useState<Array<Reason>>();
  const [selectedCompanyReasons, setSelectedCompanyReasons] = useState<Array<Reason>>();
  const leadName = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const { createToast } = useToasts();
  const companyName = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const hasLead = !!lead;
  const companyStage = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STAGE)
    ?.valueLogicRole;
  const hasCompany = companyStage !== COMPANY_STAGE_LOGIC_ROLE.SALES;
  //TODO extract this to a modal parameter
  const trigger = 'REPORT_RESULT';
  const isReportResultTrigger = trigger === 'REPORT_RESULT' || trigger === 'UPDATE_CADENCE';
  const isNurturing =
    (hasLead && machineStatus.lead === 'nurturing') ||
    (hasCompany && machineStatus.company === 'nurturing');
  const isDiscarded = machineStatus.lead === 'discarded' || machineStatus.company === 'discarded';

  const changeStatus = (logicRole: string, entity: Uppercase<BobjectType>) => {
    const newStatus = logicRole?.split('__')[2];

    send(`SET_${newStatus}_${entity}`);
  };

  const showSkipButton =
    buttonStepConfig?.showSkipButton != undefined ? buttonStepConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonStepConfig?.hasPreviousStep != undefined ? buttonStepConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonStepConfig?.openCadenceOnSkip != undefined ? buttonStepConfig?.openCadenceOnSkip : false;

  const getLogicRoleFromMachineValue = (machineValue: string, entity: string) =>
    entity === 'company'
      ? COMPANY_STATUS_LOGIC_ROLE[machineValue]
      : LEAD_STATUS_LOGIC_ROLE[machineValue];
  //TODO these should be set on initialization, not like this
  useEffect(() => {
    const { leadStatus, companyStatus } = changeStatusStepData;
    const leadSelectedStatus = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STATUS)
      ?.valueLogicRole;
    const companySelectedStatus = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STATUS)
      ?.valueLogicRole;

    if (leadStatus || leadSelectedStatus) {
      const newLeadstatus = leadStatus
        ? `LEAD__STATUS__${leadStatus.toUpperCase()}`
        : leadSelectedStatus;
      changeStatus(newLeadstatus, 'LEAD');
    }
    if (companyStatus || companySelectedStatus) {
      const newCompanyStatus = companyStatus
        ? `COMPANY__STATUS__${companyStatus.toUpperCase()}`
        : companySelectedStatus;
      changeStatus(newCompanyStatus, 'COMPANY');
    }
  }, [lead?.id?.objectId, company?.id?.objectId]);

  useEffect(() => {
    const companyStatusLogicRole = getLogicRoleFromMachineValue(
      machineStatus.company.toUpperCase(),
      'company',
    );
    const leadStatusLogicRole = getLogicRoleFromMachineValue(
      machineStatus.lead.toUpperCase(),
      'lead',
    );

    if (
      companyStatusLogicRole === COMPANY_STATUS_LOGIC_ROLE.NURTURING ||
      companyStatusLogicRole === COMPANY_STATUS_LOGIC_ROLE.DISCARDED
    ) {
      //@ts-ignore
      const reasonsField = reasons?.data.find(
        (reason: Reason) =>
          reason?.logicRole === `COMPANY__${machineStatus.company?.toUpperCase()}_REASONS`,
      );
      if (reasonsField) {
        setSelectedCompanyReasons(reasonsField.fieldValues);
      }
    }

    if (
      leadStatusLogicRole === LEAD_STATUS_LOGIC_ROLE.NURTURING ||
      leadStatusLogicRole === LEAD_STATUS_LOGIC_ROLE.DISCARDED
    ) {
      //@ts-ignore
      const reasonsField = reasons?.data.find(
        (reason: Reason) =>
          reason?.logicRole === `LEAD__${machineStatus.lead?.toUpperCase()}_REASONS`,
      );
      if (reasonsField) {
        setSelectedLeadReasons(reasonsField.fieldValues);
      }
    }
  }, [machineStatus, reasons]);

  useEffect(() => {
    let companyReasonToDiscard;
    let leadReasonToDiscard;

    if (selectedCompanyReasons?.length > 0) {
      companyReasonToDiscard = {
        companyReasonToDiscard: selectedCompanyReasons[0],
      };
    }
    if (selectedLeadReasons?.length > 0) {
      leadReasonToDiscard = {
        leadReasonToDiscard: selectedLeadReasons[0],
      };
    }
    setChangeStatusStepData({
      ...changeStatusStepData,
      ...companyReasonToDiscard,
      ...leadReasonToDiscard,
    });
  }, [selectedCompanyReasons, selectedLeadReasons]);

  const save = (id: any, status: string, entity: BobjectType, reasonToDiscard: any) => {
    const prefix = `${entity?.toUpperCase()}__STATUS`;
    let data = {
      [prefix]: `${prefix}__${status}`,
    };

    if (reasonToDiscard && (status === 'NURTURING' || status === 'DISCARDED')) {
      data = {
        ...data,
        [`${entity?.toUpperCase()}__${status}_REASONS`]: reasonToDiscard.value,
      };
    }

    updateEntity(id, data, entity).then(() => {
      window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', { detail: { type: entity } }));
    });
  };

  const saveAndClose = () => {
    const leadStatus = machineStatus.lead.toUpperCase();
    const companyStatus = machineStatus.company.toUpperCase();

    if (hasLead) {
      save(lead?.id, leadStatus, 'Lead', changeStatusStepData.leadReasonToDiscard);
    }
    if (hasCompany && company) {
      save(company?.id, companyStatus, 'Company', changeStatusStepData.companyReasonToDiscard);
    }
    //TODO important
    // if (trigger === 'REPORT_RESULT') {
    //   if (Array.isArray(activityId)) {
    //     bulkReportedActivityResult({
    //       valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
    //       activitiesId: activityId,
    //     });
    //   } else {
    //     reportedActivityResult({ valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES, activityId });
    //   }
    // }

    const isMeeting = [companyStatus, leadStatus].includes('MEETING');

    if (settings?.settings?.endCCFAtStatus && isMeeting) {
      handleClose();
      createToast({ message: t('toasts.success'), type: 'success' });
    } else {
      handleNext(companyStatus, leadStatus);
    }
  };

  const leadStatusSelected = leadStatuses.find(
    leadStatus => leadStatus.logicRole === `LEAD__STATUS__${machineStatus.lead.toUpperCase()}`,
  );

  const renderSelectedStatus = (selectedStatus: string, statuses: Array<Status>) => {
    const regex = new RegExp(`(.*)__${selectedStatus?.toUpperCase()}$`, 'g');
    const statusObj = statuses.find(status => status?.logicRole.match(regex));
    const style = {
      backgroundColor: statusObj?.backgroundColor,
      borderColor: statusObj?.outlineColor,
      color: statusObj?.textColor,
    };

    return <Label overrideStyle={style}>{selectedStatus.replace('_', ' ')}</Label>;
  };

  const leadInfoClasses = classnames({
    [styles._lead_with_company_container]: hasCompany,
    [styles._lead_info_container]: !hasCompany,
  });
  const titleWrapperClasses = classnames(styles._title__wrapper, {
    [styles._title__wrapper__centered]: !hasCompany,
  });

  return (
    <>
      <ModalContent>
        <div className={styles.container}>
          <div className={styles._section__wrapper}>
            <div className={styles._content__wrapper}>
              {hasLead && (
                <div className={styles._change_lead_status__wrapper}>
                  <div className={leadInfoClasses}>
                    <div
                      className={classnames(styles._name__wrapper, {
                        [styles._single_entity]: !hasCompany,
                      })}
                    >
                      <Icon color="verySoftPeanut" name="person" />
                      <Text size="m" color="peanut">
                        {leadName}
                      </Text>
                    </div>
                    <div className={styles._currentStatus__wrapper}>
                      {renderSelectedStatus(machineStatus.lead, leadStatuses)}
                    </div>
                  </div>
                  <div className={styles._radios_list_status}>
                    <RadioGroup
                      value={leadStatusSelected}
                      //@ts-ignore
                      onChange={(selectedStatus: BobjectField) => {
                        const logicRole = selectedStatus?.logicRole;
                        setChangeStatusStepData({
                          ...changeStatusStepData,
                          leadReasonToDiscard: null,
                          leadStatus: logicRole?.split('__')[2].toLowerCase(),
                        });

                        changeStatus(logicRole, 'LEAD');
                      }}
                    >
                      {leadStatuses.map(status => (
                        <Radio
                          dataTest={`LeadStatus-${status.name}`}
                          size="medium"
                          value={status}
                          key={`lead-status-${status.name}`}
                        >
                          {status.logicRole === 'LEAD__STATUS__CONTACT' && !enabledObjectCreation
                            ? t(`leadStatusTexts.LEAD__STATUS__CONTACT_NO_CREATE_LEAD`)
                            : t(`leadStatusTexts.${status.logicRole}`)}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}
              {hasCompany && (
                <div className={styles._change_company_status__wrapper}>
                  <div
                    className={classnames(styles._name__wrapper, {
                      [styles._single_entity]: !hasLead,
                    })}
                  >
                    <Icon color="verySoftPeanut" name="company" />
                    <Text dataTest="Text-Modal-StatusUpdate" size="m" color="peanut">
                      {companyName}
                    </Text>
                  </div>
                  <div className={styles._currentStatus__wrapper}>
                    {renderSelectedStatus(machineStatus.company, companyStatuses)}
                  </div>
                  <div className={styles._list_status}>
                    {companyStatuses.map(status => {
                      const regex = new RegExp(machineStatus.company, 'gi');
                      const isSelected = status.logicRole.match(regex);
                      const style = {
                        backgroundColor: status.backgroundColor,
                        borderColor: status.outlineColor,
                        color: status.textColor,
                      };
                      const overrideStyle = isSelected ? { selectedStyle: style } : null;

                      return (
                        <Tooltip
                          key={`company-status-tooltip-${status.name}`}
                          title={t(
                            `tooltipDictionary.${
                              tooltipKeys.includes(status.logicRole)
                                ? status.logicRole
                                : 'HEADER_TEXT'
                            }`,
                          )}
                          position="top"
                        >
                          <Label
                            value={status.logicRole}
                            dataTest={status.logicRole}
                            align="center"
                            inline={false}
                            key={`company-status-${status.name}`}
                            onClick={value => {
                              setChangeStatusStepData({
                                ...changeStatusStepData,
                                companyReasonToDiscard: null,
                                companyStatus: value?.split('__')[2].toLowerCase(),
                              });

                              changeStatus(value, 'COMPANY');
                            }}
                            /*@ts-ignore*/
                            selected={isSelected}
                            hoverStyle={style}
                            {...overrideStyle}
                          >
                            {status.name}
                          </Label>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {(isNurturing || isDiscarded) && (
            <div className={styles._section__wrapper}>
              <div className={titleWrapperClasses}>
                <Text size="s" weight="bold" color="peanut">
                  {t('whatReason')}
                </Text>
              </div>
              <div className={styles._content__wrapper}>
                {hasLead && (
                  <div className={styles._reason__wrapper}>
                    {(machineStatus.lead === 'nurturing' || machineStatus.lead === 'discarded') &&
                      selectedLeadReasons && (
                        <Select
                          value={
                            changeStatusStepData?.leadReasonToDiscard?.value ||
                            selectedLeadReasons[0]?.value
                          }
                          placeholder={t('placeholder', {
                            lead: capitalize(bobjectT('lead')),
                            status: machineStatus.lead.toLowerCase(),
                          })}
                          width="100%"
                          size="small"
                          borderless={false}
                        >
                          {selectedLeadReasons.map(reason => (
                            <Item
                              key={`lead-reason-item-${reason.value}`}
                              value={reason.value}
                              onClick={() => {
                                setChangeStatusStepData({
                                  ...changeStatusStepData,
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
                )}
                {hasCompany && (
                  <div className={styles._reason__wrapper}>
                    {(machineStatus.company === 'nurturing' ||
                      machineStatus.company === 'discarded') &&
                      selectedCompanyReasons && (
                        <Select
                          value={
                            changeStatusStepData?.companyReasonToDiscard?.value ||
                            selectedCompanyReasons[0]?.value
                          }
                          placeholder={t('placeholder', {
                            lead: capitalize(bobjectT('company')),
                            status: machineStatus.company.toLowerCase(),
                          })}
                          width="100%"
                        >
                          {selectedCompanyReasons.map(reason => (
                            <Item
                              key={`company-reason-item-${reason.value}`}
                              value={reason.value}
                              onClick={() => {
                                setChangeStatusStepData({
                                  ...changeStatusStepData,
                                  companyReasonToDiscard: reason,
                                });
                              }}
                            >
                              {reason.label}
                            </Item>
                          ))}
                        </Select>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
          {COMPANY_STATUSES_WITH_MESSAGE.includes(machineStatus.company) && hasCompany && (
            <div className={styles._warning__wrapper}>
              <Callout variant="alert" icon="cadence" width="100%">
                <Trans i18nKey="contactFlowModal.changeStatus.companiesStatusMessage" />
              </Callout>
            </div>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button
              variant="clear"
              onClick={isReportResultTrigger ? handleClose : handleBack}
              className={styles.back_button}
            >
              {isReportResultTrigger ? t('cancel') : t('back')}
            </Button>
          )}
          {showSkipButton && !isReportResultTrigger && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              {t('skip')}
            </Button>
          )}
          <Button dataTest="Form-Save" onClick={saveAndClose}>
            {machineStatus.company === 'discarded' ||
            (!hasCompany && machineStatus.lead === 'discarded')
              ? buttonStepConfig?.nextButtonTitle || t('save')
              : buttonStepConfig?.nextButtonAlternativeTitle || t('saveAndContinue')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default ChangeStatus;
