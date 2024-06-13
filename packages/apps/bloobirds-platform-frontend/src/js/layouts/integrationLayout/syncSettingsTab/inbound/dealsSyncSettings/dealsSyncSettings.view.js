import React from 'react';
import SyncSettingsCard from '../../syncSettingsCard/syncSettingsCard';
import DealSyncSettings from './dealSyncSettings';

const DealsSyncSettingsView = ({ crm, config, setConfig, save, saveDisabled }) => (
  <SyncSettingsCard
    icon="company"
    title={`Company status by ${crm === 'Hubspot' ? 'deal' : 'opportunity'} stage`}
    crm={crm}
    onSave={() => save('deals')}
    isDisabled={saveDisabled}
  >
    <DealSyncSettings setConfig={setConfig} inboundTriggerConfig={config} crm={crm} />
  </SyncSettingsCard>
);
export default DealsSyncSettingsView;
