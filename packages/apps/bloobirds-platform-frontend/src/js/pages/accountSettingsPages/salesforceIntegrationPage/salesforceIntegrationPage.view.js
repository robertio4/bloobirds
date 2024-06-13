import React, { useEffect, useState } from 'react';
import styles from './salesforceIntegrationPage.module.css';
import { Button, Tab, TabGroup, Text } from '@bloobirds-it/flamingo-ui';
import { useSalesforceIntegration } from '../../../hooks/useSalesforceIntegration';
import { useParams } from 'react-router';
import {
  APP_ACCOUNT_INTEGRATION_SALESFORCE_CONNECT,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING_NAME,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_OAUTH,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_SETTINGS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_USERS,
} from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import SyncStatusSalesforce from './syncStatus/syncStatusSalesforce';
import SalesforceUsersTab from './users/salesforceUsersTab';
import SalesforceNoIntegrationPage from './noIntegration/salesforceNoIntegrationPage';
import SalesforceFieldMapping from './fieldMapping/salesforceFieldMapping';
import SalesforceSyncSettings from './syncSettings/salesforceSyncSettings';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { SalesforceSyncingTooltip } from '../../../components/discoveryTooltips/integrationSalesforceTooltips/salesforceSyncingTooltip';
import { SalesforceObjectsSyncingTooltip } from '../../../components/discoveryTooltips/integrationSalesforceTooltips/salesforceObjectsSyncingTooltip';
import { SalesforceUsersTooltip } from '../../../components/discoveryTooltips/integrationSalesforceTooltips/salesforceUsersTooltip';
import { SalesforceFieldsTooltip } from '../../../components/discoveryTooltips/integrationSalesforceTooltips/salesforceFieldsTooltip';

const SalesforceIntegrationPage = () => {
  const { activeIntegration, isSubmitting } = useSalesforceIntegration();
  const [activeTab, setActiveTab] = useState('Sync Status');
  const { tab, mappingName } = useParams();
  const { history } = useRouter();
  useEffect(() => {
    if (activeIntegration.isLoaded && !activeIntegration.hasError) {
      if (tab === 'connect') {
        history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS);
      }
    } else if (tab !== 'connect' && isSubmitting) {
      history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_CONNECT);
    }
  }, [activeIntegration]);
  useEffect(() => {
    switch (tab) {
      case 'settings':
        setActiveTab('Sync Settings');
        break;
      case 'sync':
        setActiveTab('Sync Status');
        break;
      case 'users':
        setActiveTab('Users');
        break;
      case 'mapping':
        setActiveTab('Field mapping');
        break;
      default:
        break;
    }
  }, [tab]);

  const handleChangeTab = clickedTab => {
    switch (clickedTab) {
      case 'Sync Settings':
        history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_SETTINGS);
        break;
      case 'Sync Status':
        history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS);
        break;
      case 'Users':
        history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_USERS);
        break;
      case 'Field mapping':
        if (mappingName) {
          history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING_NAME);
        }
        history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING);
        break;
      default:
        history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_OAUTH);
        break;
    }
  };

  const hasQSGEnabled = useQuickStartEnabled();

  return (
    <div className={styles._container}>
      <Text size="xl" weight="medium" color="peanut" align="left">
        Salesforce integration
        <div style={{ marginLeft: 12, display: 'inline' }}>
          <Button
            variant="clear"
            iconLeft="questionCircle"
            uppercase={false}
            onClick={() =>
              window.open(
                'https://support.bloobirds.com/hc/en-us/sections/360004492959-Salesforce',
                '_blank',
              )
            }
            color="bloobirds"
          >
            Guide to Salesforce integration
          </Button>
        </div>
      </Text>
      {activeIntegration.isLoaded && !activeIntegration.hasError && (
        <div className={styles._tab_group}>
          <div className={styles._tooltips_container}>
            {hasQSGEnabled && <SalesforceSyncingTooltip />}
            {hasQSGEnabled && <SalesforceObjectsSyncingTooltip />}
            {hasQSGEnabled && <SalesforceUsersTooltip />}
            {hasQSGEnabled && <SalesforceFieldsTooltip />}
          </div>
          <TabGroup defaultValue="Sync Status" value={activeTab} onClick={handleChangeTab}>
            <Tab name="Sync Status">
              <SyncStatusSalesforce />
            </Tab>
            <Tab name="Sync Settings">
              <SalesforceSyncSettings />
            </Tab>
            <Tab name="Users">
              <SalesforceUsersTab />
            </Tab>
            <Tab name="Field mapping">
              <SalesforceFieldMapping />
            </Tab>
          </TabGroup>
        </div>
      )}
      {!isSubmitting && (!activeIntegration.isLoaded || activeIntegration.hasError) && (
        <SalesforceNoIntegrationPage />
      )}
    </div>
  );
};
export default SalesforceIntegrationPage;
