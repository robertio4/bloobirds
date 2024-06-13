import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';

export const allMyOppsFilterFields = [
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
];

export const SORT_FIELDS = {
  closeDateOldest: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
      direction: 'ASC',
    },
  ],
  closeDateRecent: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
      direction: 'DESC',
    },
  ],
  amount: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
      direction: 'ASC',
    },
  ],
  stage: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
      direction: 'ASC',
    },
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
      direction: 'DESC',
    },
  ],
  creationDateRecent: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
      direction: 'DESC',
    },
  ],
  creationDateOldest: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
      direction: 'ASC',
    },
  ],
  lastUpdateRecent: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'ASC',
    },
  ],
};

export const VIEW_MODE = {
  LIST: 'LIST',
  KANBAN: 'KANBAN',
};
