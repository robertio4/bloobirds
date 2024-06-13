import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';

import {
  ActivityTooltipBlock,
  NewActivityTimelineItem,
} from '@bloobirds-it/activity-timeline-item';
import { Skeleton, Text, Timeline } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useCustomTasks,
  useQuickLogActivity,
  useSyncBobjectStatus,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectId,
  BobjectTypes,
  ExtensionHelperKeys,
  GroupedActivityInterface,
} from '@bloobirds-it/types';
import {
  api,
  forgeIdFieldsFromIdValue,
  recoverScrollOfBox,
  removeScrollOfBox,
  injectReferencesGetProcess,
} from '@bloobirds-it/utils';
import { useVirtualizer } from '@tanstack/react-virtual';

import styles from '../activityFeed/activityFeed.module.css';
import ActivityFeedSkeleton from '../activityFeedSkeleton/activityFeedSkeleton';
import { useActivityFeed } from './useNewActivityFeed';

export const NewActivityFeed = ({
  activeBobject,
  handleOnClick,
  parentRef,
  estimateSize,
  fixedHeight,
  extended = false,
  actionsDisabled = false,
  sidePeekEnabled = false,
  enabledArrowNavigation = false,
  selectedItem,
  subscribeMutator,
  aiAnalysisEnabled = false,
}: {
  activeBobject: Bobject;
  handleOnClick: (activity: Bobject) => void;
  parentRef: React.RefObject<HTMLDivElement>;
  estimateSize?: number;
  fixedHeight?: boolean;
  extended?: boolean;
  actionsDisabled?: boolean;
  sidePeekEnabled?: boolean;
  enabledArrowNavigation?: boolean;
  selectedItem?: BobjectId<BobjectTypes.Activity>['value'];
  subscribeMutator?: (mutate: () => void) => void;
  aiAnalysisEnabled?: boolean;
}) => {
  const { newActivityFeedData, newActivitiesLoading, fetchNextPage } = useActivityFeed({
    activeBobject,
    subscribeMutator,
  });
  const { activities, hasNext, totalItems } = newActivityFeedData || {};
  const { bobjectsSync } = useSyncBobjectStatus(
    activities?.[0]?.bobjectId?.split('/')[0],
    activities?.map(activity => ({
      id: forgeIdFieldsFromIdValue(activity.bobjectId),
    })),
  );
  const userId = useActiveUserId();
  const { has } = useUserHelpers();
  const activityBlockHidden = has(ExtensionHelperKeys.ACTIVITY_TIMELINE_TOOLTIP_BLOCK);
  const { openQuickLogModal } = useQuickLogActivity();
  const { customTasks } = useCustomTasks({ disabled: false });
  const { t } = useTranslation('translation', { keyPrefix: 'activityTimelineItem.activityFeed' });

  function handleFetchAndClick(activity: GroupedActivityInterface) {
    api
      .get<Bobject<BobjectTypes.Activity>>(
        `/bobjects/${(activity as GroupedActivityInterface).bobjectId}/form?injectReferences=true`,
      )
      .then(response => {
        const bobjectWithReferences = injectReferencesGetProcess(response?.data);
        handleOnClick(bobjectWithReferences);
      });
  }

  if (!newActivitiesLoading && activities?.length === 0) {
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
          parentRef={parentRef}
          rows={activities}
          hasNextPage={hasNext}
          totalRows={totalItems + (hasNext ? 1 : 0)}
          isFetchingData={newActivitiesLoading}
          fetchNextPage={fetchNextPage}
          onNavigation={handleFetchAndClick}
          hasNextItem={(index: number) => index !== totalItems - 1}
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
          selectedItem={selectedItem}
        >
          {(
            activity: GroupedActivityInterface,
            hasNext: boolean,
            isFirst: boolean,
            selected: boolean,
          ) => {
            const syncStatus = bobjectsSync?.find(
              sync => sync?.bobjectId === activity?.bobjectId?.split('/')[2],
            )?.syncStatusOk;
            return (
              activity?.bobjectId && (
                <NewActivityTimelineItem
                  activity={activity}
                  key={activity?.bobjectId}
                  onClick={handleFetchAndClick}
                  startDisplayDivider={!isFirst}
                  endDisplayDivider={hasNext || !activityBlockHidden}
                  extended={extended}
                  actionsDisabled={actionsDisabled}
                  userId={userId}
                  sidePeekEnabled={sidePeekEnabled}
                  activeHover={!selected}
                  syncStatus={syncStatus}
                  openQuickLogModal={openQuickLogModal}
                  customTasks={customTasks}
                  aiAnalysisEnabled={aiAnalysisEnabled}
                />
              )
            );
          }}
        </VirtualInfiniteScroll>
        {!activityBlockHidden ? <ActivityTooltipBlock sidePeekEnabled={sidePeekEnabled} /> : <></>}
      </Timeline>
    </div>
  );
};

const Transition = ({ children }) => (
  // @ts-ignore
  <CSSTransition
    appear
    in={true}
    unmountOnExit
    timeout={300}
    classNames={{
      appear: styles._fade_enter,
      appearActive: styles._fade_enter_active,
      enter: styles._fade_enter,
      enterActive: styles._fade_enter_active,
      exit: styles._fade_exit,
      exitActive: styles._fade_exit_active,
    }}
  >
    {children}
  </CSSTransition>
);

