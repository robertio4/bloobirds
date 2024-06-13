import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import {
  addDays,
  addHours,
  addMinutes as addMinutesFn,
  addMonths,
  addSeconds,
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  formatDistance as formatDistanceFn,
  formatDistanceToNow as formatDistanceToNowFn,
  getDate,
  getDay,
  getWeeksInMonth as getWeeksInMonthFn,
  isAfter,
  isBefore,
  isSameDay as isSameDayFn,
  isWeekend as isWeekendFn,
  isYesterday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMinutes as subMinutesFn,
  subMonths,
} from 'date-fns';
import { TFunction } from 'i18next';
import spacetime from 'spacetime';

export function isUTCDateString(str: string) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|\+\d{4})$/;
  return regex.test(str);
}

export function convertTo24HourFormat(timeString: string, period: 'am' | 'pm') {
  // Split the time string into hours and minutes
  let [hours, minutes] = timeString?.split(':') || ['00', '00'];

  // Convert to 24-hour format
  if (period === 'pm' && hours !== '12') {
    hours = String(Number(hours) + 12);
  }
  if (period === 'am' && hours === '12') {
    hours = '00';
  }
  return `${hours}:${minutes}`;
}

/**
 * @deprecated use getISOShortFormattedDate instead
 */
export const getSimpleDate = (date: number | Date) => {
  if (!date) {
    throw new Error('Date parameter is required');
  }
  return format(date, 'yyyy-LL-dd');
};

export const getDateRange = ({
  startingDate,
  pastRange = 15,
  futureRange = 3,
  includeToday = true,
}) => {
  const pastDays = Array.from({ length: pastRange }, (v, k) => k + 1).map(i =>
    subDays(startingDate, i),
  );
  const thisDay = includeToday ? [startingDate] : [];
  const futureDays = Array.from({ length: futureRange }, (v, k) => k + 1).map(i =>
    addDays(startingDate, i),
  );
  return pastDays.concat(thisDay, futureDays).map(d => getSimpleDate(d));
};

export const getRangeBetweenDates = (
  startDate: string,
  endDate: string,
  formatPattern = 'yyyy-MM-dd',
) => {
  const days = differenceInDays(new Date(endDate), new Date(startDate));

  return Array(days + 1).map((x, i) => format(addDays(new Date(startDate), i), formatPattern));
};

export const getWeeksInMonth = (
  date: number | Date,
  dirtyOptions: { locale?: Locale; weekStartsOn?: 0 | 1 | 2 | 5 | 3 | 4 | 6 },
) => getWeeksInMonthFn(date, dirtyOptions);

const getTimeZoneLocationPosition = (completeTimeZone: string) =>
  completeTimeZone.split(' ', 3).join(' ').length;

const getWeekOfMonth = (date: number | Date, dirtyOptions: { weekStartsOn?: number }) => {
  const options = dirtyOptions || {};
  const weekStartsOn = options.weekStartsOn == null ? 0 : options.weekStartsOn;

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  const currentDayOfMonth = getDate(date);
  if (Number.isNaN(currentDayOfMonth)) {
    return currentDayOfMonth;
  }

  const startWeekDay = getDay(startOfMonth(date));
  let lastDayOfFirstWeek;

  if (startWeekDay >= weekStartsOn) {
    lastDayOfFirstWeek = weekStartsOn + 7 - startWeekDay;
  } else {
    lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  }

  let weekNumber = 1;

  if (currentDayOfMonth > lastDayOfFirstWeek) {
    const remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
    weekNumber += Math.ceil(remainingDaysAfterFirstWeek / 7);
  }
  return weekNumber;
};

export const getDayOfWeekStartingFromMonday = (date: number | Date) =>
  getDay(date) - 1 === -1 ? 6 : getDay(date) - 1;

