import * as PropTypes from 'prop-types';
import React from 'react';
import LeadSyncSettingsView from './leadSyncSettings/leadSyncSettings.view';
import CompanySyncSettingsView from '../companySyncSettings/companySyncSettings.view';
import DealsSyncSettingsView from '../dealsSyncSettings/dealsSyncSettings.view';
import FormSubmissionSyncSettingsView from './formSubmissionsSyncSetting/formSubmissionSyncSettings.view';
import DeleteSyncSettingsView from '../deleteSyncSettings/deleteSyncSettings.view';
import ActivitySyncSettings from './activitySyncSettings/activitySyncSettings';

const SyncSettingsInboundHubspot = props => (
  <>
    {props.inboundTrigger.jsonConfig && (
      <>
        <LeadSyncSettingsView
          crm={props.crm}
          config={props.inboundTrigger.jsonConfig}
          saveDisabled={props.disabled.leads}
          save={props.save}
          setConfig={props.config}
        />
        <CompanySyncSettingsView
          config={props.inboundTrigger.jsonConfig}
          saveDisabled={props.disabled.company}
          save={props.save}
          setConfig={props.config}
          crm={props.crm}
        />
        {!props.fullSalesEnabled && (
          <DealsSyncSettingsView
            crm={props.crm}
            config={props.inboundTrigger.jsonConfig}
            saveDisabled={props.disabled.deals}
            save={props.save}
            setConfig={props.config}
          />
        )}
        <ActivitySyncSettings
          config={props.inboundTrigger.jsonConfig}
          setConfig={props.config}
          save={props.save}
          crm={props.crm}
        />
        <FormSubmissionSyncSettingsView
          config={props.inboundTrigger.jsonConfig}
          setConfig={props.config}
          save={props.save}
          crm={props.crm}
          saveDisabled={props.disabled.forms}
        />
        <DeleteSyncSettingsView
          crm={props.crm}
          config={props.inboundTrigger.jsonConfig}
          setConfig={props.config}
          save={props.save}
          saveDisabled={props.disabled.delete}
        />
      </>
    )}
  </>
);

SyncSettingsInboundHubspot.propTypes = {
  config: PropTypes.func,
  crm: PropTypes.any,
  disabled: PropTypes.shape({
    company: PropTypes.bool,
    deals: PropTypes.bool,
    delete: PropTypes.bool,
    forms: PropTypes.bool,
    leads: PropTypes.bool,
  }),
  fullSalesEnabled: PropTypes.any,
  inboundTrigger: PropTypes.shape({}),
  save: PropTypes.func,
};

export default SyncSettingsInboundHubspot;
