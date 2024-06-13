import React, { useEffect, useState } from 'react';
import SyncSettingsCard from '../../../../syncSettingsCard/syncSettingsCard';
import {
  Callout,
  Checkbox,
  Collapsible,
  Divider,
  Icon,
  Item,
  Radio,
  RadioGroup,
  Text,
} from '@bloobirds-it/flamingo-ui';
import TextSelect from '../../../../textSelect/textSelect';
import styles from './syncOnlyContacts.module.css';
import { api } from '@bloobirds-it/utils';

const SyncOnlyContacts = props => {
  const { inboundTrigger, save, onHandleConfig, disabled, setDisabled } = props;
  const [leadCallout, setLeadCallout] = useState(false);
  const [salesforceContactFields, setSalesforceContactFields] = useState(undefined);
  const [salesforceLeadFields, setSalesforceLeadFields] = useState(undefined);
  const [syncCompanyFromLead, setSyncCompanyFromLead] = useState(
    inboundTrigger?.jsonConfig?.syncCompanyFromLead,
  );
  const [syncAccountFromLead, setSyncAccountFromLead] = useState(
    inboundTrigger?.jsonConfig?.syncAccountFromLead,
  );
  const [createLead, setCreateLead] = useState(inboundTrigger?.jsonConfig?.createLead);
  const [createContact, setCreateContact] = useState(inboundTrigger?.jsonConfig?.createContact);
  const [selectedSalesforceField, setSelectedSalesforceField] = useState(
    inboundTrigger?.jsonConfig?.syncContactsField === ''
      ? 'no list'
      : inboundTrigger?.jsonConfig?.syncContactsField,
  );
  const [selectedSalesforceLeadField, setSelectedSalesforceLeadField] = useState(
    inboundTrigger?.jsonConfig?.syncLeadsField === ''
      ? 'no list'
      : inboundTrigger?.jsonConfig?.syncLeadsField,
  );

  const [radioGroupValue, setRadioGroupValue] = useState(
    inboundTrigger?.jsonConfig?.syncContactsField,
  );

  const [radioGroupLeadValue, setRadioGroupLeadValue] = useState(
    inboundTrigger?.jsonConfig?.syncLeadsField,
  );

  const enableSave = (config, value) => {
    if (
      !(radioGroupValue === selectedSalesforceField && selectedSalesforceField === 'no list') ||
      value === ''
    ) {
      onHandleConfig(config, value);
    }
  };

  const handleSyncCompanyCheckbox = value => {
    setLeadCallout(value);
    enableSave('syncCompanyFromLead', value);
  };
  const handleSyncAccountCheckbox = value => {
    enableSave('syncAccountFromLead', value);
  };

  const handleAccountExecutiveCheckbox = value => {
    enableSave('leadAccountExecutiveOwner', value);
  };

  const handleChangeSelect = value => {
    setRadioGroupValue(value);
    setSelectedSalesforceField(value);
    onHandleConfig('syncContactsField', value);
  };
  const handleChangeRadio = value => {
    setRadioGroupValue(value);
    if (value === 'no list') {
      setDisabled({ ...disabled, leads: true });
    }
    if (value === '') {
      setSelectedSalesforceField('no list');
      enableSave('syncContactsField', value);
    }
  };
  const handleChangeSelectLead = value => {
    setRadioGroupLeadValue(value);
    setSelectedSalesforceLeadField(value);
    onHandleConfig('syncLeadsField', value);
  };
  const handleChangeCreateLeadCheckbox = value => {
    setCreateLead(value);
    enableSave('createLead', value);
  };
  const handleChangeCreateContactCheckbox = value => {
    setCreateContact(value);
    enableSave('createContact', value);
  };
  const handleChangeRadioLead = value => {
    setRadioGroupLeadValue(value);
    if (value === 'no list') {
      setDisabled({ ...disabled, leads: true });
    }
    if (value === '') {
      setSelectedSalesforceLeadField('no list');
      enableSave('syncLeadsField', value);
    }
  };

  useEffect(() => {
    if (salesforceLeadFields === undefined) {
      api
        .get('/utils/service/salesforce/metadata/lead')
        .then(response => response?.data)
        .then(response =>
          setSalesforceLeadFields(
            response.fields
              .filter(field => field.type.toLowerCase() === 'boolean')
              .sort((a, b) => (a.label > b.label ? 1 : -1))
              .reduce(
                (acc, curr) => [
                  ...acc,
                  <Item value={curr.name} label={curr.label} key={curr.name}>
                    {curr.label}
                  </Item>,
                ],
                [],
              ),
          ),
        );
    }
    if (salesforceContactFields === undefined) {
      api
        .get('/utils/service/salesforce/metadata/contact')
        .then(response => response?.data)
        .then(response =>
          setSalesforceContactFields(
            response.fields
              .filter(field => field.type.toLowerCase() === 'boolean')
              .sort((a, b) => (a.label > b.label ? 1 : -1))
              .reduce(
                (acc, curr) => [
                  ...acc,
                  <Item value={curr.name} label={curr.label} key={curr.name}>
                    {curr.label}
                  </Item>,
                ],
                [],
              ),
          ),
        );
    }
  }, []);

  return (
    <SyncSettingsCard
      title={'Creating Leads'}
      icon={'personAdd'}
      crm={'Salesforce'}
      onSave={() => {
        save('leads');
        setLeadCallout(false);
      }}
      isDisabled={disabled.leads}
    >
      <div className={styles._container}>
        <div>
          <div className={styles._section_title}>
            <Text size="m" weight="bold">
              Sync Salesforce leads:
            </Text>
          </div>
          <div className={styles._first_checkbox}>
            <Checkbox
              defaultChecked={createLead}
              onClick={handleChangeCreateLeadCheckbox}
              expand
              size="small"
            >
              Create new leads from Salesforce to Bloobirds as leads
            </Checkbox>
          </div>
          <div className={styles._radio_group}>
            <RadioGroup value={radioGroupLeadValue} onChange={handleChangeRadioLead}>
              <Radio size="small" value="">
                Sync all leads from Salesforce
              </Radio>
              <Radio size="small" value={selectedSalesforceLeadField}>
                Sync leads that have the following Salesforce field set to true
              </Radio>
            </RadioGroup>
            <div className={styles._text_select}>
              <TextSelect
                value={selectedSalesforceLeadField}
                onChange={handleChangeSelectLead}
                items={salesforceLeadFields}
                weight="medium"
                size="s"
              />
            </div>
          </div>
          <Collapsible
            color="peanut"
            title={
              <Text size="m" color={!createLead ? 'softPeanut' : 'peanut'} inline>
                Lead advanced Settings
              </Text>
            }
            arrowPosition="right"
            disabled={!createLead}
            className={styles._collapsible}
          >
            <div className={styles._checkbox}>
              <Checkbox
                defaultChecked={inboundTrigger?.jsonConfig?.leadAccountExecutiveOwner}
                onClick={handleAccountExecutiveCheckbox}
                expand
              >
                When syncing a Salesforce lead to Bloobirds, update the Account Executive picklist
                value according to the Owner in Salesforce.
              </Checkbox>
            </div>
            <div className={styles._lead_activity_check_box}>
              <Checkbox
                defaultChecked={syncCompanyFromLead}
                disabled={syncAccountFromLead}
                onClick={value => {
                  setSyncCompanyFromLead(value);
                  handleSyncCompanyCheckbox(value);
                }}
                expand
              >
                When syncing a Salesforce lead, automatically create a company for it in Bloobirds
                if it does not exist already
              </Checkbox>
              {leadCallout && (
                <div className={styles._callout}>
                  <Callout width="100%" variant="alert">
                    <Text size="m" inline>
                      {' '}
                      <span role="img" aria-labelledby="hand-right">
                        👉
                      </span>
                      A new Bloobirds company will only be created if the Salesforce lead contains a
                      company name. To define information sync between Salesforce leads and
                      Bloobirds companies navigate to Mappings{' '}
                      <Icon name={'arrowRight'} color="peanut" size="16px" /> Lead - Company
                      mapping.
                    </Text>
                  </Callout>
                </div>
              )}
            </div>
            <div className={styles._checkbox}>
              <Checkbox
                defaultChecked={inboundTrigger?.jsonConfig?.syncAccountFromLead}
                disabled={syncCompanyFromLead}
                onClick={value => {
                  setSyncAccountFromLead(value);
                  handleSyncAccountCheckbox(value);
                }}
                expand
              >
                When syncing a Salesforce lead to Bloobirds, if it is related to an Account on
                Salesforce, create it as a company.
              </Checkbox>
            </div>
          </Collapsible>
          <div className={styles._section_title_contacts}>
            <Text size="m" weight="bold">
              Sync Salesforce contacts:
            </Text>
          </div>
          <div className={styles._second_checkbox}>
            <Checkbox
              defaultChecked={createContact}
              onClick={handleChangeCreateContactCheckbox}
              expand
              size="small"
            >
              Create new contacts from Salesforce to Bloobirds as leads
            </Checkbox>
          </div>
        </div>
        <div className={styles._radio_group}>
          <RadioGroup value={radioGroupValue} onChange={handleChangeRadio}>
            <Radio size="small" value="">
              Sync all contacts from Salesforce
            </Radio>
            <Radio size="small" value={selectedSalesforceField}>
              Sync contacts that have the following Salesforce field set to true
            </Radio>
          </RadioGroup>
          <div className={styles._text_select}>
            <TextSelect
              value={selectedSalesforceField}
              onChange={handleChangeSelect}
              items={salesforceContactFields}
              weight={'medium'}
              size={'s'}
            />
          </div>
        </div>
        <Collapsible
          color="peanut"
          title={
            <Text size="m" color={!createContact ? 'softPeanut' : 'peanut'} inline>
              Contact advanced Settings
            </Text>
          }
          arrowPosition="right"
          disabled={!createContact}
          className={styles._collapsible}
        >
          <div className={styles._lead_activity_check_box}>
            <Checkbox
              defaultChecked={inboundTrigger?.jsonConfig?.syncCompanyFromContact}
              onClick={value => enableSave('syncCompanyFromContact', value)}
              expand
              size="small"
            >
              When syncing a Salesforce contact, automatically sync also the account as a company to
              Bloobirds
            </Checkbox>
          </div>
        </Collapsible>
        <div className={styles._divider}>
          <Divider />
        </div>
        <Collapsible
          color="peanut"
          title={
            <Text size="m" color={'peanut'} inline>
              General Advanced Settings
            </Text>
          }
          arrowPosition="right"
        >
          <div className={styles._lead_activity_check_box}>
            <Text size={'m'} weight={'bold'} color={'peanut'}>
              Activity related:
            </Text>
            <Checkbox
              defaultChecked={inboundTrigger?.jsonConfig?.syncLeadActivity}
              onClick={value => enableSave('syncLeadActivity', value)}
              expand
            >
              Bring related activity from lead or contact from Salesforce
            </Checkbox>
          </div>
          <div className={styles._divider}>
            <Divider />
          </div>
          <div className={styles._checkBox_small}>
            <Text color="peanut" size="m" weight="bold">
              New Bloobirds leads are created with the following properties when synced from
              Salesforce:
            </Text>
            <Text color="softPeanut" size="m">
              If the lead is created without a company in Bloobirds
            </Text>
            <Checkbox
              size="small"
              onClick={value => enableSave('leadMql', value)}
              defaultChecked={inboundTrigger.jsonConfig?.leadMql}
            >
              MQL accepted
            </Checkbox>
            <Checkbox
              size="small"
              onClick={value => enableSave('leadSal', value)}
              defaultChecked={inboundTrigger.jsonConfig?.leadSal}
            >
              SAL accepted
            </Checkbox>
            <Text color="softPeanut" size="m">
              If the lead is assigned to a company in Bloobirds
            </Text>
            <Checkbox
              size="small"
              onClick={value => enableSave('leadCompanyMql', value)}
              defaultChecked={inboundTrigger.jsonConfig?.leadCompanyMql}
            >
              MQL accepted
            </Checkbox>
            <Checkbox
              size="small"
              onClick={value => enableSave('leadCompanySal', value)}
              defaultChecked={inboundTrigger.jsonConfig?.leadCompanySal}
            >
              SAL accepted
            </Checkbox>
          </div>
        </Collapsible>
      </div>
    </SyncSettingsCard>
  );
};
export default SyncOnlyContacts;
