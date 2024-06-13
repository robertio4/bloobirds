import { IconType } from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  APP_CL_COMPANIES,
  APP_CL_LEADS,
  Bobject,
  BobjectField,
  BobjectId,
  BobjectType,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LogicRoleType,
  MainBobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  PluralBobjectTypes, SALESFORCE_LOGIC_ROLES,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import groupBy from 'lodash/groupBy';
import useSWR from 'swr';

import { api } from './api';

const findByProperties = (bobjectFields, properties, value) => {
  for (let i = 0; i < properties.length; i += 1) {
    const field = findByProperty(bobjectFields, properties[i], value);
    if (field !== undefined) {
      return field;
    }
  }
  return undefined;
};

export const getNameFieldLRFromBobjectType = (bobjectType: BobjectType) => {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return COMPANY_FIELDS_LOGIC_ROLE.NAME;
    case BobjectTypes.Lead:
      return LEAD_FIELDS_LOGIC_ROLE.FULL_NAME;
    case BobjectTypes.Opportunity:
      return OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME;
    case BobjectTypes.Task:
      return TASK_FIELDS_LOGIC_ROLE.TITLE;
  }
};

const groupFieldsByGroup = bobjectFields => {
  const groupMetadata = {};
  bobjectFields
    .filter(bf => bf.groupName !== null && bf.groupName !== undefined)
    .forEach(bf => {
      groupMetadata[bf.groupName] = {
        name: bf.groupName,
        ordering: bf.groupOrdering,
        detailDisplay: bf.groupDetailDisplay,
      };
    });
  const groups = Object.keys(groupMetadata);
  const fieldsByGroup = {};
  groups.forEach(group => {
    fieldsByGroup[group] = [];
  });
  bobjectFields
    .filter(bf => bf.groupName !== null && bf.groupName !== undefined)
    .forEach(bf => {
      if (bf.logicRole !== 'COMPANY__NAME') {
        fieldsByGroup[bf.groupName].push(bf);
      }
    });
  Object.values(fieldsByGroup).forEach((fields: BobjectField[]) =>
    fields.sort((f1, f2) => f1?.ordering - f2?.ordering),
  );
  const arranged = [];
  Object.keys(fieldsByGroup).forEach(groupName =>
    arranged.push({
      name: groupName.toUpperCase(),
      fields: fieldsByGroup[groupName],
      meta: groupMetadata[groupName],
    }),
  );
  arranged.sort((f1, f2) => f1.fields[0].groupOrdering - f2.fields[0].groupOrdering);
  return arranged;
};

const findByProperty = (bobjectFields, property, value) => {
  const matchingFields = bobjectFields.filter(b => b[property] === value);
  if (matchingFields.length === 1) {
    return matchingFields[0];
  }
  if (matchingFields.length === 0) {
    return undefined;
  }
  return matchingFields;
};

const bobjectFieldsModel = bobjectFields => ({
  find: fieldDescriptor =>
    findByProperties(bobjectFields, ['id', 'name', 'logicRole'], fieldDescriptor),
  findById: bobjectFieldId => findByProperty(bobjectFields, 'name', bobjectFieldId),
  findByLogicRole: logicRole => findByProperty(bobjectFields, 'logicRole', logicRole),
  findByLabel: label => findByProperty(bobjectFields, 'label', label),
  groupFieldsByGroup,
  findByCondition: condition => bobjectFields.filter(condition),
  findBy: property => value => findByProperty(bobjectFields, property, value),
});

const findByPropertiesAndValues = (bobjectFields, properties, values) => {
  for (let i = 0; i < values.length; i += 1) {
    const field = findByProperties(bobjectFields, properties, values[i]);
    if (field !== undefined) {
      return field;
    }
  }
  return undefined;
};

const bobjectModel = bobject => {
  const bobjectFields = bobject.fields;
  const bobjectPrefix = `${bobject.id.typeName.toUpperCase()}__`;
  const model = bobjectFieldsModel(bobjectFields);
  model.find = fieldDescriptor =>
    findByPropertiesAndValues(
      bobjectFields,
      ['id', 'name', 'logicRole'],
      [fieldDescriptor, bobjectPrefix + fieldDescriptor],
    );
  model['type'] = () => bobject.id.typeName;
  return model;
};

export const getRelatedBobject = (bobject: Bobject, relatedBobjectType: BobjectType): Bobject => {
  const model = bobjectModel(bobject);
  return model.findBy('referencedBobjectType')(relatedBobjectType)?.referencedBobject;
};

