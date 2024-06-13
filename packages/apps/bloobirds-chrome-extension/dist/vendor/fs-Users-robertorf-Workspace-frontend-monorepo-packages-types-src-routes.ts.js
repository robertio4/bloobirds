import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-bobjects.ts.js";
export const HOME = "/";
export const TERMS_AND_CONDITIONS = "/master-subscription-agreement";
export const PRIVACY_POLICY = "/privacy-policy";
export const LOGIN = "/login";
export const EXTERNAL_ACTION = "/externalAction";
export const EXTERNAL_ACTION_VALIDATE_EMAIL = `${EXTERNAL_ACTION}/validateEmail`;
export const EXTERNAL_ACTION_RESET_PASSWORD = `${EXTERNAL_ACTION}/resetPassword`;
export const EXTERNAL_ACTION_REQUEST_RESET_PASSWORD = `${EXTERNAL_ACTION}/requestResetPassword`;
export const EXTERNAL_ACTION_CONFIRM_INVITATION = `${EXTERNAL_ACTION}/userInvitation`;
export const EXTERNAL_ACTION_SIGN_AS = `${EXTERNAL_ACTION}/signAs`;
export const APP = "/app";
export const APP_TASKS = `${APP}/tasks`;
export const APP_TASKS_INBOX = `${APP_TASKS}/inbox`;
export const APP_TASKS_INBOX_SECTION = `${APP_TASKS}/inbox/:slug?`;
export const APP_TASKS_ADD_QC = `${APP_TASKS}/addQc`;
export const APP_TASKS_INBOUND = `${APP_TASKS}/inbound`;
export const APP_TASKS_INBOUND_MQL = `${APP_TASKS_INBOUND}/mql`;
export const APP_TASKS_INBOUND_SAL = `${APP_TASKS_INBOUND}/sal`;
export const APP_TASKS_ASSIGN_QC = `${APP_TASKS}/assignQc`;
export const APP_TASKS_DONE = `${APP_TASKS}/done`;
export const APP_TASKS_WELCOME = `${APP_TASKS}/welcome`;
export const APP_TASKS_TASK = `${APP_TASKS}/:id`;
export const APP_TASKS_PROSPECTING = `${APP_TASKS}/prospecting`;
export const APP_TASKS_PROSPECTING_SECTION = `${APP_TASKS}/prospecting/:slug?/:section?`;
export const APP_TASKS_SALES = `${APP_TASKS}/sales`;
export const APP_TASKS_SALES_SECTION = `${APP_TASKS}/sales/:slug?/:section?`;
export const APP_TASKS_OUTBOX = `${APP_TASKS}/outbox`;
export const APP_TASKS_OUTBOX_SECTION = `${APP_TASKS}/outbox/:slug?`;
export const APP_CL = `${APP}/cl`;
export const APP_CL_LEADS = `${APP_CL}/leads`;
export const APP_CL_COMPANIES = `${APP_CL}/companies`;
export const APP_CL_OPPORTUNITIES = `${APP_CL}/opportunities`;
export const APP_CL_IMPORT = `${APP_CL}/import`;
export const APP_CL_IMPORT_HISTORY = `${APP_CL}/import/history`;
export const APP_CL_ACTIVITIES = `${APP_CL}/activities`;
export const APP_CL_TASKS = `${APP_CL}/tasks`;
export const APP_CL_LISTS = `${APP_CL}/lists`;
export const APP_CL_MEETINGS = `${APP_CL}/meetings`;
export const APP_CL_COMPANIES_NEW_VIEW = `${APP_CL_COMPANIES}?newView=true`;
export const APP_CL_LEADS_NEW_VIEW = `${APP_CL_LEADS}?newView=true`;
export const APP_CL_ACTIVITIES_NEW_VIEW = `${APP_CL_ACTIVITIES}?newView=true`;
export const APP_CL_OPPORTUNITIES_NEW_VIEW = `${APP_CL_OPPORTUNITIES}?newView=true`;
export const APP_CL_TASKS_NEW_VIEW = `${APP_CL_TASKS}?newView=true`;
export const APP_CL_COMPANIES_COMPANY = `${APP_CL_COMPANIES}/:id`;
export const APP_CL_COMPANIES_COMPANY_TASK = `${APP_CL_COMPANIES}/:companyId/tasks/:taskId`;
export const APP_CL_COMPANIES_COMPANY_OPPORTUNITY = `${APP_CL_COMPANIES}/:id/opportunities/:opportunityId`;
export const APP_CL_LEADS_LEAD = `${APP_CL_LEADS}/:id`;
export const APP_CL_OPPORTUNITIES_OPPORTUNITY = `${APP_CL_OPPORTUNITIES}/:id`;
export const APP_CADENCES = `${APP}/cadences`;
export const APP_CADENCES_MANAGE = `${APP_CADENCES}/manage`;
export const APP_CADENCES_ANALYZE = `${APP_CADENCES}/analyze`;
export const APP_CADENCES_EDIT = `${APP_CADENCES}/edit`;
export const APP_SINGLE_CADENCE = `${APP_CADENCES}/:cadenceId`;
export const APP_CADENCES_ANALYZE_CADENCE = `${APP_CADENCES_ANALYZE}/:slug`;
export const APP_DASHBOARD = `${APP}/dashboards`;
export const APP_DASHBOARD_PROSPECTING = `${APP_DASHBOARD}/prospecting`;
export const APP_DASHBOARD_SALES = `${APP_DASHBOARD}/sales`;
export const APP_DASHBOARD_PROSPECTING_SECTION = `${APP_DASHBOARD_PROSPECTING}/:slug`;
export const APP_DASHBOARD_SALES_SECTION = `${APP_DASHBOARD_SALES}/:slug`;
export const APP_AI_ANALYSIS = `${APP}/ai-analysis`;
export const APP_MANAGEMENT = `${APP}/management`;
export const APP_MANAGEMENT_USER = `${APP_MANAGEMENT}/user`;
export const APP_ACCOUNT = `${APP}/account-settings`;
export const APP_ACCOUNT_GENERAL_SETTINGS = `${APP_ACCOUNT}/general-settings`;
export const APP_ACCOUNT_SALES_TEAM = `${APP_ACCOUNT}/sales-team`;
export const APP_ACCOUNT_CHROME_EXTENSION = `${APP_ACCOUNT}/chrome-extension`;
export const APP_ACCOUNT_DIALERS = `${APP_ACCOUNT}/dialers`;
export const APP_ACCOUNT_DIALERS_TWILIO = `${APP_ACCOUNT_DIALERS}/twilio`;
export const APP_ACCOUNT_DIALERS_AIRCALL = `${APP_ACCOUNT_DIALERS}/aircall`;
export const APP_ACCOUNT_DIALERS_JUSTCALL = `${APP_ACCOUNT_DIALERS}/justcall`;
export const APP_ACCOUNT_DIALERS_AIRCALL_REDIRECT = `${APP_ACCOUNT}/aircall`;
export const APP_ACCOUNT_EMAILS = `${APP_ACCOUNT}/emails`;
export const APP_ACCOUNT_NOTIFICATIONS = `${APP_ACCOUNT}/notifications`;
export const APP_ACCOUNT_VIEWS = `${APP_ACCOUNT}/views`;
export const APP_ACCOUNT_FIELDS = `${APP_ACCOUNT}/fields`;
export const APP_ACCOUNT_GLOBAL_PICKLISTS = `${APP_ACCOUNT}/global-picklists`;
export const APP_ACCOUNT_GROUPS = `${APP_ACCOUNT}/groups`;
export const APP_AUTOMATIONS = `${APP_ACCOUNT}/automations`;
export const APP_ACCOUNT_FIELD_DEPENDENCIES = `${APP_ACCOUNT}/field-dependencies`;
export const APP_ACCOUNT_INTEGRATION = `${APP_ACCOUNT}/integration`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE = `${APP_ACCOUNT_INTEGRATION}/salesforce`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_TAB = `${APP_ACCOUNT_INTEGRATION}/salesforce/:tab`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_CONNECT = `${APP_ACCOUNT_INTEGRATION}/salesforce/connect`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_SETTINGS = `${APP_ACCOUNT_INTEGRATION}/salesforce/settings`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS = `${APP_ACCOUNT_INTEGRATION}/salesforce/sync`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_USERS = `${APP_ACCOUNT_INTEGRATION}/salesforce/users`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING = `${APP_ACCOUNT_INTEGRATION}/salesforce/mapping`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING_NAME = `${APP_ACCOUNT_INTEGRATION}/salesforce/:tab/:mappingName`;
export const APP_ACCOUNT_INTEGRATION_SALESFORCE_OAUTH = `${APP_ACCOUNT_INTEGRATION}/salesforce/oauth`;
export const APP_ACCOUNT_INTEGRATION_HUBSPOT_TAB = `${APP_ACCOUNT_INTEGRATION}/hubspot/:tab`;
export const APP_ACCOUNT_INTEGRATION_HUBSPOT_CONNECT = `${APP_ACCOUNT_INTEGRATION}/hubspot/connect`;
export const APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_SETTINGS = `${APP_ACCOUNT_INTEGRATION}/hubspot/settings`;
export const APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS = `${APP_ACCOUNT_INTEGRATION}/hubspot/sync`;
export const APP_ACCOUNT_INTEGRATION_HUBSPOT_USERS = `${APP_ACCOUNT_INTEGRATION}/hubspot/users`;
export const APP_ACCOUNT_INTEGRATION_HUBSPOT_MAPPING = `${APP_ACCOUNT_INTEGRATION}/hubspot/mapping`;
export const APP_ACCOUNT_INTEGRATION_HUBSPOT_OAUTH = `${APP_ACCOUNT_INTEGRATION}/hubspot/oauth`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_TAB = `${APP_ACCOUNT_INTEGRATION}/msndynamics/:tab`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_CONNECT = `${APP_ACCOUNT_INTEGRATION}/msndynamics/connect`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_SYNC_STATUS = `${APP_ACCOUNT_INTEGRATION}/msndynamics/sync`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_SYNC_PICKLIST_MAPPINGS = `${APP_ACCOUNT_INTEGRATION}/msndynamics/picklists`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_ACTIONS = `${APP_ACCOUNT_INTEGRATION}/msndynamics/actions`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_MAPPING = `${APP_ACCOUNT_INTEGRATION}/msndynamics/mapping`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_USERS = `${APP_ACCOUNT_INTEGRATION}/msndynamics/users`;
export const APP_ACCOUNT_INTEGRATION_DYNAMICS_SETTINGS = `${APP_ACCOUNT_INTEGRATION}/dynamics/settings`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_TAB = `${APP_ACCOUNT_INTEGRATION}/vtiger/:tab`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_CONNECT = `${APP_ACCOUNT_INTEGRATION}/vtiger/connect`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_SYNC_STATUS = `${APP_ACCOUNT_INTEGRATION}/vtiger/sync`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_SYNC_PICKLIST_MAPPINGS = `${APP_ACCOUNT_INTEGRATION}/vtiger/picklists`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_ACTIONS = `${APP_ACCOUNT_INTEGRATION}/vtiger/actions`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_MAPPING = `${APP_ACCOUNT_INTEGRATION}/vtiger/mapping`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_USERS = `${APP_ACCOUNT_INTEGRATION}/vtiger/users`;
export const APP_ACCOUNT_INTEGRATION_VTIGER_SETTINGS = `${APP_ACCOUNT_INTEGRATION}/vtiger/settings`;
export const APP_ACCOUNT_INTEGRATION_API_KEY = `${APP_ACCOUNT_INTEGRATION}/apiKey`;
export const IAPP_INTEGRATIONS = [
  "pipedrive"
];
export const integrationURLs = (integrationKey = ":integrationKey") => {
  return {
    APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_TAB: `${APP_ACCOUNT_INTEGRATION}/iapp/${integrationKey}/:tab`,
    APP_ACCOUNT_INTEGRATIONINTEGRATIONAPP_CONNECT: `${APP_ACCOUNT_INTEGRATION}/iapp/${integrationKey}/connect`,
    APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_SYNC_SETTINGS: `${APP_ACCOUNT_INTEGRATION}/iapp/${integrationKey}/settings`,
    APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_USERS: `${APP_ACCOUNT_INTEGRATION}/iapp/${integrationKey}/users`
  };
};
export const APP_PLAYBOOK = `${APP}/playbook`;
export const APP_PLAYBOOK_TARGET_MARKET = `${APP_PLAYBOOK}/target-markets`;
export const APP_PLAYBOOK_BUYER_PERSONAS = `${APP_PLAYBOOK}/buyer-personas`;
export const APP_PLAYBOOK_SCENARIOS = `${APP_PLAYBOOK}/scenarios`;
export const APP_PLAYBOOK_CADENCES = `${APP_PLAYBOOK}/cadences`;
export const APP_PLAYBOOK_CADENCES_EDIT = `${APP_PLAYBOOK_CADENCES}/edit`;
export const APP_PLAYBOOK_SINGLE_CADENCE = `${APP_PLAYBOOK_CADENCES}/:cadenceId`;
export const APP_PLAYBOOK_PRODUCTS = `${APP_PLAYBOOK}/products`;
export const APP_PLAYBOOK_PRODUCTS_CATEGORIES = `${APP_PLAYBOOK}/products/categories`;
export const APP_PLAYBOOK_MESSAGING_SEGMENTATION = `${APP_PLAYBOOK}/messaging-segmentation`;
export const APP_PLAYBOOK_SALES_PIPELINE = `${APP_PLAYBOOK}/sales-pipeline`;
export const APP_PLAYBOOK_MESSAGING = `${APP_PLAYBOOK}/messaging`;
export const APP_PLAYBOOK_MESSAGING_PITCH = `${APP_PLAYBOOK_MESSAGING}/pitch`;
export const APP_PLAYBOOK_MESSAGING_PITCH_FORM = `${APP_PLAYBOOK_MESSAGING_PITCH}/form`;
export const APP_PLAYBOOK_MESSAGING_EMAIL = `${APP_PLAYBOOK_MESSAGING}/email`;
export const APP_PLAYBOOK_MESSAGING_EMAIL_FORM = `${APP_PLAYBOOK_MESSAGING_EMAIL}/form`;
export const APP_PLAYBOOK_MESSAGING_LINKEDIN = `${APP_PLAYBOOK_MESSAGING}/linkedin`;
export const APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM = `${APP_PLAYBOOK_MESSAGING_LINKEDIN}/form`;
export const APP_PLAYBOOK_MESSAGING_QQ = `${APP_PLAYBOOK_MESSAGING}/qq`;
export const APP_PLAYBOOK_MESSAGING_QQ_FORM = `${APP_PLAYBOOK_MESSAGING_QQ}/form`;
export const APP_PLAYBOOK_MESSAGING_QQ_SCORES = `${APP_PLAYBOOK_MESSAGING_QQ}/scores`;
export const APP_PLAYBOOK_MESSAGING_QQ_ONE = `${APP_PLAYBOOK_MESSAGING_QQ}/:id`;
export const APP_PLAYBOOK_MESSAGING_WORKFLOWS = `${APP_PLAYBOOK_MESSAGING}/workflows`;
export const APP_PLAYBOOK_MESSAGING_WORKFLOWS_EDIT = `${APP_PLAYBOOK_MESSAGING_WORKFLOWS}/edit`;
export const APP_MANAGEMENT_ACCOUNT = `${APP_MANAGEMENT}/account`;
const APP_MANAGEMENT_ACCOUNT_CONFIGURATION = `${APP_MANAGEMENT_ACCOUNT}/configuration`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE_TAB = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce/:tab`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE_CONNECT = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce/connect`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE_SYNC_SETTINGS = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce/settings`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE_SYNC_STATUS = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce/sync`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE_USERS = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce/users`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE_MAPPING = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce/mapping`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_SALESFORCE_OAUTH = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/salesforce/oauth`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_HUBSPOT_TAB = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/hubspot/:tab`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_HUBSPOT_CONNECT = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/hubspot/connect`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_HUBSPOT_SYNC_SETTINGS = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/hubspot/settings`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_HUBSPOT_SYNC_STATUS = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/hubspot/sync`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_HUBSPOT_USERS = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/hubspot/users`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_HUBSPOT_MAPPING = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/hubspot/mapping`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_HUBSPOT_OAUTH = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/hubspot/oauth`;
export const APP_MANAGEMENT_ACCOUNT_CONFIGURATION_INTEGRATION_DYNAMICS_TAB = `${APP_MANAGEMENT_ACCOUNT_CONFIGURATION}/integrations/dynamics`;
export const APP_MANAGEMENT_ACCOUNT_DIALERS = `${APP_MANAGEMENT_ACCOUNT}/dialer`;
export const APP_MANAGEMENT_ACCOUNT_DIALERS_TWILIO = `${APP_MANAGEMENT_ACCOUNT}/dialer/twilio`;
export const APP_MANAGEMENT_ACCOUNT_DIALERS_AIRCALL = `${APP_MANAGEMENT_ACCOUNT}/dialer/aircall`;
export const APP_MANAGEMENT_ACCOUNT_DIALERS_AIRCALL_REDIRECT = `${APP_MANAGEMENT_ACCOUNT}/aircall`;
const APP_MANAGEMENT_ACCOUNT_PREFERENCES = `${APP_MANAGEMENT_ACCOUNT}/preferences`;
export const APP_MANAGEMENT_ACCOUNT_PREFERENCES_USERS = `${APP_MANAGEMENT_ACCOUNT_PREFERENCES}/users`;
export const APP_MANAGEMENT_ACCOUNT_PREFERENCES_GENERAL_SETTINGS = `${APP_MANAGEMENT_ACCOUNT_PREFERENCES}/generalSettings`;
export const APP_MANAGEMENT_ACCOUNT_PREFERENCES_NOTIFICATIONS = `${APP_MANAGEMENT_ACCOUNT_PREFERENCES}/notifications`;
export const APP_MANAGEMENT_ACCOUNT_PREFERENCES_VIEWS = `${APP_MANAGEMENT_ACCOUNT_PREFERENCES}/views`;
const APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT = `${APP_MANAGEMENT_ACCOUNT}/dataManagement`;
export const APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT_FIELDS = `${APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT}/fields`;
export const APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT_GLOBAL_PICKLISTS = `${APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT}/globalPicklists`;
export const APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT_GROUPS = `${APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT}/groups`;
export const APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT_DEPENDENCIES = `${APP_MANAGEMENT_ACCOUNT_DATA_MANAGEMENT}/dependencies`;
const APP_MANAGEMENT_ACCOUNT_MESSAGING = `${APP_MANAGEMENT_ACCOUNT}/messaging`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_PITCH = `${APP_MANAGEMENT_ACCOUNT_MESSAGING}/pitch`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_EMAIL = `${APP_MANAGEMENT_ACCOUNT_MESSAGING}/email`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_LINKEDIN = `${APP_MANAGEMENT_ACCOUNT_MESSAGING}/linkedin`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_QQ = `${APP_MANAGEMENT_ACCOUNT_MESSAGING}/qq`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_SEGMENTATION = `${APP_MANAGEMENT_ACCOUNT_MESSAGING}/messaging-segmentation`;
const APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS = `${APP_MANAGEMENT_ACCOUNT_MESSAGING}/business-assets`;
export const APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_TARGET_MARKET = `${APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS}/targetMarkets`;
export const APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_BUYER_PERSONAS = `${APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS}/buyerPersonas`;
export const APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_SCENARIOS = `${APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS}/scenarios`;
export const APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_CADENCES = `${APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS}/cadences`;
export const APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_CADENCES_EDIT = `${APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_CADENCES}/edit`;
export const APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_SINGLE_CADENCE = `${APP_MANAGEMENT_ACCOUNT_BUSINESS_ASSETS_CADENCES}/:cadenceId`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_EMAIL_FORM = `${APP_MANAGEMENT_ACCOUNT_MESSAGING_EMAIL}/form`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_LINKEDIN_FORM = `${APP_MANAGEMENT_ACCOUNT_MESSAGING_LINKEDIN}/form`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_PITCH_FORM = `${APP_MANAGEMENT_ACCOUNT_MESSAGING_PITCH}/form`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_QQ_FORM = `${APP_MANAGEMENT_ACCOUNT_MESSAGING_QQ}/form`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_QQ_SCORES = `${APP_MANAGEMENT_ACCOUNT_MESSAGING_QQ}/scores`;
export const APP_MANAGEMENT_ACCOUNT_MESSAGING_QQ_ONE = `${APP_MANAGEMENT_ACCOUNT_MESSAGING_QQ}/:id`;
export const cadenceEditUrl = (cadenceId) => `${APP_PLAYBOOK_CADENCES_EDIT}?cadence=${encodeURIComponent(cadenceId)}`;
export const cadenceEditUrlV2 = (cadenceId) => `${APP_CADENCES_EDIT}?cadence=${encodeURIComponent(cadenceId)}`;
export const workflowEditUrl = (workflowId) => `${APP_PLAYBOOK_MESSAGING_WORKFLOWS_EDIT}?workflow=${workflowId}`;
export const taskUrl = (task) => `${APP_TASKS}/${task.id.objectId}`;
export const activityUrl = (activity) => `${APP_CL_ACTIVITIES}/${activity.id.objectId}`;
export const companyUrl = (company) => {
  if (company) {
    return `${APP_CL_COMPANIES}/${company.id.objectId}`;
  }
  return APP_CL_COMPANIES;
};
export const companyIdUrl = (companyId) => {
  if (companyId?.indexOf("/") > 0) {
    companyId = companyId.split("/")[2];
  }
  return `${APP_CL_COMPANIES}/${companyId}`;
};
export const opportunityUrl = (companyId, opportunityId) => !companyId ? `${APP_CL_OPPORTUNITIES}/${opportunityId}` : `${APP_CL_COMPANIES}/${companyId}/opportunities/${opportunityId}`;
export const companyTaskUrl = (companyId, taskId) => {
  if (companyId?.indexOf("/") > 0) {
    companyId = companyId.split("/")[2];
  }
  return `${APP_CL_COMPANIES}/${companyId}/tasks/${taskId.id.objectId}`;
};
export const leadTaskUrl = (leadId, taskId) => {
  if (leadId?.indexOf("/") > 0) {
    leadId = leadId.split("/")[2];
  }
  return `${APP_CL_LEADS}/${leadId}/tasks/${taskId.id.objectId}`;
};
export const leadUrl = (lead, company) => {
  if (typeof lead === "string") {
    if (lead?.indexOf("/") > 0) {
      lead = lead.split("/")[2];
    }
    return `${APP_CL_LEADS}/${lead}`;
  }
  if (company?.id?.objectId) {
    return `${APP_CL_COMPANIES}/${company?.id?.objectId}?leadId=${lead?.id?.value}`;
  }
  return `${APP_CL_LEADS}/${lead?.id?.objectId}`;
};
export const bobjectUrl = (bobject, referencedBobject = { id: void 0 }) => {
  if (!bobject) {
    return "";
  }
  const bobjectType = bobject?.id?.typeName;
  if (bobjectType === BobjectTypes.Company) {
    return companyUrl(bobject);
  }
  if (bobjectType === BobjectTypes.Lead) {
    return leadUrl(bobject, referencedBobject);
  }
  if (bobjectType === BobjectTypes.Task) {
    return taskUrl(bobject);
  }
  if (bobjectType === BobjectTypes.Activity) {
    return activityUrl(bobject);
  }
  if (bobjectType === BobjectTypes.Opportunity) {
    return opportunityUrl(referencedBobject?.id?.objectId, bobject?.id?.objectId);
  }
  throw new Error(`Cannot generate url of bobject type ${bobjectType}`);
};
