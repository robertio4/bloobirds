import React from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner, Text } from '@bloobirds-it/flamingo-ui';

import { NoUpdates } from '../../../../../../assets/svg';
import NotificationCard from '../notificationCard';
import styles from './notificationTab.module.css';

const LoadingNotifications = () => (
  <div className={styles._loading_container}>
    <Spinner name="loadingCircle" />
  </div>
);

const EmptyNotifications = () => (
  <div className={styles._empty_container}>
    <NoUpdates />
    No updates to display
  </div>
);

const LoadMore = ({ onClick }) => (
  <div className={styles._show_more} onClick={onClick}>
    <Text size="xxs" color="bloobirds">
      Load More
    </Text>
  </div>
);

const NotificationTab = ({ onCardClick, notificationData }) => {
  const {
    notifications,
    isLoading,
    isLastPage,
    loadMore,
    removeNotification,
    markAsReadById,
  } = notificationData;
  const { t } = useTranslation();
  if (isLoading) {
    return <LoadingNotifications />;
  }

  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <div>
      {notifications &&
        notifications
          ?.filter(n => !!n && n?.id)
          ?.map(
            ({
              id,
              timestamp,
              read,
              title,
              titleKey,
              subtitle,
              subtitleKey,
              variable,
              ...info
            }) => (
              <NotificationCard
                key={id}
                id={id}
                read={read}
                date={new Date(timestamp)}
                onDelete={removeNotification}
                onClick={async () => {
                  if (!read) {
                    await markAsReadById(id);
                  }
                  onCardClick();
                }}
                title={titleKey ? (variable ? t(titleKey, variable) : t(titleKey)) : title}
                subtitle={subtitleKey ? t(subtitleKey) : subtitle}
                {...info}
              />
            ),
          )}
      {!isLastPage && <LoadMore onClick={loadMore} />}
    </div>
  );
};

export default NotificationTab;
