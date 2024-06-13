import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { addDays, addMonths, endOfDay, startOfDay } from 'date-fns';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';

export const scheduledFieldFilters = [
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
  LEAD_FIELDS_LOGIC_ROLE.STATUS,
];

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
  highPriority: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY}`,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
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
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  country: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.COUNTRY}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY}`,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  source: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.SOURCE}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY}`,
      direction: 'ASC',
    },
  ],
  mrRating: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.MR_RATING}`,
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
  more_than_6_month: {
    query: {
      gte: endOfDay(addMonths(new Date(), -6)),
      lte: endOfDay(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
};
