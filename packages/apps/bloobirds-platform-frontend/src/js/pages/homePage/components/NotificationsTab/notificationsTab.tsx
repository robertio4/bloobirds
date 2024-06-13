import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import { NotificationsTooltip } from '../../../../components/discoveryTooltips/welcomeTooltips/notificationsTooltip';
import NotificationCard from '../../../../components/header/headerActions/notificationBell/notificationCard';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useNotifications } from '../../../../hooks/useNotifications';
import { NotificationsTypes } from '../../../../typings/notifications';
import { Config, UserHomeConfig } from '../../typings/home';
import styles from './notificationsTab.module.css';

export const notificationTypesEquivalence = {
  [Config.RECEIVED_EMAILS_NOTIF]: NotificationsTypes.NEW_EMAIL,
  [Config.RECEIVED_LINKEDIN_NOTIF]: NotificationsTypes.NEW_LINKEDIN,
  [Config.CADENCE_END_NOTIF]: NotificationsTypes.CADENCE_ENDED,
  [Config.REPORT_MEETING_RESULT]: NotificationsTypes.MEETING_DONE,
  [Config.MEETING_ACCEPTED]: NotificationsTypes.MEETING_ACCEPTED,
  [Config.MEETING_CANCELLED]: NotificationsTypes.MEETING_CANCELLED,
  [Config.MEETING_DELETED]: NotificationsTypes.MEETING_DELETED,
  [Config.MEETING_RESCHEDULED]: NotificationsTypes.MEETING_RESCHEDULED,
  [Config.NEW_LEADS_DELIVERED]: NotificationsTypes.LEAD_ASSIGNED,
  [Config.NEW_COMPANIES_DELIVERED]: NotificationsTypes.COMPANY_ASSIGNED,
  [Config.IMPORT_COMPLETED]: NotificationsTypes.IMPORT_COMPLETED,
  [Config.IMPORT_COMPLETED_ISSUES]: NotificationsTypes.IMPORT_COMPLETED_WITH_WARNINGS,
  [Config.IMPORT_FAILED]: NotificationsTypes.IMPORT_FAILED,
  [Config.NEW_INBOUND_LEADS]: NotificationsTypes.NEW_INBOUND_LEAD,
  [Config.NEW_INBOUND_ACTIVITY]: NotificationsTypes.NEW_INBOUND,
  [Config.MISSED_CALLS_FROM_LEADS]: NotificationsTypes.MISSED_CALL_LEAD,
  [Config.MISSED_CALLS_FROM_UNKNOWN]: NotificationsTypes.MISSED_CALL_UNKNOWN,
  [Config.INCOMING_CALLS_FROM_UNKNOWN]: NotificationsTypes.MISSED_CALL_UNKNOWN,
  [Config.REPORT_CALL_RESULT]: NotificationsTypes.REPORT_CALL,
  [Config.EMAIL_OPENED]: NotificationsTypes.EMAIL_OPENED,
  [Config.EMAIL_CLICKED]: NotificationsTypes.EMAIL_CLICKED,
  [Config.ACCOUNT_STOPPED]: NotificationsTypes.ACCOUNT_STOPPED,
  [Config.RELATED_COMPANIES_OPPORTUNITY]: NotificationsTypes.RELATED_COMPANIES_OPPORTUNITY,
  [Config.RELATED_COMPANY_ACTIVITY_INBOUND]: NotificationsTypes.RELATED_COMPANY_ACTIVITY_INBOUND,
  [Config.RELATED_COMPANY_LEAD_INBOUND]: NotificationsTypes.RELATED_COMPANY_LEAD_INBOUND,
  [Config.RELATED_COMPANY_STATUS_ACCOUNT]: NotificationsTypes.RELATED_COMPANY_STATUS_ACCOUNT,
  [Config.RELATED_COMPANY_STATUS_CLIENT]: NotificationsTypes.RELATED_COMPANY_STATUS_CLIENT,
  [Config.RELATED_COMPANY_MEETING]: NotificationsTypes.RELATED_COMPANY_MEETING,
};

const LoadMore = ({ onClick }: { onClick: () => void }) => (
  <div className={styles._show_more} onClick={onClick}>
    <Text size="xxs" color="bloobirds">
      Load More
    </Text>
  </div>
);

export const NotificationsTab = ({ filters }: { filters: UserHomeConfig[] }) => {
  const notificationsFiltersParsed: NotificationsTypes[] = filters?.map(filter => {
    if (filter?.enabled) {
      // @ts-ignore
      return notificationTypesEquivalence[filter?.enumName];
    }
  });
  const {
    notifications,
    removeNotification,
    markAsReadById,
    markAsReadByTypes,
    isLastPage,
    loadMore,
    mutate,
  } = useNotifications({
    types: notificationsFiltersParsed,
  });
  const { t } = useTranslation();
  useEffect(() => {
    mutate();
  }, [filters]);

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.title}>
        <Text color="softPeanut" weight="medium" size="xs" inline>
          Notifications
        </Text>
        <div
          onClick={() => {
            mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_ALL_AS_READ);
            markAsReadByTypes();
          }}
        >
          <Text color="bloobirds" size="xs">
            Mark all as read
          </Text>
        </div>
      </div>
      {notifications && notifications?.length > 0 ? (
        <>
          {notifications
            ?.filter(Boolean)
            ?.map(
              ({
                id,
                title,
                titleKey,
                subtitle,
                subtitleKey,
                variable,
                timestamp,
                read,
                ...info
              }) => (
                <NotificationCard
                  key={id}
                  id={id}
                  read={read}
                  date={new Date(timestamp)}
                  onDelete={removeNotification}
                  fromHome={true}
                  onClick={async () => {
                    if (!read) {
                      await markAsReadById(id);
                    }
                  }}
                  title={titleKey ? (variable ? t(titleKey, variable) : t(titleKey)) : title}
                  subtitle={subtitleKey ? t(subtitleKey) : subtitle}
                  {...info}
                />
              ),
            )}
          {!isLastPage && (
            <LoadMore
              onClick={() => {
                mixpanel.track(MIXPANEL_EVENTS.HOME_LOADED_MORE_NOTIFICATIONS);
                loadMore();
              }}
            />
          )}
        </>
      ) : (
        <div style={{ height: '100%' }}>
          <NotificationsTooltip />
          <div className={styles.noNotifs}>
            <Text size="l" align="center">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              All clear ✨
            </Text>
            <Text size="m" align="center" color="softPeanut">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Looks you don't have any notifications pending!
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
