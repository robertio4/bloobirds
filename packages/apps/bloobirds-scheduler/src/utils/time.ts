import { getI18nSpacetimeLng, useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import i18n from 'i18next';

export const getSlotTime = (
  startDateTime: string,
  duration: string,
  timeZone: string,
  lng: string,
) => {
  const date = getI18nSpacetimeLng(lng, startDateTime, timeZone ?? 'Europe/Madrid');
  const e = date.add(parseInt(duration), 'minutes');

  return `${date.format('{time}')} - ${e.format('{time}')}`;
};

export const getTimeZoneString = (startDateTime: string, timeZone: string) => {
  const date = startDateTime
    ? useGetI18nSpacetime(startDateTime, timeZone ?? 'Europe/Madrid')
    : useGetI18nSpacetime(null, timeZone ?? 'Europe/Madrid');

  const timeZoneOffset = date.timezone().current.offset;
  let timeZoneOffsetString = timeZoneOffset > 0 ? '+' : '';
  if (timeZoneOffset < 10 && timeZoneOffset > -10) {
    timeZoneOffsetString += `0${Math.floor(timeZoneOffset)}`;
  }
  if (timeZoneOffset % 1 !== 0) {
    timeZoneOffsetString += `:30`;
  } else {
    timeZoneOffsetString += `:00`;
  }

  return `${timeZoneOffsetString} ${date.timezone().name}`;
};

export const getDateString = (startDateTime: string, timeZone: string) => {
  const date = startDateTime
    ? useGetI18nSpacetime(startDateTime, timeZone ?? 'Europe/Madrid')
    : useGetI18nSpacetime(null, timeZone ?? 'Europe/Madrid');
  const isSpanish = i18n.language === 'es';

  const formatString = isSpanish ? '{date-pad} {month} {year}' : '{month} {date-ordinal}, {year}';

  return date.format(formatString);
};

export const getDateTimeString = (startDateTime: string, timeZone: string) => {
  const date = startDateTime
    ? useGetI18nSpacetime(startDateTime, timeZone ?? 'Europe/Madrid')
    : useGetI18nSpacetime(null, timeZone ?? 'Europe/Madrid');

  return getDateString(startDateTime, timeZone) + date.format(' - {time}');
};

export const getDayString = (day: string, timeZone: string) => {
  const isSpanish = i18n.language === 'es';

  const formatString = isSpanish
    ? '{day}, {date-pad} {month} {year}'
    : '{day}, {month} {date-ordinal}, {year}';

  return useGetI18nSpacetime(day, timeZone ?? 'Europe/Madrid').format(formatString);
};
