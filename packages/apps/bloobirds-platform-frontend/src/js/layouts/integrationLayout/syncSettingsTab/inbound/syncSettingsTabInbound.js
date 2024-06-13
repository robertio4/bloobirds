import React, { useEffect, useState } from 'react';
import { useEntity } from '../../../../hooks';
import SyncSettingsInboundHubspot from './hubspot/syncSettingsInboundHubspot';
import SyncSettingsSalesforceInbound from './salesforce/syncSettingsSalesforceInbound';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { CRM, TRIGGER_MAPPING_NAMES } from '../../../../constants/integrations';
import styles from '../outbound/syncSettingsTabOutbound.module.css';
import { RestApi } from '../../../../misc/api/rest';
import { saveTriggerSetting } from '../../../../utils/integration.utils';

const SyncSettingsTabInbound = ({ crm, isActiveHubspotInbound }) => {
  const inboundTriggerRepo = useEntity('accountIntegrationTriggers');
  const [inboundTrigger, setInboundTrigger] = useState({});
  const [refresh, setRefresh] = useState(true);
  const isFullSalesEnabled = useFullSalesEnabled();

  const [disabled, setDisabled] = useState({
    forms: true,
    leads: true,
    company: true,
    deals: true,
    delete: true,
    opportunities: true,
  });

  const integrationTriggers = useEntity('integrationTriggers')
    ?.all()
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name]: curr?.id,
      }),
      {},
    );

  useEffect(() => {
    const triggerName = crm === CRM.HUBSPOT ? 'INBOUND__HUBSPOT' : 'INBOUND__SALESFORCE';
    if (integrationTriggers) {
      const trigger = inboundTriggerRepo?.findBy(
        'integrationTrigger',
        integrationTriggers[triggerName],
      );

      if (refresh) {
        RestApi.get({ path: `accountIntegrationTriggers/${trigger?.id}` }).then(accountTrigger => {
          accountTrigger.jsonConfig = JSON.parse(accountTrigger.jsonConfig);
          setInboundTrigger({ ...accountTrigger });
          setRefresh(false);
        });
      }
    }
  }, [integrationTriggers, refresh]);

  const enableSave = propertyChanged => {
    switch (propertyChanged) {
      case 'createOpportunity':
      case 'salesforceRecordTypes':
        setDisabled({ ...disabled, opportunities: false });
        break;
      case 'campaignActivities':
      case 'formSubmissions':
        setDisabled({
          ...disabled,
          forms: false,
        });
        break;
      case 'deleteObjects':
        setDisabled({ ...disabled, delete: false });
        break;
      case 'companyStatus':
      case 'companyOwner':
      case 'companyCreationEvent':
      case 'companiesMustHaveLeads':
      case 'syncAccountField':
      case 'createAccount':
        setDisabled({ ...disabled, company: false });
        break;
      case 'contactList':
      case 'syncCompanyFromContact':
      case 'syncCompanyFromLead':
      case 'leadMql':
      case 'leadSal':
      case 'leadCompanyMql':
      case 'leadCompanySal':
      case 'syncContactsField':
      case 'syncLeadsField':
      case 'syncLeadActivity':
      case 'createLead':
      case 'createContact':
      case 'leadAccountExecutiveOwner':
        setDisabled({ ...disabled, leads: false });
        break;
      case 'companyStatusDealWon':
      case 'companyStatusDealLost':
      case 'companyAccountDealStage':
      case 'companyStatusOppWon':
      case 'companyStatusOppLost':
      case 'companyAccountOppStage':
      case 'companyAccountExecutiveOwner':
        setDisabled({ ...disabled, deals: false });
        break;
      default:
    }
  };
  const setConfig = (configProperty, value) => {
    enableSave(configProperty);
    const config = inboundTrigger.jsonConfig;
    const newConfig = { ...config, [configProperty]: value };
    setInboundTrigger({ ...inboundTrigger, jsonConfig: newConfig });
  };

  const saveTrigger = card => {
    RestApi.patch({
      entity: 'accountIntegrationTriggers',
      id: inboundTrigger?.id,
      body: {
        jsonConfig: JSON.stringify(inboundTrigger.jsonConfig),
      },
    }).then(() => {
      setDisabled({ ...disabled, [card]: true });
      setRefresh(true);
    });
    saveTriggerSetting(
      crm === 'HUBSPOT'
        ? TRIGGER_MAPPING_NAMES.INBOUND__HUBSPOT
        : TRIGGER_MAPPING_NAMES.INBOUND__SALESFORCE,
      inboundTrigger.jsonConfig,
      crm,
      'INBOUND',
    );
  };

  return (
    <div className={styles._container}>
      {isActiveHubspotInbound && crm === CRM.HUBSPOT && (
        <SyncSettingsInboundHubspot
          inboundTrigger={inboundTrigger}
          crm={crm}
          disabled={disabled}
          save={saveTrigger}
          config={setConfig}
          fullSalesEnabled={isFullSalesEnabled}
        />
      )}
      {crm === CRM.SALESFORCE && (
        <SyncSettingsSalesforceInbound
          inboundTrigger={inboundTrigger}
          save={saveTrigger}
          onHandleConfig={setConfig}
          disabled={disabled}
          crm={crm}
          setDisabled={setDisabled}
        />
      )}
    </div>
  );
};
export default SyncSettingsTabInbound;
