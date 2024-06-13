import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  useCustomTasks,
  useMinimizableModals,
  useQuickLogActivity,
  useTasksFeed,
} from '@bloobirds-it/hooks';
import { NoResultsPage } from '@bloobirds-it/misc';
import { BobjectWithDate } from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import { useExtensionContext } from '../../../context';
import { DateGroupHeader } from '../../../dateGroupHeader/dateGroupHeader';
import { useContactViewContext } from '../../context/contactViewContext';
import { useSubscribeListeners } from '../../hooks/useSubscribeListeners';
import { WizardMiniCard } from '../miniCard/miniCard';
import styles from './tasksFeed.module.css';
import TasksFeedSkeleton from './tasksFeedSkeleton/tasksFeedSkeleton';

export const TasksFeed = ({ parentRef }) => {
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetSidePeekEnabled,
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const contextData = useGetActiveBobjectContext();
  const { tasks, data, total, fetchNextPage } = useTasksFeed(
    activeBobject,
    contextData,
    useSubscribeListeners,
  );
  const { customTasks } = useCustomTasks({ disabled: false });
  const { logCustomActivity } = useQuickLogActivity();
  const { openMinimizableModal } = useMinimizableModals();
  const isLoading = !data;
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { actionsDisabled } = useContactViewContext();
  function openTaskModal() {
    openMinimizableModal({
      type: 'task',
      data: {
        [activeBobject?.id.typeName.toLowerCase()]: activeBobject,
        location: 'bubble',
      },
    });
  }
  const { t } = useTranslation();

  if (!isLoading && tasks?.length === 0) {
    return (
      <NoResultsPage
        title={t('sidePeek.task.noPendingTask')}
        description={`${t('sidePeek.task.noResultPageDescription')}  😎`}
        actionButton={
          <Tooltip
            title={actionsDisabled && t('sidePeek.task.noPermissionsTooltip')}
            position="top"
          >
            <Button size="small" onClick={openTaskModal} iconLeft="plus" disabled={actionsDisabled}>
              {t('sidePeek.task.createNewTask')}
            </Button>
          </Tooltip>
        }
        sidePeekEnabled={sidePeekEnabled}
      />
    );
  }

  return (
    <div className={styles.container}>
      <VirtualInfiniteScroll
        parentRef={parentRef}
        rows={tasks}
        totalRows={total}
        isFetchingData={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextItem={index => !!tasks[index + 1] && !tasks[index + 1]?.taskDate?.isFirstOfDay}
        contentSkeleton={() => <TasksFeedSkeleton />}
        loaderSkeleton={() => <TasksFeedSkeleton />}
      >
        {(data: BobjectWithDate, hasNext: boolean) =>
          data?.id?.objectId && (
            <Fragment key={data.id.value}>
              {data?.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} small={true} />}
              <WizardMiniCard
                bobject={data}
                hasNextCard={hasNext}
                isOverdue={data?.taskDate?.prefix === t('leftBar.overdueTasks')}
                isTaskFeed
                customTasks={customTasks}
                logCustomActivity={logCustomActivity}
              />
            </Fragment>
          )
        }
      </VirtualInfiniteScroll>
    </div>
  );
};
