import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRouter } from '../../../hooks';
import { integrationURLs } from '../../../app/_constants/routes';
import styles from '../salesforceIntegrationPage/salesforceIntegrationPage.module.css';
import { Spinner, Tab, TabGroup, Text } from '@bloobirds-it/flamingo-ui';
import { LogoSvg } from '../../../../assets/svg';
import IAppSyncSettings from './syncSettings/iAppSyncSettings';
import IAppNoIntegrationPage from './noIntegrationPage/iAppNoIntegrationPage';
import { IntegrationAppClient } from '@integration-app/sdk';
import { useIntegrationApp } from '../../../hooks/useFeatureFlags';
import NoPermissionsPage from '../../noPermissionsPage';
import SessionManagerFactory from '../../../misc/session';
import { useIApp } from '../../../hooks/useIApp';

const IAppIntegrationPage = () => {
  const { getIAppToken } = useIApp('companies-leads-tab');

  const [iAppClient, setIAppClient] = useState();
  const [activeTab, setActiveTab] = useState('Sync Status');
  const { tab, integrationKey } = useParams();
  const { history } = useRouter();

  const [fetching, setFetching] = useState(true);
  const [integration, setIntegration] = useState(null);
  const [integrationAccessor, setIntegrationAccessor] = useState(null);

  const roleManager = SessionManagerFactory().getRoleManager();
  const isIntegrationAppEnabled = useIntegrationApp();

  if (!isIntegrationAppEnabled || !roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }

  async function fetchIAppData() {
    setFetching(true);
    const IApp = new IntegrationAppClient({
      accessToken: await getIAppToken(),
    });

    await setIAppClient(IApp);

    const iAccessor = IApp.integration(integrationKey);
    await setIntegrationAccessor(iAccessor);

    const integrationObj = await iAccessor.get();
    await setIntegration(integrationObj);

    await setFetching(false);
  }

  useEffect(() => {
    (async () => {
      await fetchIAppData();
    })();

    switch (tab) {
      case 'settings':
        setActiveTab('Sync Settings');
        break;
      default:
        break;
    }
  }, [tab, integrationKey]);

  const handleChangeTab = pointerTab => {
    switch (pointerTab) {
      case 'Sync Settings':
        history.push(
          integrationURLs(integrationKey).APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_SYNC_SETTINGS,
        );
        break;
      case 'Users':
        history.push(integrationURLs(integrationKey).APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_USERS);
        break;
      default:
        break;
    }
  };
  const canRenderSettings = !fetching && integration && integration.connection;

  return (
    <div className={styles._container}>
      {canRenderSettings && (
        <>
          <Text size="xl" weight="medium" color="peanut" align="left">
            {integration.name} integration
          </Text>

          <div className={styles._tab_group}>
            <TabGroup defaultValue="Sync Status" value={activeTab} onClick={handleChangeTab}>
              <Tab name="Sync Settings">
                <IAppSyncSettings
                  fetchIAppData={fetchIAppData}
                  iAppClient={iAppClient}
                  integration={integration}
                  integrationAccessor={integrationAccessor}
                />
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
      {integration && !integration.connection && !fetching && (
        <IAppNoIntegrationPage
          integration={integration}
          fetchIAppData={fetchIAppData}
          iAppClient={iAppClient}
        />
      )}
    </div>
  );
};
export default IAppIntegrationPage;
