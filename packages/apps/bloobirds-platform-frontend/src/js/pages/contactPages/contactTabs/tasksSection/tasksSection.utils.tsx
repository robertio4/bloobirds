import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { addHoursToStringDate, getDateTimestampString } from '@bloobirds-it/utils';
import { format, isToday, isValid, parse } from 'date-fns';
import {
  getFieldByLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';

const generateDatePrefix = (date: Date, isCompleted: boolean, isOverdue: boolean) => {
  let prefix = isToday(date) ? 'Today' : 'Future tasks';

  if (isOverdue) {
    prefix = 'Overdue';
  }
  if (isCompleted) {
    prefix = 'Completed';
  }

  return prefix;
};

const isCompletedTask = (taskStatus: string) =>
  [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
    TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED,
  ].includes(taskStatus);

export const addTaskDateGrouping = (
  items: any,
  dateLogicRole: string,
  isOverdue: (value: string) => boolean,
) =>
  items.map((item: any, index: number) => {
    const isItemOverdue = isOverdue(item);
    const itemStatus = getFieldByLogicRole(item, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
    const isItemCompleted = isCompletedTask(itemStatus);
    const itemDate = new Date(addHoursToStringDate(getValueFromLogicRole(item, dateLogicRole)));
    const previousItem = items[index - 1];
    const previousItemDate =
      previousItem &&
      new Date(addHoursToStringDate(getValueFromLogicRole(previousItem, dateLogicRole)));
    const previousItemStatus = getFieldByLogicRole(previousItem, TASK_FIELDS_LOGIC_ROLE.STATUS)
      ?.valueLogicRole;
    const isPreviousItemCompleted = isCompletedTask(previousItemStatus);
    const previousItemPrefix = generateDatePrefix(
      previousItemDate,
      isPreviousItemCompleted,
      isOverdue(previousItem),
    );
    const formattedDay = isValid(itemDate) ? format(itemDate, 'MMMM do, yyyy') : '';
    const dateDay = isValid(itemDate) ? parse(formattedDay, 'MMMM do, yyyy', new Date()) : '';
    const hashDate = getDateTimestampString(itemDate);
    const prefix = generateDatePrefix(itemDate, isItemCompleted, isItemOverdue);

    return {
      ...item,
      taskDate: {
        isFirstOfDay: !previousItemDate || prefix !== previousItemPrefix,
        isOverdue: isItemOverdue,
        day: dateDay,
        formattedDate: !isItemOverdue && formattedDay,
        prefix,
        hashDate,
      },
    };
  });
