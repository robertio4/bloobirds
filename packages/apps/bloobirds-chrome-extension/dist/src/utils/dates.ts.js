import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import {
  addDays,
  addMinutes as addMinutesFn,
  differenceInCalendarDays,
  format,
  formatDistance as formatDistanceFn,
  getDate,
  getDay,
  isAfter,
  isBefore,
  isSameDay as isSameDayFn,
  isYesterday,
  startOfDay,
  startOfMonth
} from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
export const getSimpleDate = (date) => {
  if (!date) {
    throw new Error("Date parameter is required");
  }
  return format(date, "yyyy-LL-dd");
};
const getWeekOfMonth = (date, dirtyOptions) => {
  const options = dirtyOptions || {};
  const weekStartsOn = options.weekStartsOn == null ? 0 : options.weekStartsOn;
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
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
export const getDayOfWeekStartingFromMonday = (date) => getDay(date) - 1 === -1 ? 6 : getDay(date) - 1;
export const getDayAndWeekNumberFromDate = ({ date }) => {
  const numbers = { dayNumber: 0, weekNumber: 0 };
  numbers.dayNumber = getDayOfWeekStartingFromMonday(date);
  numbers.weekNumber = getWeekOfMonth(date, { weekStartsOn: 1 }) - 1;
  return numbers;
};
export const isToday = (date) => isSameDayFn(date, new Date());
export const isTomorrow = (date) => isSameDayFn(date, addDays(new Date(), 1));
export const isBeforeToday = (date) => isBefore(date, addMinutes(startOfDay(new Date()), 1));
export const isAfterToday = (date) => isAfter(date, startOfDay(new Date()));
export { addDays, getDaysInMonth, differenceInDays, subDays, startOfDay, endOfDay } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
export const addMinutes = (date, minutes) => addMinutesFn(date, minutes);
export const formatDate = (date, formatString) => {
  if (!date) {
    throw new Error("date parameter is required");
  }
  return format(date, formatString);
};
export const formatDistance = (date1, date2) => {
  if (!date1 || !date2) {
    throw new Error("date parameter is required");
  }
  return formatDistanceFn(date1, date2);
};
export const today = () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
export const formatDateAsText = ({
  text,
  patternFormat = "{month-short} {date-ordinal}, {year}",
  timeZone = getUserTimeZone(),
  t
}) => {
  return text ? spacetime(text, "UTC").goto(timeZone).format(patternFormat) : t ? t("common.never") : "Never";
};
export const generateDatePrefix = (date, diffDatePrefix = false) => {
  if (isToday(date)) {
    return "Today ";
  }
  if (isYesterday(date)) {
    return "Yesterday ";
  }
  if (isTomorrow(date)) {
    return "Tomorrow ";
  }
  if (diffDatePrefix) {
    const diffDays = differenceInCalendarDays(date, new Date());
    return diffDays > 0 ? `In ${diffDays} days` : `${-diffDays} days ago`;
  }
  return "";
};
export const getDateTimestampString = (date) => date.getTime().toString();
export const getUTCDate = (date) => new Date(new Date(date).getTime() - new Date(date).getTimezoneOffset() * 6e4);
export const addHoursToStringDate = (date) => date?.includes("T") ? date : `${date}T00:00:00.000`;
export const getUserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
