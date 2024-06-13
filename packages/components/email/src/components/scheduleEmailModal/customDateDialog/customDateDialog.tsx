import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  DatePickerCalendar,
  DatePickerContainer,
  DatePickerDay,
  DatePickerFooter,
  DatePickerGrid,
  DatePickerGridItem,
  DatePickerHeader,
  getCalendarDays,
  getCalendarMonths,
  getCalendarYears,
  getUpdatedView,
  Modal,
  TimePicker,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import {
  formatDate,
  getUserTimeZone,
  getValueFromLogicRole,
  isBeforeToday,
} from '@bloobirds-it/utils';
import { isSameDay, isSameMonth, isSameYear } from 'date-fns';
import spacetime from 'spacetime';

import styles from './customDateDialog.module.css';
import { getI18nSpacetimeLng, useGetI18nSpacetime } from "@bloobirds-it/internationalization";

interface CustomDateDialogProps {
  bobject?: Bobject<BobjectTypes.Task>;
  onSubmit: (value: Date) => void | Promise<void>;
  onCancel: () => void;
  showDateTime?: boolean;
  customButtonText?: string;
  customButtonVariant?: 'clear' | 'primary' | 'secondary';
}

type Format = 'day' | 'month' | 'year';

const CustomDateDialog = ({
  bobject,
  onSubmit,
  onCancel,
  showDateTime = true,
  customButtonText,
  customButtonVariant,
}: CustomDateDialogProps) => {
  const getFormattedHour = () => {
    const dateTimeInfo = !Array.isArray(bobject)
      ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME))
      : null;
    return dateTimeInfo ? dateTimeInfo.getHours() + ':' + dateTimeInfo.getMinutes() + '' : '8:00';
  };

  const taskTime = getFormattedHour();
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.scheduleEmailModal',
  });

  const taskTimePresentDate = spacetime().startOf('day').time(taskTime).goto('utc').toNativeDate();

  const [format, setFormat] = useState<Format>('day');
  const [value, setValue] = useState(taskTimePresentDate);
  const [view, setView] = useState(value);

  return (
    <Modal className={styles.modal} open onClose={onCancel} width={492}>
      <DatePickerContainer>
        <DatePickerHeader
          onNext={() => setView(getUpdatedView(view, format, 'forwards'))}
          onBack={() => setView(getUpdatedView(view, format, 'backwards'))}
        >
          <button
            aria-label="calendar month"
            onClick={() => setFormat('month')}
            className={styles.month}
          >
            {getI18nSpacetimeLng(i18n.language, view).format('{month-short}')}
          </button>
          <button
            aria-label="calendar year"
            onClick={() => setFormat('year')}
            className={styles.year}
          >
            {getI18nSpacetimeLng(i18n.language, view).format('{year}')}
          </button>
          {showDateTime && <TimePicker value={value} onChange={setValue} />}
        </DatePickerHeader>
        {format === 'year' && (
          <DatePickerGrid>
            {getCalendarYears(view).map(year => (
              <DatePickerGridItem
                key={year.toISOString()}
                active={isSameYear(value, year)}
                onClick={() => {
                  setFormat('month');
                  setView(year);
                }}
              >
                {getI18nSpacetimeLng(i18n.language, year).format('{year}')}
              </DatePickerGridItem>
            ))}
          </DatePickerGrid>
        )}
        {format === 'month' && (
          <DatePickerGrid>
            {getCalendarMonths(view).map(month => (
              <DatePickerGridItem
                key={month.toISOString()}
                active={isSameMonth(value, month)}
                onClick={() => {
                  setFormat('day');
                  setView(month);
                }}
              >
                {getI18nSpacetimeLng(i18n.language, month).format('{month-short}')}
              </DatePickerGridItem>
            ))}
          </DatePickerGrid>
        )}
        {format === 'day' && (
          <DatePickerCalendar>
            {getCalendarDays(view).map((day: Date) => (
              <DatePickerDay
                key={day.toISOString()}
                value={day}
                outside={!isSameMonth(day, view)}
                selected={isSameDay(day, value)}
                disabled={isBeforeToday(day, getUserTimeZone())}
                onClick={() => {
                  const newValue = new Date(day);
                  newValue.setHours(value.getHours());
                  newValue.setMinutes(value.getMinutes());
                  setValue(newValue);
                }}
              />
            ))}
          </DatePickerCalendar>
        )}
      </DatePickerContainer>
      <DatePickerFooter>
        <Button onClick={onCancel} color="tomato" variant="clear" size="small">
          {t('cancel')}
        </Button>
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => {
              const today = new Date();
              setFormat('day');
              setView(today);
              setValue(today);
            }}
            variant="clear"
            size="small"
          >
            {t('today')}
          </Button>
          <Tooltip title={isBeforeToday(value, getUserTimeZone()) && t('tooltip')} position="top">
            <Button
              onClick={() => {
                onSubmit(value);
              }}
              variant={customButtonVariant || 'clear'}
              size="small"
              dataTest="DateTimePicker-Ok"
              disabled={isBeforeToday(value, getUserTimeZone())}
            >
              {customButtonText || t('send')}
            </Button>
          </Tooltip>
        </div>
      </DatePickerFooter>
    </Modal>
  );
};

export default CustomDateDialog;
