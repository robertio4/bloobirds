import useSWR from 'swr';

import { api } from '../utils/api';
import { useAccountId } from './useAccountId';

enum FeatureName {
  SALES_CONVERSION = 'SALES_CONVERSION',
  SALESFORCE_LAYER = 'SALESFORCE_LAYER',
  NURTURING_PROSPECT_TAB = 'NURTURING_PROSPECT_TAB',
  QUICK_START_GUIDE = 'QUICK_START_GUIDE',
  FULL_SALES_ENABLED = 'FULL_SALES_ENABLED',
  SYNC_SF_LISTS = 'SYNC_SF_LISTS',
}

interface FeatureFlagResponse {
  active: boolean;
  featureName?: string;
  featureType?: string;
  accountId: string;
  flagId: string;
}

export function useFeatureFlag(featureName: FeatureName) {
  const accountId = useAccountId();
  const { data: active } = useSWR(
    accountId ? `/featureFlags/feature/${featureName}/${accountId}` : null,
    async (url: string) => {
      const response = await api.get<FeatureFlagResponse>(url);
      return response.data?.active;
    },
  );

  return active ?? false;
}

export function useSalesforceLayerEnabled() {
  return useFeatureFlag(FeatureName.SALESFORCE_LAYER);
}

export function useSalesforceSyncListEnabled() {
  return useFeatureFlag(FeatureName.SYNC_SF_LISTS);
}
