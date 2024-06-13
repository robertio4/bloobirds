import { TASK_ACTION, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
} from '../../../../constants/company';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
} from '../../../../constants/lead';

export const followUpFilterFields = [
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
];

export const SORT_FIELDS = {
  closeDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'ASC',
    },
  ],
  closeDateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
  ],
  amount: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
  ],
  stage: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
  ],
  select: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY}`,
      direction: 'ASC',
    },
  ],
  creationDateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME}`,
      direction: 'DESC',
    },
  ],
  creationDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME}`,
      direction: 'ASC',
    },
  ],
  lastUpdateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'ASC',
    },
  ],
};

export const nurturingSubQueryTypes = {
  [BOBJECT_TYPES.OPPORTUNITY]: {
    [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'],
  },
  [BOBJECT_TYPES.COMPANY]: {
    [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
      query: {
        [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [COMPANY_STAGE_LOGIC_ROLE.SALES],
        [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: [
          COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING,
        ],
      },
      searchMode: 'SUBQUERY__SEARCH',
    },
    [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'],
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: ['__MATCH_EMPTY_ROWS__'],
  },
  [BOBJECT_TYPES.LEAD]: {
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
      query: {
        [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [LEAD_STAGE_LOGIC_ROLE.SALES],
        [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING],
      },
      searchMode: 'SUBQUERY__SEARCH',
    },
  },
};
