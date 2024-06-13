import React, { Fragment, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CheckItem, MultiSelect, Text } from '@bloobirds-it/flamingo-ui';
import { useQuickLogActivity, useCustomTasks } from '@bloobirds-it/hooks';
import {
  BOBJECT_TYPES,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { startOfDay, subDays } from '@bloobirds-it/utils';

import { useActiveUser, useRouter } from '../../../../hooks';
import { useSelectedLead } from '../../../../hooks/useSelectedLead';
import {
  getFieldByLogicRole,
  getValueFromLogicRole,
  isOpportunity,
} from '../../../../utils/bobjects.utils';
import { isCompanyPage, isLeadPage } from '../../../../utils/pages.utils';
import { useContactBobjects } from '../../contactPageContext';
import { TaskCard } from '../../taskCard/taskCard';
import TasksPlaceholder from './tasksPlaceholder/tasksPlaceholder';
import styles from './tasksSection.module.css';
import { addTaskDateGrouping } from './tasksSection.utils';
import {
  useCompletedTasks,
  useCurrentTasks,
  useOverdueTasks,
  useTasksTabFilters,
  useTasksTabPage,
} from './useTasksSection';

type TaskDate = {
  hashDate: string;
  prefix: string;
};

interface BobjectInterface {
  taskDate: TaskDate;
}

const TASKS_FILTERS = [
  {
    value: 'PROSPECT_CADENCE',
    name: 'Cadence',
  },
  {
    value: 'NEXT_STEP',
    name: 'Scheduled',
  },
  {
    value: 'CONTACT_BEFORE_MEETING',
    name: 'Meeting',
  },
];

const TASK_FILTERS_DEFAULT = [
  TASK_TYPE.PROSPECT_CADENCE,
  TASK_TYPE.NEXT_STEP,
  TASK_TYPE.CONTACT_BEFORE_MEETING,
  TASK_TYPE.SCHEDULED_EMAIL,
];

const prefixOrder = ['Today', 'Future tasks', 'Completed'];

const checkIsOverdue = (item: any) => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));
  const status = getFieldByLogicRole(item, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;

  return (
    startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1) &&
    ![
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
    ].includes(status)
  );
};

const DateGroupHeader = ({ bobject }: { bobject: BobjectInterface }) => (
  <header className={styles._header} id={bobject?.taskDate.hashDate}>
    <Text color="peanut" weight="medium" size="m" inline>
      {bobject?.taskDate.prefix}
    </Text>
  </header>
);

const EmptyList = () => (
  <div className={styles._list_empty}>
    <Text color="softPeanut">
      No pending tasks{' '}
      <span role="img" aria-label="sunglasses">
        😎
      </span>
    </Text>
  </div>
);

const TasksFilters = () => {
  const { typeFilter, setTypeFilter } = useTasksTabFilters();

  useEffect(() => {
    setTypeFilter(TASK_FILTERS_DEFAULT);
  }, []);

  return (
    <div className={styles._filters_container}>
      <MultiSelect
        placeholder={'Tasks type'}
        size="small"
        onChange={setTypeFilter}
        value={typeFilter || []}
        variant="filters"
        selectAllOption
      >
        {TASKS_FILTERS.map(filter => (
          <CheckItem key={filter.value} value={filter.value}>
            {filter.name}
          </CheckItem>
        ))}
      </MultiSelect>
    </div>
  );
};

