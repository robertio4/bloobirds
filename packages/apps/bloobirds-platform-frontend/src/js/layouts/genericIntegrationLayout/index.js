import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRouter } from '../../hooks';
import { APP_ACCOUNT_INTEGRATION } from '../../app/_constants/routes';
import AccountSettingsLayout from '../accountSettingsLayout';
import { Tab, TabGroup } from '@bloobirds-it/flamingo-ui';
import Status from './status/status';
import Actions from './actions';
import FieldsMappings from './mappings/fieldsMappings/fieldsMappings';
import PicklistsMappings from './mappings/picklistsMappings/picklistsMappings';
import UsersMappings from './mappings/usersMappings/usersMappings';
import SyncSettings from './syncSettings/settings';
import NoIntegrationView from './noIntegration/noIntegration.view';
import { useGenericIntegration } from '../../hooks/useGenericIntegration';

const GenericIntegrationLayout = ({ driver, integrationName, syncDirections, crm, fields }) => {
  const [activeTab, setActiveTab] = useState('Sync Status');
  const { tab } = useParams();
  const { history } = useRouter();
  const { activeIntegration, createIntegration, isSubmitting, isConnected } = useGenericIntegration(
    driver,
  );

  useEffect(() => {
    switch (tab) {
      case 'settings':
        setActiveTab('Sync Settings');
        break;
      case 'actions':
        setActiveTab('Actions');
        break;
      case 'picklists':
        setActiveTab('Picklists Mappings');
        break;
      case 'sync':
        setActiveTab('Status');
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
        history.push(`${APP_ACCOUNT_INTEGRATION}/${driver}/settings`);
        break;
      case 'Status':
        history.push(`${APP_ACCOUNT_INTEGRATION}/${driver}/sync`);
        break;
      case 'Picklists Mappings':
        history.push(`${APP_ACCOUNT_INTEGRATION}/${driver}/picklists`);
        break;
      case 'Users':
        history.push(`${APP_ACCOUNT_INTEGRATION}/${driver}/users`);
        break;
      case 'Mapping':
        history.push(`${APP_ACCOUNT_INTEGRATION}/${driver}/mapping`);
        break;
      case 'Actions':
        history.push(`${APP_ACCOUNT_INTEGRATION}/${driver}/actions`);
        break;
      default:
        break;
    }
  };

  return (
    <AccountSettingsLayout
      title={`${integrationName} integration`}
      subtitle={`Configure your ${integrationName} integration`}
    >
      {activeIntegration.isLoaded &&
      !activeIntegration.hasError &&
      (isConnected || activeIntegration.token) ? (
        <TabGroup defaultValue="Status" value={activeTab} onClick={handleChangeTab}>
          <Tab name="Status">
            <Status syncDirections={syncDirections} crm={crm} />
          </Tab>
          <Tab name="Actions">
            <Actions driver={driver} integrationName={integrationName} />
          </Tab>
          <Tab name="Mapping">
            <FieldsMappings driver={driver} integrationName={integrationName} />
          </Tab>
          <Tab name="Picklists Mappings">
            <PicklistsMappings driver={driver} integrationName={integrationName} />
          </Tab>
          <Tab name="Users">
            <UsersMappings driver={driver} integrationName={integrationName} />
          </Tab>
          <Tab disabled name="Sync Settings">
            <SyncSettings driver={driver} integrationName={integrationName} />
          </Tab>
        </TabGroup>
      ) : (
        <NoIntegrationView
          crm={crm}
          fields={fields}
          isSubmitting={isSubmitting}
          activeIntegration={activeIntegration}
          createIntegration={createIntegration}
          isConnected={isConnected}
        />
      )}
    </AccountSettingsLayout>
  );
};

export default GenericIntegrationLayout;
