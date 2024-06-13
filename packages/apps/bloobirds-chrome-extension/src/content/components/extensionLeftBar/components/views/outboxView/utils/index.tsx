import { TASK_STATUS_VALUE_LOGIC_ROLE } from '@bloobirds-it/types';
import {
  getDateTimestampString,
  getValueFromLogicRole,
  generateDatePrefix,
} from '@bloobirds-it/utils';
import { format, isSameDay, parse } from 'date-fns';

export const taskStatus = [
  TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
  TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
  TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED,
];

export const addDateGrouping = items =>
  items.map((item, index) => {
    const { date } = item.activityDate;
    const previous = items[index - 1];
    const previousItemDate = previous && previous.activityDate.date;
    return {
      ...item,
      activityDate: {
        ...item.activityDate,
        isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
      },
    };
  });

export const addActivityDateGrouping = (items, dateLogicRole, t) =>
  items.map((item, index) => {
    const date = new Date(getValueFromLogicRole(item, dateLogicRole));
    const previous = items[index - 1];
    const previousItemDate = previous && new Date(getValueFromLogicRole(previous, dateLogicRole));
    const formattedDay = format(date, 'MMMM do, yyyy');
    const dateDay = parse(formattedDay, 'MMMM do, yyyy', new Date());
    const hashDate = getDateTimestampString(date);
    return {
      ...item,
      activityDate: {
        date,
        isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
        day: dateDay,
        formattedDate: formattedDay,
        prefix: generateDatePrefix(dateDay, false, t),
        hashDate,
      },
    };
  });
