import { getBobjectFromLogicRole } from '../../../../../../../utils/bobjects.utils';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectType,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '@bloobirds-it/types';

const excludedFields: Record<BobjectType, string[]> = {
  Activity: [ACTIVITY_FIELDS_LOGIC_ROLE.STATUS_TITLE],
  Company: [
    COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
    COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
    COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
    COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
    COMPANY_FIELDS_LOGIC_ROLE.STAGE,
    COMPANY_FIELDS_LOGIC_ROLE.STATUS,
    COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS,
  ],
  Lead: [
    LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
    LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
    LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
    LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
    LEAD_FIELDS_LOGIC_ROLE.STAGE,
    LEAD_FIELDS_LOGIC_ROLE.STATUS,
    LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  ],
  Opportunity: [],
  OpportunityProduct: [],
  Product: [],
  Task: [],
};

/**
 * Returns the fields that depend on the given value of the given field for the given bobject type
 */
const conditionedFields: Record<BobjectType, { [field: string]: { [value: string]: string[] } }> = {
  Activity: {},
  Company: {
    ['STAGE']: {
      ['Prospect']: [COMPANY_FIELDS_LOGIC_ROLE.STATUS],
      ['Sales']: [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS],
    },
    [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: {
      [COMPANY_STATUS_LOGIC_ROLE.DISCARDED]: [COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS],
      [COMPANY_STATUS_LOGIC_ROLE.NURTURING]: [COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS],
    },
    [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: {
      [COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED]: [
        COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
      ],
      [COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING]: [
        COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
      ],
    },
  },
  Lead: {
    ['STAGE']: {
      ['Prospect']: [LEAD_FIELDS_LOGIC_ROLE.STATUS],
      ['Sales']: [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS],
    },
    [LEAD_FIELDS_LOGIC_ROLE.STATUS]: {
      [LEAD_STATUS_LOGIC_ROLE.DISCARDED]: [LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS],
      [LEAD_STATUS_LOGIC_ROLE.NURTURING]: [LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS],
    },
    [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: {
      [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED]: [
        LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
      ],
      [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING]: [
        LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
      ],
    },
  },
  Opportunity: {},
  OpportunityProduct: {},
  Product: {},
  Task: {},
};

export function isNotExcludedField(
  stage: string,
  bobjectType: BobjectType,
  fieldLR: string,
): boolean {
  const excluded = excludedFields[bobjectType] && excludedFields[bobjectType].includes(fieldLR);

  if (
    (bobjectType !== BobjectTypes.Company && bobjectType !== BobjectTypes.Lead) ||
    (stage !== 'Sales' && stage !== 'Prospect')
  ) {
    return !excluded;
  }
  const includedByStage = conditionedFields[bobjectType]['STAGE'][stage].includes(fieldLR);
  return !excluded || includedByStage;
}

export function isFieldConditioning(fieldLR: string): boolean {
  const bobjectType = getBobjectFromLogicRole(fieldLR);
  return !!conditionedFields[bobjectType] && !!conditionedFields[bobjectType][fieldLR];
}

export const getConditionedFields = (fieldLR: string, fieldValueLR: string) => {
  const bobjectType = getBobjectFromLogicRole(fieldLR);
  if (!!conditionedFields[bobjectType] && !!conditionedFields[bobjectType][fieldLR]) {
    return conditionedFields[bobjectType][fieldLR][fieldValueLR];
  } else return undefined;
};

export function isFieldConditioned(fieldLR: string): boolean {
  const bobjectType = getBobjectFromLogicRole(fieldLR);
  return (
    !!conditionedFields[bobjectType] &&
    Object.keys(conditionedFields[bobjectType]).some(field => {
      Object.keys(conditionedFields[bobjectType][field]).some(value =>
        conditionedFields[bobjectType][field][value].includes(fieldLR),
      );
    })
  );
}
