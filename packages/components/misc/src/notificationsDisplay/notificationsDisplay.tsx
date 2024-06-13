import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Avatar,
  ColorType,
  CompoundIcon,
  Dropdown,
  Icon,
  IconButton,
  IconType,
  Spinner,
  Tab,
  TabGroup,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useNotifications, useNotificationsData } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { Notification, NotificationsCategory, NotificationsTypes } from '@bloobirds-it/types';
import { isDynamicsPage, isSalesforcePage, normalizeUrl } from '@bloobirds-it/utils';
import classNames from 'clsx';
import { format } from 'date-fns';

import styles from './notificationsDisplay.module.css';
import { ICONS, NEW_TABS, TABS } from './notificationsDisplayConstants';

export const notificationsWithStatus = [
  NotificationsTypes.MEETING_ACCEPTED,
  NotificationsTypes.MEETING_DELETED,
  NotificationsTypes.MEETING_CANCELLED,
  NotificationsTypes.MEETING_RESCHEDULED,
];

export const getCompoundIcon = (
  type: NotificationsTypes,
  parentRef: React.MutableRefObject<undefined>,
): JSX.Element => {
  let compoundProps;
  switch (type) {
    case NotificationsTypes.MEETING_ACCEPTED:
      compoundProps = {
        bagdeColor: 'lightestCall' as ColorType,
        icon: 'check' as IconType,
        iconColor: 'extraCall' as ColorType,
      };
      break;
    case NotificationsTypes.MEETING_DELETED:
      compoundProps = {
        bagdeColor: 'lightestMeeting' as ColorType,
        icon: 'trashFull' as IconType,
        iconColor: 'extraMeeting' as ColorType,
      };
      break;
    case NotificationsTypes.MEETING_CANCELLED:
      compoundProps = {
        bagdeColor: 'lightestMeeting' as ColorType,
        icon: 'cross' as IconType,
        iconColor: 'extraMeeting' as ColorType,
      };
      break;
    case NotificationsTypes.MEETING_RESCHEDULED:
      compoundProps = {
        bagdeColor: 'verySoftPeanut' as ColorType,
        icon: 'repeat' as IconType,
        iconColor: 'peanut' as ColorType,
      };
      break;
  }
  return (
    <CompoundIcon parent={<Icon name="calendar" color="tomato" />} parentRef={parentRef}>
      <Avatar size="supertiny" color={compoundProps.bagdeColor}>
        <Icon name={compoundProps.icon} color={compoundProps.iconColor} size={10} />
      </Avatar>
    </CompoundIcon>
  );
};

const NotificationCard = (
  props: Partial<{
    date: Date;
    id: string;
    subtitle: string;
    title: string;
    type: NotificationsTypes;
    read: boolean;
    onDelete: (id: string) => void;
    onCardClick: () => void;
    fromHome: any;
  }>,
) => {
  const { date, id, subtitle, title, type, read, onDelete, fromHome, onCardClick } = props;
  const classes = classNames(styles._card, {
    [styles._unread]: !read,
  });

  const handleRemove = event => {
    event.preventDefault();
    event.stopPropagation();
    onDelete(id);
  };

  const parentRef = useRef();

  return (
    <li className={classes} onClick={onCardClick}>
      {notificationsWithStatus.includes(type) ? (
        getCompoundIcon(type, parentRef)
      ) : (
        <Icon {...ICONS[type]} />
      )}
      <div className={styles._card__body}>
        <Text
          dataTest={`Text-Notification-${title}`}
          color="darkGray"
          size="xs"
          className={classNames(styles.title, {
            [styles.titleAlone]: !subtitle && fromHome,
          })}
        >
          {title || ''}
        </Text>
        <Text
          dataTest={`Notification-Company-${subtitle}`}
          color="softPeanut"
          size="xs"
          className={styles.subtitle}
        >
          {subtitle || ''}
        </Text>
      </div>
      <div className={styles._card__info}>
        <IconButton name="trashFull" size={16} color="bloobirds" onClick={handleRemove} />
        <Tooltip position="bottom" title={date && format(date, 'PPP ppp')}>
          <Text size="xs" color="softPeanut" className={styles._card_date}>
            {useGetI18nSpacetime().since(useGetI18nSpacetime(date)).rounded}
          </Text>
        </Tooltip>
      </div>
    </li>
  );
};

const LoadingNotifications = () => (
  <div className={styles._loading_container}>
    <Spinner name="loadingCircle" />
  </div>
);

