import { useSearchSubscription } from '@bloobirds-it/plover';

import { BOBJECT_TYPES } from '@bloobirds-it/types';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from '../../../../constants/company';
import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../../utils/bobjects.utils';
import { startOfDay } from '@bloobirds-it/utils';

const ACTIVE_STATUSES = [
  COMPANY_STATUS_LOGIC_ROLE.ON_PROSPECTION,
  COMPANY_STATUS_LOGIC_ROLE.READY_TO_PROSPECT,
  COMPANY_STATUS_LOGIC_ROLE.CONTACTED,
  COMPANY_STATUS_LOGIC_ROLE.ENGAGED,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.CLIENT,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD,
];

export const useCompanyInactive = ({ company }) => {
  const isStageSales = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STAGE) === 'Sales';
  const status = getFieldByLogicRole(
    company,
    COMPANY_FIELDS_LOGIC_ROLE[isStageSales ? 'SALES_STATUS' : 'STATUS'],
  )?.valueLogicRole;
  const salesFeatureEnabled = useFullSalesEnabled();
  const query = {
    [TASK_FIELDS_LOGIC_ROLE.COMPANY]: company?.id?.value,
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

  if (salesFeatureEnabled) {
    query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = ['__MATCH_EMPTY_ROWS__'];
  }

  const { data: { data: { totalMatching: tasksCount } = {} } = {} } = useSearchSubscription(
    null,
    BOBJECT_TYPES.TASK,
  );

  return ACTIVE_STATUSES.includes(status) && tasksCount === 0;
};
