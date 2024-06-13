import React, { useEffect, useState } from 'react';
import SyncSettingsCard from '../../../syncSettingsCard/syncSettingsCard';
import LeadSyncSettings from './leadSyncSettings';
import { api } from '@bloobirds-it/utils';

const LeadSyncSettingsView = ({ crm, config, setConfig, save, saveDisabled }) => {
  const [contactLists, setContactLists] = useState(undefined);

  useEffect(() => {
    api
      .get('/utils/hubspot/contactLists')
      .then(response => response?.data)
      .then(response => setContactLists(response));
  }, []);

  return (
    <SyncSettingsCard
      icon="personAdd"
      title="Creating leads"
      crm={crm}
      onSave={() => save('leads')}
      isDisabled={saveDisabled}
    >
      <LeadSyncSettings
        crm={crm}
        config={config}
        setConfig={setConfig}
        contactLists={contactLists}
      />
    </SyncSettingsCard>
  );
};
export default LeadSyncSettingsView;
