import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Chip,
  ChipGroup,
  Label,
  ModalContent,
  ModalFooter,
  ModalSection,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useDataModel, useMeetingReportResult, usePicklist } from '@bloobirds-it/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getNameFieldLRFromBobjectType,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';
import { useWizardContext, DefaultWizardsModalParams } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';

import styles from './css/reportResultFirstStep.module.css';

export const MeetingReportResult = ({
  handleNext,
  buttonsConfig,
  wizardKey,
  machineContext,
}: DefaultWizardsModalParams) => {
  const {
    getWizardProperties,
    resetWizardProperties,
    hasCustomWizardsEnabled,
  } = useWizardContext();
  const { bobject: activity, onSaveCallback: onSave } = getWizardProperties(wizardKey);
  const dataModel = useDataModel();

  const defaultMeetingResult = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  );
  const defaultMeetingType = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  );
  const mainTypeField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const [selectedMeetingResultId, setSelectedMeetingResultId] = useState<string>(
    defaultMeetingResult,
  );
  const [selectedMeetingTypeId, setSelectedMeetingTypeId] = useState<string>(defaultMeetingType);
  const { reportResult, meetingResults } = useMeetingReportResult(dataModel, selectedMeetingTypeId);
  const { data: meetingTypes } = usePicklist(mainTypeField?.name);
  const types = meetingTypes?.filter(i => i.enabled).sort((a, b) => a.ordering - b.ordering);
  const referencedBobject = getReferencedBobject(activity);
  const referencedBobjectName = getTextFromLogicRole(
    referencedBobject,
    getNameFieldLRFromBobjectType(referencedBobject?.id?.typeName),
  );
  const { t } = useTranslation();

  function handleClose() {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CLOSE_IN_WIZARD_STEP_ + 'MEETING_RESULT');
    resetWizardProperties(wizardKey);
    setTimeout(() => {
      if (onSave) onSave();
    }, 500);
  }
  function handleSubmit(mustContinue: boolean) {
    const markAsReported =
      !hasCustomWizardsEnabled ||
      machineContext?.wizardConfig?.markReportedAtStart === true ||
      machineContext?.wizardConfig?.markReportedAtStart === undefined ||
      (machineContext?.wizardConfig?.markReportedAtStart === false && !mustContinue);

    reportResult(activity, selectedMeetingTypeId, selectedMeetingResultId, markAsReported).then(
      () => {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_REPORT_MEETING_RESULT_FROM_TAB_OTO);

        window.dispatchEvent(
          new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
            detail: { type: BobjectTypes.Activity },
          }),
        );
        if (mustContinue) {
          if (handleNext) {
            handleNext();
          }
        } else {
          handleClose();
        }
      },
    );
  }

  useEffect(() => {
    if (!selectedMeetingResultId) {
      setSelectedMeetingResultId(defaultMeetingResult);
    } else {
      const result = meetingResults?.find(result => result.id === selectedMeetingResultId);
      if (!result) {
        setSelectedMeetingResultId(null);
      }
    }
    if (!selectedMeetingTypeId) {
      setSelectedMeetingTypeId(defaultMeetingType);
    }
  }, []);

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;

  return (
    <>
      <ModalContent>
        <ModalSection
          size="m"
          title={t('wizards.steps.meetingReportResult.title', { name: referencedBobjectName })}
          icon="calendar"
        >
          <div className={styles._section__wrapper}>
            <div className={styles._section_title__wrapper}>
              <Text size="m" weight="medium" color="peanut">
                {t('wizards.steps.meetingReportResult.meetingType')}
              </Text>
            </div>
            <ChipGroup value={selectedMeetingTypeId} onChange={setSelectedMeetingTypeId}>
              {types?.map((type: any) => (
                <Chip size="small" key={type?.id} value={type?.id}>
                  {type?.value}
                </Chip>
              ))}
            </ChipGroup>
          </div>

          <div className={styles._section__wrapper}>
            <div className={styles._section_title__wrapper}>
              <Text size="m" weight="medium" color="peanut">
                {t('wizards.steps.meetingReportResult.meetingResult')}
              </Text>
            </div>
          </div>
          <div className={styles._labels__wrapper}>
            <div className={styles._label__content}>
              {meetingResults &&
                meetingResults?.map(result => (
                  <Label
                    uppercase={false}
                    inline={false}
                    align="center"
                    key={`meeting-result-${result?.id}`}
                    selected={result.id === selectedMeetingResultId}
                    onClick={() => setSelectedMeetingResultId(result.id)}
                  >
                    {result?.name}
                  </Label>
                ))}
            </div>
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        {showSkipButton && (
          <Button variant="clear" onClick={handleClose} className={styles._back_button}>
            {t('common.close')}
          </Button>
        )}
        <Button
          dataTest="Form-Save"
          onClick={() => handleSubmit(false)}
          variant="secondary"
          className={styles._skip_button}
          disabled={!selectedMeetingResultId}
        >
          {t('wizards.common.skipWizard')}
        </Button>
        <Button
          dataTest="Form-Save-And-Add-notes"
          onClick={() => handleSubmit(true)}
          disabled={!selectedMeetingResultId}
        >
          {t('wizards.common.next')}
        </Button>
      </ModalFooter>
    </>
  );
};
