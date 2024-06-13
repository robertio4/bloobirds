import React, { useMemo, useState } from 'react';

import { Button, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { formatDate } from '@bloobirds-it/utils';
import { isSameDay } from 'date-fns';
import PropTypes from 'prop-types';

import useCalendar from '../../hooks/useCalendar';
import styles from './calendar.module.css';
import CalendarSkeleton from './calendarSkeleton';
import Day from './day';

const Calendar = ({
  data,
  date,
  onSelectedDay,
  onNextMonth: onNextMonthCallback,
  onPrevMonth: onPrevMonthCallback,
  onToday: onTodayCallback,
  markedDays,
}) => {
  const {
    title,
    currentMonth,
    currentYear,
    days,
    onNextMonth,
    onPrevMonth,
    onToday,
  } = useCalendar({ date });
  const [selectedDay, setSelectedDay] = useState(date);

  const addDataToDays = () =>
    data
      ? days?.map(day => {
          if (!day?.dateValue) {
            return day;
          }
          const parsedDate = new Date(day?.dateValue);
          return { ...day, data: data[formatDate(parsedDate, 'yyyy-MM-dd')] };
        })
      : [];

  const daysToRender = useMemo(() => {
    let arrayDays = days;

    if (data) {
      arrayDays = addDataToDays();
    }

    if (markedDays) {
      arrayDays = arrayDays?.map(day => ({
        ...day,
        marked: markedDays.includes(formatDate(new Date(day?.dateValue), 'yyyy-MM-dd')),
      }));
    }

    return arrayDays;
  }, [days, data, markedDays]);

  return (
    <div className={styles._container}>
      <div className={styles._header}>
        <Text size="l" color="peanut" dataTest="Calendar-Title">
          {title}
        </Text>
        <div className={styles._navigation_wrapper}>
          <IconButton
            name="chevronLeft"
            size={20}
            onClick={() => {
              onPrevMonth();
              onPrevMonthCallback(currentMonth - 1, currentYear);
            }}
            dataTest="Calendar-Previous-Month"
          />
          <IconButton
            name="chevronRight"
            size={20}
            onClick={() => {
              onNextMonth();
              onNextMonthCallback(currentMonth + 1, currentYear);
            }}
            dataTest="Calendar-Next-Month"
          />
        </div>
        <div className={styles._button_wrapper}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => {
              onToday();
              onTodayCallback();
              setSelectedDay(new Date());
            }}
            dataTest="Calendar-Today"
          >
            Today
          </Button>
        </div>
      </div>
      <div className={styles._body}>
        <div className={styles._days_header}>
          <Text size="s" color="softPeanut" htmlTag="span" align="center">
            M
          </Text>
          <Text size="s" color="softPeanut" htmlTag="span" align="center">
            T
          </Text>
          <Text size="s" color="softPeanut" htmlTag="span" align="center">
            W
          </Text>
          <Text size="s" color="softPeanut" htmlTag="span" align="center">
            T
          </Text>
          <Text size="s" color="softPeanut" htmlTag="span" align="center">
            F
          </Text>
          <Text size="s" color="softPeanut" htmlTag="span" align="center">
            S
          </Text>
          <Text size="s" color="softPeanut" htmlTag="span" align="center">
            S
          </Text>
        </div>
        <div className={styles._days_grid}>
          {daysToRender?.length > 0 ? (
            daysToRender?.map((day, index) => {
              const dateToRender = day?.dateValue;

              return (
                <Day
                  key={
                    day?.dayNumber > 0 ? new Date(dateToRender).toISOString() : `empty-day-${index}`
                  }
                  day={day}
                  selected={isSameDay(new Date(dateToRender), new Date(selectedDay))}
                  onClick={() => {
                    setSelectedDay(dateToRender);
                    onSelectedDay(dateToRender);
                  }}
                />
              );
            })
          ) : (
            <CalendarSkeleton weeks={days ? Math.round(days?.length / 7) : 5} />
          )}
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  onNextMonth: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onSelectedDay: PropTypes.func,
};

Calendar.defaultProps = {
  onNextMonth: () => {},
  onPrevMonth: () => {},
  onSelectedDay: () => {},
};

export default Calendar;
