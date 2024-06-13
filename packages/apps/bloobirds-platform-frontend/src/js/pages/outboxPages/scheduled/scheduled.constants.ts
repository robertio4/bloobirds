import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { addDays, addMonths, endOfDay, startOfDay } from 'date-fns';

export const DATE_FILTER_FIELDS = {
  today: {
    query: {
      lte: endOfDay(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
  next_7_days: {
    query: {
      lte: endOfDay(addDays(new Date(), 7)),
    },
    searchMode: 'RANGE__SEARCH',
  },
  next_30_days: {
    query: {
      lte: endOfDay(addMonths(new Date(), 1)),
    },
    searchMode: 'RANGE__SEARCH',
  },
  since_today: {
    query: {
      gte: startOfDay(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
};

export const SORT_FIELDS = {
  default: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  descent: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'DESC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
};
