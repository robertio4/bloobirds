import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  CalendarsWithColors,
  EventsPerDay,
  EventsType,
  LEAD_FIELDS_LOGIC_ROLE,
  UserResponse,
  Event,
  Invitee,
  TDateISO,
  TDateISODate,
} from '@bloobirds-it/types';
import spacetime, { Spacetime } from 'spacetime';

import { getReferencedBobjectFromLogicRole, getValueFromLogicRole } from './bobjects.utils';
import { getUserTimeZone } from './dates.utils';

export function getDuration(startTime: TDateISO, endTime: TDateISO) {
  // @ts-ignore
  const diff = new Date(endTime) - new Date(startTime);
  return Math.round(diff / 60000);
}

export function createParticipantsFromBloobirdsActivity(event: Bobject, users: UserResponse) {
  const accountExecutive = getValueFromLogicRole(
    event,
    ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
    true,
  );
  const lead = getReferencedBobjectFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const leadName =
    //@ts-ignore
    lead && (lead?.fullName || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, true));
  const leadEmail =
    //@ts-ignore
    lead && (lead?.email || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true));
  const activityUser = getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const user = activityUser && users?.users?.find(u => u?.id === activityUser);
  const parsedAccountExecutive = accountExecutive
    ? // @ts-ignore
      { name: null, email: accountExecutive, type: 'AE' }
    : null;
  const parsedLead = lead && { name: leadName, email: leadEmail, type: 'Lead' };
  const parsedUser = user && { name: user?.name, email: user?.email, type: 'Organizer' };

  const participants = new Set([parsedAccountExecutive, parsedLead, parsedUser]);
  return Array.from(participants);
}

export function calculateCollisions(events: Event[]) {
  const collisionMap: { [key: string]: number | string } = {};

  events.forEach((event: Event, index: number) => {
    events?.forEach((eventToCompare: Event, otherIndex: number) => {
      if (index !== otherIndex) {
        //The event starts after or at the same time as the event to compare and ends before or at the same time as the event to compare
        if (
          (event.startTimeTimestamp > eventToCompare.startTimeTimestamp &&
            event.startTimeTimestamp < eventToCompare.endTimeTimestamp) ||
          (event.endTimeTimestamp > eventToCompare.startTimeTimestamp &&
            event.endTimeTimestamp < eventToCompare.endTimeTimestamp) ||
          (event.startTimeTimestamp < eventToCompare.startTimeTimestamp &&
            event.endTimeTimestamp > eventToCompare.startTimeTimestamp) ||
          (event.startTimeTimestamp < eventToCompare.endTimeTimestamp &&
            event.endTimeTimestamp > eventToCompare.endTimeTimestamp) ||
          event.startTimeTimestamp === eventToCompare.startTimeTimestamp ||
          event.endTimeTimestamp === eventToCompare.endTimeTimestamp
        ) {
          collisionMap[index] = collisionMap[index]
            ? collisionMap[index]
                // @ts-ignore
                .add(otherIndex)
            : new Set([otherIndex]);
        }
      }
    });
  });

  events.forEach((event, index) => {
    // Given the collision map for an event, the collisions is the amount of times the event appears as collisions of other events
    // @ts-ignore
    events.forEach((eventToCompare, otherIndex) => {
      if (index !== otherIndex) {
        // @ts-ignore
        if (collisionMap[otherIndex]?.has(index)) {
          event.collisions = event.collisions + 1;
        }
      }
    });

    // @ts-ignore
    if (collisionMap[index] instanceof Set) {
      // @ts-ignore
      const collisionMapSet = collisionMap[index] as Set;
      // @ts-ignore
      collisionMapSet.forEach(collision => {
        const indexOfCollision = parseInt(collision);
        if (event.collisionNumber === 0 && events[collision].collisions > event.collisions) {
          event.collisionNumber = events[collision].collisionNumber;
          //event.collisions = events[collision].collisions;
        }
        if (index > indexOfCollision) {
          // @ts-ignore
          if (collisionMap[indexOfCollision] instanceof Set) {
            // @ts-ignore
            if (collisionMap[indexOfCollision].has(index)) {
              event.collisionNumber++;
            }
          }
        }
      });
    }
  });
  return events;
}

