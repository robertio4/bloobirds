import { api } from '@bloobirds-it/utils';
import useSWRImmutable from 'swr/immutable';

export const useFeatureFlags = (accountId: string) => {
  const { data: featureFlags }: any = useSWRImmutable(
    accountId ? `/featureFlags/feature/account/${accountId}` : null,
    () => api.get(`/featureFlags/feature/account/${accountId}`),
    {
      revalidateOnFocus: false,
    },
  );

  const featureFlagsArray = featureFlags?.features || featureFlags?.data?.features;
  const isFlagEnabled = (flag: string): boolean => {
    const featureFlag = featureFlagsArray?.find(
      (feature: { featureType?: string; featureName?: string }) =>
        feature?.featureType === flag || feature?.featureName === flag,
    );
    return featureFlag ? featureFlag.active : false;
  };

  return { featureFlags, isFlagEnabled };
};

export const useInboundHubspotEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('INBOUND_HUBSPOT');
};

export const useFullSalesEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SALES');
};

export const useSalesDashboardEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('DASHBOARD_SALES');
};

export const useOldReportingEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('OLD_REPORTING');
};

export const useSendFromMailEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SEND_FROM_MAIL');
};

export const useDynamicsEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('DYNAMICS');
};

export const useVtigerEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('VTIGER');
};

export const useProductsEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('PRODUCTS');
};

export const useSalesFollowUpEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SALES_FOLLOW_UP_TAB');
};

export const useNewDashboardEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NEW_DASHBOARDS');
};

export const useCompaniesAndLeadsEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SALES_COMPANIES_LEADS_TAB');
};

export const useSalesInactiveTabEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SALES_INACTIVE_TAB');
};

export const useIntegrationApp = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('INTEGRATION_APP');
};

export const useSetCadenceEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SET_CADENCE');
};

export const useNewMeetingTab = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('MEETING_SALES_TAB');
};

export const useProspectingNurturingTab = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NURTURING_PROSPECT_TAB');
};

export const useSalesNurturingTab = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NURTURING_SALES_TAB');
};

export const useSalesforceOauthEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SALESFORCE_OAUTH');
};

export function useSalesforceLeftBarEnabled(accountId: string) {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SALESFORCE_LAYER');
}

export function useNewCadenceTableEnabled(accountId: string) {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NEW_CADENCE_TABLE');
}

export const useSnippetsEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SNIPPETS');
};

export const useCadenceV2Enabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('CADENCES_V2');
};

export const useSalesforceUserAuthEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SALESFORCE_USER_INTEGRATION');
};

export const useCustomWizardsEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('CUSTOM_WIZARDS');
};

export const useCopilotEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('COPILOT');
};

export const useNumintecEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NUMINTEC_DIALER');
};

export const useChangeLanguageEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('CHANGE_LANGUAGE');
};

export const useTimeSlotsEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('CALENDAR_SLOTS');
};

export const useWhatsappEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('WHATSAPP');
};

export const useNewActivityFeed = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NEW_ACTIVITY_FEED');
};

export const useNewLastActivity = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NEW_LAST_ACTIVITY');
};

export const useOtoSyncWithRelatedObjects = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('OTO_SYNC_WITH_RELATED_OBJECTS');
};

export const useNotificationRemindersEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('CALL_RESULT_NOTIFICATION_REMINDERS');
};

export const useAllowBLinksInCRM = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('B_LINKS_IN_CRM');
};

export const useSWRLifespanEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('SWR_LIFESPAN');
};

export const useHasNewTaskFeed = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NEW_TASK_FEED');
};

export const useOtoUpdateContactId = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('OTO_SYNC_UPDATE_CONTACT_ID');
};
export const useNumintecNewDialerVersion = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('NUMINTEC_DIALER_NEW_VERSION');
};

export const useWhatsappOpenNewPage = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('WHATSAPP_NEW_PAGE');
};

export const useAiAnalysisEnabled = (accountId: string) => {
  const { isFlagEnabled } = useFeatureFlags(accountId);
  return isFlagEnabled('COPILOT');
};
