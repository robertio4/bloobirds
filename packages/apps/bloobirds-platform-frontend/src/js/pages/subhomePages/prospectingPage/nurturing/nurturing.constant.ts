import {
  BOBJECT_TYPES,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';

import { MatchRows } from '../../../../typings/moreFilters';

export const nurturingFilterFields = [
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.BUYING_ROLE,
];

export const SORT_FIELDS: any = {
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
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
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
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  assignedDateMostRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE}`,
      direction: 'DESC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  assignedDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE}`,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
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

export const nurturingORs = {
  [BOBJECT_TYPES.COMPANY]: {
    [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
      query: {
        [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [COMPANY_STAGE_LOGIC_ROLE.PROSPECT, MatchRows.EMPTY],
        [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: [COMPANY_STATUS_LOGIC_ROLE.NURTURING],
      },
      searchMode: 'SUBQUERY__SEARCH',
    },
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: ['__MATCH_EMPTY_ROWS__'],
  },
  [BOBJECT_TYPES.LEAD]: {
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
      query: {
        [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [LEAD_STAGE_LOGIC_ROLE.PROSPECT, MatchRows.EMPTY],
        [LEAD_FIELDS_LOGIC_ROLE.STATUS]: [LEAD_STATUS_LOGIC_ROLE.NURTURING],
      },
      searchMode: 'SUBQUERY__SEARCH',
    },
  },
};

export const nurturingORsWoFullSales = {
  [BOBJECT_TYPES.COMPANY]: {
    [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
      query: {
        [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: [COMPANY_STATUS_LOGIC_ROLE.NURTURING],
      },
      searchMode: 'SUBQUERY__SEARCH',
    },
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: ['__MATCH_EMPTY_ROWS__'],
  },
  [BOBJECT_TYPES.LEAD]: {
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
      query: {
        [LEAD_FIELDS_LOGIC_ROLE.STATUS]: [LEAD_STATUS_LOGIC_ROLE.NURTURING],
      },
      searchMode: 'SUBQUERY__SEARCH',
    },
  },
};

export const nurturingCardFieldsArray = (bobjectType: BobjectTypes.Lead | BobjectTypes.Company) => {
  const nurturingReasonsLR = FIELDS_LOGIC_ROLE[bobjectType].NURTURING_REASONS;
  return [
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    TASK_FIELDS_LOGIC_ROLE.TITLE,
    'CUSTOM_TASK_TIMEZONE',
    LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
    COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
    TASK_FIELDS_LOGIC_ROLE.LEAD,
    TASK_FIELDS_LOGIC_ROLE.COMPANY,
    nurturingReasonsLR,
    COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
    TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    TASK_FIELDS_LOGIC_ROLE.PRIORITY,
  ];
};
