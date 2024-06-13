import { BobjectId, BobjectType, BobjectTypes } from './bobjects';

export type SearchContextType = {
  searchQuery: string;
  lastVisited: any[];
  searchHistory: string[];
  actions: SearchBarActionsType;
    isWebapp?: boolean;
};

export type SearchBarActionsType = {
  handleMainBobjectClick: (event: MouseEvent |  React.MouseEvent<HTMLElement, MouseEvent>, bobject: SearchBobjectType) => void;
  handleActionOnClick:(event: MouseEvent |  React.MouseEvent<HTMLElement, MouseEvent>, action: SearchActionType, bobject:SearchBobjectType) => void ;
};

// eslint-disable-next-line prettier/prettier
export type LongBobjectId<T extends BobjectType> = `${string}/${T}/${string}`;

interface ResponseBobject {
  highlights: { [matchFieldId: string]: string };
  rawBobject: {
    id: BobjectId['value'];
    contents: { [fieldId: string]: string };
  };
  bobjectType: BobjectType;
  lastAttemptDate: string;
  attempts: number;
  lastTouchDate: string;
  touches: number;
  status: string;
  companyName: string;
  assignedTo: string;
}

interface ResponseBobjectCompany extends ResponseBobject {
  bobjectType: BobjectTypes.Company;
  website: string;
  targetMarket: string;
  parentCompanyName: string;
  parentCompanyId: string;
  phoneNumbers: string[];
  emails: string[];
  numberOfLeads: number;
  stage: string;
}
interface ResponseBobjectLead extends ResponseBobject {
  bobjectType: BobjectTypes.Lead;
  fullName: string;
  email: string;
  emails: string[];
  phone: string;
  jobTitle: string;
  companyId: BobjectId<BobjectTypes.Company>['value'];
  companyWebsite: string;
  stage: string;
}

interface ResponseBobjectOpportunity extends ResponseBobject {
  bobjectType: BobjectTypes.Opportunity;
  name: string;
  targetMarket: string;
  companyId: BobjectId<BobjectTypes.Company>['value'];
  companyWebsite: string;
  amount: number;
}

export type GlobalSearchResponse =
  | ResponseBobjectCompany
  | ResponseBobjectLead
  | ResponseBobjectOpportunity;

interface SearchBobject {
  url: string;
}

export interface SearchBobjectCompany extends SearchBobject, ResponseBobjectCompany {}
interface SearchBobjectLead extends SearchBobject, ResponseBobjectLead {}
interface SearchBobjectOpportunity extends SearchBobject, ResponseBobjectOpportunity {}

export type SearchBobjectType = SearchBobjectCompany | SearchBobjectLead | SearchBobjectOpportunity;

export const defaultSearchCompany: SearchBobjectCompany = {
  attempts: 0,
  bobjectType: undefined,
  companyName: '',
  highlights: {},
  lastAttemptDate: '',
  lastTouchDate: '',
  numberOfLeads: 0,
  parentCompanyId: '',
  parentCompanyName: '',
  phoneNumbers: [],
  emails: [],
  rawBobject: { contents: {}, id: undefined },
  stage: '',
  status: '',
  targetMarket: '',
  touches: 0,
  url: '',
  website: '',
  assignedTo: '',
};

export type ClickElementFunctionType = (bobject: SearchBobjectType, event: MouseEvent) => void;
export type ClickElementFunctionCompanyType = (
  bobject: SearchBobjectCompany,
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => void;

export enum SearchAction {
  Call = 'call',
  Email = 'email',
  WhatsApp = 'whatsapp',
  LinkedIn = 'linkedin',
  Meeting = 'meeting',
}

export type SearchActionType = SearchAction;

export type TypeFilterType = 'All' | BobjectType;
export const typeFilterConstants: TypeFilterType[] = ['All', 'Company', 'Lead', 'Opportunity'];