export const getFieldByLogicRole = <T extends BobjectTypes>(
  bobject: Bobject<T>,
  logicRole: LogicRoleType<T> | SALESFORCE_LOGIC_ROLES,
): BobjectField<T> => {
  if (bobject?.fields) {
    return bobject?.fields.find(fieldItem => fieldItem.logicRole === logicRole);
  }
  return null;
};

const injectReference = (field: BobjectField, referencedBobjects: Record<string, Bobject>) => {
  let referencedBobject;
  if (field.type === 'REFERENCE') {
    referencedBobject = referencedBobjects?.[field.logicRole];
  }
  return { ...field, referencedBobject };
};

export const injectReferenceFields = (bobject: Bobject) => {
  const extendedFields = bobject.fields.map(field =>
    injectReference(field, bobject.referencedBobjects),
  );
  return { ...bobject, fields: extendedFields };
};

export const getReferencedBobjectFromLogicRole = (
  bobject: Bobject,
  logicRole: LogicRoleType<BobjectTypes>,
): Bobject => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return field?.referencedBobject;
};

export const getValueFromLogicRole = <T extends BobjectTypes>(
  bobject: Bobject<T>,
  logicRole: LogicRoleType<T> | SALESFORCE_LOGIC_ROLES,
  asText = false,
): string => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return asText ? field?.text : field?.value;
};

export const getTextFromLogicRole = (bobject: Bobject, logicRole: LogicRoleType<BobjectTypes>) =>
  getValueFromLogicRole(bobject, logicRole, true);

export const getFieldsByType = (bobject: Bobject, fieldType: string): Array<BobjectField> =>
  bobject?.fields?.filter(fieldItem => fieldItem?.type === fieldType) || [];

export const getFieldsByIds = (bobject: Bobject, ids: Array<string>): Array<BobjectField> =>
  bobject?.fields?.filter(field => ids.includes(field.name));

export const getFieldById = (bobject: Bobject, id: string): BobjectField =>
  bobject?.fields.find((fieldItem: any) => fieldItem.name === id);

export const getFieldTextById = (bobject: Bobject, id: string): string =>
  getFieldById(bobject, id)?.text;

export const checkIsSalesBobject = (bobject: Bobject) => {
  switch (bobject.id.typeName) {
    case BobjectTypes.Company:
      return (
        getFieldByLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.STAGE).valueLogicRole ===
        COMPANY_STAGE_LOGIC_ROLE.SALES
      );
    case BobjectTypes.Lead:
      return (
        getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.STAGE).valueLogicRole ===
        LEAD_STAGE_LOGIC_ROLE.SALES
      );
    default:
      return false;
  }
};

export const getBobjectFromLogicRole = (logicRole: string) => {
  const companyRegex = /^COMPANY__/;
  const salesforceCompanyRegex = /^SALESFORCE_COMPANY_/;
  const leadRegex = /^LEAD__/;
  const salesforceLeadRegex = /^SALESFORCE_LEAD_/;
  const opportunityRegex = /^OPPORTUNITY__/;
  const salesforceOpportunityRegex = /^SALESFORCE_OPPORTUNITY_/;
  const taskRegex = /^TASK__/;
  const activityRegex = /^ACTIVITY__/;

  if (companyRegex.test(logicRole) || salesforceCompanyRegex.test(logicRole)) return BobjectTypes.Company;
  if (leadRegex.test(logicRole) || salesforceLeadRegex.test(logicRole)) return BobjectTypes.Lead;
  if (opportunityRegex.test(logicRole) || salesforceOpportunityRegex.test(logicRole)) return BobjectTypes.Opportunity;
  if (taskRegex.test(logicRole)) return BobjectTypes.Task;
  if (activityRegex.test(logicRole)) return BobjectTypes.Activity;
};

const processInjectField = (response, field) => {
  let referencedBobject;
  if (field.type === 'REFERENCE') {
    if (
      field.referencedBobjectType !== undefined &&
      field.referencedBobjectType !== null &&
      field.text !== null &&
      field.text !== undefined &&
      response.referencedBobjects !== undefined &&
      response.referencedBobjects !== null
    ) {
      referencedBobject = response.referencedBobjects[field.text];
    }
  }
  return { ...field, referencedBobject };
};
export const injectReferencesSearchProcess = response => {
  const extendedContents = response?.contents?.map(bobject => {
    const extendedFields = bobject.fields.map(field => processInjectField(response, field));
    return { ...bobject, fields: extendedFields };
  });
  return { ...response, contents: extendedContents };
};

export const injectReferencedBobjects = (bobject:Bobject) => {
  const extendedFields = bobject.fields.map(field => processInjectField(bobject, field))
  return {...bobject, fields: extendedFields}
}

