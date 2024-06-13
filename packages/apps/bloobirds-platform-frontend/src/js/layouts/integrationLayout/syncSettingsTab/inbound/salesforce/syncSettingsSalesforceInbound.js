import React from 'react';
import LeadSyncSettingsSalesforceInbound from './leadSyncSettings/leadSyncSettingsSalesforceInbound';
import CompanySyncSettingsView from '../companySyncSettings/companySyncSettings.view';
import DealsSyncSettingsView from '../dealsSyncSettings/dealsSyncSettings.view';
import DeleteSyncSettingsView from '../deleteSyncSettings/deleteSyncSettings.view';
import FormSubmissionSyncSettingsView from '../hubspot/formSubmissionsSyncSetting/formSubmissionSyncSettings.view';
import ActivitySyncSettings from '../hubspot/activitySyncSettings/activitySyncSettings';
import OpportunitySyncSettingsView from './opportunitySyncSetting/opportunitySyncSettings.view';
import { useFullSalesEnabled } from '../../../../../hooks/useFeatureFlags';

const SyncSettingsSalesforceInbound = props => {
  const { crm, disabled, onHandleConfig, inboundTrigger, save } = props;
  const isSalesEnabled = useFullSalesEnabled();
  return (
    <>
      {inboundTrigger.jsonConfig && (
        <>
          <LeadSyncSettingsSalesforceInbound {...props} />
          <CompanySyncSettingsView
            crm={crm}
            config={inboundTrigger.jsonConfig}
            setConfig={onHandleConfig}
            saveDisabled={disabled.company}
            save={save}
          />
          <ActivitySyncSettings
            crm={crm}
            config={inboundTrigger.jsonConfig}
            setConfig={onHandleConfig}
            saveDisabled={disabled.company}
            save={save}
          />
          {isSalesEnabled && (
            <OpportunitySyncSettingsView
              crm={crm}
              config={inboundTrigger.jsonConfig}
              setConfig={onHandleConfig}
              saveDisabled={disabled.opportunities}
              save={save}
            />
          )}
          <DealsSyncSettingsView
            crm={crm}
            config={inboundTrigger.jsonConfig}
            setConfig={onHandleConfig}
            saveDisabled={disabled.deals}
            save={save}
          />
          <FormSubmissionSyncSettingsView
            crm={crm}
            config={inboundTrigger.jsonConfig}
            setConfig={onHandleConfig}
            saveDisabled={disabled.forms}
            save={save}
          />
          <DeleteSyncSettingsView
            crm={crm}
            config={inboundTrigger.jsonConfig}
            setConfig={onHandleConfig}
            saveDisabled={disabled.delete}
            save={save}
          />
        </>
      )}
    </>
  );
};

export default SyncSettingsSalesforceInbound;
