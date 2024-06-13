import React, { useCallback, useEffect } from 'react';

import {
  Button,
  CheckItem,
  Chip,
  Item,
  MultiSelect,
  Section,
  Select,
} from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { isPlainObject, sortBy } from 'lodash';

import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { useCadences } from '../../../../hooks/useCadences';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import {
  SubhomeFilterGroup,
  SubhomeFilters,
} from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useSubhomeContext } from '../../../subhomePages/subhomeContext';
import { useOutboxAutomatedFilters } from '../useOutboxAutomated';
import styles from './automatedFilters.module.css';

export interface CadenceByBobjectType {
  [key: string]: object[];
}

export const AutomatedFilters = () => {
  const {
    dateFilter,
    orderFilter,
    assignedToFilter,
    bobjectTypeFilter,
    cadencesFilter,
    buyerPersonaFilter,
    targetMarketsFilter,
    showSuccessfullySentFilter,
    showFailedSentFilter,
    showPausedFilter,
    showRescheduledFilter,
    setDateFilter,
    setOrderFilter,
    setBobjectTypeFilter,
    setCadencesFilter,
    setBuyerPersonaFilter,
    setAssignedToFilter,
    setTargetMarketsFilter,
    setShowSuccessfullySentFilter,
    setShowFailedSentFilter,
    setShowPausedFilter,
    setShowRescheduledFilter,
    resetFilters,
    usingDefaultFilters,
  } = useOutboxAutomatedFilters();
  const { setHaveFiltersBeenChanged } = useSubhomeContext();
  const isFullSalesEnabled = useFullSalesEnabled();

  const availableBobjects = isFullSalesEnabled
    ? [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.OPPORTUNITY]
    : [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD];
  const bobjectTypes = useBobjectTypes()
    ?.all()
    ?.filter(bobject => {
      return availableBobjects.includes(bobject.name);
    });
  const bobjectTypesNames = bobjectTypes.map(type => type?.name);
  const { cadences } = useCadences(bobjectTypesNames);

  let cadencesByBobjectType: CadenceByBobjectType = {};
  cadences?.forEach((cadence: any) => {
    const cadenceBobjectType = cadence?.bobjectType;
    const newNode = cadencesByBobjectType[cadenceBobjectType]
      ? [...cadencesByBobjectType[cadenceBobjectType], cadence]
      : [cadence];
    cadencesByBobjectType = { ...cadencesByBobjectType, [cadenceBobjectType]: newNode };
  });
  const getBobjectTypeName = (bobjectTypeId: string) =>
    bobjectTypes?.find(bobjectType => bobjectType?.id === bobjectTypeId)?.name;
  const buyerPersonas = useGlobalPicklistValues({ logicRole: 'IDEAL_CUSTOMER_PROFILE' });
  const targetMarkets = useGlobalPicklistValues({
    logicRole: 'TARGET_MARKET',
  });
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter(user => user.enabled);

  const isAccountAdmin = useIsAccountAdmin();

  const isDateSelectValue = (dateValue: string) =>
    ['today', 'next_7_days', 'next_30_days', 'since_today', 'all_time'].includes(dateValue);

  const dateType =
    !isPlainObject(dateFilter) && Array.isArray(dateFilter)
      ? dateFilter[0]?.value?.type
      : dateFilter;
  const dateFilterValue = isDateSelectValue(dateType) ? dateType : 'customValue';

  useEffect(() => () => resetFilters(), []);

  const generateCadenceSelectItems = useCallback(() => {
    const items: Array<object> = [];

    Object.keys(cadencesByBobjectType)?.forEach(bobjectTypeId => {
      items.push(
        <Section key={bobjectTypeId} id={getBobjectTypeName(bobjectTypeId)}>
          {getBobjectTypeName(bobjectTypeId)}
        </Section>,
      );

      cadencesByBobjectType[bobjectTypeId]?.forEach((cadence: object) => {
        items.push(
          <Item
            section={getBobjectTypeName(bobjectTypeId)}
            label={cadence?.name}
            key={cadence?.id}
            value={cadence?.id}
          >
            {cadence?.name}
          </Item>,
        );
      });
    });

    return items;
  }, [cadencesByBobjectType]);

  return (
    <>
      <SubhomeFilters>
        <>
          <SubhomeFilterGroup>
            <>
              <Select
                size="small"
                value={dateFilterValue}
                onChange={value => {
                  setDateFilter(value);
                  setHaveFiltersBeenChanged(true);
                }}
                variant="filters"
                placeholder="Date"
              >
                <Item value="today">Today</Item>
                <Item value="next_7_days">Next 7 days</Item>
                <Item value="next_30_days">Next 30 days</Item>
                <Item value="since_today">Since today</Item>
                <Item value="all_time">All time</Item>
              </Select>
              <Select
                placeholder="Order"
                value={orderFilter}
                onChange={value => {
                  setOrderFilter(value);
                  setHaveFiltersBeenChanged(true);
                }}
                size="small"
                variant="filters"
              >
                <Item value="select">Scheduled date</Item>
                <Item value="scheduledDateDesc">Scheduled date most recent</Item>
                <Item value="highPriority">High priority</Item>
                <Item value="timeZone">Time zone</Item>
                <Item value="assignedDateMostRecent">Assigned date most recent</Item>
                <Item value="assignedDateOldest">Assigned date oldest</Item>
                <Item value="lastAttemptMostRecent">Last attempt most recent</Item>
                <Item value="lastAttemptOldest">Last attempt oldest</Item>
                <Item value="lastUpdateMostRecent">Last update most recent</Item>
                <Item value="lastUpdateOldest">Last update oldest</Item>
              </Select>
              {isAccountAdmin && (
                <MultiSelect
                  placeholder={assignedToFilter ? 'Assigned to' : 'Me'}
                  size="small"
                  onChange={value => {
                    setAssignedToFilter(value);
                    setHaveFiltersBeenChanged(true);
                  }}
                  value={assignedToFilter || []}
                  selectAllOption
                  variant="filters"
                >
                  {users?.map(user => (
                    <CheckItem key={user.id} value={user.id}>
                      {user.value}
                    </CheckItem>
                  ))}
                </MultiSelect>
              )}
              <Select
                size="small"
                value={bobjectTypeFilter}
                onChange={value => {
                  setBobjectTypeFilter(value);
                  setHaveFiltersBeenChanged(true);
                }}
                variant="filters"
                placeholder="All tasks"
              >
                <Item key="All" value="all">
                  All
                </Item>
                {bobjectTypes.map(bobject => (
                  <Item key={bobject.id} value={bobject.name}>
                    {bobject.name}
                  </Item>
                ))}
              </Select>
              <Select
                size="small"
                value={cadencesFilter}
                onChange={value => {
                  setCadencesFilter(value);
                  setHaveFiltersBeenChanged(true);
                }}
                variant="filters"
                placeholder="Cadence"
                autocomplete={cadences?.length > 10}
              >
                {generateCadenceSelectItems()}
              </Select>
              {![BOBJECT_TYPES.LEAD, BOBJECT_TYPES.OPPORTUNITY].includes(bobjectTypeFilter) && (
                <MultiSelect
                  placeholder="Target markets"
                  size="small"
                  onChange={value => {
                    setTargetMarketsFilter(value);
                    setHaveFiltersBeenChanged(true);
                  }}
                  value={targetMarketsFilter || []}
                  variant="filters"
                >
                  <CheckItem value="all">All</CheckItem>
                  {sortBy(targetMarkets, 'value')?.map(targetMarket => (
                    <CheckItem key={targetMarket.id} value={targetMarket.id}>
                      {targetMarket.value}
                    </CheckItem>
                  ))}
                </MultiSelect>
              )}
              {![BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.OPPORTUNITY].includes(bobjectTypeFilter) && (
                <MultiSelect
                  size="small"
                  value={buyerPersonaFilter || []}
                  onChange={value => {
                    setBuyerPersonaFilter(value);
                    setHaveFiltersBeenChanged(true);
                  }}
                  variant="filters"
                  placeholder="Buyer persona"
                >
                  <CheckItem key="All" value="all">
                    All
                  </CheckItem>
                  {buyerPersonas.map(buyerPersona => (
                    <CheckItem key={buyerPersona.id} value={buyerPersona.id}>
                      {buyerPersona.value}
                    </CheckItem>
                  ))}
                </MultiSelect>
              )}
              {!usingDefaultFilters && (
                <div className={styles._clear_wrapper}>
                  <Button
                    variant="clear"
                    color="bloobirds"
                    iconLeft="cross"
                    onClick={() => {
                      resetFilters();
                      setHaveFiltersBeenChanged(false);
                    }}
                  >
                    CLEAR
                  </Button>
                </div>
              )}
            </>
          </SubhomeFilterGroup>
          <SubhomeFilterGroup>
            <>
              <div className={styles._quick_filter_wrapper}>
                <Chip
                  size="small"
                  selected={showSuccessfullySentFilter}
                  onClick={setShowSuccessfullySentFilter}
                >
                  Successfully sent
                </Chip>
                <Chip
                  size="small"
                  selected={showFailedSentFilter}
                  onClick={setShowFailedSentFilter}
                >
                  Failed
                </Chip>
                <Chip
                  size="small"
                  selected={showRescheduledFilter}
                  onClick={setShowRescheduledFilter}
                >
                  Rescheduled
                </Chip>
                <Chip size="small" selected={showPausedFilter} onClick={setShowPausedFilter}>
                  Paused
                </Chip>
              </div>
            </>
          </SubhomeFilterGroup>
        </>
      </SubhomeFilters>
    </>
  );
};
