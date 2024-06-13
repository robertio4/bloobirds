import React, { useEffect, useState } from 'react';
import styles from '../salesforceIntegrationPage/salesforceIntegrationPage.module.css';
import { Button, Spinner, Tab, TabGroup, Text } from '@bloobirds-it/flamingo-ui';
import { useParams } from 'react-router';
import {
  APP_ACCOUNT_INTEGRATION_HUBSPOT_MAPPING,
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_SETTINGS,
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_HUBSPOT_USERS,
} from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import { useHubspotIntegration } from '../../../hooks/useHubspotIntegration';
import SyncStatusHubspot from './syncStatus/syncStatusHubspot';
import HubspotUsersTab from './usersTab/hubspotUsersTab';
import HubspotNoIntegrationPage from './noIntegrationPage/hubspotNoIntegrationPage';
import HubspotFieldMapping from './fieldMapping/hubspotFieldMapping';
import HubspotSyncSettings from './syncSettings/hubspotSyncSettings';
import SessionManagerFactory from '../../../misc/session';
import { LogoSvg } from '../../../../assets/svg';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { HubspotSyncingTooltip } from '../../../components/discoveryTooltips/integrationHubspotTooltips/hubspotSyncingTooltip';
import { HubspotObjectsSyncingTooltip } from '../../../components/discoveryTooltips/integrationHubspotTooltips/hubspotObjectsSyncingTooltip';
import { HubspotUsersTooltip } from '../../../components/discoveryTooltips/integrationHubspotTooltips/hubspotUsersTooltip';
import { HubspotFieldsTooltip } from '../../../components/discoveryTooltips/integrationHubspotTooltips/hubspotFieldsTooltip';
import { RestApi } from '../../../misc/api/rest';
import { api } from '@bloobirds-it/utils';

const HubspotIntegrationPage = () => {
  const { activeIntegration } = useHubspotIntegration();
  const [activeTab, setActiveTab] = useState('Sync Status');
  const { tab } = useParams();
  const { history } = useRouter();
  const [appDisconnected, setAppDisconnected] = useState(false);
  const [healthChecked, setHealthChecked] = useState(false);
  const SessionManager = SessionManagerFactory();
  useEffect(() => {
    api
      .get('/utils/hubspot/health')
      .then(() => {
        setAppDisconnected(false);
        if (!healthChecked) setHealthChecked(true);
      })
      .catch(response => {
        if (response.status === 500) {
          RestApi.search({
            entity: 'integrationHubspots',
            query: { account: SessionManager.getActiveAccount().id, page: 0 },
          }).then(res => {
            if (res._embedded.length > 0) {
              setAppDisconnected(true);
            } else {
              setAppDisconnected(false);
            }
          });
        }
        if (!healthChecked) setHealthChecked(true);
      });
  }, [tab]);

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
        setActiveTab('Mapping');
        break;
      default:
        break;
    }
  }, [tab]);

  const handleChangeTab = pointerTab => {
    switch (pointerTab) {
      case 'Sync Settings':
        history.push(APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_SETTINGS);
        break;
      case 'Sync Status':
        history.push(APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS);
        break;
      case 'Users':
        history.push(APP_ACCOUNT_INTEGRATION_HUBSPOT_USERS);
        break;
      case 'Mapping':
        history.push(APP_ACCOUNT_INTEGRATION_HUBSPOT_MAPPING);
        break;
      default:
        break;
    }
  };

  const fetching =
    !activeIntegration.isLoaded &&
    !healthChecked &&
    !activeIntegration.hasError &&
    !appDisconnected;

  const noIntegration =
    !activeIntegration.isLoaded && healthChecked && !activeIntegration.hasError && !appDisconnected;

  const canRenderSettings =
    activeIntegration.isLoaded && healthChecked && !activeIntegration.hasError && !appDisconnected;

  const hasQSGEnabled = useQuickStartEnabled();

  return (
    <div className={styles._container}>
      {canRenderSettings && (
        <>
          <Text size="xl" weight="medium" color="peanut" align="left">
            HubSpot integration
            <div style={{ marginLeft: 12, display: 'inline' }}>
              <Button
                variant="clear"
                iconLeft="questionCircle"
                uppercase={false}
                onClick={() =>
                  window.open(
                    'https://support.bloobirds.com/hc/en-us/sections/360005081200-Hubspot',
                    '_blank',
                  )
                }
                color="bloobirds"
              >
                Guide to Hubspot integration
              </Button>
            </div>
          </Text>

          <div className={styles._tab_group}>
            <div className={styles._tooltips_container}>
              {hasQSGEnabled && <HubspotSyncingTooltip />}
              {hasQSGEnabled && <HubspotObjectsSyncingTooltip />}
              {hasQSGEnabled && <HubspotUsersTooltip />}
              {hasQSGEnabled && <HubspotFieldsTooltip />}
            </div>
            <TabGroup defaultValue="Sync Status" value={activeTab} onClick={handleChangeTab}>
              <Tab name="Sync Status">
                <SyncStatusHubspot />
              </Tab>
              <Tab name="Sync Settings">
                <HubspotSyncSettings />
              </Tab>
              <Tab name="Users">
                <HubspotUsersTab />
              </Tab>
              <Tab name="Mapping">
                <HubspotFieldMapping />
              </Tab>
            </TabGroup>
          </div>
        </>
      )}
      {fetching && (
        <div className={styles.loader}>
          <LogoSvg fill="var(--bloobirds)" width={50} />
          <div className={styles.spinner}>
            <Spinner name="loadingCircle" />
          </div>
        </div>
      )}
      {noIntegration && (
        <HubspotNoIntegrationPage
          appDisconnected={appDisconnected}
          setAppDisconnected={setAppDisconnected}
        />
      )}
    </div>
  );
};
export default HubspotIntegrationPage;
