import {
  BobjectTypes,
  FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
export const getFieldByLogicRole = (bobject, logicRole) => {
  if (bobject?.fields) {
    return bobject?.fields.find((fieldItem) => fieldItem.logicRole === logicRole);
  }
  return null;
};
export const getTextFromLogicRole = (bobject, logicRole) => getValueFromLogicRole(bobject, logicRole, true);
export const getValueFromLogicRole = (bobject, logicRole, asText = false) => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return asText ? field?.text : field?.value;
};
export const getRelatedBobjectTypeName = (bobject) => {
  let typeName = bobject?.id.typeName;
  if (BobjectTypes.Activity === typeName || BobjectTypes.Task === typeName) {
    const bobjectLead = getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[typeName]?.LEAD);
    const bobjectOpportunity = getValueFromLogicRole(
      bobject,
      FIELDS_LOGIC_ROLE[typeName]?.OPPORTUNITY
    );
    typeName = BobjectTypes.Company;
    if (bobjectLead) {
      typeName = BobjectTypes.Lead;
    }
    if (bobjectOpportunity) {
      typeName = BobjectTypes.Opportunity;
    }
  }
  return typeName;
};
export const getBobjectFromLogicRole = (logicRole) => {
  const companyRegex = /COMPANY__*/;
  const leadRegex = /LEAD__*/;
  const opportunityRegex = /OPPORTUNITY__*/;
  const taskRegex = /TASK__*/;
  const activityRegex = /ACTIVITY__*/;
  if (companyRegex.test(logicRole))
    return BobjectTypes.Company;
  if (leadRegex.test(logicRole))
    return BobjectTypes.Lead;
  if (opportunityRegex.test(logicRole))
    return BobjectTypes.Opportunity;
  if (taskRegex.test(logicRole))
    return BobjectTypes.Task;
  if (activityRegex.test(logicRole))
    return BobjectTypes.Activity;
  return null;
};
export const getReferencedBobjectFromLogicRole = (bobject, logicRole) => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return field?.referencedBobject;
};
export const getReferencedBobject = (bobject) => {
  const bobjectType = bobject?.id?.typeName;
  const relatedCompany = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType]?.COMPANY
  )?.referencedBobject;
  const relatedLead = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType]?.LEAD
  )?.referencedBobject;
  const relatedOpportunity = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType]?.OPPORTUNITY
  )?.referencedBobject;
  const getMainBobject = () => {
    if (relatedOpportunity)
      return relatedOpportunity;
    if (relatedLead)
      return relatedLead;
    if (relatedCompany)
      return relatedCompany;
    return null;
  };
  const mainBobject = getMainBobject();
  return mainBobject ? mainBobject : bobject;
};
