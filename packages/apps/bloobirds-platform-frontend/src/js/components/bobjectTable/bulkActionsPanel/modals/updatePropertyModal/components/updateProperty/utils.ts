import { isObject } from 'lodash';
import { BobjectField, BobjectType } from '../../../../../../../typings/bobjects';
import { isNotExcludedField } from './fieldConditions';

// TYPES

type fieldsByType = { [key: string]: BobjectField };
export type fields = Record<BobjectType, fieldsByType>;
export type fieldType = {
  type: BobjectType | string;
  name: string;
  label: string;
  logicRole: string;
  required: boolean;
  blocking: boolean;
  blocked: boolean;
  error: boolean;
};
export type availableFieldType = fieldType & {
  available: boolean;
};
export type availableFieldsType = availableFieldType[];
export type indexedFieldsType = { [key: number]: fieldType };
export type addedFieldsType = { [key: string]: { [key: string]: string | string[] } };

const FieldTypes = [
  'Picklist',
  'Global Picklist',
  'Multi picklist',
  'Multi global picklist',
  'DateTime',
  'Date',
  'Decimal',
  'Email',
  'Phone',
  'Text',
  'Number',
  'Password',
  'URL',
  'Email',
] as const;

export type FieldValueType = typeof FieldTypes[number];

// TYPE CHECKS

export function isFieldValueType(value: any): value is FieldValueType {
  return FieldTypes.includes(value);
}

// TYPE DEFAULTS

export const defaultFieldType: fieldType = {
  label: '',
  logicRole: '',
  name: '',
  required: false,
  type: '',
  blocked: false,
  blocking: false,
  error: false,
};

export const defaultAvailableFieldType: availableFieldType = {
  ...defaultFieldType,
  available: true,
};

// CONSTANTS

export const relatedBobjectTypes: Record<BobjectType, BobjectType[]> = {
  Activity: ['Company', 'Lead', 'Opportunity'],
  Lead: ['Company', 'Opportunity'],
  Opportunity: ['Company', 'Lead'],
  Task: ['Company', 'Lead', 'Opportunity'],
  Company: undefined,
  Product: undefined,
  OpportunityProduct: undefined,
};

// FUNCTIONS

export const manageDateValue = (selectValue: { type: string; value?: number | Date }): string => {
  if (!selectValue) return undefined;
  if (!isObject(selectValue)) return selectValue;
  if (selectValue.value) {
    let value = selectValue.value;
    if (typeof value === 'number') {
      value = new Date(value);
    }
    return value.toISOString();
  } else return undefined;
};

export function getAvailableFieldFromBobjectField(
  stage: string,
  bobjectType: BobjectType,
  field: BobjectField,
): availableFieldType {
  if (!field) return defaultAvailableFieldType;
  return {
    ...defaultFieldType,
    type: bobjectType,
    name: field.name,
    label: field.label,
    logicRole: field.logicRole ?? field.name,
    required: field.required,
    available: field.logicRole ? isNotExcludedField(stage, bobjectType, field.logicRole) : true,
  };
}
