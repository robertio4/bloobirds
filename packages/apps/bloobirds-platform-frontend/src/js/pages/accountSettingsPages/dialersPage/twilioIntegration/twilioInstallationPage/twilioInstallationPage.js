import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { Disconnected } from '../../../../../../assets/svg';
import { AccountSettingsTab } from '../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from './twilioInstallationPage.module.css';

export const TwilioInstallationPage = ({ setModalVisible }) => {
  const { t } = useTranslation();
  return (
    <AccountSettingsTab>
      <div className={styles._auth_container}>
        <div className={styles._ellipse}>
          <Disconnected />
        </div>
        <Text
          className={styles._auth_header}
          size="xxl"
          weight="medium"
          color="peanut"
          align="center"
        >
          {t('accountSettings.dialers.twilio.twilioNotConnected')}
        </Text>
        <Text
          className={styles._auth_text}
          size="m"
          weight="regular"
          color="softPeanut"
          align="center"
        >
          {t('accountSettings.dialers.twilio.twilioConnectInfo')}
        </Text>
        <Text size="m" weight="regular" color="softPeanut" align="center">
          {t('accountSettings.dialers.twilio.confirmConnectTwilio')}
        </Text>
        <Button
          className={styles._auth_button}
          iconLeft="settings"
          onClick={() => setModalVisible(true)}
        >
          {t('accountSettings.dialers.twilio.connectTwilio').toUpperCase()}
        </Button>
      </div>
    </AccountSettingsTab>
  );
};
