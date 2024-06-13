import { useEffect, useState } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  BOBJECT_TYPES,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';

import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '../../../../constants/opportunity';
import { useOpportunity } from '../../../../hooks';
import { getFieldByLogicRole } from '../../../../utils/bobjects.utils';
import { startOfDay } from '@bloobirds-it/utils';

const INACTIVE_STATUSES = [
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
];

export const useOpportunityInactive = ({ opportunity }) => {
  const [isInactive, setIsInactive] = useState();
  const { oppNurturingValues } = useOpportunity('inactive');
  const oppStage = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS)
    ?.valueLogicRole;
  const query = {
    [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunity?.id?.value,
    [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [
      TASK_TYPE.PROSPECT_CADENCE,
      TASK_TYPE.NEXT_STEP,
      TASK_TYPE.START_CADENCE,
    ],
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        gte: startOfDay(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
  };

  const { data: { data: { totalMatching: tasksCount } = {} } = {} } = useSearchSubscription(
    {
      query,
      formFields: true,
      pageSize: 1000,
      injectReferences: false,
    },
    BOBJECT_TYPES.TASK,
  );

  useEffect(() => {
    if (
      !INACTIVE_STATUSES.concat(oppNurturingValues?.map(value => value.logicRole))?.includes(
        oppStage,
      )
    )
      setIsInactive(tasksCount === 0);
  }, [tasksCount]);

  return isInactive;
};
