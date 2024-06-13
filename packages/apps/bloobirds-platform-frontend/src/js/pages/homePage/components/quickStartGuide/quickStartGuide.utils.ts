import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';
import { isBefore } from 'date-fns';

import { AdminQSGInfoType } from './quickStartGuide.types';

export const tooltipTextDictionary = {
  [UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE]: 'This step requires a cadence to be completed',
  [UserHelperKeys.SEND_YOUR_FIRST_EMAIL]:
    'This step requires a company or lead assigned to you to be completed',
  [UserHelperKeys.START_TASK_FROM_CADENCE]:
    'This step requires an active cadence, start one to complete it',
  [UserHelperKeys.MARK_AS_DONE_ATTEMPT]: 'This step requires a pending task done be completed',
};

export function getIsCompleted(
  userHelpers: Record<UserHelperKeys, Date>,
  key: UserHelperKeys,
  conditions: { [helperKey: string]: boolean },
) {
  //DEFAULT COMPLETE
  if (userHelpers && userHelpers[key]) return true;
  //PREVIOUS COMPLETION
  return !!conditions[key];
}

export function getIsDisabled(
  key: keyof typeof tooltipTextDictionary,
  conditions: { [helperKey: string]: boolean },
) {
  return {
    isDisabled: !!conditions[key],
    tooltipText: tooltipTextDictionary[key],
  };
}

export function getNavigation(
  linkNavigation: string,
  contactableBobjects: AdminQSGInfoType['contactableBobjects'],
  key: UserHelperKeys,
) {
  if (!linkNavigation && contactableBobjects) {
    const contactableCompany = contactableBobjects?.Company;
    const contactableLead = contactableBobjects?.Lead;
    if (!contactableCompany?.url && contactableLead?.url) return contactableLead.url;
    if (contactableCompany?.url && !contactableLead?.url) return contactableCompany.url;
    const wasCompanyCreatedFirst = isBefore(
      new Date(contactableCompany?.creationDateTime),
      new Date(contactableLead?.creationDateTime),
    );

    return `${
      wasCompanyCreatedFirst ? contactableCompany?.url : contactableLead?.url
    }?fromGuide=${key}`;
  }
  return linkNavigation;
}

export function getTourKeys(key: UserHelperKeys) {
  switch (key) {
    case UserHelperKeys.TAKE_TOUR_PROSPECT_TAB:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.COMPANIES_AND_LEADS_TOOLTIP},${UserHelperTooltipsKeys.ON_CADENCE_FILTERS},${UserHelperTooltipsKeys.ON_CADENCE_DISCOVERY_TOOLTIP},${UserHelperTooltipsKeys.START_TO_FINISH},${UserHelperTooltipsKeys.START_TASKS},`;
    case UserHelperKeys.TAKE_TOUR_ON_INBOX:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.INBOX_BULK_ACTIONS},${UserHelperTooltipsKeys.INBOX_INDIVIDUAL_ACTIONS},${UserHelperTooltipsKeys.INBOX_FILTERS},${UserHelperTooltipsKeys.INBOX_LEFT_SIDE_NAVIGATION},${UserHelperTooltipsKeys.INBOX_NO_TASKS},`;
    case UserHelperKeys.TAKE_TOUR_ON_OUTBOX:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.OUTBOX_AUTOMATED_EMAILS},${UserHelperTooltipsKeys.OUTBOX_SCHEDULED_ACTIONS},${UserHelperTooltipsKeys.OUTBOX_SCHEDULED_EMAILS},${UserHelperTooltipsKeys.OUTBOX_AUTOMATED_BULK},${UserHelperTooltipsKeys.OUTBOX_SCHEDULED_PAGE},${UserHelperTooltipsKeys.OUTBOX_SCHEDULED_NO_EMAILS},${UserHelperTooltipsKeys.OUTBOX_SCHEDULED_NO_EMAILS},`;
  }
}

export function getAdminTourKeys(key: UserHelperKeys) {
  switch (key) {
    case UserHelperKeys.TAKE_TOUR_PROSPECT_TAB:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.COMPANIES_AND_LEADS_TOOLTIP},${UserHelperTooltipsKeys.ON_CADENCE_FILTERS},${UserHelperTooltipsKeys.ON_CADENCE_DISCOVERY_TOOLTIP},${UserHelperTooltipsKeys.START_TO_FINISH},${UserHelperTooltipsKeys.START_TASKS},`;
    case UserHelperKeys.TAKE_TOUR_ON_GENERAL_SETTINGS:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.GENERAL_SETTINGS_ASSIGNMENTS},${UserHelperTooltipsKeys.GENERAL_SETTINGS_LEADS},${UserHelperTooltipsKeys.GENERAL_SETTINGS_MEETINGS}`;
    case UserHelperKeys.CONNECT_CRM_TOUR:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.NO_HUBSPOT_LOGS},${UserHelperTooltipsKeys.NO_SALESFORCE_LOGS},${UserHelperTooltipsKeys.SALESFORCE_USERS},${UserHelperTooltipsKeys.SALESFORCE_SYNCING},${UserHelperTooltipsKeys.SALESFORCE_LOGS},${UserHelperTooltipsKeys.SALESFORCE_OBJECTS_SYNCING},${UserHelperTooltipsKeys.SALESFORCE_FIELDS},${UserHelperTooltipsKeys.HUBSPOT_USERS},${UserHelperTooltipsKeys.HUBSPOT_FIELDS},${UserHelperTooltipsKeys.HUBSPOT_OBJECTS_SYNCING},${UserHelperTooltipsKeys.HUBSPOT_SYNCING},${UserHelperTooltipsKeys.HUBSPOT_LOGS}`;
    case UserHelperKeys.SET_UP_DASHBOARDS_TOUR:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.DASHBOARDS_FILTERS},${UserHelperTooltipsKeys.DASHBOARDS_GROUP_BY},${UserHelperTooltipsKeys.DASHBOARDS_DATE_FILTER},${UserHelperTooltipsKeys.DASHBOARDS_GENERAL}`;
    case UserHelperKeys.SET_COMPANY_FIELDS_TOUR:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.FIELDS_CREATE},${UserHelperTooltipsKeys.FIELDS_PREVIEW_FORMS},${UserHelperTooltipsKeys.FIELDS_CHOOSE_BOBJECT}`;
    case UserHelperKeys.SET_LEAD_FIELDS_TOUR:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.FIELDS_CREATE},${UserHelperTooltipsKeys.FIELDS_PREVIEW_FORMS},${UserHelperTooltipsKeys.FIELDS_CHOOSE_BOBJECT}`;
    case UserHelperKeys.TAKE_TOUR_ON_INBOX:
      // eslint-disable-next-line max-len
      return `${UserHelperTooltipsKeys.INBOX_BULK_ACTIONS},${UserHelperTooltipsKeys.INBOX_INDIVIDUAL_ACTIONS},${UserHelperTooltipsKeys.INBOX_FILTERS},${UserHelperTooltipsKeys.INBOX_LEFT_SIDE_NAVIGATION},${UserHelperTooltipsKeys.INBOX_NO_TASKS},`;
    default:
      return 'none';
  }
}

export function getSkippableText(key: string) {
  switch (key) {
    case UserHelperKeys.CONNECT_CRM_TOUR:
      return 'Mark step as completed without connecting a CRM';
  }
}
