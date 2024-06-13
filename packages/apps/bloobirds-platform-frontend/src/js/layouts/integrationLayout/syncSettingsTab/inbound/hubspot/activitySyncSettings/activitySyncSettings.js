import React, { useState } from 'react';

import { Checkbox, Icon, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import { mutate } from 'swr';

import { ACTIVITY_TYPES } from '../../../../../../constants/activity';
import { CRM, CRM_DISPLAY_NAME } from '../../../../../../constants/integrations';
import { useEntity } from '../../../../../../hooks';
import { api } from '../../../../../../utils/api';
import SyncSettingsCard from '../../../syncSettingsCard/syncSettingsCard';
import styles from './activitySyncSettings.module.css';

const ActivitySelect = ({ activityType, onChange, value, disabled }) => (
  <div className={styles._activity_select_container}>
    <Icon name="arrowRight" color="softPeanut" size="24" />
    <Select width="242px" onChange={onChange} value={value} disabled={disabled}>
      <Item value>All</Item>
      <Item value={false}>{`Sync only ${activityType} activities created from Bloobirds.`}</Item>
    </Select>
  </div>
);

const ActivitySyncSettings = ({ config, setConfig, save, crm }) => {
  const isHubspot = crm === CRM.HUBSPOT;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const [disabled, setDisabled] = useState(true);
  const [subscriptionsToUpdate, setSubscriptionsToUpdate] = useState({});

  const subscriptions = useEntity('hubspotSubscriptions')
    ?.all()
    .reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {});

  const crmSubs = {
    call: isHubspot
      ? subscriptions?.HUBSPOT__CALL_SYNC?.active
      : config?.syncActivityTypes?.find(type => type === ACTIVITY_TYPES.CALL.toUpperCase()),
    email: isHubspot
      ? subscriptions?.HUBSPOT__EMAIL_SYNC?.active
      : config?.syncActivityTypes?.find(type => type === ACTIVITY_TYPES.EMAIL.toUpperCase()),
    note: subscriptions?.HUBSPOT__NOTE_SYNC?.active,
    meeting: isHubspot
      ? subscriptions?.HUBSPOT__MEETING_SYNC?.active
      : config?.syncActivityTypes?.find(type => type === ACTIVITY_TYPES.MEETING.toUpperCase()),
  };

  const hasLoaded = !Object.values(crmSubs).some(x => x === undefined);
  const [disableEngagementSelects, setDisableEngagementSelects] = useState(
    hasLoaded && {
      HUBSPOT__CALL_SYNC: !crmSubs?.call,
      HUBSPOT__EMAIL_SYNC: !crmSubs?.email,
      HUBSPOT__NOTE_SYNC: !crmSubs?.note,
      HUBSPOT__MEETING_SYNC: !crmSubs?.meeting,
    },
  );

  const handleConfig = (newConfig, value) => {
    setConfig(newConfig, value);
    setDisabled(false);
  };

  const handleOnClickSalesforceActivities = (type, value) => {
    value
      ? (config.syncActivityTypes = [...config.syncActivityTypes, type])
      : config.syncActivityTypes.splice(config.syncActivityTypes.indexOf(type), 1);

    handleConfig('syncActivityTypes', config.syncActivityTypes);
  };

  const handleOnClickHubspotActivities = (subscriptionName, value) => {
    setSubscriptionsToUpdate({ ...subscriptionsToUpdate, [subscriptionName]: value });
    setDisableEngagementSelects({
      ...disableEngagementSelects,
      [subscriptionName]: !value,
    });
    setDisabled(false);
  };

  const handleSave = () => {
    if (isHubspot) {
      Object.entries(subscriptionsToUpdate).forEach(([subscriptionName, value], index) => {
        api
          .patch(`/entities/hubspotSubscriptions/${subscriptions[subscriptionName]?.id}`, {
            active: value,
          })
          .then(() => {
            if (index === Object.entries(subscriptionsToUpdate).length - 1) {
              mutate('/entity/hubspotSubscriptions');
            }
          });
      });
    }
    save();
    setSubscriptionsToUpdate({});
    setDisabled(true);
  };

  return (
    <>
      <SyncSettingsCard
        icon="activity"
        title="Syncing Activities"
        onSave={() => handleSave()}
        isDisabled={disabled}
      >
        {subscriptions && (
          <div className={styles._container}>
            <Text color="peanut" size="m" weight="bold">
              Sync activities from {displayCrm}:
            </Text>
            <div className={styles._checkbox_container}>
              <Checkbox
                size="small"
                defaultChecked={crmSubs.call}
                onClick={value =>
                  isHubspot
                    ? handleOnClickHubspotActivities('HUBSPOT__CALL_SYNC', value)
                    : handleOnClickSalesforceActivities(ACTIVITY_TYPES.CALL.toUpperCase(), value)
                }
                expand
              >
                Calls
              </Checkbox>
              {isHubspot && (
                <ActivitySelect
                  onChange={value => handleConfig('createCalls', value)}
                  activityType="call"
                  value={config.createCalls}
                  disabled={disableEngagementSelects.HUBSPOT__CALL_SYNC}
                />
              )}
            </div>
            <div className={styles._checkbox_container}>
              <Checkbox
                size="small"
                defaultChecked={crmSubs.email}
                onClick={value =>
                  isHubspot
                    ? handleOnClickHubspotActivities('HUBSPOT__EMAIL_SYNC', value)
                    : handleOnClickSalesforceActivities(ACTIVITY_TYPES.EMAIL.toUpperCase(), value)
                }
              >
                Emails
              </Checkbox>
              {isHubspot && (
                <ActivitySelect
                  onChange={value => handleConfig('createEmails', value)}
                  activityType="email"
                  value={config.createEmails}
                  disabled={disableEngagementSelects.HUBSPOT__EMAIL_SYNC}
                />
              )}
            </div>
            {isHubspot && (
              <div className={styles._checkbox_container}>
                <Checkbox
                  size="small"
                  defaultChecked={subscriptions?.HUBSPOT__NOTE_SYNC.active}
                  onClick={value => handleOnClickHubspotActivities('HUBSPOT__NOTE_SYNC', value)}
                >
                  Notes
                </Checkbox>
                <ActivitySelect
                  onChange={value => {
                    handleConfig('createNotes', value);
                  }}
                  activityType="note"
                  value={config.createNotes}
                  disabled={disableEngagementSelects.HUBSPOT__NOTE_SYNC}
                />
              </div>
            )}
            <div className={styles._checkbox_container}>
              <Checkbox
                size="small"
                defaultChecked={crmSubs.meeting}
                onClick={value => {
                  isHubspot
                    ? handleOnClickHubspotActivities('HUBSPOT__MEETING_SYNC', value)
                    : handleOnClickSalesforceActivities(
                        ACTIVITY_TYPES.MEETING.toUpperCase(),
                        value,
                      );
                }}
              >
                Meetings
              </Checkbox>
              {isHubspot && (
                <ActivitySelect
                  onChange={value => handleConfig('createMeetings', value)}
                  activityType="meeting"
                  value={config.createMeetings}
                  disabled={disableEngagementSelects.HUBSPOT__MEETING_SYNC}
                />
              )}
            </div>
            {!isHubspot && (
              <div className={styles._sync_all_checkbox}>
                <Checkbox
                  onClick={value =>
                    handleConfig(
                      isHubspot ? 'engagementsCreateActivities' : 'createBloobirdsActivities',
                      value,
                    )
                  }
                  defaultChecked={
                    isHubspot
                      ? config.engagementsCreateActivities
                      : config.createBloobirdsActivities
                  }
                  expand
                  size="small"
                >
                  {displayCrm} {isHubspot ? ' activites ' : ' tasks '} that have not been created by
                  Bloobirds are created as new activities.
                </Checkbox>
              </div>
            )}
          </div>
        )}
      </SyncSettingsCard>
    </>
  );
};
export default ActivitySyncSettings;
