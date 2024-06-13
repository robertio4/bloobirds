import React, { useEffect, useState } from 'react';
import styles from './oauthReciever.module.css';
import { useLocation } from 'react-router-dom';
import { Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useHubspotIntegration } from '../../../../hooks/useHubspotIntegration';
import { useHistory } from 'react-router';
import { APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS } from '../../../../app/_constants/routes';

const useQuery = () => new URLSearchParams(useLocation().search);
const OauthReciever = ({ setAppDisconnected }) => {
  const { createIntegration, activeIntegration } = useHubspotIntegration();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    if (query.get('code') && !activeIntegration.isLoaded) {
      createIntegration(query.get('code'), ({ hasError }) => {
        if (hasError) {
          setError(true);
        } else {
          setLoaded(true);
        }
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      });
    } else {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    if (!loading && loaded) {
      setTimeout(() => {
        history.push(APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS);
        setAppDisconnected(false);
      }, 4000);
    }
  }, [loading, loaded]);

  return (
    <div className={styles._container}>
      {loading && (
        <>
          <span className={styles._clock}>
            <Icon name="clock" size={48} />
          </span>
          <Text size="xxl" weight="medium" color="peanut" align="center">
            Hubspot app installed successfully
          </Text>
          <div className={styles._subtitle}>
            <Text size={'m'} weight="regular" color="softPeanut" align={'center'}>
              Starting integration...
            </Text>
          </div>
          <span className={styles._spinner}>
            <Spinner name="dots" size={50} />
          </span>
        </>
      )}
      {!loading && !error && (
        <>
          <span className={styles._check}>
            <Icon name="check" size={48} color="melon" />
          </span>
          <Text size="xxl" weight="medium" color="peanut" align="center">
            Hubspot app installed successfully
          </Text>
          <div className={styles._subtitle}>
            <Text size={'m'} weight="regular" color="softPeanut" align={'center'}>
              Now you can synchronise it with your Bloobirds data, such as companies, leads, and
              activities.
              <br />
              <br />
              You are being redirected to the configuration...
            </Text>
          </div>

          <span className={styles._spinner}>
            <Spinner name="dots" size={50} />
          </span>
        </>
      )}
      {!loading && error && (
        <>
          <span className={styles._warning}>
            <Icon name="alertTriangle" size={48} color="banana" />
          </span>
          <Text size="xxl" weight="medium" color="peanut" align="center">
            Something went wrong...
          </Text>
          <div className={styles._subtitle}>
            <Text size={'m'} weight="regular" color="softPeanut" align={'center'}>
              There&apos;s been an error setting up the integration.
              <br />
              <br />
              please contact{' '}
              <Text size={'m'} inline color="bloobirds">
                support@bloobirds.com
              </Text>
            </Text>
          </div>
        </>
      )}
    </div>
  );
};

export default OauthReciever;
