import React, { useEffect } from 'react';

import { useUserHelpers } from '@bloobirds-it/hooks';
import { Connections, UserHelperKeys } from '@bloobirds-it/types';

import { fetchAndOpenNylasUrl } from '../../../../../pages/userSettingsPages/emailSettings/emailSettings.services';
import { GoogleSignIn, MicrosoftSignIn } from '../../../../BrandedButtons';
import ConnectionCard from '../../../../connectionCard';
import { useUserSettings } from '../../../../userPermissions/hooks';
import styles from '../../slides/slides.module.css';

export const EmailDisplay = ({ connections }: { connections: Connections }) => {
  const { settings } = useUserSettings();
  const { save } = useUserHelpers();

  useEffect(() => {
    if (connections?.list?.length > 0) {
      save(UserHelperKeys.CONNECT_EMAIL);
    }
  }, [connections?.list?.length]);

  const hasConnections = connections?.list && connections.list.length > 0;
  return hasConnections ? (
    <div className={styles.connectionsContainer}>
      {connections.list?.map(connection => (
        <ConnectionCard
          data={connection}
          isNylas
          key={connection.email}
          isDefault={connection.email === connections.defaultConnection}
          isQSG
        />
      ))}
    </div>
  ) : (
    <div className={styles.row}>
      {settings?.gmailConnectButtonEnabled && (
        <GoogleSignIn
          onClick={() =>
            fetchAndOpenNylasUrl({
              bbPage: window.location.pathname + '?welcomeScreen=',
              target: '_self',
            })
          }
        />
      )}
      {settings?.microsoftConnectButtonEnabled && (
        <MicrosoftSignIn
          onClick={() =>
            fetchAndOpenNylasUrl({
              bbPage: window.location.pathname + '?welcomeScreen=',
              target: '_self',
            })
          }
        />
      )}
    </div>
  );
};
