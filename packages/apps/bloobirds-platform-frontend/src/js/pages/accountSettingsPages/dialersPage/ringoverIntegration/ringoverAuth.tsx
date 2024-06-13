import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { Disconnected } from '../../../../../assets/svg';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import ConnectRingoverModal from './connectRingoverModal/connectRingoverModal';
import styles from './ringover.module.css';

const RingoverAuth = () => {
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
          {t('accountSettings.dialers.ringover.status.notConnected')}
        </Text>
        <Text
          className={styles._auth_text}
          size="m"
          weight="regular"
          color="softPeanut"
          align="center"
        >
          {t('accountSettings.dialers.ringover.status.connectHint')}
        </Text>
        <Text size="m" weight="regular" color="softPeanut" align="center">
          {t('accountSettings.dialers.ringover.status.connectQuestion')}
        </Text>
        <Button
          className={styles._auth_button}
          iconLeft="settings"
          onClick={() => setConfigModalOpen(!configModalOpen)}
        >
          {t('accountSettings.dialers.ringover.status.connect')}
        </Button>
      </div>
      {configModalOpen && <ConnectRingoverModal onClose={() => setConfigModalOpen(false)} />}
    </AccountSettingsTab>
  );
};

export default RingoverAuth;
