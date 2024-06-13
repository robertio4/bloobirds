import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  DatePicker,
  Icon,
  IconButton,
  Spinner,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { ChangeTimezoneModal } from '@bloobirds-it/misc-modals';
// @ts-ignore
import { Connections, MIXPANEL_EVENTS, TDateISODate, Settings } from '@bloobirds-it/types';
import { getUserTimeZone, isToday } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

import { BloobirdsCalendarsSelector } from '../components/bloobirdsCalendarsSelector/bloobirdsCalendarsSelector';
import { Calendar } from '../components/calendar/calendar';
import { CalendarNotConnected } from '../components/calendarNotConnected/calendarNotConnected';
import { CalendarsSelector } from '../components/calendarsSelector/calendarsSelector';
import { useCalendar } from '../hooks/useCalendar';
import DayCalendarContext from './context';
import styles from './dayCalendar.module.css';

interface DayCalendarProps {
  id: string;
  accountId: string;
  userId: string;
  settings?: Settings;
  connections: Connections;
  mutateConnections: () => void;
}

const DayCalendarChild = () => {
  const {
    date,
    setDate,
    eventsPerDay,
    eventsTypeSelected,
    setEventTypesSelected,
    mutateCalendars,
    selectedTimezone,
    setSelectedTimezone,
    resetDate,
    loading,
  } = useCalendar();
  const { connections, mutateConnections } = useContext(DayCalendarContext);
  const [changeTimezoneModalVisible, setChangeTimezoneModalVisible] = useState<boolean>(false);
  const { visible, setVisible, ref } = useVisible(false);
  const isoDate = spacetime(date).format('iso-short') as TDateISODate;
  const today = isToday(spacetime(date).toNativeDate(), selectedTimezone || getUserTimeZone());
  const notConnected = eventsTypeSelected === 'nylas' && connections?.list?.length === 0;
  const { t } = useTranslation('translation', { keyPrefix: 'dayCalendar' });

  return (
    <div className={styles._container}>
      <div className={styles._filters_wrapper}>
        <div className={styles._main_filters_container}>
          <div className={styles._left_main_filters}>
            <Button
              onClick={() => setDate(date => spacetime(date).subtract(1, 'day').toNativeDate())}
              variant="clear"
              size="small"
              className={styles._day_button}
            >
              <Icon name="chevronLeft" size={15} />
            </Button>
            <Button
              onClick={() => setDate(date => spacetime(date).add(1, 'day').toNativeDate())}
              variant="clear"
              size="small"
              className={styles._day_button}
            >
              <Icon name="chevronRight" size={15} />
            </Button>

            <DatePicker
              withTimePicker={false}
              value={date}
              openDefaultValue={date}
              onChange={date => setDate(date)}
              dropDownRef={ref}
              visible={visible}
              setVisible={setVisible}
              dropdownProps={{
                anchor: (
                  <span onClick={() => setVisible(true)} className={styles._date_button}>
                    <Text size="m" color={today ? 'bloobirds' : 'peanut'} weight="regular">
                      {(today ? t('today') : '') +
                        useGetI18nSpacetime(date).format('{month-short} {date-ordinal}, {day}')}
                    </Text>
                  </span>
                ),
              }}
            />
          </div>
          <div>
            <Button
              variant="secondary"
              size="small"
              uppercase={false}
              className={styles._today_button}
              onClick={() => resetDate()}
            >
              {t('today')}
            </Button>
            <div
              className={styles._event_type}
              style={{
                backgroundColor:
                  eventsTypeSelected === 'bloobirds' ? 'var(--bloobirds)' : 'var(--white)',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px',
              }}
              onClick={() => setEventTypesSelected('bloobirds')}
            >
              <Icon
                name="bloobirds"
                color={eventsTypeSelected === 'nylas' ? 'bloobirds' : 'white'}
                size={16}
              />
            </div>
            <div
              className={styles._event_type}
              style={{
                backgroundColor:
                  eventsTypeSelected === 'nylas' ? 'var(--bloobirds)' : 'var(--white)',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
              }}
              onClick={() => setEventTypesSelected('nylas')}
            >
              <Icon
                name="calendar"
                size={16}
                color={eventsTypeSelected === 'nylas' ? 'white' : 'bloobirds'}
              />
            </div>
          </div>
        </div>
        <div className={styles._secondary_filters_container}>
          <div className={styles._secondary_filters_right}>
            <IconButton
              name="timezonesAlter"
              size={18}
              color="bloobirds"
              onClick={() => setChangeTimezoneModalVisible(true)}
            />
            <div className={styles._calendar_select}>
              {eventsTypeSelected === 'nylas' ? (
                <CalendarsSelector
                  connections={connections}
                  disabled={eventsTypeSelected === 'nylas' && connections?.list?.length === 0}
                  anchor={CalendarSelectorAnchor}
                />
              ) : (
                <BloobirdsCalendarsSelector anchor={CalendarSelectorAnchor} />
              )}
            </div>
            {loading && <Spinner name="loadingCircle" size={16} />}
          </div>
          <Button
            size="small"
            color="lightestPurple"
            variant="primary"
            iconLeft="suggestions"
            uppercase={false}
            className={styles._tip_button}
            onClick={() => {
              mixpanel.track(MIXPANEL_EVENTS.CALENDAR_TIPS_SEE_CLICKED);
              window.open(
                'https://support.bloobirds.com/hc/en-us/articles/8908326645020-Advantages-of-creating-meetings-on-Bloobirds-vs-Google-Calendar-or-Outlook',
                '_blank',
              );
            }}
          >
            {t('calendarTips')}
          </Button>
        </div>
      </div>
      <div className={styles._calendar_wrapper}>
        {notConnected ? (
          <CalendarNotConnected
            mode="day"
            onCalendarReconnect={() => {
              if (mutateConnections) {
                mutateConnections().then(() => {
                  mutateCalendars();
                });
              }
            }}
          />
        ) : (
          <Calendar
            day={isoDate as TDateISODate}
            mode="day"
            events={eventsPerDay}
            notConnected={notConnected}
            onCalendarReconnect={() => {
              if (mutateConnections) {
                mutateConnections().then(() => {
                  mutateCalendars();
                });
              }
            }}
            selectedTimezone={selectedTimezone}
          />
        )}
      </div>

      {changeTimezoneModalVisible && (
        <ChangeTimezoneModal
          onChange={value => {
            setSelectedTimezone(value);
            setChangeTimezoneModalVisible(false);
          }}
          onClose={() => setChangeTimezoneModalVisible(false)}
          defaultTimezone={selectedTimezone}
        />
      )}
    </div>
  );
};

const CalendarSelectorAnchor = (visible, setVisible) => {
  const { t } = useTranslation('translation', { keyPrefix: 'dayCalendar' });

  return (
    <span className={styles._selector_anchor} onClick={() => setVisible(!visible)}>
      <Icon name="settings" size={16} color="bloobirds" />
      <Text size="xs">{t('calendars')}</Text>
    </span>
  );
};

export const DayCalendar = (props: DayCalendarProps) => {
  const initialContext = {
    id: props?.id,
    accountId: props?.accountId,
    userId: props?.userId,
    settings: props?.settings,
    connections: props?.connections,
    mutateConnections: props?.mutateConnections,
  };
  return (
    <DayCalendarContext.Provider value={initialContext}>
      <DayCalendarChild />
    </DayCalendarContext.Provider>
  );
};
