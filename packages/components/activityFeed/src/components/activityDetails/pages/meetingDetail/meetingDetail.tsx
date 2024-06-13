import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CopilotAnalysis } from '@bloobirds-it/copilot';
import {
  Avatar,
  Button,
  Clipboard,
  Icon,
  IconButton,
  IconType,
  Spinner,
  Text,
  useHover,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import {
  CopilotActivityContextProvider,
  useCopilotActivity,
  useCopilotEnabled,
  useIsB2CAccount,
  useMinimizableModals,
} from '@bloobirds-it/hooks';
import { MeetingResultField, MeetingTypeField } from '@bloobirds-it/meeting';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  companyUrl,
  DataModelResponse,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  api,
  formatDate,
  getFieldByLogicRole,
  getReferencedBobject,
  getRelatedBobject,
  getTextFromLogicRole,
  getUserTimeZone,
  getValueFromLogicRole,
  isAfterDate,
  isStringifiedJSON,
  isToday,
  leadUrl,
  linkify,
  parseUTCDateTimeToLocal,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import {
  GoogleMeet,
  GoToMeeting,
  MicrosoftTeams,
  Video,
  Webex,
  Zoom,
} from '../../../../assets/svg';
import { CopilotSuggestionsCallout } from '../../components/copilotSuggestionsCallout/copilotSuggestionsCallout';
import { DetailsFooter } from '../../components/detailsFooter/detailsFooter';
import { ExpandedBoxSection } from '../../components/expandedBoxSection/expandedBoxSection';
import { InfoBox } from '../../components/textBox/infoBox';
import { ShowTranscriptButton, TranscriptView } from '../../components/transcript/transcript';
import { Invitee, InviteeCard } from './inviteeCard/inviteeCard';
import styles from './meetingDetail.module.css';

interface MeetingBotInfoProps {
  activity: Bobject;
  onEdit: () => void;
}

interface NoteTakerStatus {
  text: string;
  icon: JSX.Element | undefined;
}

function getIcon(provider: string) {
  switch (provider) {
    case 'Google Meet':
      return GoogleMeet;
    case 'Zoom Meeting':
      return Zoom;
    case 'Microsoft Teams':
      return MicrosoftTeams;
    case 'WebEx':
      return Webex;
    case 'GoToMeeting':
      return GoToMeeting;
    default:
      return Video;
  }
}

const getNoteTakerStatus = (botId: string, isFuture: boolean): NoteTakerStatus => {
  const noteTakerNotSent = isFuture && !botId;
  const noteTakerSent = isFuture && botId;
  const meetingWithBotCompleted = !isFuture && botId;

  if (noteTakerNotSent) {
    return {
      text: 'activityTimelineItem.item.sendNoteTaker',
      icon: <Icon name="plus" size={16} color="purple" />,
    };
  } else if (noteTakerSent) {
    return {
      text: 'activityTimelineItem.item.notSendNoteTaker',
      icon: <IconButton name="cross" size={16} color="purple" />,
    };
  } else if (meetingWithBotCompleted) {
    return {
      text: 'activityTimelineItem.item.noteTakerSent',
      icon: <Icon name="check" size={16} color="melon" />,
    };
  } else {
    return {
      text: 'activityTimelineItem.item.noteTakerNotSent',
      icon: undefined,
    };
  }
};

const MeetingBotInfo: React.FC<MeetingBotInfoProps> = ({
  activity,
  onEdit,
}: {
  activity: Bobject;
  onEdit: () => void;
}) => {
  const botId = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.BOT_ID);
  const meetingTime = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const theMeetingIsToday = isToday(parseUTCDateTimeToLocal(meetingTime), getUserTimeZone());
  const isFuture =
    isAfterDate(parseUTCDateTimeToLocal(meetingTime), new Date()) || theMeetingIsToday;

  const { createToast } = useToasts();
  const { t } = useTranslation();

  const handleSendBot = () => {
    api
      .post('/messaging/recall/bot', {
        meeting: activity?.id?.value,
      })
      .then(() => {
        createToast({ message: t('activityTimelineItem.item.noteTakerSentOk'), type: 'success' });
        onEdit();
      })
      .catch(() => {
        createToast({
          message: t('activityTimelineItem.item.noteTakerSentError'),
          type: 'error',
        });
      });
  };

  const handleRemoveBot = () => {
    api
      .delete(`/messaging/recall/bot?meeting=${activity?.id?.value}`)
      .then(() => {
        createToast({ message: t('activityTimelineItem.item.noteTakerRemoved'), type: 'success' });
        onEdit();
      })
      .catch(() => {
        createToast({
          message: t('activityTimelineItem.item.noteTakerRemoveError'),
          type: 'error',
        });
      });
  };

  const [ref, visible] = useHover();

  const handleClick = () => {
    if (isFuture) {
      if (botId) {
        handleRemoveBot();
      } else {
        handleSendBot();
      }
    }
  };

  const { text: buttonText, icon: rightIcon } = getNoteTakerStatus(botId, isFuture);
  return (
    <div
      className={clsx(styles.noteTaker, {
        [styles.meetingCompleted]: !isFuture,
        [styles.noteTakerSent]: isFuture && botId,
        [styles.noteTakerHover]: isFuture && visible,
        [styles.noteTakerHoverStrong]: isFuture && visible && botId,
        [styles.noteTakerInactive]: !isFuture,
      })}
      ref={ref}
      onClick={handleClick}
    >
      <Icon name="stars" color="purple" size={16} />
      <Text
        size="xs"
        color={isFuture || theMeetingIsToday ? 'purple' : 'lightPurple'}
        align="center"
      >
        {t(buttonText)}
      </Text>
      {rightIcon}
    </div>
  );
};