export const injectReferencesGetProcess = response => ({
  ...response,
  fields: response?.fields?.map(field => processInjectField(response, field)),
});

export const tabBobjectType = (section: string) => {
  switch (section) {
    case PluralBobjectTypes.Lead:
      return BobjectTypes.Lead;
    case PluralBobjectTypes.Opportunity:
      return BobjectTypes.Opportunity;
    default:
      return BobjectTypes.Company;
  }
};

export const getBobjectTypeFromPathname = (pathname: string) => {
  if (pathname.includes(PluralBobjectTypes.Lead.toLowerCase())) {
    return BobjectTypes.Lead;
  } else if (pathname.includes(PluralBobjectTypes.Opportunity.toLowerCase())) {
    return BobjectTypes.Opportunity;
  } else {
    return BobjectTypes.Company;
  }
};

export const isOpportunity = (bobject: { id: BobjectId }): boolean =>
  bobject?.id?.typeName === BobjectTypes.Opportunity;
export const isLead = (bobject: { id: BobjectId }): boolean =>
  bobject?.id?.typeName === BobjectTypes.Lead;
export const isCompany = (bobject: { id: BobjectId }): boolean =>
  bobject?.id?.typeName === BobjectTypes.Company;
export const isTask = (bobject: { id: BobjectId }): boolean =>
  bobject?.id?.typeName === BobjectTypes.Task;
export const isActivity = (bobject: { id: BobjectId }): boolean =>
  bobject?.id?.typeName === BobjectTypes.Activity;

export const isCallActivity = (bobject: Bobject): boolean => {
  if (isActivity(bobject)) {
    const activityType = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
    return activityType?.valueLogicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  } else {
    return false;
  }
};

export const hasRequiredMissing = ({
  bobjectType,
  bobjectFields,
  bobjectTypes,
  bobject,
  bobjectConditionalFields,
}: {
  bobjectType: BobjectType;
  bobjectFields: any;
  bobjectTypes: any;
  bobject: Bobject;
  bobjectConditionalFields: any;
}): boolean => {
  const bobjectTypeId = bobjectTypes?.findBy('name')(bobjectType)?.id;
  const requiredFields =
    bobjectFields
      ?.filterBy('bobjectType', bobjectTypeId)
      ?.filter(
        (field: BobjectField) =>
          field.required && !!field?.bobjectFieldGroup && !field?.layoutReadOnly,
      ) || [];
  if (!requiredFields || requiredFields.length === 0) {
    return false;
  }
  const requiredFieldsId = requiredFields?.map((field: BobjectField) => field.id);
  const values = getFieldsByIds(bobject, requiredFieldsId);
  const conditions = groupBy(bobjectConditionalFields?.all(), 'bobjectField');
  const valuesWithoutConditions = values?.filter(
    value =>
      !conditions[value.name] ||
      conditions[value.name].some(condition =>
        Object.values(bobject.raw.contents).includes(condition.requiredType),
      ),
  );
  return valuesWithoutConditions?.some(value => !value.value);
};

export const companyUrl = company => {
  if (company) {
    return `${APP_CL_COMPANIES}/${company.id.objectId}`;
  }
  return APP_CL_COMPANIES;
};

export const leadUrl = (lead, company) => {
  if (typeof lead === 'string') {
    if (lead?.indexOf('/') > 0) {
      lead = lead.split('/')[2];
    }
    return `${APP_CL_LEADS}/${lead}`;
  }
  if (company?.id?.objectId) {
    return `${APP_CL_COMPANIES}/${company?.id?.objectId}?leadId=${lead?.id?.value}`;
  }
  return `${APP_CL_LEADS}/${lead?.id?.objectId}`;
};

export const getReferencedBobject = (bobject: Bobject): Bobject => {
  const bobjectType = bobject?.id?.typeName;
  const relatedCompany = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as Exclude<BobjectTypes, 'Company'>]?.COMPANY,
  )?.referencedBobject;
  const relatedLead = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as 'Activity' | 'Task']?.LEAD,
  )?.referencedBobject;
  const relatedOpportunity = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as Exclude<BobjectTypes, 'Opportunity' | 'Company'>]?.OPPORTUNITY,
  )?.referencedBobject;
  const getMainBobject = () => {
    if (relatedOpportunity) return relatedOpportunity;
    if (relatedLead) return relatedLead;
    if (relatedCompany) return relatedCompany;
  };
  const mainBobject = getMainBobject();
  return mainBobject ? mainBobject : bobject;
};

