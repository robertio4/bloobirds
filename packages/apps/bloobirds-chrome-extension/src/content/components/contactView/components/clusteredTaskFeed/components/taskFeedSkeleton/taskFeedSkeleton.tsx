import { Skeleton } from '@bloobirds-it/flamingo-ui';

import { Clusters } from '../../types/clusteredTaskFeed.type';
import { TaskTabFeedGroupTitle } from '../taskList/taskTabFeedGroup';
import styles from '../taskList/taskTabsList.module.css';

const clusterNames: Array<keyof Clusters & string> = [
  'dailyTasks',
  'scheduledTasks',
  'completedTasks',
];

export function TaskFeedSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
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
