import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { startOfDay, subDays } from 'date-fns';

import { getValueFromLogicRole } from '../../../utils/bobjects.utils';

export const checkIsOverdue = (item: object) => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));

  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};
