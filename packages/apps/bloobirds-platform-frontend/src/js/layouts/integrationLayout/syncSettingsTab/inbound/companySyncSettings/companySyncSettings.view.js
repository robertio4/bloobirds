import React, { useEffect, useMemo, useState } from 'react';
import SyncSettingsCard from '../../syncSettingsCard/syncSettingsCard';
import CompanySyncSettings from './companySyncSettings';
import {
  CRM,
  HUBSPOT_OBJECT_TYPES_MAPPINGS,
  METADATA_URL,
  SALESFORCE_OBJECT_TYPES,
} from '../../../../../constants/integrations';
import useSWR from 'swr';
import { api } from '../../../../../utils/api';

const CompanySyncSettingsView = ({ crm, setConfig, save, saveDisabled, config }) => {
  const url =
    METADATA_URL[crm] +
    (crm === CRM.SALESFORCE
      ? SALESFORCE_OBJECT_TYPES.ACCOUNT
      : HUBSPOT_OBJECT_TYPES_MAPPINGS.COMPANY);

  const { data: crmCompanyFields } = useSWR(
    url,
    async () =>
      await api
        .get(url, {
          headers: { 'Content-Type': 'application/json' },
          data: {},
        })
        .then(res => (crm === CRM.SALESFORCE ? res.data.fields : res.data.results)),
  );
  const companyFields = useMemo(
    () => crmCompanyFields?.sort((a, b) => (a.label > b.label ? 1 : -1)),
    [crmCompanyFields],
  );

  return (
    <SyncSettingsCard
      icon="company"
      title="Creating companies"
      crm={crm}
      onSave={() => save('company')}
      isDisabled={saveDisabled}
    >
      <CompanySyncSettings
        setConfig={setConfig}
        config={config}
        crm={crm}
        companyFields={companyFields}
      />
    </SyncSettingsCard>
  );
};
export default CompanySyncSettingsView;
