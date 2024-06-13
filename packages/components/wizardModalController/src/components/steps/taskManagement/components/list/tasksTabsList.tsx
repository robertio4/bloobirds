import React from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';

import { useTaskManagementContext } from '../../hooks/useTaskManagement';
import { Clusters, TaskFeedTaskList } from '../../types/taskManagement.types';
import TaskTabFeedGroup, { TaskTabFeedGroupTitle } from './taskTabFeedGroup';
import styles from './taskTabsList.module.css';

const clusterNames: Array<keyof Clusters> = ['dailyTasks', 'scheduledTasks', 'overdueTasks'];

function injectCadenceName(task, cadences) {
  if (!cadences) return task;
  const cadenceName = cadences.find(cadence => cadence.id === task.cadenceId)?.name;
  return { ...task, cadenceName };
}

export const TasksTabList = ({ parentRef }) => {
  const { currentTasksProps: tasks } = useTaskManagementContext();
  const { visibleClusters } = tasks || {};
  const { data } = useSWR('/taskFeed/cadences', { revalidateOnFocus: false });
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
              <Skeleton variant="rect" width="100%" height="90px" />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <>
      {tasks?.type === 'clustered' ? (
        Object.entries<TaskFeedTaskList>(tasks.clusters)
          .filter(([clusterName, _]) => {
            return visibleClusters.includes(clusterName as keyof Clusters);
          })
          .map(([clusterName, clusterTasks]) => {
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
                defaultOpen={visibleClusters.length === 1}
              />
            );
          })
      ) : (
        <div>NOT CLUSTERED</div>
      )}
    </>
  );
};