export const getDayAndWeekNumberFromDate = ({ date }: { date: number | Date }) => {
  const numbers = { dayNumber: 0, weekNumber: 0 };
  numbers.dayNumber = getDayOfWeekStartingFromMonday(date);
  numbers.weekNumber = getWeekOfMonth(date, { weekStartsOn: 1 }) - 1;
  return numbers;
};

export const isToday = function (date: Date, userTimezone: string) {
  const dateTime = spacetime(date).goto(userTimezone);
  const startOfDay = spacetime.today().startOf('day');
  const endOfDay = spacetime.today().endOf('day');

  return (
    (dateTime.isBefore(endOfDay) || dateTime.isEqual(endOfDay)) &&
    (dateTime.isAfter(startOfDay) || dateTime.isEqual(startOfDay))
  );
};
export const isTomorrow = (date: number | Date) => isSameDayFn(date, addDays(new Date(), 1));
export const isBeforeToday = function (date: Date, userTimezone: string) {
  return spacetime(date).goto(userTimezone).isBefore(spacetime.today().startOf('day'));
};
export const isAfterToday = function (date: Date, userTimezone: string) {
  return spacetime(date).goto(userTimezone).isAfter(spacetime.today().endOf('day'));
};
export const isAfterTomorrow = (date: number | Date) =>
  isAfter(date, addDays(startOfDay(new Date()), 1));
export const isWeekend = (date: number | Date) => isWeekendFn(date);
const isSameDay = (date1: number | Date, date2: number | Date) => isSameDayFn(date1, date2);

export const intervalDaysOfMonth = ({ date }: { date: number | Date }) =>
  eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

export const lastWeekOfPrevMonth = ({ date }: { date: number | Date }) => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const end = subDays(startOfMonth(date), 1);
  return isBefore(end, start)
    ? []
    : eachDayOfInterval({
        start,
        end,
      });
};

export const firstWeekOfNextMonth = ({ date }: { date: number | Date }) => {
  const start = addDays(endOfMonth(date), 1);
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  return isAfter(start, end)
    ? []
    : eachDayOfInterval({
        start,
        end,
      });
};

export { addDays, getDaysInMonth, differenceInDays, subDays, startOfDay, endOfDay } from 'date-fns';
export const isAfterDate = (dateToCompare: number | Date, date: number | Date) =>
  isAfter(dateToCompare, date);
export const isSameDayDate = (dateLeft: number | Date, dateRight: number | Date) =>
  isSameDay(dateLeft, dateRight);
export const addMonth = (date: number | Date, numberOfMonth = 1) => addMonths(date, numberOfMonth);
export const addMinutes = (date: number, minutes: number) => addMinutesFn(date, minutes);
export const subMinutes = (date: number, minutes: number) => subMinutesFn(date, minutes);
export const subMonth = (date: number, numberOfMonth = 1) => subMonths(date, numberOfMonth);
export const formatDate = (date: any, formatString: string) => {
  if (!date) {
    throw new Error('date parameter is required');
  }

  return format(date, formatString);
};
export const formatDistance = (date1: Date | number, date2: Date | number) => {
  if (!date1 || !date2) {
    throw new Error('date parameter is required');
  }
  return formatDistanceFn(date1, date2);
};

export const formatDistanceToNow = (date: number | Date) => {
  if (!date) {
    throw new Error('date parameter is required');
  }
  return formatDistanceToNowFn(date);
};

export const formatSecondToElapsedTime = (seconds: number) => {
  const helperDate = addSeconds(new Date(1970, 0, 1), seconds);
  return format(helperDate, 'HH:mm:ss');
};

export const today = () =>
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);

export const transformCalendarEventDate = (dateTime: Date, applyTZOffset = true) => {
  const day = dateTime.getDate();
  let hour = dateTime.getHours();
  const min = dateTime.getMinutes();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();

  if (applyTZOffset) {
    hour += dateTime.getTimezoneOffset() / 60;
  }

  const monthStr = `0${month}`.slice(-2);
  const hourStr = `0${hour}`.slice(-2);
  const minStr = `0${min}`.slice(-2);
  const dayStr = `0${day}`.slice(-2);
  return {
    year,
    monthStr,
    hourStr,
    minStr,
    dayStr,
  };
};

