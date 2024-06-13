import React, { useEffect, useState } from 'react';

import {
  Button,
  Callout,
  Icon,
  Item,
  Label,
  ModalContent,
  ModalFooter,
  ModalSection,
  Radio,
  RadioGroup,
  Select,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import {
  BobjectField,
  BobjectType,
  BobjectTypes,
  ButtonsStepConfig,
  LogicRoleType,
  MainBobjectTypes,
} from '@bloobirds-it/types';
import { useMachine } from '@xstate/react';
import classnames from 'clsx';
import useSWR from 'swr';

import { REPORTED_VALUES_LOGIC_ROLE } from '../../../constants/activity';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE } from '../../../constants/lead';
import { useContactFlow, useLeads, useOpenContactFlow, usePicklistValues } from '../../../hooks';
import { BobjectApi } from '../../../misc/api/bobject';
import { ServiceApi } from '../../../misc/api/service';
import { useContactBobjects } from '../../../pages/contactPages/contactPageContext';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../utils/bobjects.utils';
import { useUserSettings } from '../../userPermissions/hooks';
import { getValueFromDictionary } from './chageStatus.dictionary';
import {
  AVAILABLE_COMPANY_STATUSES,
  AVAILABLE_LEAD_STATUSES,
  COMPANY_STATUSES_WITH_MESSAGE,
  LEAD_STATUS_TEXTS,
} from './changeStatus.constants';
import ChangeStatusMachine, { STEPS } from './changeStatus.machine';
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
  buttonsConfig?: ButtonsStepConfig;
}

interface Status {
  logicRole: string;
  backgroundColor: string;
  outlineColor: string;
  textColor: string;
}

const updateEntity = (id: string, data: any, entity: BobjectType) =>
  BobjectApi.request().bobjectType(entity).partialSet({ bobjectId: id, data });

const fetcherReason = (url: string) =>
  ServiceApi.request({
    url,
    method: 'GET',
  });

type StepsType = typeof STEPS;

type MachineStatuses = StepsType[keyof StepsType];

