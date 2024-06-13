import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { useQuickLogActivity, useSelectAll } from '@bloobirds-it/hooks';
import { injectReferencesSearchProcess } from '@bloobirds-it/utils';
import { isToday } from 'date-fns';

import styles from '../../homePage.module.css';
import { useHomeTasks } from '../../pages/leftContent/utils/useHomeTasks';
import {
  DateGroupHeader,
  EmptyTaskList,
  Filters,
  getTimeMarkerPosition,
  isStatus,
  LoadingSpinner,
  NoFilterSelected,
  Stages,
} from '../../pages/leftContent/utils/utils';
import { TaskHomeCard } from '../taskHomeCard/taskHomeCard';
import VirtualizedList from '../virtualizedList/virtualizedList';

export const TaskListSales = ({
  stage,
  taskFilters,
  importantSelected,
  parentRef,
}: {
  stage: Stages;
  taskFilters: Filters;
  parentRef: React.RefObject<HTMLDivElement>;
  importantSelected?: boolean;
}) => {
  const { setInitialItems, resetSelectedItems, resetCheckSelectedAll } = useSelectAll();
  const [timeMarkerPosition, setTimeMarkerPosition] = useState(-1);
  const [tasks, setTasks] = useState<[]>();
  const [overdueTasks, setOverdueTasks] = useState<[]>();
  const [page, setPage] = useState(0);
  const [overduePage, setOverduePage] = useState(0);
  const [totalMatching, setTotalMatching] = useState(0);
  const [overdueTotalMatching, setOverdueTotalMatching] = useState(0);
  const [scrollMargin, setScrollMargin] = useState(0);

  const now = new Date();
  const { data: tasksData, isLoading: isLoadingNormal } = useHomeTasks({
    stage,
    taskFilters,
    page,
    overdue: false,
    dateFilter: now,
    importantSelected,
  });
  const { data: overdueTasksData, isLoading: isLoadingOverdue } = useHomeTasks({
    stage,
    taskFilters,
    page: overduePage,
    overdue: true,
    dateFilter: now,
    importantSelected,
  });
  const { logCustomActivity } = useQuickLogActivity();

  const isLoading = (isLoadingNormal && page === 0) || (isLoadingOverdue && overduePage === 0);
  const isLoadingMore = (isLoadingNormal && page > 0) || tasks?.length < page * 50;
  const isLoadingMoreOverdue =
    (isLoadingOverdue && overduePage > 0) || overdueTasks?.length < overduePage * 50;
  const hasNextPage = tasks && totalMatching > tasks.length;
  const hasNextPageOverdue = overdueTasks && overdueTotalMatching > overdueTasks.length;

  useEffect(() => {
    if (tasks && page !== 0) {
      setPage(0);
    }
    if (overdueTasks && overduePage !== 0) {
      setOverduePage(0);
    }
  }, [taskFilters]);

  useEffect(() => {
    if (tasksData?.data) {
      if (tasksData?.data?.totalMatching !== totalMatching) {
        setTotalMatching(tasksData?.data?.totalMatching);
      }
      const newTasks = injectReferencesSearchProcess(tasksData?.data).contents;
      setTimeMarkerPosition(getTimeMarkerPosition(newTasks));
      setTasks(newTasks);

      const intervalId = setInterval(
        () => setTimeMarkerPosition(getTimeMarkerPosition(tasks)),
        60000,
      );

      return () => intervalId && clearInterval(intervalId);
    }
  }, [tasksData]);

  useEffect(() => {
    if (overdueTasksData?.data) {
      if (overdueTasksData?.data?.totalMatching !== overdueTotalMatching) {
        setOverdueTotalMatching(overdueTasksData?.data?.totalMatching);
      }
      const newTasks = injectReferencesSearchProcess(overdueTasksData?.data).contents;
      setOverdueTasks(newTasks);
    }
  }, [overdueTasksData]);

  const isAnyFilterSelected = (() => {
    const prospect = taskFilters.PROSPECT.find(f => !isStatus(f.enumName) && f.enabled);
    const sales = taskFilters.SALES.find(f => !isStatus(f.enumName) && f.enabled);
    if (stage === 'PROSPECT') {
      return !!prospect;
    } else if (stage === 'SALES') {
      return !!sales;
    } else {
      return !!prospect || !!sales;
    }
  })();
  const isOverdueSelected = (() => {
    const prospect = taskFilters.PROSPECT.find(f => f.enumName.includes('OVERDUE'))?.enabled;
    const sales = taskFilters.SALES.find(f => f.enumName.includes('OVERDUE'))?.enabled;
    if (stage === 'PROSPECT') {
      return !!prospect;
    } else if (stage === 'SALES') {
      return !!sales;
    } else {
      return !!prospect || !!sales;
    }
  })();
  const thereAreTasksToShow = tasks?.length > 0 || (isOverdueSelected && overdueTasks?.length > 0);

  // Select items
  useEffect(() => {
    if (!!tasks && isOverdueSelected && !!overdueTasks) {
      setInitialItems([...overdueTasks, ...tasks]);
    } else if (tasks) {
      setInitialItems(tasks);
    } else if (overdueTasks) {
      if (isOverdueSelected) {
        setInitialItems(overdueTasks);
      } else {
        setInitialItems([]);
      }
    }
  }, [tasks, overdueTasks, isOverdueSelected]);
  const { t } = useTranslation();
  useEffect(
    () => () => {
      resetSelectedItems();
      resetCheckSelectedAll();
    },
    [],
  );

  if (!isAnyFilterSelected) {
    return <NoFilterSelected />;
  } else if (isLoading) {
    return <LoadingSpinner />;
  } else if (!thereAreTasksToShow) {
    return <EmptyTaskList />;
  } else {
    return (
      <>
        {isOverdueSelected && overdueTasks?.length > 0 && (
          <>
            <VirtualizedList
              data={overdueTasks}
              parentRef={parentRef}
              setScrollMargin={setScrollMargin}
            >
              {(item, index) => (
                <Fragment key={item?.id?.value}>
                  {index === 0 && <DateGroupHeader text="Overdue" />}
                  <TaskHomeCard task={item} logCustomActivity={logCustomActivity} />
                </Fragment>
              )}
            </VirtualizedList>

            {hasNextPageOverdue && !isLoadingMoreOverdue && (
              <div className={styles._show_more} onClick={() => setOverduePage(overduePage + 1)}>
                <Text size="xxs" color="bloobirds">
                  {t('home.leftContent.taskList.loadMore')}
                </Text>
              </div>
            )}
            {isLoadingMoreOverdue && <LoadingSpinner />}
          </>
        )}
        {(scrollMargin > 0 || !overdueTasks || overdueTasks.length === 0) && tasks && (
          <VirtualizedList data={tasks} parentRef={parentRef} scrollMargin={scrollMargin}>
            {(item, index) => (
              <Fragment key={item.id.value}>
                {index === 0 && (
                  <DateGroupHeader text={t('home.leftContent.taskList.tasksForToday')} />
                )}
                <TaskHomeCard task={item} logCustomActivity={logCustomActivity} />
                {index === timeMarkerPosition && isToday(new Date()) && (
                  <div className={styles._time_marker}>
                    <span className={styles._time_marker_bullet} />
                    <span className={styles._time_marker_line} />
                  </div>
                )}
              </Fragment>
            )}
          </VirtualizedList>
        )}
        {hasNextPage && !isLoadingMore && (
          <div className={styles._show_more} onClick={() => setPage(page + 1)}>
            <Text size="xxs" color="bloobirds">
              {t('home.leftContent.taskList.loadMore')}
            </Text>
          </div>
        )}
        {isLoadingMore && <LoadingSpinner />}
      </>
    );
  }
};
