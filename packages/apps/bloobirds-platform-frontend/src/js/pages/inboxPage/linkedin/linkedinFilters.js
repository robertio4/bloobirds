import { useMediaQuery } from '../../../hooks';
import {
  SubhomeFilterGroup,
  SubhomeFilters,
} from '../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import {
  Button,
  CheckItem,
  Chip,
  MultiSelect,
  RelativeDatePicker,
  Text,
} from '@bloobirds-it/flamingo-ui';
import React, { useEffect } from 'react';
import { useInboxLinkedinFilters } from './useInboxLinkedin';
import styles from '../inboxPage.module.css';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../../hooks/usePicklistValues';

export const LinkedinFilters = () => {
  const {
    dateFilter,
    activityUserFilter,
    showManuallyLoggedFilter,
    setShowManuallyLoggedFilter,
    setDateFilter,
    setActivityUserFilter,
    resetAllFilters,
    usingDefaultFilters,
  } = useInboxLinkedinFilters();

  const { isSmallDesktop } = useMediaQuery();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });

  useEffect(() => () => resetAllFilters(), []);
  const isAccountAdmin = useIsAccountAdmin();

  return (
    <SubhomeFilters>
      <SubhomeFilterGroup>
        <div className={styles.filter_relative_date}>
          <RelativeDatePicker
            width={isSmallDesktop ? 80 : 150}
            value={{
              start: dateFilter.start,
              end: dateFilter.end,
              type: 'custom',
            }}
            onChange={setDateFilter}
            placeholder="Date range"
            size="small"
          />
        </div>
        {isAccountAdmin && (
          <>
            <MultiSelect
              placeholder={activityUserFilter ? 'User' : 'Me'}
              size="small"
              onChange={setActivityUserFilter}
              value={activityUserFilter || []}
              selectAllOption
              variant="filters"
            >
              {users.map(user => (
                <CheckItem key={user.id} value={user.id}>
                  {user.value}
                </CheckItem>
              ))}
            </MultiSelect>
          </>
        )}
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <Text color="softPeanut" size="s" className={styles._filters__title}>
          Quick filters:
        </Text>
        <div className={styles._quick_filter_wrapper}>
          <Chip
            size="small"
            selected={showManuallyLoggedFilter}
            onClick={setShowManuallyLoggedFilter}
          >
            Manually logged activities
          </Chip>
        </div>
        {!usingDefaultFilters && (
          <Button variant="clear" color="bloobirds" iconLeft="cross" onClick={resetAllFilters}>
            CLEAR
          </Button>
        )}
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
