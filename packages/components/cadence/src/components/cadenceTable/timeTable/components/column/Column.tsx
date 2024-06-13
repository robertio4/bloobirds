import React from 'react';
import { VirtualItem } from 'react-virtual';

import { parseUTCDateToLocal } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isWeekend } from 'date-fns';

import {
  CadenceTimeTask,
  CadenceType,
  cadenceTypesList,
  TIME_WINDOW,
} from '../../../cadenceTable.type';
import styles from '../../timeTable.module.css';
import { BadgeDropdown } from './BadgeDropdown';
import { ColumnHeader } from './ColumnHeader';

interface ColumnProps {
  dayTasks?: CadenceTimeTask;
  virtualColumn: VirtualItem;
  date: string;
  timeWindow: TIME_WINDOW;
  isPausedDay: boolean;
  setTimeWindowWithDate: (timeWindow: TIME_WINDOW, date: string) => void;
}

export const Column = React.memo((props: ColumnProps) => {
  const { dayTasks, virtualColumn, date, timeWindow, isPausedDay, setTimeWindowWithDate } = props;
  const classnames = clsx(styles.row, {
    [styles.weekendDay]: timeWindow === TIME_WINDOW.DAILY && isWeekend(parseUTCDateToLocal(date)),
  });
  return (
    <div
      className={styles.column}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${virtualColumn.size}px`,
        transform: `translateX(${virtualColumn.start}px)`,
      }}
    >
      <ColumnHeader
        date={date}
        timeWindow={timeWindow}
        isPausedDay={isPausedDay}
        setTimeWindowWithDate={setTimeWindowWithDate}
      />
      {cadenceTypesList?.map((cadenceAction: CadenceType) => {
        if (!dayTasks || !dayTasks[cadenceAction]) {
          return <div className={classnames} key={`empty-row-${cadenceAction}`} />;
        }
        return (
          <div className={classnames} key={`row-${cadenceAction}`}>
            <BadgeDropdown
              dayTasks={dayTasks}
              cadenceAction={cadenceAction}
              timeWindow={timeWindow}
              date={date}
            />
          </div>
        );
      })}
    </div>
  );
});
