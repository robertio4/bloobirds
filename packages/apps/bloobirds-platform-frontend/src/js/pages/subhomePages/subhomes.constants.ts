import { ButtonTypes } from '../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/button.types';

export enum PROSPECTING_SLUGS {
  DELIVERED = 'delivered',
  NEW_DELIVERED = 'newDelivered',
  ON_CADENCE = 'onCadence',
  SCHEDULED = 'scheduled',
  MEETING = 'meetingTasks',
  NURTURING = 'nurturing',
  INACTIVE = 'inactive',
  ALL = 'all',
  ALL_MY_COMPANIES = 'allMyCompanies',
}

export enum SALES_SLUGS {
  COMPANIES_AND_LEADS = 'companiesAndLeads',
  ALL_MY_OPPS = 'allOpportunities',
  FOLLOW_UP = 'followUp',
  INACTIVE = 'inactive',
  INACTIVE_OPPS = 'inactiveOpps',
  MEETINGS = 'meetings',
  NURTURING = 'nurturing',
  APPOINTMENTS = 'appointments',
}

export const TAB_BUTTONS: Record<
  PROSPECTING_SLUGS | SALES_SLUGS,
  { [x: string]: ButtonTypes[] }
> = {
  [SALES_SLUGS.APPOINTMENTS]: {
    default: ['markAsDone'],
  },
  [PROSPECTING_SLUGS.DELIVERED]: {
    default: ['addLead', 'quickStart', 'setCadence'],
    leads: ['reassignCompany', 'quickStart', 'setCadence'],
  },
  [PROSPECTING_SLUGS.NEW_DELIVERED]: {
    default: ['addLead', 'quickStart', 'setCadence'],
    leads: ['reassignCompany', 'quickStart', 'setCadence'],
  },
  [SALES_SLUGS.COMPANIES_AND_LEADS]: {
    default: ['addTask', 'setCadence'],
    leads: ['reassignCompany', 'addTask', 'setCadence'],
  },
  [PROSPECTING_SLUGS.ON_CADENCE]: { default: ['markAsDone'] },
  scheduled: {
    default: ['reschedule', 'markAsDone'],
  },
  [PROSPECTING_SLUGS.MEETING]: {
    default: ['setCadence', 'markAsDone'],
  },
  [SALES_SLUGS.ALL_MY_OPPS]: {
    default: ['addTask', 'setCadence'],
  },
  [SALES_SLUGS.FOLLOW_UP]: {
    default: ['addTask', 'setCadence'],
  },
  [PROSPECTING_SLUGS.INACTIVE]: {
    default: ['addTask', 'setCadence'],
    leads: ['addTask', 'setCadence'],
    opportunities: ['addTask', 'setCadence'],
  },
  [SALES_SLUGS.MEETINGS]: {
    default: ['markAsDone'],
  },
  [SALES_SLUGS.INACTIVE_OPPS]: {
    default: ['addTask', 'setCadence'],
  },
  [PROSPECTING_SLUGS.ALL]: {
    default: ['addLead', 'addTask', 'setCadence'],
    leads: ['reassignCompany', 'addTask', 'setCadence'],
  },
};
