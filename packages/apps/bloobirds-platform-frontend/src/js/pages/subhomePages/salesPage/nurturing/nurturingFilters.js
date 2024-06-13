import React, { useCallback, useEffect, useState } from 'react';
import { isEmpty, sortBy } from 'lodash';
import {
  Button,
  CheckItem,
  Icon,
  Input,
  InputPicker,
  InputPickerOption,
  Item,
  MultiSelect,
  Section,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { usePicklistValues } from '../../../../hooks';
import DoubleInput from '../doubleInput/doubleInput';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  SubhomeFilterGroup,
  SubhomeFilters,
} from '../../../../layouts/subhomeLayout/subhomeContent/subhomeFilters/subhomeFilters';
import { useSalesFollowUpFilters } from './useSalesNurturing';
import styles from './nurturing.module.css';
import { useFiltersModal } from '../../../../hooks/useFiltersModal';
import FiltersModal from '../../../../components/filtersModal/filtersModal';
import { TASK_ACTION, TASK_ACTION_VALUE, BOBJECT_TYPES } from '@bloobirds-it/types';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { followUpFilterFields } from './nurturing.constant';
import { useFilterGroups } from '../../../../hooks/useFilterGroups';
import { useQuickFilterModal } from '../../../../hooks/useQuickFilterModal';
import { QuickFilter } from '../../prospectingPage/quickFilter/quickFilter';
import { QuickFilterModal } from '../../prospectingPage/quickFilterModal/quickFilterModal';
import { isObject } from 'lodash/lang';
import { PluralBobjectTypes } from '../../../../typings/bobjects';
import { SALES_PAGES } from '../useSales.constants';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { useCadences } from '../../../../hooks/useCadences';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';

