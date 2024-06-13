import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Tab, TabGroup } from '@bloobirds-it/flamingo-ui';
import { useEmailIntegrationMode } from '@bloobirds-it/hooks';

import { APP_ACCOUNT_EMAILS } from '../../../app/_constants/routes';
import { GoogleSignIn, MicrosoftSignIn } from '../../../components/BrandedButtons';
import { useUserSettings } from '../../../components/userPermissions/hooks';
import { useRouter } from '../../../hooks';
import AccountSettingsTab from '../../../layouts/accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from './emailIntegrationPage.module.css';
import {
  fetchAndOpenLegacyUrl,
  fetchAndOpenNylasUrl,
} from '../../userSettingsPages/emailSettings/emailSettings.services';
import { UserEmailMappings } from './userEmailMappings/userEmailMappings';

const EmailIntegrationPage = ({ tab }: { tab: string }) => {
  const { accountIntegrationMode } = useEmailIntegrationMode();
  const settings = useUserSettings();

  const { history } = useRouter();
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.email',
  });

  const googleOnClick =
    settings?.settings.gmailConnectButtonType === 'LEGACY'
      ? fetchAndOpenLegacyUrl
      : () => fetchAndOpenNylasUrl({ provider: 'gmail' });

  const changeTab = useCallback(
    newTab => {
      history.push(`${APP_ACCOUNT_EMAILS}/${newTab.toLowerCase().replace(/\s+/g, '-')}`);
    },
    [history],
  );

  return accountIntegrationMode ? (
    <TabGroup value={tab} onClick={changeTab}>
      <Tab name="mappings" label={t('tabs.mappings')}>
        <AccountSettingsTab>
          <AccountSettingsTabContent>
            <AccountSettingsTabTitle icon="mail">{t('mappings.title')}</AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>{t('mappings.subtitle')}</AccountSettingsTabSubtitle>
            <div className={styles._email_buttons__container}>
              {settings?.settings.gmailConnectButtonEnabled && (
                <GoogleSignIn onClick={googleOnClick} />
              )}
              {settings?.settings.microsoftConnectButtonEnabled && (
                <MicrosoftSignIn onClick={() => fetchAndOpenNylasUrl({ provider: 'outlook' })} />
              )}
            </div>
            <UserEmailMappings />
          </AccountSettingsTabContent>
        </AccountSettingsTab>
      </Tab>
    </TabGroup>
  ) : null;
};

export default EmailIntegrationPage;
