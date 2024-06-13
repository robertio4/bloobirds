import React from 'react';
import SyncSettingsCard from '../../../syncSettingsCard/syncSettingsCard';
import CheckBoxCard from '../../checkBoxCard/checkBoxCard';
import { CRM, CRM_DISPLAY_NAME } from '../../../../../../constants/integrations';

const FormSubmissionSyncSettingsView = ({ crm, config, setConfig, save, saveDisabled }) => {
  const isHubspot = crm === CRM.HUBSPOT;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const text = isHubspot ? 'form submissions' : 'campaign activities';
  const title = isHubspot ? 'Form submissions' : 'Campaign activities';
  const actualValue = isHubspot ? config.formSubmissions : config.campaignActivities;
  const handleClickCheckbox = value => {
    setConfig(isHubspot ? 'formSubmissions' : 'campaignActivities', value);
  };

  return (
    <SyncSettingsCard
      icon="arrowDownRight"
      title={title}
      crm={crm}
      onSave={() => save('forms')}
      isDisabled={saveDisabled}
    >
      <CheckBoxCard
        text={`Sync ${displayCrm} ${text} to Bloobirds (created in Bloobirds as inbound activity)`}
        onChange={handleClickCheckbox}
        value={actualValue}
        size="small"
      />
    </SyncSettingsCard>
  );
};
export default FormSubmissionSyncSettingsView;
