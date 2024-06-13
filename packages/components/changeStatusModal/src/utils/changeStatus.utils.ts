import { IconType } from '@bloobirds-it/flamingo-ui';
import { FIELDS_LOGIC_ROLE, MainBobjectTypes } from '@bloobirds-it/types';

export function getIconName(bobjectType: MainBobjectTypes): IconType {
  switch (bobjectType) {
    case 'Company':
      return 'company';
    case 'Lead':
      return 'person';
    case 'Opportunity':
      return 'fileOpportunity';
    default:
      return 'questionCircle';
  }
}

export function getStatuses(bobject, dataModel) {
  const bobjectType = bobject.id.typeName;
  const fieldsLogicRoles = FIELDS_LOGIC_ROLE[bobjectType];
  const isRawBobject = bobject.rawBobject;
  if (isRawBobject) {
    const stage = bobject?.stage;
    const stageValue = dataModel.findValueById(stage)?.name;
    if (stageValue === 'Prospecting') {
      return dataModel.findValuesByFieldLogicRole(fieldsLogicRoles.STATUS);
    } else {
      return dataModel.findValuesByFieldLogicRole(fieldsLogicRoles.SALES_STATUS);
    }
  }
}

function isStatusNewOrBacklog(status) {
  return ['New', 'Backlog'].includes(status.name);
}

export function showUnassignedWarning(status, isAssigned) {
  if (!status) return false;
  return isAssigned && isStatusNewOrBacklog(status);
}

export function showStopCadenceWarning(selectedStatus) {
  if (!selectedStatus) return false;
  return ['Meeting', 'Account', 'Nurturing', 'Discarded'].includes(selectedStatus.name);
}

export function isStatusWithReason(selectedStatus) {
  if (!selectedStatus) return false;
  return ['Nurturing', 'Discarded', 'On Hold'].includes(selectedStatus.name);
}

export function shouldBeAssigned(isAssigned, selectedStatus) {
  if (!selectedStatus) return false;
  return !isAssigned && !isStatusNewOrBacklog(selectedStatus);
}

const getAditionalInfo = (fieldsLogicRoles, selectedStatus, selectedReason, selectedUser) => {
  const reasonedStatusKey = `${selectedStatus.logicRole.replace(
    /__STATUS|_STATUS_/gi,
    '',
  )}_REASONS`;
  return {
    ...(selectedReason ? { [reasonedStatusKey]: selectedReason.value } : {}),
    ...(selectedUser ? { [fieldsLogicRoles.ASSIGNED_TO]: selectedUser.id } : {}),
  };
};

export function buildRequestBody({
  bobjectType,
  selectedStatus,
  selectedReason,
  selectedUser,
  isSales,
}) {
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
    [fieldsLogicRoles[statusKey]]: selectedStatus.id,
    ...additionalInfo,
  };
}
