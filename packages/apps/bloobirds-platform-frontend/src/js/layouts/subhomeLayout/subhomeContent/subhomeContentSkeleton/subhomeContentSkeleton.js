import React, { Fragment } from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import Transition from '../../../../components/transition';
import styles from './subhomeSkeleton.module.css';
import { range } from 'lodash';

const DateTitleSkeleton = () => (
  <div className={styles._date_title}>
    <Skeleton variant="text" height={24} width="25%" />
  </div>
);

const SubhomeContentSkeleton = ({ visible } = {}) => {
  return (
    <Transition type="fade" visible={visible}>
      <div className={styles._list}>
        {range(10).map(number => (
          <Fragment key={number}>
            {number % 4 === 0 && <DateTitleSkeleton />}
            <div className={styles._card}>
              <Skeleton variant="rect" width="100%" height={50} />
            </div>
          </Fragment>
        ))}
      </div>
    </Transition>
  );
};

export default SubhomeContentSkeleton;
