import React, { useEffect, useState } from 'react';

import { usePausePeriods } from '@bloobirds-it/hooks';
import spacetime from 'spacetime';

import { checkTZMatching } from '../../../../../../utils/src';
import { APP_MANAGEMENT_USER } from '../../app/_constants/routes';
import { useRouter } from '../../hooks';
import { useEmailConnections } from '@bloobirds-it/hooks';
import SessionManagerFactory from '../../misc/session';
import AlertBanner from '../alertBanner';
import { useUserSettings } from '../userPermissions/hooks';
import AlertMessage from './alertMessage';

const SessionManager = SessionManagerFactory();

const AccountAlertsView = () => {
  const { stoppedConnections } = useEmailConnections();
  const { periods } = usePausePeriods({ userId: SessionManager?.getUser()?.id });
  const settings = useUserSettings();
  const router = useRouter();
  const [alerts, setAlerts] = useState([]);

  const onMessageClick = (value, e) => {
    router.push(APP_MANAGEMENT_USER, { event: e });
  };

  const checkAlertExistance = type => alerts.find(alert => alert.key === type);

  useEffect(() => {
    const alertType = 'nylasStopped';
    const onMessageClickNylas = (value, e) => {
      router.push(APP_MANAGEMENT_USER + '?tab=EMAIL', { event: e });
    };
    if (stoppedConnections?.length > 0) {
      setAlerts([
        ...alerts,
        {
          key: alertType,
          type: 'negative',
          message: <AlertMessage type={alertType} onMessageClick={onMessageClickNylas} />,
        },
      ]);
    }
  }, [stoppedConnections]);

  useEffect(() => {
    const alertType = 'differentTimeZone';
    const timeZoneAlert = checkAlertExistance(alertType);
    const isOnMac = window.navigator.platform.indexOf('Mac') !== -1;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const settingsTimezone = settings?.user?.timeZone?.trim();
    const matchingTimezone = checkTZMatching(userTimezone, settingsTimezone);

    if (
      settings &&
      (isOnMac ? !matchingTimezone : settingsTimezone !== userTimezone) &&
      !timeZoneAlert
    ) {
      setAlerts([
        ...alerts,
        {
          key: alertType,
          type: 'alert',
          message: (
            <AlertMessage
              type={alertType}
              onMessageClick={onMessageClick}
              options={{
                userTimezone,
                settingsTimezone: settings?.user?.timeZone,
              }}
            />
          ),
        },
      ]);
    }
  }, [settings]);

  useEffect(() => {
    const alertType = 'notInChrome';
    if (!window?.chrome) {
      setAlerts([
        ...alerts,
        {
          key: alertType,
          type: 'alert',
          message: <AlertMessage type={alertType} onMessageClick={onMessageClick} />,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const alertType = 'userPaused';
    const periodAlert = checkAlertExistance(alertType);
    const onMessageClickCadence = (value, e) => {
      router.push(APP_MANAGEMENT_USER + '?tab=CADENCE', { event: e });
    };
    if (
      periods.isUserCurrentlyPaused &&
      !periodAlert &&
      periods.pausedUserId === SessionManager?.getUser()?.id
    ) {
      setAlerts([
        ...alerts,
        {
          key: alertType,
          type: 'alert',
          message: (
            <AlertMessage
              type={alertType}
              onMessageClick={onMessageClickCadence}
              options={{
                date: periods.currentPausedPeriod,
              }}
            />
          ),
        },
      ]);
    }
  }, [periods]);

  return <>{alerts && alerts.map(alert => <AlertBanner key={alert.key} {...alert} />)}</>;
};

export default AccountAlertsView;
