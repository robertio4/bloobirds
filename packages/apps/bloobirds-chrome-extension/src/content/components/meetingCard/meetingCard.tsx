import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import {
  GoogleMeet,
  GoToMeeting,
  MicrosoftTeams,
  Webex,
  Zoom,
  Video,
} from '@bloobirds-it/activity-feed';
import {
  Card,
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CircularBadge,
  Icon,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import {
  useCopilotEnabled,
  useIsB2CAccount,
  useMinimizableModals,
  useUserSearch,
  useUserSettings,
} from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { MeetingResultField, MeetingTypeField } from '@bloobirds-it/meeting';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  companyUrl,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getRelatedBobject,
  getTextFromLogicRole,
  isHtml,
  leadUrl,
  isStringifiedJSON,
  toSentenceCase,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';

import { ExtendedContextTypes } from '../../../types/extendedContext';
import { getReferencedBobject, getValueFromLogicRole } from '../../../utils/bobjects.utils';
import { NameComponent } from '../card/fieldTypeComponent';
import { useExtensionContext } from '../context';
import { CopilotAnalysisIndicator } from '../extensionLeftBar/components/views/shared/CopilotAnalysisIndicator';
import styles from './meetingCard.module.css';

const inviteeStatus = {
  yes: <Trans i18nKey={'extension.card.inviteeStatus.yes'} />,
  no: <Trans i18nKey={'extension.card.inviteeStatus.no'} />,
  maybe: <Trans i18nKey={'extension.card.inviteeStatus.maybe'} />,
  noreply: <Trans i18nKey={'extension.card.inviteeStatus.noReply'} />,
};

function parseInviteesPerStatus(arr: any[]): Record<string, number> {
  const statusCounts: Record<string, number> = {};

  for (const item of arr) {
    const status = item?.status;
    if (status) {
      if (statusCounts[status]) {
        statusCounts[status] += 1;
      } else {
        statusCounts[status] = 1;
      }
    } else {
      if (statusCounts['noreply']) {
        statusCounts['noreply'] += 1;
      } else {
        statusCounts['noreply'] = 1;
      }
    }
  }

  return {
    yes: statusCounts?.yes || 0,
    no: statusCounts?.no || 0,
    maybe: statusCounts?.maybe || 0,
    noreply: statusCounts?.noreply || 0,
  };
}

export const MeetingCard = ({ activity, mutate }: { activity: Bobject; mutate: any }) => {
  const {
    setContactViewBobjectId,
    setExtendedContext,
    refreshExtendedScreenBobject,
  } = useExtensionContext();
  const { openWizard } = useWizardContext();
  const { t } = useTranslation();

  const { openMinimizableModal } = useMinimizableModals();
  const [loading, setIsLoading] = useState(false);
  const [isReported, setIsReported] = useState<boolean>(
    getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole ===
      REPORTED_VALUES_LOGIC_ROLE.YES,
  );
  const isB2CAccount = useIsB2CAccount();
  const meetingLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const meetingCompany = !isB2CAccount
    ? getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject
    : null;
  const activityTitle = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const user = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const meetingInvitees = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES,
  );
  const parsedInvitees = meetingInvitees ? JSON.parse(meetingInvitees) : null;
  const inviteesPerStatus = parsedInvitees ? parseInviteesPerStatus(parsedInvitees) : null;
  const note = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const meetingResultField = getFieldByLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  );
  const scheduledDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const scheduledDateTime = useGetI18nSpacetime(scheduledDate).unixFmt('E dd MMM yyyy · HH:mm');
  const conferencingJson = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CONFERENCING);
  const conferencingParsed =
    conferencingJson && isStringifiedJSON(conferencingJson) && JSON.parse(conferencingJson);
  const meetingResultLogicRole = meetingResultField?.valueLogicRole;
  const isCancelled = meetingResultLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED';

  const noteToShow = isHtml(note) ? (
    <div
      className={styles.meeting_card_note}
      dangerouslySetInnerHTML={{ __html: note }}
      style={{ fontSize: '8px !important' }}
    />
  ) : (
    note
  );
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(u => u?.id === user);

  const meetingType = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const meetingResultValue = meetingResultField?.text;
  const copilotAnalysis = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS,
  );
  const settings = useUserSettings();
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
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
        if (mutate) {
          mutate();
        }

        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
      onClose: () => null,
    });
  }

  const referencedBobject = getReferencedBobject(activity);

  const onCardClick = () => {
    setContactViewBobjectId(referencedBobject?.id?.value);
    setExtendedContext({
      type: ExtendedContextTypes.MEETING_DETAILS,
      bobject: activity,
    });
  };

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
      setIsReported(true);
      setIsLoading(false);
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
    });
  };

  function getText() {
    if (isReported) {
      return <Trans i18nKey={'leftBar.filters.reported'} />;
    } else if (isCancelled) {
      if (loading) {
        return <Spinner name="loadingCircle" size={12} color="melon" />;
      } else {
        return <Trans i18nKey={'extension.card.markAsReported'} />;
      }
    } else {
      return <Trans i18nKey={'common.reportResult'} />;
    }
  }

  function getColor(status) {
    if (status === 'yes') {
      return 'extraCall';
    } else if (status === 'no') {
      return 'tomato';
    } else {
      return 'peanut';
    }
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

  return (
    <div className={styles._meeting_card}>
      <Card size="small" expand onClick={onCardClick}>
        <CardHeader>
          <Icon name="calendar" color="tomato" size={14} className={styles._meeting_icon} />
          <CardBody>
            <div className={styles._meeting_title}>
              <Tooltip title={activityTitle || 'Untitled meeting'} position="top">
                <Text className={styles.activityTitle} size="xs" weight="bold">
                  {activityTitle ||
                    t('extension.card.bobjectNameUndefined', {
                      bobjectType: toSentenceCase(t('bobjectTypes.meeting')),
                    })}
                </Text>
              </Tooltip>
            </div>
            <div className={styles._meeting_user}>
              {isCopilotEnabled && copilotAnalysis && <CopilotAnalysisIndicator />}
              {assigneeUser && (
                <Tooltip title={`User: ${assigneeUser?.name}`} position="top">
                  <CircularBadge
                    style={{ fontSize: '8px' }}
                    backgroundColor={assigneeUser?.color || 'lightPeanut'}
                    size="s"
                    className={styles.assign_badge}
                  >
                    {assigneeUser?.shortname || 'U'}
                  </CircularBadge>
                </Tooltip>
              )}
            </div>
          </CardBody>
        </CardHeader>
        <CardContent>
          <div className={styles.meeting_container}>
            <div className={styles.meeting_content}>
              <div>
                <Icon name="bookmark" color="verySoftBloobirds" size={16} />
                {meetingType && (
                  <MeetingTypeField
                    activity={activity}
                    styles={{
                      padding: '0 4px',
                      marginLeft: '4px',
                    }}
                    onUpdate={cb => {
                      mutate?.().then(() => {
                        cb();
                      });

                      refreshExtendedScreenBobject();
                    }}
                  />
                )}
                {meetingResultField && meetingResultValue && (
                  <MeetingResultField
                    activity={activity}
                    styles={{
                      padding: '0 4px',
                      marginLeft: '8px',
                    }}
                    onUpdate={cb => {
                      mutate?.().then(() => {
                        cb();
                      });

                      refreshExtendedScreenBobject();
                    }}
                  />
                )}
              </div>
              <div>
                {meetingLead && (
                  <div className={styles._callCard_body__link}>
                    <NameComponent bobject={meetingLead} value={meetingLead} showIcon={true} />
                  </div>
                )}
                {meetingCompany && (
                  <div className={styles._callCard_body__link}>
                    <NameComponent
                      bobject={meetingCompany}
                      value={meetingCompany}
                      showIcon={true}
                    />
                  </div>
                )}
              </div>
              <div>
                <Icon name="clock" color="verySoftBloobirds" size={16} />
                {scheduledDateTime && (
                  <Text size="xs" color="peanut" className={styles.meeting_time_text}>
                    {scheduledDateTime}
                  </Text>
                )}
                {conferencingParsed && (
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
                      ellipsis={24}
                    >
                      {t('extension.card.join', { value: conferencingParsed?.provider })}
                    </Text>
                  </span>
                )}
              </div>
              {parsedInvitees?.length > 0 && (
                <div>
                  <Icon name="people" color="verySoftBloobirds" size={16} />
                  <div className={styles.invitees}>
                    <Text size="xs" color="peanut" weight="bold">
                      {t('extension.card.invitees', { count: parsedInvitees?.length || 0 })}
                    </Text>
                    {Object.keys(inviteesPerStatus)?.map(status => {
                      const numberOfInvitees = inviteesPerStatus[status];
                      if (numberOfInvitees > 0) {
                        return (
                          <Text size="xs" color={getColor(status)}>
                            {numberOfInvitees} {inviteeStatus[status]}
                          </Text>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </div>
                </div>
              )}
              {noteToShow && note !== 'null' && (
                <div className={styles.card_content}>
                  <Text
                    className={clsx(styles._callCard_body__text, styles.meeting_card_note)}
                    size="xxs"
                  >
                    <b>{t('common.note')}:</b> {noteToShow}
                  </Text>
                </div>
              )}
            </div>
            <div
              className={clsx(styles.meetingCard_buttons, {
                [styles.visible_buttons]: false,
              })}
            >
              <CardButton
                size="small"
                variant="secondary"
                iconLeft="edit"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  openMeetingModal();
                }}
                className={styles._meeting_button}
                uppercase={false}
              >
                {t('common.edit')}
              </CardButton>
              <CardButton
                size="small"
                variant="primary"
                iconLeft="thumbsUp"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isReported) {
                    openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                      onSaveCallback: refreshExtendedScreenBobject,
                      referenceBobject: referencedBobject,
                    });
                  } else {
                    if (isCancelled) {
                      reportResult();
                    } else {
                      openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                        onSaveCallback: refreshExtendedScreenBobject,
                        referenceBobject: referencedBobject,
                      });
                    }
                  }
                }}
                color={isReported || loading ? 'verySoftMelon' : 'bloobirds'}
                className={clsx(styles._meeting_button, {
                  [styles._meeting_button_reported]: isReported,
                })}
                uppercase={false}
              >
                <Text size="xs" color={isReported ? 'melon' : 'white'}>
                  {getText()}
                </Text>
              </CardButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
