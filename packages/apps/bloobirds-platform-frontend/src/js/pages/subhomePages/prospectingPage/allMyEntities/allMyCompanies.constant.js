import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';

export const allMyCompaniesAdminFilterFields = [
  COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
];

export const allMyCompaniesUserFilterFields = [
  ...allMyCompaniesAdminFilterFields,
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
];

export const SORT_FIELDS = {
  highPriority: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY,
      direction: 'DESC',
    },
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  timeZone: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE,
      direction: 'DESC',
    },
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  country: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
      direction: 'ASC',
    },
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  source: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
      direction: 'ASC',
    },
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  cadence: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.CADENCE,
      direction: 'ASC',
    },
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  mrRating: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.MR_RATING,
      direction: 'ASC',
    },
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  assignedDateRecent: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  assignedDateOldest: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'ASC',
    },
  ],
  lastAttemptRecent: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
      direction: 'DESC',
    },
  ],
  lastAttemptOldest: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
      direction: 'ASC',
    },
  ],
  lastUpdateRecent: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'ASC',
    },
  ],
  name: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.NAME,
      direction: 'ASC',
    },
  ],
};
