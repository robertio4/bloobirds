import React, { useEffect, useState } from 'react';
import { isEmpty, sortBy } from 'lodash';
import {
  Button,
  CheckItem,
  InputPicker,
  InputPickerOption,
  Item,
  MultiSelect,
  RelativeDatePicker,
  Select,
  Input,
  Icon,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { usePicklistValues } from '../../../../hooks';
import DoubleInput from '../doubleInput/doubleInput';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  SubhomeFilterGroup,
  SubhomeFilters,
} from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useSalesInactiveOppsFilters } from './useSalesInactiveOpps';
import styles from './inactiveOpps.module.css';
import { useFiltersModal } from '../../../../hooks/useFiltersModal';
import FiltersModal from '../../../../components/filtersModal/filtersModal';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { inactiveOppsFilterFields } from './inactiveOpps.constant';
import { QuickFilterModal } from '../../prospectingPage/quickFilterModal/quickFilterModal';
import { QuickFilter } from '../../prospectingPage/quickFilter/quickFilter';
import { useFilterGroups } from '../../../../hooks/useFilterGroups';
import { useQuickFilterModal } from '../../../../hooks/useQuickFilterModal';
import { isObject } from 'lodash/lang';
import { SALES_PAGES } from '../useSales.constants';

export const InactiveOppsFilters = () => {
  const {
    amountFilter,
    creationDateFilter,
    orderFilter,
    assignedToFilter,
    stagesFilter,
    moreFilters,
    setOrderFilter,
    setAssignedToFilter,
    setStagesFilter,
    setAmountFilter,
    setMoreFilters,
    setCreationDateFilter,
    resetAllFilters,
    usingDefaultFilters,
    setAllFiltersGroup,
    setFilterGroup,
    isOneQuickFilterSelected,
    filtersGroups: quickFilters,
  } = useSalesInactiveOppsFilters();

  const { filterGroups, setDefaultFilterGroup } = useFilterGroups(SALES_PAGES.INACTIVE);

  const {
    openQuickFiltersModal,
    isOpen: isOpenQuickFilterModal,
    setQuickFilter,
    isDelete,
    isEditName,
  } = useQuickFilterModal();
  const [filterHasChanged, setFilterHasChanged] = useState(false);

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });
  const isAccountAdmin = useIsAccountAdmin();
  const stages = usePicklistValues({ picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS });
  const { openFiltersModal, isOpen: isOpenFiltersModal, closeFiltersModal } = useFiltersModal();

  const getFilters = () => {
    const filters = {};

    if (amountFilter) {
      filters[OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT] = amountFilter;
    }

    if (stagesFilter) {
      filters[OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS] = stagesFilter;
    }

    if (assignedToFilter) {
      filters[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedToFilter;
    }

    if (creationDateFilter.start) {
      filters[OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME] = {
        type: 'RANGE__SEARCH__BETWEEN__DATES',
        value: creationDateFilter,
      };
    }

    return { ...filters, ...moreFilters };
  };

  useEffect(() => () => resetAllFilters(), []);

  useEffect(() => {
    if (filterGroups && Array.isArray(filterGroups)) {
      setAllFiltersGroup(filterGroups);
      const defaultFilter = filterGroups.find(fg => fg.defaultGroup);
      if (defaultFilter) {
        setQuickFilter(defaultFilter);
      }
    }
  }, [filterGroups]);

  useEffect(() => {
    if (quickFilters) {
      const defaultFilter =
        isObject(quickFilters) && Object.keys(quickFilters).find(key => quickFilters[key].selected);
      if (defaultFilter && isOneQuickFilterSelected) {
        setQuickFilter({ id: defaultFilter, ...quickFilters[defaultFilter] });
      }
      if (!isOneQuickFilterSelected && !isDelete && !isEditName) {
        setQuickFilter({});
      }
    }
  }, [quickFilters, isOneQuickFilterSelected, isDelete, isEditName]);

  return (
    <>
      <SubhomeFilters>
        <>
          <SubhomeFilterGroup>
            <Select
              placeholder="Order"
              value={orderFilter || 'closeDateOldest'}
              onChange={value => {
                setOrderFilter(value);
                setFilterHasChanged(true);
              }}
              size="small"
              variant="filters"
            >
              <Item value="closeDateOldest">Close date oldest</Item>
              <Item value="closeDateRecent">Close date most recent</Item>
              <Item value="stage">State</Item>
              <Item value="amount">Amount</Item>
              <Item value="creationDateRecent">Creation date most recent</Item>
              <Item value="creationDateOldest">Creation date oldest</Item>
              <Item value="lastUpdateRecent">Last update most recent</Item>
              <Item value="lastUpdateOldest">Last update oldest</Item>
            </Select>
            <div className={styles.filter_relative_date}>
              <RelativeDatePicker
                value={creationDateFilter.start ? creationDateFilter : null}
                variant="filters"
                onChange={value => {
                  setCreationDateFilter(value);
                  setFilterHasChanged(true);
                }}
                placeholder="Creation date"
                size="small"
              />
            </div>
            {isAccountAdmin && (
              <MultiSelect
                placeholder={assignedToFilter ? 'Assigned to' : 'Me'}
                size="small"
                onChange={value => {
                  setAssignedToFilter(value);
                  setFilterHasChanged(true);
                }}
                value={assignedToFilter || []}
                selectAllOption
                variant="filters"
              >
                {users.map(user => (
                  <CheckItem key={user.id} value={user.id}>
                    {user.value}
                  </CheckItem>
                ))}
              </MultiSelect>
            )}
            <MultiSelect
              placeholder="Stages"
              size="small"
              onChange={value => {
                setStagesFilter(value);
                setFilterHasChanged(true);
              }}
              value={stagesFilter || []}
              variant="filters"
            >
              <CheckItem value="all">All</CheckItem>
              {sortBy(stages, 'value').map(stage => (
                <CheckItem key={stage.id} value={stage.id}>
                  {stage.value}
                </CheckItem>
              ))}
            </MultiSelect>
            <InputPicker
              placeholder="Amount"
              onChange={value => {
                setAmountFilter(value);
                setFilterHasChanged(true);
              }}
              value={amountFilter}
              variant="filters"
            >
              <InputPickerOption title="Is greater than" type="RANGE__SEARCH__GT">
                <Input type="number" placeholder="Is greater than..." width="90%" />
              </InputPickerOption>
              <InputPickerOption title="Is less than" type="RANGE__SEARCH__LT">
                <Input type="number" placeholder="Is less than..." width="90%" />
              </InputPickerOption>
              <InputPickerOption title="Is greater or equal than" type="RANGE__SEARCH__GTE">
                <Input type="number" placeholder="Is greater or equal than..." width="90%" />
              </InputPickerOption>
              <InputPickerOption title="Is less or equal than" type="RANGE__SEARCH__LTE">
                <Input type="number" placeholder="Is less or equal than..." width="90%" />
              </InputPickerOption>
              <InputPickerOption title="Between" type="RANGE__SEARCH__BETWEEN">
                <DoubleInput type="number" placeholder="Between..." width="80%" />
              </InputPickerOption>
              <InputPickerOption title="Contains exactly" type="EXACT__SEARCH">
                <Input type="number" placeholder="Contains exactly..." width="90%" />
              </InputPickerOption>
              <InputPickerOption title="It's not empty" type="IS__NOT__EMPTY" />
              <InputPickerOption title="It's empty" type="IS__EMPTY" width="90%" />
            </InputPicker>
            <div className={styles._filter_wrapper}>
              <div
                className={styles._more_filter_input}
                onClick={() =>
                  !isOpenFiltersModal
                    ? openFiltersModal({
                        bobjectTypesToSet: [BOBJECT_TYPES.OPPORTUNITY],
                      })
                    : closeFiltersModal()
                }
              >
                {isEmpty(moreFilters)
                  ? 'More filters'
                  : `More filters (${Object.keys(moreFilters).length})`}
                <Icon name="filter" size={12} color="softPeanut" />
              </div>
            </div>
          </SubhomeFilterGroup>
          <SubhomeFilterGroup>
            <Text color="softPeanut" size="s" className={styles._filters__title}>
              Quick filters:
            </Text>
            {isObject(quickFilters) &&
              quickFilters &&
              Object.keys(quickFilters).map(key => (
                <QuickFilter
                  key={`quick-filter-${key}`}
                  quickFilter={{ ...quickFilters[key], id: key }}
                  setFilterGroup={setFilterGroup}
                  setDefaultFilterGroup={setDefaultFilterGroup}
                  resetAllFilters={resetAllFilters}
                />
              ))}
            {!usingDefaultFilters && (
              <div>
                {filterHasChanged && (
                  <Button iconLeft="save" onClick={() => openQuickFiltersModal()} variant="clear">
                    {isOneQuickFilterSelected ? 'EDIT' : 'SAVE'}
                  </Button>
                )}
                <Button
                  variant="clear"
                  color="bloobirds"
                  iconLeft="cross"
                  onClick={resetAllFilters}
                >
                  CLEAR
                </Button>
              </div>
            )}
          </SubhomeFilterGroup>
        </>
      </SubhomeFilters>
      {isOpenFiltersModal && (
        <FiltersModal
          values={getFilters()}
          config={{
            filterFieldsMethod: field => !inactiveOppsFilterFields.includes(field?.logicRole),
          }}
          handleSave={filters => {
            setFilterHasChanged(true);
            setMoreFilters(filters);
          }}
        />
      )}
      {isOpenQuickFilterModal && (
        <QuickFilterModal
          filters={getFilters()}
          tabName={SALES_PAGES.INACTIVE}
          resetAllFilters={resetAllFilters}
        />
      )}
    </>
  );
};
