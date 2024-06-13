import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  BobjectField,
  BobjectType,
  FIELDS_LOGIC_ROLE,
  LogicRoleType,
  MainBobjectTypes,
} from '@bloobirds-it/types';
import { isEmpty } from 'lodash';
import compact from 'lodash/compact';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';

import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE } from '../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../constants/lead';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_LEADS_LOGIC_ROLES,
} from '../constants/opportunity';
import { useFullSalesEnabled } from '../hooks/useFeatureFlags';
import { bobjectModel } from '../misc/model/bobjectFieldsModel';

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

export const getRelatedBobject = (bobject: Bobject, relatedBobjectType: BobjectType): Bobject => {
  const model = bobjectModel(bobject);
  return model.findBy('referencedBobjectType')(relatedBobjectType)?.referencedBobject;
};

export const getPluralBobjectName = (bobjectName: string, number: number): string => {
  if (number > 1) {
    return bobjectPlurals[bobjectName as BobjectType];
  }
  return bobjectName;
};

export const getBobjectFromLogicRole = (logicRole: string) => {
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
};

export const getFieldByLogicRole = <T extends BobjectTypes>(
  bobject: Bobject,
  logicRole: LogicRoleType<T>,
): BobjectField => {
  if (bobject?.fields) {
    return bobject?.fields.find(fieldItem => fieldItem.logicRole === logicRole);
  }

  return null;
};

export const getFieldIdByLogicRole = (bobjectFields: any, fieldLR: string) => {
  const field = bobjectFields?.find((field: BobjectField) => field.logicRole === fieldLR);
  return field?.id;
};

export const getFieldById = (bobject: Bobject, id: string): BobjectField =>
  bobject?.fields.find((fieldItem: any) => fieldItem.name === id);

export const getFieldTextById = (bobject: Bobject, id: string): string =>
  getFieldById(bobject, id)?.text;

export const getFieldValueById = (bobject: Bobject, id: string): string =>
  getFieldById(bobject, id)?.value;

export const getValueFromLogicRole = <T extends Bobject>(
  bobject: T,
  logicRole: LogicRoleType<T['id']['typeName']>,
  asText = false,
): string => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return asText ? field?.text : field?.value;
};

export const getReferencedBobjectFromLogicRole = <T extends Bobject>(
  bobject: T,
  logicRole: LogicRoleType<T['id']['typeName']>,
): Bobject => {
  const field = getFieldByLogicRole(bobject, logicRole);
  return field?.referencedBobject;
};

type ExcludeCurrentBobject<T> = Exclude<BobjectTypes, T>;

export const getReferencedBobject = (bobject: Bobject): Bobject => {
  const bobjectType = bobject?.id?.typeName;
  const relatedCompany = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as ExcludeCurrentBobject<'Company'>]?.COMPANY,
  )?.referencedBobject;
  const relatedLead = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as ExcludeCurrentBobject<MainBobjectTypes>]?.LEAD,
  )?.referencedBobject;
  const relatedOpportunity = getFieldByLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType as ExcludeCurrentBobject<MainBobjectTypes>]?.OPPORTUNITY,
  )?.referencedBobject;
  const getMainBobject = () => {
    if (relatedOpportunity) return relatedOpportunity;
    if (relatedLead) return relatedLead;
    if (relatedCompany) return relatedCompany;
  };
  const mainBobject = getMainBobject();
  return mainBobject ? mainBobject : bobject;
};

export const getDateByLogicRole = <T extends Bobject>(
  bobject: T,
  logicRole: LogicRoleType<T['id']['typeName']>,
): Date => {
  const value = getValueFromLogicRole(bobject, logicRole);
  return new Date(value);
};

export const getTextFromLogicRole = <T extends Bobject>(
  bobject: T,
  logicRole: LogicRoleType<T['id']['typeName']>,
) => getValueFromLogicRole(bobject, logicRole, true);

export const getFieldsByType = (bobject: Bobject, fieldType: string): Array<BobjectField> =>
  bobject?.fields?.filter(fieldItem => fieldItem?.type === fieldType) || [];

export const getFieldsByLogicRoles = (bobject: Bobject, logicRoles: Array<string>) =>
  bobject.fields
    .filter((field: BobjectField) => logicRoles.includes(field.logicRole))
    .reduce(
      (filteredFields: { [LR: string]: BobjectField }, field: BobjectField) => ({
        ...filteredFields,
        [field.logicRole]: { ...field },
      }),
      {},
    );

