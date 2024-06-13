import { useEffect, useMemo, useState } from 'react';

import { useFullSalesEnabled } from '@bloobirds-it/hooks';
import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  BobjectId,
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';

interface hasCadenceBobject {
  id: BobjectId;
  companyId: string;
}

export const useHasCadenceStarted = (bobject: hasCadenceBobject) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFullSalesEnabled = useFullSalesEnabled(bobject?.id?.accountId);
  const bobjectType = bobject?.id?.typeName;

  const searchRequest = useMemo(() => {
    if (!bobject) {
      return null;
    }
    const query = {};
    switch (bobjectType) {
      case BobjectTypes.Company: {
        query[TASK_FIELDS_LOGIC_ROLE.COMPANY] = [bobject?.id.value];
        query[TASK_FIELDS_LOGIC_ROLE.LEAD] = ['__MATCH_EMPTY_ROWS__'];
        if (isFullSalesEnabled) {
          query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = ['__MATCH_EMPTY_ROWS__'];
        }
        break;
      }
      case BobjectTypes.Lead: {
        query[TASK_FIELDS_LOGIC_ROLE.LEAD] = [bobject?.id.value];
        if (isFullSalesEnabled) {
          query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = ['__MATCH_EMPTY_ROWS__'];
        }
        break;
      }
      case BobjectTypes.Opportunity: {
        if (bobject.companyId) {
          query[TASK_FIELDS_LOGIC_ROLE.COMPANY] = [bobject.companyId];
        }
        query[TASK_FIELDS_LOGIC_ROLE.LEAD] = ['__MATCH_EMPTY_ROWS__'];
        query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = [bobject?.id.value];
        break;
      }
    }

    return {
      query: {
        ...query,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
          TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
          TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
        ],
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.START_CADENCE],
      },
      formFields: true,
      pageSize: 10,
      injectReferences: true,
    };
  }, [bobject]);

  const { data } = useSearchSubscription(searchRequest, BobjectTypes.Task);

  useEffect(() => {
    if (data) {
      setHasStarted(!!data.data.contents.length);
      setIsLoading(false);
    }
  }, [data]);

  return {
    isLoading,
    hasStarted,
  };
};
