import {
  Bobject,
  BobjectTypes,
  LogicRoleType,
  TASK_AUTOMATED_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  addHoursToStringDate,
  generateDatePrefix,
  getDateTimestampString,
  getUserTimeZone,
} from '@bloobirds-it/utils';
import { format, isSameDay, isValid, parse } from 'date-fns';
import { TFunction } from 'i18next';
import spacetime from 'spacetime';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../constants/opportunity';
import { useContactBobjects } from '../pages/contactPages/contactPageContext';
import { getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole } from './bobjects.utils';
import { getCurrentTimeBeautiful, getCurrentTimeSimple } from './timezones.utils';

export const addTaskDateGrouping = (
  items: Bobject[],
  dateLogicRole: LogicRoleType<BobjectTypes.Task>,
  isOverdue: (item: Bobject) => boolean,
  t: TFunction,
) =>
  items.map((item, index) => {
    const isItemOverdue = isOverdue(item);
    const date = new Date(addHoursToStringDate(getValueFromLogicRole(item, dateLogicRole)));
    const previous = items[index - 1];
    const previousItemDate =
      previous && new Date(addHoursToStringDate(getValueFromLogicRole(previous, dateLogicRole)));
    const formattedDay = isValid(date) ? format(date, 'MMMM do, yyyy') : '';
    const dateDay = isValid(date) ? parse(formattedDay, 'MMMM do, yyyy', new Date()) : '';
    const hashDate = getDateTimestampString(date);

    return {
      ...item,
      taskDate: {
        isFirstOfDay: !previousItemDate || (!isSameDay(date, previousItemDate) && !isItemOverdue),
        day: dateDay,
        formattedDate: !isItemOverdue && formattedDay,
        prefix: !isItemOverdue ? generateDatePrefix(date, true, t) : 'Overdue',
        hashDate,
      },
    };
  });

export const isAfterToday = function (date: Date, userTimezone: string) {
  return spacetime(date).goto(userTimezone).isAfter(spacetime.today().endOf('day'));
};

export const isBeforeToday = function (date: Date, userTimezone: string) {
  return spacetime(date).goto(userTimezone).isBefore(spacetime.today().startOf('day'));
};

export const isToday = function (date: Date, userTimezone: string) {
  const dateTime = spacetime(date).goto(userTimezone);
  const startOfDay = spacetime.today().startOf('day');
  const endOfDay = spacetime.today().endOf('day');

  return (
    (dateTime.isBefore(endOfDay) || dateTime.isEqual(endOfDay)) &&
    (dateTime.isAfter(startOfDay) || dateTime.isEqual(startOfDay))
  );
  /*const todayDate = spacetime(date).day();
  const todayWeek = spacetime(date).week();
  const todayDayInTimezone = spacetime.today(userTimezone).day();
  const todayWeekInTimezone = spacetime.today(userTimezone).week();

  return todayDate === todayDayInTimezone && todayWeekInTimezone === todayWeek;*/
};

