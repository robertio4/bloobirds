import { BobjectFieldOption, useDashboardsGroupByOptions } from './useDashboardsGroupByOptions';
import { BobjectType } from '../typings/bobjects';

export const useAdvancedGroupByOptions = (
  bobjectTypes: BobjectType[],
  excludedLogicRoles: string[],
): BobjectFieldOption[] => {
  return bobjectTypes
    .map(bobjectType => {
      return useDashboardsGroupByOptions({ bobjectType, excludedLogicRoles });
    })
    .reduce((acc: BobjectFieldOption[], typeOptions) => [...acc, ...typeOptions], []);
};
