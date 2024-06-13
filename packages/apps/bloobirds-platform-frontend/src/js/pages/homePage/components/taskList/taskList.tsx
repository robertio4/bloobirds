import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useQuickLogActivity, useSelectAll } from "@bloobirds-it/hooks";
import { isToday } from 'date-fns';

import {
  useUserDateOverdueTasks,
  useUserDateTasks,
  useUserTasksFilters,
} from '../../../../hooks/useUserTasks';
import { TasksHookFamilies } from '../../../../typings/tasks';
import styles from '../../homePage.module.css';
import {
  DateGroupHeader,
  EmptyTaskList,
  getTimeMarkerPosition,
  isStatus,
} from '../../pages/leftContent/utils/utils';
import { UserHomeConfig } from '../../typings/home';
import { TaskHomeCard } from '../taskHomeCard/taskHomeCard';
import VirtualizedList from '../virtualizedList/virtualizedList';

export const TaskList = ({
  filters,
  parentRef,
  importantSelected,
}: {
  filters: UserHomeConfig[];
  parentRef: React.RefObject<HTMLDivElement>;
  importantSelected?: boolean;
}) => {
  const { setProspectingTypesFilter } = useUserTasksFilters(TasksHookFamilies.Home);
  const { tasks = [], isLoading } = useUserDateTasks({
    date: new Date(),
    family: TasksHookFamilies.Home,
    importantSelected,
  });
  const length = tasks?.length;
  const { tasks: overdueTasks = [] } = useUserDateOverdueTasks({
    date: new Date(),
    family: TasksHookFamilies.Home,
    importantSelected,
  });
  const { logCustomActivity } = useQuickLogActivity();
  const overdueLength = overdueTasks?.length;
  const showOverdue = filters.find(f => f.enumName.includes('OVERDUE'))?.enabled;
  const [timeMarkerPosition, setTimeMarkerPosition] = useState(-1);
  const [scrollMargin, setScrollMargin] = useState(0);
  const { setInitialItems, resetSelectedItems, resetCheckSelectedAll } = useSelectAll();

  useEffect(() => {
    setProspectingTypesFilter(filters);
  }, [filters]);

  useEffect(() => {
    setTimeMarkerPosition(getTimeMarkerPosition(tasks));
    const intervalId = setInterval(
      () => setTimeMarkerPosition(getTimeMarkerPosition(tasks)),
      60000,
    );

    return () => intervalId && clearInterval(intervalId);
  }, [tasks]);

  // Selected items

  useEffect(() => {
    setInitialItems([...overdueTasks, ...tasks]);
  }, [tasks, overdueTasks]);

  useEffect(
    () => () => {
      resetSelectedItems();
      resetCheckSelectedAll();
    },
    [],
  );
  const { t } = useTranslation();
  const shouldNotShowResults = !filters.find(f => !isStatus(f.enumName) && f.enabled);

  return (
    <>
      {isLoading ? (
        <>
          {shouldNotShowResults ? (
            <div className={styles.noTasks}>
              <Text size="m" color="softPeanut" align="center">
                {t('home.leftContent.taskList.noTypeSelected')}
              </Text>
            </div>
          ) : (
            <div className={styles.spinner}>
              <Spinner size={24} name={'loadingCircle'} />
            </div>
          )}
        </>
      ) : (
        <>
          {length === 0 && overdueLength === 0 ? (
            <>
              {shouldNotShowResults ? (
                <div className={styles.noTasks}>
                  <Text size="m" color="softPeanut" align="center">
                    {t('home.leftContent.taskList.noTypeSelected')}
                  </Text>
                </div>
              ) : (
                <div style={{ height: '89%' }}>
                  <div className={styles.noTasks}>
                    <EmptyTaskList />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {shouldNotShowResults ? (
                <div className={styles.noTasks}>
                  <Text size="m" color="softPeanut" align="center">
                    {t('home.leftContent.taskList.noTypeSelected')}
                  </Text>
                </div>
              ) : (
                <>
                  {showOverdue && overdueTasks?.length > 0 && (
                    <>
                      <VirtualizedList
                        data={overdueTasks}
                        parentRef={parentRef}
                        setScrollMargin={setScrollMargin}
                      >
                        {(item, index) => (
                          <Fragment key={item?.id?.value}>
                            {index === 0 && <DateGroupHeader text={t('leftBar.overdueTasks')} />}
                            <TaskHomeCard task={item} />
                          </Fragment>
                        )}
                      </VirtualizedList>
                    </>
                  )}
                  {(scrollMargin > 0 || !overdueTasks || overdueTasks.length === 0) && tasks && (
                    <VirtualizedList data={tasks} parentRef={parentRef} scrollMargin={scrollMargin}>
                      {(item, index) => (
                        <Fragment key={item.id.value}>
                          {index === 0 && <DateGroupHeader text={t('home.leftContent.taskList.tasksForToday')} />}
                          <TaskHomeCard task={item} />
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
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
