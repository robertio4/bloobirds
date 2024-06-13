import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

type Stage = 'PROSPECT' | 'SALES';

export interface RawEntity {
  cadence: any;
  enumName: string;
  id: string;
  creationDatetime: string;
  updateDatetime: string;
  createdBy: string;
  updatedBy: string;
  name: string;
  shortname?: string;
  email?: string;
  reportingName: string;
  reportingEnabled: boolean;
  color?: ColorType;
  indexed: boolean;
  upstreamMirror: boolean;
  description: string;
  triggerMappingRelatedObjects: Record<string, any>[];
  typeField: boolean;
  inboundField: boolean;
  enabled: boolean;
  segmentation: boolean;
  duplicateValidation: boolean;
  prioritisation: boolean;
  characterisation: boolean;
  qualifyingQuestion: boolean;
  required: boolean;
  managedBySystem: boolean;
  ordering: number;
  defaultValue: string;
  searchType: null;
  layoutFormPicklistType: null;
  layoutIcon: IconType;
  layoutReadOnly: boolean;
  layoutFormColumns: null;
  layoutFormWidth: null;
  layoutMultiline: boolean;
  layoutMultilineLines: number;
  layoutMultilineMaxLines: number;
  tableLayoutDefault: boolean;
  layoutDateFormatAbsolute: null;
  layoutDateFormatType: null;
  layoutNumberFormat: null;
  layoutNumberPrefix: null;
  layoutNumberSuffix: null;
  logicRole: string;
  requiredColumnInList: boolean;
  listsOrdering: number;
  templateVariable: boolean;
  recommended: boolean;
  backgroundColor: string;
  value: string;
  requiredBeforeMeeting: boolean;
  stage: Stage;
  infoCardShow: boolean;
  infoCardOrder: number;
  linkedinExtensionShow: boolean;
  linkedinExtensionOrder: number;
  deprecated: boolean;
  referenceEntity: null;
  cadenceUsages: number;
  mustOrderByValue: boolean;
  account: string;
  bobjectFieldGroup: null;
  bobjectGlobalPicklist: null;
  bobjectType: string;
  bobjectField: string;
  defaultBobjectPicklistFieldValue: null;
  externalUserName: string;
  externalUserEmail: string;
  bloobirdsUser: string;
  userType: string;
  fieldType: string;
  parentBobjectField: null;
  referencedBobjectType: null;
  segmentationValues: any[];
  numintecName: string;
  numintecUsername: string;
  ringoverName: string;
  ringoverId: string;
  extension: string;
  numintecId: string;
  _links: {
    self: {
      href: string;
    };
    bobjectField: {
      href: string;
    };
    parentBobjectField: {
      href: string;
    };
    bobjectGlobalPicklist: {
      href: string;
    };
    referencedBobjectType: {
      href: string;
    };
    segmentationValues: {
      href: string;
    };
    bobjectFieldGroup: {
      href: string;
    };
    account: {
      href: string;
    };
    fieldType: {
      href: string;
    };
    defaultBobjectPicklistFieldValue: {
      href: string;
    };
    bobjectType: {
      href: string;
    };
  };
}
