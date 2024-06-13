import React, { useEffect, useState } from 'react';
import { useHubspotIntegration } from '../../../../hooks/useHubspotIntegration';
import SyncSettingsTab from '../../../../layouts/integrationLayout/syncSettingsTab';
import { useEntity } from '../../../../hooks';
import { CRM } from '../../../../constants/integrations';

const HubspotSyncSettings = () => {
  const { activeIntegration, disconnectIntegration } = useHubspotIntegration();
  const dealPipelines = activeIntegration?.pipeArray;
  const inboundTrigger = useEntity('accountIntegrationTriggers')?.all();
  const [existInbound, setExistInbound] = useState(false);
  useEffect(() => {
    if (inboundTrigger) {
      setExistInbound(inboundTrigger[0]?.name === 'INBOUND__HUBSPOT');
    }
  }, [inboundTrigger]);

  return (
    <>
      {dealPipelines && (
        <SyncSettingsTab
          crm={CRM.HUBSPOT}
          activeIntegration={activeIntegration}
          activityTrigger="ACTIVITY__HUBSPOT"
          disconnectIntegration={disconnectIntegration}
          dealsPipeline={dealPipelines}
          meetingTrigger="MEETING__HUBSPOT"
          leadTrigger="LEAD__HUBSPOT"
          opportunityTrigger="OPPORTUNITY__HUBSPOT"
          inboundTrigger={existInbound}
          companyTrigger="COMPANY__HUBSPOT"
        />
      )}
    </>
  );
};
export default HubspotSyncSettings;
