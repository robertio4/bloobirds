import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import { IconButton, Text, Tooltip, Dropdown, Icon } from '@bloobirds-it/flamingo-ui';
import { QuickLogModalData, useActiveUserSettings } from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import {
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  CustomTask,
  GroupedActivityInterface,
  MIXPANEL_EVENTS,
  MessagesEvents,
  CUSTOM_TASK_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  injectReferencesGetProcess,
  api,
  forgeIdFieldsFromIdValue,
  getReferencedBobject,
  baseUrls,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import styles from '../activityTimelineItem.module.css';
import { AttachmentsDropdown, NewEmailIcons, ReportedIconButton } from './cardIcons';

export const RightIconComponent = ({
  activity,
  sidePeekEnabled,
  userId,
  disableButtons,
  actionsDisabled,
  openContactFlow,
  openMeetingResult,
  openQuickLogModal,
  customTasks,
  syncStatus,
  extended,
  aiAnalysisEnabled = false,
}: {
  activity: GroupedActivityInterface;
  sidePeekEnabled: boolean;
  userId: string;
  actionsDisabled?: boolean;
  disableButtons: boolean;
  openContactFlow?: () => void;
  openMeetingResult?: () => void;
  openQuickLogModal?: (data?: QuickLogModalData) => void;
  customTasks?: CustomTask[];
  syncStatus?: boolean;
  extended?: boolean;
  aiAnalysisEnabled?: boolean;
}) => {
  const { t } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { settings } = useActiveUserSettings();

  const activityCompany = activity.companyId;
  const activityIsReported = activity.reported === 'Yes';
  const activityAttachedFiles = activity.attachedFiles;

  const forgedIdFields = forgeIdFieldsFromIdValue(activity.bobjectId);

  const parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  const parsedAttachments = activity.attachments && JSON.parse(activity.attachments);
  const hasAttachedFiles =
    activityAttachedFiles && parsedAttachedFiles?.filter((att: string) => !!att)?.length !== 0;
  const isBouncedEmail = activity.bouncedEmail;
  const leadAssignee = activity.leadAssignedTo;
  const oppAssignee = activity.opportunityAssignedTo;

  const callDuration = activity.callDuration;
  const hasAudioRecording = activity.callRecording;

  const assignedToActiveUser = leadAssignee === userId || oppAssignee === userId;

  const showStatusWarning = extended && syncStatus !== undefined && !syncStatus;

  const customTask =
    activity.customTaskId && customTasks?.find(ct => ct.id === activity.customTaskId);

  const emailClasses = clsx(styles.rightIcons, {
    [styles.emailIconSize]: sidePeekEnabled,
  });

  const meetingClasses = clsx(styles.rightIcons, {
    [styles.rightIcon]: sidePeekEnabled,
  });

  const callClasses = clsx(styles.descriptionContainer, {
    [styles.rightIcon]: sidePeekEnabled,
  });

  const activityTypeLogicRole = activity.activityType;

  const activityUser = activity?.activityUser;
  const assigneeComponent = activityUser ? (
    <AssigneeComponent value={activity?.activityUser} size={sidePeekEnabled ? 's' : 'xs'} />
  ) : (
    <></>
  );

  const isWhatsAppBusiness = activity?.customTaskName === CUSTOM_TASK_LOGIC_ROLE.WHATSAPP_BUSINESS;
  const handleClickOnCase = caseId => {
    window.open(settings?.account?.salesforceInstance + '/' + caseId, '_blank');
  };

  const linkedCases =
    activity?.casesLinked && activity?.casesLinked?.length >= 1 ? (
      <span
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          if (activity?.casesLinked?.length > 1) {
            setDropdownVisible(!dropdownVisible);
          } else {
            handleClickOnCase(activity?.casesLinked?.[0].Id);
          }
        }}
        className={styles.caseIcon}
      >
        <Icon name={'briefcase'} size={16} />
        <Text size="xs" color="bloobirds" ellipsis={40}>
          {activity?.casesLinked?.length == 1
            ? 'Nº ' + activity?.casesLinked?.[0].CaseNumber
            : activity?.casesLinked?.length + ' Cases'}
        </Text>
        {activity?.casesLinked?.length > 1 && (
          <Dropdown visible={dropdownVisible} anchor={<></>}>
            {activity?.casesLinked?.map((caseItem, index) => (
              <div
                key={index}
                className={styles.caseItem}
                onClick={event => {
                  event.stopPropagation();
                  event.preventDefault();
                  handleClickOnCase(caseItem.Id);
                }}
              >
                <Icon name={'briefcase'} size={16} />
                <Text size="xs" color="bloobirds">
                  {'Nº ' + caseItem.CaseNumber}
                </Text>
              </div>
            ))}
          </Dropdown>
        )}
      </span>
    ) : (
      ''
    );

  const canShowAnalysis = aiAnalysisEnabled && activity?.hasCopilot;

  const openAIInNewTab = (e, activityType) => {
    e.stopPropagation();

    const activityId = forgedIdFields?.objectId;
    const url = `/app/ai-analysis/${activityType}/${activityId}`;
    window.open(baseUrls[process.env.NODE_ENV] + url, '_blank');
  };

  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS:
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_FROM:
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_TO:
      if (activity) {
        return assigneeComponent;
      } else {
        return <></>;
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return (
        <div key="email-rightIcon" className={emailClasses}>
          {showStatusWarning && <InfoWarningSync type={'email'} id={forgedIdFields} />}
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
          <NewEmailIcons activity={activity} />
          {assigneeComponent}
        </div>
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return (
        <div key="meeting-rightIcon" className={meetingClasses}>
          {showStatusWarning && <InfoWarningSync type={'meeting'} id={forgedIdFields} />}
          {canShowAnalysis && (
            <Tooltip title={t('common.openInNewTab')} position="top">
              <IconButton
                className={styles.aiAnalysisIcon}
                name="magic"
                size={14}
                color="purple"
                onClick={e => openAIInNewTab(e, 'meeting')}
              />
            </Tooltip>
          )}
          <ReportedIconButton
            isReported={activityIsReported}
            actionsDisabled={actionsDisabled && !assignedToActiveUser}
            disableReport={disableButtons}
            onClick={openMeetingResult}
          />
          {assigneeComponent}
        </div>
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return (
        <div key="call-rightIcon" className={callClasses}>
          {showStatusWarning && <InfoWarningSync type={'call'} id={forgedIdFields} />}
          {canShowAnalysis && (
            <Tooltip title={t('common.openInNewTab')} position="top">
              <IconButton
                className={styles.aiAnalysisIcon}
                name="magic"
                size={14}
                color="purple"
                onClick={e => openAIInNewTab(e, 'call')}
              />
            </Tooltip>
          )}
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
          {!!callDuration && (
            <Text size="xxs" color="softPeanut">
              {new Date(callDuration * 1000).toISOString().substring(14, 19)}
            </Text>
          )}
          {assigneeComponent}
        </div>
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return (
        <Fragment key="linkedIn-rightIcon">
          {showStatusWarning && <InfoWarningSync type={'message'} id={forgedIdFields} />}
          {assigneeComponent}
        </Fragment>
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return (
        <Fragment key="note-rightIcon">
          {showStatusWarning && <InfoWarningSync type={'note'} id={forgedIdFields} />}
          {assigneeComponent}
        </Fragment>
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return (
        <Fragment key="inbound-rightIcon">
          {showStatusWarning && <InfoWarningSync type={'activity'} id={forgedIdFields} />}
          {assigneeComponent}
        </Fragment>
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return (
        <div key="customTask-rightIcon" className={styles.rightIcons}>
          {!disableButtons && (
            <IconButton
              name="edit"
              size={16}
              onClick={e => {
                e.stopPropagation();
                api
                  .get(`/bobjects/${activity?.bobjectId}/form?injectReferences=true`)
                  .then(data => {
                    const bobjectActivity = injectReferencesGetProcess(data?.data);
                    openQuickLogModal({
                      customTask,
                      leads: [],
                      selectedBobject: getReferencedBobject(bobjectActivity),
                      companyId: activityCompany,
                      onSubmit: () => {
                        window.dispatchEvent(
                          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                            detail: { type: BobjectTypes.Activity },
                          }),
                        );
                      },
                      isEdition: true,
                      activity: bobjectActivity,
                    });
                    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_EDIT_CUSTOM_ACTIVITY);
                  });
              }}
            />
          )}
          {isWhatsAppBusiness && linkedCases}
          {assigneeComponent}
        </div>
      );
    default:
      return <></>;
  }
};
