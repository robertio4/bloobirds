import React, { useMemo } from 'react';
import { useEntity } from '../../../../hooks';
import SyncSettingsTab from '../../../../layouts/integrationLayout/syncSettingsTab';
import { useSalesforceIntegration } from '../../../../hooks/useSalesforceIntegration';
import { Item } from '@bloobirds-it/flamingo-ui';
import { CRM } from '../../../../constants/integrations';

const SalesforceSyncSettings = () => {
  const { activeIntegration, disconnectIntegration } = useSalesforceIntegration();
  const salesforceUsers = useEntity('salesforceUsers')?.all();
  const mappedSalesforceUsers = useMemo(
    () =>
      salesforceUsers?.map(salesforceUser => (
        <Item key={salesforceUser.salesforceUser} value={salesforceUser.salesforceUser}>
          {salesforceUser.salesforceUser}
        </Item>
      )),
    [salesforceUsers],
  );

  return (
    <>
      {salesforceUsers && (
        <SyncSettingsTab
          crm={CRM.SALESFORCE}
          activeIntegration={activeIntegration}
          activityTrigger="ACTIVITY__SALESFORCE"
          disconnectIntegration={disconnectIntegration}
          companyTrigger="COMPANY__SALESFORCE"
          leadTrigger="LEAD__SALESFORCE"
          salesforceUsers={mappedSalesforceUsers}
          opportunityTrigger="OPPORTUNITY__SALESFORCE"
        />
      )}
    </>
  );
};
export default SalesforceSyncSettings;