export const getFieldsByIds = (bobject: Bobject, ids: Array<string>): Array<BobjectField> =>
  bobject?.fields?.filter(field => ids.includes(field.name));

export const getFieldByName = (bobject: Bobject, name: string): string =>
  bobject?.fields.find(fieldItem => fieldItem.label === name)?.text;

export const getBobjectTypeByStage = (stage: string): Array<string> | Error => {
  const hasSalesEnabled = useFullSalesEnabled();
  switch (stage) {
    case 'PROSPECT':
      return [BobjectTypes.Company, BobjectTypes.Lead];
    case 'SALES':
      return [
        BobjectTypes.Opportunity,
        BobjectTypes.Company,
        ...(hasSalesEnabled ? [BobjectTypes.Lead] : []),
      ];
    default:
      throw new Error(`Unsupported stage ${stage}`);
  }
};

//TODO review this
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

export const getObjectIdFromId = (bobjectId: string): string => {
  if (bobjectId?.indexOf('/') > 0) {
    return bobjectId.split('/')[2];
  }
  return bobjectId;
};

export interface ActivityParentsInterface {
  lead: BobjectField;
  company: BobjectField;
  opportunity: BobjectField;
}

export const getActivityParents = (activity: Bobject): ActivityParentsInterface | Error => {
  if (!activity?.id.typeName) {
    throw new Error('Trying to get the activity parents of something that is not an activity');
  }

  const leadField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const companyField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  const opportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);

  return { lead: leadField, company: companyField, opportunity };
};