export const NurturingFilters = () => {
  const {
    amountFilter,
    dateFilter,
    orderFilter,
    assignedToFilter,
    stagesFilter,
    typesFilter,
    cadencesFilter,
    taskTypesFilter,
    moreFilters,
    setOrderFilter,
    setDateFilter,
    setAssignedToFilter,
    setStagesFilter,
    setCadencesFilter,
    setTypesFilter,
    setTaskTypesFilter,
    setAmountFilter,
    setMoreFilters,
    resetAllFilters,
    usingDefaultFilters,
    setAllFiltersGroup,
    setFilterGroup,
    isOneQuickFilterSelected,
    filtersGroups: quickFilters,
  } = useSalesFollowUpFilters();
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });
  const hasSalesEnabled = useFullSalesEnabled();
  const [filterHasChanged, setFilterHasChanged] = useState(false);
  const bobjectTypes = [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.OPPORTUNITY];

  const { filterGroups, setDefaultFilterGroup } = useFilterGroups(SALES_PAGES.FOLLOW_UP);
  const isFilteringTasksByOpportunity =
    taskTypesFilter &&
    taskTypesFilter[0] === BOBJECT_TYPES.OPPORTUNITY &&
    taskTypesFilter.length === 1;

  const {
    openQuickFiltersModal,
    isOpen: isOpenQuickFilterModal,
    setQuickFilter,
    isDelete,
    isEditName,
  } = useQuickFilterModal();

  const availableBobjects = [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.OPPORTUNITY];
  const cadenceFilteredBobjectTypes = useBobjectTypes()
    ?.all()
    ?.filter(bobject => {
      return availableBobjects.includes(bobject.name);
    });
  const bobjectTypesNames = cadenceFilteredBobjectTypes.map(type => type?.name);
  const { cadences } = useCadences(bobjectTypesNames);

  let cadencesByBobjectType = {};
  cadences?.forEach(cadence => {
    const cadenceBobjectType = cadence?.bobjectType;
    const newNode = cadencesByBobjectType[cadenceBobjectType]
      ? [...cadencesByBobjectType[cadenceBobjectType], cadence]
      : [cadence];
    cadencesByBobjectType = { ...cadencesByBobjectType, [cadenceBobjectType]: newNode };
  });
  const getBobjectTypeName = bobjectTypeId =>
    cadenceFilteredBobjectTypes?.find(bobjectType => bobjectType?.id === bobjectTypeId)?.name;

  const isAccountAdmin = useIsAccountAdmin();
  const stages = usePicklistValues({ picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS });
  const { openFiltersModal, isOpen: isOpenFiltersModal, closeFiltersModal } = useFiltersModal();
  const getFilters = () => {
    const filters = {};

    if (amountFilter.type !== '') {
      filters[OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT] = amountFilter;
    }

    if (stagesFilter) {
      filters[OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS] = stagesFilter;
    }

    if (assignedToFilter) {
      filters[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedToFilter;
    }

    if (typesFilter) {
      if (Array.isArray(typesFilter)) {
        typesFilter.forEach(tf => {
          filters[TASK_ACTION[tf]] = TASK_ACTION_VALUE[`${tf}_YES`];
        });
      } else {
        filters[TASK_ACTION[typesFilter]] = TASK_ACTION_VALUE[`${typesFilter}_YES`];
      }
    }

    return { ...filters, ...moreFilters };
  };

  useEffect(() => () => resetAllFilters(), []);

  const generateCadenceSelectItems = useCallback(() => {
    const items = [];

    Object.keys(cadencesByBobjectType)?.forEach(bobjectTypeId => {
      items.push(
        <Section key={bobjectTypeId} id={getBobjectTypeName(bobjectTypeId)}>
          {getBobjectTypeName(bobjectTypeId)}
        </Section>,
      );

      cadencesByBobjectType[bobjectTypeId]?.forEach(cadence => {
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
              size="small"
              value={dateFilter}
              onChange={value => {
                setDateFilter(value);
                setFilterHasChanged(true);
              }}
              variant="filters"
              placeholder="Date"
            >
              <Item value="today">Today</Item>
              <Item value="next_7_days">Next 7 days</Item>
              <Item value="next_30_days">Next 30 days</Item>
              <Item value="since_today">Since today</Item>
              <Item value="more_than_6_month">More than 6 months</Item>
              <Item value="all_time">All time</Item>
            </Select>
            <Select
              placeholder="Order"
              value={orderFilter}
              onChange={value => {
                setOrderFilter(value);
                setFilterHasChanged(true);
              }}
              size="small"
              variant="filters"
            >
              <Item value="select">Scheduled date</Item>
              <Item value="closeDateOldest">Close date oldest</Item>
              <Item value="closeDateRecent">Close date most recent</Item>
              <Item value="stage">State</Item>
              <Item value="amount">Amount</Item>
              <Item value="creationDateRecent">Creation date most recent</Item>
              <Item value="creationDateOldest">Creation date oldest</Item>
              <Item value="lastUpdateRecent">Last update most recent</Item>
              <Item value="lastUpdateOldest">Last update oldest</Item>
            </Select>
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
            {hasSalesEnabled && (
              <MultiSelect
                placeholder={'Tasks'}
                size="small"
                onChange={value => {
                  setTaskTypesFilter(value);
                  setFilterHasChanged(true);
                }}
                value={taskTypesFilter || []}
                selectAllOption
                variant="filters"
              >
                {bobjectTypes.map(bobject => (
                  <CheckItem key={`followUp-filter-${bobject}`} value={bobject}>
                    {PluralBobjectTypes[bobject]}
                  </CheckItem>
                ))}
              </MultiSelect>
            )}
            {isFilteringTasksByOpportunity && (
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
            )}
            <Select
              size="small"
              value={cadencesFilter}
              onChange={value => {
                setCadencesFilter(value);
                setFilterHasChanged(true);
              }}
              variant="filters"
              placeholder="Cadence"
              autocomplete={cadences?.length > 10}
            >
              {generateCadenceSelectItems()}
            </Select>
            <MultiSelect
              placeholder="Types"
              size="small"
              onChange={value => {
                setTypesFilter(value);
                setFilterHasChanged(true);
              }}
              value={typesFilter || []}
              variant="filters"
            >
              <Item value="">All</Item>
              <CheckItem value="CALL">Call</CheckItem>
              <CheckItem value="EMAIL">Email</CheckItem>
              <CheckItem value="LINKEDIN_MESSAGE">Linkedin</CheckItem>
            </MultiSelect>
            {isFilteringTasksByOpportunity && (
              <InputPicker
                placeholder="Amount"
                value={amountFilter}
                onChange={value => {
                  setAmountFilter(value);
                  setFilterHasChanged(true);
                }}
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
            )}
            <div className={styles._filter_wrapper}>
              <div
                className={styles._more_filter_input}
                onClick={() =>
                  !isOpenFiltersModal
                    ? openFiltersModal({
                        bobjectTypesToSet: [BOBJECT_TYPES.TASK],
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
              Object.keys(quickFilters).map(key => {
                if (hasSalesEnabled && quickFilters[key].name === 'Today Tasks') return null;
                return (
                  <QuickFilter
                    key={`quick-filter-${key}`}
                    quickFilter={{ ...quickFilters[key], id: key }}
                    setFilterGroup={setFilterGroup}
                    setDefaultFilterGroup={setDefaultFilterGroup}
                    resetAllFilters={resetAllFilters}
                  />
                );
              })}
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
            filterFieldsMethod: field => !followUpFilterFields.includes(field?.logicRole),
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
          tabName={SALES_PAGES.FOLLOW_UP}
          resetAllFilters={resetAllFilters}
        />
      )}
    </>
  );
};