export const parseTimeToDatetime = (timeToParse: string) => {
  const unitTime = timeToParse.substr(-1);
  const time = Number.parseInt(timeToParse.substr(0, timeToParse.length - 1));
  const todayTime = new Date().getTime();
  let convert = 60 * 1000;

  if (unitTime === 'M') {
    return addMonths(new Date(), time);
  }

  if (unitTime === 'h') {
    convert = 60 * 60 * 1000;
  }
  if (unitTime === 'd') {
    convert = 24 * 60 * 60 * 1000;
  }
  return new Date(todayTime + convert * time);
};

export const getDateFormatted = (date: string) => {
  if (date?.indexOf('T') > 0) {
    return `${date
      .split('T')[0]
      .split('-')
      .map(x => {
        if (x.length <= 1) {
          return `0${x}`;
        }
        return x;
      })
      .join('-')}T${date
      .split('T')[1]
      .split(':')
      .map(x => {
        if (x.length <= 1) {
          return `0${x}`;
        }
        return x;
      })
      .join(':')}`;
  }
  return date
    .split('-')
    .map(x => {
      if (x.length <= 1) {
        return `0${x}`;
      }
      return x;
    })
    .join('-');
};

export const formatDateAsText = (...args) => {
  if (args.length === 1) {
    if (typeof args[0] === 'string' || args[0] instanceof Date) {
      return formatOld({ text: args[0], t: undefined });
    }
    if (args[0] === undefined) {
      return formatOld({ text: args[0], t: undefined });
    }
    return formatOld(args[0]);
  }
  return formatOld({ text: args[0], patternFormat: args[1], t: undefined });
};

export const formatOld = ({
  text,
  patternFormat = '{month} {date-ordinal}, {year}',
  timeZone = getUserTimeZone(),
  t,
}: {
  text: string | Date;
  t?: ([key]: string) => string;
  patternFormat?: string;
  timeZone?: string;
}) => {
  return text
    ? getI18nSpacetimeLng(undefined, text, timeZone).format(patternFormat)
    : t
    ? t('common.never')
    : 'Never';
};

export const generateDatePrefix = (date: Date, diffDatePrefix = false, t: TFunction) => {
  if (!date) {
    return t('common.never');
  }
  if (isToday(date, getUserTimeZone())) {
    return t ? t('common.today') : 'Today';
  }
  if (isYesterday(date)) {
    return t ? t('common.yesterday') : 'Yesterday';
  }
  if (isTomorrow(date)) {
    return t ? t('common.tomorrow') : 'Tomorrow';
  }
  if (diffDatePrefix) {
    const diffDays = differenceInCalendarDays(date, new Date());
    if (diffDays > 30 || diffDays < -30) {
      const patternFormat = `{month-short} {date}${
        diffDays < -365 || diffDays > 365 ? ' {year}' : ''
      }`;
      return formatDateAsText({ text: date, patternFormat, t });
    }
    if (t) {
      return diffDays > 0
        ? t('common.inDays', { days: diffDays })
        : t('common.daysAgo', { days: -diffDays });
    } else {
      const diffDays = differenceInCalendarDays(date, new Date());
      return diffDays > 0 ? `In ${diffDays} days` : `${-diffDays} days ago`;
    }
  }
  return '';
};

export const getDateTimestampString = (date: Date) => date.getTime().toString();

export const getLocationFromCompleteTimeZone = timezone => {
  const positionValue = getTimeZoneLocationPosition(timezone);
  return timezone.substring(positionValue + 1).replace(' ', '_');
};

export const getUTCFromCompleteTimeZone = (timeZone: string) => {
  const positionValue = getTimeZoneLocationPosition(timeZone);
  return timeZone.substring(0, positionValue);
};

