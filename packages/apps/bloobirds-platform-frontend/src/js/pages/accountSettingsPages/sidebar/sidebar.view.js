import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Sidebar, SidebarItem, SidebarSection } from '@bloobirds-it/flamingo-ui';
import {
  useIsOTOAccount,
  useEmailIntegrationMode,
  useIsNoStatusPlanAccount,
  useUserSettings,
} from '@bloobirds-it/hooks';
import { UserType } from '@bloobirds-it/types';

import {
  APP_ACCOUNT_CHROME_EXTENSION,
  APP_ACCOUNT_DIALERS,
  APP_ACCOUNT_DIALERS_AIRCALL,
  APP_ACCOUNT_DIALERS_TWILIO,
  APP_ACCOUNT_EMAILS,
  APP_ACCOUNT_FIELD_DEPENDENCIES,
  APP_ACCOUNT_FIELDS,
  APP_ACCOUNT_GENERAL_SETTINGS,
  APP_ACCOUNT_GLOBAL_PICKLISTS,
  APP_ACCOUNT_GROUPS,
  APP_ACCOUNT_INTEGRATION_API_KEY,
  APP_ACCOUNT_INTEGRATION_DYNAMICS_ACTIONS,
  APP_ACCOUNT_INTEGRATION_DYNAMICS_MAPPING,
  APP_ACCOUNT_INTEGRATION_DYNAMICS_SETTINGS,
  APP_ACCOUNT_INTEGRATION_DYNAMICS_SYNC_PICKLIST_MAPPINGS,
  APP_ACCOUNT_INTEGRATION_DYNAMICS_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_DYNAMICS_USERS,
  APP_ACCOUNT_INTEGRATION_HUBSPOT_MAPPING,
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_SETTINGS,
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_HUBSPOT_USERS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_SETTINGS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_USERS,
  APP_ACCOUNT_INTEGRATION_VTIGER_ACTIONS,
  APP_ACCOUNT_INTEGRATION_VTIGER_MAPPING,
  APP_ACCOUNT_INTEGRATION_VTIGER_SETTINGS,
  APP_ACCOUNT_INTEGRATION_VTIGER_SYNC_PICKLIST_MAPPINGS,
  APP_ACCOUNT_INTEGRATION_VTIGER_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_VTIGER_USERS,
  APP_ACCOUNT_NOTIFICATIONS,
  APP_ACCOUNT_SALES_TEAM,
  APP_ACCOUNT_VIEWS,
  APP_ACCOUNT_SALESFORCE_STATUS,
  APP_ACCOUNT_SALESFORCE_RELATED_OBJECTS,
  integrationURLs,
  APP_ACCOUNT_TASK_FEED_CONFIG,
} from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import {
  useDynamicsEnabled,
  useIntegrationApp,
  useVtigerEnabled,
} from '../../../hooks/useFeatureFlags';
import { useSidebar } from '../../../hooks/useSidebar';
import SessionManagerFactory from '../../../misc/session';
import RoleManager from '../../../misc/session/RoleManager';

