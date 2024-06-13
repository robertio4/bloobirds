import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Skeleton } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import { isBefore } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import { useTaskManagementContext } from '../../hooks/useTaskManagement';
import { Clusters, TaskFeedTask, TaskFeedTaskList } from '../../types/taskManagement.types';
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

function getIsNow(prevTask, nextTask) {
  if (!prevTask || !nextTask) return false;
  else {
    const prevDate = new Date(prevTask.scheduledDatetime);
    const nextDate = new Date(nextTask.scheduledDatetime);
    const now = new Date();
    return prevDate < now && nextDate > now;
  }
}

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
  defaultOpen = false,
}: {
  tasks: TaskFeedTaskList;
  clusterName: keyof Clusters;
  isLoading: boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  defaultOpen?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  //const [isHidden, setIsHidden] = useState(clusterName === 'overdueTasks');
  const { currentTasksProps } = useTaskManagementContext();
  const { paginationState } = currentTasksProps || {};
  const listClass = clsx(styles.list, {
    [styles.collapsed]: !isExpanded,
  });
  const isOverdue = clusterName === 'overdueTasks';
  const taskCardClass = clsx(styles.taskCard, {
    [styles.overdue]: isOverdue,
    [styles.isExpanded]: isExpanded,
  });

  const [headerTask, ...bodyTasks] = tasks.tasks || [];
  const noTasks = tasks?.tasks?.length === 0;

  const hasTimelineBar = ['reminders', 'scheduledTasks'].includes(clusterName);

  //const toggleVisibility = () => setIsHidden(!isHidden);

  useEffect(() => {
    if (defaultOpen && !isExpanded) {
      setIsExpanded(true);
    }
  }, [defaultOpen]);

  return (
    <div
      className={clsx(styles.taskGroup, {
        [styles.hoverStyle]: !noTasks,
        //[styles.taskGroupHidden]: isHidden,
      })}
    >
      <div
        className={styles.header}
        onClick={() => {
          if (tasks.totalElements > 1) isExpanded ? setIsExpanded(false) : setIsExpanded(true);
        }}
      >
        <TaskTabFeedGroupTitle cluster={clusterName} />
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {!noTasks && <div className={styles.counter}>{tasks.totalElements}</div>}
        </div>
        {/*<IconButton name="chevronDown" onClick={toggleVisibility} />*/}
      </div>
      {/*<AnimatePresence>
        {!isHidden && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: noTasks ? 100 : "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >*/}
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
              <ThreeHiddenCards isOverdue={isOverdue} bodyTasks={bodyTasks} />
            ) : (
              <UnCollapsedTasks
                tasks={tasks}
                bodyTasks={bodyTasks}
                isLoading={isLoading}
                taskCardClass={taskCardClass}
                hasTimelineBar={hasTimelineBar}
              />
            )}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState />
      )}
      {!noTasks && (
        <ControlButtons
          tasks={tasks}
          isExpandedState={{ isExpanded, setIsExpanded }}
          paginationState={paginationState}
          clusterName={clusterName}
          parentRef={parentRef}
        />
      )}
      {/*</motion.div>
        )}
    </AnimatePresence>*/}
    </div>
  );
}

const UnCollapsedTasks = ({ tasks, bodyTasks, hasTimelineBar, taskCardClass, isLoading }) => {
  return (
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
            <Skeleton height="80px" key={'skeleton' + index} width="100%" variant="rect" />
          ))}
        </div>
      )}
    </motion.section>
  );
};

const ThreeHiddenCards = ({ bodyTasks, isOverdue }) => {
  const hideTaskCardClass = clsx(styles.hiddenTaskCard, {
    [styles.overdue]: isOverdue,
  });

  return bodyTasks.map((task, index) => {
    if (index < 3) {
      return <div className={hideTaskCardClass} key={task.id} style={{ zIndex: `${9 - index}` }} />;
    } else {
      return null;
    }
  });
};

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyState}>
      <h1>{t('taskFeed.noTasks')}</h1>
      <h2>{t('taskFeed.noTasksHint')}</h2>
    </div>
  );
};

const ControlButtons = ({ isExpandedState, tasks, paginationState, clusterName, parentRef }) => {
  const { pagination, setPagination } = paginationState;
  const { isExpanded, setIsExpanded } = isExpandedState;
  const { t } = useTranslation();

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

  return (
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
  );
};

export default TaskTabFeedGroup;