interface DetailedActivityProps {
  activity: Bobject;
  dataModel: DataModelResponse;
  onGoToBobject: (bobjectId: string) => void;
  onEdit: () => void;
  setIsReported: (isReported: boolean) => void;
  isBubble?: boolean;
}

const DetailedActivity = ({
  activity,
  dataModel,
  onGoToBobject,
  onEdit,
  setIsReported,
  isBubble,
}: DetailedActivityProps) => {
  const creationDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const scheduledDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const creationDateTime = creationDate && formatDate(new Date(creationDate), 'MMM dd yyyy, HH:mm');

  const reminder = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REMINDER_TEMPLATE);
  const meetingResult = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT);
  const meetingResultValue = meetingResult?.text;
  const meetingType = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);

  const assignedTo = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);
  const conferencingJson = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CONFERENCING);
  const conferencingParsed =
    conferencingJson && isStringifiedJSON(conferencingJson) && JSON.parse(conferencingJson);
  const meetingTitle = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const meetingInvitees = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES,
  );
  const [showMore, setShowMore] = useState<boolean>(false);
  const parsedInvitees = meetingInvitees ? JSON.parse(meetingInvitees) : null;
  const isCopilotEnabled = useCopilotEnabled(dataModel?.getAccountId());
  const { t } = useTranslation();
  const isB2CAccount = useIsB2CAccount();

  const meetingNote = useMemo(
    () => linkify(getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE)),
    [activity],
  );

  const meetingCalendarNote = useMemo(
    () => linkify(getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE)),
    [activity],
  );

  const hasNylasID = !!getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID);

  const company = !isB2CAccount ? getRelatedBobject(activity, 'Company') : null;
  const lead = getRelatedBobject(activity, 'Lead');

  useEffect(() => {
    resetOverlay();
    clearAllSubscriptions();
    setIsReported(
      getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole ===
        REPORTED_VALUES_LOGIC_ROLE.YES,
    );
  }, [activity?.id?.objectId]);

  const {
    hasOverlay,
    transcript,
    overlay,
    resetOverlay,
    clearAllSubscriptions,
  } = useCopilotActivity();

  return (
    <div className={styles.htmlBody}>
      <div className={styles.meetingInfoWrapper}>
        <div className={styles.meetingInfo}>
          <Avatar color="lightestMeeting" size="small">
            <Icon name="calendar" color="extraMeeting" size={16} />
          </Avatar>
          <Text weight="bold" size="m">
            {meetingTitle}
          </Text>
        </div>
        <ExpandedBoxSection>
          <div className={styles.relatedBobjects}>
            {lead && (
              <div className={styles.ellipsis}>
                <BobjectNameDisplay
                  name={getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)}
                  icon="person"
                  onClick={() => onGoToBobject(lead.id.value)}
                />
              </div>
            )}

            {lead && company && <div className={styles._separator} />}
            {company && (
              <BobjectNameDisplay
                name={getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)}
                icon="company"
                onClick={() => onGoToBobject(company.id.value)}
              />
            )}
          </div>
          <div className={styles.meetingTime}>
            <Icon name="clock" size={16} color="verySoftBloobirds" />
            <Text size="xs">
              {scheduledDate && formatDate(new Date(scheduledDate), 'iii dd MMM yyyy · HH:mm')}
            </Text>
          </div>
        </ExpandedBoxSection>

        {overlay === 'transcript' && (
          <ExpandedBoxSection>
            <TranscriptView activity={activity} />
          </ExpandedBoxSection>
        )}
        {overlay === 'analysis' && (
          <ExpandedBoxSection>
            <CopilotAnalysis activity={activity} onEdit={onEdit} />
          </ExpandedBoxSection>
        )}
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
                icon="calendar"
                title={t('activityTimelineItem.item.meetingCreation')}
                info={creationDateTime || 'Unknown'}
              />
              <InfoBox
                icon="bell"
                title={t('activityTimelineItem.item.reminderSet')}
                info={reminder}
              />
              <InfoBox
                icon="bookmark"
                title={t('activityTimelineItem.item.meetingType')}
                info={
                  <>
                    {meetingType ? (
                      <MeetingTypeField
                        activity={activity}
                        onUpdate={cb => {
                          onEdit?.();
                          cb();
                        }}
                      />
                    ) : (
                      <div style={{ marginTop: '4px' }}>{t('common.none')}</div>
                    )}
                  </>
                }
              />
              <InfoBox
                icon="gridSquares"
                title={t('activityTimelineItem.item.meetingResult')}
                info={
                  <>
                    {meetingResult && meetingResultValue ? (
                      <MeetingResultField
                        activity={activity}
                        onUpdate={cb => {
                          onEdit?.();
                          cb();
                        }}
                      />
                    ) : (
                      <div style={{ marginTop: '4px' }}>{t('common.none')}</div>
                    )}
                  </>
                }
              />
              {assignedTo && (
                <InfoBox
                  icon="person"
                  title={t('activityTimelineItem.item.assignedTo')}
                  info={assignedTo}
                />
              )}
              {isCopilotEnabled && transcript && <ShowTranscriptButton activity={activity} />}
            </ExpandedBoxSection>
            {conferencingParsed && conferencingParsed?.details?.url && (
              <ExpandedBoxSection>
                <>
                  <div className={styles.conferencing_container}>
                    <span
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (conferencingParsed?.details?.url) {
                          window.open(conferencingParsed?.details?.url, '_blank');
                        }
                      }}
                      className={styles.conferencing}
                    >
                      <img
                        src={getIcon(conferencingParsed?.provider)}
                        alt="meet-icon"
                        className={styles.img}
                      />
                      <Text
                        size="xs"
                        weight="bold"
                        color="bloobirds"
                        className={styles.conferencing_text}
                      >
                        {t('activityTimelineItem.item.join') + ' ' + conferencingParsed?.provider}
                      </Text>
                    </span>
                    <span className={styles.copy_icon}>
                      <Clipboard text={conferencingParsed?.details?.url} />
                    </span>
                  </div>
                  {conferencingParsed?.details?.password ?? conferencingParsed?.details?.pin ? (
                    <Text size="xxs">
                      {t('activityTimelineItem.item.join') +
                        ': ' +
                        (conferencingParsed?.details?.password ?? conferencingParsed?.details?.pin)}
                    </Text>
                  ) : (
                    <></>
                  )}
                  {isCopilotEnabled && <MeetingBotInfo activity={activity} onEdit={onEdit} />}
                </>
              </ExpandedBoxSection>
            )}
            <ExpandedBoxSection>
              <InfoBox
                icon="taskAction"
                title={t('activityTimelineItem.item.noteCalendar')}
                info={meetingCalendarNote}
              />
            </ExpandedBoxSection>
            <ExpandedBoxSection>
              <InfoBox
                icon="noteAction"
                title={t('activityTimelineItem.item.noteInternal')}
                info={meetingNote}
              />
            </ExpandedBoxSection>
            <ExpandedBoxSection>
              <InfoBox
                icon="people"
                title={t('activityTimelineItem.item.guests')}
                info={
                  parsedInvitees?.length > 0 ? (
                    <>
                      <div className={styles.invitees_container}>
                        {parsedInvitees?.map((invitee: Invitee, index: number) => {
                          if (!showMore && index > 2) {
                            return null;
                          }
                          return (
                            <div key={`${index}${invitee.email}`} className={styles.invitees}>
                              <InviteeCard
                                invitee={invitee}
                                readOnly
                                shouldShowStatus={hasNylasID}
                              />
                            </div>
                          );
                        })}
                      </div>
                      {parsedInvitees?.length > 3 && (
                        <div style={{ cursor: 'pointer' }} onClick={() => setShowMore(!showMore)}>
                          <Text
                            className={styles.showMore}
                            size="s"
                            color="bloobirds"
                            align="center"
                          >
                            {t('common.show') +
                              ' ' +
                              (showMore ? t('common.less') : t('common.more'))}
                          </Text>
                        </div>
                      )}
                    </>
                  ) : undefined
                }
              />
            </ExpandedBoxSection>
          </>
        )}
      </div>
    </div>
  );
};

