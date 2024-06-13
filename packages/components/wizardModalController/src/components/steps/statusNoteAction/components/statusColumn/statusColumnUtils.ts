import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';

function isStatusNewOrBacklog(status) {
  return ['New', 'Backlog'].includes(status.name);
}
export function isStatusWithReason(selectedStatus, salesforceStatusFields) {
  if (!selectedStatus) return false;
  if (salesforceStatusFields) {
    return (
      salesforceStatusFields &&
      salesforceStatusFields
        .find(field => field.objectType === selectedStatus.salesforceObjectType)
        ?.statusRestrictions?.find(
          ({ salesforceStatus }) => selectedStatus.name === salesforceStatus,
        )?.fields
    );
  }
  return ['Nurturing', 'Discarded', 'On Hold'].includes(selectedStatus.name);
}

export function shouldBeAssigned(isAssigned, selectedStatus, hasNoStatusPlan) {
  if (!selectedStatus || hasNoStatusPlan) return false;
  return !isAssigned && !isStatusNewOrBacklog(selectedStatus);
}

export const getBobjectName = referenceBobject => {
  switch (referenceBobject?.id?.typeName) {
    case BobjectTypes.Lead:
      return (
        getValueFromLogicRole(referenceBobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
        referenceBobject.fullName
      );
    case BobjectTypes.Company:
      return (
        getValueFromLogicRole(referenceBobject, COMPANY_FIELDS_LOGIC_ROLE.NAME) ||
        referenceBobject.name
      );
    case BobjectTypes.Opportunity:
      return (
        getValueFromLogicRole(referenceBobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME) ||
        referenceBobject.name
      );
    default:
      return undefined;
  }
};
