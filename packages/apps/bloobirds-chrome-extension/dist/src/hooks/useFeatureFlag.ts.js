import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useAccountId } from "/src/hooks/useAccountId.ts.js";
var FeatureName = /* @__PURE__ */ ((FeatureName2) => {
  FeatureName2["SALES_CONVERSION"] = "SALES_CONVERSION";
  FeatureName2["SALESFORCE_LAYER"] = "SALESFORCE_LAYER";
  FeatureName2["NURTURING_PROSPECT_TAB"] = "NURTURING_PROSPECT_TAB";
  FeatureName2["QUICK_START_GUIDE"] = "QUICK_START_GUIDE";
  FeatureName2["FULL_SALES_ENABLED"] = "FULL_SALES_ENABLED";
  FeatureName2["SYNC_SF_LISTS"] = "SYNC_SF_LISTS";
  return FeatureName2;
})(FeatureName || {});
export function useFeatureFlag(featureName) {
  const accountId = useAccountId();
  const { data: active } = useSWR(
    accountId ? `/featureFlags/feature/${featureName}/${accountId}` : null,
    async (url) => {
      const response = await api.get(url);
      return response.data?.active;
    }
  );
  return active ?? false;
}
export function useSalesforceLayerEnabled() {
  return useFeatureFlag("SALESFORCE_LAYER" /* SALESFORCE_LAYER */);
}
export function useSalesforceSyncListEnabled() {
  return useFeatureFlag("SYNC_SF_LISTS" /* SYNC_SF_LISTS */);
}
