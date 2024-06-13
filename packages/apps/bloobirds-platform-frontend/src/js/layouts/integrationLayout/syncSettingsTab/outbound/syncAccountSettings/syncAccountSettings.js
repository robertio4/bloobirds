import React, { useCallback, useEffect, useState } from 'react';

import { Button, Clipboard, Select, Text, TextArea } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId } from '@bloobirds-it/hooks';
import { api } from '@bloobirds-it/utils';
import PropTypes from 'prop-types';

import { CRM } from '../../../../../constants/integrations';
import { useEntity } from '../../../../../hooks';
import { useFeatureFlags } from '../../../../../hooks/useFeatureFlags';
import { useHubspotIntegration } from '../../../../../hooks/useHubspotIntegration';
import styles from '../syncSettingsTabOutbound.module.css';
import CreateInboundMappings from './createInboundMappings/createInboundMappings';

const AccountSyncSettings = ({
  activeIntegration,
  defaultValue,
  mappedSalesforceUsers,
  crm,
  handleAccountSettings,
  handleDisabled,
  disabled,
}) => {
  const isHubspot = crm === CRM.HUBSPOT;
  const title = isHubspot ? 'HubSpot API key' : 'Salesforce Consumer Key';
  const [urlHubspot, setUrlHubspot] = useState(undefined);
  const { isFlagEnabled } = useFeatureFlags();
  const { updateScopes } = useHubspotIntegration();
  const integrationTriggers = useEntity('integrationTriggers')
    ?.all()
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name]: curr.id,
      }),
      {},
    );
  const inboundTriggerRepo = useEntity('accountIntegrationTriggers')?.findBy(
    'integrationTrigger',
    integrationTriggers?.INBOUND__SALESFORCE,
  );
  const accountId = useActiveAccountId();

  const activateFlag = () => {
    api.get(`/featureFlags/feature/activate/SALESFORCE_OAUTH/${accountId}`);
  };

  const isActiveHubspotInbound = isFlagEnabled('INBOUND_HUBSPOT');

  const onSubmitHubspot = useCallback(() => {
    window.location.href = urlHubspot;
  }, [urlHubspot]);

  const renderClipboard =
    (crm === CRM.HUBSPOT && !isActiveHubspotInbound) || crm === CRM.SALESFORCE;

  const handleEllipsis = text => (text && text?.length > 20 ? `${text.substr(0, 20)}...` : text);
  useEffect(() => {
    api
      .get('/utils/hubspot/generate-url')
      .then(response => response?.data)
      .then(res => {
        setUrlHubspot(res.url);
      });
  }, []);
  const generateUrl = () => {
    api
      .get('/utils/service/salesforce/generate-url/false')
      .then(response => response?.data)
      .then(res => {
        window.location.href = res.url;
      });
  };

  const onClickScopes = async () => {
    await updateScopes();
    onSubmitHubspot();
  };

  return (
    <div>
      <div className={styles._textArea}>
        <div className={styles._children_salesforce_account_container}>
          {activeIntegration &&
            ((isHubspot && !activeIntegration.accessToken) || activeIntegration.clientId) && (
              <TextArea
                disabled
                placeholder={title}
                defaultValue={
                  !isHubspot
                    ? handleEllipsis(activeIntegration.clientId)
                    : handleEllipsis(activeIntegration.legacyToken)
                }
                onChange={value => {
                  handleAccountSettings(value);
                  handleDisabled({ ...disabled, isDisabledSalesforceAccount: false });
                }}
                width="100%"
              />
            )}
          {isActiveHubspotInbound &&
            activeIntegration &&
            isHubspot &&
            !activeIntegration.accessToken && (
              <Button
                variant="primary"
                color="bloobirds"
                iconLeft="hubspot"
                onClick={onSubmitHubspot}
                uppercase
              >
                Install Bloobirds App in Hubspot
              </Button>
            )}
          {activeIntegration && isHubspot && activeIntegration.accessToken && (
            <Text size={'m'} weight="regular" color="softPeanut">
              Using Bloobirds App within Hubspot,{' '}
              <Text color="bloobirds" size="m" weight="regular" inline>
                learn how to disconnect.
              </Text>
            </Text>
          )}
          {activeIntegration && isHubspot && !activeIntegration.addedNewScopes && (
            <Button variant="primary" color="bloobirds" iconLeft="hubspot" onClick={onClickScopes}>
              refresh Bloobirds App in Hubspot
            </Button>
          )}
          {activeIntegration && mappedSalesforceUsers && (
            <Select
              defaultValue={defaultValue}
              onChange={value => {
                handleDisabled({ ...disabled, isDisabledSalesforceAccount: false });
                handleAccountSettings(value);
              }}
              placeholder="Salesforce Admin Email"
              width="100%"
            >
              {mappedSalesforceUsers}
            </Select>
          )}
          {activeIntegration && !isHubspot && (
            <Button
              expand
              variant="primary"
              color="bloobirds"
              iconLeft="salesforce"
              onClick={() => {
                activateFlag();
                generateUrl();
              }}
            >
              generate access token
            </Button>
          )}
        </div>
        {renderClipboard && (
          <div className={styles._clipboard}>
            <Clipboard text={!isHubspot ? activeIntegration.clientId : activeIntegration.apiKey} />
          </div>
        )}
      </div>
      <div>{!isHubspot && !inboundTriggerRepo && <CreateInboundMappings />}</div>
    </div>
  );
};
export default AccountSyncSettings;

AccountSyncSettings.propTypes = {
  activeIntegration: PropTypes.shape({
    clientId: PropTypes.string,
    hasError: PropTypes.bool,
    id: PropTypes.string,
    instanceHost: PropTypes.string,
    integrationId: PropTypes.string,
    isLoaded: PropTypes.bool,
    salesforceUser: PropTypes.string,
  }),
  crm: PropTypes.string,
  defaultValue: PropTypes.string,
  mappedSalesforceUsers: PropTypes.any,
};
