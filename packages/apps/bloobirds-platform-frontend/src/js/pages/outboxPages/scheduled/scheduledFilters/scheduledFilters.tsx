import React, { useEffect } from 'react';
import { isPlainObject } from 'lodash';
import {
  Button,
  CheckItem,
  Chip,
  Item,
  MultiSelect,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import {
  SubhomeFilterGroup,
  SubhomeFilters,
} from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import styles from './scheduledFilters.module.css';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useOutboxScheduledFilters } from '../useOutboxScheduled';
import { UserObject } from '../../../../typings/user';

export const ScheduledFilters = () => {
  const {
    dateFilter,
    assignedToFilter,
    showSuccessfullySentFilter,
    showFailedSentFilter,
    setDateFilter,
    setAssignedToFilter,
    setShowSuccessfullySentFilter,
    setShowFailedSentFilter,
    usingDefaultFilters,
    resetFilters,
  } = useOutboxScheduledFilters();

  const isDateSelectValue = (dateValue: string) =>
    ['today', 'next_7_days', 'next_30_days', 'since_today', 'all_time'].includes(dateValue);

  const dateType =
    !isPlainObject(dateFilter) && Array.isArray(dateFilter)
      ? dateFilter[0]?.value?.type
      : dateFilter;
  const dateFilterValue = isDateSelectValue(dateType) ? dateType : 'customValue';

  useEffect(() => () => resetFilters(), []);

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user?.enabled);

  const isAccountAdmin = useIsAccountAdmin();

  return (
    <SubhomeFilters>
      <>
        <SubhomeFilterGroup>
          <>
            <Select
              size="small"
              variant="filters"
              value={dateFilterValue}
              onChange={value => {
                setDateFilter(value);
              }}
              placeholder="Date"
            >
              <Item value="today">Today</Item>
              <Item value="next_7_days">Next 7 days</Item>
              <Item value="next_30_days">Next 30 days</Item>
              <Item value="since_today">Since today</Item>
              <Item value="all_time">All time</Item>
            </Select>
            {isAccountAdmin && (
              <MultiSelect
                placeholder={assignedToFilter ? 'Assigned to' : 'Me'}
                size="small"
                onChange={value => {
                  setAssignedToFilter(value);
                }}
                value={assignedToFilter || []}
                variant="filters"
                selectAllOption
              >
                {users.map(user => (
                  <CheckItem key={user.id} value={user.id}>
                    {user.value}
                  </CheckItem>
                ))}
              </MultiSelect>
            )}
            <div className={styles._clear_wrapper}>
              {!usingDefaultFilters && (
                <Button
                  variant="clear"
                  color="bloobirds"
                  iconLeft="cross"
                  onClick={() => {
                    resetFilters();
                  }}
                >
                  CLEAR
                </Button>
              )}
            </div>
          </>
        </SubhomeFilterGroup>
        <SubhomeFilterGroup>
          <>
            <Text color="softPeanut" size="s" className={styles._filters__title}>
              Quick filters:
            </Text>
            <div className={styles._quick_filter_wrapper}>
              <Chip
                size="small"
                selected={showSuccessfullySentFilter}
                onClick={setShowSuccessfullySentFilter}
              >
                Show succesfully sent
              </Chip>
              <Chip size="small" selected={showFailedSentFilter} onClick={setShowFailedSentFilter}>
                Failed
              </Chip>
            </div>{' '}
          </>
        </SubhomeFilterGroup>
      </>
    </SubhomeFilters>
  );
};
