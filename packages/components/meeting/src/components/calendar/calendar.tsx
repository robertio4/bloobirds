import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  ColorType,
  CompoundIcon,
  Dropdown,
  Icon,
  IconButton,
  IconType,
  Label,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { TDateISO, TDateISODate } from '@bloobirds-it/types';
import { getUserTimeZone, isToday, toTitleCase } from '@bloobirds-it/utils';
import clsx from 'clsx';
import spacetime, { Spacetime } from 'spacetime';

import { useCalendar } from '../../hooks/useCalendar';
import { useEventPlaceholder, useMouseEvents } from '../../hooks/useEventPlaceholder';
import { CalendarNotConnected } from '../calendarNotConnected/calendarNotConnected';
import styles from './calendar.module.css';
import { useMouseDelta } from './useMouseDelta';

export type EventsType = 'nylas' | 'bloobirds' | 'placeholder';

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

export interface Invitee {
  email?: string;
  name?: string | null;
  type?: 'Lead' | 'AE' | 'Organizer' | 'Company' | 'User' | undefined;
  comment?: string;
  status?: 'yes' | 'no' | 'noreply';
  leadId?: string;
}

export type Event = {
  duration: number;
  collisions: number;
  startTime: TDateISO;
  endTime: TDateISO;
  startTimeTimestamp: number;
  endTimeTimestamp: number;
  id: string;
  title: string;
  collisionNumber: number;
  day: TDateISODate;
  type: EventsType;
  participants: Invitee[];
  calendarId: string;
  backgroundColor?: ColorType;
  barColor?: ColorType;
  owner?: string;
};

function getPxPaddingSinceMidnight(date?: Spacetime, selectedTimezone?: string) {
  if (!selectedTimezone) {
    const dateToUse = spacetime(date || new Date());
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  } else {
    const dateToUse = spacetime(date || new Date(), selectedTimezone);
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  }
}

function getTimeFromOffset(offset: number, day: TDateISODate): TDateISO {
  const correctedOffset = Math.round(offset / 10) * 10;
  return spacetime(day)
    .add(correctedOffset * (60 / 40), 'minute')
    .format('iso-utc') as TDateISO;
}

function getDurationFromOffset(offset: number) {
  const correctedOffset = Math.max(Math.round(Math.abs(offset) / 10) * 10, 10) * (60 / 40);
  return offset > 0 ? correctedOffset : -correctedOffset;
}