const PAGES_ROUTES = {
  GENERAL_SETTINGS: APP_ACCOUNT_GENERAL_SETTINGS,
  SALES_TEAM: APP_ACCOUNT_SALES_TEAM,
  DIALERS: APP_ACCOUNT_DIALERS,
  TWILO: APP_ACCOUNT_DIALERS_TWILIO,
  AIRCALL: APP_ACCOUNT_DIALERS_AIRCALL,
  EMAILS: APP_ACCOUNT_EMAILS,
  //EMAIL_INTEGRATION: APP_ACCOUNT_EMAIL_INTEGRATION,
  NOTIFICATIONS: APP_ACCOUNT_NOTIFICATIONS,
  VIEWS: APP_ACCOUNT_VIEWS,
  FIELDS: APP_ACCOUNT_FIELDS,
  GLOBAL_PICKLIST: APP_ACCOUNT_GLOBAL_PICKLISTS,
  GROUPS: APP_ACCOUNT_GROUPS,
  DEPENDENCIES: APP_ACCOUNT_FIELD_DEPENDENCIES,
  CHROME_EXTENSION: APP_ACCOUNT_CHROME_EXTENSION,
  SALESFORCE_SYNC_STATUS: APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
  SALESFORCE_SYNC_SETTINGS: APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_SETTINGS,
  SALESFORCE_USERS: APP_ACCOUNT_INTEGRATION_SALESFORCE_USERS,
  SALESFORCE_MAPPING: APP_ACCOUNT_INTEGRATION_SALESFORCE_MAPPING,
  HUBSPOT_SYNC_STATUS: APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  HUBSPOT_SYNC_SETTINGS: APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_SETTINGS,
  HUBSPOT_USERS: APP_ACCOUNT_INTEGRATION_HUBSPOT_USERS,
  HUBSPOT_MAPPING: APP_ACCOUNT_INTEGRATION_HUBSPOT_MAPPING,
  DYNAMICS_SYNC_STATUS: APP_ACCOUNT_INTEGRATION_DYNAMICS_SYNC_STATUS,
  DYNAMICS_ACTIONS: APP_ACCOUNT_INTEGRATION_DYNAMICS_ACTIONS,
  DYNAMICS_MAPPINGS: APP_ACCOUNT_INTEGRATION_DYNAMICS_MAPPING,
  DYNAMICS_USERS: APP_ACCOUNT_INTEGRATION_DYNAMICS_USERS,
  DYNAMICS_SETTINGS: APP_ACCOUNT_INTEGRATION_DYNAMICS_SETTINGS,
  DYNAMICS_PICKLIST: APP_ACCOUNT_INTEGRATION_DYNAMICS_SYNC_PICKLIST_MAPPINGS,
  VTIGER_PICKLIST: APP_ACCOUNT_INTEGRATION_VTIGER_SYNC_PICKLIST_MAPPINGS,
  VTIGER_SYNC_STATUS: APP_ACCOUNT_INTEGRATION_VTIGER_SYNC_STATUS,
  VTIGER_ACTIONS: APP_ACCOUNT_INTEGRATION_VTIGER_ACTIONS,
  VTIGER_MAPPINGS: APP_ACCOUNT_INTEGRATION_VTIGER_MAPPING,
  VTIGER_USERS: APP_ACCOUNT_INTEGRATION_VTIGER_USERS,
  VTIGER_SETTINGS: APP_ACCOUNT_INTEGRATION_VTIGER_SETTINGS,
  API_KEY: APP_ACCOUNT_INTEGRATION_API_KEY,
  SALESFORCE_STATUS: APP_ACCOUNT_SALESFORCE_STATUS,
  SALESFORCE_RELATED_OBJECTS: APP_ACCOUNT_SALESFORCE_RELATED_OBJECTS,
  TASK_FEED_CONFIG: APP_ACCOUNT_TASK_FEED_CONFIG,
};

const DIALERS_PAGES = [PAGES_ROUTES.DIALERS, PAGES_ROUTES.TWILO, PAGES_ROUTES.AIRCALL];

const FIELDS_PAGES = [PAGES_ROUTES.FIELDS, PAGES_ROUTES.GLOBAL_PICKLIST, PAGES_ROUTES.GROUPS];

const INTEGRATIONAPP_PIPEDRIVE_PAGES = Object.values(integrationURLs('pipedrive'));
const INTEGRATIONAPP_DYNAMICS_PAGES = Object.values(integrationURLs('dynamics-crm'));
const INTEGRATIONAPP_ZOHO_PAGES = Object.values(integrationURLs('zoho'));
const INTEGRATIONAPP_ACTIVECAMPAIGN_PAGES = Object.values(integrationURLs('activecampaign'));

const HUBSPOT_PAGES = [
  PAGES_ROUTES.HUBSPOT_SYNC_STATUS,
  PAGES_ROUTES.HUBSPOT_SYNC_SETTINGS,
  PAGES_ROUTES.HUBSPOT_USERS,
  PAGES_ROUTES.HUBSPOT_MAPPING,
];

const SALESFORCE_PAGES = [
  PAGES_ROUTES.SALESFORCE_SYNC_STATUS,
  PAGES_ROUTES.SALESFORCE_SYNC_SETTINGS,
  PAGES_ROUTES.SALESFORCE_USERS,
  PAGES_ROUTES.SALESFORCE_MAPPING,
];

const DYNAMICS_PAGES = [
  PAGES_ROUTES.DYNAMICS_SYNC_STATUS,
  PAGES_ROUTES.DYNAMICS_ACTIONS,
  PAGES_ROUTES.DYNAMICS_MAPPINGS,
  PAGES_ROUTES.DYNAMICS_PICKLIST,
  PAGES_ROUTES.DYNAMICS_USERS,
  PAGES_ROUTES.DYNAMICS_SETTINGS,
];