export const convertLocationToHourMinutes = (timeZoneLocation: any) => {
  const timeZoneFormatter = Intl.DateTimeFormat([], {
    timeZone: timeZoneLocation,
    hour: '2-digit',
    minute: '2-digit',
  });
  return timeZoneFormatter.format(new Date());
};

/**
 * @deprecated use parseTimeToDatetime instead
 */
export const getUTCDate = (date: string | number | Date) =>
  new Date(new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000);

export const getRoundedDateTime = (minutes: number, d = new Date()) => {
  const ms = 1000 * 60 * minutes; // convert minutes to ms
  const date = new Date(Math.round(d.getTime() / ms) * ms);
  return date.toISOString();
};

export const getDifferenceInMinutes = ({
  startDate = Date.now(),
  endDate,
}: {
  startDate: string | number | Date;
  endDate: string | number | Date;
}) => {
  const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.ceil(diff / 60000);
};

export const getDifferenceInHours = ({
  startDate = Date.now(),
  endDate,
}: {
  startDate: string | number | Date;
  endDate: string | number | Date;
}) => {
  const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.ceil(diff / 3600000);
};

export const getDifferenceInDays = ({
  startDate = Date.now(),
  endDate,
}: {
  startDate: string | number | Date;
  endDate: string | number | Date;
}) => {
  const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.ceil(diff / 86400000);
};

export const addHoursToStringDate = (date: string) =>
  date?.includes('T') ? date : `${date}T00:00:00.000`;

export const isDifferentYearThanCurrent = (date: string | number | Date) =>
  new Date().getFullYear() !== new Date(date).getFullYear();

export const getUserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * It returns the corrected day for a given UTC date. If the date is in full ISO format (e.g. 2020-01-01T00:00:00.000Z) it trims the time part.
 * Example: If a task is set for 2020-01-01T00:00:00.000Z, the returned date will be 2020-01-01T00:00:00.000Z on the local timezone of the user.
 * If a task is set for 2020-01-01 the returned date will be 2020-01-01T00:00:00.000Z on the local timezone of the user.
 *
 * @param {string} date
 * @param {string} timeZone if it's not declared not it would take the user computer timezone
 * @returns {Date} the corrected js date
 */
export function parseUTCDateToLocal(date, timeZone = getUserTimeZone()) {
  const regexDateWithTime = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{3})?(zZ)/g;
  if (date?.match(regexDateWithTime)) {
    const utcDate = spacetime(date, 'UTC');
    date = utcDate.format('iso-short');
  }
  const s = spacetime(date, timeZone);
  return s.toNativeDate();
}

export function parseUTCDateTimeToLocal(date, timeZone = getUserTimeZone()) {
  const s = spacetime(date, timeZone);
  return s.toNativeDate();
}

/**
 * It returns the string formatted day (YYYY-MM-DD) for a given UTC date. If the date is in full ISO format (e.g. 2020-01-01T00:00:00.000Z) it trims the time part.
 *
 * @param {string} date
 * @param {string} timeZone
 * @returns {String} the ISO short formatted date (YYYY-MM-DD)
 */
export function getISOShortFormattedDate(date, timeZone) {
  const s = parseUTCDateToLocal(date, timeZone);
  return spacetime(s, timeZone).format('iso-short');
}

/**
 * It returns the string formatted day (YYYY-MM-DD)
 *
 * @param {Date} date
 */
