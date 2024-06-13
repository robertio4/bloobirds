import { ACTIVITY_FIELDS_LOGIC_ROLE } from './activity';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from './companies';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from './leads';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE, OPPORTUNITY_STATUS_LOGIC_ROLE } from './opportunities';
import { OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE } from './opportunityProducts';
import { PRODUCT_FIELDS_LOGIC_ROLE } from './products';
import { TASK_FIELDS_LOGIC_ROLE } from "./tasks";

export type BobjectType =
  | 'Company'
  | 'Lead'
  | 'Activity'
  | 'Task'
  | 'Opportunity'
  | 'Product'
  | 'OpportunityProduct';

export type MainBobjectTypes = BobjectTypes.Company | BobjectTypes.Lead | BobjectTypes.Opportunity;

export type CompanyOrLeadLR = Exclude<MainBobjectTypes, BobjectTypes.Opportunity>;

export enum BobjectTypes {
  Company = 'Company',
  Lead = 'Lead',
  Opportunity = 'Opportunity',
  Task = 'Task',
  Activity = 'Activity',
}

export enum BOBJECT_TYPES {
  ACTIVITY = 'Activity',
  COMPANY = 'Company',
  LEAD = 'Lead',
  OPPORTUNITY = 'Opportunity',
  TASK = 'Task',
  OPPORTUNITY_PRODUCT = 'OpportunityProduct',
  PRODUCT = 'Product',
}

export enum PluralBobjectTypes {
  Company = 'Companies',
  Lead = 'Leads',
  Activity = 'Activities',
  Task = 'Tasks',
  Opportunity = 'Opportunities',
  Product = 'Products',
  OpportunityProduct = 'Opportunity products',
}

export enum SingularFromPluralBobjectTypes {
  Companies = 'Company',
  Leads = 'Lead',
  Activities = 'Activity',
  Tasks = 'Task',
  Opportunities = 'Opportunity',
}

export interface BobjectId<T extends BobjectTypes = BobjectTypes> {
  accountId: string;
  objectId: string;
  typeName: T;
  value: `${string}/${T extends BobjectTypes ? T : BobjectTypes}/${string}`;
}

export interface FieldValue {
  id: string;
  conditions: any[];
  deprecated: boolean;
  label: string;
  logicRole: string;
  parentFieldValueValue: any;
  value: string;
}

export interface BobjectField<T extends BobjectTypes = BobjectTypes, K extends BobjectTypes = BobjectTypes>{
  bobjectFieldGroup?: any;
  duplicateValidation?: boolean;
  fieldValues?: FieldValue[];
  id: string;
  label?: string;
  layoutReadOnly?: boolean;
  logicRole?: LogicRoleType<T>;
  name: string;
  multiline?: boolean;
  readOnly?: boolean;
  referencedBobject?: Bobject<K>;
  referencedBobjectType?: string;
  required?: boolean;
  text?: string;
  type: string;
  typeField?: boolean;
  value?: string;
  valueLogicRole?: LogicRoleType<T>;
  valueBackgroundColor?: string;
  valueTextColor?: string;
  valueOutlineColor?: string;
  fieldConditionsByField?: any[];
  fieldConditions?: any[];
  satisfiesFieldCrossCondition?: boolean;
  ordering?: number;
  defaultValue: string;
  defaultGlobalPicklistValue: string;
}

export interface Bobject<T extends BobjectTypes = BobjectTypes> {
  id: BobjectId<T>;
  fields: Array<BobjectField<T>>;
  referencedBobject?: any;
  raw?: { contents: Record<string, any>; id: string };
  referencedBobjects?: Record<string, Bobject>;
  rawBobject?: Record<string, any>;
  stage: string;
}

export function isBobject(bobject: any): bobject is Bobject {
  return bobject && bobject.id && bobject.fields;
}