export function canBeMarkedAsDone(task: {
  status: any;
  type: any;
  date: any;
  lastAttemptDate?: any;
  skippable?: any;
}) {
  //Check if task.date is an ISO date with time
  const useDateTime = task.date && task.date.length > 10;
  if (task.skippable) {
    return {
      disabled: false,
      reason:
        task.status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE
          ? 'When you complete this task it will be marked as Completed Overdue'
          : 'Mark as done',
    };
  }

  if (task.type === TASK_TYPE.NEXT_STEP || task.type === TASK_TYPE.MEETING) {
    return {
      disabled: false,
      reason: 'Mark as done',
    };
  }

  const beforeToday = isBeforeToday(task.date, getUserTimeZone());
  const spaceTimeDate = spacetime(task.date);
  const spaceTimeToday = spacetime.today();
  const spaceTimeDateisBeforeToday = spaceTimeDate.isBefore(spaceTimeToday);

  if (
    task.type === TASK_TYPE.PROSPECT_CADENCE &&
    task.status === TASK_STATUS_VALUE_LOGIC_ROLE.TODO
  ) {
    // Future
    const isFutureWithTime = useDateTime && isAfterToday(task.date, getUserTimeZone());
    if (useDateTime ? isFutureWithTime : spaceTimeDate.isAfter(spaceTimeToday)) {
      return {
        disabled: true,
        reason: 'This is a task for the future. You cannot mark it as done.',
      };
    }

    // Past
    const isPastWithTime = useDateTime && beforeToday;
    if (useDateTime ? isPastWithTime : spaceTimeDateisBeforeToday) {
      return {
        disabled: false,
        reason: 'Mark as done',
      };
    }

    // Today
    const isTodayWithTime = useDateTime && isToday(task.date, getUserTimeZone());
    if (useDateTime ? isTodayWithTime : spaceTimeDate.isEqual(spaceTimeToday)) {
      const disabled =
        !task.lastAttemptDate ||
        (task.lastAttemptDate &&
          (useDateTime
            ? isBeforeToday(task.lastAttemptDate, getUserTimeZone())
            : spacetime(task.lastAttemptDate).isBefore(spaceTimeToday)));
      return {
        disabled,
        reason: disabled ? 'Make at least one attempt to mark as done' : 'Mark as done',
      };
    }
  }

  if (
    task.type === TASK_TYPE.PROSPECT_CADENCE &&
    task.status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE &&
    (useDateTime ? beforeToday : spaceTimeDateisBeforeToday)
  ) {
    const disabled =
      !task.lastAttemptDate || spacetime(task.lastAttemptDate).isBefore(spaceTimeDate);
    return {
      disabled,
      reason: disabled
        ? 'Make at least one attempt to mark as done'
        : 'When you complete this task it will be marked as Completed Overdue',
    };
  }
  // We should never get here, but just in case
  return {
    disabled: false,
    reason: 'Mark as done',
  };
}

export const getButtonMarkAsDone = ({
  bobjectLastAttemptDate,
  taskStatus,
  taskType,
  taskIsAutomated,
  taskDateField,
}: {
  bobjectLastAttemptDate: Date | string;
  taskStatus: string;
  taskType: string;
  taskIsAutomated: string;
  taskDateField: string;
}): { disabled: boolean; tooltip: string } => {
  const { disabled, reason } = canBeMarkedAsDone({
    skippable: taskIsAutomated !== TASK_AUTOMATED_VALUE.AUTOMATED_YES,
    status: taskStatus,
    type: taskType,
    date: taskDateField,
    lastAttemptDate: bobjectLastAttemptDate,
  });
  return {
    disabled,
    tooltip: reason,
  };
};

export const getTaskReferenceBobject = (bobject: Bobject<BobjectTypes.Task>) => {
  if (!bobject) {
    throw new Error('bobject parameter is required');
  }
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;

  if (opportunity) {
    return opportunity;
  } else if (lead) {
    return lead;
  } else if (company) {
    return company;
  }
};

export const getTaskLocalTime = (task: Bobject, small = false): string => {
  if (!task) {
    throw new Error('task parameter is required');
  }
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  let lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  if (opportunity && !lead) {
    const contactBobjects = useContactBobjects();
    const leadId = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT)
      ?.value;
    const filteredLeads = contactBobjects?.leads?.filter(lead => leadId === lead?.id?.value);
    if (filteredLeads?.length > 0) lead = filteredLeads[0];
  }
  if (lead) {
    const leadTimeZone = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.TIME_ZONE);
    const leadNowTime = leadTimeZone && getCurrentTimeBeautiful(leadTimeZone);
    if (leadNowTime) return leadNowTime;
  }
  const companyCountry = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY);
  const companyTimeZone = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE);
  return small
    ? getCurrentTimeSimple(companyTimeZone ?? companyCountry)
    : getCurrentTimeBeautiful(companyTimeZone ?? companyCountry);
};