export function getISODate(date: Date) {
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(
    -2,
  )}`;
}

export function add(date: any, unit: 'minutes' | 'hours' | 'days', amount: number) {
  switch (unit) {
    case 'days':
      return addDays(date, amount);
    case 'hours':
      return addHours(date, amount);
    case 'minutes':
    default:
      return addMinutes(date, amount);
  }
}

export function checkTZMatching(tzAbbreviation: string, timezoneName: string) {
  const abbreviationMap = {
    ACST: [
      'Australia/Adelaide',
      'Australia/Broken_Hill',
      'Australia/Darwin',
      'Australia/North',
      'Australia/South',
      'Australia/Yancowinna',
    ],
    AEST: [
      'Antarctica/Macquarie',
      'Australia/ACT',
      'Australia/Brisbane',
      'Australia/Canberra',
      'Australia/Currie',
      'Australia/Hobart',
      'Australia/Lindeman',
      'Australia/Melbourne',
      'Australia/NSW',
      'Australia/Queensland',
      'Australia/Sydney',
      'Australia/Tasmania',
      'Australia/Victoria',
    ],
    AKST: [
      'America/Anchorage',
      'America/Juneau',
      'America/Metlakatla',
      'America/Nome',
      'America/Sitka',
      'America/Yakutat',
      'US/Alaska',
    ],
    AST: [
      'America/Anguilla',
      'America/Antigua',
      'America/Aruba',
      'America/Barbados',
      'America/Blanc-Sablon',
      'America/Curacao',
      'America/Dominica',
      'America/Glace_Bay',
      'America/Goose_Bay',
      'America/Grenada',
      'America/Guadeloupe',
      'America/Halifax',
      'America/Kralendijk',
      'America/Lower_Princes',
      'America/Marigot',
      'America/Martinique',
      'America/Moncton',
      'America/Montserrat',
      'America/Port_of_Spain',
      'America/Puerto_Rico',
      'America/Santo_Domingo',
      'America/St_Barthelemy',
      'America/St_Kitts',
      'America/St_Lucia',
      'America/St_Thomas',
      'America/St_Vincent',
      'America/Thule',
      'America/Tortola',
      'America/Virgin',
      'Atlantic/Bermuda',
      'Canada/Atlantic',
    ],
    AWST: ['Australia/Perth', 'Australia/West'],
    CAT: [
      'Africa/Blantyre',
      'Africa/Bujumbura',
      'Africa/Gaborone',
      'Africa/Harare',
      'Africa/Juba',
      'Africa/Khartoum',
      'Africa/Kigali',
      'Africa/Lubumbashi',
      'Africa/Lusaka',
      'Africa/Maputo',
      'Africa/Windhoek',
    ],
    CET: [
      'Africa/Algiers',
      'Africa/Ceuta',
      'Africa/Tunis',
      'Arctic/Longyearbyen',
      'Atlantic/Jan_Mayen',
      'CET',
      'Europe/Amsterdam',
      'Europe/Andorra',
      'Europe/Belgrade',
      'Europe/Berlin',
      'Europe/Bratislava',
      'Europe/Brussels',
      'Europe/Budapest',
      'Europe/Busingen',
      'Europe/Copenhagen',
      'Europe/Gibraltar',
      'Europe/Ljubljana',
      'Europe/Luxembourg',
      'Europe/Madrid',
      'Europe/Malta',
      'Europe/Monaco',
      'Europe/Oslo',
      'Europe/Paris',
      'Europe/Podgorica',
      'Europe/Prague',
      'Europe/Rome',
      'Europe/San_Marino',
      'Europe/Sarajevo',
      'Europe/Skopje',
      'Europe/Stockholm',
      'Europe/Tirane',
      'Europe/Vaduz',
      'Europe/Vatican',
      'Europe/Vienna',
      'Europe/Warsaw',
      'Europe/Zagreb',
      'Europe/Zurich',
      'Poland',
    ],
    ChST: ['Pacific/Guam', 'Pacific/Saipan'],
    CST: [
      'America/Bahia_Banderas',
      'America/Belize',
      'America/Chicago',
      'America/Chihuahua',
      'America/Costa_Rica',
      'America/El_Salvador',
      'America/Guatemala',
      'America/Havana',
      'America/Indiana/Knox',
      'America/Indiana/Tell_City',
      'America/Knox_IN',
      'America/Managua',
      'America/Matamoros',
      'America/Menominee',
      'America/Merida',
      'America/Mexico_City',
      'America/Monterrey',
      'America/North_Dakota/Beulah',
      'America/North_Dakota/Center',
      'America/North_Dakota/New_Salem',
      'America/Ojinaga',
      'America/Rainy_River',
      'America/Rankin_Inlet',
      'America/Regina',
      'America/Resolute',
      'America/Swift_Current',
      'America/Tegucigalpa',
      'America/Winnipeg',
      'Asia/Chongqing',
      'Asia/Chungking',
      'Asia/Harbin',
      'Asia/Macao',
      'Asia/Macau',
      'Asia/Shanghai',
      'Asia/Taipei',
      'Canada/Central',
      'Canada/Saskatchewan',
      'CST6CDT',
      'Cuba',
      'Mexico/General',
      'PRC',
      'ROC',
      'US/Central',
      'US/Indiana-Starke',
    ],
    EAT: [
      'Africa/Addis_Ababa',
      'Africa/Asmara',
      'Africa/Asmera',
      'Africa/Dar_es_Salaam',
      'Africa/Djibouti',
      'Africa/Kampala',
      'Africa/Mogadishu',
      'Africa/Nairobi',
      'Indian/Antananarivo',
      'Indian/Comoro',
      'Indian/Mayotte',
    ],
    EET: [
      'Africa/Cairo',
      'Africa/Tripoli',
      'Asia/Beirut',
      'Asia/Famagusta',
      'Asia/Gaza',
      'Asia/Hebron',
      'Asia/Nicosia',
      'EET',
      'Egypt',
      'Europe/Athens',
      'Europe/Bucharest',
      'Europe/Chisinau',
      'Europe/Helsinki',
      'Europe/Kaliningrad',
      'Europe/Kiev',
      'Europe/Kyiv',
      'Europe/Mariehamn',
      'Europe/Nicosia',
      'Europe/Riga',
      'Europe/Sofia',
      'Europe/Tallinn',
      'Europe/Tiraspol',
      'Europe/Uzhgorod',
      'Europe/Vilnius',
      'Europe/Zaporozhye',
      'Libya',
    ],
    EST: [
      'America/Atikokan',
      'America/Cancun',
      'America/Cayman',
      'America/Coral_Harbour',
      'America/Detroit',
      'America/Fort_Wayne',
      'America/Grand_Turk',
      'America/Indiana/Indianapolis',
      'America/Indiana/Marengo',
      'America/Indiana/Petersburg',
      'America/Indiana/Vevay',
      'America/Indiana/Vincennes',
      'America/Indiana/Winamac',
      'America/Indianapolis',
      'America/Iqaluit',
      'America/Jamaica',
      'America/Kentucky/Louisville',
      'America/Kentucky/Monticello',
      'America/Louisville',
      'America/Montreal',
      'America/Nassau',
      'America/New_York',
      'America/Nipigon',
      'America/Panama',
      'America/Pangnirtung',
      'America/Port-au-Prince',
      'America/Thunder_Bay',
      'America/Toronto',
      'Canada/Eastern',
      'EST',
      'EST5EDT',
      'Jamaica',
      'US/East-Indiana',
      'US/Eastern',
      'US/Michigan',
    ],
    GMT: [
      'Africa/Abidjan',
      'Africa/Accra',
      'Africa/Bamako',
      'Africa/Banjul',
      'Africa/Bissau',
      'Africa/Conakry',
      'Africa/Dakar',
      'Africa/Freetown',
      'Africa/Lome',
      'Africa/Monrovia',
      'Africa/Nouakchott',
      'Africa/Ouagadougou',
      'Africa/Sao_Tome',
      'Africa/Timbuktu',
      'America/Danmarkshavn',
      'Atlantic/Reykjavik',
      'Atlantic/St_Helena',
      'Etc/GMT',
      'Etc/GMT+0',
      'Etc/GMT-0',
      'Etc/GMT0',
      'Etc/Greenwich',
      'Europe/Belfast',
      'Europe/Guernsey',
      'Europe/Isle_of_Man',
      'Europe/Jersey',
      'Europe/London',
      'GB',
      'GB-Eire',
      'GMT',
      'GMT+0',
      'GMT-0',
      'GMT0',
      'Greenwich',
      'Iceland',
    ],
    HKT: ['Asia/Hong_Kong', 'Hongkong'],
    HST: [
      'America/Adak',
      'America/Atka',
      'HST',
      'Pacific/Honolulu',
      'Pacific/Johnston',
      'US/Aleutian',
      'US/Hawaii',
    ],
    IST: [
      'Asia/Calcutta',
      'Asia/Jerusalem',
      'Asia/Kolkata',
      'Asia/Tel_Aviv',
      'Eire',
      'Europe/Dublin',
      'Israel',
    ],
    JST: ['Asia/Tokyo', 'Japan'],
    KST: ['Asia/Pyongyang', 'Asia/Seoul', 'ROK'],
    MET: ['MET', 'Europe/Kirov'],
    MSK: ['Europe/Moscow', 'Europe/Simferopol', 'Europe/Volgograd', 'W-SU'],
    MST: [
      'America/Boise',
      'America/Cambridge_Bay',
      'America/Ciudad_Juarez',
      'America/Creston',
      'America/Dawson',
      'America/Dawson_Creek',
      'America/Denver',
      'America/Edmonton',
      'America/Fort_Nelson',
      'America/Hermosillo',
      'America/Inuvik',
      'America/Mazatlan',
      'America/Phoenix',
      'America/Shiprock',
      'America/Whitehorse',
      'America/Yellowknife',
      'Canada/Mountain',
      'Canada/Yukon',
      'Mexico/BajaSur',
      'MST',
      'MST7MDT',
      'Navajo',
      'US/Arizona',
      'US/Mountain',
    ],
    NST: ['America/St_Johns', 'Canada/Newfoundland'],
    NZST: ['Antarctica/McMurdo', 'Antarctica/South_Pole', 'NZ', 'Pacific/Auckland'],
    PHT: ['Asia/Manila'],
    PKT: ['Asia/Karachi'],
    PST: [
      'America/Ensenada',
      'America/Los_Angeles',
      'America/Santa_Isabel',
      'America/Tijuana',
      'America/Vancouver',
      'Canada/Pacific',
      'Mexico/BajaNorte',
      'PST8PDT',
      'US/Pacific',
    ],
    SAST: ['Africa/Johannesburg', 'Africa/Maseru', 'Africa/Mbabane'],
    SST: ['Pacific/Midway', 'Pacific/Pago_Pago', 'Pacific/Samoa', 'US/Samoa'],
    UTC: ['Etc/UCT', 'Etc/Universal', 'Etc/UTC', 'Etc/Zulu', 'UCT', 'Universal', 'UTC', 'Zulu'],
    WAT: [
      'Africa/Bangui',
      'Africa/Brazzaville',
      'Africa/Douala',
      'Africa/Kinshasa',
      'Africa/Lagos',
      'Africa/Libreville',
      'Africa/Luanda',
      'Africa/Malabo',
      'Africa/Ndjamena',
      'Africa/Niamey',
      'Africa/Porto-Novo',
    ],
    WET: [
      'Atlantic/Canary',
      'Atlantic/Faeroe',
      'Atlantic/Faroe',
      'Atlantic/Madeira',
      'Europe/Lisbon',
      'Portugal',
      'WET',
    ],
    WIB: ['Asia/Jakarta', 'Asia/Pontianak'],
    WIT: ['Asia/Jayapura', 'Asia/Makassar', 'Asia/Ujung_Pandang'],
  };

  if (tzAbbreviation?.includes('/')) {
    return tzAbbreviation;
  }
  return abbreviationMap[tzAbbreviation]?.includes(timezoneName);
}
