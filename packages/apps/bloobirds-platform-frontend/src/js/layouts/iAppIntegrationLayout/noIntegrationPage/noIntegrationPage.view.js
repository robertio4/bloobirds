import React from 'react';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import styles from './noIntegrationPage.module.css';
import { Disconnected } from '../../../../assets/svg';
import { CRM, CRM_DISPLAY_NAME } from '../../../constants/integrations';

const NoIntegrationPage = ({ crm, link, appDisconnected }) => {
  const displayCrm = CRM_DISPLAY_NAME[crm];
  return (
    <div className={styles._container}>
      {!appDisconnected && (
        <>
          <div className={styles._ellipse}>
            <Disconnected />
          </div>
          <Text size="xxl" weight="medium" color="peanut" align="center">
            {displayCrm} is not connected
          </Text>
          <Text size="m" weight="regular" color="softPeanut" align="center">
            Connecting your {displayCrm} will allow you to synchronise it with your Bloobirds data,
            such as the companies, leads, and activities.
          </Text>
          <Text size="m" weight="regular" color="softPeanut" align="center">
            Do you wish to connect your {displayCrm}?
          </Text>
          <a href={link} target="_blank" rel="noreferrer">
            <Text size="m" weight="regular" color="bloobirds" align="center">
              Learn how to connect your {displayCrm}.
            </Text>
          </a>
        </>
      )}
      {appDisconnected && ( // TODO: Show if connection is defunct
        <>
          <div className={styles._ellipse_error}>
            <Icon name="alertTriangle" color="tomato" size={48} />
          </div>
          <Text size="xxl" weight="medium" color="peanut" align="center">
            Bloobirds app not found in {displayCrm}
          </Text>
          <Text size="m" weight="regular" color="softPeanut" align="center">
            You have started an integration with {displayCrm} but Bloobirds has been removed from{' '}
            {displayCrm}, therefore, the integration can no longer work.
          </Text>
          <Text size="m" weight="bold" color="softPeanut" align="center">
            Do you wish to re-connect with {displayCrm}?
          </Text>
        </>
      )}
      <div className={styles._content}></div>
    </div>
  );
};

export default NoIntegrationPage;
