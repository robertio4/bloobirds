import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { getUserTimeZone, parseUTCDateToLocal } from '@bloobirds-it/utils';
import classnames from 'clsx';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';

import { TIME_WINDOW } from '../../../cadenceTable.type';
import styles from '../../timeTable.module.css';

export const ColumnHeader = ({
  date,
  timeWindow,
  isPausedDay,
  setTimeWindowWithDate,
}: {
  date: string;
  timeWindow: TIME_WINDOW;
  isPausedDay: boolean;
  setTimeWindowWithDate: (timeWindow: TIME_WINDOW, date: string) => void;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceTable.timetable.column',
  });
  const isDailyWindow = timeWindow === TIME_WINDOW.DAILY;
  const userTimezone = getUserTimeZone();
  const {
    i18n: { language },
  } = useTranslation();

  const handleClick = () => {
    const newTimeWindow =
      timeWindow === TIME_WINDOW.MONTHLY ? TIME_WINDOW.WEEKLY : TIME_WINDOW.DAILY;
    setTimeWindowWithDate(newTimeWindow, date);
  };

  const isCurrentDate = useMemo(() => {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return isToday(parseUTCDateToLocal(date));
      case TIME_WINDOW.WEEKLY:
        return isThisWeek(parseUTCDateToLocal(date), { weekStartsOn: 1 });
      case TIME_WINDOW.MONTHLY:
        return isThisMonth(parseUTCDateToLocal(date));
    }
  }, [timeWindow, date]);

  const title = useMemo(() => {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return isCurrentDate
          ? t('today')
          : getI18nSpacetimeLng(language, parseUTCDateToLocal(date, userTimezone)).format(
              '{month-short} {date-pad}',
            );
      case TIME_WINDOW.WEEKLY: {
        const startOfWeek = new Date(date);
        const endOfWeek = new Date().setDate(startOfWeek.getDate() + 6);
        return (
          getI18nSpacetimeLng(language, startOfWeek).format('LLL dd') +
          ' - ' +
          getI18nSpacetimeLng(language, endOfWeek).format('dd')
        );
      }
      case TIME_WINDOW.MONTHLY:
        return getI18nSpacetimeLng(language, new Date(date)).format('MMM yyyy');
    }
  }, [timeWindow, date]);

  const tooltipText = useMemo(() => {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return getI18nSpacetimeLng(language, parseUTCDateToLocal(date, userTimezone)).format(
          '{month-short} {date-pad} {year}',
        );
      case TIME_WINDOW.WEEKLY:
        return title + ' ' + getI18nSpacetimeLng(language, new Date(date)).format('yyyy');
      case TIME_WINDOW.MONTHLY:
        return title;
    }
  }, [timeWindow, date]);

  return (
    <div
      className={classnames(styles.row, {
        [styles.nonClickable]: isDailyWindow,
        [styles.clickable]: !isDailyWindow,
      })}
      onClick={() => (isDailyWindow ? undefined : handleClick())}
    >
      <Tooltip position="top" title={tooltipText}>
        <Text
          size="xs"
          weight={isCurrentDate ? 'bold' : 'regular'}
          color={isCurrentDate ? 'bloobirds' : 'softPeanut'}
        >
          {title}
        </Text>
        {isPausedDay && <Icon name="pause" color="verySoftBanana" size={20} />}
      </Tooltip>
    </div>
  );
};
