import { Fragment } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import range from 'lodash/range';

import styles from './tasksFeedSkeleton.module.css';

const DateTitleSkeleton = () => (
  <div className={styles.dateTitle}>
    <Skeleton variant="text" height={16} width="70%" />
  </div>
);

const TaskCardSkeleton = () => (
  <div className={styles.card}>
    <header className={styles.cardHeader}>
      <Skeleton variant="circle" width={18} height={18} />
      <Skeleton variant="circle" width={18} height={18} />
      <Skeleton variant="circle" width={18} height={18} />
      <div className={styles.cardHeaderText}>
        <Skeleton variant="text" width="100%" height={16} />
      </div>
    </header>
  </div>
);

const TasksFeedSkeleton = () => (
  <>
    <DateTitleSkeleton />
    {range(4).map(number => (
      <Fragment key={number}>
        <TaskCardSkeleton />
      </Fragment>
    ))}
  </>
);

export default TasksFeedSkeleton;
