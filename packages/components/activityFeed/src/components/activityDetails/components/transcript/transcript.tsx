import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  IconButton,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useUserSettings, useCopilotActivity } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  MIXPANEL_EVENTS,
  TranscriptFragment,
  UserType,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import headerStyles from '../textBox/textBox.module.css';
import styles from './transcript.module.css';

const ConversationBlock = ({ fragment }: { fragment: TranscriptFragment }) => {
  return (
    <div>
      <div className={styles.fragmentHeader}>
        <Text color="purple" size="xs" weight="bold">
          {/* @ts-ignore */}
          <Icon name={fragment.isLead ? 'person' : 'user'} color="purple" size={16} />
          {fragment.speaker} ({fragment.isLead ? 'lead' : 'user'})
        </Text>
      </div>

      <Text size="xxs">
        {fragment.text}
        <br />
      </Text>
    </div>
  );
};

export const EditTranscriptModal = ({
  activity,
  open,
  onClose,
}: {
  activity: Bobject;
  open: boolean;
  onClose: () => void;
}) => {
  const { transcript, reloadTranscript } = useCopilotActivity();

  const { t } = useTranslation();

  const [transcriptValue, setTranscriptValue] = useState(
    transcript?.transcript ? JSON.stringify(transcript?.transcript, null, 4) : '',
  );

  const updateTranscript = () => {
    api
      .patch(`/copilot/transcript/${activity?.id.objectId}`, {
        transcript: JSON.parse(transcriptValue),
      })
      .then(() => reloadTranscript().then(onClose));
  };

  useEffect(() => {
    if (open && transcript?.transcript) {
      setTranscriptValue(JSON.stringify(transcript?.transcript, null, 4));
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} width={800}>
      <ModalHeader size="small" color="verySoftPurple">
        <ModalTitle variant="primary" size="small" icon="snippet">
          Edit transcription
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} color="purple" size="small" />
      </ModalHeader>
      <ModalContent className={styles.content}>
        <AceEditor
          mode="json"
          width="680px"
          wrapEnabled={true}
          value={transcriptValue}
          onChange={value => setTranscriptValue(value)}
        />
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <Button
          variant="clear"
          onClick={onClose}
          color="extraMeeting"
          uppercase={false}
          size="small"
        >
          {t('crmUpdatesModal.cancel')}
        </Button>
        <Button
          className={styles.accpetButton}
          onClick={updateTranscript}
          uppercase={false}
          variant="primary"
          size="small"
        >
          {t('crmUpdatesModal.accept')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const TranscriptView = ({ activity }: { activity: Bobject }) => {
  const { setOverlay, transcript } = useCopilotActivity();

  const type = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole as ACTIVITY_TYPES_VALUES_LOGIC_ROLE;
  const isCall = type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  const backTo = isCall ? 'call' : 'meeting';
  const { t } = useTranslation();

  const settings = useUserSettings();
  const canEdit = settings?.user.type === UserType.SUPPORT_USER;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.backButton} onClick={() => setOverlay(undefined)}>
        <Icon name="arrowLeft" />
        <Text size="xs" color="bloobirds">
          {t('activityTimelineItem.item.transcript.backTo', { type: backTo })}
        </Text>
      </div>
      <div className={styles.header}>
        <Icon name="snippet" />
        <Text size="s" weight="bold" className={styles.transcriptHeader}>
          {t('activityTimelineItem.item.transcript.transcription')}{' '}
        </Text>
        {canEdit && (
          <IconButton
            name="edit"
            size={20}
            onClick={() => {
              setModalOpen(true);
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_EDIT_TRANSCRIPT);
            }}
          />
        )}
      </div>

      <div className={styles.blocks}>
        {transcript?.transcript?.map((fragment, index) => (
          <ConversationBlock key={index} fragment={fragment} />
        ))}
      </div>

      <EditTranscriptModal
        activity={activity}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export const ShowTranscriptButton = ({ activity }: { activity: Bobject }) => {
  const { setOverlay, transcript } = useCopilotActivity();
  const { t } = useTranslation();
  const dateTimeString = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME);
  const meetingDate = dateTimeString ? new Date(dateTimeString) : undefined;
  const type = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole as ACTIVITY_TYPES_VALUES_LOGIC_ROLE;
  const isCall = type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;

  const cantGenerateTooltip = isCall
    ? t('activityTimelineItem.item.transcript.cantGenerateCall')
    : t('activityTimelineItem.item.transcript.cantGenerateMeeting');
  const botId = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.BOT_ID);
  const { data: temporalDownloadUrl } = useSWR(`/messaging/recall/recording/${botId}`, key =>
    api.get<{ url: string }>(key).then(res => res.data),
  );

  const settings = useUserSettings();
  const canDownload = settings?.user.type === UserType.SUPPORT_USER;

  if (!transcript || !meetingDate || meetingDate >= new Date()) {
    return <></>;
  }

  return (
    <div className={headerStyles.smallInfoSection}>
      <div className={headerStyles.smallInfoSectionTitle}>
        <Icon name="snippet" color="bloobirds" />
        <Text size="xs" weight="heavy">
          {t('common.transcript')}
        </Text>
        {temporalDownloadUrl?.url && canDownload && (
          <IconButton
            name="download"
            className={styles.downloadButton}
            onClick={() => window.open(temporalDownloadUrl.url, '_blank')}
          />
        )}
      </div>
      {transcript?.status === 'GENERATED' && (
        <Button
          onClick={() => {
            setOverlay('transcript');
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_OPEN_TRANSCRIPT);
          }}
          size="small"
          uppercase={false}
        >
          <Icon name="stars" color="purple" size={12} />
          <Text size="xs" color="purple" uppercase={false}>
            {t('activityTimelineItem.item.transcript.show')}
          </Text>
        </Button>
      )}
      {transcript?.status === 'NOT_GENERATED' && (
        <Button size="small" uppercase={false} variant="IAGradient">
          <Icon name="stars" color="purple" size={12} />
          <Text size="xxs" color="purple" uppercase={false}>
            {t('activityTimelineItem.item.transcript.generate')}
          </Text>
        </Button>
      )}
      {transcript.status === 'GENERATING' && (
        <Tooltip title={t('activityTimelineItem.item.transcript.generating')} position="top">
          <Button size="small" uppercase={false} variant="IAGradient" disabled>
            <div className={styles.button}>
              <Spinner name="loadingCircle" color="purple" size={12} />
              <Text size="xs" color="purple" uppercase={false}>
                {t('common.generating')}...
              </Text>
            </div>
          </Button>
        </Tooltip>
      )}
      {transcript?.status === 'CANT_GENERATE' && (
        <Tooltip title={cantGenerateTooltip} position="top">
          <Button disabled size="small" uppercase={false}>
            <Icon name="stars" color="softCondition" size={12} />
            <Text size="xxs" color="softCondition" uppercase={false}>
              {t('activityTimelineItem.item.transcript.generate')}
            </Text>
          </Button>
        </Tooltip>
      )}

      {transcript?.status === 'NOT_FINISHED' && (
        <Tooltip title={t('activityTimelineItem.item.transcript.meetingProcessed')} position="top">
          <Button size="small" uppercase={false} variant="IAGradient" disabled>
            <div className={styles.button}>
              <Spinner name="loadingCircle" color="purple" size={12} />
              <Text size="xs" color="purple" uppercase={false}>
                {t('common.generating')}...
              </Text>
            </div>
          </Button>
        </Tooltip>
      )}
    </div>
  );
};
