import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';

import { useIsOTOAccount } from '@bloobirds-it/hooks';

import * as Routes from '../../app/_constants/routes';
import {
  APP_ACCOUNT_DIALERS_NUMINTEC,
  APP_ACCOUNT_EMAIL_INTEGRATION_MAPPINGS, APP_ACCOUNT_TASK_FEED_CONFIG,
} from '../../app/_constants/routes';
import { useDynamicsEnabled, useVtigerEnabled } from '../../hooks/useFeatureFlags';
import { ROUTES_TO_MAP } from './accountSettingsPages.old.routes';
import { ApiKeyPage } from './apiKeyPage/pages/apiKeyPage';
import ChromeExtensionPage from './chromeExtensionPage/chromeExtensionPage';
import CrmStatus from './crmStatus/crmStatus';
import DependenciesPage from './dependenciesPage';
import DialersPage from './dialersPage/dialersPage';
import DynamicsIntegrationPage from './dynamicsIntegrationPage';
import EmailIntegrationPage from './emailIntegrationPage/emailIntegrationPage';
import EmailSettingsPage from './emailSettingsPage/emailSettingsPage';
import { FieldsPage } from './fieldsPage/fieldsPage';
import GeneralSettingsPage from './generalSettingsPage/generalSettingsPage';
import HubspotIntegrationPage from './huspotIntegrationPage/hubspotIntegrationPage';
import IAppIntegrationPage from './iAppIntegrationPage/iAppIntegrationPage';
import NotificationsPage from './notificationsPage';
import { RelatedObjects } from './relatedObjects/relatedObjects';
import SalesforceIntegrationPage from './salesforceIntegrationPage/salesforceIntegrationPage.view';
import UsersPage from './usersPage/usersPage';
import ViewsPage from './viewsPage';
import VtigerIntegrationPage from './vtigerIntegrationPage';
import TaskFeedConfigurationPage from './taskFeedConfigurationPage/taskFeedConfigurationPage';

const RoutesComponent = () => {
  const isDynamicsEnabled = useDynamicsEnabled();
  const isVtigerEnabled = useVtigerEnabled();
  return (
    <>
      <Route
        exact
        path={Routes.APP_ACCOUNT_INTEGRATION_SALESFORCE_TAB}
        component={SalesforceIntegrationPage}
      />
      <Route
        exact
        path={Routes.APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING_NAME}
        component={SalesforceIntegrationPage}
      />
      <Route
        exact
        path={Routes.APP_ACCOUNT_INTEGRATION_HUBSPOT_TAB}
        component={HubspotIntegrationPage}
      />
      <Route exact path={Routes.APP_ACCOUNT_NOTIFICATIONS} component={NotificationsPage} />
      {isDynamicsEnabled && (
        <Route path={Routes.APP_ACCOUNT_INTEGRATION_DYNAMICS_TAB}>
          <DynamicsIntegrationPage />
        </Route>
      )}
      {isVtigerEnabled && (
        <Route path={Routes.APP_ACCOUNT_INTEGRATION_VTIGER_TAB}>
          <VtigerIntegrationPage />
        </Route>
      )}
      <Route path={Routes.APP_ACCOUNT_INTEGRATION_API_KEY}>
        <ApiKeyPage />
      </Route>
      <Route
        path={Routes.integrationURLs().APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_TAB}
        component={IAppIntegrationPage}
      />
      <Route exact path={Routes.APP_ACCOUNT_SALES_TEAM} component={UsersPage} />
      <Route exact path={Routes.APP_ACCOUNT_GENERAL_SETTINGS} component={GeneralSettingsPage} />
      <Route exact path={Routes.APP_ACCOUNT_FIELD_DEPENDENCIES} component={DependenciesPage} />
      <Route exact path={Routes.APP_ACCOUNT_VIEWS} component={ViewsPage} />
      <Route exact path={Routes.APP_ACCOUNT_DIALERS_TWILIO}>
        <DialersPage tab="Twilio" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_DIALERS_AIRCALL}>
        <DialersPage tab="Aircall" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_DIALERS_JUSTCALL}>
        <DialersPage tab="JustCall" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_DIALERS_ASTROLINE}>
        <DialersPage tab="Astroline" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_DIALERS_NUMINTEC}>
        <DialersPage tab="Numintec" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_DIALERS_RINGOVER}>
        <DialersPage tab="Ringover" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_DIALERS_AIRCALL_REDIRECT}>
        <DialersPage tab="Aircall" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_DIALERS}>
        <DialersPage tab="Twilio" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_EMAILS}>
        <EmailSettingsPage tab="mapping" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_EMAIL_INTEGRATION_MAPPINGS}>
        <EmailSettingsPage tab="mapping" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_FIELDS}>
        <FieldsPage tab="Fields" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_GLOBAL_PICKLISTS}>
        <FieldsPage tab="Global Picklists" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_GROUPS}>
        <FieldsPage tab="Groups" />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_CHROME_EXTENSION}>
        <ChromeExtensionPage />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_SALESFORCE_STATUS}>
        <CrmStatus />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_SALESFORCE_RELATED_OBJECTS}>
        <RelatedObjects />
      </Route>
      <Route exact path={Routes.APP_ACCOUNT_TASK_FEED_CONFIG}>
        <TaskFeedConfigurationPage />
      </Route>
      {/* REDIRECTS OLD URLS */}
      {Object.keys(ROUTES_TO_MAP).map(route => (
        <Route
          key={route}
          exact
          path={route}
          render={() => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            return <Redirect to={`${ROUTES_TO_MAP[route]}/?${urlSearchParams.toString()}`} />;
          }}
        />
      ))}
    </>
  );
};

export default withRouter(RoutesComponent);
