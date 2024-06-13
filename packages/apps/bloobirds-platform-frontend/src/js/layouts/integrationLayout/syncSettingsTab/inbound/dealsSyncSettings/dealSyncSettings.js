import React, { useEffect, useState } from 'react';
import TextSelect from '../../textSelect/textSelect';
import { usePicklistValues } from '../../../../../hooks';
import { CheckItem, Icon, Item, MultiSelect, Text } from '@bloobirds-it/flamingo-ui';
import { useHubspotIntegration } from '../../../../../hooks/useHubspotIntegration';
import { CRM, CRM_DISPLAY_NAME } from '../../../../../constants/integrations';
import styles from '../companySyncSettings/companySyncSettings.module.css';
import { api } from '@bloobirds-it/utils';

const DealSyncSettings = ({ inboundTriggerConfig, setConfig, crm }) => {
  const isHubspot = crm === CRM.HUBSPOT;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const opportunityString = `${displayCrm} ${isHubspot ? 'deal' : 'opportunity'}`;
  const bbStatuses = usePicklistValues({ picklistLogicRole: 'COMPANY__STATUS' });
  const { activeIntegration } = useHubspotIntegration();
  const [salesforceStageItems, setSalesforceStageItems] = useState();
  const crmOppStages = {
    companyStatusDealWon: isHubspot
      ? { value: inboundTriggerConfig.companyStatusDealWon, configName: 'companyStatusDealWon' }
      : { value: inboundTriggerConfig.companyStatusOppWon, configName: 'companyStatusOppWon' },
    companyStatusDealLost: isHubspot
      ? { value: inboundTriggerConfig.companyStatusDealLost, configName: 'companyStatusDealLost' }
      : { value: inboundTriggerConfig.companyStatusOppLost, configName: 'companyStatusOppLost' },
    companyAccountDealStage: isHubspot
      ? {
          value: inboundTriggerConfig.companyAccountDealStage,
          configName: 'companyAccountDealStage',
        }
      : {
          value: inboundTriggerConfig.companyAccountOppStage,
          configName: 'companyAccountOppStage',
        },
  };

  const meetingTriggerConfig = activeIntegration?.accountTriggers['MEETING__HUBSPOT']?.jsonConfig;

  const statusesItems =
    bbStatuses &&
    bbStatuses.map(status => (
      <Item key={status.id} value={status.logicRole}>
        {status.value}
      </Item>
    ));

  useEffect(() => {
    if (!isHubspot) {
      api
        .get('/utils/service/salesforce/metadata/Opportunity')
        .then(response => response?.data)
        .then(response => {
          setSalesforceStageItems(
            response.fields
              .filter(field => field.name === 'StageName')[0]
              .picklistValues.filter(stage => stage.active)
              .map(stage => (
                <CheckItem key={stage.label} label={stage.label} value={stage.value}>
                  {stage.label}
                </CheckItem>
              )),
          );
        });
    }
  }, []);

  const hubspotStageItems =
    isHubspot &&
    activeIntegration &&
    activeIntegration?.dealPipelines &&
    activeIntegration?.dealPipelines[meetingTriggerConfig?.dealPipeline]?.map(stage => (
      <Item key={stage.stageId} value={stage.stageId}>
        {stage.label}
      </Item>
    ));

  return (
    <div style={{ boxSizing: 'border-box', padding: '24px 245px 0 32px' }}>
      <TextSelect
        text={`When winning a ${opportunityString} (that was created via Bloobirds), the related company in Bloobirds changes its status to: `}
        value={crmOppStages.companyStatusDealWon.value}
        onChange={value => setConfig(crmOppStages.companyStatusDealWon.configName, value)}
        items={statusesItems}
        size="s"
      />
      <TextSelect
        text={`When losing a ${opportunityString} (that was created via Bloobirds), the related company in Bloobirds changes its status to: `}
        value={crmOppStages.companyStatusDealLost.value}
        onChange={value => setConfig(crmOppStages.companyStatusDealLost.configName, value)}
        items={statusesItems}
        size="s"
      />

      {!isHubspot && (
        <div className={styles._children_multiselect}>
          <Text color="peanut" size="s" weight="bold">
            {`The related company changes its status in Bloobirds to Account when a ${opportunityString} (that was created via Bloobirds), reaches the stage: `}
          </Text>
          <Icon name="arrowRight" color="softPeanut" size="24" />
          <MultiSelect
            onChange={value => setConfig(crmOppStages.companyAccountDealStage.configName, value)}
            value={crmOppStages.companyAccountDealStage.value}
            autocomplete
          >
            {salesforceStageItems}
          </MultiSelect>
        </div>
      )}
      {isHubspot && (
        <TextSelect
          text={`The related company changes its status in Bloobirds to Account when a ${opportunityString} (that was created via Bloobirds), reaches the stage: `}
          value={crmOppStages.companyAccountDealStage.value}
          onChange={value => setConfig(crmOppStages.companyAccountDealStage.configName, value)}
          items={isHubspot ? hubspotStageItems : salesforceStageItems}
        />
      )}
    </div>
  );
};

export default DealSyncSettings;
