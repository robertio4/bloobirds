import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { EventsPerDay, LiveEvent, TDateISO, TDateISODate } from '@bloobirds-it/types';
import {
  getDurationFromOffset,
  getTimeFromOffset,
  getUserTimeZone,
  isToday,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import spacetime from 'spacetime';

import { useCalendarContext } from '../calendar';
import styles from '../calendar.module.css';
import { useMouseDelta } from '../useMouseDelta';
import { getPxPaddingSinceMidnight } from '../utils/calendar.utils';
import { CalendarEvent } from './calendarEvent';

export const CalendarColumn = ({
  day,
  events,
  hourMarkerRef,
  selectedTimezone,
}: {
  mode: 'day' | 'week';
  day: TDateISODate;
  events: EventsPerDay;
  hourMarkerRef: any;
  selectedTimezone?: string;
}) => {
  const mouseDelta = useMouseDelta();
  const {
    eventPlaceholder,
    createPlaceholder,
    liveEvents,
    slotsData: { calendarSlotsVisible },
    createQuickLiveEvent,
    clickedOnPastDate,
    settlePlaceholder,
    slotDuration,
  } = useCalendarContext();

  const currentTimePadding = getPxPaddingSinceMidnight(null, selectedTimezone);
  const dayNumber = spacetime(day).format('day-number');
  const isWeekend = dayNumber === '6' || dayNumber === '';
  const columnClasses = clsx(styles.calendar_gridcell, {
    [styles.calendar_gridcell_weekend]: isWeekend,
    [styles.calendar_creating_slots]: mouseDelta?.dragging?.current && calendarSlotsVisible,
  });
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    if (calendarSlotsVisible) {
      if (mouseDelta?.delta === 0) return;
      let placeholderDatetime = getTimeFromOffset(
        mouseDelta.initialPosition,
        getI18nSpacetimeLng(language, day, selectedTimezone || getUserTimeZone()),
      );

      let placeholderDuration = getDurationFromOffset(mouseDelta.delta);
      if (placeholderDuration < 0) {
        placeholderDatetime = spacetime(placeholderDatetime)
          .goto(selectedTimezone || getUserTimeZone())
          .subtract(-placeholderDuration, 'minute')
          .format('iso-utc') as TDateISO;
        placeholderDuration = -placeholderDuration;
      }
      if (typeof createPlaceholder === 'function') {
        createPlaceholder(placeholderDatetime, placeholderDuration, 'dragging');
      }

      if (spacetime(placeholderDatetime).isBefore(new Date())) {
        clickedOnPastDate();
      }
    }
  }, [mouseDelta?.delta, mouseDelta?.initialPosition]);

  function handleCalendarClick(event) {
    const element = event.target;
    if (element?.tagName !== 'DIV') return;
    const div = this.getBoundingClientRect();
    const mouseY = event.clientY - div.top;
    const startTime = getTimeFromOffset(
      mouseY,
      getI18nSpacetimeLng(language, day, selectedTimezone || getUserTimeZone()),
    );
    const isPastEvent = spacetime(startTime).isBefore(new Date());

    if (isPastEvent) {
      return clickedOnPastDate();
    }
    createQuickLiveEvent({ initialPosition: mouseY }, day);
  }

  useEffect(() => {
    if (mouseDelta.ref.current && calendarSlotsVisible) {
      mouseDelta.ref.current.addEventListener('click', handleCalendarClick);
    }
    return () => {
      mouseDelta.ref.current?.removeEventListener('click', handleCalendarClick);
    };
    //TODO check if this can be done without depending on liveEvents
  }, [mouseDelta.ref.current, calendarSlotsVisible, liveEvents, slotDuration]);

  return (
    <div
      key={`column-${day}`}
      className={columnClasses}
      onMouseUp={event => {
        mouseDelta.dragging.current = false;
        settlePlaceholder(event);
      }}
    >
      <div className={styles.calendar_gridcell_hidden} ref={mouseDelta.ref} />
      {isToday((day as unknown) as Date, selectedTimezone || getUserTimeZone()) && (
        <div
          className={styles.calendar_now_marker}
          ref={hourMarkerRef}
          style={{ top: currentTimePadding + 'px' }}
        />
      )}
      {events[day]?.map(event => (
        <CalendarEvent
          type="settledEvent"
          event={event}
          key={event.id + event?.calendarId}
          selectedTimezone={selectedTimezone}
        />
      ))}
      {eventPlaceholder?.day === day && (
        <CalendarEvent
          type="placeholderEvent"
          key={eventPlaceholder.startTime.format('time')}
          event={eventPlaceholder as LiveEvent}
          selectedTimezone={selectedTimezone}
        />
      )}
      {liveEvents?.[day] && (
        <CalendarEvent
          key={liveEvents[day][0]?.startTime.format('time')}
          type="liveEvent"
          event={liveEvents[day]}
          selectedTimezone={selectedTimezone}
        />
      )}
    </div>
  );
};
