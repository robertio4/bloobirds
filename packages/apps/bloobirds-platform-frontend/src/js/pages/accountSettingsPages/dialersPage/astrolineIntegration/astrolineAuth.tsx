import React, { useState } from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { Disconnected } from '../../../../../assets/svg';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import styles from './astroline.module.css';
import ConnectAstrolineModal from './connectAstrolineModal/connectAstrolineModal';

const AstrolineAuth = () => {
  const [configModalOpen, setConfigModalOpen] = useState(false);

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
          Astroline is not connected
        </Text>
        <Text
          className={styles._auth_text}
          size="m"
          weight="regular"
          color="softPeanut"
          align="center"
        >
          Connecting your Astroline will allow you to call in Bloobirds by the Astorline dialer and
          synchronise the phone activity with your Bloobirds data.
        </Text>
        <Text size="m" weight="regular" color="softPeanut" align="center">
          Do you wish to connect your Astroline account?
        </Text>
        <Button
          className={styles._auth_button}
          iconLeft="settings"
          onClick={() => setConfigModalOpen(!configModalOpen)}
        >
          CONNECT
        </Button>
      </div>
      {configModalOpen && <ConnectAstrolineModal onClose={() => setConfigModalOpen(false)} />}
    </AccountSettingsTab>
  );
};

export default AstrolineAuth;
