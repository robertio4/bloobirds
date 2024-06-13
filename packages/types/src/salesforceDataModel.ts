export interface SalesforceDataModelResponse {
  accountId: string;
  types: Types;
  accountName: string;
  mappedUsers?: MappedUsersEntity[] | null;
  salesforceUsers?: SalesforceUsersEntity[] | null;
  timestamp: number;
  mutate: () => void;
}
export interface Types {
  task: TaskOrContactOrOpportunityOrEventOrLeadOrAccount;
  contact: TaskOrContactOrOpportunityOrEventOrLeadOrAccount;
  opportunity: TaskOrContactOrOpportunityOrEventOrLeadOrAccount;
  event: TaskOrContactOrOpportunityOrEventOrLeadOrAccount;
  lead: TaskOrContactOrOpportunityOrEventOrLeadOrAccount;
  account: TaskOrContactOrOpportunityOrEventOrLeadOrAccount;
}
export interface TaskOrContactOrOpportunityOrEventOrLeadOrAccount {
  name: string;
  sobjectTypeModelName: string;
  fields?: FieldsEntity[] | null;
}
export interface FieldsEntity {
  length: number;
  name: string;
  type: string;
  updateable: boolean;
  label: string;
  nillable: boolean;
  createable: boolean;
  defaultedOnCreate: boolean;
  picklistValues?: (PicklistValuesEntity | null)[] | null;
  referenceTo: string[];
}
export interface PicklistValuesEntity {
  value: string;
  active: boolean;
  defaultValue: boolean;
  label: string;
}
export interface MappedUsersEntity {
  salesforceUserId: string;
  salesforceUser: string;
  bloobirdsUserId?: string | null;
  salesforceUserName: string;
  salesforceUserEmail: string;
}
export interface SalesforceUsersEntity {
  salesforceUserId: string;
  salesforceUser: string;
  // It is on the Json, but has no sense
  bloobirdsUserId?: null;
  salesforceUserName: string;
  salesforceUserEmail: string;
}
