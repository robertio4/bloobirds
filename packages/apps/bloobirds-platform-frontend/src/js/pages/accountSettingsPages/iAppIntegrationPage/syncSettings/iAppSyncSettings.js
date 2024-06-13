import React, { useEffect, useState } from 'react';
import SyncSettingsTab from '../../../../layouts/iAppIntegrationLayout/syncSettingsTab';

const IAppSyncSettings = props => {
  const iAppClient = props.iAppClient;
  const fetchIAppData = props.fetchIAppData;
  const integration = props.integration;
  const integrationAccessor = props.integrationAccessor;
  return (
    <>
      <SyncSettingsTab
        fetchIAppData={fetchIAppData}
        integration={integration}
        integrationAccessor={integrationAccessor}
        iAppClient={iAppClient}
      />
    </>
  );
};
export default IAppSyncSettings;
