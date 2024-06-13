import {
  Bobject,
  BobjectField,
  MainBobjectTypes,
  LogicRoleType,
  SALESFORCE_LOGIC_ROLES,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';

export const getFieldByLogicRole = <T extends BobjectTypes>(
  bobject: Bobject<T>,
  logicRole: LogicRoleType<T> | SALESFORCE_LOGIC_ROLES,
): BobjectField<T> => {
  if (bobject?.fields) {
    return bobject?.fields.find(fieldItem => fieldItem.logicRole === logicRole);
  }

  return null;
};

export const getTextFromLogicRole = <T extends BobjectTypes>(
  bobject: Bobject<T>,
  logicRole: LogicRoleType<T>,
) => getValueFromLogicRole(bobject, logicRole, true);

export const getValueFromLogicRole = <T extends BobjectTypes>(
  bobject: Bobject<T>,
  logicRole: LogicRoleType<T>,
  asText = false,
): string => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return asText ? field?.text : field?.value;
};

export const getRelatedBobjectTypeName = (
  bobject: Bobject,
): Bobject['id']['typeName'] extends ['Activity' | 'Task']
  ? MainBobjectTypes
  : Bobject['id']['typeName'] => {
  let typeName = bobject?.id.typeName;

  if (BobjectTypes.Activity === typeName || BobjectTypes.Task === typeName) {
    const bobjectLead = getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[typeName]?.LEAD);
    const bobjectOpportunity = getValueFromLogicRole(
      bobject,
      FIELDS_LOGIC_ROLE[typeName]?.OPPORTUNITY,
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

export const getBobjectFromLogicRole = (logicRole: LogicRoleType<BobjectTypes>) => {
  const companyRegex = /COMPANY__*/;
  const leadRegex = /LEAD__*/;
  const opportunityRegex = /OPPORTUNITY__*/;
  const taskRegex = /TASK__*/;
  const activityRegex = /ACTIVITY__*/;

  if (companyRegex.test(logicRole)) return BobjectTypes.Company;
  if (leadRegex.test(logicRole)) return BobjectTypes.Lead;
  if (opportunityRegex.test(logicRole)) return BobjectTypes.Opportunity;
  if (taskRegex.test(logicRole)) return BobjectTypes.Task;
  if (activityRegex.test(logicRole)) return BobjectTypes.Activity;
  return null;
};

export const getReferencedBobjectFromLogicRole = <T extends Bobject>(
  bobject: T,
  logicRole: LogicRoleType<T['id']['typeName']>,
): Bobject => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return field?.referencedBobject;
};

export const getReferencedBobject = (bobject: Bobject): Bobject => {
  const bobjectType = bobject?.id?.typeName;
  const relatedCompany = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as Exclude<MainBobjectTypes, 'Company'>]?.COMPANY,
  )?.referencedBobject;
  const relatedLead = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as Exclude<BobjectTypes, MainBobjectTypes>]?.LEAD,
  )?.referencedBobject;
  const relatedOpportunity = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as BobjectTypes.Lead]?.OPPORTUNITY,
  )?.referencedBobject;
  const getMainBobject = () => {
    if (relatedOpportunity) return relatedOpportunity;
    if (relatedLead) return relatedLead;
    if (relatedCompany) return relatedCompany;
    return null;
  };
  const mainBobject = getMainBobject();
  return mainBobject ? mainBobject : bobject;
};
