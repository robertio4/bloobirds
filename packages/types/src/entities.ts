import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

import {
  Bobject,
  BobjectField,
  BobjectId,
  BobjectTypes,
  LogicRoleType,
  MainBobjectTypes,
} from './bobjects';

export interface LinkedInCompany {
  id: BobjectId;
  name: string;
}

export interface LinkedInQueryResponse {
  leads: LinkedInLead[];
  exactMatch: boolean;
}

export interface ExtensionCompanyQueryResponse {
  companies: ExtensionCompany[];
  exactMatch: boolean;
}

export interface ExtensionOpportunityQueryResponse {
  opportunities: ExtensionOpportunity[];
  exactMatch: boolean;
}

export interface ExtensionBobject<T extends MainBobjectTypes = MainBobjectTypes> {
  id: BobjectId<T>;
  name: string;
  prospectingStatus: string;
  linkedInUrl: string;
  salesNavigatorUrl: string;
  status: string;
  stage: string;
  mrRating: string;
  highPriority: string;
  lastAttempt?: string;
  attemptsCount?: string;
  touchesCount?: string;
  lastTouch?: string;
  salesStatus: string;
  assignedTo: string;
  isInactive: boolean;
  mainNote: string;
  salesforceId?: string;
  dynamicsId?: string;
  dynamicsType?: string;
  otherFields: StrDict[];
  rawBobject: StrDict;
  sobject: StrDict[]; // Weird, but it's like this in fact
  cadence: string;
  creationDateTime: string;
  cadenceEnded: 'true' | 'false';
}

export interface ExtensionCompany extends ExtensionBobject<BobjectTypes.Company> {
  website?: string;
  salesforceId?: string;
  hubspotId?: string;
  targetMarket: string;
  mainNote: string;
  phoneNumbers: string[];
  personContactId?: string;
}

export interface LinkedInLead extends ExtensionBobject<BobjectTypes.Lead> {
  //NameTo prop does not come from BE, but we generate it on metaScrapper.tsx
  nameTo: string;
  surname: string;
  fullName: string;
  leadIcp: string;
  email: string;
  stage: string;
  optedOut: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  mainNote: string;
  hubspotId?: string;
  segmentationFields: StrDict[];
  phoneNumbers: string[];
}

export interface ExtensionOpportunity extends ExtensionBobject<BobjectTypes.Opportunity> {
  amount: string;
  status: string;
  mainNote: string;
  hubspotId?: string;
  salesforceId?: string;
  closeDate: string;
  salesforceStage: string;
  leads?: BobjectId<BobjectTypes.Lead>['value'][];
}

interface StrDict {
  [key: string]: string;
}

export interface FormBobject {
  id: BobjectId;
  fields: Array<BobjectField>;
}

export interface LinkedInLeadQuery {
  linkedInUrl?: string;
  salesNavigatorUrl?: string;
  leadFullName?: string;
  companyName?: string;
  salesforceId?: string;
  email?: string;
  autoMatching?: boolean;
}

export interface BuyerPersona {
  color: string;
  defaultCadence: string;
  description: string;
  enabled: boolean;
  id: string;
  name: string;
  ordering: number;
  shortName: string;
}

export interface TargetMarket {
  color: string;
  defaultCadence: string;
  description: string;
  enabled: boolean;
  id: string;
  name: string;
  ordering: number;
  shortName: string;
}

export interface DisplayBlock {
  title: string;
  image: string;
  footer: string;
  buttonText: string;
  buttonUrl: string;
  key: string;
  language: string;
  type: 'TOOLTIP' | 'BANNER';
  id: string;
  enabled: boolean;
  bodyBlocks: Array<{
    body: string;
    icon: IconType;
    order: number;
    mixpanelKey: string;
    linkId: string;
  }>;
}

export interface CustomTask {
  id?: string;
  accountId?: string;
  name: string;
  icon?: IconType;
  iconColor?: ColorType;
  description: string;
  enabled: boolean;
  ordering?: number;
  fields: Array<CustomTaskField>;
  shouldCreateActivity: boolean;
  reminder: boolean;
  logicRole: string;
}

export interface CustomTaskField {
  bobjectFieldId: string;
  required: boolean;
  ordering: number;
}

export interface UserResponse {
  users: User[];
  numberOfLicenseUsers: number;
  numberOfFreeUsers: number;
  numberOfSupportUsers: number;
  maxNumberOfLicenses: number;
  numberOfAccountAdmins: number;
}

export interface User {
  id: string;
  name: string;
  shortname: string;
  color: string;
  isAssignable: boolean;
  email: string;
  ordering: number;
  roles: any;
  employeeRole: string;
  active: boolean;
  permissions: any;
  type: string;
  invitationStatus: string;
  invitationExpired: string;
  phoneNumbers: any;
}

export interface BobjectPicklistValueEntity {
  account: string;
  backgroundColor: string;
  bobjectField: string;
  bobjectGlobalPicklist: string;
  createdBy: string;
  creationDatetime: string;
  deprecated: boolean;
  description: string;
  enabled: boolean;
  isEnabled?: boolean;
  id: string;
  name?: string;
  logicRole: LogicRoleType<BobjectTypes>;
  ordering: number;
  outlineColor: string;
  parentBobjectPicklistFieldValue: string;
  score: number;
  textColor: string;
  updateDatetime: string;
  updatedBy: string;
  value: string;
  nurturingStage: boolean;
  weightedPercentage: number;
}
