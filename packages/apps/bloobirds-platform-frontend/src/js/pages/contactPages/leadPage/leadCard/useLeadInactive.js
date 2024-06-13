import { useSearchSubscription } from '@bloobirds-it/plover';

import { BOBJECT_TYPES } from '@bloobirds-it/types';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '../../../../constants/lead';
import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../../utils/bobjects.utils';
import { startOfDay } from '@bloobirds-it/utils';

const ACTIVE_STATUSES = [
  LEAD_STATUS_LOGIC_ROLE.ON_PROSPECTION,
  LEAD_STATUS_LOGIC_ROLE.READY_TO_PROSPECT,
  LEAD_STATUS_LOGIC_ROLE.CONTACTED,
  LEAD_STATUS_LOGIC_ROLE.ENGAGED,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.CLIENT,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD,
];

export const useLeadInactive = ({ lead }) => {
  const isStageSales = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE) === 'Sales';
  const status = getFieldByLogicRole(
    lead,
    LEAD_FIELDS_LOGIC_ROLE[isStageSales ? 'SALES_STATUS' : 'STATUS'],
  )?.valueLogicRole;

  const query = {
    [TASK_FIELDS_LOGIC_ROLE.LEAD]: lead?.id?.value,
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
    null,
    BOBJECT_TYPES.TASK,
  );

  return ACTIVE_STATUSES.includes(status) && tasksCount === 0;
};
