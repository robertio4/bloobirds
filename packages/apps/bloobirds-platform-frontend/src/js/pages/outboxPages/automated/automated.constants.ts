import { TASK_FIELDS_LOGIC_ROLE, BobjectTypes } from '@bloobirds-it/types';
import { addDays, addMonths, endOfDay, startOfDay } from 'date-fns';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { MatchRows } from '../../../typings/moreFilters';

export const SORT_FIELDS = {
  select: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY}`,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  scheduledDateDesc: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'DESC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY}`,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  highPriority: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY}`,
      direction: 'ASC',
    },
  ],
  timeZone: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY}`,
      direction: 'ASC',
    },
  ],
  assignedDateMostRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE}`,
      direction: 'DESC',
    },
  ],
  assignedDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE}`,
      direction: 'ASC',
    },
  ],
  lastAttemptMostRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY}`,
      direction: 'DESC',
    },
  ],
  lastAttemptOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY}`,
      direction: 'ASC',
    },
  ],
  lastUpdateMostRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'ASC',
    },
  ],
};

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

export const compoundableQueriesByBobjectAutomated = {
  [BobjectTypes.Lead]: {
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: [MatchRows.FULL],
    [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [MatchRows.EMPTY],
  },
  [BobjectTypes.Company]: {
    [TASK_FIELDS_LOGIC_ROLE.COMPANY]: [MatchRows.FULL],
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: [MatchRows.EMPTY],
    [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [MatchRows.EMPTY],
  },
  [BobjectTypes.Opportunity]: {
    [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [MatchRows.FULL],
  },
};
