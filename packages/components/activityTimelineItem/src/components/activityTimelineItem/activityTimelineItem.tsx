import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ColorType,
  Icon,
  IconButton,
  IconType,
  Text,
  TimelineItem,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { QuickLogModalData, useCadences } from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import { serialize } from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  BOUNCED_EMAIL_VALUES_LOGIC_ROLE,
  CADENCE_TYPES_VALUES_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  CustomTask,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  convertHtmlToString,
  formatDateAsText,
  getFieldByLogicRole,
  getReferencedBobject,
  getReferencedBobjectFromLogicRole,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
  getUserTimeZone,
  getValueFromLogicRole,
  isDifferentYearThanCurrent,
  isToday,
  api,
  removeHtmlTags,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { parseISO } from 'date-fns';
import mixpanel from 'mixpanel-browser';

import { getTimeToShow } from '../../utils/activityTimeline.utils';
import styles from './activityTimelineItem.module.css';
import {
  AttachmentsDropdown,
  BobjectName,
  EmailIcons,
  MeetingDurationInfo,
  ReportedIconButton,
} from './components/cardIcons';
import { EmailDetailsDropdown } from './components/emailDetailsDropdown';

interface ActivityInfo {
  icon: IconType | JSX.Element;
  color: ColorType;
  iconColor?: ColorType;
  subject: string;
  subtitle?: string;
  extraSubtitle?: JSX.Element;
  description?: JSX.Element;
  ellipsisOnSubject?: boolean;
  date?: string;
  backgroundColor?: ColorType;
  rightIcon?: JSX.Element;
  syncName?: string;
}

export const ActivityTimelineItem = ({
  activity,
  onClick,
  startDisplayDivider,
  endDisplayDivider,
  activeHover = true,
  extended,
  alternativeDescription = false,
  dataModel,
  userId,
  actionsDisabled,
  sidePeekEnabled,
  disableButtons,
  hovering,
  openContactFlow,
  openMeetingResult,
  openQuickLogModal,
  customTasks,
  syncStatus,
}: {
  activity: Bobject;
  onClick?: (act: Bobject, redirect?: boolean) => void;
  startDisplayDivider: boolean;
  endDisplayDivider: boolean;
  changeBackground?: boolean;
  activeHover?: boolean;
  extended?: boolean;
  alternativeDescription?: boolean;
  dataModel: DataModelResponse;
  userId?: string;
  actionsDisabled?: boolean;
  sidePeekEnabled?: boolean;
  disableButtons?: boolean;
  hovering?: boolean;
  openContactFlow?: () => void;
  openMeetingResult?: () => void;
  openQuickLogModal?: (data?: QuickLogModalData) => void;
  customTasks?: CustomTask[];
  syncStatus?: boolean;
}) => {
  if (!activity?.raw) {
    return null;
  }

  const activityTypeField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE) || {
    id: '',
  };
  const activityType = activity.raw.contents[activityTypeField?.id];

  if (!activityType) {
    return null;
  }

  return (
    <ActivityTimelineItemWrapped
      activity={activity}
      onClick={onClick}
      startDisplayDivider={startDisplayDivider}
      endDisplayDivider={endDisplayDivider}
      activeHover={activeHover}
      extended={extended}
      alternativeDescription={alternativeDescription}
      dataModel={dataModel}
      userId={userId}
      actionsDisabled={actionsDisabled}
      sidePeekEnabled={sidePeekEnabled}
      disableButtons={disableButtons}
      hovering={hovering}
      openContactFlow={openContactFlow}
      openMeetingResult={openMeetingResult}
      openQuickLogModal={openQuickLogModal}
      customTasks={customTasks}
      syncStatus={syncStatus}
    />
  );
};

/**
 * This component must be used inside a <Timeline> Parent to be shown properly.
 * On Click has a default action that is meant to be on the main feed to open extended content
 * @param activity
 * @param onClick
 * @param startDisplayDivider
 * @param endDisplayDivider
 * @param activeHover
 * @param extended
 * @param alternativeDescription
 * @param dataModel
 * @param userId
 * @param actionsDisabled
 * @param sidePeekEnabled
 * @param disableReport
 * @param hovering
 * @param openContactFlow
 * @param openMeetingResult
 * @param openQuickLogModal
 * @param customTasks
 * @param syncStatus
 * @constructor
 */
