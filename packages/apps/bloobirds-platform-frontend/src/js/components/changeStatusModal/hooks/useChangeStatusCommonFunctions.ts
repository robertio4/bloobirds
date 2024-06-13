import {
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  Bobject,
  FIELDS_LOGIC_ROLE,
  LogicRoleType,
  BobjectTypes,
} from '@bloobirds-it/types';
import useSWR from 'swr';

import { ServiceApi } from '../../../misc/api/service';
import { getFieldByLogicRole } from '../../../utils/bobjects.utils';

export const useChangeStatusCommonFunctions = () => {
  const fetchReasons = (bobjectType: string, isInSalesStage: boolean) => {
    const { data } = useSWR(
      `/service/view/field/statusReasons/${bobjectType}${isInSalesStage ? '?stage=SALES' : ''}`,
      (url: string) => ServiceApi.request({ url, method: 'GET' }),
    );
    return data;
  };
  const fetchNurturingAndDiscardedReasons = (bobjectType: string, isInSalesStage: boolean) => {
    const reasons = fetchReasons(bobjectType, isInSalesStage);
    if (bobjectType === 'Opportunity') {
      return undefined;
    }
    const nurturingLR = `${bobjectType.toUpperCase()}__${
      isInSalesStage ? 'SALES_' : ''
    }NURTURING_REASONS`;
    const discardedLR = `${bobjectType.toUpperCase()}__${
      isInSalesStage ? 'SALES_' : ''
    }DISCARDED_REASONS`;
    const onHoldLR = `${bobjectType.toUpperCase()}__${
      isInSalesStage ? 'SALES_' : ''
    }ON_HOLD_REASONS`;

    if (!reasons || !Array.isArray(reasons) || reasons.length < 1)
      return {
        [nurturingLR]: undefined,
        [discardedLR]: undefined,
        [onHoldLR]: undefined,
      };
    return {
      [nurturingLR]: reasons.find(
        (reasonType: { logicRole: string }) => reasonType.logicRole === nurturingLR,
      )?.fieldValues,
      [discardedLR]: reasons.find(
        (reasonType: { logicRole: string }) => reasonType.logicRole === discardedLR,
      )?.fieldValues,
      [onHoldLR]: reasons.find(
        (reasonType: { logicRole: string }) => reasonType.logicRole === onHoldLR,
      )?.fieldValues,
    };
  };
  const getStatusReason = (
    bobject: Bobject,
    bobjectType: 'Company' | 'Lead',
    statusLR = '',
  ): string => {
    const lr = ((): LogicRoleType<BobjectTypes> => {
      switch (statusLR) {
        case COMPANY_STATUS_LOGIC_ROLE.NURTURING:
        case LEAD_STATUS_LOGIC_ROLE.NURTURING:
          return FIELDS_LOGIC_ROLE[bobjectType].NURTURING_REASONS;
        case COMPANY_STATUS_LOGIC_ROLE.DISCARDED:
        case LEAD_STATUS_LOGIC_ROLE.DISCARDED:
          return FIELDS_LOGIC_ROLE[bobjectType].DISCARDED_REASONS;
        case COMPANY_STATUS_LOGIC_ROLE.ON_HOLD:
        case LEAD_STATUS_LOGIC_ROLE.ON_HOLD:
          return FIELDS_LOGIC_ROLE[bobjectType].ON_HOLD_REASONS;
        case COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING:
        case LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING:
          return FIELDS_LOGIC_ROLE[bobjectType].SALES_NURTURING_REASONS;
        case COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED:
        case LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED:
          return FIELDS_LOGIC_ROLE[bobjectType].SALES_DISCARDED_REASONS;
        case COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD:
        case LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD:
          return FIELDS_LOGIC_ROLE[bobjectType].SALES_ON_HOLD_REASONS;
        default:
          return undefined;
      }
    })();
    return getFieldByLogicRole(bobject, lr)?.value;
  };
  return { fetchReasons, fetchNurturingAndDiscardedReasons, getStatusReason };
};
