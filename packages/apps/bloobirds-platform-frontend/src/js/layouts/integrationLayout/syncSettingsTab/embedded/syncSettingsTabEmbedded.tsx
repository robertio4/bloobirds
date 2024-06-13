import React, { useState } from 'react';

import { Checkbox, Item, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import useSWR, { mutate } from 'swr';

import {
  EmbeddedIntegrations1,
  EmbeddedIntegrations2,
  EmbeddedIntegrations3,
  EmbeddedIntegrations4,
  EmbeddedIntegrations5,
} from '../../../../../assets/svg';
import { useEntity } from '../../../../hooks';
import { api } from '../../../../utils/api';
import SyncSettingsCard from '../syncSettingsCard/syncSettingsCard';
import TextSelect from '../textSelect/textSelect';
import styles from './syncSettingsTabEmbedded.module.css';

export interface LeadConvertedStatus {
  Id: string;
  ApiName: string;
  MasterLabel: string;
}

const CampaignMemberCard = (props: {
  onSave: () => void;
  disabled: boolean;
  checked: boolean;
  onClick: (value: boolean) => void;
}) => (
  <SyncSettingsCard
    icon="personAdd"
    title="Campaign member updates"
    crm="SALESFORCE"
    onSave={props.onSave}
    isDisabled={props.disabled}
  >
    <div className={styles.container}>
      <Checkbox checked={props.checked} onClick={props.onClick} expand>
        <Text size="s">Enable campaign member status embedded integration</Text>
      </Checkbox>
      <div className={styles.steps}>
        <div className={styles.column}>
          <Text size="s" align="center">
            1 Sync your campaign members from Salesforce
          </Text>
          <EmbeddedIntegrations1 width={310} />
        </div>
        <div className={styles.column}>
          <Text size="s" align="center">
            2 Update your campaign member statuses based on different campaigns
          </Text>
          <EmbeddedIntegrations2 width={265} />
        </div>
        <div className={styles.column}>
          <Text size="s" align="center">
            3 Keep track of your campaign members from SDRs interactions
          </Text>
          <EmbeddedIntegrations3 width={165} />
        </div>
      </div>
    </div>
  </SyncSettingsCard>
);
const SalesforceConversionCard = (props: {
  onSave: () => void;
  disabled: boolean;
  checked: boolean;
  leadConversionStatus: string;
  handleLeadConversionStatus: (status: string) => void;
  onClick: (value: boolean) => void;
}) => {
  const { data, error } = useSWR(
    `/utils/service/salesforce/getLeadConvertedStatus`,
    async () =>
      await api
        .get(`/utils/service/salesforce/getLeadConvertedStatus`, {
          headers: { 'Content-Type': 'application/json' },
          data: {},
        })
        .then((res: any) => res.data),
  );
  return (
    <SyncSettingsCard
      icon="personUpdate"
      title="Conversion in Salesforce"
      crm="SALESFORCE"
      onSave={props.onSave}
      isDisabled={props.disabled}
    >
      <div className={styles.container}>
        <Checkbox checked={props.checked} onClick={props.onClick} expand>
          <Text size="s">Enable conversion in Salesforce embedded integration</Text>
        </Checkbox>
        <div className={styles.leadConvertedContainer}>
          <div className={styles.leadConvertedSteps}>
            <div className={styles.column}>
              <Text size="s" align="center">
                1 Select the leads you want to convert on Salesforce
              </Text>
              <EmbeddedIntegrations4 width={310} />
            </div>
            <div className={styles.column}>
              <Text size="s" align="center">
                2 Convert your Salesforce leads without leaving Bloobirds
              </Text>
              <EmbeddedIntegrations5 width={310} />
            </div>
          </div>
          <div className={styles.select}>
            <TextSelect
              text="Select a default Salesforce Converted Status"
              value={props.leadConversionStatus}
              onChange={value => props.handleLeadConversionStatus(value)}
              disabled={!props.checked}
              items={data?.map((leadStatus: LeadConvertedStatus) => (
                <Item key={leadStatus.Id} value={leadStatus.ApiName}>
                  {leadStatus.MasterLabel}
                </Item>
              ))}
            />
          </div>
        </div>
      </div>
    </SyncSettingsCard>
  );
};

const SyncSettingsTabEmbedded = () => {
  const { createToast } = useToasts();
  const inboundTriggerRepo = useEntity('accountIntegrationTriggers')?.all();
  const [disabledSave, setDisabledSave] = useState({
    campaignMember: true,
    leadConversion: true,
  });
  const reducedInboundTrigger = inboundTriggerRepo.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: { id: curr.id, jsonConfig: JSON.parse(curr.jsonConfig) },
    }),
    {},
  );
  const [checked, setChecked] = useState({
    campaignMember:
      reducedInboundTrigger?.INBOUND__SALESFORCE?.jsonConfig.campaignMemberStatusUpdate,
    leadConversion: reducedInboundTrigger?.INBOUND__SALESFORCE?.jsonConfig.convertLeads,
  });
  const [leadConversionStatus, setLeadConversionStatus] = useState(
    reducedInboundTrigger?.INBOUND__SALESFORCE?.jsonConfig.leadConvertedStatus,
  );
  const updateConfig = async (config: object) => {
    const trigger = reducedInboundTrigger?.INBOUND__SALESFORCE;
    await api
      .patch(`/entities/accountIntegrationTriggers/${trigger.id}`, {
        jsonConfig: JSON.stringify({ ...trigger.jsonConfig, ...config }),
      })
      .then(() => {
        mutate(`/entity/accountIntegrationTriggers`);
      });
  };
  return (
    <>
      <CampaignMemberCard
        onSave={() => {
          setDisabledSave({ ...disabledSave, campaignMember: true });
          updateConfig({ campaignMemberStatusUpdate: checked.campaignMember });
          createToast({
            type: 'success',
            message: 'Setting enabled successfully',
          });
        }}
        disabled={disabledSave.campaignMember}
        checked={checked.campaignMember}
        onClick={(value: boolean) => {
          setChecked({ ...checked, campaignMember: value });
          setDisabledSave({ ...disabledSave, campaignMember: false });
        }}
      />
      <SalesforceConversionCard
        onSave={() => {
          setDisabledSave({ ...disabledSave, leadConversion: true });
          updateConfig({
            convertLeads: checked.leadConversion,
            leadConvertedStatus: leadConversionStatus,
          });
          createToast({
            type: 'success',
            message: 'Setting enabled successfully',
          });
        }}
        disabled={disabledSave.leadConversion}
        checked={checked.leadConversion}
        leadConversionStatus={leadConversionStatus}
        handleLeadConversionStatus={setLeadConversionStatus}
        onClick={(value: boolean) => {
          setChecked({ ...checked, leadConversion: value });
          setDisabledSave({ ...disabledSave, leadConversion: false });
        }}
      />
    </>
  );
};
export default SyncSettingsTabEmbedded;
