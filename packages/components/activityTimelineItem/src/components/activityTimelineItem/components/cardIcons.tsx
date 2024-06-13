import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CardButton,
  Dropdown,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { LightAttachmentItem } from '@bloobirds-it/light-attachment-list';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  DataModelResponse,
  GroupedActivityInterface
} from "@bloobirds-it/types";
import { getTextFromLogicRole, toHoursAndMinutes } from '@bloobirds-it/utils';

import styles from '../activityTimelineItem.module.css';
import { useDataModel } from "@bloobirds-it/hooks";

export const AttachmentsDropdown = React.forwardRef(
  ({
    attachedFiles,
    betterAttachments,
  }: {
    attachedFiles: any;
    betterAttachments?: { name: string; url: string; id: string }[];
  }) => {
    const anchorRef = useRef();
    const { ref, visible, setVisible } = useVisible(false, anchorRef);
    const { t } = useTranslation();

    function toggleVisible(event: React.MouseEvent<HTMLElement, MouseEvent>) {
      event.stopPropagation();
      event.preventDefault();
      setVisible(!visible);
    }

    const hasBetterAttachments = betterAttachments && betterAttachments?.length > 0;

    return (
      <Dropdown
        ref={ref}
        visible={visible}
        anchor={
          <Tooltip title={t('activityTimelineItem.attachmentsDropdown.tooltip')} position="top">
            <IconButton
              name="paperclip"
              /*@ts-ignore*/
              ref={anchorRef}
              size={12}
              color="bloobirds"
              onClick={event => toggleVisible(event)}
              className={styles.attachmentClip}
            />
          </Tooltip>
        }
        width={214}
      >
        <div className={styles.attachmentDropdown}>
          {hasBetterAttachments
            ? betterAttachments.map(
                file =>
                  !!file && (
                    <LightAttachmentItem
                      key={file.id}
                      name={file.name}
                      url={file.url}
                      id={file.id}
                    />
                  ),
              )
            : attachedFiles.map(
                attachment =>
                  !!attachment && <LightAttachmentItem key={attachment} name={attachment} />,
              )}
        </div>
      </Dropdown>
    );
  },
);

export const MeetingDurationInfo = ({ meetingDuration }: { meetingDuration: number }) => (
  <div className={styles.meetingDurationInfo}>
    <Icon name="clock" color="bloobirds" size={12} />
    <Text size="xs" color="bloobirds">
      {meetingDuration && toHoursAndMinutes(meetingDuration)}
    </Text>
  </div>
);

export const BobjectName = ({
  activityBobjectName,
  activityBobjectType = BobjectTypes.Lead,
  ellipsis = undefined,
}: {
  activityBobjectName: string;
  activityBobjectType?: BobjectTypes;
  ellipsis?: string;
}) =>
  activityBobjectName ? (
    <div className={styles.leadName} style={{ maxWidth: ellipsis }}>
      <Icon
        name={
          activityBobjectType === BobjectTypes.Opportunity
            ? 'fileOpportunity'
            : activityBobjectType === BobjectTypes.Company
            ? 'company'
            : 'person'
        }
        color="bloobirds"
        size={12}
      />
      <Text size="xxs" color="bloobirds" className={styles.ellipsis}>
        {activityBobjectName}
      </Text>
    </div>
  ) : (
    <></>
  );

export const EmailIcons = ({ activity }: { activity: Bobject }) => {
  const { t } = useTranslation();
  const openedTimes = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_TIMES_OPENED);
  const clickedTimes = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_TIMES_CLICKED,
  );
  const replyTimes = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_TIMES_REPLIED);
  const hasBeenOpened = +openedTimes > 0;
  const hasBeenClicked = +clickedTimes > 0;
  const hasBeenReplied = +replyTimes > 0;

  return (
    <>
      {hasBeenOpened && (
        <Tooltip
          title={t('activityTimelineItem.emailIcons.tooltip', {
            openedTimes,
            clickedTimes,
          })}
          position="top"
        >
          <Icon name={hasBeenClicked ? 'checkDouble' : 'check'} color="bloobirds" size={12} />
        </Tooltip>
      )}
      {hasBeenReplied && (
        <Tooltip title={t('activityTimelineItem.emailIcons.hasBeenReplied')} position="top">
          <Icon name="reply" color="bloobirds" size={12} />
        </Tooltip>
      )}
    </>
  );
};

export const NewEmailIcons = ({ activity }: { activity: GroupedActivityInterface }) => {
  const { t } = useTranslation();
  const openedTimes = activity.emailTimesOpen;
  const clickedTimes = activity.emailTimesClick;
  const replyTimes = activity.emailTimesReply;
  const hasBeenOpened = +openedTimes > 0;
  const hasBeenClicked = +clickedTimes > 0;
  const hasBeenReplied = +replyTimes > 0;

  return (
    <>
      {hasBeenOpened && (
        <Tooltip
          title={t('activityTimelineItem.emailIcons.tooltip', {
            openedTimes,
            clickedTimes,
          })}
          position="top"
        >
          <Icon name={hasBeenClicked ? 'checkDouble' : 'check'} color="bloobirds" size={12} />
        </Tooltip>
      )}
      {hasBeenReplied && (
        <Tooltip title={t('activityTimelineItem.emailIcons.hasBeenReplied')} position="top">
          <Icon name="reply" color="bloobirds" size={12} />
        </Tooltip>
      )}
    </>
  );
};

export const ReportedIconButton = ({
  isReported,
  actionsDisabled,
  disableReport,
  onClick,
}: {
  isReported: boolean;
  actionsDisabled?: boolean;
  disableReport?: boolean;
  onClick: () => void;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activityTimelineItem' });

  return (
    <div
      className={styles.rightIconsContainer}
      onClick={!actionsDisabled && !disableReport && onClick}
    >
      <Tooltip
        title={
          actionsDisabled
            ? t('reportedIconButton.tooltipNoPermissions')
            : isReported
            ? t('reportedIconButton.tooltipReported')
            : t('reportedIconButton.tooltipNotReported')
        }
        position="top"
      >
        <CardButton
          size="small"
          color={isReported ? 'verySoftMelon' : 'transparent'}
          variant={isReported ? 'primary' : 'clear'}
        >
          <Icon size={12} color={isReported ? 'extraCall' : 'softPeanut'} name="thumbsUp" />
        </CardButton>
      </Tooltip>
    </div>
  );
};
