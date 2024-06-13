import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Text, TimelineItem, Tooltip } from '@bloobirds-it/flamingo-ui';
import { QuickLogModalData } from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import {
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  CustomTask,
  GroupedActivityInterface,
} from '@bloobirds-it/types';
import clsx from 'clsx';

import {
  forgeIdFieldsFromIdValue,
  getActivitySubject,
  getActivityTypeColor,
  getSyncName,
  getTimeToShow,
} from '../../utils/activityTimeline.utils';
import styles from './activityTimelineItem.module.css';
import { DescriptionComponent } from './components/descriptionComponent';
import { IconComponent } from './components/iconComponent';
import { RightIconComponent } from './components/rightIconComponent';
import { SubtitleComponent } from './components/subtitleComponent';

export const NewActivityTimelineItem = ({
  activity,
  onClick,
  startDisplayDivider,
  endDisplayDivider,
  activeHover = true,
  extended,
  alternativeDescription = false,
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
  aiAnalysisEnabled = false,
}: {
  activity: GroupedActivityInterface;
  onClick?: (act: GroupedActivityInterface, redirect?: boolean) => void;
  startDisplayDivider: boolean;
  endDisplayDivider: boolean;
  changeBackground?: boolean;
  activeHover?: boolean;
  extended?: boolean;
  alternativeDescription?: boolean;
  userId?: string;
  actionsDisabled?: boolean;
  sidePeekEnabled?: boolean;
  disableButtons?: boolean;
  hovering?: boolean;
  openContactFlow?: () => void;
  openMeetingResult?: () => void;
  openQuickLogModal?: (data?: Pick<QuickLogModalData, 'companyId' | 'leads'>) => void;
  customTasks?: CustomTask[];
  syncStatus?: boolean;
  aiAnalysisEnabled?: boolean;
}) => {
  const trans = useTranslation();
  const { t } = trans;
  if (!activity) {
    return null;
  }

  const forgedIdFields = forgeIdFieldsFromIdValue(activity.bobjectId);

  const activityType = activity.activityType;
  const activityDirection = activity.direction;
  //TODO check this
  const activityTime = (activity.activityTime as unknown) as Date;

  if (!activityType) {
    return null;
  }

  // @ts-ignore
  const ref = useRef<HTMLDivElement>();
  const showTooltip =
    // @ts-ignore
    ref?.current?.firstChild?.firstChild?.offsetWidth <
    // @ts-ignore
    ref?.current?.firstChild?.firstChild?.scrollWidth;

  const timelineItemWrapperClasses = clsx(styles.timeline_item_wrapper, {
    [styles.timeline_item_wrapper_sidePeek]: sidePeekEnabled,
  });

  const customTask =
    activity.customTaskId && customTasks?.find(ct => ct.id === activity.customTaskId);

  const activitySubject = getActivitySubject(activity, t, customTask?.name);

  const activityDataProps = useMemo(() => {
    return {
      date: getTimeToShow(activityTime, trans),
      description: (
        <DescriptionComponent
          activity={activity}
          sidePeekEnabled={sidePeekEnabled}
          alternativeDescription={alternativeDescription}
        />
      ),
      color: getActivityTypeColor(activity.activityType, activityDirection, customTask?.iconColor),
      icon: (
        <IconComponent
          activity={{
            ...activity,
            ...(customTask
              ? { iconProps: { name: customTask.icon, color: 'white', size: 14 } }
              : {}),
          }}
          sidePeekEnabled={sidePeekEnabled}
        />
      ),
      rightIcon: (
        <RightIconComponent
          {...{
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
            aiAnalysisEnabled,
          }}
        />
      ),
    };
  }, [activityType]);

  const syncName = getSyncName(activity.activityType);
  const hasSubtitle =
    (activity.activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE && activity.note) ||
    (ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND && activity.inboundFormName);

  return (
    <div className={timelineItemWrapperClasses}>
      <TimelineItem
        size="small"
        //@ts-ignore we should update the description typing in flamingo
        data={activityDataProps}
        startDisplayDivider={startDisplayDivider}
        endDisplayDivider={endDisplayDivider}
        onClick={onClick ? () => onClick(activity) : undefined}
        backgroundColor="lightestBloobirds"
        activeHover={activeHover}
        isHovering={hovering}
      >
        <div className={styles.activityHeader} ref={ref}>
          {!extended && syncName && syncStatus !== undefined && !syncStatus && (
            <InfoWarningSync type={syncName} id={forgedIdFields} />
          )}

          <div className={styles.activityHeaderTitleWrapper}>
            <Tooltip title={showTooltip && activitySubject} position="top" delay={200}>
              <Text
                size="xs"
                weight="bold"
                className={clsx(styles.activityHeaderTitle, {
                  [styles.activityHeaderTitleEllipsis]: !hasSubtitle,
                  [styles.activityHeaderTitleSidePeek]: sidePeekEnabled,
                })}
              >
                {activitySubject}
              </Text>
            </Tooltip>
          </div>
          {hasSubtitle && (
            <SubtitleComponent
              activity={activity}
              sidePeekEnabled={sidePeekEnabled}
              alternativeDescription={alternativeDescription}
            />
          )}
        </div>
      </TimelineItem>
    </div>
  );
};
