import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';

export const inactiveOppsFilterFields = [
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
];
