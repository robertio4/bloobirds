import React, { Fragment } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import styles from './activityFeedSkeleton.module.css';
import range from 'lodash/range';

const ActivityCardSkeleton = () => (
  <div className={styles.card}>
    <header className={styles.cardHeader}>
      <Skeleton variant="circle" width={16} height={16} />
      <div className={styles.cardHeaderText}>
        <Skeleton variant="text" width="100%" height={16} />
      </div>
      <Skeleton variant="text" width="10%" height={16} />
    </header>
  </div>
);

const ActivityFeedSkeleton = () => (
  <>
    {range(4).map(number => (
      <Fragment key={number}>
        <ActivityCardSkeleton />
      </Fragment>
    ))}
  </>
);

export default ActivityFeedSkeleton;
