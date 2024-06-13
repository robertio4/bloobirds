import React, { useEffect, useState } from 'react';
import SyncStatusTab from '../../../../layouts/integrationLayout/syncStatusTabTemplate';
import { useSalesforceIntegration } from '../../../../hooks/useSalesforceIntegration';
import { useFeatureFlags } from '../../../../hooks/useFeatureFlags';
import { CRM } from '../../../../constants/integrations';
import { api } from '@bloobirds-it/utils';

const SyncStatusSalesforce = () => {
  const { activeIntegration } = useSalesforceIntegration();
  const [apiUsage, setApiUsage] = useState({
    remaining: 0,
    max: 0,
  });
  const [error, setError] = useState(false);
  const integrationType = ['SALESFORCE', 'INBOUND_SALESFORCE'];

  useEffect(() => {
    if (activeIntegration.isLoaded) {
      api
        .get('/utils/service/salesforce/apiLimit')
        .then(response => response?.data)
        .then(response => {
          setApiUsage({
            remaining: response.Remaining,
            max: response.Max,
          });
        })
        .catch(() => setError(true));
    }
  }, []);
  return (
    <>
      {apiUsage && activeIntegration.isLoaded && (
        <SyncStatusTab
          apiUsage={apiUsage}
          error={error}
          syncDirectionOptions={integrationType}
          crm={CRM.SALESFORCE}
        />
      )}
    </>
  );
};
export default SyncStatusSalesforce;