export const MeetingDetail = ({
  activity,
  dataModel,
  visibleFooter = true,
  onSave,
  actionsDisabled = false,
  userId,
  mutate,
  onGoToBobject,
  isBubble,
}: {
  activity: Bobject;
  dataModel: DataModelResponse;
  visibleFooter?: boolean;
  actionsDisabled?: boolean;
  userId?: string;
  onSave?: () => void;
  mutate?: () => void;
  onGoToBobject?: (bobjectId: string) => void;
  isBubble?: boolean;
}) => {
  const { openMinimizableModal } = useMinimizableModals();
  const { openWizard } = useWizardContext();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isReported, setIsReported] = useState<boolean>(false);
  const { t } = useTranslation();
  function openMeetingModal() {
    const bobjectFieldsData = {};
    activity.fields.forEach(field => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const company = getRelatedBobject(activity, 'Company');
    const lead = getRelatedBobject(activity, 'Lead');
    // @ts-ignore
    openMinimizableModal({
      type: 'calendarMeeting',
      bobject: activity,
      data: {
        company: company
          ? {
              name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
              url: companyUrl(company),
              data: company,
            }
          : undefined,
        lead: lead && {
          name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          url: leadUrl(lead, null),
          data: lead,
        },
        ...bobjectFieldsData,
      },
      onSave: () => {
        onSave?.();
        mutate?.();
        setIsReported(true);
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
      onClose: () => {
        onSave?.();
        mutate?.();
      },
    });
  }

  const meetingResultField = getFieldByLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  );
  const meetingResultLogicRole = meetingResultField?.valueLogicRole;
  const isCancelled = meetingResultLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED';
  const referenceBobject = getReferencedBobject(activity);

  const assignee =
    getFieldByLogicRole(referenceBobject as Bobject, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value ||
    ((referenceBobject as unknown) as ExtensionBobject)?.assignedTo;

  const assignedToActiveUser = assignee === userId;

  const reportResult = () => {
    setIsLoading(true);
    const accountId = activity?.id?.accountId;
    const activityId = activity?.id?.objectId;
    const activityData = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
    };
    api.patch(`/bobjects/${accountId}/Activity/${activityId}/raw`, activityData).then(() => {
      if (mutate) {
        mutate();
      }
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
      onSave?.();
      setIsReported(true);
      setIsLoading(false);
    });
  };

  function getText() {
    if (isReported) {
      return t('activityTimelineItem.item.reported');
    } else if (isCancelled) {
      if (loading) {
        return <Spinner name="loadingCircle" size={12} color="melon" />;
      } else {
        return t('activityTimelineItem.item.markAsReported');
      }
    } else {
      return t('activityTimelineItem.item.reportResult');
    }
  }

  function onSaveCallback() {
    setIsReported(true);
    if (mutate) {
      mutate();
    }
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
              onEdit={() => {
                onSave?.();
                mutate?.();
              }}
              onGoToBobject={onGoToBobject}
              setIsReported={setIsReported}
              isBubble={isBubble}
            />
          </CopilotActivityContextProvider>

          {visibleFooter && (
            <DetailsFooter>
              <>
                <Button
                  size="medium"
                  variant={isReported || loading ? 'primary' : 'secondary'}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isReported) {
                      openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                        referenceBobject,
                        onSaveCallback,
                      });
                    } else {
                      if (isCancelled) {
                        reportResult();
                      } else {
                        openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                          referenceBobject,
                          onSaveCallback,
                        });
                      }
                    }
                    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CHANGE_MEETING_RESULT);
                  }}
                  color={isReported || loading ? 'verySoftMelon' : 'bloobirds'}
                  className={clsx(styles.reportResultButton, {
                    [styles.disabledButton]: actionsDisabled && !assignedToActiveUser,
                  })}
                  disabled={actionsDisabled && !assignedToActiveUser}
                >
                  <Icon
                    name="thumbsUp"
                    size={14}
                    color={isReported || loading ? 'melon' : 'bloobirds'}
                  />
                  {getText()}
                </Button>
                <Button
                  variant="secondary"
                  onClick={openMeetingModal}
                  disabled={actionsDisabled && !assignedToActiveUser}
                >
                  <Icon name="edit" size={14} />
                  {t('common.edit')}
                </Button>
              </>
            </DetailsFooter>
          )}
        </>
      )}
    </div>
  );
};

const BobjectNameDisplay = ({
  name,
  icon,
  onClick,
}: {
  name: string;
  icon: IconType;
  onClick: () => void;
}) => {
  return (
    <div className={styles.bobjectNameDisplayContainer} onClick={onClick}>
      <Icon size={16} name={icon} color="verySoftBloobirds" />
      <span className={styles.bobjectNameContainer}>{name}</span>
    </div>
  );
};
