import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { format, isSameDay, isValid, parse } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { COMPANY_FIELDS_LOGIC_ROLE } from "/src/utils/company.ts.js";
import {
  addHoursToStringDate,
  generateDatePrefix,
  getDateTimestampString,
  getUserTimeZone
} from "/src/utils/dates.ts.js";
import { LEAD_FIELDS_LOGIC_ROLE } from "/src/utils/lead.ts.js";
import {
  TASK_AUTOMATED_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE
} from "/src/utils/task.ts.js";
import { getCurrentTimeBeautiful, getCurrentTimeSimple } from "/src/utils/timezones.utils.ts.js";
export const addTaskDateGrouping = (items, dateLogicRole, isOverdue) => items?.map((item, index) => {
  const isItemOverdue = isOverdue(item);
  const date = new Date(addHoursToStringDate(getValueFromLogicRole(item, dateLogicRole)));
  const previous = items[index - 1];
  const previousItemDate = previous && new Date(addHoursToStringDate(getValueFromLogicRole(previous, dateLogicRole)));
  const formattedDay = isValid(date) ? format(date, "MMMM do, yyyy") : "";
  const dateDay = isValid(date) ? parse(formattedDay, "MMMM do, yyyy", new Date()) : "";
  const hashDate = getDateTimestampString(date);
  return {
    ...item,
    taskDate: {
      isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate) && !isItemOverdue,
      day: dateDay,
      formattedDate: !isItemOverdue && formattedDay,
      prefix: !isItemOverdue ? generateDatePrefix(date, true) : "Overdue",
      hashDate
    }
  };
});
export const isAfterToday = function(date, userTimezone) {
  return spacetime(date).goto(userTimezone).isAfter(spacetime.today().endOf("day"));
};
export const isBeforeToday = function(date, userTimezone) {
  return spacetime(date).goto(userTimezone).isBefore(spacetime.today().startOf("day"));
};
export const isToday = function(date, userTimezone) {
  const dateTime = spacetime(date).goto(userTimezone);
  const startOfDay = spacetime.today().startOf("day");
  const endOfDay = spacetime.today().endOf("day");
  return (dateTime.isBefore(endOfDay) || dateTime.isEqual(endOfDay)) && (dateTime.isAfter(startOfDay) || dateTime.isEqual(startOfDay));
};
export function canBeMarkedAsDone(task) {
  const { t } = useTranslation();
  const useDateTime = task.date && task.date.length > 10;
  if (task.skippable) {
    return {
      disabled: false,
      reason: task.status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE ? t("extension.card.markAsDoneOverdue") : t("extension.card.markAsDone")
    };
  }
  if (task.type === TASK_TYPE.NEXT_STEP || task.type === TASK_TYPE.MEETING) {
    return {
      disabled: false,
      reason: t("extension.card.markAsDone")
    };
  }
  const beforeToday = isBeforeToday(task.date, getUserTimeZone());
  const spaceTimeDate = spacetime(task.date);
  const spaceTimeToday = spacetime.today();
  const spaceTimeDateisBeforeToday = spaceTimeDate.isBefore(spaceTimeToday);
  if (task.type === TASK_TYPE.PROSPECT_CADENCE && task.status === TASK_STATUS_VALUE_LOGIC_ROLE.TODO) {
    const isFutureWithTime = useDateTime && isAfterToday(task.date, getUserTimeZone());
    if (useDateTime ? isFutureWithTime : spaceTimeDate.isAfter(spaceTimeToday)) {
      return {
        disabled: true,
        reason: t("extension.card.markAsDoneFuture")
      };
    }
    const isPastWithTime = useDateTime && beforeToday;
    if (useDateTime ? isPastWithTime : spaceTimeDateisBeforeToday) {
      return {
        disabled: false,
        reason: t("extension.card.markAsDone")
      };
    }
    const isTodayWithTime = useDateTime && isToday(task.date, getUserTimeZone());
    if (useDateTime ? isTodayWithTime : spaceTimeDate.isEqual(spaceTimeToday)) {
      const disabled = !task.lastAttemptDate || task.lastAttemptDate && (useDateTime ? isBeforeToday(task.lastAttemptDate, getUserTimeZone()) : spacetime(task.lastAttemptDate).isBefore(spaceTimeToday));
      return {
        disabled,
        reason: disabled ? t("extension.card.markAsDoneAttempt") : t("extension.card.markAsDone")
      };
    }
  }
  if (task.type === TASK_TYPE.PROSPECT_CADENCE && task.status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE && (useDateTime ? beforeToday : spaceTimeDateisBeforeToday)) {
    const disabled = !task.lastAttemptDate || spacetime(task.lastAttemptDate).isBefore(spaceTimeDate);
    return {
      disabled,
      reason: disabled ? t("extension.card.markAsDoneAttempt") : t("extension.card.markAsDoneOverdue")
    };
  }
  return {
    disabled: false,
    reason: t("extension.card.markAsDone")
  };
}
export const getButtonMarkAsDone = ({
  bobjectLastAttemptDate,
  taskStatus,
  taskType,
  taskIsAutomated,
  taskDateField
}) => {
  const { disabled, reason } = canBeMarkedAsDone({
    skippable: taskIsAutomated !== TASK_AUTOMATED_VALUE.AUTOMATED_YES,
    status: taskStatus,
    type: taskType,
    date: taskDateField,
    lastAttemptDate: bobjectLastAttemptDate
  });
  return {
    disabled,
    tooltip: reason
  };
};
export const getTaskReferenceBobject = (bobject) => {
  if (!bobject) {
    throw new Error("bobject parameter is required");
  }
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;
  if (opportunity) {
    return opportunity;
  } else if (lead) {
    return lead;
  } else {
    return company;
  }
};
export const getTaskLocalTime = (task, small = false) => {
  if (!task) {
    throw new Error("task parameter is required");
  }
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  if (lead) {
    const leadTimeZone = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.TIME_ZONE);
    const leadNowTime = leadTimeZone && getCurrentTimeBeautiful(leadTimeZone);
    if (leadNowTime)
      return leadNowTime;
  }
  const companyCountry = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY);
  const companyTimeZone = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE);
  return small ? getCurrentTimeSimple(companyTimeZone ?? companyCountry) : getCurrentTimeBeautiful(companyTimeZone ?? companyCountry);
};
