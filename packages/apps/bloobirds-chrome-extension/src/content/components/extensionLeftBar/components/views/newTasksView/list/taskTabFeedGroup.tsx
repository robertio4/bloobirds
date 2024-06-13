import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  createToast,
  Icon,
  Skeleton,
  Spinner,
  Text,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, MessagesEvents, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isBefore } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../../../../../context';
import { ConfirmMarkAsDoneModal } from '../components/confirmMarkAsDoneModal/confirmMarkAsDoneModal';
import { useTaskFeedContext } from '../hooks/useTasksTab';
import { Clusters, TaskFeedTask, TaskFeedTaskList } from '../types';
import { TaskCard } from './components/taskCard/taskCard';
import styles from './taskTabsList.module.css';

const CLUSTER = {
  dailyTasks: {
    apiName: 'DAILY_TASKS',
    icon: 'calendar',
  },
  scheduledTasks: {
    apiName: 'SCHEDULED_TASKS',
    icon: 'event',
  },
  reminders: {
    apiName: 'REMINDERS',
    icon: 'clock',
  },
  overdueTasks: {
    apiName: 'OVERDUE_TASKS',
    icon: 'calendar',
  },
};
/*//TODO: Possible smoothing of the scroll
function getScrollDestination(clusterName: keyof Clusters, currentScrollY: number) {
  switch (clusterName) {
    case 'dailyTasks':
      return currentScrollY / 3;
    case 'scheduledTasks':
      return (currentScrollY * 3) / 4;
    case 'reminders':
      return (currentScrollY * 2) / 3;
    case 'overdueTasks':
      return 0;
  }
}*/

function getIsNow(prevTask, nextTask) {
  if (!prevTask || !nextTask) return false;
  else {
    const prevDate = new Date(prevTask.scheduledDatetime);
    const nextDate = new Date(nextTask.scheduledDatetime);
    const now = new Date();
    return prevDate < now && nextDate > now;
  }
}

const StartTasksButton = ({
  cluster,
  clusterItems,
  taskFeedReqBody,
}: {
  cluster: keyof Clusters;
  clusterItems: number;
  taskFeedReqBody: any;
}) => {
  const { setOpenStartTasksNavigation } = useExtensionContext();
  return (
    <Button
      color={clusterItems !== 0 ? 'softBloobirds' : 'verySoftPeanut'}
      className={styles.startButton}
      size="small"
      variant="secondary"
      onClick={e => {
        e.stopPropagation();
        mixpanel.track(MIXPANEL_EVENTS.START_TASKS_FROM_TASK_TAB_OTO);
        setOpenStartTasksNavigation({
          open: true,
          stage: 'ALL',
          cluster: { key: CLUSTER[cluster].apiName, body: taskFeedReqBody },
        });
      }}
      disabled={clusterItems === 0}
    >
      <Icon name="play" size={14} color="bloobirds" />
    </Button>
  );
};

export function TaskTabFeedGroupTitle({ cluster }: { cluster: string }) {
  const { t } = useTranslation();
  const icon = CLUSTER[cluster].icon;
  return (
    <div className={styles.title}>
      <Icon name={icon} size={16} color="softPeanut" />
      <span className={styles.titleText}>{t('taskFeed.' + cluster)}</span>
    </div>
  );
}

function TimeBar() {
  return (
    <div className={styles._time_marker}>
      <span className={styles._time_marker_bullet} />
      <span className={styles._time_marker_line} />
    </div>
  );
}

