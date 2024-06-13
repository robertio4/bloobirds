import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  Chip,
  ChipGroup,
  Icon,
  Input,
  Item,
  ModalContent,
  ModalFooter,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId, useActiveUserSettings } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  PITCH_DONE_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  api,
  getFieldsByType,
  getValueFromLogicRole,
  getFieldByLogicRole,
} from '@bloobirds-it/utils';

import { useCallResult, useContactFlow } from '../../hooks';
import { useContactFlowData } from '../../hooks/useContactFlowData';
import { CALL_RESULTS_LOGIC_ROLE } from '../../types/contactFlowTypes';
import styles from './callResult.module.css';
import CallInfo from './components/callInfo/callInfo';
import { CallResultSelector } from './components/callResultSelector/callResultSelector';

const CallResult = ({
  handleNext,
  handleBack,
  handleSkip,
}: {
  hasLeads: boolean;
  handleNext: (status: string, needsClose: boolean) => void;
  handleBack?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}) => {
  const {
    activity,
    dataModel,
    activityCompany,
    activityLead,
    companyAvailablePhoneFields,
    leadAvailablePhoneFields,
    callResultStepData,
    setCallResultStepData,
    availablePitches,
    pitchDonePicklistValues,
    buttonStepConfig,
  } = useContactFlow();

  const { isPitchNo } = useCallResult(dataModel);
  const { handleSubmit } = useContactFlowData();
  const activeUserId = useActiveUserId();
  const { t } = useTranslation('translation', { keyPrefix: 'contactFlowModal.callResult' });
  const { settings: userSettings, mutate: reloadUserSettings } = useActiveUserSettings();
  const [ccfCloseAtNoAnswerValue, setCcfCloseAtNoAnswerValue] = useState(
    userSettings?.user?.ccfCloseAtNoAnswer,
  );
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
  const isPitchDone = callResultStepData?.pitch?.done === PITCH_DONE_VALUES_LOGIC_ROLE.YES;
  const isMissingPitch = isPitchDone && isPitchRequired && !callResultStepData?.pitch?.template;
  const [leadPhoneFields, setLeadPhoneFields] = useState([]);
  const [companyPhoneFields, setCompanyPhoneFields] = useState([]);
  const [leadHasChanges, setLeadHasChanges] = useState(false);
  const [companyHasChanges, setCompanyHasChanges] = useState(false);
  const isNoAnswer =
    callResultStepData?.callResult?.logicRole === CALL_RESULTS_LOGIC_ROLE.NO_ANSWER;
  // const [notificationId] = useSharedState('notificationId');
  // const removeNotification = useNotificationDelete();

  const showSkipButton =
    buttonStepConfig?.showSkipButton != undefined ? buttonStepConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonStepConfig?.hasPreviousStep != undefined ? buttonStepConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonStepConfig?.openCadenceOnSkip != undefined ? buttonStepConfig?.openCadenceOnSkip : false;

  const leadFullName =
    getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
    getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const companyName = getValueFromLogicRole(activityCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);

  const saveAndNext = () => {
    const data = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT]: callResultStepData?.callResult.logicRole,
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
      [ACTIVITY_FIELDS_LOGIC_ROLE.PITCH]: callResultStepData?.pitch.template,
      [ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE]: callResultStepData?.pitch.done,
    };

    handleSubmit({
      activity,
      data,
      leadChanges: leadHasChanges ? { leadIdValue: activityLead?.id?.value, leadPhoneFields } : {},
      companyChanges: companyHasChanges
        ? { companyIdValue: activityCompany?.id?.value, companyPhoneFields }
        : {},
    });
    /*    if (notificationId) {
      removeNotification(notificationId);
    }*/

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
    if (companyPhoneFields?.length === 0 && originalCompanyPhoneFields.length > 0) {
      const companyPhoneToSet = originalCompanyPhoneFields.reduce(
        (obj, item) => Object.assign(obj, { [item.id]: item.text }),
        {},
      );
      setCompanyPhoneFields(companyPhoneToSet);
    }
  }, [originalCompanyPhoneFields]);

  useEffect(() => {
    if (leadPhoneFields?.length === 0 && originalLeadPhoneFields.length > 0) {
      const leadPhoneToSet = originalLeadPhoneFields.reduce(
        (obj, item) => Object.assign(obj, { [item.id]: item.text }),
        {},
      );
      setLeadPhoneFields(leadPhoneToSet);
    }
  }, [originalLeadPhoneFields]);

  return (
    <>
      <ModalContent>
        <CallInfo />
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text dataTest="Text-Modal-CallResult" size="m" weight="medium" color="peanut">
              {t('title')}
            </Text>
          </div>
          <CallResultSelector />
        </div>
        {callResultStepData?.callResult?.isCorrectContact && (
          <div className={styles._section__wrapper}>
            <div className={styles.section_pitch__wrapper}>
              <Text size="s" weight="medium" color="peanut">
                {t('pitchUsed.Title')}
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
                    placeholder={t('pitchUsed.placeholder') + (isPitchRequired ? '*' : '')}
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
        {isNoAnswer && (
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <Checkbox
              size="small"
              checked={ccfCloseAtNoAnswerValue}
              onClick={value => {
                setCcfCloseAtNoAnswerValue(value);
              }}
              expand={false}
            >
              {t('noAnswer.endCall')}
            </Checkbox>
            <Text size="xs" className={styles._no_answer_close_text}>
              {t('noAnswer.hint')}
            </Text>
          </div>
        )}
        {/*TODO EXTRACT*/}
        {callResultStepData?.callResult?.logicRole === CALL_RESULTS_LOGIC_ROLE.WRONG_DATA && (
          <>
            <Text
              className={styles._phone_edit_header}
              dataTest="Text-Modal-CallResult"
              size="m"
              weight="medium"
              color="peanut"
            >
              {t('updateNumbers.title')}
            </Text>
            {leadAvailablePhoneFields?.length > 0 && (
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
                    {t('updateNumbers.information', { bobjectName: leadFullName || '' })}
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
                          setLeadHasChanges(true);
                          setLeadPhoneFields({ ...leadPhoneFields, [phone?.name]: value });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {companyAvailablePhoneFields?.length > 0 && (
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
                    {t('updateNumbers.information', { bobjectName: companyName || '' })}
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
                          setCompanyHasChanges(true);
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
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button variant="clear" onClick={handleBack} className={styles.back_button}>
              {buttonStepConfig?.previousButtonTitle || t('back')}
            </Button>
          )}
          {showSkipButton && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              {t('skip')}
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
              ? buttonStepConfig?.nextButtonTitle || t('save')
              : buttonStepConfig?.nextButtonAlternativeTitle || t('saveAndContinue')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default CallResult;
