import { BobjectTypes, LogicRoleType, TDateISODateTime, Types } from '@bloobirds-it/types';

import {
  CRM_DISPLAY_NAME,
  SALESFORCE_OBJECT_TYPES,
  SYNC_RULE,
} from '../../../../constants/integrations';
import { syncRules } from './newFielMapping.utils';

export type ReturnOfCRMOptions = ReturnType<typeof syncRules>;
export type CRMOptions = keyof ReturnOfCRMOptions & ReturnType<typeof syncRules>['CRM']['subTypes'];
export type CRMObjectType = {
  length: number;
  name: string;
  type: string;
  updateable: boolean;
  label: string;
  referenceTo: typeof SALESFORCE_OBJECT_TYPES[keyof typeof SALESFORCE_OBJECT_TYPES][];
  nillable: boolean;
  createable: boolean;
  defaultedOnCreate: boolean;
  picklistValues: any[];
};

export type BobjectFieldType = {
  bobjectType: string;
  logicRole: LogicRoleType<BobjectTypes>;
  name: string;
};
export type TriggerMappingType = {
  id: string;
  accountId: string;
  name: string;
  active: boolean;
  triggerMappingRelatedObject: [
    {
      id: string;
      crmObjectApiName: string;
      crmObjectLabel: keyof Types;
      crmRelationshipField: string;
    },
  ];
};

export type CustomMappingType = {
  id: string;
  creationDatetime: TDateISODateTime;
  updateDatetime: TDateISODateTime;
  createdBy: string;
  updatedBy: string;
  syncRule: typeof SYNC_RULE;
  maxLength: number;
  crmFieldType: string;
  keyName: string;
  crmUserId: boolean;
  crm: string;
  crmIsFromRelatedObject: boolean;
  crmRelationField: null;
  pickListField: boolean;
  multiPickListField: boolean;
  picklist: boolean;
  multipicklist: boolean;
  account: string;
  bobjectField: string;
  triggerMapping: string;
  _links: any;
};

export type NewFieldMappingsModal = {
  bobjectFields: {
    [key: string]: BobjectFieldType;
  };
  bobjectTypes: any;
  crm: keyof typeof CRM_DISPLAY_NAME;
  crmObjectFields: CRMObjectType[];
  customMap: any;
  customMappings: CustomMappingType[];
  handleOpen: any;
  handleRefreshMappings: any;
  isFetching: any;
  mapping: any;
  open: any;
  setOrderingCustomMap: any;
  triggerMapping: any;
};
