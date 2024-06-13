import { BobjectTypes, LogicRoleType, BobjectType } from '@bloobirds-it/types';

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
  values: BobjectPicklistValueDataModel[];
  isTemplateVariable: boolean;
  isEnabled: boolean;
  required: boolean;
}

export interface BobjectPicklistValueDataModel {
  id: string;
  name: string;
  logicRole: string;
  backgroundColor: string;
  outlineColor: string;
  textColor: string;
  shortname: string;
}
