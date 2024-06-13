import React, { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { ActivityFeed } from '@bloobirds-it/activity-feed';
import { Button, ModalContent, Text } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import { Note } from '@bloobirds-it/notes';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  MessagesEvents,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, injectReferencesSearchProcess } from '@bloobirds-it/utils';
import {
  useWizardContext,
  DefaultWizardsModalParams,
  ButtonsStepConfig,
} from '@bloobirds-it/wizard-modal-context';

import styles from './css/reportResultSecondStep.module.css';
import { useNoteActivities } from './hooks/useNoteActivities';

const AlternativeFooter = ({
  onSubmit,
  handleClose,
  buttonsConfig,
  handleNext,
}: {
  onSubmit?: () => void;
  handleClose: () => void;
  buttonsConfig?: ButtonsStepConfig;
  handleNext?: () => void;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.common' });
  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  return (
    <div className={styles.alternativeFooter}>
      {showSkipButton && (
        <Button variant="secondary" onClick={handleClose}>
          {t('skipWizard')}
        </Button>
      )}
      <Button
        variant="primary"
        onClick={() => {
          onSubmit();
          handleNext();
        }}
      >
        {buttonsConfig?.nextButtonTitle || t('next')}
      </Button>
    </div>
  );
};

export const MeetingResultNotes = ({
  wizardKey,
  handleNext,
  buttonsConfig,
  handleBack,
  machineContext,
}: DefaultWizardsModalParams) => {
  const { getWizardProperties } = useWizardContext();
  const { bobject: activity, onSaveCallback: onSave } = getWizardProperties(wizardKey);
  const dataModel = useDataModel();
  const accountId = dataModel?.getAccountId();
  const [selectedActivity, setSelectedActivity] = useState<Bobject>(activity);
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const company = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  const opportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>();
  const [, setCurrRef] = useState<typeof ref>();

  function handleNextStep() {
    handleNext();
    setTimeout(() => {
      onSave?.();
    }, 500);
  }

  const {
    activities,
    isLoading,
    totalMatching,
    fetchNextPage,
    mutate,
    mutateMainActivity,
  } = useNoteActivities({
    activityId: activity?.id?.value,
    accountId: dataModel?.getAccountId(),
    leadId: lead?.referencedBobject ? lead?.referencedBobject.id?.value : lead?.value,
    companyId: company?.referencedBobject ? company?.referencedBobject.id?.value : company?.value,
    opportunityId: opportunity?.referencedBobject
      ? opportunity?.referencedBobject.id?.value
      : opportunity?.value,
    activity: activity,
  });
  const activityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole;
  // Not pretty, I know, but it's the only way to rerender and force the ref to be present
  useEffect(() => {
    setCurrRef(ref);
  }, [ref.current]);

  function getStepTitle() {
    switch (activityType) {
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
        return t('wizards.steps.meetingResultNotes.addMeetingNotes');
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
        return t('wizards.steps.meetingResultNotes.addCallNotes');
      default:
        return t('wizards.steps.meetingResultNotes.addNotes');
    }
  }

  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;

  return (
    <>
      <ModalContent>
        <section className={styles.notes_section_container}>
          <article className={styles.notes_feed}>
            <div className={styles.notes_title}>
              <Text size="m" weight="bold">
                {getStepTitle()}
              </Text>
              <Button
                variant="clear"
                iconLeft="plus"
                size="small"
                uppercase={false}
                onClick={() => setSelectedActivity(null)}
              >
                {t('wizards.steps.meetingResultNotes.createNew')}
              </Button>
            </div>
            <div ref={ref} className={styles.notes_container}>
              {!isLoading && activities.length === 0 ? (
                <div className={styles.empty_placeholder}>
                  <Text size="xl">👉</Text>
                  <Text size="m" color="softPeanut">
                    <Trans i18nKey={'wizards.steps.meetingResultNotes.emptyPlaceholder'}>
                      You do not have any notes on this object yet, <b>create one to continue!</b>
                    </Trans>
                  </Text>
                </div>
              ) : (
                <ActivityFeed
                  activities={activities}
                  isLoading={isLoading}
                  dataModel={dataModel}
                  handleOnClick={bobject => setSelectedActivity(bobject)}
                  fetchNextPage={fetchNextPage}
                  parentRef={ref}
                  total={totalMatching}
                  showTooltipBlock={false}
                />
              )}
            </div>
            <div className={styles.skipButton}>
              {hasPreviousStep && (
                <Button variant="clear" onClick={handleBack}>
                  {buttonsConfig?.previousButtonTitle || t('wizards.common.back')}
                </Button>
              )}
            </div>
          </article>
          <div className={styles.divider} />
          <article className={styles.notes_section}>
            {selectedActivity ? (
              <Note
                accountId={accountId}
                activity={selectedActivity}
                onSave={id => {
                  window.dispatchEvent(
                    new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                      detail: { type: BobjectTypes.Activity },
                    }),
                  );
                  activity?.id?.value === id ? mutateMainActivity() : mutate();
                }}
                alternativeFooter={
                  <AlternativeFooter
                    handleClose={() => {
                      machineContext?.handleClose?.();
                    }}
                    buttonsConfig={buttonsConfig}
                    handleNext={handleNextStep}
                  />
                }
              />
            ) : (
              <Note
                accountId={accountId}
                relatedCompany={company?.referencedBobject}
                relatedLead={lead?.referencedBobject}
                relatedOpportunity={opportunity?.referencedBobject}
                onSave={id => {
                  mutate().then((data: any) => {
                    const activities = injectReferencesSearchProcess(data?.data)?.contents;
                    const find = activities.find(activity => activity.id.value === id);
                    setSelectedActivity(find);
                  });
                }}
                alternativeFooter={
                  <AlternativeFooter
                    handleClose={() => {
                      machineContext?.handleClose?.();
                    }}
                    buttonsConfig={buttonsConfig}
                    handleNext={handleNextStep}
                  />
                }
              />
            )}
          </article>
        </section>
      </ModalContent>
    </>
  );
};
