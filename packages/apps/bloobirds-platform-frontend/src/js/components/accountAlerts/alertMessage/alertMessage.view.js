import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useCadenceV2Enabled } from '@bloobirds-it/hooks';
import { APP_CADENCES_MANAGE } from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';

import { APP_PLAYBOOK_CADENCES } from '../../../app/_constants/routes';
import { ALERT_BANNER_TYPES } from './alerMessage.constants';
import styles from './alertMessage.module.css';

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const AlertMessage = ({ type, onMessageClick, options = {} }) => {
  const accountId = useActiveAccountId();
  const cadenceV2Enabled = useCadenceV2Enabled(accountId);

  switch (type) {
    case 'maintenanceMode':
      return (
        <Text size="s">
          {' '}
          ⚙️️ We are working on improvements on Bloobirds so we will be on maintenance mode until
          9pm, you can be updated in our&nbsp;
          <a
            className={styles.status_page_link}
            onClick={() => {
              window.open('https://status.bloobirds.com/', '_blank');
            }}
          >
            Status Page.
          </a>
        </Text>
      );
    case 'noLeadCadence':
      return (
        <>
          <Text size="s">
            <Icon name="cadence" color="banana" />️ This account does not have cadences for lead.{' '}
            <b>Go to My Playbook &gt; </b>
            <a
              className={styles._lead_cadence_link}
              onClick={() => {
                window.open(
                  cadenceV2Enabled ? APP_CADENCES_MANAGE : APP_PLAYBOOK_CADENCES,
                  '_self',
                );
              }}
            >
              Cadence
            </a>
            <b> to set up your first one!</b> ✨
          </Text>
        </>
      );
    case 'nylasStopped':
      return (
        <Text size="s">
          {' '}
          ✉️ One of your Email accounts has been disconnected, you should go to&nbsp;
          <a className={styles._accounts_alert_link} onClick={onMessageClick}>
            Connections
          </a>
          &nbsp;and re-authenticate the account to be able to sync your emails
        </Text>
      );
    case 'notInChrome':
      return (
        <Text size="s">
          {' '}
          ⚠️ For an optimal experience we always recommend using Bloobirds with supported Google
          Chrome versions!
        </Text>
      );
    case 'userPaused':
      return (
        <div className={styles._pause_text_container}>
          <div className={styles._pause_icon}>
            <Icon name="pause" color="banana" />️
          </div>
          <Text size="s" inline>
            Paused cadences until{' '}
            <b>
              {formatDateAsText({
                text: new Date(
                  new Date(options.date).getTime() +
                    new Date(options.date).getTimezoneOffset() * 60000,
                ),
                patternFormat: '{date-ordinal} {month}',
              })}
            </b>
            . Go to&nbsp;
            <a className={styles._accounts_alert_link} onClick={onMessageClick}>
              Cadence Settings
            </a>
            &nbsp;and cancel your current pause cadence to continue.
          </Text>
        </div>
      );
    case 'differentTimeZone':
      return (
        <div className={styles._pause_text_container}>
          <div className={styles._pause_icon}>
            <Icon name="clock" color="banana" />️
          </div>
          <Text size="s" inline>
            Your current <b>Time Zone</b> is {options.userTimezone}, which is different than the one
            defined in your settings, {options.settingsTimezone}. You must check your{' '}
            <a className={styles._accounts_alert_link} onClick={onMessageClick}>
              User Settings
            </a>{' '}
            and update your timezone settings.
          </Text>
        </div>
      );
    case ALERT_BANNER_TYPES.WORKFLOW_NOT_EDITABLE:
      return (
        <div className={styles._edit_workflow_text_container}>
          <div className={styles._pause_icon}>
            <Icon name="info" color="banana" />️
          </div>
          <Text size="s" inline>
            The author of this workflow has not allow other users to edit it. Ask{' '}
            <Text size="s" color="purple" inline>
              {options.user}
            </Text>{' '}
            for permission to edit this workflow.
          </Text>
        </div>
      );
    default:
      return null;
  }
};
