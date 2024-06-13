import { CRM } from './integrations';

export interface UserObject {
  account: string;
  backgroundColor: string;
  bobjectField: string;
  bobjectGlobalPicklist: string;
  createdBy: string;
  creationDatetime: string;
  deprecated: boolean;
  description: string;
  enabled: boolean;
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
}

export enum DialerType {
  AIRCALL_DIALER = 'AIRCALL_DIALER',
  BLOOBIRDS_DIALER = 'BLOOBIRDS_DIALER',
  JUST_CALL_DIALER = 'JUST_CALL_DIALER',
  ASTROLINE_DIALER = 'ASTROLINE_DIALER',
  NUMINTEC_DIALER = 'NUMINTEC_DIALER',
  RINGOVER_DIALER = 'RINGOVER_DIALER',
}

export enum UserType {
  LICENSE_USER = 'LICENSE_USER',
  SUPPORT_USER = 'SUPPORT_USER',
  FREE_USER = 'FREE_USER',
}

export enum UserRole {
  GLOBAL_ADMIN = 'GLOBAL_ADMIN',
  ACCOUNT_ADMIN = 'ACCOUNT_ADMIN',
  ACCOUNT_USER = 'ACCOUNT_USER',
  ACCOUNT_DEV = 'ACCOUNT_DEV',
  GLOBAL_DEV = 'GLOBAL_DEV',
}

export type AccountSettings = {
  name: string;
  id: string;
  type: 'CUSTOMER' | 'TEMPLATE' | 'SALES_DEMO' | 'PARTNER_DEMO' | 'QA' | 'DEVELOPMENT';
  dialerTypes: DialerType[];
  twilioAccountSid: string;
  twilioApplicationSid: string;
  twilioAuthToken: string;
  enableCallRecording: string;
  createActivitiesWhenCompletingCallTasks: boolean;
  maxUsersAllowed: number;
  salesforceInstance: string;
  hubspotPortalId: string;
  accountCreationDatetime: string;
  language: 'en' | 'es';
  churned: boolean;
  customerSuccessCriteria: string;
  mainCRM: CRM;
};

export enum PermissionType {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  FORCED = 'FORCED',
}

export type UserSettings = {
  email: string;
  name: string;
  id: string;
  shortname: string;
  creationDateTime: Date | string;
  color: string;
  timeZone: string;
  dialerDefaultView: string;
  dialerType: DialerType;
  autoOpenPitchesInDialer: boolean;
  enableLogCall: boolean;
  active: boolean;
  remindersEnabled: boolean;
  remindersSoundEnabled: boolean;
  assignLinkedinLeads: boolean;
  remindersBeforeMinutes: number;
  employeeRole: string;
  permissions: UserPermission[];
  type: UserType;
  lastPasswordChangeDate: string;
  prospectionTaskNavigationMode: string;
  salesTaskNavigationMode: string;
  incomingCallsForwarding: boolean;
  ccfCloseAtNoAnswer: boolean;
  autoMarkAsDone: boolean;
  skipQuickStartGuide: boolean;
  roles: UserRole[];
  accountAdmin: boolean;
  autoSyncObjectsSalesforce: boolean;
  language: 'en' | 'es';
  autoLogCustomActivity: boolean;
  autoCloseLeftBar: boolean;
  otoUser: boolean;
  autoSyncWhatsappPermission: PermissionType;
  showOpportunityInWhatsapp: boolean;
  autoAssignLeadsLinkedin: boolean;
  autoInsertSignaturePermission: PermissionType;
  selectSignaturesPermission: PermissionType;
  emailTrackingNotificationsEnabled: boolean;
  hasCreateActivitiesWhenCompletingCallTasks: boolean;
  autoChangePhoneExtension: boolean;
};

export type GeneralSettings = {
  gmailConnectButtonEnabled: string;
  microsoftConnectButtonEnabled: boolean;
  gmailConnectButtonType: string;
  mailtoLinksType: string;
  openCalendarPopupAfterMeeting: boolean;
  meetingFieldsRequiredEnabled: boolean;
  contactBeforeMeetingWarning: boolean;
  contactBeforeMeetingTimeRange: {
    timeRange: string;
    time: number;
  };
  leadEmailMatching: boolean;
  calendarLinksType: string;
  propagateAssignedFromLeadToCompanyEnabled: boolean;
  propagateAssignedFromCompanyToLeadEnabled: boolean;
  contactBeforeMeetingOnWeekdays: boolean;
  showCCFAllTabs: boolean;
  endCCFAtStatus: boolean;
  calendarEventDecision: string;
  createMeetingAfterCalendarEvent: boolean;
};

export type Settings = {
  account: AccountSettings;
  user: UserSettings;
  settings: GeneralSettings;
};

export enum UserPermission {
  VIEW_INBOUND_TAB = 'VIEW_INBOUND_TAB',
  VIEW_INBOX = 'VIEW_INBOX',
  VIEW_ADD_QC_TAB = 'VIEW_ADD_QC_TAB',
  VIEW_ASSIGN_TAB = 'VIEW_ASSIGN_TAB',
  VIEW_ADD_LEADS_TAB = 'VIEW_ADD_LEADS_TAB',
  VIEW_PROSPECT_TAB = 'VIEW_PROSPECT_TAB',
  VIEW_SCHEDULED_TAB = 'VIEW_SCHEDULED_TAB',
  VIEW_MEETING_TAB = 'VIEW_MEETING_TAB',
  VIEW_SALES_TAB = 'VIEW_SALES_TAB',
  EDIT_ALL = 'EDIT_ALL',
  VIEW_DASHBOARDS_TAB = 'VIEW_DASHBOARDS_TAB',
  VIEW_OUTBOX_TAB = 'VIEW_OUTBOX_TAB',
  BULK_ACTIONS = 'BULK_ACTIONS',
  DOWNLOAD_LIST = 'DOWNLOAD_LIST',
  VIEW_CADENCES = 'VIEW_CADENCES',
  CUSTOM_TASK = 'CUSTOM_TASK',
  WHATSAPP_BUSINESS_ADMIN = 'WHATSAPP_BUSINESS_ADMIN',
  USER_ACTIVITY_VISIBILITY = 'USER_ACTIVITY_VISIBILITY',
}
