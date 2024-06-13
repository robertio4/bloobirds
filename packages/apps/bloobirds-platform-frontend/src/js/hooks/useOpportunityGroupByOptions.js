import { useDashboardsGroupByOptions } from './useDashboardsGroupByOptions';

export const useOpportunityGroupByOptions = () =>
  useDashboardsGroupByOptions({
    bobjectType: 'Opportunity',
    excludedLogicRoles: [],
  });
