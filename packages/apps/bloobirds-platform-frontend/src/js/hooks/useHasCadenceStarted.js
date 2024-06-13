import { useEffect, useMemo, useState } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';

import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../constants/opportunity';
import { getValueFromLogicRole, isCompany, isLead } from '../utils/bobjects.utils';
import { useFullSalesEnabled } from './useFeatureFlags';

/**
 * @deprecated use the one in cadence in pages
 * @param bobject
 * @returns {{hasStarted: boolean}}
 */
export const useHasCadenceStarted = bobject => {
  const [hasStarted, sethasStarted] = useState(false);
  const isFullSalesEnabled = useFullSalesEnabled();
  const bobjectType = bobject?.id?.typeName;

  const fullSalesQuery = isFullSalesEnabled
    ? {
        [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]:
          bobjectType === BobjectTypes.Opportunity ? [bobject?.id.value] : ['__MATCH_EMPTY_ROWS__'],
      }
    : {};

  const searchRequest = useMemo(() => {
    if (!bobject) {
      return null;
    }
    return {
      query: {
        [TASK_FIELDS_LOGIC_ROLE.COMPANY]: isCompany(bobject)
          ? bobject?.id.value
          : getValueFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY),
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: isLead(bobject)
          ? [bobject?.id.value]
          : ['__MATCH_EMPTY_ROWS__'],
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
          TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
          TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
        ],
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.START_CADENCE],
        ...fullSalesQuery,
      },
      formFields: true,
      pageSize: 10,
      injectReferences: true,
    };
  }, [bobject, fullSalesQuery]);

  const { data } = useSearchSubscription(searchRequest, BobjectTypes.Task);

  useEffect(() => {
    if (data) {
      sethasStarted(!!data.data.contents.length);
    }
  }, [data]);

  return {
    hasStarted,
  };
};
