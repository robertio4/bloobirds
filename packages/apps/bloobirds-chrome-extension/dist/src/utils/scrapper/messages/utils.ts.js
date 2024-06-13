import * as Sentry from "/vendor/.vite-deps-@sentry_react.js__v--dfb3495e.js";
import { isAfter, isDate, parse, subWeeks } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { es } from "/vendor/.vite-deps-date-fns_locale.js__v--c7741f88.js";
import __vite__cjsImport3_jsSha512 from "/vendor/.vite-deps-js-sha512.js__v--fc0d5d3e.js"; const sha512 = __vite__cjsImport3_jsSha512["sha512"];
export const fillMissingProperties = (messages, properties) => {
  const previousValues = {};
  return messages.map((message) => {
    properties.forEach((prop) => {
      if (previousValues[prop] && !message[prop]) {
        message[prop] = previousValues[prop];
      }
      previousValues[prop] = message[prop];
    });
    return message;
  });
};
export const backfillTimes = (messages) => {
  return fillMissingProperties(messages, ["time", "date", "profile", "lead"]);
};
const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
export const parseDate = (date, time) => {
  const today = new Date();
  if (date.toUpperCase() === "TODAY") {
    return parse(time, "p", today);
  }
  if (daysOfWeek.includes(date.toUpperCase())) {
    const dateObject = parse(`${date} ${time}`, "iiii p", today);
    if (isAfter(dateObject, today)) {
      return subWeeks(dateObject, 1);
    }
    return dateObject;
  }
  if (date?.includes("/")) {
    return parse(`${date} ${time}`, "MM/dd/yyyy p", today);
  }
  if (date.includes(",")) {
    return parse(`${date} ${time}`, "MMM d, yyyy p", today);
  }
  return parse(`${date} ${time}`, "MMM d p", today);
};
const spanishDaysOfWeek = [
  "DOMINGO",
  "LUNES",
  "MARTES",
  "MI\xC9RCOLES",
  "JUEVES",
  "VIERNES",
  "S\xC1BADO"
];
export const parseDateSpanish = (date, time) => {
  const today = new Date();
  if (date.toUpperCase() === "HOY") {
    return parse(time, "p", today, { locale: es });
  }
  if (spanishDaysOfWeek.includes(date.toUpperCase())) {
    const dateObject = parse(`${date} ${time}`, "iiii p", today, { locale: es });
    if (isAfter(dateObject, today)) {
      return subWeeks(dateObject, 1);
    }
    return dateObject;
  }
  if (date?.includes("/")) {
    return parse(`${date} ${time}`, "dd/MM/yyyy p", today, { locale: es });
  }
  if (date.includes(",")) {
    return parse(`${date} ${time}`, "d MMM, yyyy p", today, { locale: es });
  }
  if (date.includes("DE")) {
    const parsedDate = parse(`${date} ${time}`, "d 'DE' MMM 'DE' yyyy p", today, { locale: es });
    if (isValidDate(parsedDate)) {
      return parsedDate;
    }
  }
  const oldDate = parse(`${date} ${time}`, "d MMM yyyy H:mm", today, { locale: es });
  if (isValidDate(oldDate)) {
    return oldDate;
  }
  const shortDate = parse(`${date} ${time}`, "d MMM p", today, { locale: es });
  if (isValidDate(shortDate)) {
    return shortDate;
  }
  return parse(`${date} ${time}`, "d 'DE' MMM'.' p", today, { locale: es });
};
export function getPreviousDirection(messages, i) {
  let correctedIndex = i;
  let name = void 0;
  while (!name && correctedIndex >= 0) {
    const newCorrectedIndex = --correctedIndex;
    if (messages[newCorrectedIndex]?.name !== void 0) {
      name = messages[newCorrectedIndex]?.name;
    }
  }
  return name;
}
export function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}
export function transformToNewMessageType({
  messages,
  pathName,
  leadName
}) {
  const minutesCount = {};
  return messages.filter((message) => message.time && message.date).map((message, i) => {
    let date = parseDate(message.date, message.time);
    if (!isValidDate(date)) {
      date = parseDateSpanish(message.date, message.time);
    }
    if (typeof minutesCount[message.time] === "number") {
      minutesCount[message.time] = minutesCount[message.time] + 1;
    } else {
      minutesCount[message.time] = 0;
    }
    const direction = !message.name ? getPreviousDirection(messages, i) === leadName : leadName === message.name;
    const minuteDate = new Date(date.getTime());
    minuteDate.setSeconds(minutesCount[message.time]);
    try {
      return {
        body: message.body.trim(),
        oldHash: sha512(`${message.body}${message.time}${pathName}`).toString(),
        threadPathname: pathName,
        dateTimeMinutes: isDate(date) && date.toISOString(),
        dateTimeSeconds: isDate(minuteDate) && minuteDate.toISOString(),
        incoming: direction,
        leadLinkedInId: message?.leadId,
        leadLinkedInUrl: message.lead,
        leadId: message?.bloobirdsId,
        fullName: leadName
      };
    } catch (e) {
      Sentry.captureException(e, {
        tags: {
          module: "messagesLinkedin"
        },
        extra: {
          date,
          minuteDate,
          messageDate: message.date,
          messageTime: message.time
        }
      });
      throw e;
    }
  });
}