function getStageField(dataModel, bobjectType) {
  if (!dataModel || !bobjectType) {
    return undefined;
  }
  const fieldsByBobjectType = dataModel.getFieldsByBobjectType(bobjectType);
  if (!fieldsByBobjectType) return undefined;
  return fieldsByBobjectType?.find(({ name }) => name.includes('Stage'));
}

/** Returns whether a bobject is in sales or not. Needs DataModel when bobject
 * is an ExtensionBobject. If you are sure bobject is of type Bobject, you can pass
 * dataModel as undefined.
 *
 * @param dataModel DataModelResponse type
 * @param bobject Accepts both Bobject and ExtensionBobject types
 */
export function getIsSales(dataModel, bobject) {
  const bobjectType = bobject?.id?.typeName ?? bobject.bobjectType;
  if (!bobjectType) return undefined;
  if (bobjectType === BobjectTypes.Opportunity) return true;
  if (bobject?.rawBobject) {
    // bobject is ExtensionBobject
    const stageField = dataModel && getStageField(dataModel, bobjectType);
    const stage = bobject?.rawBobject[stageField?.id];
    return dataModel?.findValueById(stage)?.name === 'Sales';
  } else {
    // bobject is Bobject
    return getTextFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].STAGE) === 'Sales';
  }
}

export const bobjectPlurals = {
  Activity: 'Activities',
  Company: 'Companies',
  Lead: 'Leads',
  Meeting: 'Meetings',
  Task: 'Tasks',
  Opportunity: 'Opportunities',
  Product: 'Products',
  OpportunityProduct: 'Opportunity Products',
};

export const getPluralBobjectName = (bobjectName: string, number: number): string => {
  if (number > 1) {
    return bobjectPlurals[bobjectName as BobjectType];
  }
  return bobjectName;
};

export const getRelatedBobjectTypeName = (bobject: Bobject): BobjectTypes => {
  let typeName = bobject?.id.typeName as BobjectTypes;

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

export const getExtensionBobjectByIdFields = bobjectIdFields => {
  if (bobjectIdFields?.typeName && bobjectIdFields?.objectId) {
    return api.get(
      `/linkedin/${PluralBobjectTypes[bobjectIdFields?.typeName]?.toLowerCase()}/${
        bobjectIdFields?.objectId
      }`,
    );
  }
  return Promise.resolve({ data: null });
}

export function getLeadById(leadId, accountId) {
  const { data: lead } = useSWR(`/Lead/${leadId}/form`, async () =>
    api
      .get(`/bobjects/${accountId}/Lead/${leadId}/form`)
      .then(data => injectReferencesSearchProcess(data?.data)),
  );

  return { lead };
}

export function getOpportunityById(opportunityId, accountId) {
  const { data: opportunity } = useSWR(`/Opportunity/${opportunityId}/form`, async () =>
    api
      .get(`/bobjects/${accountId}/Opportunity/${opportunityId}/form`)
      .then(data => injectReferencesSearchProcess(data?.data)),
  );

  return { opportunity };
}

/**
 * Composed lead Id
 * @param leadId
 */
export async function convertLeadInBloobirds(leadId: string) {
  await api.put(`/bobjects/${leadId}/convert`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });
}

export function getMainBobjectIcon(bobjectType: MainBobjectTypes): IconType {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return 'company';
    case BobjectTypes.Lead:
      return 'person';
    case BobjectTypes.Opportunity:
      return 'fileOpportunity';
    default:
      return undefined;
  }
}

export const removeDulpicatedBobjects = (bobjects: Bobject[]) => {
  const uniqueValues = new Set<string>();
  return bobjects?.filter(item => {
    if (!uniqueValues.has(item.id.objectId)) {
      uniqueValues.add(item.id.objectId);
      return true;
    }
    return false;
  });
};

export const updateBobject = async (bobjectId: string, data, callback?: (data) => void) => {
  try {
    await api.patch('/bobjects/' + bobjectId + '/raw', data);
    callback?.(data);
  } catch (e) {
    console.log(e);
  }
};

export const convertIdValueToIdObject = <T extends BobjectTypes>(
  id: string,
): BobjectId<T> | null => ({
  value: id as `${string}/${T extends BobjectTypes ? T : BobjectTypes}/${string}`,
  typeName: id?.split('/')[1] as T,
  objectId: id?.split('/')[2],
  accountId: id?.split('/')[0],
});

export function forgeIdFieldsFromIdValue<T extends BobjectTypes>(idValue: BobjectId<T>['value']) {
  const [accountId, typeName, objectId] = idValue.split('/');
  return {
    accountId,
    typeName,
    objectId,
    value: idValue,
  } as BobjectId<T>;
}

export const isComposedId = (id: string) => {
  return id?.split('/')?.length > 1;
};