function TaskTabFeedGroup({
  tasks,
  clusterName,
  isLoading,
  parentRef,
  taskFeedReqBody,
  defaultOpen = false,
}: {
  tasks: TaskFeedTaskList;
  clusterName: keyof Clusters;
  isLoading: boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  taskFeedReqBody: any;
  defaultOpen?: boolean;
}) {
  const accountId = useExtensionContext()?.useGetSettings()?.account?.id;
  const [clusterHeaderRef, isHovered] = useHover();
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  const [isCompleting, setIsCompleting] = useState(false);
  const { useTaskFeedPaginationState, useTaskFeedFilterValues } = useTaskFeedContext();
  const { filterValues } = useTaskFeedFilterValues();
  const { pagination, setPagination } = useTaskFeedPaginationState();
  const { t } = useTranslation();
  const [isConfirmMarkAsDoneOpen, setIsConfirmMarkAsDoneOpen] = useState(false);
  const listClass = clsx(styles.list, {
    [styles.collapsed]: !isExpanded,
  });
  const isOverdue = clusterName === 'overdueTasks';
  const taskCardClass = clsx(styles.taskCard, {
    [styles.overdue]: isOverdue,
    [styles.isExpanded]: isExpanded,
  });
  const hideTaskCardClass = clsx(styles.hiddenTaskCard, {
    [styles.overdue]: isOverdue,
  });
  const [headerTask, ...bodyTasks] = tasks.tasks || [];
  const noTasks = tasks?.tasks?.length === 0;

  function increasePagination() {
    setPagination({
      ...pagination,
      [clusterName]: {
        ...pagination[clusterName],
        size: pagination[clusterName].size + 10,
      },
    });
  }
  function closeAndScroll() {
    parentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  }
  const hasTimelineBar = ['reminders', 'scheduledTasks'].includes(clusterName);
  function markClusterAsDone(cluster: string, accountId: string) {
    setIsCompleting(true);
    api
      .patch(`/bobjects/${accountId}/task/cluster/${cluster}/markAsDone`, {
        filters: Object.values(filterValues),
      })
      .then(() => {
        setIsCompleting(false);
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
        createToast({ message: t('taskFeed.clusterMarkedAsDone'), type: 'success' });
      });
  }
  useEffect(() => {
    if (defaultOpen && !isExpanded) {
      setIsExpanded(true);
    }
  }, [defaultOpen]);

  return (
    <div
      ref={clusterHeaderRef}
      className={clsx(styles.taskGroup, { [styles.hoverStyle]: !noTasks })}
    >
      <div
        className={styles.header}
        onClick={() => {
          if (tasks.totalElements > 1) isExpanded ? setIsExpanded(false) : setIsExpanded(true);
        }}
      >
        <TaskTabFeedGroupTitle cluster={clusterName} />
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {isHovered && !noTasks && (
            <>
              <div
                className={styles._mark_as_done}
                onClick={e => {
                  e.stopPropagation();
                  setIsConfirmMarkAsDoneOpen(true);
                }}
              >
                {!isCompleting ? (
                  <>
                    <Icon name="checkDouble" size={16} color="bloobirds" />
                    <Text
                      color="bloobirds"
                      size="xs"
                      weight="medium"
                      className={styles._mark_as_done_text}
                    >
                      {t('taskFeed.markClusterDone')}
                    </Text>
                  </>
                ) : (
                  <Spinner name="loadingCircle" size={16} color="bloobirds" />
                )}
              </div>
              <StartTasksButton
                cluster={clusterName}
                clusterItems={tasks.totalElements}
                taskFeedReqBody={taskFeedReqBody}
              />
            </>
          )}
          {!noTasks && <div className={styles.counter}>{tasks.totalElements}</div>}
        </div>
      </div>
      {headerTask ? (
        <div className={listClass} id="card-list">
          <TaskCard
            key={headerTask.id}
            task={headerTask as TaskFeedTask & { cadenceName: string }}
            className={taskCardClass}
            backgroundTask={!isExpanded && bodyTasks[0]}
          />
          <AnimatePresence>
            {!isExpanded ? (
              bodyTasks.map((task, index) => {
                if (index < 3) {
                  return (
                    <div
                      className={hideTaskCardClass}
                      key={task.id}
                      style={{ zIndex: `${9 - index}` }}
                    />
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    height: 'auto',
                    width: '100%',
                    transition: {
                      staggerChildren: 0.5,
                    },
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                    width: '100%',
                    transition: {
                      when: 'beforeChildren',
                    },
                  },
                }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                {bodyTasks.map((task, index) => {
                  if (task && task.scheduledDatetime) {
                    return (
                      <>
                        {hasTimelineBar && getIsNow(tasks?.tasks[index], task) && <TimeBar />}
                        <TaskCard
                          key={task.id}
                          task={task as TaskFeedTask & { cadenceName: string }}
                          className={taskCardClass}
                        />
                        {hasTimelineBar &&
                          index === bodyTasks.length - 1 &&
                          isBefore(new Date(task.scheduledDatetime), new Date()) && <TimeBar />}
                      </>
                    );
                  }
                  return null;
                })}
                {isLoading && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton
                        height="80px"
                        key={'skeleton' + index}
                        width="100%"
                        variant="rect"
                      />
                    ))}
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h1>{t('taskFeed.noTasks')}</h1>
          <h2>{t('taskFeed.noTasksHint')}</h2>
        </div>
      )}
      {!noTasks && (
        <div className={styles.footer}>
          {isExpanded ? (
            <>
              <Button
                variant="clear"
                size="small"
                iconLeft="arrowDown"
                uppercase={false}
                disabled={(tasks.page + 1) * tasks.size >= tasks.totalElements}
                onClick={increasePagination}
                className={styles._load_tasks_button}
              >
                {t('taskFeed.loadMoreTasks')}
              </Button>
              <Button
                variant="clear"
                size="small"
                iconLeft="arrowUp"
                uppercase={false}
                onClick={closeAndScroll}
                className={styles._load_tasks_button}
              >
                {t('taskFeed.closeTasks')}
              </Button>
            </>
          ) : (
            <Button
              variant="clear"
              size="small"
              iconLeft="arrowDown"
              disabled={tasks.totalElements < 2}
              uppercase={false}
              onClick={() => setIsExpanded(true)}
              className={styles._load_tasks_button}
            >
              {t('taskFeed.loadMoreTasks')}
            </Button>
          )}
        </div>
      )}
      {isConfirmMarkAsDoneOpen && (
        <ConfirmMarkAsDoneModal
          onClose={() => setIsConfirmMarkAsDoneOpen(false)}
          onSave={() => {
            markClusterAsDone(clusterName, accountId);
            setIsConfirmMarkAsDoneOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default TaskTabFeedGroup;
