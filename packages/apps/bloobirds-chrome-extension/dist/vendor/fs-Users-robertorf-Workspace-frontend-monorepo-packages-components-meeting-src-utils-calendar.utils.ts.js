import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import {
  getUserTimeZone,
  getValueFromLogicRole,
  getReferencedBobjectFromLogicRole
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
export function calculateCollisions(events) {
  const collisionMap = {};
  events.forEach((event, index) => {
    events?.forEach((eventToCompare, otherIndex) => {
      if (index !== otherIndex) {
        if (event.startTimeTimestamp > eventToCompare.startTimeTimestamp && event.startTimeTimestamp < eventToCompare.endTimeTimestamp || event.endTimeTimestamp > eventToCompare.startTimeTimestamp && event.endTimeTimestamp < eventToCompare.endTimeTimestamp || event.startTimeTimestamp < eventToCompare.startTimeTimestamp && event.endTimeTimestamp > eventToCompare.startTimeTimestamp || event.startTimeTimestamp < eventToCompare.endTimeTimestamp && event.endTimeTimestamp > eventToCompare.endTimeTimestamp || event.startTimeTimestamp === eventToCompare.startTimeTimestamp || event.endTimeTimestamp === eventToCompare.endTimeTimestamp) {
          collisionMap[index] = collisionMap[index] ? collisionMap[index].add(otherIndex) : /* @__PURE__ */ new Set([otherIndex]);
        }
      }
    });
  });
  events.forEach((event, index) => {
    events.forEach((eventToCompare, otherIndex) => {
      if (index !== otherIndex) {
        if (collisionMap[otherIndex]?.has(index)) {
          event.collisions = event.collisions + 1;
        }
      }
    });
    if (collisionMap[index] instanceof Set) {
      const collisionMapSet = collisionMap[index];
      collisionMapSet.forEach((collision) => {
        const indexOfCollision = parseInt(collision);
        if (event.collisionNumber === 0 && events[collision].collisions > event.collisions) {
          event.collisionNumber = events[collision].collisionNumber;
        }
        if (index > indexOfCollision) {
          if (collisionMap[indexOfCollision] instanceof Set) {
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
export function getDuration(startTime, endTime) {
  const diff = new Date(endTime) - new Date(startTime);
  return Math.round(diff / 6e4);
}
export function createParticipantsFromBloobirdsActivity(event, users) {
  const accountExecutive = getValueFromLogicRole(
    event,
    ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
    true
  );
  const lead = getReferencedBobjectFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const leadName = lead && (lead?.fullName || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, true));
  const leadEmail = lead && (lead?.email || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true));
  const activityUser = getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const user = activityUser && users?.users?.find((u) => u?.id === activityUser);
  const parsedAccountExecutive = accountExecutive ? { name: null, email: accountExecutive, type: "AE" } : null;
  const parsedLead = lead && { name: leadName, email: leadEmail, type: "Lead" };
  const parsedUser = user && { name: user?.name, email: user?.email, type: "Organizer" };
  const participants = /* @__PURE__ */ new Set([parsedAccountExecutive, parsedLead, parsedUser]);
  return Array.from(participants);
}
export function parseEvents(events, type, users, selectedTimezone, calendarsWithColors, bannedEvent) {
  if (!events) {
    return {};
  }
  if (!type) {
    return {};
  }
  const eventPerDay = events?.reduce((perDay, event) => {
    if (event?.when?.startTime && event?.status !== "cancelled" && event?.id !== bannedEvent) {
      const startSpaceTimeDate = spacetime(event?.when?.startTime);
      const date = startSpaceTimeDate.goto(selectedTimezone || getUserTimeZone()).format("iso-short");
      const endSpaceTimeDate = spacetime(event?.when?.endTime);
      const endDate = endSpaceTimeDate.goto(selectedTimezone || getUserTimeZone()).format("iso-short");
      const colorEvent = calendarsWithColors?.find((c) => c?.calendarId === event.calendarId);
      if (date === endDate) {
        perDay[date] = [
          ...perDay[date] || [],
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
            day: spacetime(event.when?.startTime).startOf("day").format("iso-short"),
            type: "nylas",
            calendarId: event.calendarId,
            backgroundColor: colorEvent?.color,
            barColor: colorEvent?.barColor,
            owner: event.owner
          }
        ];
      }
    } else if (getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME)) {
      const spacetimeStartDatetime = spacetime(
        getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME)
      );
      const startDatetime = spacetimeStartDatetime?.goto(selectedTimezone || getUserTimeZone());
      const duration = parseInt(getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION), 10) || 60;
      const endDatetime = spacetimeStartDatetime?.goto(selectedTimezone || getUserTimeZone()).add(duration, "minute");
      const date = spacetimeStartDatetime.format("iso-short");
      perDay[date] = [
        ...perDay[date] || [],
        {
          duration,
          id: event?.id?.value,
          title: getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE),
          startTime: startDatetime.format("iso-utc"),
          endTime: endDatetime.format("iso-utc"),
          startTimeTimestamp: startDatetime.epoch,
          endTimeTimestamp: endDatetime.epoch,
          participants: createParticipantsFromBloobirdsActivity(event, users),
          collisions: 0,
          collisionNumber: 0,
          day: spacetime(startDatetime).startOf("day").format("iso-short"),
          type: "bloobirds",
          calendarId: "bloobirds-event"
        }
      ];
    }
    return perDay;
  }, {});
  Object.keys(eventPerDay).map((date) => {
    const events2 = eventPerDay[date];
    const sortedEvents = events2?.sort((a, b) => b.duration - a.duration);
    return calculateCollisions(sortedEvents);
  });
  return eventPerDay;
}