const ChangeStatus = ({
  handleBack,
  handleClose,
  handleNext,
  handleSkip,
  buttonsConfig,
}: ChangeStatusProps) => {
  const {
    changeStatusStepData,
    bulkReportedActivityResult,
    reportedActivityResult,
    setChangeStatusStepData,
  } = useContactFlow();
  const { data: companyReasons } = useSWR(
    '/service/view/field/statusReasons/Company',
    fetcherReason,
  );
  const { data: leadReasons } = useSWR('/service/view/field/statusReasons/Lead', fetcherReason);
  const { company } = useContactBobjects();
  const settings = useUserSettings();
  const { leads } = useLeads('contactFlow');
  const lead = Array.isArray(leads) ? leads[0] : undefined;
  const { trigger, activity: activityId } = useOpenContactFlow();
  const [state, send] = useMachine(ChangeStatusMachine);
  const getStatusValues = <T extends MainBobjectTypes>(
    logicRole: LogicRoleType<T>,
    availableStatus: any,
  ) => {
    const statusOrder = Object.keys(availableStatus);
    return usePicklistValues({
      picklistLogicRole: logicRole,
    })
      .filter(fieldStatus => !!availableStatus[fieldStatus.logicRole])
      .sort((a, b) => statusOrder?.indexOf(a.logicRole) - statusOrder?.indexOf(b.logicRole))
      .map(fieldStatus => ({
        name: fieldStatus.value,
        logicRole: fieldStatus.logicRole as LogicRoleType<T>,
        backgroundColor: fieldStatus.backgroundColor,
        outlineColor: fieldStatus.outlineColor,
        textColor: fieldStatus.textColor,
      }));
  };

  const companyStatuses = getStatusValues<BobjectTypes.Company>(
    COMPANY_FIELDS_LOGIC_ROLE.STATUS,
    AVAILABLE_COMPANY_STATUSES,
  );
  const leadStatuses = getStatusValues<BobjectTypes.Lead>(
    LEAD_FIELDS_LOGIC_ROLE.STATUS,
    AVAILABLE_LEAD_STATUSES,
  );
  const [selectedLeadReasons, setSelectedLeadReasons] = useState<Array<Reason>>();
  const [selectedCompanyReasons, setSelectedCompanyReasons] = useState<Array<Reason>>();
  const leadName = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const { createToast } = useToasts();
  const companyName = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const hasLead = !!lead;
  const companyStage = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STAGE)
    ?.valueLogicRole;
  const hasCompany = !!company && companyStage !== COMPANY_STAGE_LOGIC_ROLE.SALES;

  const { value: machineStatus } = (state as unknown) as {
    value: Record<'lead' | 'company', MachineStatuses>;
  };
  const isReportResultTrigger = trigger === 'REPORT_RESULT' || trigger === 'UPDATE_CADENCE';
  const isNurturing =
    (hasLead && machineStatus.lead === 'nurturing') ||
    (hasCompany && machineStatus.company === 'nurturing');
  const isDiscarded = machineStatus.lead === 'discarded' || machineStatus.company === 'discarded';
  const isOnHold = machineStatus.lead === 'on_hold' || machineStatus.company === 'on_hold';

  const changeStatus = (logicRole: string, entity: Uppercase<BobjectType>) => {
    const newStatus = logicRole?.split('__')[2];

    send(`SET_${newStatus}_${entity}`);
  };

  const getLogicRoleFromMachineValue = (
    machineValue: Uppercase<Partial<MachineStatuses>>,
    entity: 'company' | 'lead',
  ) =>
    entity === 'company'
      ? COMPANY_STATUS_LOGIC_ROLE[machineValue as keyof typeof COMPANY_STATUS_LOGIC_ROLE]
      : LEAD_STATUS_LOGIC_ROLE[machineValue as keyof typeof LEAD_STATUS_LOGIC_ROLE];

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : true;

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
      changeStatus(newLeadstatus, 'LEAD' as Uppercase<BobjectType>);
    }
    if (companyStatus || companySelectedStatus) {
      const newCompanyStatus = companyStatus
        ? `COMPANY__STATUS__${companyStatus.toUpperCase()}`
        : companySelectedStatus;
      changeStatus(newCompanyStatus, 'COMPANY' as Uppercase<BobjectType>);
    }
  }, [lead?.id?.objectId, company?.id?.objectId]);

  useEffect(() => {
    const companyStatusLogicRole = getLogicRoleFromMachineValue(
      machineStatus.company.toUpperCase() as Uppercase<MachineStatuses>,
      'company',
    );
    const leadStatusLogicRole = getLogicRoleFromMachineValue(
      machineStatus.lead.toUpperCase() as Uppercase<MachineStatuses>,
      'lead',
    );

    if (
      companyStatusLogicRole === COMPANY_STATUS_LOGIC_ROLE.NURTURING ||
      companyStatusLogicRole === COMPANY_STATUS_LOGIC_ROLE.DISCARDED ||
      companyStatusLogicRole === COMPANY_STATUS_LOGIC_ROLE.ON_HOLD
    ) {
      const reasonsField = companyReasons?.find(
        (reason: Reason) =>
          reason?.logicRole === `COMPANY__${machineStatus.company?.toUpperCase()}_REASONS`,
      );
      if (reasonsField) {
        setSelectedCompanyReasons(reasonsField.fieldValues);
      }
    }
    if (
      leadStatusLogicRole === LEAD_STATUS_LOGIC_ROLE.NURTURING ||
      leadStatusLogicRole === LEAD_STATUS_LOGIC_ROLE.DISCARDED ||
      leadStatusLogicRole === LEAD_STATUS_LOGIC_ROLE.ON_HOLD
    ) {
      const reasonsField = leadReasons?.find(
        (reason: Reason) =>
          reason?.logicRole === `LEAD__${machineStatus.lead?.toUpperCase()}_REASONS`,
      );
      if (reasonsField) {
        setSelectedLeadReasons(reasonsField.fieldValues);
      }
    }
  }, [machineStatus]);

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

  const save = (id: string, status: string, entity: BobjectType, reasonToDiscard: any) => {
    const prefix = `${entity.toUpperCase()}__STATUS`;
    let data = {
      [prefix]: `${prefix}__${status}`,
    };

    if (
      reasonToDiscard &&
      (status === 'NURTURING' || status === 'DISCARDED' || status === 'ON_HOLD')
    ) {
      data = {
        ...data,
        [`${entity.toUpperCase()}__${status}_REASONS`]: reasonToDiscard.value,
      };
    }

    updateEntity(id, data, entity);
  };

  const saveAndClose = () => {
    const leadStatus = machineStatus.lead.toUpperCase();
    const companyStatus = machineStatus.company.toUpperCase();

    if (hasLead) {
      save(lead?.id.objectId, leadStatus, 'Lead', changeStatusStepData.leadReasonToDiscard);
    }
    if (hasCompany && company) {
      save(
        company?.id.objectId,
        companyStatus,
        'Company',
        changeStatusStepData.companyReasonToDiscard,
      );
    }

    if (trigger === 'REPORT_RESULT') {
      if (Array.isArray(activityId)) {
        bulkReportedActivityResult({
          valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
          activitiesId: activityId,
        });
      } else {
        reportedActivityResult({ valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES, activityId });
      }
    }

    const isMeeting = [companyStatus, leadStatus].includes('MEETING');

    if (settings?.settings?.endCCFAtStatus && isMeeting) {
      handleClose();
      createToast({ message: 'Status updated succesfully!', type: 'success' });
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
    [styles._lead_info_container]: !hasCompany,
  });
  const titleWrapperClasses = classnames(styles._title__wrapper, {
    [styles._title__wrapper__centered]: !hasCompany,
  });

  const hasDefinitiveStatus = () => {
    const finalStatuses = ['discarded', 'on_hold'];
    return (
      finalStatuses.includes(machineStatus.lead) || finalStatuses.includes(machineStatus.company)
    );
  };

  return (
    <>
      <ModalContent>
        <ModalSection
          size="l"
          title={`Report activity result for ${leadName || companyName} ${
            leadName && companyName ? `from ${companyName}` : ''
          }`}
        >
          <div className={styles._section__wrapper}>
            <div className={styles._content__wrapper}>
              {hasLead && (
                <div className={styles._change_lead_status__wrapper}>
                  <div className={leadInfoClasses}>
                    <div className={styles._name__wrapper}>
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
                          {LEAD_STATUS_TEXTS[status.logicRole as keyof typeof LEAD_STATUS_TEXTS]}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}
              {hasCompany && (
                <div className={styles._change_company_status__wrapper}>
                  <div className={styles._name__wrapper}>
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
                          title={getValueFromDictionary(status.logicRole)}
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
                            selected={!!isSelected}
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
          {(isNurturing || isDiscarded || isOnHold) && (
            <div className={styles._section__wrapper}>
              <div className={titleWrapperClasses}>
                <Text size="m" weight="medium" color="peanut">
                  What is the reason for the change in status?
                </Text>
              </div>
              <div className={styles._content__wrapper}>
                {hasLead && (
                  <div className={styles._reason__wrapper}>
                    {(machineStatus.lead === 'nurturing' ||
                      machineStatus.lead === 'discarded' ||
                      machineStatus.lead === 'on_hold') &&
                      selectedLeadReasons && (
                        <Select
                          value={
                            changeStatusStepData?.leadReasonToDiscard?.value ||
                            selectedLeadReasons[0]?.value
                          }
                          placeholder={`Lead ${machineStatus.lead
                            .toLowerCase()
                            .replace('_', ' ')} reason`}
                          width="100%"
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
                      machineStatus.company === 'discarded' ||
                      machineStatus.company === 'on_hold') &&
                      selectedCompanyReasons && (
                        <Select
                          value={
                            changeStatusStepData?.companyReasonToDiscard?.value ||
                            selectedCompanyReasons[0]?.value
                          }
                          placeholder={`Company ${machineStatus.company
                            .toLowerCase()
                            .replace('_', ' ')} reason`}
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
                <b>The selected company status will stop the cadence.</b> All future communication
                needs to be scheduled manually and should be based on what you discussed during your
                call.
              </Callout>
            </div>
          )}
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button
              variant="clear"
              onClick={isReportResultTrigger ? handleClose : handleBack}
              className={styles.back_button}
            >
              {isReportResultTrigger ? 'Cancel' : 'Back '}
            </Button>
          )}
          {showSkipButton && !isReportResultTrigger && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              Skip
            </Button>
          )}
          <Button dataTest="Form-Save" onClick={saveAndClose}>
            {hasDefinitiveStatus()
              ? buttonsConfig?.nextButtonTitle || 'Save'
              : buttonsConfig?.nextButtonAlternativeTitle || 'Save and continue'}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default ChangeStatus;
