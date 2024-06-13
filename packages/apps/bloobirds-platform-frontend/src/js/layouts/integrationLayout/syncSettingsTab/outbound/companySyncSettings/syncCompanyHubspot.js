import { Checkbox, Collapsible, Divider, Icon, MultiSelect, Text } from '@bloobirds-it/flamingo-ui';
import CheckBoxCard from '../../inbound/checkBoxCard/checkBoxCard';
import { CRM_DISPLAY_NAME } from '../../../../../constants/integrations';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './syncCompanyHubspot.module.css';

const SyncOutboundHubspotCompany = props => {
  const [disabled, setDisabled] = useState(!props.accountCompanyTrigger?.createCompanies);
  return (
    <>
      <CheckBoxCard
        text={`Create Companies from Bloobirds to ${CRM_DISPLAY_NAME.HUBSPOT} as Companies`}
        value={props.accountCompanyTrigger?.createCompanies}
        onChange={value => {
          props.onChangeCompanyCreation(value);
          setDisabled(!value);
        }}
        width="900px"
      />
      <div className={styles._children_multiselect}>
        <Text color={disabled ? 'softPeanut' : 'peanut'} size="m" weight="bold">
          Only create a company when company status is
        </Text>
        <Icon name="arrowRight" color="softPeanut" />
        {props.accountCompanyTrigger && (
          <MultiSelect
            disabled={disabled}
            value={props.accountCompanyTrigger.companyStatus}
            onChange={props.onChangeCompanyStatus}
            placeholder="Select company status"
            width="342px"
          >
            {props.mappedCompanyStatus}
          </MultiSelect>
        )}
      </div>
      <div className={styles._collapsible}>
        <Divider />
        <Collapsible
          color="peanut"
          title={
            <Text size="m" color={disabled ? 'softPeanut' : 'peanut'} inline>
              Advanced Settings
            </Text>
          }
          arrowPosition="right"
          disabled={disabled}
        >
          <div className={styles._small_checkbox}>
            <Checkbox
              expand
              onClick={props.onChangeAccountExecutive}
              size="small"
              defaultChecked={props.accountCompanyTrigger?.companyAccountExecutiveOwner}
            >
              When syncing a Bloobirds company to {CRM_DISPLAY_NAME.HUBSPOT}, assign it to the User
              stated by the value in Account Executive field
            </Checkbox>
          </div>
        </Collapsible>
      </div>
    </>
  );
};
export default SyncOutboundHubspotCompany;

SyncOutboundHubspotCompany.propTypes = {
  accountCompanyTrigger: PropTypes.any,
  accountLeadTrigger: PropTypes.any,
  disabled: PropTypes.shape({
    isDisabledSalesforceAccount: PropTypes.bool,
    isDisabledDeals: PropTypes.bool,
    isDisabledActivities: PropTypes.bool,
    isDisabledOpportunity: PropTypes.bool,
    isDisabledCompany: PropTypes.bool,
    isDisabledLead: PropTypes.bool,
  }),
  mappedLeadStatus: PropTypes.any,
  onChangeAccountExecutive: PropTypes.func,
  onChangeCompanyCreation: PropTypes.func,
  onChangeCompanyStatus: PropTypes.func,
};
