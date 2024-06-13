import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';

export const companyDeliveredFilterFields = [
  COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
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
  name: [
    {
      field: COMPANY_FIELDS_LOGIC_ROLE.NAME,
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
};