const EmptyNotifications = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'misc.notifications' });
  return (
    <div className={styles._empty_container}>
      {/*<NoUpdates />*/}
      {t('noUpdates')}
    </div>
  );
};

const LoadMore = ({ onClick }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'misc.notifications' });

  return (
    <div className={styles._show_more} onClick={onClick}>
      <Text size="xxs" color="bloobirds">
        {t('loadMore')}
      </Text>
    </div>
  );
};

const NotificationDisplay = notificationsInfo => {
  const {
    onCardClick,
    notifications,
    isLoading,
    isLastPage,
    loadMore,
    removeNotification,
    markAsReadById,
  } = notificationsInfo;

  if (isLoading) {
    return <LoadingNotifications />;
  }
  const { t } = useTranslation();
  if (notifications?.length === 0 || (Array.isArray(notifications) && !notifications[0])) {
    return <EmptyNotifications />;
  }

  return (
    <div>
      {notifications &&
        notifications.map(
          ({ id, timestamp, read, title, titleKey, subtitle, subtitleKey, variable, ...info }) => (
            <NotificationCard
              key={id}
              id={id}
              read={read}
              date={new Date(timestamp)}
              onDelete={removeNotification}
              onCardClick={async () => {
                if (!read) {
                  await markAsReadById(id);
                }
                onCardClick(info);
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

const NotificationsBody = props => {
  const { unreadByCategory, markAsReadByCategory, category, setCategory } = props;
  const { t } = useTranslation('translation', { keyPrefix: 'misc.notifications' });
  return (
    <div className={styles._wrap}>
      <div className={styles._header_wrapper}>
        <Text color="darkGray">{t('notifications')}</Text>
        <div
          className={styles._link}
          data-test={`Link-HeaderNotificationDropdownMarkRead`}
          onClick={markAsReadByCategory}
        >
          <Text size="xs" color="bloobirds">
            {t('markAllAsRead')}
          </Text>
        </div>
      </div>
      <main className={classNames(styles._tabs_container)}>
        <TabGroup
          value={NEW_TABS(t)[category]}
          onClick={tabValue => {
            setCategory(NEW_TABS(t)[tabValue]);
          }}
        >
          {TABS.map(({ key, category }) => (
            <Tab
              name={t(`tabs.${key}`)}
              key={category}
              size="xs"
              extraSize="xxs"
              extra={unreadByCategory?.data?.[category] || undefined}
            >
              <NotificationDisplay {...props} />
            </Tab>
          ))}
        </TabGroup>
      </main>
      <div className={styles.poweredByContainer}>
        <div className={styles.poweredByBox}>
          <Icon name="bloobirds" color="bloobirds" size={16} />
          <Text size="xs">
            <Trans i18nKey="misc.notifications.poweredByBloobirds" />
          </Text>
        </div>
      </div>
    </div>
  );
};

export const NotificationsDisplay = ({
  onCardClick,
}: {
  onCardClick: (notification: Notification) => void;
}) => {
  const url = normalizeUrl(window.location.href);
  const isSalesforce = isSalesforcePage(url);
  const isDynamics = isDynamicsPage(url);
  const unreadInfo = useNotificationsData();
  const notificationData = useNotifications();
  const props = {
    ...unreadInfo,
    ...notificationData,
    onCardClick: value => {
      onCardClick(value);
      setVisible(false);
      notificationData.setCategory(NotificationsCategory.UPDATES);
    },
  };
  const { totalUnread } = unreadInfo;
  const anchorRef = useRef();
  const { ref, visible, setVisible } = useVisible(false, anchorRef);

  const classes = classNames(styles.bell, {
    [styles.pending]: totalUnread !== 0,
  });

  const classesRoot = !isDynamics
    ? !isSalesforce
      ? styles.linkedinNotificationBell
      : styles.salesforceNotificationBell
    : null;

  return (
    <div className={classesRoot}>
      <Dropdown
        ref={ref}
        visible={visible}
        anchor={
          <div
            data-test="Button-HeaderNotificationBell"
            role="button"
            tabIndex={0}
            key={totalUnread}
            className={classes}
            onClick={() => {
              notificationData.setCategory(NotificationsCategory.UPDATES);
              setVisible(!visible);
            }}
            ref={anchorRef}
          >
            <IconButton name="bellFilled" color="bloobirds" size={24} />
            {totalUnread > 0 && (
              <div data-test="Number-HeaderNotificationCounterValue" className={styles.count}>
                {totalUnread}
              </div>
            )}
          </div>
        }
      >
        <NotificationsBody {...props} />
      </Dropdown>
    </div>
  );
};
