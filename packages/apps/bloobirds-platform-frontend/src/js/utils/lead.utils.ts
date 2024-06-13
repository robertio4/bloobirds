import { LEAD_SALES_STATUS_VALUES_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE } from '../constants/lead';

export const isDiscarded = (status: string) =>
  status === LEAD_STATUS_LOGIC_ROLE.DISCARDED ||
  status === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED;
export const isNurturing = (status: string) =>
  status === LEAD_STATUS_LOGIC_ROLE.NURTURING ||
  status === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING;
