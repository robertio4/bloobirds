import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';

export const inactiveLeadConstant = [
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
];

export const SORT_FIELDS = {
  highPriority: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY,
      direction: 'DESC',
    },
    {
      field: LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  name: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.NAME,
      direction: 'ASC',
    },
    {
      field: LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  source: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.SOURCE,
      direction: 'ASC',
    },
    {
      field: LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  assignedDateRecent: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'DESC',
    },
  ],
  assignedDateOldest: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_DATE,
      direction: 'ASC',
    },
  ],
  lastAttemptRecent: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
      direction: 'DESC',
    },
  ],
  lastAttemptOldest: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
      direction: 'ASC',
    },
  ],
  lastUpdateRecent: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: LEAD_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'ASC',
    },
  ],
};
