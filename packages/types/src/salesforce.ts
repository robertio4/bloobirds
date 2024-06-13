export const enum SalesforceTabs {
  HOME = 'home',
  INBOX = 'inbox',
  OUTBOX = 'outbox',
  PIPELINE = 'pipeline',
  TASKS = 'tasks',
  MEETINGS = 'meetings',
  INACTIVE = 'inactive',
  NURTURING = 'nurturing',
  TOOLTIP = 'tooltip',
}

export const enum SalesforceTabsIcon {
  HOME = 'home',
  INBOX = 'inbox',
  OUTBOX = 'outbox',
  TASKS = 'checkDouble',
  PIPELINE = 'relatedCompanyLead',
  MEETINGS = 'calendar',
  INACTIVE = 'alertTriangle',
  NURTURING = 'refresh',
  TOOLTIP = 'suggestions',
}

interface CrmObject {
  label: string;
  crmObject: string;
  icon: string;
}

export const crmObjects: CrmObject[] = [
  {
    label: 'Lead',
    crmObject: 'Lead',
    icon: 'personBody',
  },
  {
    label: 'Contact',
    crmObject: 'Contact',
    icon: 'sfdcContacts',
  },
  {
    label: 'Account',
    crmObject: 'Account',
    icon: 'company',
  },
  {
    label: 'Person account',
    crmObject: 'Account',
    icon: 'person',
  },
  {
    label: 'Opportunity',
    crmObject: 'Opportunity',
    icon: 'sfdcOpp',
  },
];

export const StatusBBCategories = [
  {
    value: 'Active',
    logicRole: 'SFDC_STATUS_TYPE_ACTIVE',
  },
  {
    value: 'Nurturing',
    logicRole: 'SFDC_STATUS_TYPE_NURTURING',
  },
  {
    value: 'Inactive',
    logicRole: 'SFDC_STATUS_TYPE_INACTIVE',
  },
  {
    value: 'Lost',
    logicRole: 'SFDC_STATUS_TYPE_FINAL_LOST',
  },
  {
    value: 'Won',
    logicRole: 'SFDC_STATUS_TYPE_FINAL_WON',
  },
];


export const SALESFORCE = Object.freeze({
  LEAD_ID_FIELD: 'SALESFORCE_LEAD_ID',
  CONTACT_ID_FIELD: 'SALESFORCE_CONTACT_ID',
  ACCOUNT_ID_FIELD: 'SALESFORCE_ACCOUNT_ID',
  OPPORTUNITY_ID_FIELD: 'SALESFORCE_OPPORTUNITY_ID',
});
