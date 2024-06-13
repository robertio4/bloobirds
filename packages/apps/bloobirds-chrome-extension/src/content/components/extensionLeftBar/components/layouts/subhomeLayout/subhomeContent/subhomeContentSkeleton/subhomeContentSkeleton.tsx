import React, { Fragment } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import range from 'lodash/range';

import Transition from '../../../../../../transition/transition';
import styles from './subhomeSkeleton.module.css';

const DateTitleSkeleton = () => (
  <div className={styles._date_title}>
    <Skeleton variant="text" height={24} width="25%" />
  </div>
);

const SubhomeContentSkeleton = ({ visible }: { visible: boolean }) => {
  return (
    <Transition type="fade" visible={visible}>
      <div className={styles._list}>
        {range(12).map(number => (
          <Fragment key={number}>
            {number % 4 === 0 && <DateTitleSkeleton />}
            <div className={styles._card}>
              <Skeleton variant="rect" width="100%" height={48} />
            </div>
          </Fragment>
        ))}
      </div>
    </Transition>
  );
};

export default SubhomeContentSkeleton;
