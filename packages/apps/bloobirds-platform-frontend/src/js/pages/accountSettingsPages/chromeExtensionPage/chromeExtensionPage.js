import React from 'react';

import { Button } from '@bloobirds-it/flamingo-ui';

import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import LinkedInTab from './pages/linkedInTab';

const ChromeExtensionPage = () => {
  const roleManager = SessionManagerFactory().getRoleManager();

  return roleManager.isAccountAdmin() ? (
    <AccountSettingsLayout
      title="Chrome Extension"
      subtitle="Configure settings for our Chrome extension"
      actionChildren={
        <Button
          iconLeft="playOutline"
          variant="clear"
          uppercase={false}
          onClick={() => {
            window.open('https://www.linkedin.com/in/tonipereznavarro/', '_target');
          }}
        >
          View in LinkedIn
        </Button>
      }
    >
      <LinkedInTab />
    </AccountSettingsLayout>
  ) : (
    <NoPermissionsPage />
  );
};

export default ChromeExtensionPage;
