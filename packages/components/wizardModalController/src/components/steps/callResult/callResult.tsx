import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  Chip,
  ChipGroup,
  createToast,
  Icon,
  Input,
  Item,
  ModalContent,
  ModalFooter,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useActiveUserSettings,
  useDataModel,
  useNotifications,
  useCustomTasks,
  useActiveAccountId,
} from '@bloobirds-it/hooks';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  PITCH_DONE_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
  CALL_RESULTS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_ACTION_VALUE,
  CUSTOM_TASK_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  BobjectTypes,
  BobjectId,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import {
  api,
  getFieldsByType,
  getValueFromLogicRole,
  getFieldByLogicRole,
} from '@bloobirds-it/utils';
import { EVENTS, useWizardContext, WizardsModalParams } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import { useCallResultStepData } from '../../../hooks/useCallResultStepData';
import {
  CallResultBobjectType,
  UpdatableFieldInCallResult,
  useContactFlowData,
} from '../../modals/contactFlowModal/hooks/useContactFlowData';
import CallInfo from '../../shared/callInfo/callInfo';
import styles from './callResult.module.css';
import { CallResultSelector } from './components/callResultSelector/callResultSelector';
import RecallSection, { RecallSectionModes } from './components/recallSection/recallSection';
import { UpdatePropertySection } from './components/updatePropertySection/updatePropertySection';
import { useAvailablePhoneFields, useCallResult } from './hooks/useCallResult';

