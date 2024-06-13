import {
  getFieldByLogicRole,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../../utils/bobjects.utils';
import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { useCadences } from '../../../../../hooks/useCadences';
import { Bobject } from '@bloobirds-it/types';
import { canBeMarkedAsDone, getTaskReferenceBobject } from '../../../../../utils/tasks.utils';
import { CompanyOrLeadLR, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

export const useTaskInfo = (task: Bobject) => {
  const referenceBobject = getTaskReferenceBobject(task);
  const referenceBobjectType = referenceBobject?.id?.typeName;
  const taskType = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const taskStatus = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const taskDateField = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const isTaskAutomated = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED);
  const referenceBobjectLastAttempt = getValueFromLogicRole(
    referenceBobject,
    (FIELDS_LOGIC_ROLE[referenceBobjectType] as CompanyOrLeadLR)?.ATTEMPTS_LAST_DAY,
  );

  const getCadenceEntity = () => {
    const taskRelatedBobjectType = getRelatedBobjectTypeName(task);
    const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);
    const { cadences: cadencesEntities } = useCadences(taskRelatedBobjectType);
    return cadencesEntities?.find(
      (cadenceElement: { id: string }) => cadenceElement?.id === cadenceId,
    );
  };

  const getTaskActiveStatus = () => {
    const isCompleted = [
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
    ].includes(taskStatus);
    const isRejected = [TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED].includes(taskStatus);
    const isProspect =
      getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
      TASK_TYPE.PROSPECT_CADENCE;
    return isProspect && !isCompleted && !isRejected;
  };

  const getCanBeMarkedAsDone = () => {
    const { disabled, reason } = canBeMarkedAsDone({
      type: taskType,
      status: taskStatus,
      lastAttemptDate: referenceBobjectLastAttempt,
      date: taskDateField,
      skippable: isTaskAutomated === 'No',
    });
    return { disabled, tooltip: reason };
  };

  return { getCadenceEntity, getTaskActiveStatus, getCanBeMarkedAsDone };
};
