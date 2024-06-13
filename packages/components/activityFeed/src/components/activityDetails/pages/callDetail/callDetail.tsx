import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityTimelineItem } from '@bloobirds-it/activity-timeline-item';
import { CopilotAnalysis } from '@bloobirds-it/copilot';
import { Button, Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import {
  useCopilotEnabled,
  useNumintecEnabled,
  useCopilotActivity,
  CopilotActivityContextProvider,
} from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  DataModelResponse,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  formatDate,
  getExtensionBobjectByIdFields,
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';

import { CopilotSuggestionsCallout } from '../../components/copilotSuggestionsCallout/copilotSuggestionsCallout';
import { DetailsFooter } from '../../components/detailsFooter/detailsFooter';
import { ExpandedBoxSection } from '../../components/expandedBoxSection/expandedBoxSection';
import { InfoBox } from '../../components/textBox/infoBox';
import { ShowTranscriptButton, TranscriptView } from '../../components/transcript/transcript';
import styles from './callDetail.module.css';
import { CallSoundWave } from './callSoundWave';

const NoCallRecordingMessage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Text align="center" className={styles.noRecordingText}>
        {t('callDetail.noCallRecordingMessage')}
      </Text>
    </div>
  );
};

const DetailedActivity = ({
  activity,
  dataModel,
  userId,
  actionsDisabled,
  openContactFlow,
  isBubble,
}: {
  activity: Bobject;
  dataModel: DataModelResponse;
  userId?: string;
  actionsDisabled?: boolean;
  openContactFlow?: () => void;
  isBubble?: boolean;
}) => {
  const [error, setError] = useState(undefined);
  const creationDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME)
    ?.split('.')[0]
    ?.toString();
  const leadNumber = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER,
  );
  const userPhone = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_USER_PHONE_NUMBER,
  );
  const parsedCreationDate = creationDate + (creationDate?.slice(-1) === 'Z' ? '' : 'Z');
  const creationDateTime = creationDate
    ? formatDate(new Date(parsedCreationDate), 'MMM dd yyyy, HH:mm')
    : '';
  const callDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const result = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);
  const callNote = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const audioSource = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  const callSid = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.SID);
  const enabledNumintecDialer = useNumintecEnabled(dataModel?.getAccountId());

  const SoundWave = useCallback(
    () => <CallSoundWave audioSource={audioSource} callId={callSid} setError={setError} />,
    [audioSource, callSid],
  );

  const { hasOverlay, transcript, overlay, resetOverlay } = useCopilotActivity();
  useEffect(() => {
    resetOverlay();
  }, [activity?.id?.objectId]);

  const isCopilotEnabled = useCopilotEnabled(dataModel?.getAccountId());
  const { t } = useTranslation();

  useEffect(() => {
    if (error) setError(undefined);
  }, [callSid]);

  return (
    <div className={styles.htmlBody}>
      <ActivityTimelineItem
        activity={activity}
        startDisplayDivider={false}
        endDisplayDivider={false}
        activeHover={false}
        extended
        alternativeDescription
        dataModel={dataModel}
        userId={userId}
        actionsDisabled={actionsDisabled}
        openContactFlow={openContactFlow}
      />
      <div className={styles.callInfoWrapper}>
        {!error && (audioSource || (enabledNumintecDialer && Number(callDuration))) ? (
          <SoundWave />
        ) : (
          <NoCallRecordingMessage />
        )}

        {overlay === 'transcript' && <TranscriptView activity={activity} />}
        {overlay === 'analysis' && <CopilotAnalysis activity={activity} />}
        {!hasOverlay && (
          <>
            {isCopilotEnabled && transcript?.status === 'GENERATED' && (
              <>
                <div className={styles.separator} />
                <CopilotSuggestionsCallout isBubble={isBubble} />
              </>
            )}
            <ExpandedBoxSection grid>
              <InfoBox
                icon="agendaPerson"
                title={t('detailedActivity.expandedBoxSection.leadNumber')}
                info={leadNumber || t('common.none')}
              />
              <InfoBox
                icon="phone"
                title={t('detailedActivity.expandedBoxSection.userNumber')}
                info={userPhone || t('common.none')}
              />
              <InfoBox
                icon="calendar"
                title={t('detailedActivity.expandedBoxSection.callDate')}
                info={creationDateTime}
              />
              <InfoBox
                icon="clock"
                title={t('detailedActivity.expandedBoxSection.callDuration')}
                info={
                  callDuration
                    ? new Date((callDuration as any) * 1000).toISOString().substring(14, 19)
                    : t('common.none').toLowerCase()
                }
              />
              {result ? (
                <InfoBox
                  icon="phoneHang"
                  title={t('detailedActivity.expandedBoxSection.callResult')}
                  info={result}
                />
              ) : (
                <></>
              )}
              {isCopilotEnabled && transcript && <ShowTranscriptButton activity={activity} />}
            </ExpandedBoxSection>
            <ExpandedBoxSection>
              <InfoBox
                icon="noteAction"
                title={t('detailedActivity.expandedBoxSection.noteAction')}
                info={callNote}
              />
            </ExpandedBoxSection>
          </>
        )}
      </div>
    </div>
  );
};

