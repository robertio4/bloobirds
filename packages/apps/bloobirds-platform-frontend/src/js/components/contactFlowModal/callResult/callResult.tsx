import React, { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Chip,
  ChipGroup,
  Icon,
  Input,
  Item,
  Label,
  ModalContent,
  ModalFooter,
  Select,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import {
  UserHelperKeys,
  WizardsModalProps,
  BobjectPicklistValueEntity,
  BobjectField,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';
// @ts-ignore
import { v4 as generateRandomId } from 'uuid';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  PITCH_DONE_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { CALL_RESULTS_LOGIC_ROLE } from '../../../constants/callResult';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import {
  useActiveUser,
  useCompany,
  useContactFlow,
  useLeads,
  usePicklistValues,
  useSharedState,
} from '../../../hooks';
import { useNotificationDelete } from '../../../hooks/useNotifications';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import { api } from '../../../utils/api';
import {
  getFieldByLogicRole,
  getFieldsByType,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import { useUserSettings, useUserSettingsContext } from '../../userPermissions/hooks';
import CallInfo from '../callInfo/callInfo';
import { filterCallResults } from '../contactFlow.utils';
import styles from './callResult.module.css';

const fetcher = (url: string) =>
  api
    .post(`${url}?sort=name%2Casc`, {
      type: 'PITCH',
      segmentationValues: {},
    })
    .then(response => response?.data);

interface CallResultProps extends WizardsModalProps {
  handleNext: (status: string, needsClose: boolean) => void;
}

const CallResult = ({ handleNext, handleBack, handleSkip, buttonsConfig }: CallResultProps) => {
  const { leads } = useLeads('contactFlow');
  const lead = leads[0];
  const hasLeads = !!lead;
  const { activeUser } = useActiveUser();
  const {
    user: { ccfCloseAtNoAnswer },
  } = useUserSettings();

  const { reloadUserSettings } = useUserSettingsContext();
  const { save } = useUserHelpers();
  const [ccfCloseAtNoAnswerValue, setCcfCloseAtNoAnswerValue] = useState(ccfCloseAtNoAnswer);
  const callResultsPicklistValues = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT,
  });
  const pitchDonePicklistValues = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE,
  })?.sort((a, b) => (a.value < b.value ? -1 : 1));
  const [callResults, setCallResults] = useState([]);

  const { data: availablePitches } = useSWR<BobjectPicklistValueEntity[]>(
    `/messaging/messagingTemplates/search`,
    fetcher,
  );
  const { activity, callResultStepData, setCallResultStepData, updateActivity } = useContactFlow();
  const [notificationId] = useSharedState('notificationId');
  const removeNotification = useNotificationDelete();
  const isNoAnswer =
    callResultStepData?.callResult?.logicRole === CALL_RESULTS_LOGIC_ROLE.NO_ANSWER;
  const { selectedLead, patchLead, updateSelectedLead, updateSingleLead } = useLeads('contactFlow');
  const { company, updateCompany, getCompanyById } = useCompany('contactFlow');
  const originalLeadPhoneFields = getFieldsByType(selectedLead, 'PHONE').reduce(
    (acc, phone) => [
      ...acc,
      { label: phone.label, id: phone.name, logicRole: phone.logicRole, text: phone.text },
    ],
    [],
  );
  const isPitchRequired = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH)?.required;
  const isPitchDone =
    callResultStepData.pitch?.done?.logicRole === PITCH_DONE_VALUES_LOGIC_ROLE.YES;
  const isMissingPitch = isPitchDone && isPitchRequired && !callResultStepData.pitch?.template;
  const originalCompanyPhoneFields = getFieldsByType(company, 'PHONE').reduce(
    (acc, phone) => [
      ...acc,
      { label: phone.label, id: phone.name, logicRole: phone.logicRole, text: phone.text },
    ],
    [],
  );
  const [leadPhoneFields, setLeadPhoneFields] = useState([]);
  const [companyPhoneFields, setCompanyPhoneFields] = useState([]);
  const [leadHasChanges, setLeadHasChanges] = useState(false);
  const [companyHasChanges, setCompanyHasChanges] = useState(false);
  const leadFullName =
    getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
    getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const companyName = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const resetPitch: { done: string; template: string } = {
    done: null,
    template: null,
  };
  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;
  useEffect(() => {
    if (callResultsPicklistValues.length > 0 && callResults.length === 0) {
      setCallResults(filterCallResults(callResultsPicklistValues));
    }
  }, [callResultsPicklistValues]);

  useEffect(() => {
    if (activity && !callResultStepData?.loaded) {
      const callResultField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);
      const pitchField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH);
      const pitchDoneField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE);
      const isCorrectContact =
        callResultField.valueLogicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;

      const activityCompany = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);

      if (activityCompany) {
        getCompanyById(
          getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.split('/')?.pop(),
        );
      }
      updateSelectedLead(getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD));
      setCallResultStepData({
        ...callResultStepData,
        callResult: {
          fieldId: callResultField.name,
          value: callResultField.value,
          logicRole: callResultField.valueLogicRole,
          isCorrectContact,
        },
        pitch: {
          done: pitchDonePicklistValues.find(pitch => pitch?.id === pitchDoneField?.value),
          template: pitchField.value,
        },
        loaded: true,
      });
    }
  }, [activity]);

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

  useEffect(() => {
    mixpanel.track('CORRECT_CONTACT_FLOW_OPENED', {
      source: activity?.fields?.find(
        (field: BobjectField) => field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE,
      )?.text,
    });
  }, []);

  const saveAndNext = () => {
    if (leadHasChanges) {
      patchLead(selectedLead?.id.objectId, leadPhoneFields).then(() => {
        updateSingleLead(selectedLead?.id.objectId);
      });
    }
    if (companyHasChanges) {
      updateCompany(company?.id.objectId, companyPhoneFields).then(() =>
        getCompanyById(company?.id.objectId),
      );
    }

    const data = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT]: callResultStepData?.callResult.logicRole,
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
      [ACTIVITY_FIELDS_LOGIC_ROLE.PITCH]: callResultStepData?.pitch.template,
      [ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE]: callResultStepData?.pitch.done?.id,
    };

    if (activity?.id.objectId) {
      updateActivity(activity?.id.objectId, data).then(() => {
        save(UserHelperKeys.CALL_AND_REPORT_RESULT);
      });
    }
    if (notificationId) {
      removeNotification(notificationId);
    }

    if (isNoAnswer && ccfCloseAtNoAnswer !== ccfCloseAtNoAnswerValue)
      api
        .patch(`/entities/users/${activeUser.id}`, {
          ccfCloseAtNoAnswer: ccfCloseAtNoAnswerValue,
        })
        .then(() => {
          reloadUserSettings();
        });
    handleNext(callResultStepData?.callResult.logicRole, isNoAnswer && ccfCloseAtNoAnswerValue);
  };

  const findPitchDoneNo = (pitches: BobjectPicklistValueEntity[]) =>
    pitches.find(pitch => pitch.logicRole === PITCH_DONE_VALUES_LOGIC_ROLE.NO);

  const isPitchNo = (pitch: BobjectPicklistValueEntity) =>
    findPitchDoneNo(pitchDonePicklistValues)?.id === pitch?.id;

  const calculateHalfNumber = (elements: Array<any>) => {
    const isExactHalf = elements.length % 2 === 0;
    return isExactHalf ? elements.length / 2 : Math.floor(elements.length / 2) + 1;
  };

  const calculateFirstColumnSize = (elements: Array<any>) => {
    const halfNumber = calculateHalfNumber(elements);

    return halfNumber >= 6 ? halfNumber : 6;
  };
  const firstColumnSize = calculateFirstColumnSize(callResults);

  return (
    <>
      <ModalContent>
        <CallInfo activity={activity} />
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text dataTest="Text-Modal-CallResult" size="l" weight="medium" color="peanut">
              What is the call&apos;s result?*
            </Text>
          </div>
          <div
            className={styles._labels__wrapper}
            style={{ maxHeight: firstColumnSize > 6 ? 315 : 250 }}
          >
            {callResults.length ? (
              <>
                <div>
                  {callResults.slice(0, firstColumnSize).map(result => {
                    const hasLogicRole = !!result?.logicRole;
                    return (
                      <div
                        className={styles._label__content}
                        key={`call-result-${result.logicRole || generateRandomId()}`}
                      >
                        <Label
                          key={result.logicRole}
                          value={result.logicRole}
                          dataTest={result.logicRole}
                          uppercase={false}
                          inline={false}
                          align="center"
                          onClick={() => {
                            setCallResultStepData({
                              ...callResultStepData,
                              callResult: {
                                fieldId: result.fieldId,
                                value: result.value,
                                logicRole: result.logicRole || result.fieldId,
                                isCorrectContact: result.isCorrectContact,
                              },
                              pitch: result.isCorrectContact
                                ? {
                                    done: findPitchDoneNo(pitchDonePicklistValues),
                                    template: null,
                                  }
                                : resetPitch,
                            });
                          }}
                          selected={
                            hasLogicRole
                              ? result.logicRole === callResultStepData?.callResult?.logicRole
                              : result.fieldId === callResultStepData?.callResult?.fieldId
                          }
                        >
                          {result.value}
                        </Label>
                      </div>
                    );
                  })}
                </div>
                <div>
                  {callResults.slice(firstColumnSize, callResults.length + 1).map(result => {
                    const hasLogicRole = !!result?.logicRole;

                    return (
                      <div
                        className={styles._label__content}
                        key={`call-result-${result.logicRole || generateRandomId()}`}
                      >
                        <Label
                          key={result.logicRole}
                          value={result.logicRole}
                          dataTest={result.logicRole}
                          uppercase={false}
                          inline={false}
                          align="center"
                          onClick={() => {
                            setCallResultStepData({
                              ...callResultStepData,
                              callResult: {
                                fieldId: result.fieldId,
                                value: result.value,
                                logicRole: result.logicRole || result.fieldId,
                                isCorrectContact: result.isCorrectContact,
                              },
                              pitch: result.isCorrectContact
                                ? {
                                    done: findPitchDoneNo(pitchDonePicklistValues),
                                    template: null,
                                  }
                                : resetPitch,
                            });
                          }}
                          selected={
                            hasLogicRole
                              ? result.logicRole === callResultStepData?.callResult?.logicRole
                              : result.fieldId === callResultStepData?.callResult?.logicRole
                          }
                        >
                          {result.value}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <Spinner name="loadingCircle" />
            )}
          </div>
        </div>
        {callResultStepData?.callResult?.isCorrectContact && (
          <div className={styles._section__wrapper}>
            <div className={styles._section_title__wrapper}>
              <Text size="m" weight="medium" color="peanut">
                Did you get to pitch?
              </Text>
            </div>
            <div className={styles._pitch__wrapper}>
              <div className={styles._chips__wrapper}>
                <ChipGroup
                  value={callResultStepData?.pitch?.done}
                  onChange={value => {
                    setCallResultStepData({
                      ...callResultStepData,
                      pitch: isPitchNo(value as BobjectPicklistValueEntity)
                        ? { template: null, done: value }
                        : { ...callResultStepData?.pitch, done: value },
                    });
                  }}
                >
                  {pitchDonePicklistValues?.map(pitchDone => (
                    <Chip key={`pitch-done-${pitchDone?.id}`} value={pitchDone}>
                      {pitchDone?.value}
                    </Chip>
                  ))}
                </ChipGroup>
              </div>
              {isPitchDone && (
                <div className={styles._pitch_select__wrapper}>
                  <Select
                    value={callResultStepData?.pitch.template}
                    placeholder={'Pitch / Snippet used' + (isPitchRequired ? '*' : '')}
                    width="100%"
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
              End call report flow here
            </Checkbox>
            <Text size="xs" className={styles._no_answer_close_text}>
              This can be changed at any time.
            </Text>
          </div>
        )}
        {callResultStepData?.callResult?.logicRole === CALL_RESULTS_LOGIC_ROLE.WRONG_DATA && (
          <>
            <Text
              className={styles._phone_edit_header}
              dataTest="Text-Modal-CallResult"
              size="m"
              weight="medium"
              color="peanut"
            >
              Do you want to update any of the registered numbers?
            </Text>
            {originalLeadPhoneFields?.length > 0 && (
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
                    {leadFullName} Information
                  </Text>
                </div>
                <div className={styles._phone_input_container}>
                  {originalLeadPhoneFields?.map((phone, index) => (
                    <div className={styles._phone_field_wrapper} key={`lead-phone-${index}`}>
                      <Input
                        key={phone?.id}
                        value={leadPhoneFields[phone?.id]}
                        placeholder={phone?.label}
                        width="365px"
                        onChange={value => {
                          setLeadHasChanges(true);
                          setLeadPhoneFields({ ...leadPhoneFields, [phone?.id]: value });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {originalCompanyPhoneFields?.length > 0 && (
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
                    {companyName} Information
                  </Text>
                </div>
                <div className={styles._phone_input_container}>
                  {originalCompanyPhoneFields?.map((phone, index) => (
                    <div className={styles._phone_field_wrapper} key={`company-phone-${index}`}>
                      <Input
                        key={phone?.id}
                        value={companyPhoneFields[phone?.id]}
                        placeholder={phone?.label}
                        width="365px"
                        onChange={value => {
                          setCompanyHasChanges(true);
                          setCompanyPhoneFields({ ...companyPhoneFields, [phone?.id]: value });
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
            <Button variant="clear" onClick={handleBack}>
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
          <Button
            dataTest={hasLeads ? 'Form-Save' : 'Form-Loading'}
            onClick={saveAndNext}
            disabled={
              (!callResultStepData?.callResult?.logicRole &&
                !callResultStepData?.callResult?.value) ||
              isMissingPitch
            }
          >
            {isNoAnswer && ccfCloseAtNoAnswerValue
              ? (buttonsConfig?.nextButtonTitle || 'SAVE')
              : (buttonsConfig?.nextButtonAlternativeTitle || 'SAVE AND CONTINUE')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default CallResult;