export function parseEvents(
  events: any,
  type: EventsType,
  users: UserResponse,
  selectedTimezone: string,
  calendarsWithColors: CalendarsWithColors[],
  bannedEvent: string,
) {
  if (!events) {
    return {};
  }
  if (!type) {
    return {};
  }
  const eventPerDay = events?.reduce((perDay: EventsPerDay, event: any) => {
    if (event?.when?.startTime && event?.status !== 'cancelled' && event?.id !== bannedEvent) {
      const startSpaceTimeDate = spacetime(event?.when?.startTime);
      const date = startSpaceTimeDate
        .goto(selectedTimezone || getUserTimeZone())
        .format('iso-short');
      const endSpaceTimeDate = spacetime(event?.when?.endTime);
      const endDate = endSpaceTimeDate
        .goto(selectedTimezone || getUserTimeZone())
        .format('iso-short');

      const colorEvent = calendarsWithColors?.find(c => c?.calendarId === event.calendarId);
      if (date === endDate) {
        perDay[date] = [
          ...(perDay[date] || []),
          {
            duration: getDuration(event.when?.startTime, event.when?.endTime),
            id: event.id,
            title: event.title,
            startTime: event.when?.startTime,
            endTime: event.when?.endTime,
            startTimeTimestamp: startSpaceTimeDate.epoch,
            endTimeTimestamp: endSpaceTimeDate.epoch,
            participants: event.participants,
            collisions: 0,
            collisionNumber: 0,
            day: spacetime(event.when?.startTime)
              .startOf('day')
              .format('iso-short') as TDateISODate,
            type: 'nylas',
            calendarId: event.calendarId,
            backgroundColor: colorEvent?.color,
            barColor: colorEvent?.barColor,
            owner: event.owner,
          },
        ];
      }
    } else if (getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME)) {
      const spacetimeStartDatetime = spacetime(
        getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME),
      );
      const startDatetime = useGetI18nSpacetime(
        spacetimeStartDatetime,
        selectedTimezone || getUserTimeZone(),
      );
      const duration =
        parseInt(getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION), 10) ||
        60;
      const endDatetime = useGetI18nSpacetime(
        spacetimeStartDatetime,
        selectedTimezone || getUserTimeZone(),
      ).add(duration, 'minute');
      const date = spacetimeStartDatetime.format('iso-short') as TDateISODate;
      perDay[date] = [
        ...(perDay[date] || []),
        {
          duration,
          id: event?.id?.value,
          title: getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE),
          startTime: startDatetime.format('iso-utc') as TDateISO,
          endTime: endDatetime.format('iso-utc') as TDateISO,
          startTimeTimestamp: startDatetime.epoch,
          endTimeTimestamp: endDatetime.epoch,
          participants: createParticipantsFromBloobirdsActivity(event, users) as Invitee[],
          collisions: 0,
          collisionNumber: 0,
          day: spacetime(startDatetime).startOf('day').format('iso-short') as TDateISODate,
          type: 'bloobirds',
          calendarId: 'bloobirds-event',
        },
      ];
    }
    return perDay;
  }, {});

  // Calculate and set the collisions, and the collision number. Two events are considered a collision if their start time is between the start time and the end time of the other.
  Object.keys(eventPerDay).map(date => {
    const events = eventPerDay[date];
    const sortedEvents = events?.sort((a: Event, b: Event) => b.duration - a.duration);
    return calculateCollisions(sortedEvents);
  });
  return eventPerDay;
}

export function getTimeFromOffset(offset: number, day: Spacetime): TDateISO {
  const correctedOffset = Math.round(offset / 10) * 10;
  const defaultTzOffset = spacetime.now().timezone().current.offset;
  const dateSelectedTzOffset = day.timezone().current.offset;
  return spacetime(day)
    .add(correctedOffset * (60 / 40) + (defaultTzOffset - dateSelectedTzOffset) * 60, 'minute')
    .format('iso-utc') as TDateISO;
}

export function getDurationFromOffset(offset: number) {
  const correctedOffset = Math.max(Math.round(Math.abs(offset) / 10) * 10, 10) * (60 / 40);
  return offset > 0 ? correctedOffset : -correctedOffset;
}
