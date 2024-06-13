import React, { createContext, JSX, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  ColorType,
  CompoundIcon,
  Icon,
  IconButton,
  IconType,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useCalendar } from '@bloobirds-it/hooks';
import {
  Bobject,
  EventsPerDay,
  ExtensionBobject,
  Invitee,
  LiveEvent,
  MainBobjectTypes,
  SlotsData,
  TDateISODate,
} from '@bloobirds-it/types';
import { getUserTimeZone, isToday } from '@bloobirds-it/utils';
import clsx from 'clsx';
import spacetime from 'spacetime';

import styles from './calendar.module.css';
import { CalendarBanner } from './calendarBanner/calendarBanner';
import { CalendarNotConnected } from './calendarNotConnected/calendarNotConnected';
import { CalendarColumn } from './components/calendarColumn';
import { SlotsForm } from './slotsForm/slotsForm';
import { useEventPlaceholder } from './useEventPlaceholder';
import { createArrayOfLength } from './utils/calendar.utils';

const randomColors: ColorType[] = [
  'bloobirds',
  'softPeanut',
  'verySoftTangerine',
  'softTangerine',
  'verySoftTomato',
  'softTomato',
  'softBanana',
  'verySoftBanana',
  'verySoftMelon',
  'softMelon',
  'lightBloobirds',
  'verySoftBloobirds',
  'verySoftPurple',
  'lightPurple',
  'verySoftPeanut',
  'lightPeanut',
  'lighterGray',
  'gray',
];

interface CalendarContextInterface extends ReturnType<typeof useEventPlaceholder> {
  slotsData: SlotsData;
  setSlotsData: (value: SlotsData | ((prev: SlotsData) => SlotsData)) => void;
  calendarSlotsBannerVisible: BannerStates;
  setCalendarSlotsBannerVisible: (state: BannerStates) => void;
  slotDuration: number;
  setSlotDuration: (value: number) => void;
  clickedOnPastDate: () => void;
  hideSlotsBanner: () => void;
  contextItems: CalendarProps['contextItems'];
  handleSlots?: (
    slots: any,
    handleClick: (liveEvents: { [day: string]: LiveEvent[] }) => void,
  ) => void;
}

function getStatusAvatar(
  status: 'yes' | 'no' | 'noreply',
): { bagdeColor: ColorType; icon: IconType; iconColor: ColorType } {
  switch (status) {
    case 'yes':
      return { bagdeColor: 'lightestCall', icon: 'check', iconColor: 'extraCall' };
    case 'no':
      return { bagdeColor: 'lightestMeeting', icon: 'cross', iconColor: 'extraMeeting' };
    default:
      return { bagdeColor: 'verySoftPeanut', icon: 'arrowRight', iconColor: 'softPeanut' };
  }
}

function getColorFromType(
  type: 'Lead' | 'AE' | 'Organizer' | 'Company' | 'User' | undefined,
): ColorType | 'random' {
  switch (type) {
    case 'Organizer':
      return 'purple';
    case 'AE':
    case 'User':
      return 'grape';
    case 'Company':
      return 'extraMeeting';
    case 'Lead':
      return 'extraMeeting';
    default:
      return 'random';
  }
}

/**
 * This component is duplicated in activity feed component in components folder
 * so we should copy for now from one place to another
 * @param invitee
 * @param handleRemoveInvitee
 * @param readOnly
 * @param width
 * @param shouldShowStatus
 * @constructor
 */
