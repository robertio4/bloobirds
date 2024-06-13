import { CircularBadge, Icon, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import React, { useEffect, useState } from 'react';
import { useEntity } from '../../hooks';
import { UserObject } from '../../typings/user';
import styles from './userSelect.module.css';

const UserSelect = ({
  disabled,
  onChange,
  value,
  width = 240,
}: {
  disabled?: boolean;
  onChange: (user: UserObject) => void;
  value?: UserObject;
  width?: number;
}) => {
  const users = useEntity('users');
  const [search, setSearch] = useState<string>();
  const activeUsers = users?.all()?.filter(user => user?.active);

  useEffect(() => {
    if (!search) {
      onChange(null);
    }
  }, [search]);

  return (
    <Select
      autocomplete
      width={`${width}px`}
      adornment={<Icon size={20} name="search" color="softPeanut" />}
      onChange={onChange}
      value={value}
      onSearch={v => setSearch(v)}
      renderDisplayValue={v => v?.name}
      disabled={disabled}
    >
      <Item key="empty-item">None</Item>;
      {activeUsers?.map(user => {
        if (!search || user?.name.toLowerCase().includes(search.toLowerCase())) {
          return (
            <Item dataTest={user?.value} value={user} key={user?.value}>
              <>
                <CircularBadge
                  size="medium"
                  className={styles.circularBadge}
                  style={{ color: 'white', backgroundColor: user?.color || 'softGray' }}
                >
                  {user?.shortname || 'U'}
                </CircularBadge>
                <div>
                  <Text color="peanut" size="m" weight="medium">
                    {user?.name}
                  </Text>
                  <Text color="softPeanut" size="m">
                    {user?.email}
                  </Text>
                </div>
              </>
            </Item>
          );
        }
      })}
    </Select>
  );
};

export default UserSelect;
