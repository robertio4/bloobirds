import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import {
  EventsType,
  LiveEvent,
  ServerSideCalendarSlots,
  SlotsData,
  TDateISO,
  TDateISODate,
} from '@bloobirds-it/types';
import { getTimeFromOffset, getUserTimeZone } from '@bloobirds-it/utils';
import throttle from 'lodash/throttle';
import spacetime from 'spacetime';
import { v4 as uuid } from 'uuid';

import { BannerStates } from './calendar';
import {
  createArrayOfLength,
  getLiveEventPadding,
  isSlotCreated,
  updatedCreatedSectionsOnDelete,
  mergeExistingPlaceholders,
} from './utils/calendar.utils';

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function slicePlaceholder({
  eventPlaceholder,
  selectedTimezone,
  language,
}: {
  eventPlaceholder: LiveEvent;
  selectedTimezone: string;
  language: string;
}): LiveEvent[] {
  if (!eventPlaceholder) return;
  const numberOfSlots =
    eventPlaceholder.duration >= eventPlaceholder.minuteSpan
      ? Math.floor(eventPlaceholder.duration / eventPlaceholder.minuteSpan)
      : 1;

  return createArrayOfLength(numberOfSlots).map((_, i) => {
    const startTime =
      i === 0
        ? getI18nSpacetimeLng(
            language,
            eventPlaceholder.startTime,
            selectedTimezone || getUserTimeZone(),
          )
        : getI18nSpacetimeLng(
            language,
            eventPlaceholder.startTime,
            selectedTimezone || getUserTimeZone(),
          ).add(i * eventPlaceholder.minuteSpan, 'minutes');

    const id1 = uuid();
    const id2 = uuid();

    const paddingTop = getLiveEventPadding(startTime);
    return {
      id: id1.replaceAll('-', '') + id2.replaceAll('-', ''),
      paddingTop,
      day: eventPlaceholder.day,
      startTime,

      endTime: startTime.add(eventPlaceholder.minuteSpan, 'minutes'),
      collisions: eventPlaceholder.collisions,
      type: 'dragging',
      minuteSpan: eventPlaceholder.minuteSpan,
      duration: eventPlaceholder.duration,
      collisionNumber: eventPlaceholder.collisionNumber,
    };
  });
}

