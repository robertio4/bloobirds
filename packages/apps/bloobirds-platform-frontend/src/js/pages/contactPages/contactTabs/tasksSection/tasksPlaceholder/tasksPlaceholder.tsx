import React, { Fragment } from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { range } from 'lodash';
import styles from './tasksPlaceholder.module.css';
import Transition from '../../../../../components/transition';

interface TasksPlaceholderProps {
  visible: boolean;
}

const DateTitleSkeleton = () => (
  <div className={styles._date_title}>
    <Skeleton variant="text" height={24} width="25%" />
  </div>
);

const TaskCardSkeleton = () => (
  <div className={styles._card}>
    <header className={styles._card_header}>
      <Skeleton variant="circle" width={36} height={36} />
      <div className={styles._card_header_text}>
        <Skeleton variant="text" width="40%" height={16} />
        <Skeleton variant="text" width="20%" height={12} />
      </div>
      <Skeleton variant="text" width="10%" height={16} />
    </header>
  </div>
);

const TasksPlaceholder = ({ visible }: TasksPlaceholderProps) => {
  return (
    <Transition type="fade" visible={visible}>
      <div className={styles._list}>
        {range(10).map(number => (
          <Fragment key={number}>
            {number % 2 === 0 && <DateTitleSkeleton />}
            <TaskCardSkeleton />
          </Fragment>
        ))}
      </div>
    </Transition>
  );
};

export default TasksPlaceholder;