interface CallResultWizard extends WizardsModalParams {
  handleNext?: (status: string, needsClose: boolean) => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
  // hasLeads: boolean;
}
const CallResult = ({
  handleBack,
  handleSkip,
  buttonsConfig,
  wizardKey,
  send,
  machineContext,
}: CallResultWizard) => {
  const { getWizardProperties, hasCustomWizardsEnabled } = useWizardContext();
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { bobject: activity, handleClose } = getWizardProperties(wizardKey);
  const dataModel = useDataModel();
  const { activityCompany, activityLead, activityOpportunity } = useActivityRelatedInfo(wizardKey);
  const { companyAvailablePhoneFields, leadAvailablePhoneFields } = useAvailablePhoneFields(
    wizardKey,
    activityLead,
    activityCompany,
  );

  const { isPitchNo, availablePitches, pitchDonePicklistValues } = useCallResult(dataModel);
  const {
    callResultStepData,
    setCallResultStepData,
    callResultsPicklistValues,
  } = useCallResultStepData(
    activity,
    dataModel,
    machineContext?.callResultStepData,
    machineContext?.callResult,
  );
  const { getCustomTaskByLogicRole } = useCustomTasks({ disabled: false });
  const recallCustomTask = getCustomTaskByLogicRole(CUSTOM_TASK_LOGIC_ROLE.RECALL);
  const { handleSubmit } = useContactFlowData();
  const activeUserId = useActiveUserId();
  const accountId = useActiveAccountId();
  const { settings: userSettings, mutate: reloadUserSettings } = useActiveUserSettings();
  const [ccfCloseAtNoAnswerValue, setCcfCloseAtNoAnswerValue] = useState(
    userSettings?.user?.ccfCloseAtNoAnswer,
  );
  const [recallCreated, setRecallCreated] = useState(false);
  const { removeNotificationByObjectId } = useNotifications();
  function deleteRelatedNotification(activity) {
    if (activity) {
      removeNotificationByObjectId(activity?.id?.objectId);
    }
  }
  function handleNext(selectedCallResult: string, needsClose: boolean) {
    deleteRelatedNotification(activity);
    needsClose
      ? handleClose()
      : (() => {
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_NEXT_IN_WIZARD_STEP_ + 'CALL_RESULTS');
          send(EVENTS.NEXT, {
            callResult: selectedCallResult,
            callResultStepData: callResultStepData,
            recallCreated,
          });
        })();
  }

  const originalLeadPhoneFields = getFieldsByType(activityLead, 'PHONE').reduce(
    (acc, phone) => [
      ...acc,
      { label: phone.label, id: phone.name, logicRole: phone.logicRole, text: phone.text },
    ],
    [],
  );
  const originalCompanyPhoneFields = getFieldsByType(activityCompany, 'PHONE').reduce(
    (acc, phone) => [
      ...acc,
      { label: phone.label, id: phone.name, logicRole: phone.logicRole, text: phone.text },
    ],
    [],
  );
  const isPitchRequired = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH)?.required;
  const activityDateTime = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME);
  const isPitchDone = callResultStepData?.pitch?.done === PITCH_DONE_VALUES_LOGIC_ROLE.YES;
  const isMissingPitch = isPitchDone && isPitchRequired && !callResultStepData?.pitch?.template;
  const [leadPhoneFields, setLeadPhoneFields] = useState({});
  const [companyPhoneFields, setCompanyPhoneFields] = useState({});
  const [newBobjectPropertyValue, setNewBobjectPropertyValue] = useState({});
  const [bobjectChanges, setBobjectChanges] = useState({
    [BobjectTypes.Activity]: false,
    [BobjectTypes.Company]: false,
    [BobjectTypes.Lead]: false,
    [BobjectTypes.Opportunity]: false,
  });
  const isNoAnswer =
    callResultStepData?.callResult?.logicRole === CALL_RESULTS_LOGIC_ROLE.NO_ANSWER;
  // const [notificationId] = useSharedState('notificationId');
  // const removeNotification = useNotificationDelete();
  const recallRef = useRef<HTMLDivElement>(null);
  const propertyUpdateRef = useRef<HTMLDivElement>(null);

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;
  const showRecallSection =
    buttonsConfig?.recallResults != undefined
      ? Object.keys(buttonsConfig?.recallResults || {})?.includes(
          callResultStepData?.callResult?.logicRole,
        )
      : false;
  const showUpdatePropertySection =
    buttonsConfig?.updatePropertyResults != undefined
      ? Object.keys(buttonsConfig?.updatePropertyResults || {})?.includes(
          callResultStepData?.callResult?.logicRole,
        )
      : false;
  const recallMode = useMemo(
    () =>
      showRecallSection &&
      buttonsConfig?.recallResults?.[callResultStepData?.callResult?.logicRole],
    [showRecallSection, callResultStepData?.callResult?.logicRole],
  );

  const propertiesToUpdate = useMemo(
    () =>
      showUpdatePropertySection &&
      buttonsConfig?.updatePropertyResults?.[callResultStepData?.callResult?.logicRole],
    [showUpdatePropertySection, callResultStepData?.callResult?.logicRole],
  );

  const leadFullName =
    getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
    getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const companyName = getValueFromLogicRole(activityCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);

  const getBobjectChanges: (
    bobjectType: CallResultBobjectType,
    idValue: BobjectId<CallResultBobjectType>['value'],
    extraFields?: Record<string, string>,
  ) => Record<CallResultBobjectType, UpdatableFieldInCallResult> | any = (
    bobjectType,
    idValue,
    extraFields,
  ) => {
    return bobjectChanges[bobjectType]
      ? {
          [bobjectType as CallResultBobjectType]: {
            idValue: idValue,
            fields: { ...(extraFields ?? {}), ...(newBobjectPropertyValue?.[bobjectType] ?? {}) },
          },
        }
      : {};
  };

  const saveAndNext = () => {
    const data = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT]: callResultStepData?.callResult.logicRole,
      [ACTIVITY_FIELDS_LOGIC_ROLE.PITCH]: callResultStepData?.pitch.template,
      [ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE]: callResultStepData?.pitch.done,
    };
    if (
      !hasCustomWizardsEnabled ||
      machineContext?.wizardConfig?.markReportedAtStart === true ||
      machineContext?.wizardConfig?.markReportedAtStart === undefined ||
      (isNoAnswer && ccfCloseAtNoAnswerValue)
    ) {
      data[ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED] = REPORTED_VALUES_LOGIC_ROLE.YES;
    }

    handleSubmit({
      activity,
      data,
      bobjectChanges: {
        ...getBobjectChanges(BobjectTypes.Company, activityCompany?.id?.value, companyPhoneFields),
        ...getBobjectChanges(BobjectTypes.Lead, activityLead?.id?.value, leadPhoneFields),
        ...getBobjectChanges(
          BobjectTypes.Opportunity,
          (machineContext?.selectedOpportunityObject ?? activityOpportunity)?.id
            ?.value as BobjectId<BobjectTypes.Opportunity>['value'],
        ),
        ...getBobjectChanges(
          BobjectTypes.Activity,
          activity?.id?.value as BobjectId<BobjectTypes.Activity>['value'],
        ),
      },
    });

    if (showRecallSection && callResultStepData?.recall?.checked) {
      const dataToCreate = {
        [TASK_FIELDS_LOGIC_ROLE.TITLE]:
          t('wizards.steps.callResult.recallTaskTitle') +
          ' - ' +
          getI18nSpacetimeLng(language, callResultStepData?.recall?.date)?.format(
            t('dates.monthShortWithTime'),
          ),
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
        [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUserId,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: callResultStepData?.recall?.date,
        [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK]: TASK_ACTION_VALUE.CUSTOM_TASK_YES,
        [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: TASK_PRIORITY_VALUE.NO_PRIORITY,
        [TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK]: recallCustomTask?.id,
        [TASK_FIELDS_LOGIC_ROLE.REMINDER]: 'TASK__REMINDER__YES',
      };
      if (machineContext?.selectedOpportunityObject ?? activityOpportunity) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = (
          machineContext?.selectedOpportunityObject ?? activityOpportunity
        )?.id?.value;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = null;
      } else if (activityLead) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = activityLead?.id?.value;
      } else if (activityCompany) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = activityCompany?.id?.value;
      }
      api
        .post(`/bobjects/${accountId}/Task`, {
          contents: { ...dataToCreate },
          params: {},
        })
        .then(() => {
          createToast({ message: t('wizards.steps.callResult.recall.toast'), type: 'success' });
        });
    }

    if (isNoAnswer && userSettings?.user?.ccfCloseAtNoAnswer !== ccfCloseAtNoAnswerValue)
      api
        .patch(`/entities/users/${activeUserId}`, {
          ccfCloseAtNoAnswer: ccfCloseAtNoAnswerValue,
        })
        .then(() => {
          reloadUserSettings();
        });

    handleNext(callResultStepData?.callResult.logicRole, isNoAnswer && ccfCloseAtNoAnswerValue);
  };

  //TODO refactor this
  useEffect(() => {
    if (
      companyPhoneFields &&
      Object.keys(companyPhoneFields)?.length === 0 &&
      originalCompanyPhoneFields.length > 0
    ) {
      const companyPhoneToSet = originalCompanyPhoneFields.reduce(
        (obj, item) => Object.assign(obj, { [item.id]: item.text }),
        {},
      );
      setCompanyPhoneFields(companyPhoneToSet);
    }
  }, [originalCompanyPhoneFields]);

  useEffect(() => {
    setRecallCreated(showRecallSection && callResultStepData?.recall?.checked);
  }, [showRecallSection, callResultStepData?.recall?.checked]);

  useEffect(() => {
    if (
      leadPhoneFields &&
      Object.keys(leadPhoneFields)?.length === 0 &&
      originalLeadPhoneFields.length > 0
    ) {
      const leadPhoneToSet = originalLeadPhoneFields.reduce(
        (obj, item) => Object.assign(obj, { [item.id]: item.text }),
        {},
      );
      setLeadPhoneFields(leadPhoneToSet);
    }
  }, [originalLeadPhoneFields]);

  useEffect(() => {
    if (propertyUpdateRef?.current) {
      propertyUpdateRef?.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (recallRef?.current) {
      recallRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [callResultStepData?.callResult?.logicRole]);

  return (
    <>
      <ModalContent>
        <CallInfo activity={activity} />
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text dataTest="Text-Modal-CallResult" size="m" weight="medium" color="peanut">
              {t('wizards.steps.callResult.callResult')}
            </Text>
          </div>
          <CallResultSelector
            callResultsPicklistValues={callResultsPicklistValues}
            activity={activity}
            callResultStepDataHandler={[callResultStepData, setCallResultStepData]}
          />
        </div>
        {callResultStepData?.callResult?.isCorrectContact && !buttonsConfig?.hidePitchCheck && (
          <div className={styles._section__wrapper}>
            <div className={styles.section_pitch__wrapper}>
              <Text size="s" weight="medium" color="peanut">
                {t('wizards.steps.callResult.didYouPitch')}
              </Text>
            </div>
            <div className={styles._pitch__wrapper}>
              <div className={styles._chips__wrapper}>
                <ChipGroup
                  value={callResultStepData?.pitch?.done}
                  onChange={value => {
                    setCallResultStepData({
                      ...callResultStepData,
                      pitch: isPitchNo(value)
                        ? { template: null, done: value }
                        : { ...callResultStepData?.pitch, done: value },
                    });
                  }}
                >
                  {pitchDonePicklistValues?.map(pitchDone => (
                    <Chip
                      size="small"
                      key={`pitch-done-${pitchDone?.id}`}
                      value={pitchDone?.logicRole}
                    >
                      {pitchDone?.name}
                    </Chip>
                  ))}
                </ChipGroup>
              </div>
              {isPitchDone && (
                <div className={styles._pitch_select__wrapper}>
                  <Select
                    value={callResultStepData?.pitch?.template}
                    placeholder={
                      t('wizards.steps.callResult.pitchPlaceholder') + (isPitchRequired ? '*' : '')
                    }
                    size="small"
                    width="300px"
                    borderless={false}
                    onChange={value =>
                      setCallResultStepData({
                        ...callResultStepData,
                        pitch: { ...callResultStepData?.pitch, template: value },
                      })
                    }
                  >
                    {availablePitches?.map(pitchItem => (
                      <Item key={pitchItem.id} value={pitchItem.id}>
                        {pitchItem.name}
                      </Item>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </div>
        )}
        {isNoAnswer && !buttonsConfig?.hideNoAnswerExtraInfo && (
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <Checkbox
              size="small"
              checked={ccfCloseAtNoAnswerValue}
              onClick={value => {
                setCcfCloseAtNoAnswerValue(value);
              }}
              expand={false}
            >
              {t('wizards.steps.callResult.endFlowHere')}
            </Checkbox>
            <Text size="xs" className={styles._no_answer_close_text}>
              {t('wizards.steps.callResult.endFlowHereDisclaimer')}
            </Text>
          </div>
        )}
        {/*TODO EXTRACT*/}
        {callResultStepData?.callResult?.logicRole === CALL_RESULTS_LOGIC_ROLE.WRONG_DATA &&
          !buttonsConfig?.hideNoAnswerExtraInfo && (
            <>
              <Text
                className={styles._phone_edit_header}
                dataTest="Text-Modal-CallResult"
                size="m"
                weight="medium"
                color="peanut"
              >
                {t('wizards.steps.callResult.updateNumber')}
              </Text>
              {!!leadFullName && leadAvailablePhoneFields?.length > 0 && (
                <>
                  <div className={styles._section_title__wrapper}>
                    <Icon
                      className={styles._section_title_icon}
                      color="verySoftPeanut"
                      name="person"
                    />
                    <Text
                      className={styles._section_title_text}
                      dataTest="Text-Modal-CallResult"
                      size="m"
                      weight="medium"
                      color="softPeanut"
                    >
                      {t('wizards.steps.callResult.info', { name: leadFullName })}
                    </Text>
                  </div>
                  <div className={styles._phone_input_container}>
                    {leadAvailablePhoneFields?.map((phone, index) => (
                      <div className={styles._phone_field_wrapper} key={`lead-phone-${index}`}>
                        <Input
                          key={phone?.id}
                          value={leadPhoneFields[phone?.name]}
                          placeholder={phone?.label}
                          width="365px"
                          onChange={value => {
                            setBobjectChanges(state => ({ ...state, [BobjectTypes.Lead]: true }));
                            setLeadPhoneFields({ ...leadPhoneFields, [phone?.name]: value });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {!!companyName && companyAvailablePhoneFields?.length > 0 && (
                <>
                  <div className={styles._section_title__wrapper}>
                    <Icon
                      className={styles._section_title_icon}
                      color="verySoftPeanut"
                      name="company"
                    />
                    <Text
                      className={styles._section_title_text}
                      dataTest="Text-Modal-CallResult"
                      size="m"
                      weight="medium"
                      color="softPeanut"
                    >
                      {t('wizards.steps.callResult.info', { name: companyName })}
                    </Text>
                  </div>
                  <div className={styles._phone_input_container}>
                    {companyAvailablePhoneFields?.map((phone, index) => (
                      <div className={styles._phone_field_wrapper} key={`company-phone-${index}`}>
                        <Input
                          key={phone?.id}
                          value={companyPhoneFields[phone?.name]}
                          placeholder={phone?.label}
                          width="365px"
                          onChange={value => {
                            setBobjectChanges(state => ({
                              ...state,
                              [BobjectTypes.Company]: true,
                            }));
                            setCompanyPhoneFields({ ...companyPhoneFields, [phone?.name]: value });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        {showUpdatePropertySection && (
          <UpdatePropertySection
            propertyUpdateRef={propertyUpdateRef}
            fields={propertiesToUpdate}
            bobjects={{
              [BobjectTypes.Activity]: activity,
              [BobjectTypes.Lead]: activityLead,
              [BobjectTypes.Company]: activityCompany,
              [BobjectTypes.Opportunity]:
                machineContext?.selectedOpportunityObject ?? activityOpportunity,
            }}
            handleOnChange={(fieldName, value, fieldBobjectType) => {
              setBobjectChanges(state => ({ ...state, [fieldBobjectType]: true }));
              setNewBobjectPropertyValue(state => ({
                ...state,
                [fieldBobjectType]: {
                  ...state[fieldBobjectType],
                  ...{
                    [fieldName]: value,
                  },
                },
              }));
            }}
          />
        )}
        {showRecallSection && (
          <RecallSection
            recallRef={recallRef}
            mode={recallMode as RecallSectionModes}
            activityDateTime={activityDateTime}
            callResultStepDataHandler={[callResultStepData, setCallResultStepData]}
          />
        )}
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
          <Button
            onClick={saveAndNext}
            disabled={
              (!callResultStepData?.callResult?.logicRole &&
                !callResultStepData?.callResult?.value) ||
              isMissingPitch
            }
            className={styles.next_button}
          >
            {isNoAnswer && ccfCloseAtNoAnswerValue
              ? buttonsConfig?.nextButtonTitle || t('wizards.common.saveAndClose')
              : buttonsConfig?.nextButtonAlternativeTitle || t('wizards.common.next')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default CallResult;
