import React, { useEffect, useLayoutEffect } from 'react';

import { useGetBobjectByTypeAndId, useNotifications } from '@bloobirds-it/hooks';
import { NotificationsCategory, Notification } from '@bloobirds-it/types';

import { ReportCallReminderCard } from './components/reportCallReminderCard';
import { ReportCallRemindersBulk } from './components/reportCallRemindersBulk';
import styles from './notificationReminders.module.css';

enum ReminderType {
  REPORT_CALL = 'REPORT_CALL',
  REPORT_CALL_BULK = 'REPORT_CALL_BULK',
}

type Reminder = {
  type: ReminderType;
  activityId?: string;
  notificationId?: string;
  notifications?: Notification[];
};

const RemindersContext = React.createContext(null);

export function useNotificationReminders() {
  const context = React.useContext(RemindersContext);
  if (!context) {
    throw new Error(`useReminders must be used within a RemindersProvider`);
  }
  return context;
}

function NotificationRemindersProvider(props) {
  const {
    markAsReadById,
    notifications,
    markAsReadByTypes,
    mutate: mutateNotifications,
  } = useNotifications(NotificationsCategory.CALLS);
  const [reminder, setReminder] = React.useState<Reminder>(null);
  const [notificationsUpdated, setNotificationsUpdated] = React.useState(0);

  const onVisibilityChange = async () => {
    if (document.visibilityState === 'visible') {
      await mutateNotifications?.();
      setNotificationsUpdated(notificationsUpdated => notificationsUpdated + 1);
    }
  };

  useEffect(() => {
    const filteredNotifications = notifications?.filter(
      n => n.type === ReminderType.REPORT_CALL && !n.read,
    );
    if (filteredNotifications.length === 1) {
      setReminder({
        type: ReminderType.REPORT_CALL,
        activityId: `${filteredNotifications[0].accountId}/Activity/${filteredNotifications[0].objectId}`,
        notificationId: filteredNotifications[0].id,
      });
    }
    if (filteredNotifications.length > 1) {
      setReminder({
        type: ReminderType.REPORT_CALL_BULK,
        notifications: filteredNotifications,
      });
    }
  }, [notificationsUpdated]);

  useLayoutEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  function dismissReminder() {
    if (reminder.type === ReminderType.REPORT_CALL) {
      markAsReadById?.(reminder.notificationId);
      setReminder(null);
    }
    if (reminder.type === ReminderType.REPORT_CALL_BULK) {
      markAsReadByTypes?.([ReminderType.REPORT_CALL]);
      setReminder(null);
    }
  }

  const value = {
    reminder,
    dismissReminder,
  };

  return <RemindersContext.Provider value={value} {...props} />;
}

function ReportCallReminderWrapper({ reminder }) {
  const { bobject: activity } = useGetBobjectByTypeAndId(reminder.activityId, true);

  if (!activity) {
    return null;
  }

  return <ReportCallReminderCard activity={activity} />;
}

function getReminder(reminder: Reminder) {
  switch (reminder.type) {
    case ReminderType.REPORT_CALL:
      return <ReportCallReminderWrapper reminder={reminder} />;
    case ReminderType.REPORT_CALL_BULK:
      return <ReportCallRemindersBulk />;
    default:
      return null;
  }
}

export function RemindersWrapped() {
  const { reminder } = useNotificationReminders();
  return <div className={styles.remindersContainer}>{reminder && getReminder(reminder)}</div>;
}

export function NotificationReminders() {
  return (
    <NotificationRemindersProvider>
      <RemindersWrapped />
    </NotificationRemindersProvider>
  );
}
