import { useDashboardsGroupByOptions } from './useDashboardsGroupByOptions';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../constants/lead';

const EXCLUDED_COMPANY_LOGIC_ROLES = [
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  COMPANY_FIELDS_LOGIC_ROLE.SCENARIO,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.DATA_SOURCE_AUTOMATED,
];

export const useCompanyGroupByOptions = () =>
  useDashboardsGroupByOptions({
    bobjectType: 'Company',
    excludedLogicRoles: EXCLUDED_COMPANY_LOGIC_ROLES,
  });
