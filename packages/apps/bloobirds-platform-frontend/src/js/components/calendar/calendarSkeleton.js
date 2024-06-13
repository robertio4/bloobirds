import React from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import styles from './calendar.module.css';
import { range } from 'lodash';

const CalendarSkeleton = ({ weeks }) => {
  const weeksToRender = weeks || 5;
  return (
    <div data-test="calendar-skeleton" className={styles._skeleton_wrapper}>
      {range(7 * weeksToRender).map(index => (
        <Skeleton key={`calendar-day-${index}`} width={40} height={40} variant="circle" />
      ))}
    </div>
  );
};

export default CalendarSkeleton;
