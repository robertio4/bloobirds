import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';
import { formatDate, isToday, isWeekend } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isFuture } from 'date-fns';

import styles from './calendar.module.css';

const getTextColors = (selected, dayData) => {
  const parsedDate = new Date(dayData?.dateValue);
  let colors = {
    day: 'verySoftPeanut',
    data: 'softPeanut',
  };

  if (selected) {
    colors = {
      day: 'bloobirds',
      data: 'bloobirds',
    };
  }

  if ((isToday(parsedDate) || isFuture(parsedDate)) && !isWeekend(parsedDate)) {
    colors = {
      day: 'softPeanut',
      data: 'bloobirds',
    };
  }

  if (dayData?.isToday) {
    colors = {
      day: 'white',
      data: 'white',
    };
  }

  return colors;
};

const Day = ({ day, selected, onClick }) => {
  const colors = getTextColors(selected, day);
  const parsedDate = new Date(day?.dateValue);

  return (
    <div
      className={clsx(styles._day_wrapper, {
        [styles._selected]: selected && !day?.isToday,
        [styles._marked]: day?.marked && !day?.isToday,
        [styles._weekend]: day?.inMonth && day?.isWeekend && !selected,
        [styles._today]: day?.isToday,
        [styles._empty]: day?.dayNumber === 0,
      })}
      onClick={() => {
        if (day?.dayNumber > 0) {
          onClick();
        }
      }}
      data-test={`day-${formatDate(parsedDate, 'yyyy-MM-dd')}`}
    >
      <Text size="xxs" color={colors.day} htmlTag="span">
        {day?.inMonth ? day?.dayNumber : ''}
      </Text>
      {day?.data && (
        <Text
          size="xxs"
          color={colors.data}
          htmlTag="span"
          dataTest={`day-${formatDate(parsedDate, 'yyyy-MM-dd')}-data`}
          weight="bold"
        >
          {day?.inMonth ? day?.data : ' '}
        </Text>
      )}
    </div>
  );
};

export default Day;
