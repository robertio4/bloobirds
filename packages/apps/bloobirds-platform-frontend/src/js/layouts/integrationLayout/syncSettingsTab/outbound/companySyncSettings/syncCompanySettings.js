import React, { useState } from 'react';

import { Checkbox, Collapsible, Icon, MultiSelect, Text } from '@bloobirds-it/flamingo-ui';

import { CRM, CRM_DISPLAY_NAME } from '../../../../../constants/integrations';
import styles from './syncCompanyHubspot.module.css';

const SyncCompanySettings = ({
  accountCompanyTrigger,
  mappedCompanyStatus,
  onChangeCompanyStatus,
  handleCheckBoxSync,
  crm,
}) => {
  const [disabled, setDisabled] = useState(
    accountCompanyTrigger &&
      !accountCompanyTrigger?.createAccount &&
      Object.prototype.hasOwnProperty.call(accountCompanyTrigger, 'createAccount'),
  );
  return (
    <div className={styles._children_company_container}>
      <div className={styles._checkBox}>
        <Checkbox
          defaultChecked={
            accountCompanyTrigger &&
            Object.prototype.hasOwnProperty.call(accountCompanyTrigger, 'createAccount') &&
            accountCompanyTrigger?.createAccount
          }
          onClick={createAccountValue => {
            setDisabled(!createAccountValue);
            handleCheckBoxSync('createAccount', createAccountValue);
          }}
          expand
          size="small"
        >
          Create Companies from Bloobirds to {CRM_DISPLAY_NAME[crm]} as Accounts
        </Checkbox>
      </div>
      <div className={styles._children_salesforce_multiselect}>
        <Text color="peanut" size="s" weight="bold">
          Only create an account when company status is
        </Text>
        <Icon name="arrowRight" color="softPeanut" />
        {accountCompanyTrigger && (
          <MultiSelect
            disabled={disabled}
            value={accountCompanyTrigger.companyStatus}
            onChange={onChangeCompanyStatus}
            placeholder="Select a company status"
            width="278px"
            size="small"
          >
            {mappedCompanyStatus}
          </MultiSelect>
        )}
      </div>
      {crm === CRM.SALESFORCE && (
        <Collapsible
          color="peanut"
          title={
            <Text size="m" color={disabled ? 'softPeanut' : 'peanut'} inline>
              Advanced Settings
            </Text>
          }
          arrowPosition="right"
          disabled={disabled}
          className={styles._collapsible_salesforce}
        >
          <div className={styles._checkBox}>
            <Checkbox
              checked={accountCompanyTrigger?.searchAccount}
              onClick={searchAccountValue => {
                handleCheckBoxSync('searchAccount', searchAccountValue);
              }}
              disabled={disabled}
              expand
            >
              Search companies by name before creating them in salesforce
            </Checkbox>
          </div>
        </Collapsible>
      )}
    </div>
  );
};

export default SyncCompanySettings;
