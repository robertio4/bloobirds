import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';

import {
  BloobirdsCalendarsSelector,
  Calendar,
  CalendarNotConnected,
  CalendarsSelector,
} from '@bloobirds-it/calendar';
import {
  Button,
  DatePicker,
  Icon,
  IconButton,
  Spinner,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useCalendar } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { ChangeTimezoneModal } from '@bloobirds-it/misc-modals';
import { ELEMENT_SLOTS_FORM } from '@bloobirds-it/rich-text-editor';
import { Connections, MIXPANEL_EVENTS, SlotsData, TDateISODate } from '@bloobirds-it/types';
import {
  getUserTimeZone,
  isToday,
  recoverScrollOfBox,
  removeScrollOfBox,
} from '@bloobirds-it/utils';
import { getPluginType, insertNodes, TEditor, removeNodes } from '@udecode/plate';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import { Node } from 'slate';
import spacetime from 'spacetime';
import { KeyedMutator } from 'swr';

import { useSmartEmailModal } from '../../../smartEmailModal';
import styles from './dayCalendar.module.css';

interface DayCalendarProps {
  id: string;
  accountId: string;
  userId: string;
  connections: Connections;
  mutateConnections: KeyedMutator<Connections>;
  hasCalendarSlotsEnabled: boolean;
  slotsData: SlotsData;
  setSlotsData: Dispatch<SetStateAction<SlotsData>>;
  bodyEditor?: TEditor;
  handleSlotClick?: () => void;
}

export const getSlotsNodePosition = (bodyEditor: TEditor) => {
  const nodesArray = Array.from(Node.elements(bodyEditor));
  //@ts-ignore
  const slotsNode = nodesArray.find(node => node[0]?.type === ELEMENT_SLOTS_FORM);
  return { slotsNode: slotsNode?.[0], slotsNodePath: slotsNode?.[1] };
};

export const DayCalendar = ({
  bodyEditor,
  connections,
  mutateConnections,
  hasCalendarSlotsEnabled,
  slotsData,
  setSlotsData,
  handleSlotClick,
}: DayCalendarProps) => {
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
  const [changeTimezoneModalVisible, setChangeTimezoneModalVisible] = useState<boolean>(false);
  const { visible, setVisible, ref } = useVisible(false);
  const isoDate = useGetI18nSpacetime(date, selectedTimezone || getUserTimeZone()).format(
    'iso-short',
  ) as TDateISODate;
  const today = isToday(spacetime(date).toNativeDate(), selectedTimezone || getUserTimeZone());
  const notConnected = eventsTypeSelected === 'nylas' && connections?.list?.length === 0;

  const { company, lead, opportunity } = useSmartEmailModal();
  const { t } = useTranslation('translation', { keyPrefix: 'dayCalendar' });
  const { t: datesT } = useTranslation('translation', { keyPrefix: 'dates' });
  function handleSlots(slots, onClickCallback) {
    const isDelete = !slots;

    const createRawHTMLBlock = (editor, html) => {
      const type = getPluginType(editor, ELEMENT_SLOTS_FORM);
      return {
        onClick: () => {
          handleSlotClick();
          onClickCallback(slots?.props?.liveEvents);
          mixpanel.track(MIXPANEL_EVENTS.EDIT_CALENDAR_SLOTS);
        },
        html,
        type,
        children: [{ text: '' }],
      };
    };

    if (bodyEditor) {
      const { slotsNodePath, slotsNode } = getSlotsNodePosition(bodyEditor);
      const isEditing = !!slotsNode;
      if (isDelete || isEditing) {
        removeNodes(bodyEditor, {
          at: { path: [...slotsNodePath, 0], offset: 0 },
        });
      }

      if (!isDelete) {
        insertNodes(
          bodyEditor,
          createRawHTMLBlock(bodyEditor, ReactDOMServer.renderToString(slots)),
          {
            at: isEditing ? { path: [slotsNodePath[0] - 1, 0], offset: 0 } : bodyEditor.selection,
          },
        );
      }
    }
    setSlotsData((prevSlotsData: SlotsData) => {
      return {
        ...prevSlotsData,
        calendarSlotsVisible: false,
      };
    });
    setDate(new Date());
  }

  useEffect(() => {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);

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
                        useGetI18nSpacetime(date).format(datesT('shortDayMonth'))}
                    </Text>
                  </span>
                ),
              }}
            />
          </div>
          <div>
            {!today && (
              <Button
                variant="secondary"
                size="small"
                uppercase={false}
                className={styles._today_button}
                onClick={() => resetDate()}
              >
                {t('today')}
              </Button>
            )}
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
            {hasCalendarSlotsEnabled && (
              <Button
                size="small"
                color="bloobirds"
                variant="secondary"
                iconLeft="meetingSlots"
                uppercase={false}
                className={clsx(styles._slots_button, {
                  [styles._slots_button_active]: slotsData.calendarSlotsVisible,
                })}
                onClick={() => {
                  setSlotsData((prevSlotsData: SlotsData) => ({
                    ...prevSlotsData,
                    calendarSlotsVisible: true,
                  }));
                }}
              >
                {t('shareSlots')}
              </Button>
            )}
            {loading && (
              <div className={styles.loaderWrapper}>
                <Spinner name="loadingCircle" size={16} />
              </div>
            )}
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
            contextItems={{ Company: company, Lead: lead, Opportunity: opportunity }}
            day={isoDate as TDateISODate}
            mode="day"
            events={eventsPerDay}
            notConnected={notConnected}
            slotsData={slotsData}
            setSlotsData={setSlotsData}
            handleSlots={handleSlots}
            onCalendarReconnect={() => {
              if (mutateConnections) {
                mutateConnections().then(() => {
                  mutateCalendars();
                });
              }
            }}
          />
        )}
      </div>
      {changeTimezoneModalVisible && (
        <ChangeTimezoneModal
          onChange={value => {
            setSelectedTimezone(value);
            setSlotsData(prevSlotsData => ({ ...prevSlotsData, selectedTimezone: value }));
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