export function InviteeCard({
  invitee,
  handleRemoveInvitee,
  readOnly,
  width,
  shouldShowStatus,
}: {
  invitee: Invitee;
  handleRemoveInvitee?: (email: string) => void;
  readOnly?: boolean;
  width?: string;
  shouldShowStatus: boolean;
}) {
  const [randomColor] = useState<ColorType>(
    randomColors[Math.floor(Math.random() * (randomColors.length + 1))],
  );

  const calculatedColor = getColorFromType(invitee?.type);
  const colorToUse = calculatedColor === 'random' ? randomColor : calculatedColor;
  const statusAvatar = getStatusAvatar(invitee?.status);
  const { t } = useTranslation();

  const parentRef = useRef();

  return (
    <>
      {(invitee?.email || invitee?.name) && (
        <>
          <div className={styles._invitee_card} style={{ width: width || null }}>
            <CompoundIcon
              parent={
                <Avatar size="tiny" color={colorToUse} ref={parentRef}>
                  {invitee?.email?.slice(0, 2).toUpperCase() ||
                    invitee?.name?.slice(0, 2).toUpperCase()}
                </Avatar>
              }
              parentRef={parentRef}
            >
              {shouldShowStatus && (
                <Avatar size="supertiny" color={statusAvatar.bagdeColor}>
                  <Icon name={statusAvatar.icon} color={statusAvatar.iconColor} size={10} />
                </Avatar>
              )}
            </CompoundIcon>
            <div className={styles._invitee_info}>
              {invitee?.name && <Text size="s">{invitee?.name}</Text>}
              {invitee?.type === 'Lead' && !invitee?.email && (
                <Text size="xs" color="tomato" decoration="underscore">
                  {t('calendar.inviteeCard.noEmail')}
                </Text>
              )}
              <Text
                size="xs"
                color={invitee?.name ? 'softPeanut' : 'peanut'}
                decoration="underscore"
              >
                {invitee?.email}
              </Text>
            </div>
            {invitee?.type && (
              <Label size="small" uppercase={false}>
                {invitee?.type}
              </Label>
            )}
            {!readOnly && (
              <IconButton
                name="cross"
                size={24}
                color="softPeanut"
                onClick={() => handleRemoveInvitee(invitee?.email)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

const weekArray = createArrayOfLength(7);
const dayArray = createArrayOfLength(24);

function generateWeek(day: TDateISODate): TDateISODate[] {
  const firstDay = spacetime(day).startOf('week');
  return weekArray.map(i => firstDay.add(i, 'day').format('iso-date') as TDateISODate);
}

const CalendarContext = createContext(null);

export enum BannerStates {
  INACTIVE,
  ACTIVE,
  PAST,
  EDIT,
}

const CalendarProvider = ({ slotsData, setSlotsData, contextItems, handleSlots, children }) => {
  const [calendarSlotsBannerVisible, setCalendarSlotsBannerVisible] = useState<BannerStates>(
    BannerStates.ACTIVE,
  );
  const eventManagement = useEventPlaceholder(slotsData, setCalendarSlotsBannerVisible, value =>
    setSlotsData((prevSlotsData: SlotsData) => {
      return {
        ...prevSlotsData,
        ...(value ? { calendarSlots: value } : {}),
      };
    }),
  );
  const prevBannerState = useRef(BannerStates.ACTIVE);

  function clickedOnPastDate() {
    setCalendarSlotsBannerVisible(BannerStates.PAST);
    setTimeout(() => setCalendarSlotsBannerVisible(prevBannerState.current), 3000);
  }

  return (
    <CalendarContext.Provider
      value={{
        clickedOnPastDate,
        handleSlots,
        calendarSlotsBannerVisible,
        hideSlotsBanner: () => {
          prevBannerState.current = BannerStates.INACTIVE;
          setCalendarSlotsBannerVisible(BannerStates.INACTIVE);
        },
        ...eventManagement,
        slotsData,
        setSlotsData,
        contextItems,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext<CalendarContextInterface>(CalendarContext);

  if (!context) {
    throw new Error(`useCalendarContext must be used within a CalendarProvider`);
  }
  return context;
};

interface CalendarProps {
  day: TDateISODate;
  mode: 'day' | 'week' | 'month';
  events: EventsPerDay;
  notConnected: boolean;
  contextItems: { [K in MainBobjectTypes]: Bobject<K> | ExtensionBobject };
  slotsData: SlotsData;
  setSlotsData: (value: SlotsData) => void;
  onCalendarReconnect: () => void;
  handleSlots?: (
    slots: any,
    callback: (liveEvents: { [day: string]: LiveEvent[] }) => void,
  ) => void;
  liveEvents?: { [day: string]: LiveEvent[] };
}

const withProvider = (Component: (props) => JSX.Element) => (props: CalendarProps) => {
  const { slotsData, setSlotsData, handleSlots, ...rest } = props;

  return (
    <CalendarProvider
      handleSlots={handleSlots}
      slotsData={slotsData}
      setSlotsData={setSlotsData}
      contextItems={props.contextItems}
    >
      <Component {...rest} />
    </CalendarProvider>
  );
};

const Calendar = ({
  day,
  mode = 'week',
  events,
  notConnected = false,
  onCalendarReconnect,
}: {
  day: TDateISODate;
  mode: 'week' | 'day';
  events: EventsPerDay;
  notConnected?: boolean;
  onCalendarReconnect?: () => void;
}) => {
  const { slotsData, calendarSlotsBannerVisible, hideSlotsBanner } = useCalendarContext();
  const hourMarkerRef = useRef(null);
  const days: TDateISODate[] = mode === 'week' ? generateWeek(day) : [day];
  const defaultUserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { setEventTypesSelected } = useCalendar();
  const { calendarSlotsVisible, selectedTimezone } = slotsData || {};
  const { t } = useTranslation();

  useEffect(() => {
    // @ts-ignore
    hourMarkerRef?.current?.scrollIntoView({ block: 'center' });
  }, [day]);

  useEffect(() => {
    if (notConnected) setEventTypesSelected('bloobirds');
  }, [notConnected]);

  return (
    <>
      {calendarSlotsVisible && (
        <CalendarBanner
          bannerState={calendarSlotsBannerVisible}
          hideSlotsBanner={hideSlotsBanner}
          t={t}
        />
      )}
      {notConnected ? (
        <CalendarNotConnected mode={mode} onCalendarReconnect={onCalendarReconnect} />
      ) : (
        <>
          {mode !== 'day' && (
            <div className={styles.calendar_column_headers}>
              {days.map(day => {
                const today = isToday(
                  spacetime(day).toNativeDate(),
                  selectedTimezone || getUserTimeZone(),
                );
                const nameClasses = clsx(styles.calendar_column_header_name, {
                  [styles.calendar_column_header_name_today]: today,
                });
                const dateClasses = clsx(styles.calendar_column_header_date, {
                  [styles.calendar_column_header_date_today]: today,
                });
                return (
                  <div className={styles.calendar_column_header} key={`header-${day}`}>
                    <span className={nameClasses}>{spacetime(day).format('day-short')}</span>
                    <span className={dateClasses}>{spacetime(day).format('date')}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles.calendar_container}>
            <div className={styles.calendar_timestrings_container}>
              <div className={styles.calendar_timestrings}>
                {dayArray.map(hour => (
                  <div className={styles.calendar_timestring_container} key={`timestring_${hour}`}>
                    <div className={styles.calendar_timestring}>
                      {hour.toString().padStart(2, '0')}:00{' '}
                      {defaultUserTimezone !== selectedTimezone && (
                        <Tooltip title={t('calendar.days.timezoneTooltip')} position="top">
                          <Text size="xxs" align="right">
                            (
                            {spacetime()
                              .goto(selectedTimezone)
                              .hour(hour)
                              .goto(defaultUserTimezone)
                              .hour()}
                            :00)
                          </Text>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.calendar_grid_container}>
              <div className={styles.calendar_grid}>
                <div className={styles.calendar_grid_tiles}>
                  {dayArray.map(h => (
                    <div className={styles.calendar_grid_tile} key={`tile_${h}`}></div>
                  ))}
                </div>
                <div className={styles.calendar_gridcell_container}>
                  {days.map(day => {
                    return (
                      <CalendarColumn
                        key={`column-${day}`}
                        mode={mode}
                        day={day}
                        events={events}
                        hourMarkerRef={hourMarkerRef}
                        selectedTimezone={selectedTimezone}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {calendarSlotsVisible && <SlotsForm />}
    </>
  );
};

export default withProvider(Calendar);
