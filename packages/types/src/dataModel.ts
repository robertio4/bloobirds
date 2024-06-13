import { BobjectType, BobjectTypes, LogicRoleType } from './bobjects';
import { BobjectPicklistValueEntity } from './entities';

export interface DataModelResponse {
  findFieldByLogicRole: (logicRole) => BobjectFieldDataModel;
  getAccountId: () => string;
  findValueById: (id) => BobjectPicklistValueEntity;
  findValuesByFieldId: (fieldId) => BobjectPicklistValueEntity[];
  findFieldsByTypeAndBobjectType: (bobjectType, fieldType) => BobjectFieldDataModel[];
  findValueByLogicRole: (logicRole) => BobjectPicklistValueEntity;
  findValuesByFieldLogicRole: (fieldLogicRole) => BobjectPicklistValueEntity[];
  findFieldById: (id) => BobjectFieldDataModel;
  getFieldsByBobjectType: (bobjectType) => BobjectFieldDataModel[];
  findValueByLabel: (label) => BobjectPicklistValueEntity;
  findMainBobjectTypes: () => BobjectTypeDataModel[];
  all: () => any;
}

export interface DataModel {
  accountId: string;
  types: BobjectTypeDataModel[];
  accountName: string;
  timestamp: number;
}

export interface BobjectTypeDataModel {
  id: string;
  name: BobjectType;
  reportingTableName: BobjectType;
  bobjectTypeModelName: string;
  fields: BobjectFieldDataModel[];
}

export interface BobjectFieldDataModel {
  id: string;
  name: string;
  logicRole: LogicRoleType<BobjectTypes>;
  reportingColumnName: string;
  layoutIcon: string;
  fieldType: string;
  values: BobjectPicklistValueEntity[];
  required?: boolean;
  inboundField: boolean;
  ordering: number;
  isTemplateVariable: boolean;
  referencesTo?: 'LEAD' | 'COMPANY' | 'OPPORTUNITY' | 'TASK' | 'ACTIVITY' | 'PRODUCT';
  prefix?: string;
  suffix?: string;
}
