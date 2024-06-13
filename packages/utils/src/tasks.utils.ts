import { IconType } from '@bloobirds-it/flamingo-ui';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import {
  Bobject,
  BobjectId,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  CustomTask,
  LEAD_FIELDS_LOGIC_ROLE,
  LogicRoleType,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_AUTOMATED_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { format, isSameDay, isValid, parse } from 'date-fns';
import { TFunction } from 'i18next';
import spacetime from 'spacetime';

import { getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole } from './bobjects.utils';
import {
  addHoursToStringDate,
  generateDatePrefix,
  getDateTimestampString,
  getUserTimeZone,
  isAfterToday,
  isBeforeToday,
  isToday,
} from './dates.utils';
import { getCurrentTimeBeautiful, getCurrentTimeSimple } from './timezones.utils';

const setHoursToEndDay = (item: Bobject, date: Date) => {
  if (!item) return;
  const isInCadence = isCadenceTask(item) && !isAutomatedEmailTask(item);
  if (isInCadence) date.setHours(23, 59, 59, 999);
};

export const addTaskDateGrouping = (
  items: Bobject[],
  dateLogicRole: LogicRoleType<BobjectTypes>,
  isOverdue: (item: Bobject) => boolean,
  t: TFunction,
  language: string,
) => {
  const itemsDate = items
    .map(item => {
      const date = new Date(addHoursToStringDate(getValueFromLogicRole(item, dateLogicRole)));

      setHoursToEndDay(item, date);

      return {
        ...item,
        date,
        time: date.getTime(),
      };
    })
    .sort((a, b) => a.time - b.time);

  return itemsDate.map((item, index) => {
    const isItemOverdue = isOverdue(item);
    const date = item.date;
    const previous = itemsDate[index - 1];
    const next = itemsDate[index + 1];
    const previousItemDate = previous && previous.date;
    const nextItemDate = next && next.date;
    const formatStr =
      language === 'en' ? '{month} {date-ordinal}, {year}' : '{date} {month} {year}';

    const formattedDay = isValid(date) ? getI18nSpacetimeLng(language, date).format(formatStr) : '';
    const dateDay = isValid(date)
      ? parse(format(date, 'MMMM do, yyyy'), 'MMMM do, yyyy', new Date())
      : '';
    const hashDate = getDateTimestampString(date);

    return {
      ...item,
      taskDate: {
        isFirstOfDay: !previousItemDate || (!isSameDay(date, previousItemDate) && !isItemOverdue),
        isLastOfDay:
          !nextItemDate ||
          (!isSameDay(date, nextItemDate) && !isItemOverdue) ||
          (isItemOverdue && !isOverdue(next)),
        day: dateDay,
        formattedDate: !isItemOverdue && formattedDay,
        prefix: !isItemOverdue ? generateDatePrefix(date, true, t) : t('leftBar.overdueTasks'),
        hashDate,
      },
    };
  });
};

export function canBeMarkedAsDone(task: {
  status: any;
  type: any;
  date: any;
  lastAttemptDate?: any;
  skippable?: any;
}) {
  //Check if task.date is an ISO date with time
  const useDateTime = task.date && task.date?.length > 10;
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

export const getTaskReferenceBobject = (bobject: Bobject) => {
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
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  /*const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;

    // TODO - How to get the lead without going through the url
    if (opportunity && !lead) {
    const contactBobjects = useContactBobjects();
    const leadId = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT)
      ?.value;
    const filteredLeads = contactBobjects?.leads?.filter(lead => leadId === lead?.id?.value);
    if (filteredLeads?.length > 0) lead = filteredLeads[0];
  } */
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

export const isScheduledTask = task =>
  //@ts-ignore the return of this field is an anomaly
  getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
  TASK_TYPE.NEXT_STEP;
export const isCadenceTask = task =>
  //@ts-ignore the return of this field is an anomaly
  getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
  TASK_TYPE.PROSPECT_CADENCE;
export const isImportantTask = task =>
  //@ts-ignore the return of this field is an anomaly
  getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY)?.valueLogicRole ===
  TASK_PRIORITY_VALUE.IMPORTANT;
export const isCallTask = task =>
  getFieldByLogicRole(task, TASK_ACTION.CALL)?.valueLogicRole === TASK_ACTION_VALUE.CALL_YES;
export const isEmailTask = task =>
  getFieldByLogicRole(task, TASK_ACTION.EMAIL)?.valueLogicRole === TASK_ACTION_VALUE.EMAIL_YES;
export const isAutomatedEmailTask = task =>
  getFieldByLogicRole(task, TASK_ACTION.AUTOMATED_EMAIL)?.valueLogicRole ===
  TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES;
export const isLinkedinMessageTask = task =>
  getFieldByLogicRole(task, TASK_ACTION.LINKEDIN_MESSAGE)?.valueLogicRole ===
  TASK_ACTION_VALUE.LINKEDIN_MESSAGE_YES;
export const isMeetingTypeTask = task => {
  const taskType = getFieldByLogicRole<BobjectTypes.Task>(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)
    ?.valueLogicRole;
  //@ts-ignore the return of this field is an anomaly
  return taskType === TASK_TYPE.MEETING || taskType === TASK_TYPE?.CONTACT_BEFORE_MEETING;
};
export const isCustomTask = task => {
  const customTaskId = getFieldByLogicRole<BobjectTypes.Task>(
    task,
    TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  )?.value;
  return !!customTaskId;
};

export const isWhatsAppCustomTask = (task: Bobject<BobjectTypes.Task>, customTasks) => {
  const customTaskId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)?.value;

  if (!customTaskId) {
    return false;
  }

  const customTask = customTasks?.find(ct => ct.id === customTaskId);
  return customTask?.logicRole === 'WHATSAPP';
};

export function getTaskType(task): Array<TASK_TYPE | typeof TASK_ACTION> {
  const taskTypes = [];
  if (isScheduledTask(task)) taskTypes.push(TASK_TYPE.NEXT_STEP);
  if (isCallTask(task)) taskTypes.push(TASK_ACTION.CALL);
  if (isEmailTask(task)) taskTypes.push(TASK_ACTION.EMAIL);
  if (isAutomatedEmailTask(task)) taskTypes.push(TASK_ACTION.AUTOMATED_EMAIL);
  if (isLinkedinMessageTask(task)) taskTypes.push(TASK_ACTION.LINKEDIN_MESSAGE);
  if (isMeetingTypeTask(task)) taskTypes.push(TASK_TYPE.MEETING);
  return taskTypes;
}

export const getTaskText = (
  task: Bobject,
  type: 'Title' | 'Description',
  customTasks: CustomTask[],
  showCustomDescription = true,
  t: TFunction,
): string => {
  const isScheduled = isScheduledTask(task);
  const isCustom = isCustomTask(task);
  const isCadence = isCadenceTask(task);
  const isContactBeforeMeeting = isMeetingTypeTask(task);
  const isTitle = type === 'Title';
  const title = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const description = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);

  const callAction = getFieldByLogicRole(task, TASK_ACTION.CALL)?.valueLogicRole;
  const emailAction = getFieldByLogicRole(task, TASK_ACTION.EMAIL)?.valueLogicRole;
  const isCall = callAction === TASK_ACTION_VALUE.CALL_YES;
  const isEmail = emailAction === TASK_ACTION_VALUE.EMAIL_YES;

  if (isTitle) {
    if (isContactBeforeMeeting) {
      return t('tasksTitles.contactBeforeMeeting');
    }
    if (isCadence && !isCustom) {
      let cadenceTaskTitle = '';

      switch (title?.charAt(0)) {
        case '1':
          cadenceTaskTitle = t('tasksTitles.cadenceStep.1');
          break;
        case '2':
          cadenceTaskTitle = t('tasksTitles.cadenceStep.2');
          break;
        case '3':
          cadenceTaskTitle = t('tasksTitles.cadenceStep.3');
          break;
        default:
          cadenceTaskTitle = t('tasksTitles.cadenceStep.other', {
            number: title?.charAt(0),
          });
          break;
      }
      return cadenceTaskTitle;
    }
  }

  if (isCustom) {
    const customTaskId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
    const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);
    return isTitle ? customTask?.name : showCustomDescription ? description : title;
  }

  // TODO: Take t from all places it uses the function
  if (isScheduled) {
    if (isTitle) {
      if (isCall) return t ? t('common.call') : 'call';
      if (isEmail) return t ? t('common.email') : 'email';
    }
    return isTitle ? (t ? t('common.task', { count: 1 }) : 'task') : title;
  }

  return isTitle ? title : description;
};

