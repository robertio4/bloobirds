import React, { useEffect, useMemo, useState } from 'react';

import { CheckItem, Icon, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import { useNoStatusOppSetting } from '@bloobirds-it/hooks';
import PropTypes from 'prop-types';
import useSWRImmutable from 'swr/immutable';
import { isArray } from 'xstate/es/utils';

import { CRM, CRM_DISPLAY_NAME } from '../../../../constants/integrations';
import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useSalesforceIntegration } from '../../../../hooks/useSalesforceIntegration';
import CheckBoxCard from '../inbound/checkBoxCard/checkBoxCard';
import SyncSettingsCard from '../syncSettingsCard/syncSettingsCard';
import SyncOutboundHubspotCompany from './companySyncSettings/syncCompanyHubspot';
import SyncCompanySettings from './companySyncSettings/syncCompanySettings';
import AccountSyncSettings from './syncAccountSettings/syncAccountSettings';
import ActivitiesSyncSettings from './syncActivitySettings/syncActitvitySettings';
import SyncDealsHubspot from './syncActivitySettings/syncDealsHubspot/syncDealsHubspot';
import LeadSyncSettings from './syncLeadSettings/syncLeadSettings';
import { SyncProductsCard } from './syncProductsCard/syncProductsCard';
import styles from './syncSettingsTabOutbound.module.css';