export type EventsPerDay = {
  [key: string]: Event[];
};

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
  const { t } = useTranslation('translation', { keyPrefix: 'meetingModal.inviteeCard' });
  const [randomColor] = useState<ColorType>(
    randomColors[Math.floor(Math.random() * (randomColors.length + 1))],
  );
  function getColorFromType(
    type: 'Lead' | 'AE' | 'Organizer' | 'Company' | 'User' | 'Coworker' | undefined,
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
      case 'Coworker':
        return 'softPeanut';
      default:
        return 'random';
    }
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

  const calculatedColor = getColorFromType(invitee?.type);
  const colorToUse = calculatedColor === 'random' ? randomColor : calculatedColor;
  const statusAvatar = getStatusAvatar(invitee?.status);

  const parentRef = useRef();

  return (
    <>
      {(invitee?.email || invitee?.name) && (
        <>
          {/* @ts-ignore*/}
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
                  {t('leadNoEmail')}
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
                {t(`${invitee?.type?.toLowerCase()}`)}
              </Label>
            )}
            {!readOnly && (
              <IconButton
                name="cross"
                size={24}
                color="softPeanut"
                // @ts-ignore
                onClick={() => handleRemoveInvitee(invitee?.email)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

const weekArray = [0, 1, 2, 3, 4, 5, 6];
const dayArray = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
];

const CalendarEvent = React.memo(
  ({ event, selectedTimezone }: { event: Event; selectedTimezone: string }) => {
    const { ref, visible, setVisible } = useVisible();
    const startDatetimeSpaceTime = spacetime(event.startTime).goto(
      selectedTimezone || getUserTimeZone(),
    );
    const calculatePosition = getPxPaddingSinceMidnight(startDatetimeSpaceTime);
    const height = event.duration * (40 / 60) - 1;
    const width =
      event.collisions > 0
        ? `calc(${95.0 / (event.collisions + 1) + '%'} + ${event.collisions * 8}px)`
        : '95%';
    const topPosition = calculatePosition - height / 2 + 'px';
    const left = `calc(${(event.collisionNumber / (event.collisions + 1)) * 100 + '%'} - ${
      event.collisionNumber > 0 ? event.collisionNumber * 8 : 0
    }px)`;

    const endTime = spacetime(event.endTime).goto(selectedTimezone || getUserTimeZone());

    const cellClassName = clsx(styles.calendar_cell, {
      [styles.calendar_cell_small]: height < 29,
      [styles.calendar_cell_45]: height >= 29 && height < 39,
      [styles.calendar_cell_placeholder]: event.type === 'placeholder',
    });

    const participantsWithOrganizer: Invitee[] = event?.participants?.map(participant => {
      const ownerEmail = event?.owner?.replaceAll(/[<>]/gi, '')?.trim();
      const isOwner = participant?.email === ownerEmail;
      return isOwner ? { ...participant, type: 'Organizer' } : participant;
    });
    //@ts-ignore
    const orderedParticipants = participantsWithOrganizer?.reduce((acc, invitee) => {
      if (invitee?.type === 'Organizer') {
        return [invitee, ...acc];
      }
      return [...acc, invitee];
    }, []);

    //@ts-ignore
    const getColors = () => {
      if (event?.type === 'bloobirds') {
        return {
          backgroundColor: 'verySoftTomato',
          barColor: 'tomato',
        };
      } else if (event?.type === 'placeholder') {
        return {
          backgroundColor: 'white',
          barColor: 'bloobirds',
        };
      } else if (event?.type === 'nylas') {
        return {
          backgroundColor: event?.backgroundColor || 'verySoftBloobirds',
          barColor: event?.barColor || 'bloobirds',
        };
      }
    };

    const zIndex = event?.type === 'placeholder' ? 10 : event.collisionNumber;

    return (
      <Dropdown
        ref={ref}
        width={448}
        position="left"
        fallbackPositions={['left']}
        arrow={false}
        customStyles={{
          top: topPosition,
          right: '10px',
        }}
        visible={visible}
        anchor={
          <div
            className={cellClassName}
            style={{
              top: calculatePosition + 'px',
              height,
              width,
              left,
              backgroundColor: `var(--${getColors()?.backgroundColor})`,
              borderLeft: `2px solid var(--${getColors()?.barColor})`,
              zIndex: visible ? 10 : zIndex,
              // @ts-ignore
              boxShadow: visible
                ? '0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%)'
                : null,
              alignItems: 'start',
            }}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              return event.type !== 'placeholder' && setVisible(true);
            }}
          >
            <div className={styles.calendar_cell_title}>{event.title || 'Untitled meeting'}</div>
            <div className={styles.calendar_cell_time}>{startDatetimeSpaceTime.format('time')}</div>
          </div>
        }
      >
        <div
          className={styles.event_details_container}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className={styles.event_details_header}>
            <div className={styles.event_details_title_name}>
              <Icon
                name="calendar"
                color="tomato"
                size={32}
                className={styles.event_details_icon}
              />
              <Text className={styles.event_details_title_text}>
                {event?.title || 'Untitled meeting'}
              </Text>
            </div>
            <IconButton name="cross" size={16} onClick={() => setVisible(false)} />
          </div>
          <div className={styles.event_details_title}>
            <Text size="m">
              {toTitleCase(startDatetimeSpaceTime.dayName())}, {startDatetimeSpaceTime.date()}{' '}
              {toTitleCase(startDatetimeSpaceTime.monthName())} ·{' '}
              {startDatetimeSpaceTime.format('time')} - {endTime.format('time')}
            </Text>
          </div>
          <div className={styles.event_details_body}>
            <span className={styles.attendees_details}>
              <Icon name="people" color="softPeanut" />
              <Text size="s" className={styles.attendees_title}>
                {event.participants?.length} attendees
              </Text>
            </span>
            <div className={styles.attendees_list_container}>
              {/* @ts-ignore*/}
              {orderedParticipants?.map(participant => (
                <InviteeCard
                  invitee={participant}
                  key={participant?.email}
                  readOnly
                  shouldShowStatus
                />
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </Dropdown>
    );
  },
);

function generateWeek(day: TDateISODate): TDateISODate[] {
  const firstDay = spacetime(day).startOf('week');
  return weekArray.map(i => firstDay.add(i, 'day').format('iso-date') as TDateISODate);
}

function CalendarColumn({
  day,
  mode,
  events,
  hourMarkerRef,
  selectedTimezone,
}: {
  day: TDateISODate;
  mode: 'day' | 'week';
  events: EventsPerDay;
  hourMarkerRef: any;
  selectedTimezone?: string;
}) {
  const mouseDelta = useMouseDelta();
  const { setMeetingDuration } = useCalendar();
  const { eventPlaceholder, onCalendarPlaceholder } = useEventPlaceholder(setMeetingDuration);

  useEffect(() => {
    if (mouseDelta.delta !== 0) {
      let placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
      let placeholderDuration = getDurationFromOffset(mouseDelta.delta);
      if (placeholderDuration < 0) {
        placeholderDatetime = spacetime(placeholderDatetime)
          .subtract(-placeholderDuration, 'minute')
          .format('iso-utc') as TDateISO;
        placeholderDuration = -placeholderDuration;
      }
      if (onCalendarPlaceholder && typeof onCalendarPlaceholder === 'function') {
        onCalendarPlaceholder(placeholderDatetime, placeholderDuration);
      }
    }
  }, [mouseDelta?.delta, mouseDelta?.initialPosition]);

  const quickPlaceHolderCreation = () => {
    const placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
    const initialDateDifferent =
      spacetime(eventPlaceholder?.startTime).format('iso-utc') !==
      spacetime(placeholderDatetime).format('iso-utc');
    if (initialDateDifferent) {
      const placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
      onCalendarPlaceholder(placeholderDatetime, 60);
    }
  };
  // @ts-ignore
  const currentTimePadding = getPxPaddingSinceMidnight(null, selectedTimezone);
  const dayNumber = spacetime(day).format('day-number');
  const isWeekend = dayNumber === '6' || dayNumber === '';
  const columnClasses = clsx(styles.calendar_gridcell, {
    [styles.calendar_gridcell_weekend]: isWeekend,
  });

  return (
    <div
      key={`column-${day}`}
      className={columnClasses}
      ref={mouseDelta.ref}
      onClick={quickPlaceHolderCreation}
    >
      {isToday((day as unknown) as Date, selectedTimezone || getUserTimeZone()) && (
        <div
          className={styles.calendar_now_marker}
          ref={hourMarkerRef}
          style={{ top: currentTimePadding + 'px' }}
        ></div>
      )}
      {events[day]?.map(event => (
        <CalendarEvent
          event={event}
          key={event.id + event?.calendarId}
          // @ts-ignore
          selectedTimezone={selectedTimezone}
        />
      ))}
      {eventPlaceholder?.day === day && mode === 'week' && (
        // @ts-ignore
        <CalendarEvent event={eventPlaceholder} selectedTimezone={selectedTimezone} />
      )}
    </div>
  );
}

export const Calendar = ({
  day,
  mode = 'week',
  events,
  notConnected = false,
  onCalendarReconnect,
  selectedTimezone,
}: {
  day: TDateISODate;
  mode: 'week' | 'day';
  events: EventsPerDay;
  notConnected?: boolean;
  onCalendarReconnect?: () => void;
  selectedTimezone?: string;
}) => {
  const hourMarkerRef = useRef(null);
  const days: TDateISODate[] = mode === 'week' ? generateWeek(day) : [day];
  const defaultUserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { setIsMouseDown } = useMouseEvents();
  const { setEventTypesSelected } = useCalendar();
  const { t } = useTranslation('translation', { keyPrefix: 'meetingModal.calendar' });

  useEffect(() => {
    // @ts-ignore
    hourMarkerRef?.current?.scrollIntoView({ block: 'center' });
  }, [day]);

  useEffect(() => {
    if (notConnected) setEventTypesSelected('bloobirds');
  }, [notConnected]);

  // @ts-ignore
  return (
    <div
      className={styles.calendar}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
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
                        <Tooltip title={t('yourTimezone')} position="top">
                          <Text size="xxs" align="right">
                            (
                            {spacetime()
                              //@ts-ignore
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
    </div>
  );
};
