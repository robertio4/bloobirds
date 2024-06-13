import {
  Bobject,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getCurrentSalesforceStatusField,
  getFieldByLogicRole,
  getUserTimeZone,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';
import spacetime from 'spacetime';

import { getSalesforceIdField } from '../../changeStatusSalesforce/utils/changeStatusSalesforce.utils';

export const getIsAnyEmailOrWhatsappOrToday = (
  tasks,
  customTasks,
): {
  hasWhatsappTask: boolean;
  hasEmailTask: boolean;
  taskForToday: Bobject<BobjectTypes.Task> | false;
} => {
  if (!tasks) return { hasWhatsappTask: false, hasEmailTask: false, taskForToday: false };
  const timeZone = getUserTimeZone();
  const whatsappTasksIds = customTasks.reduce((acc, task) => {
    if (['WHATSAPP', 'WHATSAPP_BUSINESS'].includes(task.logicRole)) {
      acc.push(task?.id);
    }
    return acc;
  }, []);
  const todayTasks = tasks.filter(task => {
    const taskDate = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
    //TODO this should be done with .isSame('day') but it seems bugged
    return (
      spacetime.today(timeZone).startOf('day').format('nice') ===
      spacetime(taskDate, timeZone).add(2, 'hour').startOf('day').format('nice')
    );
  });

  return {
    ...tasks.reduce(
      (acc, curr) => {
        if (
          whatsappTasksIds.includes(getValueFromLogicRole(curr, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK))
        ) {
          return { ...acc, hasWhatsappTask: true };
        } else if (
          getFieldByLogicRole(curr, TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL)?.valueLogicRole ===
          TASK_ACTION_VALUE.EMAIL_YES
        ) {
          return { ...acc, hasEmailTask: true };
        }
        return acc;
      },
      { hasWhatsappTask: false, hasEmailTask: false },
    ),
    taskForToday: todayTasks.length === 1 ? todayTasks[0] : false,
  };
};

export const referenceBobjectTasksQuery = id => ({
  query: {
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
      TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
    ],
    [TASK_FIELDS_LOGIC_ROLE[id?.typeName.toUpperCase()]]: [id.value],
  },
  page: 0,
  pageSize: 25,
  sort: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  columns: TASK_COLUMNS,
  formFields: true,
  injectReferences: true,
});

export const TASK_COLUMNS = [
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  TASK_FIELDS_LOGIC_ROLE.STATUS,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
  TASK_FIELDS_LOGIC_ROLE.DESCRIPTION,
  TASK_ACTION.EMAIL,
  TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
];

const getAditionalInfo = (fieldsLogicRoles, selectedStatus, selectedReason, selectedUser) => {
  const reasonedStatusKey = `${selectedStatus.logicRole.replace(
    /__STATUS|_STATUS_/gi,
    '',
  )}_REASONS`;
  return {
    ...(selectedReason ? { [reasonedStatusKey]: selectedReason.value } : {}),
    ...(selectedUser ? { [fieldsLogicRoles.ASSIGNED_TO]: selectedUser?.id } : {}),
  };
};

const buildDataToSend = (bobject, data) => {
  const dataToSend = {};

  const insertData = objectToSend => {
    if (data.selectedStatus && objectToSend) {
      const statusField = getCurrentSalesforceStatusField(objectToSend);

      const { crmId, crmObject } = getSalesforceIdField(
        objectToSend,
        data.wizardKey === 'CONTACT_FLOW_OTO' && data.buttonsConfig?.checkExistingOpportunity,
        data.machineContext?.selectedOpportunityObject,
      );
      const crmStatusValue = data.selectedStatus;
      const extraFields = data?.extraFields?.[crmStatusValue?.name];
      if (crmStatusValue !== statusField?.value || extraFields) {
        dataToSend[crmObject] = {
          bobjectId: objectToSend?.id?.value,
          crmStatusValue: crmStatusValue?.name,
          crmObject,
          crmId: getValueFromLogicRole(objectToSend, crmId) || bobject.salesforceId,
          extraFields,
        };
      }
    }
  };
  insertData(bobject);
  return dataToSend;
};

export function buildRequestBody({
  bobject,
  selectedStatus,
  selectedReason,
  selectedUser,
  isSales,
  hasNoStatusPlanEnabled,
  dataForSalesforce,
  extraFields,
}) {
  if (!selectedStatus) return {};
  if (hasNoStatusPlanEnabled) {
    return buildDataToSend(bobject, { dataForSalesforce, selectedStatus, extraFields });
  }
  const bobjectType = bobject?.id?.typeName;
  const fieldsLogicRoles = FIELDS_LOGIC_ROLE[bobjectType];
  const statusKey = `${isSales ? 'SALES_' : ''}STATUS`;
  let additionalInfo = {};
  if (bobjectType !== 'Opportunity') {
    additionalInfo = getAditionalInfo(
      fieldsLogicRoles,
      selectedStatus,
      selectedReason,
      selectedUser,
    );
  }

  return {
    [fieldsLogicRoles[statusKey]]: selectedStatus?.id,
    ...additionalInfo,
  };
}
