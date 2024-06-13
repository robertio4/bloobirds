import { useMemo } from 'react';
import { BobjectType } from '../../../typings/bobjects';

export const useBulkActionsPanel = (bobjectType: BobjectType) => {
  const availableActions = useMemo((): BulkActionsPanelTypes[] => {
    switch (bobjectType) {
      case 'Company':
        return ['editProperties', 'assign', 'changeStatus', 'editTargetMarket', 'resync', 'delete'];
      case 'Lead':
        return [
          'editProperties',
          'assign',
          'changeStatus',
          'editBuyerPersonas',
          'resync',
          'delete',
        ];
      case 'Opportunity':
        return ['editProperties', 'assign', 'changeStatus', 'resync', 'delete'];
      case 'Task':
      case 'Activity':
        return ['editProperties', 'resync', 'delete'];
    }
  }, [bobjectType]);

  return { availableActions };
};
