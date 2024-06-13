import {
  Checkbox,
  CheckItem,
  Collapsible,
  Divider,
  Icon,
  Item,
  MultiSelect,
  Select,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import styles from './syncLeadSyncSettings.module.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CRM, CRM_DISPLAY_NAME } from '../../../../../constants/integrations';
import classnames from 'classnames';

const LeadSyncSettings = ({
  accountLeadTrigger,
  accountTriggers,
  mappedLeadStatus,
  onChangeModel,
  onChangeLeadStatus,
  onClick,
  standardTriggers,
  value,
  crm,
  handleCheckBoxSync,
  handleSearchBySobject,
  searchBySobject,
  disableSobjectMultiSelect,
}) => {
  const isHubspot = crm === CRM.HUBSPOT;
  const [disabled, setDisabled] = useState(
    Object.prototype.hasOwnProperty.call(accountLeadTrigger || {}, 'createLeads') &&
      !accountLeadTrigger.createLeads,
  );
  const checkBoxClass = classnames(styles._checkBox, {
    [styles._checkBox_salesforce]: !isHubspot,
    [styles._checkBox_hubspot]: isHubspot,
  });
  return (
    <div className={styles._children_lead_container}>
      <div className={checkBoxClass}>
        <Checkbox
          defaultChecked={
            Object.prototype.hasOwnProperty.call(accountLeadTrigger || {}, 'createLeads') &&
            accountLeadTrigger?.createLeads
          }
          onClick={createLeadsValue => {
            setDisabled(!createLeadsValue);
            handleCheckBoxSync('createLeads', createLeadsValue);
          }}
          size="small"
          expand
        >
          Create leads from Bloobirds to {CRM_DISPLAY_NAME[crm]}
        </Checkbox>
      </div>

      {crm === CRM.SALESFORCE && (
        <>
          <div className={styles._multiselect_object_type}>
            <Text color={disabled ? 'softPeanut' : 'peanut'} size="s" weight="bold">
              When a Bloobirds lead is created or updated
            </Text>
            <Icon name="arrowRight" color="softPeanut" />
            {accountTriggers && standardTriggers && (
              <Select
                defaultValue={value}
                value={value}
                disabled={disabled}
                onChange={onChangeModel}
                width="300px"
                size="small"
                borderless={false}
              >
                <Item value="alwaysCreateLead">Create lead in Salesforce</Item>
                <Item value="alwaysCreateContact">Create contact in Salesforce</Item>
                <Item value="createLeadOrContact">
                  Create contact only if its company is in Salesforce, or else create lead
                </Item>
              </Select>
            )}
          </div>
          <div className={styles._children_text}>
            <Icon name="infoFilled" color="darkBloobirds" />
            <Text size="s" color="darkBloobirds">
              Deleting a lead in Bloobirds won&apos;t delete the corresponding lead/contact in
              Salesforce
            </Text>
          </div>
        </>
      )}

      {crm === CRM.HUBSPOT && (
        <>
          <div className={styles._divider}>
            <Divider />
          </div>
          <Collapsible
            color="peanut"
            title={
              <Text size="m" color={disabled ? 'softPeanut' : 'peanut'} inline>
                Advanced Settings
              </Text>
            }
            arrowPosition="right"
            disabled={disabled}
            className={styles._collapsible}
          >
            <div className={styles._children_multiselect}>
              <Text color={disabled ? 'softPeanut' : 'peanut'} size="m" weight="bold">
                {crm === CRM.SALESFORCE
                  ? 'Only create a lead/contact when lead status is'
                  : 'Only create a contact when lead status is'}
              </Text>
              <Icon name="arrowRight" color="softPeanut" />
              {accountLeadTrigger && (
                <MultiSelect
                  disabled={disabled}
                  value={accountLeadTrigger.leadStatus}
                  onChange={onChangeLeadStatus}
                  placeholder="Select a lead status"
                  width="500px"
                >
                  {mappedLeadStatus}
                </MultiSelect>
              )}
            </div>
            <div className={checkBoxClass}>
              <Checkbox
                checked={
                  !disabled &&
                  (accountLeadTrigger?.emailSync ||
                    !Object.prototype.hasOwnProperty.call(accountLeadTrigger || {}, 'emailSync'))
                }
                size="small"
                disabled={disabled}
                onClick={emailSyncValue => handleCheckBoxSync('emailSync', emailSyncValue)}
                expand
              >
                Only create a {CRM_DISPLAY_NAME.HUBSPOT} contact if the lead in Bloobirds has an
                email address.
              </Checkbox>
            </div>
            <div className={checkBoxClass}>
              <Checkbox
                checked={
                  !disabled &&
                  (accountLeadTrigger?.leadsWithCompany ||
                    !Object.prototype.hasOwnProperty.call(
                      accountLeadTrigger || {},
                      'leadsWithCompany',
                    ))
                }
                size="small"
                disabled={disabled}
                onClick={leadsWithCompanyValue =>
                  handleCheckBoxSync('leadsWithCompany', leadsWithCompanyValue)
                }
                expand
              >
                Only create a {CRM_DISPLAY_NAME.HUBSPOT} contact if the lead in Bloobirds is
                assigned to a company.
              </Checkbox>
            </div>

            <div className={checkBoxClass}>
              <Checkbox
                checked={!disabled && accountLeadTrigger?.leadAccountExecutiveOwner}
                disabled={disabled}
                onClick={accountExecutiveValue =>
                  handleCheckBoxSync('leadAccountExecutiveOwner', accountExecutiveValue)
                }
                expand
                size="small"
              >
                When syncing a Bloobirds lead to {CRM_DISPLAY_NAME[crm]} as a Lead, assign it to the
                User stated by the value in Account Executive field.
                <div className={styles._info}>
                  <Tooltip
                    title={`The Account Executive field must contain a list of emails from the USERS in ${CRM_DISPLAY_NAME[crm]} to be able to be matched with the CRM owners`}
                    trigger="hover"
                    position="top"
                  >
                    <Icon name="infoFilled" />
                  </Tooltip>
                </div>
              </Checkbox>
            </div>
          </Collapsible>
        </>
      )}

      {accountLeadTrigger && crm === CRM.SALESFORCE && (
        <>
          <Collapsible
            color="peanut"
            title={
              <Text size="m" color={disabled ? 'softPeanut' : 'peanut'} inline>
                Advanced Settings
              </Text>
            }
            arrowPosition="right"
            disabled={disabled}
            className={styles._collapsible}
          >
            <div className={styles._multiselect_object_type}>
              <Text color={disabled ? 'softPeanut' : 'peanut'} size="s" weight="bold">
                Only create a lead/contact when lead status is
              </Text>
              <Icon name="arrowRight" color="softPeanut" />
              {accountLeadTrigger && (
                <MultiSelect
                  disabled={disabled}
                  value={accountLeadTrigger.leadStatus}
                  onChange={onChangeLeadStatus}
                  placeholder="Select a lead status"
                  size="small"
                >
                  {mappedLeadStatus}
                </MultiSelect>
              )}
            </div>
            <div className={styles._sobject_type_container}>
              <div className={styles._children_lead_checkbox}>
                <Checkbox
                  checked={!disabled && accountLeadTrigger?.onlyCreateLeadWithCompany}
                  onClick={leadWithCompanyValue => {
                    handleCheckBoxSync('onlyCreateLeadWithCompany', leadWithCompanyValue);
                  }}
                  disabled={disabled}
                  expand
                  size="small"
                >
                  Send lead only if it has a company
                </Checkbox>
              </div>
              <div className={styles._children_lead_checkbox}>
                <Checkbox
                  checked={!disabled && accountLeadTrigger?.searchExistingLead}
                  onClick={onClick}
                  disabled={disabled}
                  expand
                  size="small"
                >
                  Search for leads and contacts by email before creating them in Salesforce
                </Checkbox>
              </div>
              <div className={styles._multiselect_object_type}>
                <Text
                  color={disableSobjectMultiSelect ? 'softPeanut' : 'peanut'}
                  size="s"
                  weight="bold"
                >
                  Search on Salesforce by:
                </Text>
                <Icon name="arrowRight" color="softPeanut" />
                {accountTriggers && standardTriggers && (
                  <MultiSelect
                    onChange={handleSearchBySobject}
                    disabled={disableSobjectMultiSelect}
                    value={searchBySobject}
                    width="288px"
                    size="small"
                  >
                    <CheckItem value="searchByLead">Lead (only not converted)</CheckItem>
                    <CheckItem value="searchByContact">Contact and Person Accounts</CheckItem>
                  </MultiSelect>
                )}
              </div>
            </div>
            <div className={styles._children_lead_checkbox}>
              <Checkbox
                checked={!disabled && accountLeadTrigger?.leadAccountExecutiveOwner}
                disabled={disabled}
                onClick={accountExecutiveValue =>
                  handleCheckBoxSync('leadAccountExecutiveOwner', accountExecutiveValue)
                }
                expand
                size="small"
              >
                When syncing a Bloobirds lead to {CRM_DISPLAY_NAME[crm]} as a Lead, assign it to the
                User stated by the value in Account Executive field.
                <div className={styles._info}>
                  <Tooltip
                    title={`The Account Executive field must contain a list of emails from the USERS in ${CRM_DISPLAY_NAME[crm]} to be able to be matched with the CRM owners`}
                    trigger="hover"
                    position="top"
                  >
                    <Icon name="infoFilled" />
                  </Tooltip>
                </div>
              </Checkbox>
            </div>
          </Collapsible>
        </>
      )}
    </div>
  );
};

export default LeadSyncSettings;

LeadSyncSettings.propTypes = {
  accountLeadTrigger: PropTypes.any,
  accountTriggers: PropTypes.any,
  mappedLeadStatus: PropTypes.any,
  onChange: PropTypes.func,
  onChange1: PropTypes.func,
  onClick: PropTypes.func,
  standardTriggers: PropTypes.any,
  value: PropTypes.any,
};
