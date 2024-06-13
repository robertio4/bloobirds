interface LeadPicklistValue {
  id: string;
  name: string;
  logicRole?: string;
  enabled: boolean;
}

export type LeadFieldType =
  | 'PICKLIST'
  | 'DATE'
  | 'DATETIME'
  | 'TEXT'
  | 'EMAIL'
  | 'URL'
  | 'NUMBER'
  | 'DECIMAL'
  | 'PHONE'
  | 'REFERENCE';

type LeadLogicRole =
  | 'LEAD__NAME'
  | 'LEAD__SURNAME'
  | 'LEAD__LINKEDIN_JOB_TITLE'
  | 'LEAD__ASSIGNED_TO'
  | 'LEAD__COMPANY'
  | string;

export interface LeadField {
  id: string;
  logicRole?: LeadLogicRole;
  name: string;
  order: number;
  type: LeadFieldType;
  values: Array<LeadPicklistValue>;
  visible: boolean;
  required: boolean;
  enabled: boolean;
}