type VirtualInfiniteScrollProps = {
  hasNextPage: boolean;
  rows: any[];
  totalRows: number;
  isFetchingData?: boolean;
  fetchNextPage?: () => void;
  children: (data: any, hasNext: boolean, isFirst: boolean, selected?: boolean) => any;
  hasNextItem?: (index: number) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  footer?: (scrollToTop: () => void) => React.ReactNode;
  contentSkeleton?: () => React.ReactNode;
  loaderSkeleton?: () => React.ReactNode;
  estimateSize?: number;
  estimatedSkeletonHeight?: number;
  fixedHeight?: boolean;
  enabledArrowNavigation?: boolean;
  onNavigation?: (item: any) => void;
  enableSelectedBackground?: boolean;
  rowsLength?: number;
  selectedItem?: BobjectId<BobjectTypes.Activity>['value'];
};

const VirtualInfiniteScroll = ({
  hasNextPage,
  rows,
  totalRows,
  isFetchingData,
  fetchNextPage,
  children,
  hasNextItem,
  parentRef,
  footer,
  contentSkeleton,
  loaderSkeleton = () => (
    <Skeleton variant="rect" key={'skeletonItem'} width="100%" height="40px" />
  ),
  estimateSize = 40,
  estimatedSkeletonHeight = 40,
  fixedHeight = false,
  enabledArrowNavigation,
  onNavigation,
  enableSelectedBackground = false,
  rowsLength,
  selectedItem,
}: VirtualInfiniteScrollProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  rowsLength = rowsLength ?? rows?.length;

  const dataCount = hasNextPage ? rowsLength + 1 : rowsLength;

  const rowVirtualizer = useVirtualizer({
    count: dataCount,
    getScrollElement: () => parentRef?.current,
    estimateSize: () => estimateSize,
    overscan: 3,
  });
  function handleItemClick(index) {
    setSelectedItemIndex(index); // Actualiza el índice del elemento seleccionado
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp': {
        const targetIndex = Math.max(0, selectedItemIndex - 1);
        if (targetIndex) {
          rowVirtualizer.scrollToIndex(targetIndex);
          setSelectedItemIndex(targetIndex);

          onNavigation?.(rows[targetIndex]);
        }
        break;
      }
      case 'ArrowDown': {
        const virtualItems = rowVirtualizer.getVirtualItems();
        const currentIndex = virtualItems.findIndex(item => item.index === selectedItemIndex);
        // Determinar índice objetivo
        const targetIndex =
          currentIndex < virtualItems.length - 1 ? virtualItems[currentIndex + 1].index : null;
        if (targetIndex !== null && targetIndex < dataCount) {
          rowVirtualizer.scrollToIndex(targetIndex + 1);
          setSelectedItemIndex(targetIndex);

          onNavigation?.(rows[targetIndex]);
        }
        break;
      }
      case 'Enter': {
        const virtualItems = rowVirtualizer.getVirtualItems();
        const currentIndex = virtualItems.findIndex(item => item.index === selectedItemIndex);
        handleItemClick(virtualItems[currentIndex]);
        break;
      }
      default:
        break;
    }
  }

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) {
      return;
    }
    if (lastItem.index >= rows?.length - 1 && hasNextPage && !isFetchingData) {
      rowVirtualizer.scrollToIndex(rowVirtualizer.range.startIndex + 5);
      fetchNextPage?.();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    rows?.length,
    isFetchingData,
    rowVirtualizer.getVirtualItems(),
    totalRows,
  ]);

  useEffect(() => {
    if (selectedItem && !selectedItemIndex && rows?.length) {
      const index = rows.findIndex(row => row?.bobjectId === selectedItem);
      setSelectedItemIndex(index);
    }
  }, [selectedItem, rows?.length]);

  useEffect(() => {
    if (enabledArrowNavigation && selectedItemIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      //removeScrollOfBox();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      //recoverScrollOfBox();
    };
  }, [enabledArrowNavigation, selectedItemIndex]); // Asegúrate de volver a suscribir el evento cuando cambie el índice del elemento seleccionado

  const scrollHeight = parentRef?.current?.scrollHeight;
  if (
    contentSkeleton &&
    ((isFetchingData && !rows) || scrollHeight === undefined || scrollHeight === 0)
  ) {
    return <Transition>{contentSkeleton()}</Transition>;
  }

  return (
    <div
      style={{
        height:
          rowVirtualizer.getTotalSize() + (isFetchingData ? estimatedSkeletonHeight || 100 : 0),
        width: '100%',
        position: 'relative',
      }}
      onMouseEnter={removeScrollOfBox}
      onMouseLeave={recoverScrollOfBox}
    >
      {rowVirtualizer.getVirtualItems().map(virtualItem => {
        const isLoaderRow = virtualItem.index > rows?.length - 1;
        const data = rows[virtualItem.index];
        const showNext =
          (hasNextItem && hasNextItem(virtualItem.index)) ?? !!rows[virtualItem.index + 1];

        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={fixedHeight ? undefined : rowVirtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: fixedHeight ? `${virtualItem.size}px` : undefined,
              transform: `translateY(${virtualItem.start}px)`,
              background:
                virtualItem.index === selectedItemIndex && enableSelectedBackground
                  ? 'var(--softGray)'
                  : 'transparent',
            }}
            onClick={() => handleItemClick(virtualItem.index)}
          >
            {isLoaderRow ? (
              hasNextPage ? (
                <div style={{ height: `${estimateSize}px` }}>
                  <Transition>{loaderSkeleton()}</Transition>
                </div>
              ) : (
                footer && (
                  <div style={{ height: `${estimateSize}px` }}>
                    {footer(() => rowVirtualizer.scrollToIndex(0))}
                  </div>
                )
              )
            ) : (
              children(
                data,
                showNext,
                virtualItem.index === 0,
                virtualItem.index === selectedItemIndex,
              )
            )}
          </div>
        );
      })}
    </div>
  );
};