export const CallDetail = ({
  activity,
  dataModel,
  visibleFooter = true,
  onSave,
  actionsDisabled = false,
  userId,
  isBubble,
}: {
  activity: Bobject;
  dataModel: DataModelResponse;
  visibleFooter?: boolean;
  onSave?: () => void;
  actionsDisabled?: boolean;
  userId?: string;
  openSuggestedActions?: () => void;
  isBubble?: boolean;
}) => {
  const reportResult = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);
  const callReported = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
    ?.valueLogicRole;
  const [isOpenContactFlowModal, setIsOpenContactFlowModal] = useState(false);
  const [referenceBobject, setReferenceBobject] = useState<ExtensionBobject>(
    // @ts-ignore
    getReferencedBobject(activity),
  );
  const { t } = useTranslation();
  const { openWizard, resetWizardProperties } = useWizardContext();
  const assignee =
    getFieldByLogicRole(
      (referenceBobject as unknown) as Bobject,
      LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    )?.value || referenceBobject?.assignedTo;

  const assignedToActiveUser = assignee === userId;

  function handleClose() {
    setIsOpenContactFlowModal(false);
    onSave?.();
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  function handleOnClick() {
    const referencedBobject = getReferencedBobject(activity);
    if (!referencedBobject)
      getExtensionBobjectByIdFields(referencedBobject.id).then(({ data }) =>
        setReferenceBobject(data),
      );
    setIsOpenContactFlowModal(true);
  }

  return (
    <div className={styles.container}>
      {!activity ? (
        <div className={styles.loading}>
          <Spinner name="loadingCircle" />
        </div>
      ) : (
        <>
          <CopilotActivityContextProvider activity={activity}>
            <DetailedActivity
              activity={activity}
              dataModel={dataModel}
              userId={userId}
              actionsDisabled={actionsDisabled}
              openContactFlow={handleOnClick}
              isBubble={isBubble}
            />
          </CopilotActivityContextProvider>

          {visibleFooter && (
            <DetailsFooter>
              {callReported && callReported === REPORTED_VALUES_LOGIC_ROLE.YES ? (
                <Button
                  variant="primary"
                  color="verySoftMelon"
                  className={clsx(styles.reportResultButton, {
                    [styles.disabledButton]: actionsDisabled && !assignedToActiveUser,
                  })}
                  onClick={handleOnClick}
                  disabled={actionsDisabled && !assignedToActiveUser}
                >
                  <Icon name="thumbsUp" size={14} color="melon" />
                  {reportResult || t('detailedActivity.expandedBoxSection.callReported')}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleOnClick}
                  disabled={actionsDisabled && !assignedToActiveUser}
                >
                  <Icon name="thumbsUp" size={14} />
                  {t('common.reportResult')}
                </Button>
              )}
            </DetailsFooter>
          )}
        </>
      )}
      {isOpenContactFlowModal &&
        referenceBobject &&
        openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activity, {
          referenceBobject: referenceBobject,
          handleClose: handleClose,
        })}
    </div>
  );
};
