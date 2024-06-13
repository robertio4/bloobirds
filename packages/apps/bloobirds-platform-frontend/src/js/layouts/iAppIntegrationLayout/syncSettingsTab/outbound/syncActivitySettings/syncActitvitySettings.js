import React, { useState } from 'react';

import {
  Callout,
  Checkbox,
  CheckItem,
  Collapsible,
  Icon,
  MultiSelect,
  Text,
} from '@bloobirds-it/flamingo-ui';
import PropTypes from 'prop-types';

import { CRM, CRM_DISPLAY_NAME } from '../../../../../constants/integrations';
import { useHubspotIntegration } from '../../../../../hooks/useHubspotIntegration';
import styles from '../syncSettingsTabOutbound.module.css';
import SyncDealsHubspot from './syncDealsHubspot/syncDealsHubspot';

const ActivitiesSyncSettings = ({
  callResults,
  dealPipeline,
  accountLeadTrigger,
  accountMeetingTrigger,
  activities,
  callDisabled,
  canRenderActivities,
  crm,
  disabled,
  handleAccountActivity,
  handleAccountLead,
  handleAccountMeeting,
  handleDisabled,
  accountActivityTrigger,
  handleActivities,
  handleCallDisabled,
  accountMeetingTriggerActive,
  handleAccountMeetingTriggerActive,
  accountOpportunityTrigger,
  handleAccountOpportunityTrigger,
  disabledCallOutPipelines,
  setDisabledCallOutPipelines,
}) => {
  const isHubspot = crm === CRM.HUBSPOT;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const { activeIntegration } = useHubspotIntegration();
  const [disableCallOut, setDisableCallOut] = useState(!accountMeetingTrigger.sendMeetingType);
  const setActivityType = (value, activityLogicRole) => {
    if (value) {
      handleAccountActivity({
        ...accountActivityTrigger,
        activityTypes: [...accountActivityTrigger.activityTypes, activityLogicRole],
      });
      handleAccountLead({
        ...accountLeadTrigger,
        activityTypes: [...accountActivityTrigger.activityTypes, activityLogicRole],
      });
    } else {
      accountActivityTrigger.activityTypes.map((activityType, index) => {
        if (activityType === activityLogicRole) {
          return accountActivityTrigger.activityTypes.splice(index, 1);
        }
        return true;
      });
      handleAccountActivity({
        ...accountActivityTrigger,
        activityTypes: accountActivityTrigger.activityTypes,
      });
      handleAccountLead({
        ...accountLeadTrigger,
        activityTypes: accountActivityTrigger.activityTypes,
      });
    }
  };
  const handleChangeActivityTypes = (value, type) => {
    switch (type) {
      case 'CALL':
        handleActivities({ ...activities, calls: value });
        handleCallDisabled(!callDisabled);
        setActivityType(value, 'ACTIVITY__TYPE__CALL');
        break;
      case 'EMAIL':
        handleActivities({ ...activities, email: value });
        setActivityType(value, 'ACTIVITY__TYPE__EMAIL');
        break;
      case 'NOTE':
        handleActivities({ ...activities, notes: value });
        setActivityType(value, 'ACTIVITY__TYPE__NOTE');
        break;
      case 'LINKEDIN_MESSAGE':
        handleActivities({ ...activities, linkedin: value });
        setActivityType(value, 'ACTIVITY__TYPE__LINKEDIN_MESSAGE');
        break;
      case 'CUSTOM_TASKS':
        handleActivities({ ...activities, customTasks: value });
        setActivityType(value, 'ACTIVITY__TYPE__CUSTOM_TASK');
        break;
      default:
        break;
    }
    handleDisabled({ ...disabled, isDisabledActivities: false });
  };

  return (
    <div className={styles.children_activities_container}>
      <div className={styles._children_small_checkbox}>
        <Text color="peanut" size="m" weight="bold">
          Send the following activities to {displayCrm}:
        </Text>
        {canRenderActivities && (
          <>
            <Checkbox
              size="small"
              defaultChecked={activities.calls}
              onClick={value => handleChangeActivityTypes(value, 'CALL')}
            >
              Calls
            </Checkbox>
            <Checkbox
              size="small"
              defaultChecked={activities.email}
              onClick={value => handleChangeActivityTypes(value, 'EMAIL')}
            >
              Emails
            </Checkbox>
            <Checkbox
              size="small"
              defaultChecked={activities.linkedin}
              onClick={value => handleChangeActivityTypes(value, 'LINKEDIN_MESSAGE')}
            >
              {isHubspot
                ? 'LinkedIn messages (created in Hubspot as activities of type Email)'
                : 'LinkedIn messages'}
            </Checkbox>
            <Checkbox
              size="small"
              defaultChecked={activities.notes}
              onClick={value => handleChangeActivityTypes(value, 'NOTE')}
            >
              Notes
            </Checkbox>
            {!isHubspot && (
              <Checkbox
                size="small"
                defaultChecked={activities.customTasks}
                onClick={value => handleChangeActivityTypes(value, 'CUSTOM_TASKS')}
              >
                Custom tasks
              </Checkbox>
            )}
            {isHubspot && (
              <Checkbox
                size="small"
                defaultChecked={accountMeetingTriggerActive}
                onClick={value => {
                  handleDisabled({ ...disabled, isDisabledActivities: false });
                  handleAccountMeetingTriggerActive(value);
                }}
              >
                Meetings
              </Checkbox>
            )}
          </>
        )}
      </div>
      <div className={isHubspot && styles._children_multiselect_container}>
        <div className={styles._collapsible}>
          <Collapsible
            color="peanut"
            title={
              <Text size="m" color="peanut" inline>
                Advanced Settings
              </Text>
            }
            arrowPosition="right"
          >
            <div className={styles._children_multiselect}>
              <Text color={callDisabled ? 'softPeanut' : 'peanut'} size="m">
                Only send calls with the following call results
              </Text>
              <Icon name="arrowRight" color="softPeanut" size="24" />
              {accountLeadTrigger && (
                <MultiSelect
                  disabled={callDisabled}
                  onChange={value => {
                    handleDisabled({ ...disabled, isDisabledActivities: false });
                    handleAccountLead(
                      isHubspot
                        ? {
                            ...accountLeadTrigger,
                            hubspotCallResults: value,
                          }
                        : {
                            ...accountLeadTrigger,
                            salesforceCallResults: value,
                          },
                    );
                    handleAccountActivity(
                      isHubspot
                        ? { ...accountActivityTrigger, hubspotCallResults: value }
                        : {
                            ...accountActivityTrigger,
                            salesforceCallResults: value,
                          },
                    );
                  }}
                  defaultValue={
                    isHubspot
                      ? accountLeadTrigger.hubspotCallResults
                      : accountLeadTrigger.salesforceCallResults
                  }
                >
                  <CheckItem value={'ACTIVITY__CALL_RESULT__WITHOUT_CALL_RESULT'}>
                    Without Call result
                  </CheckItem>
                  {Object.entries(callResults)?.map(callResult => (
                    <CheckItem key={callResult[1].logicRole} value={callResult[1].logicRole}>
                      {callResult[0]}
                    </CheckItem>
                  ))}
                </MultiSelect>
              )}
            </div>
            {accountLeadTrigger && (
              <>
                <div className={isHubspot && styles._children_medium_checkbox_container}>
                  <div className={styles._children_medium_checkbox}>
                    <Checkbox
                      size="small"
                      defaultChecked={accountLeadTrigger.mustHaveCallRecording}
                      disabled={callDisabled}
                      onClick={() => {
                        handleAccountLead({
                          ...accountLeadTrigger,
                          mustHaveCallRecording: !accountLeadTrigger.mustHaveCallRecording,
                        });
                        handleAccountActivity({
                          ...accountActivityTrigger,
                          mustHaveCallRecording: !accountActivityTrigger.mustHaveCallRecording,
                        });
                        handleDisabled({ ...disabled, isDisabledActivities: false });
                      }}
                      expand
                    >
                      Only send calls when they have a recording included
                    </Checkbox>
                    {!isHubspot && (
                      <Checkbox
                        size="small"
                        defaultChecked={accountLeadTrigger.addCallRecording === true}
                        disabled={callDisabled}
                        onClick={() => {
                          handleAccountLead({
                            ...accountLeadTrigger,
                            addCallRecording: !accountLeadTrigger.addCallRecording,
                          });
                          handleAccountActivity({
                            ...accountActivityTrigger,
                            addCallRecording: !accountActivityTrigger.addCallRecording,
                          });
                          handleDisabled({ ...disabled, isDisabledActivities: false });
                        }}
                        expand
                      >
                        Include the associated call recording within the call recording description
                      </Checkbox>
                    )}
                    {isHubspot && (
                      <>
                        <Checkbox
                          size="small"
                          defaultChecked={accountMeetingTrigger.sendMeetingType}
                          expand
                          disabled={!accountMeetingTriggerActive}
                          onClick={value => {
                            handleDisabled({ ...disabled, isDisabledActivities: false });
                            handleAccountMeeting({
                              ...accountMeetingTrigger,
                              sendMeetingType: value,
                            });
                            setDisableCallOut(!disableCallOut);
                          }}
                        >
                          Include Meeting Type when sending meetings to Hubspot
                        </Checkbox>
                        {!disableCallOut && accountMeetingTriggerActive && (
                          <Callout variant="alert" width="626px">
                            <span role="img" aria-label="icon-label">
                              👉
                            </span>
                            When including the Meeting Type,{' '}
                            <b>
                              you need to ensure that the Deal type in Hubspot is exactly the same
                              as in Bloobirds, otherwise the Deal won&apos;t be created in Hubspot.
                            </b>
                          </Callout>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </Collapsible>
        </div>
      </div>
    </div>
  );
};
export default ActivitiesSyncSettings;

ActivitiesSyncSettings.propTypes = {
  accountLeadTrigger: PropTypes.any,
  activities: PropTypes.shape({
    calls: PropTypes.bool,
    email: PropTypes.bool,
    linkedin: PropTypes.bool,
    notes: PropTypes.bool,
  }),
  callDisabled: PropTypes.bool,
  canRenderActivities: PropTypes.bool,
};
