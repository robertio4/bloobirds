import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  LogicRoleType,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { endOfDay } from '@bloobirds-it/utils';

import { Stages } from '../../../view.utils';

type queryType =
  | {
      query: Record<LogicRoleType<BobjectTypes>, any>;
      searchMode: string;
    }
  | Array<string>;

export const getTypeOptions = id => {
  switch (id) {
    case 'onCadence':
      return [TASK_TYPE.PROSPECT_CADENCE];
    case 'manualTasks':
      return [TASK_TYPE.NEXT_STEP];
    case 'meetingReminders':
      return [TASK_TYPE.CONTACT_BEFORE_MEETING];
    default:
      return [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP, TASK_TYPE.CONTACT_BEFORE_MEETING];
  }
};

export const getQueries = (stage: Stages, subquery: { [x: string]: any }) => {
  if ((subquery || []).length > 0) {
    return subquery;
  }

  const queries: Array<Record<LogicRoleType<BobjectTypes.Task>, queryType>> = [
    {
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
        query: {
          [COMPANY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'],
          [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: {
            query: [COMPANY_STATUS_LOGIC_ROLE.NURTURING],
            searchMode: 'NOT__SEARCH',
          },
          [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: {
            query: [COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING],
            searchMode: 'NOT__SEARCH',
          },
          ...(stage !== 'ALL' && {
            [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
              stage === 'PROSPECT'
                ? COMPANY_STAGE_LOGIC_ROLE.PROSPECT
                : COMPANY_STAGE_LOGIC_ROLE.SALES,
            ],
          }),
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
        query: {
          [LEAD_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'],
          [LEAD_FIELDS_LOGIC_ROLE.STATUS]: {
            query: [LEAD_STATUS_LOGIC_ROLE.NURTURING],
            searchMode: 'NOT__SEARCH',
          },
          [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: {
            query: [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING],
            searchMode: 'NOT__SEARCH',
          },
          ...(stage !== 'ALL' && {
            [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [
              stage === 'PROSPECT' ? LEAD_STAGE_LOGIC_ROLE.PROSPECT : LEAD_STAGE_LOGIC_ROLE.SALES,
            ],
          }),
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: ['__MATCH_EMPTY_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: ['__MATCH_EMPTY_ROWS__'],
    },
  ];

  if (stage !== 'PROSPECT') {
    queries.push({
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: {
        query: {
          [OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'],
          [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: {
            query: [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING],
            searchMode: 'NOT__SEARCH',
          },
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
    });
  }

  return queries;
};

export const getQuery = (taskTypeOptions, userId) => {
  return {
    [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypeOptions,
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
    ],
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        lte: endOfDay(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
    [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
      '__MATCH_EMPTY_ROWS__',
      TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO,
    ],
  };
};
