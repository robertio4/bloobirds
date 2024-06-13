import React, { useState } from 'react';
import SyncSettingsCard from '../../../syncSettingsCard/syncSettingsCard';
import CheckBoxCard from '../../checkBoxCard/checkBoxCard';
import styles from './opportunitySyncSettings.css';
import { CheckItem, Icon, MultiSelect, Text } from '@bloobirds-it/flamingo-ui';
import { api } from '../../../../../../utils/api';
import useSWR from 'swr';

const OpportunitySyncSettingsView = ({ crm, config, setConfig, save, saveDisabled }) => {
  const actualValue = config.createOpportunity;
  const [disabled, setDisabled] = useState(!config.createOpportunity);

  const handleClickCheckbox = (newConfig, value) => {
    setConfig(newConfig, value);
    if (newConfig === 'createOpportunity') {
      setDisabled(!value);
    }
  };
  const { data: sfdcRecordTypes } = useSWR(
    `/utils/service/salesforce/getRecordTypes`,
    async () =>
      await api
        .get(`/utils/service/salesforce/getRecordTypes`, {
          headers: { 'Content-Type': 'application/json' },
          data: {},
        })
        .then(res => res.data),
  );

  return (
    <SyncSettingsCard
      icon="fileOpportunity"
      title={'Syncing Opportunities'}
      crm={crm}
      onSave={() => save('opportunities')}
      isDisabled={saveDisabled}
    >
      <CheckBoxCard
        text={`Create Opportunities from Salesforce to Bloobirds as Opportunities`}
        onChange={value => handleClickCheckbox('createOpportunity', value)}
        value={actualValue}
        size="small"
      />
      <div className={styles._children_multiselect}>
        <Text color={disabled ? 'softPeanut' : 'peanut'} size="s" weight="bold">
          Record types to bring from Salesforce to Bloobirds
        </Text>
        <Icon name="arrowRight" color="softPeanut" />
        <MultiSelect
          disabled={disabled}
          value={config.salesforceRecordTypes}
          onChange={value => handleClickCheckbox('salesforceRecordTypes', value)}
          placeholder="Select record types"
          width="252px"
          size="small"
        >
          {sfdcRecordTypes?.map(recordType => (
            <CheckItem key={recordType.Id} value={recordType.Id}>
              {recordType.Name}
            </CheckItem>
          ))}
        </MultiSelect>
      </div>
    </SyncSettingsCard>
  );
};
export default OpportunitySyncSettingsView;
