import React, { useEffect, useMemo, useState } from 'react';
import styles from './companySyncSettings.module.css';
import {
  Callout,
  Checkbox,
  Collapsible,
  Icon,
  Input,
  Item,
  Radio,
  RadioGroup,
  Select,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { CRM, CRM_DISPLAY_NAME } from '../../../../../constants/integrations';
import TextSelect from '../../textSelect/textSelect';

const CompanySyncSettings = ({ config, setConfig, crm, companyFields }) => {
  const defaultCrmOwnerId = crm === CRM.SALESFORCE ? 'OwnerId' : 'hubspot_owner_id';
  const isHubspot = crm === CRM.HUBSPOT;
  const isSalesforce = crm === CRM.SALESFORCE;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const [inputValue, setInputValue] = useState(config?.companyOwner);
  const [defaultCrmOwnerRadio, setDefaultCrmOwnerRadio] = useState(
    config?.companyOwner === defaultCrmOwnerId,
  );
  const [customCrmOwnerRadio, setCustomCrmOwnerRadio] = useState(
    config?.companyOwner !== defaultCrmOwnerId && config?.companyOwner !== '',
  );
  const [emptyCrmOwnerRadio, setEmptyCrmOwnerRadio] = useState(config?.companyOwner === '');
  const [disableInput, setDisableInput] = useState(config?.companyOwner === defaultCrmOwnerId);
  const [companySyncField, setCompanySyncField] = useState(
    config?.syncAccountField === '' ? 'noField' : config?.syncAccountField,
  );
  const [selectedSalesforceAccountField, setSelectedSalesforceAccountField] = useState(
    config?.syncAccountField,
  );
  const [disabled, setDisabled] = useState(
    (isSalesforce && !config?.createAccount) || (isHubspot && !config?.companyCreationEvent),
  );
  const [disabledAccountFieldSelect, setDisabledAccountFieldSelect] = useState(
    !config?.syncAccountField === '',
  );

  useEffect(() => {
    if (companySyncField === 'noField') {
      setDisabledAccountFieldSelect(true);
    } else {
      setDisabledAccountFieldSelect(false);
    }
  }, [companySyncField]);

  const handleConfig = value => {
    setConfig('companyOwner', value);
  };
  const crmCompanyFields = useMemo(
    () =>
      companyFields?.map(field => (
        <Item key={field.name} label={field.label} value={field.name}>
          {field.label}
        </Item>
      )),
    [companyFields],
  );
  const sfdcAccountItems = useMemo(
    () =>
      companyFields
        ?.filter(field => field.type.toLowerCase() === 'boolean')
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
    [companyFields],
  );
  const handleAccountSyncField = value => {
    const configValue = value === 'noField' ? '' : value;
    setSelectedSalesforceAccountField(configValue);
    setCompanySyncField(value);
    setConfig('syncAccountField', configValue);
  };
  const handleEmptyHubspotOwnerRadio = value => {
    if (value) {
      handleConfig('');
      setDisableInput(value);
    }
    setCustomCrmOwnerRadio(!value);
    setDefaultCrmOwnerRadio(!value);
    setEmptyCrmOwnerRadio(value);
  };
  const handleDefaultHubspotOwnerRadio = value => {
    if (value) {
      handleConfig(defaultCrmOwnerId);
      setDisableInput(value);
    }
    setCustomCrmOwnerRadio(!value);
    setEmptyCrmOwnerRadio(!value);
    setDefaultCrmOwnerRadio(value);
  };

  const handleCustomHubspotOwnerRadio = value => {
    if (value) {
      handleConfig(inputValue);
    }
    setDisableInput(!value);
    setDefaultCrmOwnerRadio(!value);
    setEmptyCrmOwnerRadio(!value);
    setCustomCrmOwnerRadio(value);
  };

  const handleInput = value => {
    setInputValue(value);
    handleConfig(value);
  };

  return (
    <div className={styles._container}>
      {isSalesforce && (
        <>
          <div className={styles._checkBox}>
            <Checkbox
              checked={config?.createAccount}
              onClick={value => {
                setConfig('createAccount', value);
                setDisabled(!value);
              }}
              expand
              size="small"
            >
              Create new accounts from Salesforce to Bloobirds as companies
            </Checkbox>
          </div>
          {config && (
            <div className={styles._radio_group}>
              <RadioGroup
                disabled={disabled}
                onChange={handleAccountSyncField}
                value={companySyncField}
              >
                <Radio size="small" value="noField">
                  Sync all accounts from Salesforce
                </Radio>
                <Radio size="small" value={selectedSalesforceAccountField}>
                  Sync accounts that have the following Salesforce field set to true
                </Radio>
              </RadioGroup>
              <div className={styles._text_select}>
                <TextSelect
                  value={selectedSalesforceAccountField}
                  items={sfdcAccountItems}
                  onChange={handleAccountSyncField}
                  disabled={disabled || disabledAccountFieldSelect}
                  weight="medium"
                  size="s"
                />
              </div>
            </div>
          )}
        </>
      )}
      {isHubspot && (
        <div className={styles._checkBox}>
          <Checkbox
            checked={config?.companyCreationEvent}
            onClick={value => {
              setConfig('companyCreationEvent', value);
              setDisabled(!value);
            }}
            expand
          >
            Create new companies from Hubspot
            <div className={styles._info}>
              <Tooltip
                title="If you enable this setting, from now on, only created Companies in Hubspot will be created on Bloobirds"
                trigger="hover"
                position="top"
              >
                <Icon name="infoFilled" />
              </Tooltip>
            </div>
          </Checkbox>
        </div>
      )}
      <Collapsible
        color="peanut"
        title={
          <Text size="m" color={disabled ? 'softPeanut' : 'peanut'} inline>
            Accounts advanced settings
          </Text>
        }
        disabled={disabled}
        arrowPosition="right"
        className={styles._collapsible}
      >
        <div className={styles._children_multiselect}>
          <Text color={disabled ? 'softPeanut' : 'peanut'} size="s" weight="bold">
            New companies are created in Bloobirds with the status:
          </Text>
          <Icon name="arrowRight" color="softPeanut" size="24" />
          <Select
            onChange={value => setConfig('companyStatus', value)}
            value={config?.companyStatus}
            disabled={disabled}
            width="254px"
            size="small"
            borderless={false}
          >
            <Item value={'COMPANY__STATUS__NEW'}>New</Item>
            <Item value={'COMPANY__STATUS__BACKLOG'}>Backlog</Item>
          </Select>
        </div>
        {isSalesforce && (
          <div className={styles._checkBox}>
            <Checkbox
              checked={config?.companiesMustHaveLeads}
              onClick={value => setConfig('companiesMustHaveLeads', value)}
              disabled={disabled}
              expand
              size="small"
            >
              {`Only sync ${displayCrm} companies to Bloobirds that have at least one lead assigned.`}
            </Checkbox>
          </div>
        )}
      </Collapsible>
    </div>
  );
};
export default CompanySyncSettings;