export const getChildBobjects = ({
  bobjectType,
  includeSelf = true,
  bobjectFields,
  bobjectTypes,
  fieldTypes,
}: {
  bobjectType: BobjectType;
  includeSelf?: boolean;
  bobjectFields: any;
  bobjectTypes: any;
  fieldTypes: any;
}) => {
  // Expect to receive a bobject type with the first uppercase, e.g: "Company" | "Activity" | ...
  const bobjectFieldsByBobjectType = mapValues(
    groupBy(bobjectFields?.all(), 'bobjectType'),
    clist => clist.map(entity => omit(entity, 'bobjectType')),
  );

  // Return an array of childs with the bobjectTypeId.
  const parentBobjectType = bobjectTypes?.findBy('name')(bobjectType);
  const referenceFieldType = fieldTypes?.findBy('enumName')('REFERENCE');
  if (bobjectType) {
    return Object.keys(bobjectFieldsByBobjectType).filter(bobjectTypeId => {
      const referenceFields = bobjectFieldsByBobjectType[bobjectTypeId].filter(
        field => field.fieldType === referenceFieldType?.id,
      );
      return (
        referenceFields?.some(field => field.referencedBobjectType === parentBobjectType.id) ||
        (includeSelf && bobjectTypeId === parentBobjectType.id)
      );
    });
  }
  return null;
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

export const changeLogicRolesToIds = ({
  bobjectFields,
  bobjectPicklistFieldValues,
  query,
}: {
  bobjectFields: any;
  bobjectPicklistFieldValues: any;
  query: any;
}) => {
  const newQuery: Record<string, any> = {};
  const queryToParse = { ...query };
  if (bobjectPicklistFieldValues) {
    Object.keys(queryToParse).forEach(queryField => {
      const queryFieldId = bobjectFields.findBy('logicRole')(queryField)?.id;
      if (!Array.isArray(queryToParse[queryField])) {
        queryToParse[queryField] = [queryToParse[queryField]];
      }
      queryToParse[queryField].forEach((queryValue: string) => {
        const picklistValue = bobjectPicklistFieldValues.findBy('logicRole')(queryValue);
        const field = queryFieldId || (queryField as string);
        if (newQuery[field]) {
          return (newQuery[field] = picklistValue
            ? [...newQuery[field], picklistValue.id]
            : [...newQuery[field], queryValue]);
        }
        return (newQuery[field] = picklistValue ? [picklistValue.id] : [queryValue]);
      });
    });
    return newQuery;
  }
  return query;
};

export const changeFieldIdsToLogicRoles = ({
  bobjectFields,
  query,
}: {
  bobjectFields: any;
  query: any;
}) => {
  const newQuery: { [key: string]: any } = {};
  const queryToParse = { ...query };
  Object.keys(queryToParse).forEach(queryFieldId => {
    const queryFieldLogicRole = bobjectFields.findBy('id')(queryFieldId)?.logicRole;

    newQuery[queryFieldLogicRole || queryFieldId] = queryToParse[queryFieldId];
  });

  return newQuery;
};

/**
 * @deprecated
 * @param bobject
 */
export const isOpportunity = (bobject: Bobject): boolean =>
  bobject?.id?.typeName === BobjectTypes.Opportunity;
/**
 * @deprecated
 * @param bobject
 */
export const isLead = (bobject: Bobject): boolean => bobject?.id?.typeName === BobjectTypes.Lead;
/**
 * @deprecated
 * @param bobject
 */
export const isCompany = (bobject: Bobject): boolean =>
  bobject?.id?.typeName === BobjectTypes.Company;
/**
 * @deprecated
 * @param bobject
 */
export const isTask = (bobject: Bobject): boolean => bobject?.id?.typeName === BobjectTypes.Task;
/**
 * @deprecated
 * @param bobject
 */
export const isActivity = (bobject: Bobject): boolean =>
  bobject?.id?.typeName === BobjectTypes.Activity;

export const getCompanyIdFromBobject = (bobject: Bobject) => {
  if (isCompany(bobject)) {
    return bobject?.id.value;
  }
  if (bobject) {
    const fields = FIELDS_LOGIC_ROLE[bobject?.id.typeName as ExcludeCurrentBobject<'Company'>];

    return getValueFromLogicRole(bobject, fields.COMPANY);
  }
  throw Error('Invalid bobject type when retrieving the company id');
};

export const getLeadIdFromBobject = (bobject: Bobject) => {
  if (isLead(bobject)) {
    return bobject?.id.value;
  }
  if (bobject?.id.typeName) {
    const fields =
      FIELDS_LOGIC_ROLE[bobject?.id.typeName as ExcludeCurrentBobject<MainBobjectTypes>];
    return getValueFromLogicRole(bobject, fields.LEAD);
  }
  throw Error('Invalid bobject type when retrieving the lead id');
};

export const getOpportunityIdFromBobject = (bobject: Bobject) => {
  if (isOpportunity(bobject)) {
    return bobject?.id.value;
  }
  if (bobject?.id.typeName) {
    const fields =
      FIELDS_LOGIC_ROLE[bobject?.id.typeName as ExcludeCurrentBobject<'Opportunity' | 'Company'>];
    return getValueFromLogicRole(bobject, fields.OPPORTUNITY);
  }
  throw Error('Invalid bobject type when retrieving the lead id');
};

export const getOpportunityLeadsIds = (opportunity: Bobject): Array<any> => {
  const leads = new Set(
    Object.values(OPPORTUNITY_LEADS_LOGIC_ROLES).map(logicRole =>
      getValueFromLogicRole(opportunity, logicRole),
    ),
  );
  return leads ? compact(Array.from(leads)) : [];
};

export const getOpportunityNamesFromLead = (opportunities: Array<Bobject>, lead: Bobject) => {
  if (opportunities && isLead(lead)) {
    const oppsWithThisLead = compact(
      opportunities?.filter(opp =>
        opp?.fields?.find(
          field => field?.referencedBobjectType === 'Lead' && field?.value === lead?.id?.value,
        ),
      ),
    );
    return oppsWithThisLead.map(opp =>
      getValueFromLogicRole(opp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME, true),
    );
  } else {
    return '';
  }
};

export const getOpportunityNamesTitle = (opportunityNames: Array<string>) => {
  return `Lead included in ${opportunityNames?.length} opportunit${
    opportunityNames?.length === 1 ? 'y' : 'es'
  }: ${opportunityNames?.length === 1 ? opportunityNames[0] : opportunityNames?.join(', ')}`;
};

export const getFirstAvailableOpportunityLeadField = (opportunity: Bobject): string => {
  let fieldName: string;
  Object.values(OPPORTUNITY_LEADS_LOGIC_ROLES).forEach(field => {
    const leadField = opportunity?.fields?.find(opp => opp?.logicRole === field);
    if (!leadField?.value && !fieldName) {
      return (fieldName = leadField?.logicRole);
    }
  });
  return fieldName;
};

export function generateFiltersPerType(filters: {
  moreFilters: { [x: string]: any };
}): { [x: string]: any } {
  let companyFilters = {};
  let leadFilters = {};
  let taskFilters = {};
  let opportunityFilters = {};

  if (!isEmpty(filters.moreFilters)) {
    Object.keys(filters.moreFilters).forEach(key => {
      const companyRegex = /COMPANY__*/;
      const leadRegex = /LEAD__*/;
      const taskRegex = /TASK__*/;
      const opportunityRegex = /OPPORTUNITY__*/;

      const companyIdRegex = /_Company_*/;
      const leadIdRegex = /_Lead_*/;
      const taskIDRegex = /_Task_*/;
      const opportunityIdRegex = /_Opportunity_*/;

      const value =
        Array.isArray(filters.moreFilters[key]) && filters.moreFilters[key][0]?.query
          ? filters.moreFilters[key][0]
          : filters.moreFilters[key];

      const matchCompanyIdField = companyIdRegex.test(key);
      if (companyRegex.test(key) || matchCompanyIdField) {
        const label = matchCompanyIdField ? key.replace(companyIdRegex, '') : key;
        companyFilters = {
          ...companyFilters,
          [label]: value,
        };
      }

      const matchLeadIdField = leadIdRegex.test(key);
      if (leadRegex.test(key) || matchLeadIdField) {
        const label = matchLeadIdField ? key.replace(leadIdRegex, '') : key;
        leadFilters = {
          ...leadFilters,
          [label]: value,
        };
      }

      const matchTaskIdField = taskIDRegex.test(key);
      if (taskRegex.test(key) || matchTaskIdField) {
        const label = matchTaskIdField ? key.replace(taskIDRegex, '') : key;
        taskFilters = {
          ...taskFilters,
          [label]: value,
        };
      }

      const matchOpportunityIdField = opportunityIdRegex.test(key);
      if (opportunityRegex.test(key) || matchOpportunityIdField) {
        const label = matchOpportunityIdField ? key.replace(opportunityIdRegex, '') : key;
        opportunityFilters = {
          ...opportunityFilters,
          [label]: value,
        };
      }
    });
  }
  return { companyFilters, leadFilters, taskFilters, opportunityFilters };
}

function getFilterFieldLabel(fieldId: string, bobjectFields: any, bobjectTypes: any): string {
  if (!fieldId.includes('__')) {
    const field = bobjectFields.get(fieldId);
    if (field) {
      const bobjectType = bobjectTypes.get(field.bobjectType);
      return '_' + bobjectType.name + '_' + fieldId;
    }
  }
  return fieldId;
}

export function clearTypeKeysFromFilters(filters: { [x: string]: any }) {
  const startsWithBobjectTypeKey = /^_(Company|Lead|Task|Opportunity)_*/;
  const obj = { ...filters };
  Object.keys(obj).forEach(key => {
    if (startsWithBobjectTypeKey.test(key)) {
      obj[key.replace(startsWithBobjectTypeKey, '')] = obj[key];
      delete obj[key];
    }
  });
  return obj;
}

export function parseTaskFilters(
  value: any,
  bobjectFields: any,
  bobjectTypes: any,
  moreFilters: any,
  moreFilterKeys: any,
) {
  const moreFiltersValues = changeFieldIdsToLogicRoles({ query: value, bobjectFields });
  let parsedMoreFilters: Record<string, any> = {};

  Object.keys(moreFiltersValues).forEach(fieldId => {
    const fieldLabel = getFilterFieldLabel(fieldId, bobjectFields, bobjectTypes);
    if (moreFilterKeys[fieldLabel]) {
      const fieldValue = moreFiltersValues[fieldId]?.query || moreFiltersValues[fieldId];
      parsedMoreFilters = {
        ...parsedMoreFilters,
        [moreFilterKeys[fieldLabel]]: fieldValue,
      };
    } else {
      parsedMoreFilters = {
        ...parsedMoreFilters,
        moreFilters: {
          ...parsedMoreFilters?.moreFilters,
          [fieldLabel]: moreFiltersValues[fieldId],
        },
      };
    }
  });

  return parsedMoreFilters;
}

export const checkIsSalesBobject = (bobject: Bobject) => {
  switch (bobject.id.typeName) {
    case BobjectTypes.Company:
      return (
        getFieldByLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole ===
        COMPANY_STAGE_LOGIC_ROLE.SALES
      );
    case BobjectTypes.Lead:
      return (
        getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole ===
        LEAD_STAGE_LOGIC_ROLE.SALES
      );
    default:
      return false;
  }
};
