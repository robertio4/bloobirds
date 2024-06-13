import React from 'react';

import { TabGroup, Tab, Icon } from '@bloobirds-it/flamingo-ui';
import PropTypes from 'prop-types';

import { CRM, CRM_DISPLAY_NAME } from '../../../constants/integrations';
import { useInboundHubspotEnabled } from '../../../hooks/useFeatureFlags';
import SyncSettingsTabEmbedded from './embedded/syncSettingsTabEmbedded';
import SyncSettingsTabInbound from './inbound/syncSettingsTabInbound';
import SyncSettingsTabOutbound from './outbound/index';
import styles from './syncSettingsTab.module.css';

const SyncSettingsTab = ({
  activityTrigger,
  leadTrigger,
  companyTrigger,
  meetingTrigger,
  salesforceUsers,
  dealsPipeline,
  crm,
  disconnectIntegration,
  activeIntegration,
  opportunityTrigger,
}) => {
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const tabTitle = inbound => (
    <div style={{ display: 'flex' }}>
      <p style={{ margin: '0 2px' }}>{inbound ? displayCrm : 'Bloobirds'}</p>
      <div>
        <Icon name="arrowRight" color="peanut" size="16" />
      </div>
      <p style={{ margin: ' 0 2px' }}>{inbound ? 'Bloobirds' : displayCrm}</p>
    </div>
  );

  const isActiveHubspotInbound = useInboundHubspotEnabled();
  const isSalesforce = crm === CRM.SALESFORCE;
  const isHubspot = crm === CRM.HUBSPOT;

  return (
    <div className={styles._container}>
      <TabGroup>
        <Tab name={tabTitle(false)} variant="secondary" color="peanut">
          <SyncSettingsTabOutbound
            activeIntegration={activeIntegration}
            activityTrigger={activityTrigger}
            companyTrigger={companyTrigger}
            disconnectIntegration={disconnectIntegration}
            dealsPipeline={dealsPipeline}
            crm={crm}
            leadTrigger={leadTrigger}
            meetingTrigger={meetingTrigger}
            salesforceUsers={salesforceUsers}
            opportunityTrigger={opportunityTrigger}
          />
        </Tab>

        <Tab
          name={tabTitle(true)}
          variant="secondary"
          color="peanut"
          disabled={!isActiveHubspotInbound && isHubspot}
        >
          <SyncSettingsTabInbound crm={crm} isActiveHubspotInbound={isActiveHubspotInbound} />
        </Tab>
        {isSalesforce && (
          <Tab name="Embedded Integrations" variant="secondary" color="peanut">
            <SyncSettingsTabEmbedded />
          </Tab>
        )}
      </TabGroup>
    </div>
  );
};

SyncSettingsTab.propTypes = {
  activeIntegration: PropTypes.func,
  activityTrigger: PropTypes.object,
  companyTrigger: PropTypes.object,
  crm: PropTypes.string,
  dealsPipeline: PropTypes.object,
  disconnectIntegration: PropTypes.func,
  leadTrigger: PropTypes.object,
  meetingTrigger: PropTypes.object,
  salesforceUsers: PropTypes.array,
};
export default SyncSettingsTab;
