import { ACTIVITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getFieldByLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export function getMainBobjectId(activity) {
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
export function fillReferenceFields(activity) {
  activity.fields = activity?.fields.map((field) => {
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY) {
      return {
        ...field,
        referencedBobject: activity.referencedBobjects[field.value]
      };
    }
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.LEAD) {
      return {
        ...field,
        referencedBobject: activity.referencedBobjects[field.value]
      };
    }
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY) {
      return {
        ...field,
        referencedBobject: activity.referencedBobjects[field.value]
      };
    }
    return field;
  });
  return activity;
}