export const ActivityTimelineItemWrapped = ({
  activity,
  onClick,
  startDisplayDivider,
  endDisplayDivider,
  activeHover = true,
  extended,
  alternativeDescription = false,
  dataModel,
  userId,
  actionsDisabled,
  sidePeekEnabled,
  disableButtons,
  hovering,
  openContactFlow,
  openMeetingResult,
  openQuickLogModal,
  customTasks,
  syncStatus,
}: {
  activity: Bobject;
  onClick?: (act: Bobject, redirect?: boolean) => void;
  startDisplayDivider: boolean;
  endDisplayDivider: boolean;
  changeBackground?: boolean;
  activeHover?: boolean;
  extended?: boolean;
  alternativeDescription?: boolean;
  dataModel: DataModelResponse;
  userId?: string;
  actionsDisabled?: boolean;
  sidePeekEnabled?: boolean;
  disableButtons?: boolean;
  hovering?: boolean;
  openContactFlow?: () => void;
  openMeetingResult?: () => void;
  openQuickLogModal?: (data?: QuickLogModalData) => void;
  customTasks?: CustomTask[];
  syncStatus?: boolean;
}) => {
  const trans = useTranslation();
  const { t } = trans;
  const activityTypeField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE) || {
    id: '',
  };
  const activitySubjectFields = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT,
  ) || { id: '' };
  const activityFromNameFields = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.INBOUND_FORM_NAME,
  ) || { id: '' };
  const activityBodyFields = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY,
  ) || { id: '' };
  const activityDirectionFields = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
  ) || { id: '' };
  const activityNoteField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE) || {
    id: '',
  };
  const activityTimeField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TIME) || {
    id: '',
  };
  const activityTitleField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE) || {
    id: '',
  };

  const activityType = activity.raw.contents[activityTypeField?.id];
  let activitySubject = activity.raw.contents[activitySubjectFields?.id];
  const activityDirection = activity.raw.contents[activityDirectionFields?.id];
  let activityBody = activity.raw.contents[activityBodyFields?.id];
  const activityNote = activity.raw.contents[activityNoteField?.id];
  const activityFormName = activity.raw.contents[activityFromNameFields?.id];
  const activityTime = activity.raw.contents[activityTimeField?.id];
  const timeToShow = getTimeToShow(activityTime, trans);
  const activityTitle = activity.raw.contents[activityTitleField?.id];
  const activityTypeLogicRole = dataModel?.findValueById(activityType)?.logicRole;
  const activityDirectionValue = dataModel?.findValueById(activityDirection)?.name;
  const activityLead = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const activityLeadName = getTextFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const activityCompany = getReferencedBobjectFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
  ) as Bobject<BobjectTypes.Company>;
  const activityCompanyName = getTextFromLogicRole(activityCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const activityIsReported =
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED) === 'Yes';

  // Email
  const activityAttachedFiles = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES,
  );
  const parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  const activityLeadEmail = getTextFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const activityAttachments = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS,
  );

  const parsedAttachments = activityAttachments && JSON.parse(activityAttachments);
  const hasAttachedFiles =
    activityAttachedFiles && parsedAttachedFiles?.filter((att: string) => !!att)?.length !== 0;
  const isBouncedEmail =
    getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL)?.valueLogicRole ===
    BOUNCED_EMAIL_VALUES_LOGIC_ROLE.YES;
  const activityEmailMetadata = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_METADATA,
  );
  const activityEmailInfo = activityEmailMetadata ? JSON.parse(activityEmailMetadata) : {};
  const activityEmailLeads: Array<string> = [];
  if (activityEmailMetadata) {
    if (activityEmailInfo?.to?.length > 0) {
      activityEmailInfo.to.map((to: { name: string; email: string }) => {
        if (to.name && to.name !== activityLeadName) activityEmailLeads.push(to.name);
        else if (to.email && to.email !== activityLeadEmail)
          activityEmailLeads.push(to.email.split('@')[0]);
      });
    }
    if (activityEmailInfo?.cc?.length > 0) {
      activityEmailInfo.cc.map((cc: { name: string; email: string }) => {
        if (cc.name && cc.name !== activityLeadName) activityEmailLeads.push(cc.name);
        else if (cc.email && cc.email !== activityLeadEmail)
          activityEmailLeads.push(cc.email.split('@')[0]);
      });
    }
  }

  // Meeting
  const meetingDuration = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION,
  );
  const meetingTitle = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const meetingResult = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT);

  // Call
  const callDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const hasAudioRecording = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL,
  );
  const callResult = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);

  // Cadence
  const CADENCE_ACTIVITY_TEXT = {
    [CADENCE_TYPES_VALUES_LOGIC_ROLE.RESCHEDULE]: t('activityTimelineItem.item.rescheduledCadence'),
    [CADENCE_TYPES_VALUES_LOGIC_ROLE.STARTED]: t('activityTimelineItem.item.startedCadence'),
    [CADENCE_TYPES_VALUES_LOGIC_ROLE.CONFIGURE]: t('activityTimelineItem.item.startedCadence'),
    [CADENCE_TYPES_VALUES_LOGIC_ROLE.STOPPED]: t('activityTimelineItem.item.stoppedCadence'),
    [CADENCE_TYPES_VALUES_LOGIC_ROLE.ENDED]: t('activityTimelineItem.item.endedCadence'),
  };
  const referenceBobjectType = getRelatedBobjectTypeName(activity);
  const cadenceId = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE)?.value;
  const { cadences } = useCadences(
    referenceBobjectType,
    activity?.id?.accountId,
    undefined,
    undefined,
    undefined,
    true,
  );
  const activityCadence = cadences?.find(cadence => cadence?.id === cadenceId)?.name;
  const activityCadenceStatusLR = getFieldByLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE_TYPE,
  )?.valueLogicRole;
  const activityCadenceStatus = CADENCE_ACTIVITY_TEXT[activityCadenceStatusLR];

  // Status
  const activityStatusUpdate = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.STATUS_TITLE,
  );
  const activityStatus = getTextFromLogicRole(activity, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS);
  const isLeadStatusUpdate = activityStatus?.includes('lead') || activityStatus?.includes('Lead');
  const isOpportunityStatusUpdate =
    activityStatus?.includes('opportunity') || activityStatus?.includes('Opportunity');
  const opportunityField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  const opportunity = opportunityField?.referencedBobject;
  const opportunityName = getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const opportunityStage = getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);

  const leadAssignee =
    getFieldByLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value ||
    // @ts-ignore
    activityLead?.assignedTo;
  const oppAssignee =
    getFieldByLogicRole(opportunity, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value ||
    // @ts-ignore
    opportunity?.assignedTo;

  const assignedToActiveUser = leadAssignee === userId || oppAssignee === userId;

  const descriptionClass = clsx(styles.descriptionContainer, {
    [styles.descriptionContainerSidePeek]: sidePeekEnabled,
  });

  const rightIconEmailClass = clsx(styles.rightIcons, {
    [styles.emailIconSize]: sidePeekEnabled,
  });

  const rightIconMeetingClass = clsx(styles.rightIcons, {
    [styles.rightIcon]: sidePeekEnabled,
  });

  const getBobjectNameProps = () => {
    let activityBobjectName = '';
    let activityBobjectType = BobjectTypes.Lead;

    if (activityLeadName) {
      activityBobjectName = activityLeadName;
      if (activityEmailLeads?.length > 0) {
        activityBobjectName += ', ' + activityEmailLeads.join(', ');
      }
    } else if (activityEmailLeads?.length > 0) {
      activityBobjectName += activityEmailLeads.join(', ');
    } else if (opportunityName) {
      activityBobjectName = opportunityName;
      activityBobjectType = BobjectTypes.Opportunity;
    } else if (activityCompanyName) {
      activityBobjectName = activityCompanyName;
      activityBobjectType = BobjectTypes.Company;
    }

    return { activityBobjectName, activityBobjectType };
  };

  const customTask = customTasks?.find(
    ct => ct.id === getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK),
  );

  const activityFields = (activityTypeLogicRole: string): ActivityInfo => {
    const showStatusWarning = extended && syncStatus !== undefined && !syncStatus;
    switch (activityTypeLogicRole) {
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
        if (
          activitySubject?.includes('"type":"p"') &&
          typeof activitySubject === 'string' &&
          typeof JSON.parse(activitySubject) === 'object'
        ) {
          activitySubject = removeHtmlTags(serialize(activitySubject));
        }

        if (
          activityBody?.includes('"type":"p"') &&
          typeof activityBody === 'string' &&
          typeof JSON.parse(activityBody) === 'object'
        ) {
          activityBody = serialize(activityBody);
        }

        return {
          icon: (
            <div className={sidePeekEnabled && styles.emailIcon}>
              <Icon
                name={
                  activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING
                    ? 'emailOutgoingAlter'
                    : 'emailIncomingAlter'
                }
                color={
                  activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING
                    ? ('tangerine' as ColorType)
                    : 'lightestTangerine'
                }
                size={20}
              />
            </div>
          ),
          color:
            activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING
              ? ('lightestTangerine' as ColorType)
              : ('tangerine' as ColorType),
          subject: activitySubject || t('common.noSubject'),
          description: (
            <div className={descriptionClass}>
              <BobjectName {...getBobjectNameProps()} ellipsis="80%" />
              <EmailDetailsDropdown
                metadata={activityEmailInfo}
                date={activityTime}
                subject={activitySubject}
              />
              {activityBody && (activityEmailLeads.length === 0 || sidePeekEnabled) && (
                <div>
                  <span>
                    {activityBody
                      ? convertHtmlToString(activityBody?.replace(/<head>[\s\S]*?<\/head>/g, ''))
                      : null}
                  </span>
                </div>
              )}
            </div>
          ),
          date: timeToShow,
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
          rightIcon: (
            <div className={rightIconEmailClass}>
              {showStatusWarning && <InfoWarningSync type={'email'} id={activity?.id} />}
              {isBouncedEmail && (
                <Tooltip title={t('activityTimelineItem.item.bounced')} position="top">
                  <Icon
                    className={styles.bouncedEmail}
                    name="statusCircle"
                    size={6}
                    color="extraMeeting"
                  />
                </Tooltip>
              )}
              {hasAttachedFiles && (
                <AttachmentsDropdown
                  attachedFiles={parsedAttachedFiles}
                  betterAttachments={parsedAttachments}
                />
              )}
              <EmailIcons activity={activity} />
            </div>
          ),
          syncName: 'email',
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
        return {
          icon: 'calendar' as IconType,
          color: 'lightestMeeting' as ColorType,
          iconColor: 'extraMeeting' as ColorType,
          subject: meetingTitle ? meetingTitle : t('common.meetingArranged'),
          extraSubtitle: meetingDuration && !alternativeDescription && (
            <div className={styles.meetingDuration}>
              <MeetingDurationInfo meetingDuration={+meetingDuration} />
            </div>
          ),
          description: (
            <div className={descriptionClass}>
              {activityLead && <BobjectName activityBobjectName={activityLeadName} />}
              <div>
                {meetingResult && <b>{meetingResult}</b>}
                {activityNote && (
                  <span>
                    <b>{t('common.note')}: </b> {convertHtmlToString(activityNote)}
                  </span>
                )}
              </div>
            </div>
          ),
          date: timeToShow,
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
          rightIcon: (
            <div className={rightIconMeetingClass}>
              {showStatusWarning && <InfoWarningSync type={'meeting'} id={activity?.id} />}
              <ReportedIconButton
                isReported={activityIsReported}
                actionsDisabled={actionsDisabled && !assignedToActiveUser}
                disableReport={disableButtons}
                onClick={openMeetingResult}
              />
            </div>
          ),
          syncName: 'meeting',
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
        return {
          icon: (
            <div className={sidePeekEnabled && styles.callIcon}>
              <Icon
                name={
                  activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING
                    ? 'callOutgoing'
                    : 'callIncoming'
                }
                color={
                  activityDirectionValue === ACTIVITY_DIRECTION.MISSED
                    ? 'extraMeeting'
                    : 'extraCall'
                }
                size={16}
              />
            </div>
          ),
          color:
            activityDirectionValue === ACTIVITY_DIRECTION.MISSED
              ? 'lightestMeeting'
              : ('lightestCall' as ColorType),
          iconColor: 'extraCall' as ColorType,
          subject: t('activityTimelineItem.item.' + activityDirectionValue + 'Call'),
          date: timeToShow,
          description: alternativeDescription ? (
            <Text size="xxs" color="softPeanut">
              {t('common.callWith') +
                ' ' +
                activityLeadName +
                ' ' +
                (activityCompanyName ? t('common.from') + ' ' + activityCompanyName : '')}
            </Text>
          ) : (
            <div className={descriptionClass}>
              {activityLead && <BobjectName activityBobjectName={activityLeadName} />}
              {callResult && <b>{callResult}</b>}
              {activityNote && (
                <span>
                  <b>{t('common.note')}:</b>
                  {convertHtmlToString(activityNote)}
                </span>
              )}
              {!callResult && !activityNote && <div></div>}
            </div>
          ),
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
          rightIcon: (
            <div
              className={clsx(styles.descriptionContainer, {
                [styles.rightIcon]: sidePeekEnabled,
              })}
            >
              {showStatusWarning && <InfoWarningSync type={'call'} id={activity?.id} />}
              <ReportedIconButton
                isReported={activityIsReported}
                actionsDisabled={actionsDisabled && !assignedToActiveUser}
                disableReport={disableButtons}
                onClick={openContactFlow}
              />
              {hasAudioRecording && (
                <Tooltip title={t('common.recording')} position="top">
                  <Icon name="voicemail" color="bloobirds" size={12} />
                </Tooltip>
              )}
              {callDuration && (
                <Text size="xxs" color="softPeanut">
                  {new Date((callDuration as any) * 1000).toISOString().substring(14, 19)}
                </Text>
              )}
            </div>
          ),
          syncName: 'call',
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
        return {
          icon: 'linkedin' as IconType,
          color: 'verySoftBloobirds' as ColorType,
          iconColor: 'darkBloobirds' as ColorType,
          subject: activityBody
            ? t('activityTimelineItem.item.linkedinConversation')
            : t('activityTimelineItem.item.manuallyLoggedActivity'),
          description: (
            <div className={descriptionClass}>
              {activityLead && <BobjectName activityBobjectName={activityLeadName} />}
              <div>
                <span>
                  {alternativeDescription
                    ? ''
                    : activityBody
                    ? activityBody
                    : activityNote
                    ? activityNote
                    : null}
                </span>
              </div>
            </div>
          ),
          date: timeToShow,
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
          rightIcon: (
            <>{showStatusWarning && <InfoWarningSync type={'message'} id={activity?.id} />}</>
          ),
          syncName: 'message',
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
        return {
          icon: 'noteAction' as IconType,
          color: 'banana' as ColorType,
          iconColor: 'peanut' as ColorType,
          subject:
            typeof activityTitle === 'string'
              ? removeHtmlTags(activityTitle)
              : activityLeadName
              ? activityLeadName + ' ' + t('common.note').toLowerCase()
              : t('common.note'),
          subtitle: activityNote && !sidePeekEnabled ? removeHtmlTags(activityNote) : null,
          description: (
            <div className={descriptionClass}>
              {activityLead && <BobjectName activityBobjectName={activityLeadName} />}
              {activityCompany && !activityLead && (
                <BobjectName
                  activityBobjectType={BobjectTypes.Company}
                  activityBobjectName={activityCompanyName}
                />
              )}
              {sidePeekEnabled && activityNote && (
                <div>
                  <span>{removeHtmlTags(activityNote)}</span>
                </div>
              )}
            </div>
          ),
          date: timeToShow,
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
          rightIcon: <>{showStatusWarning && <InfoWarningSync type="note" id={activity?.id} />}</>,
          syncName: 'note',
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
        return {
          icon: 'download' as IconType,
          color: 'lightestBanana' as ColorType,
          iconColor: 'banana' as ColorType,
          subject: t('activityTimelineItem.item.inboundActivity'),
          subtitle: activityFormName ? `"${activityFormName}"` : '',
          description: activityLead && <BobjectName activityBobjectName={activityLeadName} />,
          date: formatDateAsText({
            text: (parseISO(activityTime) as unknown) as string,
            patternFormat: 'dd MMM',
            t,
          }),
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
          rightIcon: (
            <>{showStatusWarning && <InfoWarningSync type={'activity'} id={activity?.id} />}</>
          ),
          syncName: 'activity',
        };
      case 'ACTIVITY__TYPE__CADENCE':
        return {
          icon: 'cadence' as IconType,
          color: 'verySoftPurple' as ColorType,
          iconColor: 'lightPurple' as ColorType,
          subject: activityCadenceStatusLR ? activityCadenceStatus : '',
          description: (
            <div className={descriptionClass}>
              {activityLead && <BobjectName activityBobjectName={activityLeadName} />}
              <div>
                <span>{activityCadence ? `"${activityCadence}"` : ''}</span>
              </div>
            </div>
          ),
          date: timeToShow,
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
        };
      case 'ACTIVITY__TYPE__STATUS':
        return {
          icon: (isLeadStatusUpdate
            ? 'person'
            : isOpportunityStatusUpdate
            ? 'fileOpportunity'
            : 'company') as IconType,
          color: 'lightPeanut' as ColorType,
          iconColor: 'softPeanut' as ColorType,
          subject: activityStatusUpdate ? activityStatusUpdate : t('common.statusUpdate'),
          description: (
            <div className={descriptionClass}>
              {(activityLead || opportunity) && (
                <BobjectName
                  activityBobjectName={opportunity ? opportunityName : activityLeadName}
                  activityBobjectType={opportunity ? BobjectTypes.Opportunity : BobjectTypes.Lead}
                />
              )}
              <div>{opportunityStage && <b>{opportunityStage}</b>}</div>
            </div>
          ),
          date: timeToShow,
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
        return {
          icon: <Icon name={customTask?.icon} color={'white'} size={14} />,
          color: customTask?.iconColor,
          subject: customTask?.name,
          description: (
            <div className={descriptionClass}>
              {(activityLead || opportunity) && (
                <BobjectName
                  activityBobjectName={opportunity ? opportunityName : activityLeadName}
                  activityBobjectType={opportunity ? BobjectTypes.Opportunity : BobjectTypes.Lead}
                />
              )}
              <div>
                {activityNote && (
                  <span>
                    <b>{t('common.note') + ': '}</b> {activityNote}
                  </span>
                )}
                {activityBody && <span>{activityBody}</span>}
              </div>
            </div>
          ),
          date: timeToShow,
          rightIcon: !disableButtons && (
            <IconButton
              name="edit"
              size={16}
              onClick={() => {
                openQuickLogModal({
                  customTask,
                  leads: [],
                  selectedBobject: getReferencedBobject(activity),
                  companyId: activityCompany?.id.value,
                  onSubmit: () => {
                    window.dispatchEvent(
                      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                        detail: { type: BobjectTypes.Activity },
                      }),
                    );
                  },
                  isEdition: true,
                  activity,
                });
                mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_EDIT_CUSTOM_ACTIVITY);
              }}
            />
          ),
          backgroundColor: (extended ? 'lightestBloobirds' : 'lightestBloobirds') as ColorType,
        };
    }
  };

  // @ts-ignore
  const activityData = activityTypeLogicRole ? activityFields(activityTypeLogicRole) : undefined;
  const ref = useRef<HTMLDivElement>();
  const showTooltip =
    // @ts-ignore
    ref?.current?.firstChild?.firstChild?.offsetWidth <
    // @ts-ignore
    ref?.current?.firstChild?.firstChild?.scrollWidth;

  const handleClick = () => {
    api
      .get('/bobjects/' + activity?.id?.value + '/form?injectReferences=true')
      .then(({ data: filledActivity }) => {
        onClick(filledActivity);
      });
  };

  const timelineItemWrapperClasses = clsx(styles.timeline_item_wrapper, {
    [styles.timeline_item_wrapper_sidePeek]: sidePeekEnabled,
  });

  return (
    <div className={timelineItemWrapperClasses}>
      <TimelineItem
        size="small"
        // @ts-ignore
        data={activityData}
        startDisplayDivider={startDisplayDivider}
        endDisplayDivider={endDisplayDivider}
        onClick={onClick ? () => handleClick() : undefined}
        backgroundColor={activityData?.backgroundColor}
        activeHover={activeHover}
        isHovering={hovering}
      >
        <div className={styles.activityHeader} ref={ref}>
          {!extended && activityData?.syncName && syncStatus !== undefined && !syncStatus && (
            <InfoWarningSync
              type={
                activityData?.syncName as
                  | 'email'
                  | 'meeting'
                  | 'call'
                  | 'message'
                  | 'activity'
                  | 'note'
              }
              id={activity?.id}
            />
          )}

          <div className={styles.activityHeaderTitleWrapper}>
            <Tooltip title={showTooltip && activityData?.subject} position="top" delay={200}>
              <Text
                size="xs"
                weight="bold"
                className={clsx(styles.activityHeaderTitle, {
                  [styles.activityHeaderTitleEllipsis]: !activityData?.subtitle,
                  [styles.activityHeaderTitleSidePeek]: sidePeekEnabled,
                })}
              >
                {activityData?.subject}
              </Text>
            </Tooltip>
          </div>
          {activityData?.subtitle && (
            <Text size="xs" className={styles.activityHeaderSubtitle}>
              {activityData?.subtitle}
            </Text>
          )}
          {extended && activityData?.extraSubtitle}
        </div>
      </TimelineItem>
    </div>
  );
};
