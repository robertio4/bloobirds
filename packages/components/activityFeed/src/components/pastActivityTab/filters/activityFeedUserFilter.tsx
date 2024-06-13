import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CheckItem,
  Dropdown,
  IconButton,
  Input,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useUserSearch, useUserSettings } from '@bloobirds-it/hooks';
import { UserPermission } from '@bloobirds-it/types';
import clsx from 'clsx';

import styles from './pastActivityFilters.module.css';

const ActivityUserAnchor = ({ selectedUsers, allSelected, onClick }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activityTimelineItem.activityFeed' });
  const anchorText = allSelected
    ? t('allUsers')
    : `${selectedUsers?.length} user${selectedUsers?.length > 1 ? 's' : ''}`;
  const isSmallView = window.innerWidth < 1250;
  const iconClass = clsx(styles._icon, {
    [styles._filtersTouched]: isSmallView && selectedUsers?.length > 0,
  });
  return (
    <div className={styles._user_filter_anchor} onClick={onClick}>
      <IconButton name="user" size={16} color="bloobirds" className={iconClass} />
      {!isSmallView && (
        <Text size="xs" color="bloobirds">
          {anchorText}
        </Text>
      )}
    </div>
  );
};

export const ActivityFeedUserFilter = ({ selectedUser, setUserFilter }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activityTimelineItem.activityFeed' });
  const { users } = useUserSearch();
  const [searchValue, setSearchValue] = useState('');
  const settings = useUserSettings();
  const { ref, visible, setVisible } = useVisible();
  function handleSelectItem(value) {
    if (selectedUser?.includes(value)) {
      setUserFilter(selectedUser.filter(user => user !== value));
    } else {
      setUserFilter([...(selectedUser || []), value]);
    }
  }

  if (
    !settings?.user?.accountAdmin ||
    !settings?.user?.permissions?.includes(UserPermission.EDIT_ALL)
  )
    return null;

  return (
    <Dropdown
      ref={ref}
      anchor={
        <ActivityUserAnchor
          selectedUsers={selectedUser ?? []}
          allSelected={
            !selectedUser || selectedUser.length === 0 || users?.length === selectedUser.length
          }
          onClick={() => setVisible(!visible)}
        />
      }
      position="bottom-start"
      visible={visible}
    >
      <>
        <div className={styles._search_input}>
          <Input
            autoFocus
            width="100%"
            size="labeled"
            placeholder={t('search')}
            onChange={setSearchValue}
            value={searchValue}
          />
        </div>
        <div style={{ height: '300px', overflowY: 'scroll', padding: '4px' }}>
          <CheckItem onClick={() => setUserFilter([])} checked={selectedUser?.length === 0}>
            {t('allUsers')}
          </CheckItem>
          {users?.reduce((acc, user) => {
            if (!searchValue || user?.name.toLowerCase().includes(searchValue.toLowerCase())) {
              acc.push(
                <CheckItem
                  key={user?.id}
                  value={user?.id}
                  label={user?.name}
                  onClick={() => handleSelectItem(user.id)}
                  checked={selectedUser?.includes(user.id)}
                >
                  {user?.name}
                </CheckItem>,
              );
            }
            return acc;
          }, [])}
        </div>
      </>
    </Dropdown>
  );
};
