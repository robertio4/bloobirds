import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { Disconnected } from '../../../../../assets/svg';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import { ServiceApi } from '../../../../misc/api/service';
import styles from './aircall.module.css';

const AircallAuth = () => {
  const [isFetchingInstallUrl, setIsFetchingInstallUrl] = useState(false);
  const { t } = useTranslation();
  const fetchAndOpenAircallUrl = () => {
    setIsFetchingInstallUrl(true);
    ServiceApi.request({
      url: '/aircall/generateUrl',
      method: 'GET',
    }).then(payload => {
      window.location.replace(payload.url);
    });
  };

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
          {t('accountSettings.dialers.aircall.aircallNotConnected')}
        </Text>
        <Text
          className={styles._auth_text}
          size="m"
          weight="regular"
          color="softPeanut"
          align="center"
        >
          {t('accountSettings.dialers.aircall.aircallConnectInfo')}
        </Text>
        <Text size="m" weight="regular" color="softPeanut" align="center">
          {t('accountSettings.dialers.aircall.confirmConnectAircall')}
        </Text>
        <Button
          className={styles._auth_button}
          disabled={isFetchingInstallUrl}
          onClick={fetchAndOpenAircallUrl}
          iconLeft="settings"
        >
          {t('accountSettings.dialers.aircall.confirmConnectAircall').toUpperCase()}
        </Button>
      </div>
    </AccountSettingsTab>
  );
};

export default AircallAuth;
