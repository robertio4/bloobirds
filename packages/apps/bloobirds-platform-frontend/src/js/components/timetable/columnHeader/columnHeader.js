import React from 'react';
import {
  format,
  isEqual,
  isSameWeek,
  isThisMonth as isThisMonthFn,
  isThisWeek as isThisWeekFn,
  isToday as isTodayFn,
  startOfDay,
} from 'date-fns';
import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { isDaily, isMonthly, isWeekly } from '../timetable.utils';
import { formatDate, getUserTimeZone, parseUTCDateToLocal } from '@bloobirds-it/utils';
import { useTimetableFilters } from '../../../hooks/useTimetable';
import { TIME_WINDOW } from '../timetable.constants';
import styles from './columnHeader.module.css';
import { memoize } from 'lodash';

const getHeaderTooltipText = ({ timeWindow, date, startCadenceDate, endCadenceDate }) => {
  if (isDaily(timeWindow)) {
    const parsedDate = parseUTCDateToLocal(date);
    const isToday = isTodayFn(parsedDate);
    return `${formatDate(parsedDate, 'LLL d yyyy')}${isToday ? ' (Today)' : ''}`;
  }
  if (isWeekly(timeWindow)) {
    const startDateParsed = parseUTCDateToLocal(date?.start);
    const endDateParsed = parseUTCDateToLocal(date?.end);
    const currentWeek = isThisWeekFn(startDateParsed, { weekStartsOn: 1 }) ? ' (Current Week)' : '';
    const cadenceStart = isSameWeek(startDateParsed, startCadenceDate, { weekStartsOn: 1 })
      ? ' (Cadence Starts)'
      : '';
    const cadenceEnd = isSameWeek(startDateParsed, endCadenceDate, { weekStartsOn: 1 })
      ? ' (Cadence Ends)'
      : '';

    return `${formatDate(startDateParsed, 'LLL dd')} - ${formatDate(
      endDateParsed,
      'dd yyyy',
    )}${currentWeek}${cadenceStart}${cadenceEnd}`;
  }

  if (isMonthly(timeWindow)) {
    const startDateParsed = new Date(date?.start);
    const currentMonth = isThisMonthFn(startDateParsed) ? ' (Current Month)' : '';
    const cadenceStart = isSameWeek(startDateParsed, startCadenceDate, { weekStartsOn: 1 })
      ? ' (Cadence Starts)'
      : '';
    const cadenceEnd = isSameWeek(startDateParsed, endCadenceDate, { weekStartsOn: 1 })
      ? ' (Cadence Ends)'
      : '';

    return `${formatDate(startDateParsed, 'LLL yyyy')}${currentMonth}${cadenceStart}${cadenceEnd}`;
  }

  return '';
};

const memoizedIsThisWeek = memoize(isThisWeekFn);
const memoizedIsThisMonth = memoize(isThisMonthFn);
const memoizedIsToday = memoize(date => isEqual(startOfDay(date), startOfDay(new Date())));
const memoizedParseUTCDateToLocal = memoize(parseUTCDateToLocal);

const ColumnHeader = ({ date, timeWindow, isPausedDay, startCadenceDate, endCadenceDate }) => {
  const { setTimeWindowFilter } = useTimetableFilters();
  const isDailyMode = isDaily(timeWindow);
  const dateParsed = isDailyMode && memoizedParseUTCDateToLocal(date);
  const weekFormatStartDate = 'LLL dd';
  const weekFormatEndDate = 'dd';
  const monthFormatDate = 'LLL yyyy';
  const startDateParsed = !isDailyMode && memoizedParseUTCDateToLocal(date?.start);
  const endDateParsed = !isDailyMode && memoizedParseUTCDateToLocal(date?.end);
  const isToday = isDailyMode && memoizedIsToday(dateParsed);
  const isThisWeek = !isDailyMode && memoizedIsThisWeek(startDateParsed, { weekStartsOn: 1 });
  const isThisMonth = !isDailyMode && memoizedIsThisMonth(startDateParsed);
  const isSelectedRange = isWeekly(timeWindow) ? isThisWeek : isThisMonth;

  const tooltipConfig = {
    date,
    endCadenceDate,
    startCadenceDate,
    timeWindow,
  };

  return (
    <>
      {isDailyMode && (
        <div className={styles._row}>
          <Tooltip position="top" title={() => getHeaderTooltipText(tooltipConfig)}>
            <Text
              size="xs"
              weight={isToday ? 'bold' : 'regular'}
              color={isToday ? 'bloobirds' : 'softPeanut'}
            >
              {isToday ? 'Today' : format(dateParsed, 'LLL d', { timezone: getUserTimeZone() })}
            </Text>
          </Tooltip>
        </div>
      )}
      {!isDailyMode && (
        <div
          className={styles._row}
          onClick={() => {
            const newTimewindow =
              timeWindow === TIME_WINDOW.MONTHLY ? TIME_WINDOW.WEEKLY : TIME_WINDOW.DAILY;
            setTimeWindowFilter(newTimewindow, date?.start || date);
          }}
        >
          <Tooltip position="top" title={() => getHeaderTooltipText(tooltipConfig)}>
            <Text
              size="xs"
              weight={isSelectedRange ? 'bold' : 'regular'}
              color={isSelectedRange ? 'bloobirds' : 'softPeanut'}
            >
              {isWeekly(timeWindow) && date?.start
                ? `${formatDate(startDateParsed, weekFormatStartDate)} - ${formatDate(
                    endDateParsed,
                    weekFormatEndDate,
                  )}`
                : `${formatDate(startDateParsed, monthFormatDate)}`}
            </Text>
            {isPausedDay && <Icon name="pause" color="verySoftBanana" size={20} />}
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default ColumnHeader;
