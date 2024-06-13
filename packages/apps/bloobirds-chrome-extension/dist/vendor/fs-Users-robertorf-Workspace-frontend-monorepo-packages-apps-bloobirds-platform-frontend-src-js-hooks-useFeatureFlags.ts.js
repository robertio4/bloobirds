import useSWRImmutable from "/vendor/.vite-deps-swr_immutable.js__v--bb1109a9.js";
import SessionManagerFactory from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-apps-bloobirds-platform-frontend-src-js-misc-session-index.js.js";
const SessionManager = SessionManagerFactory();
export const useFeatureFlags = () => {
  const account = SessionManager.getAccount();
  const { data: featureFlags } = useSWRImmutable(`/featureFlags/feature/account/${account?.id}`);
  const isFlagEnabled = (flag) => {
    const featureFlag = featureFlags?.features?.find(
      (feature) => (feature.featureName || feature.featureType) === flag
    );
    return featureFlag ? featureFlag.active : false;
  };
  return { featureFlags, isFlagEnabled };
};
export const useInboundHubspotEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("INBOUND_HUBSPOT");
};
export const useFullSalesEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("SALES");
};
export const useSalesDashboardEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("DASHBOARD_SALES");
};
export const useOldReportingEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("OLD_REPORTING");
};
export const useSendFromMailEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("SEND_FROM_MAIL");
};
export const useDynamicsEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("DYNAMICS");
};
export const useVtigerEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("VTIGER");
};
export const useProductsEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("PRODUCTS");
};
export const useNewDashboardEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("NEW_DASHBOARDS");
};
export const useIntegrationApp = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("INTEGRATION_APP");
};
export const useSetCadenceEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("SET_CADENCE");
};
export const useNewMeetingTab = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("MEETING_SALES_TAB");
};
export const useProspectingNurturingTab = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("NURTURING_PROSPECT_TAB");
};
export const useSalesNurturingTab = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("NURTURING_SALES_TAB");
};
export const useSalesforceOauthEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("SALESFORCE_OAUTH");
};
export const useNewMeetingChartsEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("MEETING_TYPE_CHARTS");
};
export const useNewCadenceTableEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("NEW_CADENCE_TABLE");
};
export const useWhatsappEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("WHATSAPP");
};
export const useSnippetsEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("SNIPPETS");
};
export const useCreateReceivedMeeting = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("CREATE_RECEIVED_MEETING");
};
export const useTemplatesForEveryone = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("EVERY_TYPE_TEMPLATE");
};
export const useAllowHTMLTemplates = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("ALLOW_HTML_TEMPLATE_CREATION");
};
export const useManageUserTeamsEnabled = () => {
  const { isFlagEnabled } = useFeatureFlags();
  return isFlagEnabled("MANAGE_USER_TEAMS");
};
