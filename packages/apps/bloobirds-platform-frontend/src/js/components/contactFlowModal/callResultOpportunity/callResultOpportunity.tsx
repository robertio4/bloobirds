import React, { useEffect, useState } from 'react';

import {
  Button,
  Chip,
  ChipGroup,
  ModalContent,
  ModalFooter,
  Text,
  TextArea,
} from '@bloobirds-it/flamingo-ui';
import { WizardsModalProps } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { CALL_RESULTS_LOGIC_ROLE } from '../../../constants/callResult';
import { useContactFlow, usePicklistValues, useSharedState } from '../../../hooks';
import { useNotificationDelete } from '../../../hooks/useNotifications';
import { getFieldByLogicRole } from '../../../utils/bobjects.utils';
import CallInfo from '../callInfo/callInfo';
import { filterCallResults } from '../contactFlow.utils';
import styles from './callResultOpportunity.module.css';

const isCorrectContact = (logicRole: string) =>
  logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;

interface CallResultOpportunityProps extends WizardsModalProps {
  handleNext: (isCorrectContact: boolean) => void;
}
const CallResultOpportunity = ({
  handleNext,
  handleBack,
  handleSkip,
  buttonsConfig,
}: CallResultOpportunityProps) => {
  const [callResults, setCallResults] = useState([]);
  const callResultsPicklistValues = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT,
  });
  const {
    activity,
    callResultStepData,
    noteStepData,
    setCallResultStepData,
    setNoteStepData,
    updateActivity,
  } = useContactFlow();
  const [notificationId] = useSharedState('notificationId');
  const correctContact = callResults.find(
    result => result.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT,
  );
  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  // That's awful, I know. But we should do it for cases that they change the no answer
  const noAnswer = callResults.find(
    result =>
      result.logicRole === CALL_RESULTS_LOGIC_ROLE.NO_ANSWER || result?.value === 'No Answer',
  );
  const removeNotification = useNotificationDelete();

  useEffect(() => {
    if (activity && !noteStepData) {
      const noteField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);

      setNoteStepData({
        value: noteField?.text,
        fieldId: noteField?.name,
      });
    }
  }, [activity]);

  useEffect(() => {
    if (!callResultStepData.callResult?.logicRole) {
      setCallResultStepData({
        ...callResultStepData,
        callResult: noAnswer,
      });
    }
  }, [callResultStepData?.callResult]);

  useEffect(() => {
    if (callResultsPicklistValues.length > 0 && callResults.length === 0) {
      setCallResults(filterCallResults(callResultsPicklistValues));
    }
  }, [callResultsPicklistValues]);

  const saveAndNext = () => {
    const data = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT]: callResultStepData?.callResult.logicRole,
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: noteStepData?.value,
    };

    if (activity?.id.objectId) {
      updateActivity(activity?.id.objectId, data);
    }
    if (notificationId) {
      removeNotification(notificationId);
    }
    handleNext(isCorrectContact(callResultStepData?.callResult?.logicRole));
  };

  useEffect(() => {
    mixpanel.track('ENTERED_IN_CC_OPPORTUNITY_STEP1');
  }, []);

  return (
    <>
      <ModalContent>
        <CallInfo activity={activity} />
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text dataTest="Text-Modal-CallResultOpp" size="m" weight="medium" color="peanut">
              Have you been able to contact?*
            </Text>
          </div>
          <ChipGroup
            value={isCorrectContact(callResultStepData?.callResult?.logicRole) ? 'yes' : 'no'}
            onChange={value => {
              setCallResultStepData({
                ...callResultStepData,
                callResult: value === 'yes' ? correctContact : noAnswer,
              });
            }}
          >
            <Chip dataTest="Opportunity-Yes" value="yes">
              YES
            </Chip>
            <Chip dataTest="Opportunity-No" value="no">
              NO
            </Chip>
          </ChipGroup>
        </div>
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text size="m" weight="medium" color="peanut">
              Do you want to add any information?
            </Text>
          </div>
          <TextArea
            rows={4}
            placeholder="Add a note..."
            width="100%"
            onChange={value =>
              setNoteStepData({
                ...noteStepData,
                value,
              })
            }
          />
        </div>
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
          <Button
            dataTest="Form-Next"
            onClick={saveAndNext}
            disabled={!callResultStepData.callResult?.logicRole}
          >
            {buttonsConfig?.nextButtonTitle || 'NEXT'}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default CallResultOpportunity;
