import React from 'react';
import SyncStatusTab from '../../../../layouts/integrationLayout/syncStatusTabTemplate';
import { useFeatureFlags } from '../../../../hooks/useFeatureFlags';
import { CRM } from '../../../../constants/integrations';

const SyncStatusHubspot = () => {
  const integrationType = ['HUBSPOT'];
  const { isFlagEnabled } = useFeatureFlags();
  const isActiveHubspotInbound = isFlagEnabled('INBOUND_HUBSPOT');

  if (isActiveHubspotInbound) {
    integrationType.push('INBOUND_HUBSPOT');
  }

  return <SyncStatusTab syncDirectionOptions={integrationType} crm={CRM.HUBSPOT} />;
};
export default SyncStatusHubspot;
