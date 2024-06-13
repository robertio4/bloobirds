import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWRImmutable from "/vendor/.vite-deps-swr_immutable.js__v--bb1109a9.js";
export const useFeatureFlags = (accountId) => {
  const { data: featureFlags } = useSWRImmutable(
    accountId ? `/featureFlags/feature/account/${accountId}` : null,
    () => api.get(`/featureFlags/feature/account/${accountId}`),
    {
      revalidateOnFocus: false
    }
  );
  const featureFlagsArray = featureFlags?.features || featureFlags?.data?.features;
  const isFlagEnabled = (flag) => {
    const featureFlag = featureFlagsArray?.find(
      (feature) => feature?.featureType === flag || feature?.featureName === flag
    );
    return featureFlag ? featureFlag.active : false;
  };
  return { featureFlags, isFlagEnabled };
};
export const useInboundHubspotEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("INBOUND_HUBSPOT");
};
export const useFullSalesEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SALES");
};
export const useSalesDashboardEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("DASHBOARD_SALES");
};
export const useOldReportingEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("OLD_REPORTING");
};
export const useSendFromMailEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SEND_FROM_MAIL");
};
export const useDynamicsEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("DYNAMICS");
};
export const useVtigerEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("VTIGER");
};
export const useProductsEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("PRODUCTS");
};
export const useSalesFollowUpEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SALES_FOLLOW_UP_TAB");
};
export const useNewDashboardEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NEW_DASHBOARDS");
};
export const useCompaniesAndLeadsEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SALES_COMPANIES_LEADS_TAB");
};
export const useSalesInactiveTabEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SALES_INACTIVE_TAB");
};
export const useIntegrationApp = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("INTEGRATION_APP");
};
export const useSetCadenceEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SET_CADENCE");
};
export const useNewMeetingTab = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("MEETING_SALES_TAB");
};
export const useProspectingNurturingTab = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NURTURING_PROSPECT_TAB");
};
export const useSalesNurturingTab = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NURTURING_SALES_TAB");
};
export const useSalesforceOauthEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SALESFORCE_OAUTH");
};
export function useSalesforceLeftBarEnabled(accountId) {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SALESFORCE_LAYER");
}
export function useNewCadenceTableEnabled(accountId) {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NEW_CADENCE_TABLE");
}
export const useSnippetsEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SNIPPETS");
};
export const useCadenceV2Enabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("CADENCES_V2");
};
export const useSalesforceUserAuthEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SALESFORCE_USER_INTEGRATION");
};
export const useCustomWizardsEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("CUSTOM_WIZARDS");
};
export const useCopilotEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("COPILOT");
};
export const useNumintecEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NUMINTEC_DIALER");
};
export const useChangeLanguageEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("CHANGE_LANGUAGE");
};
export const useTimeSlotsEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("CALENDAR_SLOTS");
};
export const useWhatsappEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("WHATSAPP");
};
export const useNewActivityFeed = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NEW_ACTIVITY_FEED");
};
export const useNewLastActivity = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NEW_LAST_ACTIVITY");
};
export const useOtoSyncWithRelatedObjects = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("OTO_SYNC_WITH_RELATED_OBJECTS");
};
export const useNotificationRemindersEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("CALL_RESULT_NOTIFICATION_REMINDERS");
};
export const useAllowBLinksInCRM = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("B_LINKS_IN_CRM");
};
export const useSWRLifespanEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SWR_LIFESPAN");
};
export const useHasNewTaskFeed = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NEW_TASK_FEED");
};
export const useOtoUpdateContactId = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("OTO_SYNC_UPDATE_CONTACT_ID");
};
export const useNumintecNewDialerVersion = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("NUMINTEC_DIALER_NEW_VERSION");
};
export const useWhatsappOpenNewPage = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("WHATSAPP_NEW_PAGE");
};
export const useAiAnalysisEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("COPILOT");
};
export const useManageUserTeamsEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("MANAGE_USER_TEAMS");
};
export const useSentryUserFeedbackEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("SENTRY_FEEDBACK_CAPTURING");
};
export const useTimezonesEnabled = (accountId) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled("TIME_ZONES");
};
