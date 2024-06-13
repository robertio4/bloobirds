import React from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityTimelineItem, ActivityTooltipBlock } from '@bloobirds-it/activity-timeline-item';
import { Text, Timeline } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useCustomTasks,
  useQuickLogActivity,
  useSyncBobjectStatus,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { Bobject, DataModelResponse, ExtensionHelperKeys } from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import ActivityFeedSkeleton from '../activityFeedSkeleton/activityFeedSkeleton';
import styles from './activityFeed.module.css';

export const ActivityFeed = ({
  isLoading,
  activities,
  handleOnClick,
  total,
  parentRef,
  fetchNextPage,
  estimateSize,
  fixedHeight,
  extended = false,
  dataModel,
  actionsDisabled = false,
  sidePeekEnabled = false,
  enabledArrowNavigation = false,
  showTooltipBlock = true,
}: {
  activities: Bobject[];
  isLoading: boolean;
  handleOnClick: (bobject: Bobject) => void;
  total: number;
  parentRef: React.RefObject<HTMLDivElement>;
  fetchNextPage?: () => void;
  estimateSize?: number;
  fixedHeight?: boolean;
  extended?: boolean;
  dataModel: DataModelResponse;
  actionsDisabled?: boolean;
  sidePeekEnabled?: boolean;
  enabledArrowNavigation?: boolean;
  showTooltipBlock?: boolean;
}) => {
  const { bobjectsSync } = useSyncBobjectStatus(activities?.[0]?.id?.accountId, activities);
  const userId = useActiveUserId();
  const { has } = useUserHelpers();
  const isFetching = !activities;
  const activityBlockHidden = has(ExtensionHelperKeys.ACTIVITY_TIMELINE_TOOLTIP_BLOCK);
  const { openQuickLogModal } = useQuickLogActivity();
  const { customTasks } = useCustomTasks({ disabled: false });
  const { t } = useTranslation('translation', { keyPrefix: 'activityTimelineItem.activityFeed' });

  if (!isLoading && activities?.length === 0) {
    return (
      <div className={styles.empty}>
        <Text size="s" color="softPeanut">
          {t('noActivitiesPending')}
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Timeline size={'small'}>
        <VirtualInfiniteScroll
          enableSelectedBackground
          enabledArrowNavigation={enabledArrowNavigation}
          onNavigation={handleOnClick}
          parentRef={parentRef}
          rows={activities}
          totalRows={total}
          isFetchingData={isFetching}
          fetchNextPage={fetchNextPage}
          hasNextItem={(index: number) => index !== total - 1}
          contentSkeleton={() => (
            <div className={styles.skeleton}>
              <ActivityFeedSkeleton />
            </div>
          )}
          loaderSkeleton={() => (
            <div className={styles.skeleton}>
              <ActivityFeedSkeleton />
            </div>
          )}
          estimateSize={estimateSize}
          estimatedSkeletonHeight={130}
          fixedHeight={fixedHeight && extended}
        >
          {(activity: Bobject, hasNext: boolean, isFirst: boolean, selected: boolean) => {
            const syncStatus = bobjectsSync?.find(
              sync => sync?.bobjectId === activity?.id?.objectId,
            )?.syncStatusOk;

            return (
              activity?.id?.objectId && (
                <ActivityTimelineItem
                  activity={activity}
                  key={activity?.id?.value}
                  onClick={handleOnClick}
                  startDisplayDivider={!isFirst}
                  endDisplayDivider={hasNext || !activityBlockHidden}
                  extended={extended}
                  dataModel={dataModel}
                  actionsDisabled={actionsDisabled}
                  userId={userId}
                  sidePeekEnabled={sidePeekEnabled}
                  activeHover={!selected}
                  syncStatus={syncStatus}
                  openQuickLogModal={openQuickLogModal}
                  customTasks={customTasks}
                />
              )
            );
          }}
        </VirtualInfiniteScroll>
        {showTooltipBlock && !activityBlockHidden && !isFetching && !isLoading ? (
          <ActivityTooltipBlock sidePeekEnabled={sidePeekEnabled} />
        ) : (
          <></>
        )}
      </Timeline>
    </div>
  );
};
