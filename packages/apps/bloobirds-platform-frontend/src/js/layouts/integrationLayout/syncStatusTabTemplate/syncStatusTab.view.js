import React from 'react';
import ProgressBar from '../../../components/progressBar/progressBar';
import { Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import styles from './syncStatusTab.module.css';
import PropTypes from 'prop-types';
import { numberWithDots } from '../../../utils/strings.utils';
import IntegrationLogs from '../integrationsLogsTableV2/integrationLogs';
import { CRM } from '../../../constants/integrations';

const SyncStatusTab = ({ apiUsage, error, crm }) => {
  const apiCalls = apiUsage ? apiUsage.max - apiUsage.remaining : 0;

  const containerStyle = { marginBottom: '12px' };
  return (
    <>
      {crm === CRM.SALESFORCE && (
        <div className={styles._card_container} style={containerStyle}>
          <div className={styles._api_call_title}>
            <Icon name="barchart" size="24" />
            <Text size="l" weight="medium">
              API call use (past 24 hours)
            </Text>
          </div>
          <div className={styles._api_call_text}>
            <Text size="m" weight="medium">
              API calls used
            </Text>
            <Text size="m" weight="medium" color="bloobirds">
              {!error && apiCalls > 0 ? (
                `${numberWithDots(apiCalls)} / ${numberWithDots(apiUsage.max)}`
              ) : (
                <Spinner name="loadingCircle" size="24px" />
              )}
              {error && (
                <Text color="softTomato" size="s" inline>
                  We had an issue getting your API calls! Please review the connected user
                </Text>
              )}
            </Text>
          </div>
          <ProgressBar
            completed={apiCalls > apiUsage.max ? 100 : (apiCalls / apiUsage.max) * 100}
          />
        </div>
      )}
      <IntegrationLogs integration={crm} />
    </>
  );
};

SyncStatusTab.propTypes = {
  apiUsage: PropTypes.number,
  crm: PropTypes.string,
  syncDirectionOptions: PropTypes.arrayOf(PropTypes.string),
};
export default SyncStatusTab;
