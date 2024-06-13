import { ACTIVITY_FIELDS_LOGIC_ROLE, Bobject } from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';

export function getMainBobjectId(activity: Bobject) {
  const relatedOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);

  if (relatedOpportunity?.value) {
    return relatedOpportunity.value;
  }

  const relatedLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);

  if (relatedLead?.value) {
    return relatedLead.value;
  }

  const relatedCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);

  if (relatedCompany?.value) {
    return relatedCompany.value;
  }

  return null;
}

export function fillReferenceFields(activity: any) {
  activity.fields = activity?.fields.map(field => {
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY) {
      return {
        ...field,
        referencedBobject: activity.referencedBobjects[field.value],
      };
    }
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.LEAD) {
      return {
        ...field,
        referencedBobject: activity.referencedBobjects[field.value],
      };
    }
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY) {
      return {
        ...field,
        referencedBobject: activity.referencedBobjects[field.value],
      };
    }
    return field;
  });

  return activity;
}