const VTIGER_PAGES = [
  PAGES_ROUTES.VTIGER_SYNC_STATUS,
  PAGES_ROUTES.VTIGER_ACTIONS,
  PAGES_ROUTES.VTIGER_MAPPINGS,
  PAGES_ROUTES.VTIGER_PICKLIST,
  PAGES_ROUTES.VTIGER_USERS,
  PAGES_ROUTES.VTIGER_SETTINGS,
];

const AccountSettingsSidebar = () => {
  const { history, pathname } = useRouter();
  const defaultPage = PAGES_ROUTES.GENERAL_SETTINGS;
  const settings = useUserSettings();
  const [currentPage, setCurrentPage] = useState(pathname || defaultPage);
  const roleManager = SessionManagerFactory().getRoleManager();
  const { accountIntegrationMode } = useEmailIntegrationMode();
  const { isCollapsed, toggle } = useSidebar();
  const isDynamicsEnabled = useDynamicsEnabled();
  const isIntegrationAppEnabled = useIntegrationApp();
  const isVtigerEnabled = useVtigerEnabled();
  const isOTOAccount = useIsOTOAccount();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const { t } = useTranslation();

  const isSupportUser = settings?.user.type === UserType.SUPPORT_USER;

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  const handleClick = to => {
    setCurrentPage(to);
    history.push(to);
  };

  return (
    <Sidebar onCollapseChange={toggle} collapsed={isCollapsed}>
      {roleManager.isAccountAdmin() && (
        <>
          <SidebarSection title="Preferences">
            <SidebarItem
              icon="settings"
              onClick={() => handleClick(PAGES_ROUTES.GENERAL_SETTINGS)}
              selected={currentPage === PAGES_ROUTES.GENERAL_SETTINGS}
            >
              {t('accountSettings.tabs.generalSettings')}
            </SidebarItem>
            <SidebarItem
              icon="person"
              onClick={() => handleClick(PAGES_ROUTES.SALES_TEAM)}
              selected={currentPage === PAGES_ROUTES.SALES_TEAM}
            >
              {t('accountSettings.tabs.salesTeam')}
            </SidebarItem>
            <SidebarItem
              icon="mail"
              onClick={() => handleClick(PAGES_ROUTES.EMAILS)}
              selected={currentPage === PAGES_ROUTES.EMAILS}
            >
              {t('accountSettings.tabs.email')}
            </SidebarItem>
            {/*accountIntegrationMode && (
              <SidebarItem
                icon="mail"
                onClick={() => handleClick(PAGES_ROUTES.EMAIL_INTEGRATION)}
                selected={currentPage === PAGES_ROUTES.EMAIL_INTEGRATION}
              >
                {t('accountSettings.tabs.emailIntegration')}
              </SidebarItem>
            )*/}
            <SidebarItem
              icon="phone"
              onClick={() => handleClick(PAGES_ROUTES.DIALERS)}
              selected={DIALERS_PAGES.includes(currentPage)}
            >
              {t('accountSettings.tabs.dialers')}
            </SidebarItem>
            <SidebarItem
              icon="bell"
              onClick={() => handleClick(PAGES_ROUTES.NOTIFICATIONS)}
              selected={currentPage === PAGES_ROUTES.NOTIFICATIONS}
            >
              {t('accountSettings.tabs.notifications')}
            </SidebarItem>
            {!isOTOAccount && (
              <SidebarItem
                icon="file"
                onClick={() => handleClick(PAGES_ROUTES.VIEWS)}
                selected={currentPage === PAGES_ROUTES.VIEWS}
              >
                {t('accountSettings.tabs.views')}
              </SidebarItem>
            )}
            <SidebarItem
              icon="chrome"
              onClick={() => handleClick(PAGES_ROUTES.CHROME_EXTENSION)}
              selected={currentPage === PAGES_ROUTES.CHROME_EXTENSION}
            >
              {t('accountSettings.tabs.chromeExtension')}
            </SidebarItem>
          </SidebarSection>
          <SidebarSection title="Data management">
            <SidebarItem
              icon="list"
              onClick={() => handleClick(PAGES_ROUTES.FIELDS)}
              selected={FIELDS_PAGES.includes(currentPage)}
            >
              {t('accountSettings.tabs.fields')}
            </SidebarItem>
            {!isOTOAccount && (
              <SidebarItem
                icon="eye"
                onClick={() => handleClick(PAGES_ROUTES.DEPENDENCIES)}
                selected={currentPage === PAGES_ROUTES.DEPENDENCIES}
              >
                {t('accountSettings.tabs.dependencies')}
              </SidebarItem>
            )}
            {isNoStatusPlanAccount && (
              <SidebarItem
                icon="label"
                onClick={() => handleClick(PAGES_ROUTES.SALESFORCE_STATUS)}
                selected={currentPage === PAGES_ROUTES.SALESFORCE_STATUS}
              >
                {t('accountSettings.tabs.salesforceStatus')}
              </SidebarItem>
            )}
            <SidebarItem
              icon="gridSquaresFilled"
              onClick={() => handleClick(PAGES_ROUTES.SALESFORCE_RELATED_OBJECTS)}
              selected={currentPage === PAGES_ROUTES.SALESFORCE_RELATED_OBJECTS}
            >
              {t('accountSettings.tabs.salesforceRelatedObjects')}
            </SidebarItem>
          </SidebarSection>
          <SidebarSection title="Data Integrations">
            <SidebarItem
              icon="salesforce"
              onClick={() => handleClick(PAGES_ROUTES.SALESFORCE_SYNC_STATUS)}
              selected={SALESFORCE_PAGES.includes(currentPage)}
            >
              {t('common.salesforce')}
            </SidebarItem>
            <SidebarItem
              icon="hubspot"
              onClick={() => handleClick(PAGES_ROUTES.HUBSPOT_SYNC_STATUS)}
              selected={HUBSPOT_PAGES.includes(currentPage)}
            >
              {t('common.hubspot')}
            </SidebarItem>
            {isIntegrationAppEnabled && (
              <>
                <SidebarItem
                  icon="pipedrive"
                  onClick={() =>
                    handleClick(
                      integrationURLs('pipedrive')
                        .APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_SYNC_SETTINGS,
                    )
                  }
                  selected={INTEGRATIONAPP_PIPEDRIVE_PAGES.includes(currentPage)}
                >
                  {t('common.pipedrive')}
                </SidebarItem>
                <SidebarItem
                  icon="microsoftDynamics"
                  onClick={() =>
                    handleClick(
                      integrationURLs('dynamics-crm')
                        .APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_SYNC_SETTINGS,
                    )
                  }
                  selected={INTEGRATIONAPP_DYNAMICS_PAGES.includes(currentPage)}
                >
                  {t('common.dynamics')}
                </SidebarItem>
                <SidebarItem
                  icon="zoho"
                  onClick={() =>
                    handleClick(
                      integrationURLs('zoho').APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_SYNC_SETTINGS,
                    )
                  }
                  selected={INTEGRATIONAPP_ZOHO_PAGES.includes(currentPage)}
                >
                  {t('common.zoho')}
                </SidebarItem>
                <SidebarItem
                  icon="activecampaign"
                  onClick={() =>
                    handleClick(
                      integrationURLs('activecampaign')
                        .APP_ACCOUNT_INTEGRATIONAPP_CONNECTOR_SYNC_SETTINGS,
                    )
                  }
                  selected={INTEGRATIONAPP_ACTIVECAMPAIGN_PAGES.includes(currentPage)}
                >
                  {t('common.activeCampaign')}
                </SidebarItem>
              </>
            )}
            {isDynamicsEnabled && (
              <SidebarItem
                icon="microsoftDynamics"
                onClick={() => handleClick(PAGES_ROUTES.DYNAMICS_SYNC_STATUS)}
                selected={DYNAMICS_PAGES.includes(currentPage)}
              >
                {t('common.dynamics')}
              </SidebarItem>
            )}
            {isVtigerEnabled && (
              <SidebarItem
                icon="vtiger"
                onClick={() => handleClick(PAGES_ROUTES.VTIGER_SYNC_STATUS)}
                selected={VTIGER_PAGES.includes(currentPage)}
              >
                {t('common.vtiger')}
              </SidebarItem>
            )}
            <SidebarItem
              icon="link"
              onClick={() => handleClick(PAGES_ROUTES.API_KEY)}
              selected={currentPage === PAGES_ROUTES.API_KEY}
            >
              {t('accountSettings.tabs.apiKeys')}
            </SidebarItem>
          </SidebarSection>
          {isSupportUser && (
            <SidebarSection title={'Support'}>
              <SidebarItem
                icon="settings"
                onClick={() => handleClick(PAGES_ROUTES.TASK_FEED_CONFIG)}
                selected={currentPage === PAGES_ROUTES.TASK_FEED_CONFIG}
              >
                {'Task Feed Config'}
              </SidebarItem>
            </SidebarSection>
          )}
        </>
      )}
    </Sidebar>
  );
};

export default AccountSettingsSidebar;
