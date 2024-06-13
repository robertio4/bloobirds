import React, { useState, useMemo, useEffect } from 'react';

import { IconButton, Skeleton, Text } from '@bloobirds-it/flamingo-ui';
import { useQuickLogActivity, useCustomTasks } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';

import { useActiveUser, useRouter, useTaskNavigationStorage } from '../../../hooks';
import { useSelectedOpportunity } from '../../../hooks/useSelectedOpportunity';
import { RouterQuery } from '../../../typings/router';
import { getValueFromLogicRole } from '../../../utils/bobjects.utils';
import { convertHtmlToString } from '../../../utils/email.utils';
import { isCompanyPage, isLeadPage } from '../../../utils/pages.utils';
import { useContactBobjects } from '../contactPageContext';
import { MeetingTaskBoxCard } from '../meetingCard/meetingTaskBoxCard';
import { TaskCard } from '../taskCard/taskCard';
import EmptyCard from './emptyCard/emptyCard';
import styles from './tasksBox.module.css';
import { useTasksBox } from './useTasksBox';

const TasksBox = ({ hasChangedTheBobject }: { hasChangedTheBobject: boolean }) => {
  const [indexTask, setIndexTask] = useState(0);
  const { getBobjectId } = useActiveUser();
  const { query, pathname }: RouterQuery = useRouter();
  const leadId = isLeadPage(pathname) ? getBobjectId(query?.id, BOBJECT_TYPES.LEAD) : undefined;
  const { company } = useContactBobjects();
  const { selectedOpportunity } = useSelectedOpportunity();
  const { items: tasks, isLoading, resetItems } = useTasksBox({
    companyId: isCompanyPage(pathname) ? company?.id.value : null,
    opportunityId: selectedOpportunity?.id?.value,
    leadId,
    shouldRefetch: hasChangedTheBobject,
  });

  const { customTasks } = useCustomTasks({ disabled: true });
  const { logCustomActivity } = useQuickLogActivity();
  const { selectedTask } = useTaskNavigationStorage();

  const taskList = useMemo(() => {
    if (selectedTask && tasks.length > 0) {
      const task = tasks.find(t => t.id.value === selectedTask.id.value);
      const filteredList = tasks.filter(
        filteredTask => filteredTask.id.value !== selectedTask.id.value,
      );
      if (filteredList.length < tasks.length) {
        const taskToShow = !task ? selectedTask : task;
        return [taskToShow, ...filteredList];
      }
    }

    return tasks;
  }, [tasks, selectedTask]);

  const selectedItem = taskList[indexTask];
  const isTask = selectedItem?.id.typeName === BOBJECT_TYPES.TASK;
  const isActivity = selectedItem?.id.typeName === BOBJECT_TYPES.ACTIVITY;
  const totalTasks = taskList?.length;
  const description = selectedItem
    ? getValueFromLogicRole(selectedItem, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)
    : undefined;

  useEffect(
    () => () => {
      resetItems();
    },
    [],
  );

  return (
    <div className={styles._container}>
      <div
        className={clsx(styles._title, {
          [styles._title__no_tasks]: !selectedItem,
        })}
      >
        <div className={styles._info__container}>
          <Text size="s" color="softPeanut" className={styles._tasksTitle}>
            Tasks for today
          </Text>
          {description && !description.startsWith('org.mozilla.javascript') && (
            <div className={styles._info_message__container}>
              <span className={styles._info__message__emoji} role="img" aria-label="sunglasses">
                👉
              </span>
              <Text className={styles._task_description_header} size="s">
                {convertHtmlToString(description)}
              </Text>
            </div>
          )}
        </div>
        {selectedItem && (
          <div className={styles._change_task_button}>
            <IconButton
              name="chevronLeft"
              size={16}
              color="peanut"
              disabled={indexTask === 0}
              onClick={() => setIndexTask(indexTask > 0 ? indexTask - 1 : 0)}
            />
            <Text size="s" inline>{`${indexTask + 1} / ${totalTasks}`}</Text>
            <IconButton
              name="chevronRight"
              size={16}
              color="peanut"
              disabled={indexTask === totalTasks - 1 || totalTasks === 0}
              onClick={() => setIndexTask(totalTasks - 1 > indexTask ? indexTask + 1 : indexTask)}
            />
          </div>
        )}
      </div>
      {selectedItem && isTask && (
        <TaskCard
          task={selectedItem}
          isSmall={true}
          fromTaskBox={true}
          customTasks={customTasks}
          logCustomActivity={logCustomActivity}
        />
      )}
      {selectedItem && isActivity && <MeetingTaskBoxCard bobject={selectedItem} />}
      {!selectedItem && isLoading && (
        <div className={styles._taskSkeleton__container}>
          <Skeleton variant="circle" height={20} width={20} />
          <Skeleton variant="text" height={20} width={120} />
          <Skeleton variant="text" height={20} width={100} />
          <Skeleton variant="text" height={20} width={120} />
        </div>
      )}
      {!selectedItem && !isLoading && (
        <EmptyCard>
          No pending tasks{' '}
          <span role="img" aria-label="sunglasses">
            😎
          </span>
        </EmptyCard>
      )}
    </div>
  );
};

export default TasksBox;