export const STAGE_VALUES_LOGIC_ROLES = {
  [BobjectTypes.Company]: COMPANY_STAGE_LOGIC_ROLE,
  [BobjectTypes.Lead]: LEAD_STAGE_LOGIC_ROLE,
  [BobjectTypes.Opportunity]: OPPORTUNITY_STATUS_LOGIC_ROLE,
};

export const STATUS_VALUES_LOGIC_ROLES = Object.freeze({
  [BobjectTypes.Company]: COMPANY_STATUS_LOGIC_ROLE,
  [BobjectTypes.Lead]: LEAD_STATUS_LOGIC_ROLE,
  [BobjectTypes.Opportunity]: OPPORTUNITY_STATUS_LOGIC_ROLE,
});

export const FIELDS_LOGIC_ROLE = {
  [BOBJECT_TYPES.COMPANY]: COMPANY_FIELDS_LOGIC_ROLE,
  [BOBJECT_TYPES.LEAD]: LEAD_FIELDS_LOGIC_ROLE,
  [BOBJECT_TYPES.OPPORTUNITY]: OPPORTUNITY_FIELDS_LOGIC_ROLE,
  [BOBJECT_TYPES.TASK]: TASK_FIELDS_LOGIC_ROLE,
  [BOBJECT_TYPES.ACTIVITY]: ACTIVITY_FIELDS_LOGIC_ROLE,
  [BOBJECT_TYPES.OPPORTUNITY_PRODUCT]: OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE,
  [BOBJECT_TYPES.PRODUCT]: PRODUCT_FIELDS_LOGIC_ROLE,
};

export interface BobjectWithDate extends Bobject {
  taskDate: {
    hashDate: string;
    prefix: string;
    formattedDate: string;
    isFirstOfDay: boolean;
  };
  activityDate?: any;
  data?: any;
}

export const SALES_STATUS_VALUES_LOGIC_ROLES = Object.freeze({
  [BobjectTypes.Company]: COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  [BobjectTypes.Lead]: LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  [BobjectTypes.Opportunity]: OPPORTUNITY_STATUS_LOGIC_ROLE,
});

export const HUBSPOT = Object.freeze({
  [BobjectTypes.Lead]: 'HUBSPOT__CONTACT_ID',
  [BobjectTypes.Company]: 'HUBSPOT__COMPANY_ID',
  [BobjectTypes.Opportunity]: 'HUBSPOT__DEAL_ID',
});

export enum SALESFORCE_LOGIC_ROLES {
  LEAD_ID_FIELD= 'SALESFORCE_LEAD_ID',
  CONTACT_ID_FIELD= 'SALESFORCE_CONTACT_ID',
  ACCOUNT_ID_FIELD= 'SALESFORCE_ACCOUNT_ID',
  OPPORTUNITY_ID_FIELD= 'SALESFORCE_OPPORTUNITY_ID',
  SALESFORCE_LEAD_STATUS = 'SALESFORCE_LEAD_STATUS',
  SALESFORCE_LEAD_STATUS_API_NAME = 'SALESFORCE_LEAD_STATUS_API_NAME',
  SALESFORCE_COMPANY_STATUS = 'SALESFORCE_COMPANY_STATUS',
  SALESFORCE_COMPANY_STATUS_API_NAME = 'SALESFORCE_COMPANY_STATUS_API_NAME',
  SALESFORCE_OPPORTUNITY_STAGE = 'SALESFORCE_OPPORTUNITY_STAGE',
  SALESFORCE_OPPORTUNITY_STAGE_API_NAME = 'SALESFORCE_OPPORTUNITY_STAGE_API_NAME',
}

export type LogicRoleType<T extends BobjectTypes & string > = `${Uppercase<T>}__${string}`;

export function isBobjectType(type: string): type is BobjectTypes {
  return Object.values(BobjectTypes).includes(type as BobjectTypes);
}

export interface WhatsappLead {
  id: BobjectId['value'];
  name: string;
  number: string;
}
