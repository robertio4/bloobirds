import { Suspense } from 'react';

import useSWR from 'swr';

import { Clusters, TaskFeedTaskList } from '../../types/clusteredTaskFeed.type';
import { TaskFeedProvider, useTaskFeedContext } from '../../utils/useTasksTab';
import { TaskFeedSkeleton } from '../taskFeedSkeleton/taskFeedSkeleton';
import { TasksTabFilters } from '../taskFilters/tasksTabFilters';
import TaskTabFeedGroup from './taskTabFeedGroup';

function injectCadenceName(task, cadences) {
  if (!cadences) return task;
  const cadenceName = cadences.find(cadence => cadence.id === task.cadenceId)?.name;
  return { ...task, cadenceName };
}

export const TasksTabList = ({ parentRef }) => {
  const { useGetState, tasks } = useTaskFeedContext();
  const visibleClusters = useGetState(state => state.visibleClusters);
  const { data } = useSWR('/taskFeed/cadences', { revalidateOnFocus: false });

  return !tasks || (tasks.isLoading && !tasks.clusters) ? (
    <TaskFeedSkeleton />
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px', width: '100%' }}>
      <TasksTabFilters filtersVisible />
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
    </div>
  );
};

export function ClusteredTasksList(props) {
  return (
    <Suspense fallback={<TaskFeedSkeleton />}>
      <TaskFeedProvider mainBobject={props?.mainBobject}>
        <TasksTabList {...props} />
      </TaskFeedProvider>
    </Suspense>
  );
}
