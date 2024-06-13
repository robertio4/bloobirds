import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React, { MouseEvent, useState } from 'react';
import useSWR from 'swr';
import { APP_TASKS_OUTBOX } from '../../app/_constants/routes';
import { useRouter } from '../../hooks';
import { useEmailSettings } from '../../hooks/useEmailSettings';
import AlertBanner from '../alertBanner';
import styles from './dayLimitBanner.module.css';

const DayLimitAlert = () => {
  const { history } = useRouter();
  const [, setIsClosed] = useState(false);
  const { data } = useSWR(`/messaging/throttling/email/dailyLimit`);
  const { settings } = useEmailSettings();

  return data?.dailyLimitExceeded ? (
    <AlertBanner
      backgroundColor="#fdeade"
      borderColor="#fed8c1"
      onHide={() => setIsClosed(true)}
      message={
        <div className={styles._banner_container}>
          <div className={styles._banner_icon}>
            <Icon name="slash" color="tangerine" />️
          </div>
          <Text size="s" inline align="center">
            {`You have reached the daily email sending limit of ${settings?.dailyLimit} emails. Check your `}
            <a
              className={styles._banner_link}
              onClick={() => {
                history.push(`${APP_TASKS_OUTBOX}/automatedEmails`);
              }}
            >
              Outbox
            </a>{' '}
            to manage the emails scheduled for today.
          </Text>
        </div>
      }
    />
  ) : null;
};

export default DayLimitAlert;
