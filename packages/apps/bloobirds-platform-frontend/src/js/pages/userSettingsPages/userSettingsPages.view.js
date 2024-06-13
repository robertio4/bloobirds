import React, { useState } from 'react';

import { Spinner, Tab, TabGroup, Text } from '@bloobirds-it/flamingo-ui';
import { useWhatsappEnabled } from '@bloobirds-it/hooks';

import { useUserSettings, useUserSettingsReload } from '../../components/userPermissions/hooks';
import { useDialerVisibility, useDocumentTitle, useQueryParams } from '../../hooks';
import ConnectionsSettings from './cadenceSettings/cadenceSettings';
import CallSettings from './callSettings';
import ChromeAppSettings from './chromeAppSettings';
import EmailSettings from './emailSettings/emailSettings';
import Header from './header';
import { MeetingSettings } from './meetingSettings/meetingSettings';
import PasswordSettings from './passwordSettings';
import PersonalDetails from './personalDetails';
import RemindersSettings from './remindersSettings';
import styles from './userSettingsPages.module.css';
import WhatsappSettings from './whatsappSettings';

const TABS = Object.freeze({
  PERSONAL_DETAILS: 'General',
  EMAIL: 'Email',
  CALLS: 'Phone',
  LINKEDIN_EXTENSION: 'Chrome App',
  MEETINGS: 'Meetings',
  CADENCE: 'Cadence',
  SECURITY: 'Security',
  CONNECTIONS: 'Email',
  REMINDERS: 'Tasks and Reminders',
  WHATSAPP: 'Whatsapp',
});

const UserSettingsPage = () => {
  const params = useQueryParams();
  const [activeTab, setActiveTab] = useState(
    params.get('tab') ? TABS[params.get('tab')] : TABS.PERSONAL_DETAILS,
  );
  const settings = useUserSettings();
  const userSettingsReload = useUserSettingsReload();
  const isLoading = settings === undefined;
  const { isOpen } = useDialerVisibility();
  useDocumentTitle('User Settings');

  const accountId = settings.account.id;
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);

  return (
    <div className={styles._page__container} data-intercom="user-settings-page">
      <Header title="Your personal settings" />
      <div className={styles._page__content}>
        <div className={styles._title__container}>
          <Text size="xl" color="softPeanut">
            Personal settings
          </Text>
        </div>
        {!isLoading ? (
          <div className={isOpen ? styles._tabs__container_with_dialer : styles._tabs__container}>
            <TabGroup value={activeTab} onClick={tab => setActiveTab(tab)}>
              <Tab name={TABS.PERSONAL_DETAILS}>
                <PersonalDetails userSettings={settings.user} />
              </Tab>
              <Tab name={TABS.EMAIL}>
                <EmailSettings userSettings={settings.user} />
              </Tab>
              <Tab name={TABS.CALLS}>
                <CallSettings />
              </Tab>
              <Tab name={TABS.LINKEDIN_EXTENSION}>
                <ChromeAppSettings />
              </Tab>
              {hasWhatsappEnabled && (
                <Tab name={TABS.WHATSAPP}>
                  <WhatsappSettings userSettings={settings.user} />
                </Tab>
              )}
              <Tab name={TABS.MEETINGS}>
                <MeetingSettings />
              </Tab>
              <Tab name={TABS.CADENCE} dataTest={'UserSettings-CadenceTab'}>
                <ConnectionsSettings />
              </Tab>
              <Tab name={TABS.REMINDERS} dataTest={'UserSettings-RemindersTab'}>
                <RemindersSettings userSettings={settings.user} />
              </Tab>
              <Tab name={TABS.SECURITY}>
                <PasswordSettings onSubmit={userSettingsReload} />
              </Tab>
            </TabGroup>
          </div>
        ) : (
          <div className={styles._spinner__container}>
            <Spinner name="loadingCircle" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettingsPage;
