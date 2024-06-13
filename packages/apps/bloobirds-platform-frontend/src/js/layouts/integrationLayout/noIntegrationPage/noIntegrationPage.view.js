import React from 'react';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';

import { Disconnected } from '../../../../assets/svg';
import { CRM, CRM_DISPLAY_NAME } from '../../../constants/integrations';
import { useSalesforceOauthEnabled } from '../../../hooks/useFeatureFlags';
import DisconnectIntegrationModal
  from '../syncSettingsTab/outbound/disconnectIntegrationModal/disconnectIntegrationModal';
import ConnectIntegrationModal from './connectIntegrationModal/connectIntegrationModal';
import styles from './noIntegrationPage.module.css';

export const generateSFDCUrl = (isSandbox) => {
  api
    .get(`/utils/service/salesforce/generate-url/${isSandbox}`)
    .then(response => response?.data)
    .then(res => {
      window.location.href = res.url;

    });
};

const NoIntegrationPage = ({
  crm,
  link,
  children,
  error,
  handleError,
  onSubmit,
  isSubmiting,
  isConnected,
  appDisconnected,
  disconnectIntegration,
  disabled,
}) => {
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const isSalesforceOauthEnabled = useSalesforceOauthEnabled();

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
          {displayCrm !== CRM_DISPLAY_NAME.DYNAMICS && (
            <a href={link} target="_blank" rel="noreferrer">
              <Text size="m" weight="regular" color="bloobirds" align="center">
                Learn how to connect your {displayCrm}.
              </Text>
            </a>
          )}
        </>
      )}
      {appDisconnected && (
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
      <div className={styles._content}>
        {crm === CRM.HUBSPOT && (
          <div className={styles._buttons}>
            <Button
              variant="primary"
              color="bloobirds"
              iconLeft="hubspot"
              onClick={onSubmit}
              uppercase
              expand
            >
              connect {crm}
            </Button>
            {appDisconnected && (
              <DisconnectIntegrationModal
                disconnectIntegration={disconnectIntegration}
                crm={crm}
                appDisconnected={appDisconnected}
              />
            )}
          </div>
        )}
        {crm === CRM.HUBSPOT && (
          <a href={link} target="_blank" rel="noreferrer">
            <Text size="m" weight="regular" color="bloobirds" align="center">
              Learn how to connect your {crm}.
            </Text>
          </a>
        )}
        {crm !== CRM.HUBSPOT && !isConnected && (
          <>
            {isSalesforceOauthEnabled && crm === CRM.SALESFORCE ? (
              <>
                <Button
                  variant="primary"
                  color="bloobirds"
                  iconLeft="settings"
                  onClick={() => generateSFDCUrl(false)}
                  uppercase
                >
                  connect {displayCrm}
                </Button>{' '}
                <Text size="m" color="softPeanut" className={styles._sandbox_button}>
                  Are you testing?{' '}
                  <span style={{ cursor: 'pointer' }} onClick={() => generateSFDCUrl(true)}>
                    <Text size="m" color="bloobirds" inline>
                      Connect a Sandbox account instead
                    </Text>{' '}
                  </span>
                </Text>
              </>
            ) : (
              <ConnectIntegrationModal
                crm={crm}
                error={error}
                handleError={handleError}
                onSubmit={onSubmit}
                isSubmitting={isSubmiting}
                disabled={disabled}
              >
                {children}
              </ConnectIntegrationModal>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NoIntegrationPage;
