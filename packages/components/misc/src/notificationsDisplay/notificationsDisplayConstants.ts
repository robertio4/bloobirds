import { TFunction } from 'i18next';

export const TABS = [
  {
    key: 'updates',
    category: 'UPDATES',
  },
  {
    key: 'inbound',
    category: 'INBOUND',
  },
  {
    key: 'calls',
    category: 'CALLS',
  },
  {
    key: 'emailTracking',
    category: 'EMAIL_TRACKING',
  },
];

export const NEW_TABS = (t: TFunction) => ({
  [t('tabs.updates')]: 'UPDATES',
  [t('tabs.inbound')]: 'INBOUND',
  [t('tabs.calls')]: 'CALLS',
  [t('tabs.emailTracking')]: 'EMAIL_TRACKING',
});

export const ICONS = {
  NEW_EMAIL: {
    name: 'mail',
    color: 'tangerine',
  },
  WORKFLOWS: {
    name: 'zap',
    color: 'bloobirds',
  },
  NEW_LINKEDIN: {
    name: 'linkedin',
    color: 'darkBloobirds',
  },
  NEW_INBOUND: {
    name: 'download',
    color: 'banana',
  },
  NEW_INBOUND_LEAD: {
    name: 'personAdd',
    color: 'banana',
  },
  MISSED_CALL_UNKNOWN: {
    name: 'phone',
    color: 'tomato',
  },
  MISSED_CALL_LEAD: {
    name: 'phone',
    color: 'tomato',
  },
  REPORT_CALL: {
    name: 'phone',
    color: 'melon',
  },
  EMAIL_OPENED: {
    name: 'eye',
    color: 'banana',
  },
  EMAIL_CLICKED: {
    name: 'cursorClickOutline',
    color: 'grape',
  },
  MEETING_DONE: {
    name: 'calendar',
    color: 'tomato',
  },
  CADENCE_ENDED: {
    name: 'cadence',
    color: 'softPeanut',
  },
  IMPORT_FAILED: {
    name: 'upload',
    color: 'tomato',
  },
  IMPORT_COMPLETED: {
    name: 'upload',
    color: 'melon',
  },
  IMPORT_COMPLETED_WITH_WARNINGS: {
    name: 'upload',
    color: 'banana',
  },
  COMPANY_ASSIGNED: {
    name: 'deliver',
    color: 'grape',
  },
  LEAD_ASSIGNED: {
    name: 'deliver',
    color: 'grape',
  },
  SALES_COMPANY_ASSIGNED: {
    name: 'deliver',
    color: 'peanut',
  },
  SALES_LEAD_ASSIGNED: {
    name: 'deliver',
    color: 'peanut',
  },
  RELATED_COMPANY_MEETING: {
    name: 'relatedCompanyMeeting',
    color: 'meeting',
  },
  RELATED_COMPANY_STATUS_ACCOUNT: {
    name: 'relatedCompanyStatus',
    color: 'gray',
  },
  RELATED_COMPANY_STATUS_CLIENT: {
    name: 'relatedCompanyStatus',
    color: 'gray',
  },
  RELATED_COMPANIES_OPPORTUNITY: {
    name: 'relatedCompanyOpportunity',
    color: 'peanut',
  },
  RELATED_COMPANY_ACTIVITY_INBOUND: {
    name: 'relatedCompanyInbound',
    color: 'banana',
  },
  RELATED_COMPANY_LEAD_INBOUND: {
    name: 'relatedCompanyLead',
    color: 'banana',
  },
  ACCOUNT_STOPPED: {
    name: 'alertTriangle',
    color: 'email',
  },
};
