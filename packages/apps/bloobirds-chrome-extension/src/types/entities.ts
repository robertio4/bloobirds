import { Bobject, BobjectId, BobjectTypes, ExtensionBobject } from '@bloobirds-it/types';

/**
 * @deprecated use the one in @bloobirds-it/types
 */
export interface LinkedInCompany {
  id: BobjectId;
  name: string;
}
/**
 * @deprecated use the one in @bloobirds-it/types
 */
export interface LinkedInQueryResponse {
  leads: LinkedInLead[];
  exactMatch: boolean;
}
/**
 * @deprecated use the one in @bloobirds-it/types
 */
export interface ExtensionCompanyQueryResponse {
  companies: ExtensionCompany[];
  exactMatch: boolean;
}
/**
 * @deprecated use the one in @bloobirds-it/types
 */
export interface ExtensionCompany extends ExtensionBobject<BobjectTypes.Company> {
  website?: string;
  targetMarket: string;
  leads: Bobject<BobjectTypes.Lead>;
}

/**
 * @deprecated use the one in @bloobirds-it/types
 */
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
  linkedInId: string;
  segmentationFields: OtherField[];
}
/**
 * @deprecated use the one in @bloobirds-it/types
 */
export interface ExtensionOpportunity extends ExtensionBobject<BobjectTypes.Opportunity> {
  amount: string;
  status: string;
  closeDate: string;
}

export interface OtherField {
  [key: string]: string;
}

export interface BobjectField {
  logicRole: string;
  value: string;
  name: string;
}

export interface FormBobject {
  id: BobjectId;
  fields: Array<BobjectField>;
}

export interface LinkedInLeadQuery {
  linkedInUrl?: string;
  linkedInId?: string;
  salesNavigatorUrl?: string;
  leadFullName?: string;
  companyName?: string;
  salesforceId?: string;
  email?: string;
  autoMatching?: boolean;
}

export interface ExtensionCompanyQuery {
  linkedInUrl?: string;
  salesNavigatorUrl?: string;
  website?: string;
  name?: string;
  salesforceId?: string;
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
  name?: string;
  id: string;
  logicRole: string;
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
