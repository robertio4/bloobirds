import { Text } from '@bloobirds-it/flamingo-ui';
import { TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE } from '@bloobirds-it/types';
import { formatDate, getFieldByLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';
import { isPast, isToday } from 'date-fns';

export const parseCalendarData = (data: any, showOverdue: boolean) => {
  const tasksDates = data?.map((task: any) => {
    const scheduledDate = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
    const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
    if (
      isPast(new Date(scheduledDate)) &&
      [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE].includes(status) &&
      showOverdue
    ) {
      return formatDate(new Date(), 'yyyy-MM-dd');
    }
    return formatDate(new Date(scheduledDate), 'yyyy-MM-dd');
  });

  return tasksDates?.reduce((taskCounter: any, currentDate: string) => {
    if (typeof taskCounter[currentDate] !== 'undefined') {
      taskCounter[currentDate] += 1;
      return taskCounter;
    }
    taskCounter[currentDate] = 1;
    return taskCounter;
  }, {});
};
