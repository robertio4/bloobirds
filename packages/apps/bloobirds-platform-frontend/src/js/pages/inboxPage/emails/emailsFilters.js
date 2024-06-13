import React, { useEffect } from 'react';
import {
  Button,
  CheckItem,
  Chip,
  MultiSelect,
  RelativeDatePicker,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { usePicklistValues, useMediaQuery } from '../../../hooks';
import { ACTIVITY_DIRECTION, ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import {
  SubhomeFilterGroup,
  SubhomeFilters,
} from '../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useInboxEmailsFilters } from './useInboxEmails';
import styles from '../inboxPage.module.css';
import { useGlobalPicklistValues } from '../../../hooks/usePicklistValues';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';

export const EmailsFilters = () => {
  const {
    dateFilter,
    activityUserFilter,
    directionFilter,
    showReportedFilter,
    setShowReportedFilter,
    setDateFilter,
    setActivityUserFilter,
    setDirectionFilter,
    resetAllFilters,
    usingDefaultFilters,
  } = useInboxEmailsFilters();
  const directions = usePicklistValues({ picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION });
  const emailDirections = directions.filter(
    direction => direction.logicRole !== 'ACTIVITY__DIRECTION__MISSED',
  );

  const { isSmallDesktop } = useMediaQuery();

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });

  const isAccountAdmin = useIsAccountAdmin();

  useEffect(() => () => resetAllFilters(), []);
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
        <MultiSelect
          placeholder="Type"
          size="small"
          onChange={setDirectionFilter}
          value={directionFilter || []}
          variant="filters"
        >
          <CheckItem value="all">All</CheckItem>
          {emailDirections.map(direction => (
            <CheckItem key={direction.id} value={direction.value}>
              {direction.value === ACTIVITY_DIRECTION.INCOMING ? 'Received' : 'Sent'}
            </CheckItem>
          ))}
        </MultiSelect>
        {!usingDefaultFilters && (
          <Button variant="clear" color="bloobirds" iconLeft="cross" onClick={resetAllFilters}>
            CLEAR
          </Button>
        )}
      </SubhomeFilterGroup>
      <SubhomeFilterGroup>
        <Text color="softPeanut" size="s" className={styles._filters__title}>
          Quick filters:
        </Text>
        <div className={styles._quick_filter_wrapper}>
          <Chip size="small" selected={showReportedFilter} onClick={setShowReportedFilter}>
            Show reported
          </Chip>
        </div>
      </SubhomeFilterGroup>
    </SubhomeFilters>
  );
};
