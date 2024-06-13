import { Icon } from '@bloobirds-it/flamingo-ui';
import { IconProps } from '@bloobirds-it/flamingo-ui/dist/components/Icon/Icon';
import {
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE,
  GroupedActivityInterface,
} from '@bloobirds-it/types';

import styles from '../activityTimelineItem.module.css';

function getIconProps(activity): IconProps {
  const isOutgoing = activity.direction === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  switch (activity.activityType) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return {
        name: isOutgoing ? 'emailOutgoingAlter' : 'emailIncomingAlter',
        color: isOutgoing ? 'tangerine' : 'lightestTangerine',
        size: 20,
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return {
        name: 'calendar',
        color: 'extraMeeting',
        size: 20,
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return {
        name: isOutgoing ? 'callOutgoing' : 'callIncoming',
        color:
          activity.direction === DIRECTION_VALUES_LOGIC_ROLE.MISSED ? 'extraMeeting' : 'extraCall',
        size: 16,
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return {
        name: 'linkedin',
        color: 'darkBloobirds',
        size: 20,
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return {
        name: 'noteAction',
        color: 'peanut',
        size: 20,
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return {
        name: 'download',
        color: 'banana',
        size: 20,
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
      return {
        name: 'cadence',
        color: 'lightPurple',
        size: 20,
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS: {
      const activityStatusUpdate = activity.statusTitle;
      const isLeadStatusUpdate = activityStatusUpdate?.toLowerCase().includes('lead');
      const isOpportunityStatusUpdate = activityStatusUpdate?.toLowerCase().includes('opportunity');
      return {
        name: isLeadStatusUpdate
          ? 'person'
          : isOpportunityStatusUpdate
          ? 'fileOpportunity'
          : 'company',
        color: 'softPeanut',
        size: 20,
      };
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      //TODO meh
      return activity.iconProps;
  }
}
export const IconComponent = ({ sidePeekEnabled, activity }) => {
  const iconProps = getIconProps(activity);
  return (
    <div className={sidePeekEnabled && styles.emailIcon}>
      <Icon {...iconProps} />
    </div>
  );
};
