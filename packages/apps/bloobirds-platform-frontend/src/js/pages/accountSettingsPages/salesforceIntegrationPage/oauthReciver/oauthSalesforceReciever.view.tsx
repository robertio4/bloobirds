import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Callout, Icon, ProgressLabel, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useSalesforceIntegration } from '../../../../hooks/useSalesforceIntegration';
import styles from '../../huspotIntegrationPage/oauthReciever/oauthReciever.module.css';

const OauthSalesforceReceiver = () => {
  const {
    createOauthIntegration,
    activeIntegration,
    setActiveIntegration,
  } = useSalesforceIntegration();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const query = Object.fromEntries(new URLSearchParams(useLocation().search));

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      createOauthIntegration(query)
        .then(() => {
          setActiveIntegration({
            ...activeIntegration,
            hasError: false,
            isLoaded: true,
          });
        })
        .catch(() => {
          setActiveIntegration({
            ...activeIntegration,
            hasError: true,
            isLoaded: true,
          });
          setError(true);
        });
    }
  }, [loading]);

  useEffect(() => {
    if (activeIntegration?.isLoaded) {
      setLoading(false);
    }
  }, [activeIntegration]);

  return (
    <div className={styles._container}>
      {loading && (
        <>
          <span className={styles._clock}>
            <Icon name="clock" size={48} />
          </span>
          <Text size="xxl" weight="medium" color="peanut" align="center">
            Salesforce app installed successfully
          </Text>
          <div className={styles._subtitle}>
            <Text size={'m'} weight="regular" color="peanut" align={'center'}>
              This may take a few minutes. Do not reload the page
            </Text>
          </div>
          <span className={styles._spinner}>{loading && <Spinner name={'loadingCircle'} />}</span>
          {error && (
            <Callout
              variant="negative"
              text="An error has occurred during the installation process. If the error persists contact our Support team"
            />
          )}
        </>
      )}
    </div>
  );
};

export default OauthSalesforceReceiver;
