import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

import { Bobject, BobjectTypes } from './bobjects';
import { COMPANY_FIELDS_LOGIC_ROLE } from './companies';

export type SmartEmailHelperTabType = {
  title: string;
  dataTest: string;
  key: string;
  icon: IconType;
  tab?: JSX.Element;
  filters?: SmartEmailHelperPrimaryFilter[];
  visible?: boolean;
};

export type SmartEmailHelperPrimaryFilter =
  | BobjectTypes.Lead
  | COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET
  | COMPANY_FIELDS_LOGIC_ROLE.SCENARIO;

export type MatchDocument = {
  title: string;
  createdAt?: string;
  updatedAt?: string;
  url?: string;
  mimeType?: string;
  language: string;
  id: string;
  textAnalysis: { summary: string; entities: { [x: string]: Entity[] } };
  thumbnail: string;
};

export type Entity = {
  id: {
    entityGroup: string;
    normalizedText: string;
    token: string;
  };
};

export type FileTypes = 'pdf' | 'link';

export type AttachedLink = {
  link: string;
  type: FileTypes;
  title: string;
};

export type BodyElement = {
  type: string;
  children: { text: string }[];
};

export type ParsedDocumentType = {
  icon?: IconType | string;
  iconColor?: ColorType | string;
  title: string;
  date?: Date;
  link?: string;
  fileLink?: string;
  type?: FileTypes;
  keywords?: { text: string; type: string }[];
  visibility?: 'Public' | 'Private';
  assignedTo?: string;
  summary?: string;
  thumbnail?: string;
  id: string;
};

export type LeadForFilter = {
  id: string;
  name: string;
};

export enum SmartEmailTab {
  PREVIEW = 'PREVIEW',
  PAST_ACTIVITY = 'PAST_ACTIVITY',
  CLOSED_DEALS = 'CLOSED_DEALS',
  TEMPLATES = 'TEMPLATES',
  SUGGESTIONS = 'SUGGESTIONS',
  CREATE_TASK = 'CREATE_TASK',
  CREATE_LEAD = 'CREATE_LEAD',
  CALENDAR = 'CALENDAR',
}

export enum SimilarDealsFields {
  CONTACT = 'contact',
  ACCOUNT_EXECUTIVE = 'accountExecutive',
  CLOSE_DATE = 'closeDate',
  CLIENT_DATE = 'clientDate',
  AMOUNT = 'amount',
  LINKEDIN_URL = 'linkedinUrl',
}

export enum SimilarDealsFieldsLabels {
  contact = 'Contact',
  accountExecutive = 'Account Executive',
  closeDate = 'Close date',
  clientDate = 'Client date',
  amount = 'Amount',
}

export interface CompanyCardType {
  name: string;
  chemistry: number;
  contact: string;
  accountExecutive: string;
  linkedinURL: string;
  closeDate?: string;
  clientDate?: string;
  amount?: string;
  companyType: 'Client' | 'Account';
  matchingFields: { label: string; value: string }[];
}

export interface TmpCompanyCardType {
  company: Bobject;
  chemistry: number;
  matchingFields: { label: string; value: string }[];
}

export enum DateFilterValues {
  LAST_30_DAYS = 'last_30_days',
  LAST_90_DAYS = 'last_90_days',
  LAST_180_DAYS = 'last_180_days',
  LAST_YEAR = 'last_year',
  ALL_TIME = 'all_time',
}
