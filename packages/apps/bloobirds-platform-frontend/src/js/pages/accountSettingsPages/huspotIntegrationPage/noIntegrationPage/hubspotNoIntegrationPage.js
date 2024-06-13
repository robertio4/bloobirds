import React, { useCallback, useEffect, useState } from 'react';
import NoIntegrationPage from '../../../../layouts/integrationLayout/noIntegrationPage';
import { useHubspotIntegration } from '../../../../hooks/useHubspotIntegration';
import { useRouteMatch } from 'react-router';
import { APP_ACCOUNT_INTEGRATION_HUBSPOT_OAUTH } from '../../../../app/_constants/routes';
import OauthReciever from '../oauthReciever';
import { CRM } from '../../../../constants/integrations';
import { api } from '@bloobirds-it/utils';

const HubspotNoIntegrationPage = props => {
  const { appDisconnected, setAppDisconnected } = props;
  const match = useRouteMatch({
    path: APP_ACCOUNT_INTEGRATION_HUBSPOT_OAUTH,
    strict: true,
    sensitive: true,
  });
  const { isSubmitting, activeIntegration } = useHubspotIntegration();
  const [url, setUrl] = useState(undefined);
  const [errorIntegration, handleError] = useState(false);
  const { disconnectIntegration } = useHubspotIntegration();
  const defaultValues = {
    apiKey: '',
  };
  useEffect(() => {
    if (!activeIntegration.isLoaded && !appDisconnected) {
      api
        .get('/utils/hubspot/generate-url')
        .then(response => response?.data)
        .then(res => {
          setUrl(res.url);
        });
    }
  }, [appDisconnected]);

  const onSubmit = useCallback(() => {
    window.location.href = url;
  }, [url]);

  return (
    <>
      {!match && (
        <NoIntegrationPage
          crm={CRM.HUBSPOT}
          link="https://support.bloobirds.com/hc/en-us/articles/360018547839-Set-up-Hubspot-connection-on-Bloobirds"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          handleError={handleError}
          error={errorIntegration}
          isSubmiting={isSubmitting}
          appDisconnected={appDisconnected}
          disconnectIntegration={disconnectIntegration}
        />
      )}
      {match && <OauthReciever setAppDisconnected={setAppDisconnected} />}
    </>
  );
};
export default HubspotNoIntegrationPage;
