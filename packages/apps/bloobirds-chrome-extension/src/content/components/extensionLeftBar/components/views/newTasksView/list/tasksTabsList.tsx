import React from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';
import useSWR from 'swr';

import { useSubscribeListeners } from '../../../../../contactView/hooks/useSubscribeListeners';
import { useTaskFeedContext } from '../hooks/useTasksTab';
import { Clusters, TaskFeedTaskList } from '../types';
import TaskTabFeedGroup, { TaskTabFeedGroupTitle } from './taskTabFeedGroup';
import styles from './taskTabsList.module.css';

const clusterNames: Array<keyof Clusters> = [
  'dailyTasks',
  'scheduledTasks',
  'reminders',
  'overdueTasks',
];

function injectCadenceName(task, cadences) {
  if (!cadences) return task;
  const cadenceName = cadences.find(cadence => cadence.id === task.cadenceId)?.name;
  return { ...task, cadenceName };
}

export const TasksTabList = ({ parentRef }) => {
  const { useGetState, tasks } = useTaskFeedContext();
  const visibleClusters = useGetState(state => state.visibleClusters);
  const { data } = useSWR('/taskFeed/cadences', { revalidateOnFocus: false });
  useSubscribeListeners(BobjectTypes.Task, tasks?.mutate);
  if (!tasks || (tasks.isLoading && !tasks.clusters)) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {clusterNames.map(name => {
          return (
            <div
              key={name + 'clusterLoader'}
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <div className={styles.header}>
                <TaskTabFeedGroupTitle cluster={name} />
              </div>
              <Skeleton variant="rect" width="100%" height="140px" />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <>
      {tasks?.type === 'clustered' &&
        Object.entries<TaskFeedTaskList>(tasks.clusters)
          .filter(([clusterName, _]) => {
            return visibleClusters.includes(clusterName as keyof Clusters);
          })
          .map(([clusterName, clusterTasks]) => {
            if (
              ['overdueTasks', 'reminders'].includes(clusterName) &&
              clusterTasks.tasks.length === 0
            )
              return null;
            return (
              <TaskTabFeedGroup
                tasks={{
                  ...clusterTasks,
                  tasks: clusterTasks?.tasks.map(task => injectCadenceName(task, data?.cadences)),
                }}
                clusterName={clusterName as keyof Clusters}
                key={clusterName}
                isLoading={tasks.isLoading}
                parentRef={parentRef}
                taskFeedReqBody={tasks.taskFeedRequest}
                defaultOpen={visibleClusters.length === 1}
              />
            );
          })}
    </>
  );
};
