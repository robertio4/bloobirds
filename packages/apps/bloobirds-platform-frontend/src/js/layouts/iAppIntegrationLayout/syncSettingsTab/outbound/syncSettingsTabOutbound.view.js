import React, { useEffect, useMemo, useState } from 'react';

import { CheckItem } from '@bloobirds-it/flamingo-ui';
import PropTypes from 'prop-types';
import { isArray } from 'xstate/es/utils';

import { CRM, CRM_DISPLAY_NAME } from '../../../../constants/integrations';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import SyncSettingsCard from '../syncSettingsCard/syncSettingsCard';
import AccountSyncSettings from './syncAccountSettings/syncAccountSettings';
import ActivitiesSyncSettings from './syncActivitySettings/syncActitvitySettings';
import SyncDealsHubspot from './syncActivitySettings/syncDealsHubspot/syncDealsHubspot';
import LeadSyncSettings from './syncLeadSettings/syncLeadSettings';
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
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const isSalesEnabled = useFullSalesEnabled();
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
    isSalesEnabled && accountTriggers[standardTriggers[triggerOpportunity]]?.jsonConfig,
  );

  const [accountSetting, setAccountSetting] = useState(
    isHubspot ? activeIntegration?.apiKey : activeIntegration?.salesforceUser,
  );

  const [leadContactFlow, setLeadContactFlow] = useState(undefined);
  const [searchBySobject, setSearchBySobject] = useState([]);
  const [disableSobjectMultiSelect, setDisableSobjectMultiSelect] = useState(
    !accountLeadTrigger?.searchExistingLead,
  );

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
        case 'ACTIVITY__TYPE__MEETING':
          activityTypes = { ...activityTypes, meeting: true };
          break;
        case 'ACTIVITY__TYPE__CUSTOM_TASK':
          activityTypes = { ...activityTypes, customTasks: true };
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
