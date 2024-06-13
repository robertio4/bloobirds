import React from 'react';

import { Dropdown, Tab, TabGroup, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useNotifications, useNotificationsData } from '@bloobirds-it/hooks';
import classNames from 'clsx';

import { toCamelCaseUpperFirst } from '../../../../utils/strings.utils';
import BellButton from './bellButton';
import styles from './notificationBell.module.css';
import NotificationTab from './notificationTab';

const TABS = [
  {
    title: 'Updates',
    category: 'UPDATES',
  },
  {
    title: 'Inbound',
    category: 'INBOUND',
  },
  {
    title: 'Calls',
    category: 'CALLS',
  },
  {
    title: 'Email tracking',
    category: 'EMAIL_TRACKING',
  },
];

export const BellContent = ({ onCardClick, type }) => {
  const notificationData = useNotifications();
  const { category, setCategory, markAsReadByCategory } = notificationData;
  const { unreadByCategory } = useNotificationsData();
  const isTypeFeed = type === 'FEED';

  return (
    <div className={styles._wrap}>
      <div className={styles._header_wrapper}>
        {!isTypeFeed ? <Text color="darkGray">Notifications</Text> : <div />}
        <div
          className={styles._link}
          data-test={`Link-HeaderNotificationDropdownMarkRead`}
          onClick={markAsReadByCategory}
        >
          <Text size="xs" color="bloobirds">
            Mark all as read
          </Text>
        </div>
      </div>
      <main
        className={classNames(styles._tabs_container, {
          [styles._tabs_container_feed]: isTypeFeed,
        })}
      >
        <TabGroup
          value={TABS.find(tab => tab.category === category).title}
          onClick={title => setCategory(TABS.find(tab => tab.title === title).category)}
        >
          {TABS.map(tab => (
            <Tab
              dataTest={`HeaderNotificationDropdown${toCamelCaseUpperFirst(tab.title)}`}
              name={tab.title}
              key={tab.category}
              size="xs"
              extraSize="xxs"
              extra={unreadByCategory?.data?.[tab.category] || undefined}
            >
              <NotificationTab onCardClick={onCardClick} notificationData={notificationData} />
            </Tab>
          ))}
        </TabGroup>
      </main>
    </div>
  );
};

const NotificationBell = () => {
  const { ref, visible, setVisible } = useVisible();
  return (
    <Dropdown
      ref={ref}
      arrow={false}
      visible={visible}
      anchor={<BellButton onClick={() => setVisible(!visible)} />}
      dataTest="HeaderNotifications"
    >
      <BellContent onCardClick={() => setVisible(false)} />
    </Dropdown>
  );
};

export default NotificationBell;
