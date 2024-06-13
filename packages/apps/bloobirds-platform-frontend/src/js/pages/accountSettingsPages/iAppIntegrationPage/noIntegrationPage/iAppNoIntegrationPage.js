import React, { useCallback, useEffect, useState } from 'react';
import { CRM } from '../../../../constants/integrations';
import styles from '../../../../layouts/integrationLayout/noIntegrationPage/noIntegrationPage.module.css';
import { Disconnected } from '../../../../../assets/svg';
import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import DisconnectIntegrationModal from '../../../../layouts/integrationLayout/syncSettingsTab/outbound/disconnectIntegrationModal/disconnectIntegrationModal';

const IAppNoIntegrationPage = props => {
  const integration = props.integration;
  const iAppClient = props.iAppClient;
  const fetchIAppData = props.fetchIAppData;
  return (
    <div className={styles._container}>
      <div className={styles._ellipse}>
        <Disconnected />
      </div>
      <Text size="xxl" weight="medium" color="peanut" align="center">
        {integration.name} is not connected
      </Text>
      <Text size="m" weight="regular" color="softPeanut" align="center">
        Connecting your {integration.name} will allow you to synchronise it with your Bloobirds
        data, such as the companies, leads, and activities.
      </Text>
      <Text size="m" weight="regular" color="softPeanut" align="center">
        Do you wish to connect your {integration.name}?
      </Text>

      <div className={styles._content}>
        <div className={styles._buttons}>
          <Button
            variant="primary"
            color="bloobirds"
            iconLeft="settings"
            onClick={async () => {
              if (await iAppClient.integration(integration.key).openNewConnection()) {
                fetchIAppData();
              }
            }}
            uppercase
            expand
          >
            connect {integration.name}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default IAppNoIntegrationPage;
