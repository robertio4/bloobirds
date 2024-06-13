import { Text } from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_TYPES_VALUES_LOGIC_ROLE, GroupedActivityInterface } from '@bloobirds-it/types';
import { removeHtmlTags } from '@bloobirds-it/utils';

import styles from '../activityTimelineItem.module.css';
import { MeetingDurationInfo } from './cardIcons';

const getSubtitle = (activity: GroupedActivityInterface, sidePeekEnabled) => {
  if (activity.activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE) {
    const activityNote = activity.note;
    return activityNote && !sidePeekEnabled ? removeHtmlTags(activityNote) : null;
  }
  if (activity.activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND) {
    return activity.inboundFormName ? activity.inboundFormName : '';
  }
};

export const SubtitleComponent: {
  (props: {
    activity: GroupedActivityInterface;
    sidePeekEnabled: boolean;
    alternativeDescription: boolean;
  });
} = ({
  activity,
  sidePeekEnabled,
  alternativeDescription,
}: {
  activity: GroupedActivityInterface;
  sidePeekEnabled: boolean;
  alternativeDescription?: boolean;
}) => {
  const subtitle = getSubtitle(activity, sidePeekEnabled);
  const meetingDuration = activity.meetingDuration;

  return (
    <>
      {subtitle && (
        <Text size="xs" className={styles.activityHeaderSubtitle}>
          {subtitle}
        </Text>
      )}
      {!!meetingDuration && !alternativeDescription && (
        <div className={styles.meetingDuration}>
          <MeetingDurationInfo meetingDuration={meetingDuration} />
        </div>
      )}
    </>
  );
};
