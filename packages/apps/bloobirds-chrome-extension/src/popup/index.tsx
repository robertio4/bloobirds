import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { isLoggedIn } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import LogoIcon from '../content/components/bloobirds';
import { CHANNEL_POPUP, NEW_VERSION, RELOAD, VERSION_UPDATED } from '../utils/constants';
import styles from './index.module.css';

const getLatestVersion = async () => {
  const response = await fetch('https://gateway.bloobirds.com/auth/service/extension/version');
  return response.json();
};

const PopupFooter = (): JSX.Element => {
  const channel = new BroadcastChannel(CHANNEL_POPUP);
  const [isObsolete, setIsObsolete] = useState<boolean>(false);
  const manifest = chrome.runtime.getManifest();
  const currentVersion = manifest.version;

  getLatestVersion().then(data => {
    const version = data?.version;
    console.log('API version:', version);
    const isObsolete = version !== currentVersion;
    setIsObsolete(isObsolete);
  });

  function handleRefresh() {
    channel?.postMessage({ msg: RELOAD });
    mixpanel.track(MIXPANEL_EVENTS.EXTENSION_UPDATE);
  }

  if (isObsolete) {
    channel?.postMessage({ msg: NEW_VERSION });

    return (
      <div className={styles._version_outdated}>
        <Text color="white" size="xs" weight="bold">
          Version: {currentVersion}
        </Text>
        <div className={styles.updateAvailabelBanner}>
          👀 New version available!
          <div className={styles.updateButton} onClick={handleRefresh}>
            <Icon name="refresh" color="banana" size={14} />{' '}
            <Text size="xs" color="banana">
              Update
            </Text>
          </div>
        </div>
      </div>
    );
  } else {
    channel?.postMessage({ msg: VERSION_UPDATED });
    return (
      <div className={styles._version}>
        <Text color="bloobirds" size="xs" weight="bold">
          Version: {currentVersion}
        </Text>
      </div>
    );
  }
};
const Popup = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    isLoggedIn().then((isLogged: boolean) => {
      setLoggedIn(isLogged);
    });
  }, []);

  function handleLogin() {
    chrome.tabs.create({ url: 'https://auth.bloobirds.com/auth/login' });
  }

  return (
    <div className={styles._container}>
      <div className={styles._header}>
        <LogoIcon fill="#1991FF" />
        <div className={styles._text}>
          <Text htmlTag="h1" weight="bold" size="xl">
            Bloobirds
          </Text>
        </div>
      </div>
      <div className={styles._content}>
        <Text size="xs" color="softPeanut">
          Use Bloobirds <b>On Top of</b> your favourite tools. Keep track of your contacts,
          companies, opportunities and tasks everywhere! ✨
        </Text>
      </div>
      {!loggedIn && (
        <div style={{ width: '290px', display: 'flex', justifyContent: 'center' }}>
          <Button iconLeft="logIn" onClick={handleLogin}>
            Log in Bloobirds
          </Button>
        </div>
      )}
      <PopupFooter />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
