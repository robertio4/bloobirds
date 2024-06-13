import React, { Fragment } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { range } from 'lodash';

import Transition from '../../transition';
import styles from './activitiesPlaceholder.css';

const DateTitleSkeleton = () => (
  <div className={styles._date_title}>
    <Skeleton variant="text" height={24} width="25%" />
  </div>
);

const ActivityCardSkeleton = () => (
  <div className={styles._card}>
    <header className={styles._card_header}>
      <Skeleton variant="circle" width={36} height={36} />
      <div className={styles._card_header_text}>
        <Skeleton variant="text" width="40%" height={16} />
        <Skeleton variant="text" width="20%" height={12} />
      </div>
      <Skeleton variant="text" width="10%" height={16} />
    </header>
    <Skeleton variant="rect" width="100%" height={64} />
  </div>
);

const ActivitiesPlaceholder = ({ visible } = {}) => {
  return (
    <Transition type="fade" visible={visible}>
      <div className={styles._list}>
        {range(3).map(number => (
          <Fragment key={number}>
            {number % 2 === 0 && <DateTitleSkeleton />}
            <ActivityCardSkeleton />
          </Fragment>
        ))}
      </div>
    </Transition>
  );
};

export default ActivitiesPlaceholder;
