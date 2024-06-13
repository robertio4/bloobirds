import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ACTIVITY_TYPES_VALUES_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { addHoursToStringDate, generateDatePrefix, getDateTimestampString, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { format, isSameDay, parse } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
export const activityTypes = [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK];
export const addDateGrouping = (items) => items.map((item, index) => {
  const {
    date
  } = item.activityDate;
  const previous = items[index - 1];
  const previousItemDate = previous && previous.activityDate.date;
  const next = items[index + 1];
  const nextItemDate = next && next.activityDate.date;
  return {
    ...item,
    activityDate: {
      ...item.activityDate,
      isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
      isLastOfDay: !nextItemDate || !isSameDay(date, nextItemDate)
    }
  };
});
export const addActivityDateGrouping = (items, dateLogicRole, t, language) => items.map((item, index) => {
  const date = new Date(getValueFromLogicRole(item, dateLogicRole));
  const previous = items[index - 1];
  const next = items[index + 1];
  const previousItemDate = previous && new Date(addHoursToStringDate(getValueFromLogicRole(previous, dateLogicRole)));
  const nextItemDate = next && new Date(addHoursToStringDate(getValueFromLogicRole(next, dateLogicRole)));
  const formatStr = language === "en" ? "{month} {date-ordinal}, {year}" : "{date} {month} {year}";
  const formattedDay = getI18nSpacetimeLng(language, date).format(formatStr);
  const dateDay = parse(format(date, "MMMM do, yyyy"), "MMMM do, yyyy", new Date());
  const hashDate = getDateTimestampString(date);
  return {
    ...item,
    activityDate: {
      date,
      isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
      isLastOfDay: !nextItemDate || !isSameDay(date, nextItemDate),
      day: dateDay,
      formattedDate: formattedDay,
      prefix: generateDatePrefix(dateDay, false, t),
      hashDate
    }
  };
});