export const useEventPlaceholder = (
  slotsData: SlotsData,
  setCalendarSlotsBannerVisible: React.Dispatch<React.SetStateAction<BannerStates>>,
  setCalendarSlotsInEmailContext: (value: { [day: string]: LiveEvent[] }) => void,
) => {
  const { selectedTimezone } = slotsData || {};
  const [eventPlaceholder, setEventPlaceholder] = useState<LiveEvent>();
  const [liveEvents, setLiveEvents] = useState<ServerSideCalendarSlots | []>(
    slotsData.calendarSlots,
  );
  const [slotDuration, setSlotDuration] = useState(30);
  const [slotsModified, setSlotsModified] = useState(false);
  const previousLiveEvents = useRef<{ [day: string]: LiveEvent[] } | undefined>(undefined);
  const isDraggingController = useRef(false);
  const createdSections = useRef<LiveEvent[]>([]);

  function discardLiveEvents() {
    setLiveEvents(undefined);
    previousLiveEvents.current = undefined;
    setSlotsModified(false);
    createdSections.current = [];
  }

  function discardChanges() {
    setLiveEvents(previousLiveEvents?.current);
    setSlotsModified(false);
    createdSections.current = [];
  }

  useEffect(() => {
    const timeZonedLiveEvents =
      liveEvents &&
      Object.keys(liveEvents || {}).reduce((acc, key: string) => {
        return {
          ...acc,
          [key]: liveEvents[key].map((event: LiveEvent) => {
            const startTimeInSelectedTimezone = getI18nSpacetimeLng(
              language,
              event.startTime,
              selectedTimezone || getUserTimeZone(),
            );
            const paddingTop = getLiveEventPadding(startTimeInSelectedTimezone);

            return {
              ...event,
              startTime: startTimeInSelectedTimezone,
              paddingTop: paddingTop,
            };
          }),
        };
      }, {});
    setLiveEvents(timeZonedLiveEvents);
  }, [selectedTimezone]);

  useEffect(() => {
    const liveEventsN =
      (liveEvents &&
        Object.values(liveEvents || {}).reduce(
          (total: number, dayEvents: any[]) => total + dayEvents?.length,
          0,
        )) ||
      0;

    const initialLiveEventsN =
      (previousLiveEvents?.current &&
        Object.values(previousLiveEvents?.current || {}).reduce(
          (total, dayEvents) => total + (dayEvents as any[])?.length,
          0,
        )) ||
      0;
    setCalendarSlotsInEmailContext(liveEvents as ServerSideCalendarSlots);
    setSlotsModified(liveEventsN !== initialLiveEventsN);
  }, [liveEvents, previousLiveEvents?.current]);

  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    if (createdSections.current.length > 0) {
      const newLiveEvents = [];
      //TODO find where the duplicates are coming from
      const uniqueSections = createdSections?.current?.filter(onlyUnique);
      uniqueSections?.forEach(ph => {
        const newDuration = Math.floor(ph.duration / slotDuration) * slotDuration;
        newLiveEvents.push(
          ...slicePlaceholder({
            language,
            eventPlaceholder: {
              ...ph,
              minuteSpan: slotDuration,
              duration: newDuration,
              endTime: ph.startTime.add(newDuration, 'minutes'),
            },
            selectedTimezone,
          }).reduce((acc, curr) => {
            if (
              curr.duration <= 0 ||
              acc.some(storedEvent =>
                curr.startTime.isBetween(storedEvent.startTime, storedEvent.endTime),
              ) ||
              newLiveEvents.some(storedEvent =>
                curr.startTime.isBetween(storedEvent.startTime, storedEvent.endTime, true),
              )
            ) {
              return acc;
            }
            if (curr.duration < curr.minuteSpan) {
              return [...acc, { ...curr, minuteSpan: curr.duration }];
            }
            return [...acc, curr];
          }, []),
        );
      });
      addLiveEvents(newLiveEvents, true);
    }
  }, [slotDuration]);

  function addLiveEvents(events: LiveEvent[], overwrite = false) {
    if (!events) return;
    const futureEvents = events?.filter(e => e?.startTime?.isAfter(new Date()));
    const eventDay = events?.[0]?.day;
    if (futureEvents.length === 0) return;

    if (overwrite) {
      setLiveEvents({ [eventDay]: events });
      return;
    }
    if (futureEvents.length > 0 && liveEvents && liveEvents[eventDay]) {
      //insert the new event in the correct position
      const insertEventInTimeline = () => {
        const orderedEvents = [];
        let hasPushed = false;
        for (let i = 0; i < liveEvents[eventDay].length; i++) {
          const liveEvent = liveEvents[eventDay][i];
          if (
            liveEvent.startTime.isBetween(futureEvents[0].startTime, futureEvents.at(-1).endTime)
          ) {
            if (!hasPushed) {
              orderedEvents.push(...futureEvents);
              hasPushed = true;
            }
          } else {
            orderedEvents.push(liveEvent);
          }
        }
        // new events happen after all the live events
        if (
          orderedEvents.length === liveEvents[eventDay].length &&
          !orderedEvents.some(orderedEvent => {
            return (
              futureEvents[0].startTime.isBetween(
                orderedEvent.startTime,
                orderedEvent.endTime,
                false,
              ) || orderedEvent.startTime.isEqual(futureEvents[0].startTime)
            );
          })
        ) {
          orderedEvents.push(...futureEvents);
        }

        return orderedEvents;
      };

      const orderedFutureEvents = insertEventInTimeline();
      setLiveEvents({ ...liveEvents, [eventDay]: orderedFutureEvents });
    } else {
      const existingLiveEvents = Object.entries(liveEvents || {});
      const orderedUpdatedEvents =
        existingLiveEvents.length > 0
          ? existingLiveEvents.reduce((acc, [key, value], currentIndex) => {
              const dateIsBeforeNewEvent = spacetime(key).isBefore(spacetime(eventDay));
              const hasBeenAdded = Object.entries(acc).some(([k]) => k === eventDay);
              if (!dateIsBeforeNewEvent && !hasBeenAdded) {
                return { ...acc, [eventDay]: futureEvents, [key]: value };
              }
              const isLastIteration = currentIndex === existingLiveEvents.length - 1;
              return {
                ...acc,
                [key]: value,
                ...(isLastIteration && !hasBeenAdded ? { [eventDay]: futureEvents } : {}),
              };
            }, {})
          : { [eventDay]: futureEvents };
      //if there's not other events that day, just add the new event
      setLiveEvents(orderedUpdatedEvents);
    }
    setCalendarSlotsBannerVisible(BannerStates.EDIT);
  }

  function settlePlaceholder(event: React.MouseEvent<HTMLDivElement>) {
    if (!eventPlaceholder) return;
    const roundedDuration = Math.floor(eventPlaceholder.duration / slotDuration) * slotDuration;
    const roundedPlaceholder = { ...eventPlaceholder, duration: roundedDuration };
    const segmentedLiveEvents = slicePlaceholder({
      eventPlaceholder: roundedPlaceholder,
      language,
      selectedTimezone,
    });
    addLiveEvents(segmentedLiveEvents);
    if (event && eventPlaceholder) {
      createdSections.current = mergeExistingPlaceholders(
        createdSections.current,
        roundedPlaceholder,
      ) as LiveEvent[];
    }
    setEventPlaceholder(undefined);
    setTimeout(() => (isDraggingController.current = false), 500);
  }

  function createQuickLiveEvent(mouseDelta, day) {
    if (mouseDelta.initialPosition === 0 || isDraggingController.current) return;
    const id = uuid();
    const startTime = getTimeFromOffset(
      mouseDelta.initialPosition,
      spacetime(day).goto(selectedTimezone || getUserTimeZone()),
    );
    const startDatetimeSpaceTime = getI18nSpacetimeLng(
      language,
      startTime,
      selectedTimezone || getUserTimeZone(),
    );
    const slotCreated = isSlotCreated(liveEvents?.[day] ?? [], startDatetimeSpaceTime);
    if (!slotCreated) {
      const paddingTop = getLiveEventPadding(startDatetimeSpaceTime);
      const newEvent: LiveEvent = {
        id,
        paddingTop,
        day,
        startTime: startDatetimeSpaceTime,
        endTime: startDatetimeSpaceTime.add(slotDuration, 'minutes'),
        collisions: 0,
        minuteSpan: slotDuration,
        type: 'dragging',
        duration: slotDuration,
        collisionNumber: 0,
      };
      addLiveEvents([newEvent]);
      createdSections.current = mergeExistingPlaceholders(
        createdSections.current,
        newEvent,
      ) as LiveEvent[];
    }
  }
  function deleteLiveEvent(day, id) {
    const currentEvents = liveEvents[day];
    const newEvents = currentEvents.filter(event => event.id !== id);
    const deletedEvent = liveEvents[day].find(event => event.id === id);
    createdSections.current = updatedCreatedSectionsOnDelete(createdSections.current, deletedEvent);
    if (newEvents?.length === 0) {
      createdSections.current = [];
      setCalendarSlotsBannerVisible(BannerStates.ACTIVE);
    }
    setLiveEvents({ ...liveEvents, [day]: newEvents } as ServerSideCalendarSlots);
  }

  const createPlaceholder = throttle(
    (date: TDateISO, duration: number, type: EventsType = 'placeholder') => {
      setEventPlaceholder({
        duration,
        type,
        startTime: getI18nSpacetimeLng(language, date, selectedTimezone || getUserTimeZone()),
        endTime: getI18nSpacetimeLng(language, date, selectedTimezone || getUserTimeZone()).add(
          duration,
          'minutes',
        ),
        minuteSpan: slotDuration,
        id: 'event-placeholder',
        collisions: 0,
        collisionNumber: 0,
        day: spacetime(date).format('iso-short') as TDateISODate,
      });
      isDraggingController.current = true;
    },
    250,
  );

  return {
    slotDuration,
    deleteLiveEvent,
    setSlotDuration,
    eventPlaceholder,
    createPlaceholder,
    addLiveEvent: addLiveEvents,
    discardLiveEvents,
    discardChanges,
    settlePlaceholder,
    previousLiveEvents,
    setPreviousLiveEvents: value => {
      previousLiveEvents.current = value;
    },
    slotsModified,
    liveEvents,
    setLiveEvents,
    createQuickLiveEvent,
  };
};
