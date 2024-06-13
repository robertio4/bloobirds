import * as Sentry from '@sentry/react';
import { isAfter, isDate, parse, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import { sha512 } from 'js-sha512';

import { LinkedInMessage, OldLinkedInMessage } from './types';

export const fillMissingProperties = (
  messages: Array<any>,
  properties: Array<string>,
): Array<any> => {
  const previousValues = {};
  return messages.map(message => {
    properties.forEach(prop => {
      if (previousValues[prop] && !message[prop]) {
        message[prop] = previousValues[prop];
      }
      previousValues[prop] = message[prop];
    });
    return message;
  });
};

export const backfillTimes = (messages: Array<any>): Array<any> => {
  return fillMissingProperties(messages, ['time', 'date', 'profile', 'lead']);
};

const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export const parseDate = (date: string, time: string) => {
  const today = new Date();

  if (date.toUpperCase() === 'TODAY') {
    return parse(time, 'p', today);
  }

  if (daysOfWeek.includes(date.toUpperCase())) {
    const dateObject = parse(`${date} ${time}`, 'iiii p', today);
    if (isAfter(dateObject, today)) {
      return subWeeks(dateObject, 1);
    }
    return dateObject;
  }

  if (date?.includes('/')) {
    return parse(`${date} ${time}`, 'MM/dd/yyyy p', today);
  }

  if (date.includes(',')) {
    return parse(`${date} ${time}`, 'MMM d, yyyy p', today);
  }

  return parse(`${date} ${time}`, 'MMM d p', today);
};

const spanishDaysOfWeek = [
  'DOMINGO',
  'LUNES',
  'MARTES',
  'MIÉRCOLES',
  'JUEVES',
  'VIERNES',
  'SÁBADO',
];

export const parseDateSpanish = (date: string, time: string) => {
  const today = new Date();

  if (date.toUpperCase() === 'HOY') {
    return parse(time, 'p', today, { locale: es });
  }

  if (spanishDaysOfWeek.includes(date.toUpperCase())) {
    const dateObject = parse(`${date} ${time}`, 'iiii p', today, { locale: es });
    if (isAfter(dateObject, today)) {
      return subWeeks(dateObject, 1);
    }
    return dateObject;
  }

  if (date?.includes('/')) {
    return parse(`${date} ${time}`, 'dd/MM/yyyy p', today, { locale: es });
  }

  if (date.includes(',')) {
    return parse(`${date} ${time}`, 'd MMM, yyyy p', today, { locale: es });
  }

  if (date.includes('DE')) {
    const parsedDate = parse(`${date} ${time}`, "d 'DE' MMM 'DE' yyyy p", today, { locale: es });
    if (isValidDate(parsedDate)) {
      return parsedDate;
    }
  }

  const oldDate = parse(`${date} ${time}`, 'd MMM yyyy H:mm', today, { locale: es });
  if (isValidDate(oldDate)) {
    return oldDate;
  }

  const shortDate = parse(`${date} ${time}`, 'd MMM p', today, { locale: es });
  if (isValidDate(shortDate)) {
    return shortDate;
  }

  return parse(`${date} ${time}`, "d 'DE' MMM'.' p", today, { locale: es });
};

interface TransformParameters {
  messages: Array<OldLinkedInMessage>;
  pathName: string;
  leadName: string;
}

export function getPreviousDirection(messages: Array<OldLinkedInMessage>, i: number) {
  let correctedIndex = i;
  let name = undefined;

  while (!name && correctedIndex >= 0) {
    const newCorrectedIndex = --correctedIndex;
    if (messages[newCorrectedIndex]?.name !== undefined) {
      name = messages[newCorrectedIndex]?.name;
    }
  }
  return name;
}

export function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export function transformToNewMessageType({
  messages,
  pathName,
  leadName,
}: TransformParameters): Array<LinkedInMessage> {
  const minutesCount = {};
  return messages
    .filter(message => message.time && message.date)
    .map((message, i) => {
      let date = parseDate(message.date, message.time);
      // TODO: review this when we want to add more languages
      if (!isValidDate(date)) {
        date = parseDateSpanish(message.date, message.time);
      }
      if (typeof minutesCount[message.time] === 'number') {
        minutesCount[message.time] = minutesCount[message.time] + 1;
      } else {
        minutesCount[message.time] = 0;
      }
      const direction = !message.name
        ? getPreviousDirection(messages, i) === leadName
        : leadName === message.name;

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
          fullName: leadName,
        };
      } catch (e) {
        Sentry.captureException(e, {
          tags: {
            module: 'messagesLinkedin',
          },
          extra: {
            date: date,
            minuteDate: minuteDate,
            messageDate: message.date,
            messageTime: message.time,
          },
        });
        throw e;
      }
    });
}