export const isSkippableTask: (task: Bobject) => boolean = (task: Bobject) => {
  const type =
    (getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole as TASK_TYPE) ||
    // @ts-ignore
    task?.type;
  const isAutomated = isAutomatedEmailTask(task);
  return (
    [
      TASK_TYPE.PROSPECT_CADENCE,
      TASK_TYPE.START_CADENCE,
      TASK_TYPE.CONTACT_BEFORE_MEETING,
    ].includes(type) && !isAutomated
  );
};

export function getTaskReferencedBobject(
  task: Bobject<BobjectTypes.Task>,
): {
  bobjectId: BobjectId['value'];
  bobjectName: string;
  bobjectType: BobjectTypes;
  bobjectIcon: IconType;
} {
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const bobjectId = lead?.id?.value || opportunity?.id?.value || company?.id?.value;
  const bobjectName =
    getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
    getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME) ||
    getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const bobjectType = lead
    ? BobjectTypes.Lead
    : opportunity
    ? BobjectTypes.Opportunity
    : BobjectTypes.Company;
  const bobjectIcon = lead ? 'person' : opportunity ? 'fileOpportunity' : 'company';
  return { bobjectId, bobjectName, bobjectType, bobjectIcon };
}

export function isUnassignedTask(task: Bobject<BobjectTypes.Task>): boolean {
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  return task && !company && !lead && !opportunity;
}
