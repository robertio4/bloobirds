import { checkIsOverdue } from '@bloobirds-it/hooks';
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';

export function hasOngoingCadenceTasks(bobject, tasks) {
  const isCompany = bobject?.id?.typeName === BobjectTypes.Company;
  const isLead = bobject?.id?.typeName === BobjectTypes.Lead;
  const isOpportunity = bobject?.id?.typeName === BobjectTypes.Opportunity;
  const cadenceTasks = tasks?.filter(
    t => !!getValueFromLogicRole(t, TASK_FIELDS_LOGIC_ROLE.CADENCE),
  );
  if (cadenceTasks?.length > 0) {
    if (isCompany) {
      return cadenceTasks?.some(
        task =>
          !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY) &&
          !getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD) &&
          !getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY) &&
          !checkIsOverdue(task),
      );
    }
    if (isLead) {
      return cadenceTasks?.some(
        task => !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD) && !checkIsOverdue(task),
      );
    }

    if (isOpportunity) {
      return cadenceTasks?.some(
        task =>
          !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY) &&
          !checkIsOverdue(task),
      );
    }
  }

  return false;
}