const TasksList = () => {
  const { getBobjectId } = useActiveUser();
  const { query, pathname } = useRouter();
  const { selectedLead } = useSelectedLead();
  const leadId = isLeadPage(pathname)
    ? getBobjectId(query?.id, BOBJECT_TYPES.LEAD)
    : selectedLead?.id.value;
  const { company, active } = useContactBobjects();
  const {
    items: currentTasks,
    isLoading: isLoadingCurrentTasks,
    totalMatching: totalCurrentTasks,
    resetItems: resetCurrentTasks,
  } = useCurrentTasks({
    companyId: isCompanyPage(pathname) ? company?.id.value : null,
    opportunityId: isOpportunity(active) ? active?.id.value : null,
    leadId: isLeadPage(pathname) ? leadId : null,
  });
  const {
    items: overdueTasks,
    isLoading: isLoadingOverdueTasks,
    totalMatching: totalOverdueTasks,
    resetItems: resetOverdueTasks,
  } = useOverdueTasks({
    companyId: isCompanyPage(pathname) ? company?.id.value : null,
    opportunityId: isOpportunity(active) ? active?.id.value : null,
    leadId: isLeadPage(pathname) ? leadId : null,
  });
  const {
    items: completedTasks,
    isLoading: isLoadingCompletedTasks,
    totalMatching: totalCompletedTasks,
    resetItems: resetCompletedTasks,
  } = useCompletedTasks({
    companyId: isCompanyPage(pathname) ? company?.id.value : null,
    opportunityId: isOpportunity(active) ? active?.id.value : null,
    leadId: isLeadPage(pathname) ? leadId : null,
  });

  const { customTasks } = useCustomTasks({ disabled: true });
  const { logCustomActivity } = useQuickLogActivity();

  const { resetTypeFilter } = useTasksTabFilters();
  const { hasNextPage, loadNextPage, setHasNextPage } = useTasksTabPage();

  const filteredTasks = useMemo(() => {
    const sortedTasks = addTaskDateGrouping(
      currentTasks,
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      checkIsOverdue,
    );
    sortedTasks.sort((taskA: any, taskB: any) => {
      const taskAPrefix = taskA.taskDate.prefix;
      const taskADate = taskA.taskDate.day;
      const taskBPrefix = taskB.taskDate.prefix;
      const taskBDate = taskB.taskDate.day;
      if (prefixOrder?.indexOf(taskAPrefix) === prefixOrder?.indexOf(taskBPrefix)) {
        return taskADate - taskBDate;
      } else {
        return prefixOrder?.indexOf(taskAPrefix) - prefixOrder?.indexOf(taskBPrefix);
      }
    });

    return addTaskDateGrouping(
      sortedTasks,
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      checkIsOverdue,
    );
  }, [currentTasks]);

  useEffect(() => {
    if (filteredTasks?.length === totalCurrentTasks) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredTasks, totalCurrentTasks]);

  useEffect(
    () => () => {
      resetCurrentTasks();
      resetOverdueTasks();
      resetCompletedTasks();
      resetTypeFilter();
    },
    [],
  );

  if (
    !isLoadingCurrentTasks &&
    !isLoadingOverdueTasks &&
    !isLoadingCompletedTasks &&
    filteredTasks.length === 0 &&
    totalOverdueTasks === 0 &&
    totalCompletedTasks === 0
  ) {
    return <EmptyList />;
  }

  return (
    <>
      {!isLoadingOverdueTasks && customTasks ? (
        <>
          {overdueTasks.length > 0 &&
            overdueTasks.map((overdueTask: any, index: number) => {
              const isFirstOfDay = index === 0;
              const nextBobject = overdueTasks[index + 1];
              const showNextLine = nextBobject && !isFirstOfDay;
              return (
                <Fragment key={overdueTask.id.value}>
                  {isFirstOfDay && (
                    <header className={styles._header}>
                      <Text color="peanut" weight="medium" size="m" inline>
                        Overdue
                      </Text>
                    </header>
                  )}
                  <TaskCard
                    task={overdueTask}
                    showNextLine={showNextLine}
                    customTasks={customTasks}
                    logCustomActivity={logCustomActivity}
                  />
                </Fragment>
              );
            })}
        </>
      ) : (
        <TasksPlaceholder visible />
      )}

      <InfiniteScroll
        dataLength={filteredTasks.length}
        hasMore={hasNextPage}
        className={styles._list_wrapper}
        next={loadNextPage}
        scrollThreshold={0.75}
        scrollableTarget={query?.id}
        loader={<TasksPlaceholder visible />}
      >
        {filteredTasks.map((task: any, index: number) => {
          const nextBobject = filteredTasks[index + 1];
          const showNextLine = nextBobject && !nextBobject?.taskDate?.isFirstOfDay;
          return (
            <Fragment key={task.id.value}>
              {task.taskDate?.isFirstOfDay && <DateGroupHeader bobject={task} />}
              <TaskCard
                task={task}
                showNextLine={showNextLine}
                customTasks={customTasks}
                logCustomActivity={logCustomActivity}
              />
            </Fragment>
          );
        })}
      </InfiniteScroll>

      {!isLoadingCompletedTasks && customTasks ? (
        <>
          {completedTasks.length > 0 &&
            completedTasks.map((completedTask: any, index: number) => {
              const isFirstOfDay = index === 0;
              const nextBobject = completedTasks[index + 1];
              const showNextLine = nextBobject && !isFirstOfDay;
              return (
                <Fragment key={completedTask.id.value}>
                  {isFirstOfDay && (
                    <header className={styles._header}>
                      <Text color="peanut" weight="medium" size="m" inline>
                        Completed
                      </Text>
                    </header>
                  )}
                  <TaskCard
                    task={completedTask}
                    showNextLine={showNextLine}
                    customTasks={customTasks}
                    logCustomActivity={logCustomActivity}
                  />
                </Fragment>
              );
            })}
        </>
      ) : (
        <TasksPlaceholder visible />
      )}
    </>
  );
};

const TasksSection = () => {
  return (
    <div className={styles._container}>
      <div className={styles._content}>
        <TasksFilters />
        <div className={styles._list_container}>
          <TasksList />
        </div>
      </div>
    </div>
  );
};

export default TasksSection;
