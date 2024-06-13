import { checkIsOverdue } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export function hasOngoingCadenceTasks(bobject, tasks) {
  const isCompany = bobject?.id?.typeName === BobjectTypes.Company;
  const isLead = bobject?.id?.typeName === BobjectTypes.Lead;
  const isOpportunity = bobject?.id?.typeName === BobjectTypes.Opportunity;
  const cadenceTasks = tasks?.filter(
    (t) => !!getValueFromLogicRole(t, TASK_FIELDS_LOGIC_ROLE.CADENCE)
  );
  if (cadenceTasks?.length > 0) {
    if (isCompany) {
      return cadenceTasks?.some(
        (task) => !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY) && !getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD) && !getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY) && !checkIsOverdue(task)
      );
    }
    if (isLead) {
      return cadenceTasks?.some(
        (task) => !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD) && !checkIsOverdue(task)
      );
    }
    if (isOpportunity) {
      return cadenceTasks?.some(
        (task) => !!getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY) && !checkIsOverdue(task)
      );
    }
  }
  return false;
}
