import React, { useState } from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { Disconnected } from '../../../../../assets/svg';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import ConnectNumintecModal from './connectNumintecModal/connectNumintecModal';
import styles from './numintec.module.css';
import { useTranslation } from 'react-i18next';

const NumintecAuth = () => {
  const [configModalOpen, setConfigModalOpen] = useState(false);
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
          {t('accountSettings.dialers.numintec.status.notConnected')}
        </Text>
        <Text
          className={styles._auth_text}
          size="m"
          weight="regular"
          color="softPeanut"
          align="center"
        >
          {t('accountSettings.dialers.numintec.status.connectHint')}
        </Text>
        <Text size="m" weight="regular" color="softPeanut" align="center">
          {t('accountSettings.dialers.numintec.status.connectQuestion')}
        </Text>
        <Button
          className={styles._auth_button}
          iconLeft="settings"
          onClick={() => setConfigModalOpen(!configModalOpen)}
        >
          {t('accountSettings.dialers.numintec.status.connect')}
        </Button>
      </div>
      {configModalOpen && <ConnectNumintecModal onClose={() => setConfigModalOpen(false)} />}
    </AccountSettingsTab>
  );
};

export default NumintecAuth;