const SyncSettingsTabOutbound = ({
  handleSubmit,
  accountTriggers,
  standardTriggers,
  salesforceUsers,
  leadStatus,
  companyStatus,
  callResults,
  dealPipeline,
  triggerActivity,
  triggerLead,
  triggerCompany,
  activeIntegration,
  triggerMeeting,
  crm,
  disconnectIntegration,
  triggerOpportunity,
}) => {
  const [disabled, setDisabled] = useState({
    isDisabledLead: true,
    isDisabledActivities: true,
    isDisabledSalesforceAccount: true,
    isDisabledDeals: true,
    isDisabledCompany: true,
    isDisabledOpportunity: true,
  });
  const [activities, setActivities] = useState({
    calls: false,
    email: false,
    linkedin: false,
    notes: false,
    customTasks: false,
    meeting: false,
  });
  const isHubspot = crm === CRM.HUBSPOT;
  const isSalesforce = crm === CRM.SALESFORCE;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const hasSalesEnabled = useFullSalesEnabled();
  const [callDisabled, isCallDisabled] = useState(true);
  const [disabledCallOutPipelines, setDisabledCallOutPipelines] = useState(true);
  const [canRenderActivities, setCanRenderActivities] = useState(false);
  const [accountLeadTrigger, setAccountLeadTrigger] = useState(
    accountTriggers[standardTriggers[triggerLead]]?.jsonConfig,
  );
  const [accountCompanyTrigger, setAccountCompanyTrigger] = useState(
    accountTriggers[standardTriggers[triggerCompany]]?.jsonConfig,
  );
  const [accountActivityTrigger, setAccountActivityTrigger] = useState(
    accountTriggers[standardTriggers[triggerActivity]]?.jsonConfig,
  );
  const [accountMeetingTrigger, setAccountMeetingTrigger] = useState(
    isHubspot && accountTriggers[standardTriggers[triggerMeeting]]?.jsonConfig,
  );
  const [accountMeetingTriggerActive, setAccountMeetingTriggerActive] = useState(
    isHubspot && accountTriggers[standardTriggers[triggerMeeting]]?.active,
  );
  const [accountOpportunityTrigger, setAccountOpportunityTrigger] = useState(
    hasSalesEnabled && accountTriggers[standardTriggers[triggerOpportunity]]?.jsonConfig,
  );

  const [accountSetting, setAccountSetting] = useState(
    isHubspot ? activeIntegration?.apiKey : activeIntegration?.salesforceUser,
  );
  const { recordTypes } = useSalesforceIntegration();
  const isNoStatusOppActive = useNoStatusOppSetting();
  const [leadContactFlow, setLeadContactFlow] = useState(undefined);
  const [recordTypeId, setRecordTypeId] = useState(accountOpportunityTrigger?.defaultRecordTypeId);
  const { data: opportunityStages } = useSWRImmutable(
    accountOpportunityTrigger &&
      isNoStatusOppActive &&
      `/utils/service/salesforce/opportunityStages/${recordTypeId}`,
  );

  const [createOpp, setCreateOpp] = useState(accountOpportunityTrigger?.createOpportunity);
  const [searchBySobject, setSearchBySobject] = useState([]);
  const [disableSobjectMultiSelect, setDisableSobjectMultiSelect] = useState(
    !accountLeadTrigger?.searchExistingLead,
  );
  const integrationTriggerConfigs = useEntity('integrationTriggerConfigs');

  const mappedLeadStatus = useMemo(
    () =>
      leadStatus?.map(status => (
        <CheckItem key={status?.logicRole} value={status?.logicRole}>
          {status?.value}
        </CheckItem>
      )),
    [leadStatus],
  );

  const mappedCompanyStatus = useMemo(
    () =>
      companyStatus?.map(status => (
        <CheckItem key={status?.logicRole} value={status?.logicRole}>
          {status?.value}
        </CheckItem>
      )),
    [companyStatus],
  );
  const handleChangeLeadContactFlow = flow => {
    switch (flow) {
      case 'alwaysCreateLead':
        setAccountLeadTrigger({
          ...accountLeadTrigger,
          alwaysCreateLead: true,
          alwaysCreateContact: false,
        });
        break;
      case 'alwaysCreateContact':
        setAccountLeadTrigger({
          ...accountLeadTrigger,
          alwaysCreateContact: true,
          alwaysCreateLead: false,
        });
        break;
      case 'createLeadOrContact':
        setAccountLeadTrigger({
          ...accountLeadTrigger,
          alwaysCreateLead: false,
          alwaysCreateContact: false,
        });
        break;
      default:
        break;
    }
  };
  const handleCheckBoxSync = (config, value) => {
    setAccountLeadTrigger({
      ...accountLeadTrigger,
      [config]: value,
    });
    setDisabled({ ...disabled, isDisabledLead: false });
  };
  const handleSearchBySobject = value => {
    if (isArray(value)) {
      setAccountLeadTrigger({
        ...accountLeadTrigger,
        searchByContact: !!value.includes('searchByContact'),
        searchByLead: !!value.includes('searchByLead'),
      });
      setDisabled({ ...disabled, isDisabledLead: false });
      setSearchBySobject(value);
    }
  };
  const handleOpportunityCheckBoxSync = (config, value) => {
    setAccountOpportunityTrigger({
      ...accountOpportunityTrigger,
      [config]: value,
    });
    setDisabled({ ...disabled, isDisabledOpportunity: false });
  };

  useEffect(() => {
    if (accountLeadTrigger?.alwaysCreateLead) {
      setLeadContactFlow('alwaysCreateLead');
    } else if (accountLeadTrigger?.alwaysCreateContact) {
      setLeadContactFlow('alwaysCreateContact');
    } else if (!accountLeadTrigger?.alwaysCreateLead && !accountLeadTrigger?.alwaysCreateContact) {
      setLeadContactFlow('createLeadOrContact');
    }
  }, [accountLeadTrigger]);

  useEffect(() => {
    const sobjects = [];
    if (accountLeadTrigger?.searchByLead) {
      sobjects.push('searchByLead');
    }
    if (accountLeadTrigger?.searchByContact) {
      sobjects.push('searchByContact');
    }
    setSearchBySobject(sobjects);
  }, []);

  const handleCheckBoxSyncCompany = (config, value) => {
    setAccountCompanyTrigger({
      ...accountCompanyTrigger,
      [config]: value,
    });
    setDisabled({ ...disabled, isDisabledCompany: false });
  };

  useEffect(() => {
    let activityTypes = {
      calls: false,
      email: false,
      linkedin: false,
      notes: false,
      meeting: false,
    };
    accountActivityTrigger?.activityTypes?.map(type => {
      switch (type) {
        case 'ACTIVITY__TYPE__CALL':
          activityTypes = { ...activityTypes, calls: true };
          isCallDisabled(false);
          break;
        case 'ACTIVITY__TYPE__EMAIL':
          activityTypes = { ...activityTypes, email: true };
          break;
        case 'ACTIVITY__TYPE__NOTE':
          activityTypes = { ...activityTypes, notes: true };
          break;
        case 'ACTIVITY__TYPE__LINKEDIN_MESSAGE':
          activityTypes = { ...activityTypes, linkedin: true };
          break;
        case 'ACTIVITY__TYPE__CUSTOM_TASK':
          activityTypes = { ...activityTypes, customTasks: true };
          break;
        case 'ACTIVITY__TYPE__MEETING':
          activityTypes = { ...activityTypes, meeting: true };
          break;
        default:
          break;
      }
      return true;
    });
    setActivities(activityTypes);
    setCanRenderActivities(true);
  }, []);
  return (
    <div className={styles._container}>
      <SyncSettingsCard
        icon="personAdd"
        isDisabled={disabled?.isDisabledLead}
        onSave={() => {
          handleSubmit({ triggerLead: accountLeadTrigger });
          setDisabled({ ...disabled, isDisabledLead: true });
        }}
        title={isHubspot ? 'Creating contacts' : 'Creating leads / contacts'}
      >
        <LeadSyncSettings
          crm={crm}
          accountTriggers={accountTriggers}
          standardTriggers={standardTriggers}
          value={leadContactFlow}
          onChangeModel={model => {
            handleChangeLeadContactFlow(model);
            setDisabled({ ...disabled, isDisabledLead: false });
          }}
          accountLeadTrigger={accountLeadTrigger}
          onChangeLeadStatus={value => {
            setDisabled({ ...disabled, isDisabledLead: false });
            setAccountLeadTrigger({ ...accountLeadTrigger, leadStatus: value });
          }}
          mappedLeadStatus={mappedLeadStatus}
          onClick={() => {
            setAccountLeadTrigger({
              ...accountLeadTrigger,
              searchExistingLead: !accountLeadTrigger?.searchExistingLead,
            });
            setDisableSobjectMultiSelect(!!accountLeadTrigger?.searchExistingLead);
            setDisabled({ ...disabled, isDisabledLead: false });
          }}
          handleCheckBoxSync={handleCheckBoxSync}
          handleSearchBySobject={handleSearchBySobject}
          searchBySobject={searchBySobject}
          disableSobjectMultiSelect={disableSobjectMultiSelect}
        />
      </SyncSettingsCard>
      {crm === CRM.SALESFORCE && (
        <SyncSettingsCard
          icon="company"
          isDisabled={disabled?.isDisabledCompany}
          onSave={() => {
            handleSubmit({ triggerCompany: accountCompanyTrigger });
            setDisabled({ ...disabled, isDisabledCompany: true });
          }}
          title="Creating accounts"
        >
          <SyncCompanySettings
            crm={crm}
            accountCompanyTrigger={accountCompanyTrigger}
            mappedCompanyStatus={mappedCompanyStatus}
            onChangeCompanyStatus={value => {
              setDisabled({ ...disabled, isDisabledCompany: false });
              setAccountCompanyTrigger({ ...accountCompanyTrigger, companyStatus: value });
            }}
            handleCheckBoxSync={handleCheckBoxSyncCompany}
          />
        </SyncSettingsCard>
      )}

      <SyncSettingsCard
        icon="activity"
        title="Syncing activities"
        isDisabled={disabled?.isDisabledActivities}
        onSave={() => {
          setDisabledCallOutPipelines(true);
          setDisabled({ ...disabled, isDisabledActivities: true });
          handleSubmit({
            triggerLead: accountLeadTrigger,
            triggerActivities: accountActivityTrigger,
            triggerMeeting: {
              jsonConfig: accountMeetingTrigger,
              active: accountMeetingTriggerActive,
            },
          });
        }}
      >
        <ActivitiesSyncSettings
          crm={crm}
          canRenderActivities={canRenderActivities}
          activities={activities}
          callDisabled={callDisabled}
          accountLeadTrigger={accountLeadTrigger}
          accountActivityTrigger={accountActivityTrigger}
          accountMeetingTrigger={accountMeetingTrigger}
          callResults={callResults}
          dealPipeline={dealPipeline}
          handleAccountLead={setAccountLeadTrigger}
          handleAccountActivity={setAccountActivityTrigger}
          handleAccountMeeting={setAccountMeetingTrigger}
          handleDisabled={setDisabled}
          disabled={disabled}
          handleActivities={setActivities}
          handleCallDisabled={isCallDisabled}
          accountMeetingTriggerActive={accountMeetingTriggerActive}
          handleAccountMeetingTriggerActive={setAccountMeetingTriggerActive}
          disabledCallOutPipelines={disabledCallOutPipelines}
          setDisabledCallOutPipelines={setDisabledCallOutPipelines}
        />
      </SyncSettingsCard>
      {isHubspot && (
        <SyncSettingsCard
          onSave={() => {
            handleSubmit(
              hasSalesEnabled
                ? { triggerOpportunity: accountOpportunityTrigger }
                : {
                    triggerMeeting: {
                      jsonConfig: accountMeetingTrigger,
                      active: accountMeetingTriggerActive,
                    },
                  },
            );
            setDisabled({ ...disabled, isDisabledDeals: true });
          }}
          isDisabled={disabled?.isDisabledDeals}
          icon="fileOpportunity"
          title={hasSalesEnabled ? 'Syncing opportunities' : 'Deal auto creation'}
          crm={crm}
        >
          <div className={styles._deals_hubspot}>
            <SyncDealsHubspot
              accountMeetingTrigger={accountMeetingTrigger}
              handleMeetingTrigger={setAccountMeetingTrigger}
              dealPipeline={activeIntegration.pipeArray}
              disabled={disabled}
              handleDisabled={setDisabled}
              stages={activeIntegration?.dealPipelines}
              isMeeting={accountMeetingTriggerActive}
              accountOpportunityTrigger={accountOpportunityTrigger}
              handleOpportunityTrigger={setAccountOpportunityTrigger}
              meetingType={!hasSalesEnabled}
              disabledCallOutPipelines={disabledCallOutPipelines}
              setDisabledCallOutPipelines={setDisabledCallOutPipelines}
            />
          </div>
        </SyncSettingsCard>
      )}
      {isHubspot && (
        <SyncSettingsCard
          onSave={() => {
            handleSubmit({ triggerCompany: accountCompanyTrigger });
            setDisabled({ ...disabled, isDisabledCompany: true });
          }}
          isDisabled={disabled?.isDisabledCompany}
          icon="company"
          title="Creating companies"
          crm={crm}
        >
          <SyncOutboundHubspotCompany
            disabled={disabled}
            accountCompanyTrigger={accountCompanyTrigger}
            onChangeCompanyCreation={value => handleCheckBoxSyncCompany('createCompanies', value)}
            onChangeCompanyStatus={value => handleCheckBoxSyncCompany('companyStatus', value)}
            mappedCompanyStatus={mappedCompanyStatus}
            onChangeAccountExecutive={value =>
              handleCheckBoxSyncCompany('companyAccountExecutiveOwner', value)
            }
          />
        </SyncSettingsCard>
      )}
      {hasSalesEnabled && !isHubspot && (
        <SyncSettingsCard
          onSave={() => {
            handleSubmit({ triggerOpportunity: accountOpportunityTrigger });
            setDisabled({ ...disabled, isDisabledOpportunity: true });
          }}
          isDisabled={disabled?.isDisabledOpportunity}
          icon="fileOpportunity"
          title="Syncing Opportunities"
          crm={crm}
        >
          <CheckBoxCard
            text={`Create Opportunities from Bloobirds to ${CRM_DISPLAY_NAME[crm]} as Opportunities`}
            value={accountOpportunityTrigger?.createOpportunity}
            onChange={value => {
              setCreateOpp(value);
              handleOpportunityCheckBoxSync('createOpportunity', value);
            }}
            width="545px"
            size="small"
          />
          {isNoStatusOppActive && (
            <div className={styles._opportunity_children_multiselect_container}>
              <div className={styles._children_multiselect}>
                <Text
                  color={'peanut'}
                  size="s"
                  weight="bold"
                  className={styles._opportunity_children_multiselect_text}
                >
                  Select a default Record type:
                </Text>

                <Icon name="arrowRight" color="softPeanut" size="24" />
                {recordTypes && (
                  <div>
                    <Select
                      value={accountOpportunityTrigger?.defaultRecordTypeId}
                      onChange={value => {
                        setRecordTypeId(value);
                        handleOpportunityCheckBoxSync('defaultRecordTypeId', value);
                      }}
                      size="small"
                      borderless={false}
                      width="200px"
                      disabled={!createOpp}
                      placeholder="Default Record Type*"
                    >
                      {recordTypes?.map(recordType => (
                        <Item key={recordType.Id} value={recordType.Id}>
                          {recordType.Name}
                        </Item>
                      ))}
                    </Select>
                  </div>
                )}
              </div>
              <div className={styles._children_multiselect}>
                <Text color={'peanut'} size="s" weight="bold">
                  Select a default Opportunity stage:
                </Text>

                <Icon name="arrowRight" color="softPeanut" size="24" />
                {recordTypes && (
                  <div>
                    <Select
                      value={accountOpportunityTrigger?.defaultOppStage}
                      onChange={value => handleOpportunityCheckBoxSync('defaultOppStage', value)}
                      size="small"
                      borderless={false}
                      width="200px"
                      disabled={!createOpp || !opportunityStages}
                      placeholder="Default Opportunity Stage*"
                    >
                      {opportunityStages &&
                        opportunityStages?.map(oppStage => (
                          <Item key={oppStage.value} value={oppStage.value}>
                            {oppStage.label}
                          </Item>
                        ))}
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}
        </SyncSettingsCard>
      )}
      {hasSalesEnabled && (isSalesforce || isHubspot) && integrationTriggerConfigs && (
        <SyncProductsCard crm={crm} integrationTriggerConfigs={integrationTriggerConfigs} />
      )}
      <SyncSettingsCard
        onSave={() => {
          handleSubmit({ userEmail: accountSetting });
          setDisabled({ ...disabled, isDisabledSalesforceAccount: true });
        }}
        isDisabled={disabled?.isDisabledSalesforceAccount}
        icon="person"
        title={`${displayCrm} account`}
        email
        crm={crm}
        disconnectIntegration={disconnectIntegration}
      >
        <AccountSyncSettings
          crm={crm}
          activeIntegration={activeIntegration}
          mappedSalesforceUsers={salesforceUsers}
          defaultValue={accountSetting}
          handleDisabled={setDisabled}
          disabled={disabled}
          handleAccountSettings={setAccountSetting}
        />
      </SyncSettingsCard>
    </div>
  );
};
SyncSettingsTabOutbound.propTypes = {
  accountTriggers: PropTypes.object,
  handleSubmit: PropTypes.func,
  standardTriggers: PropTypes.object,
};
export default SyncSettingsTabOutbound;
