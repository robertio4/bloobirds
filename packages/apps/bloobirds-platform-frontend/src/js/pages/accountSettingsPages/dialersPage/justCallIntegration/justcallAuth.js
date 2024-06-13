import React, { useState } from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { Disconnected } from '../../../../../assets/svg';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import GenerateJustcallTokenModal from './GenerateJustcallTokenModal/GenerateJustcallTokenModal';
import styles from './justcall.module.css';

const JustcallAuth = () => {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

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
          JustCall is not connected
        </Text>
        <Text
          className={styles._auth_text}
          size="m"
          weight="regular"
          color="softPeanut"
          align="center"
        >
          Connecting your JustCall will allow you to call in Bloobirds by the JustCall dialer and
          synchronise the phone activity with your Bloobirds data.
        </Text>
        <Text size="m" weight="regular" color="softPeanut" align="center">
          Do you wish to connect your Just Call account?
        </Text>
        <Button
          className={styles._auth_button}
          iconLeft="settings"
          onClick={() => setApiKeyModalOpen(!apiKeyModalOpen)}
        >
          GENERATE API KEY
        </Button>
      </div>
      {apiKeyModalOpen && (
        <GenerateJustcallTokenModal onClose={() => setApiKeyModalOpen(!apiKeyModalOpen)} />
      )}
    </AccountSettingsTab>
  );
};

export default JustcallAuth;
