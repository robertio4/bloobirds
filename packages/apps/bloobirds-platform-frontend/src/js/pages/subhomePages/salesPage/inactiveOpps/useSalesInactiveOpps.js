import { useEffect, useMemo, useState } from 'react';
import { isEmpty, isEqual } from 'lodash';
import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { differenceInDays } from '@bloobirds-it/utils';
import { getRangeQuery, buildSubhomeFilters, buildMoreFilters } from '../salesPage.utils';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '../../../../constants/opportunity';
import SessionManagerFactory from '../../../../misc/session';
import { useSalesItems, useSalesFutureTasks } from '../useSales';
import {
  changeFieldIdsToLogicRoles,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { useSearchSubscription } from '@bloobirds-it/plover';
import { useEntity } from '../../../../hooks';
import { OPPORTUNITY_COLUMNS, OPPORTUNITY_REFERENCED_COLUMNS } from '../useSales.constants';
import { inactiveOppsFilterFields } from './inactiveOpps.constant';
import {
  configureFilterGroups,
  FILTER_GROUP_TYPE,
  isOneSelected,
  resetFilterGroup,
} from '../../../../utils/filterGroups.utils';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import mixpanel from 'mixpanel-browser';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';

const SessionManager = SessionManagerFactory();

const MORE_FILTER_KEYS = {
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: 'amount',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: 'stage',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: 'creationDate',
};

const SORT_FIELDS = {
  closeDateOldest: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
      direction: 'ASC',
    },
  ],
  closeDateRecent: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
      direction: 'DESC',
    },
  ],
  amount: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
      direction: 'ASC',
    },
  ],
  stage: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
      direction: 'ASC',
    },
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
      direction: 'DESC',
    },
  ],
  creationDateRecent: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
      direction: 'DESC',
    },
  ],
  creationDateOldest: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
      direction: 'ASC',
    },
  ],
  lastUpdateRecent: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME,
      direction: 'ASC',
    },
  ],
};

const defaultOrderFilter = 'closeDateOldest';

const defaultCreationDateFilter = {
  start: null,
  end: null,
};

const orderFilterAtom = atom({
  key: 'salesInactiveOrderFilter',
  default: defaultOrderFilter,
});

const assignedToFilterAtom = atom({
  key: 'salesInactiveAssignedToFilter',
  default: null,
});

const stagesFilterAtom = atom({
  key: 'salesInactiveStagesFilter',
  default: null,
});

const amountFilterAtom = atom({
  key: 'salesInactiveAmountFilter',
  default: null,
});

const activeStatusesIds = atom({
  key: 'activeStatusesIds',
  default: [],
});

const creationDateFilterAtom = atom({
  key: 'salesInactiveCreationDateFilter',
  default: defaultCreationDateFilter,
});

const moreFiltersAtom = atom({
  key: 'salesInactiveMoreFilters',
  default: null,
});

const baseQueryAtom = selector({
  key: 'salesInactiveBaseQueryAtom',
  get: ({ get }) => {
    const activeOpportunityStatus = get(activeStatusesIds);

    return {
      [OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
      [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: activeOpportunityStatus,
    };
  },
});

const filtersGroupAtom = atom({
  key: 'salesInactiveFiltersGroup',
  default: {},
});

const filtersAtom = selector({
  key: 'salesInactiveFilters',
  get: ({ get }) => {
    const orderFilter = get(orderFilterAtom);
    const assignedToFilter = get(assignedToFilterAtom);
    const stagesFilter = get(stagesFilterAtom);
    const amountFilter = get(amountFilterAtom);
    const creationDateFilter = get(creationDateFilterAtom);
    const moreFilters = get(moreFiltersAtom);

    return {
      order: orderFilter,
      assignedTo: assignedToFilter,
      stage: stagesFilter,
      amount: amountFilter,
      creationDate: creationDateFilter,
      moreFilters,
    };
  },
  set: ({ set, reset }, value) => {
    if (value instanceof DefaultValue) {
      reset(orderFilterAtom);
      reset(assignedToFilterAtom);
      reset(stagesFilterAtom);
      reset(amountFilterAtom);
      reset(creationDateFilterAtom);
      reset(moreFiltersAtom);
    } else {
      if (value.order) set(orderFilterAtom, value.order);
      if (value.assignedTo) set(assignedToFilterAtom, value.assignedTo);
      if (value.stage) set(stagesFilterAtom, value.stage);
      if (value.amount) set(amountFilterAtom, value.amount);
      if (value.creationDate) set(creationDateFilterAtom, value.creationDate);
      if (value.moreFilters) set(moreFiltersAtom, value.moreFilters);
      mixpanel.track(`${MIXPANEL_EVENTS.FILTERS_CHANGED_IN_}INACTIVE_OPPS_TAB`, {
        Order: value?.order,
        'Assigned To': value?.assignedTo,
        Stage: value?.stage,
        Type: value?.type,
        Amount: value?.amount,
        'Creation Date': value?.creationDate,
        'More filters': value?.moreFilters,
      });
    }
  },
});

const queryAtom = selector({
  key: 'salesInactiveOppsQuery',
  get: ({ get }) => {
    const filters = get(filtersAtom);
    const baseQuery = get(baseQueryAtom);

    let companyFilters = {};
    let opportunityFilters = {};

    if (!isEmpty(filters.moreFilters)) {
      Object.keys(filters.moreFilters).forEach(key => {
        const companyRegex = /COMPANY__*/;
        const opportunityRegex = /OPPORTUNITY__*/;

        if (companyRegex.test(key)) {
          companyFilters = { ...companyFilters, [key]: filters.moreFilters[key] };
        }
        if (opportunityRegex.test(key)) {
          opportunityFilters = { ...opportunityFilters, [key]: filters.moreFilters[key] };
        }
      });
    }

    const query = {
      ...baseQuery,
      ...(!isEmpty(companyFilters)
        ? {
            [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: {
              query: {
                ...companyFilters,
              },
              searchMode: 'SUBQUERY__SEARCH',
            },
          }
        : null),
      ...opportunityFilters,
    };

    if (filters.stage) {
      query[OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS] = filters.stage;
    }

    if (filters.amount?.type) {
      query[OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT] = getRangeQuery(filters.amount);
    }

    if (filters.assignedTo && filters.assignedTo?.length > 0) {
      query[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = filters.assignedTo;
    }

    if (filters.creationDate.start) {
      query[OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME] = {
        query: {
          gte: filters.creationDate.start,
          lte: filters.creationDate.end,
        },
        searchMode: 'RANGE__SEARCH',
      };
    }

    return query;
  },
});

const sortAtom = selector({
  key: 'salesInactiveOppSort',
  get: ({ get }) => {
    const filters = get(filtersAtom);

    return SORT_FIELDS[filters.order];
  },
});

export const useSalesInactiveOppsAggregation = () => {
  const query = useRecoilValue(baseQueryAtom);
  const [activeOpportunityStatuses, setActiveOpportunityStatuses] = useRecoilState(
    activeStatusesIds,
  );
  const opportunityStatusField = useEntity('bobjectFields')?.findByLogicRole(
    OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  );
  const picklistValues = useEntity('bobjectPicklistFieldValues');
  const futureTasks = useSalesFutureTasks();

  useEffect(() => {
    const values = picklistValues
      ?.filterBy('bobjectField')(opportunityStatusField?.id)
      ?.filter(st => !Object.values(OPPORTUNITY_STATUS_LOGIC_ROLE).includes(st?.logicRole))
      ?.map(st => st?.id);
    setActiveOpportunityStatuses(values);
  }, [picklistValues]);

  const { data: { data: { contents: opportunities } = {} } = {} } = useSearchSubscription(
    activeOpportunityStatuses?.length > 0 && {
      query,
      columns: OPPORTUNITY_COLUMNS,
      referencedColumns: OPPORTUNITY_REFERENCED_COLUMNS,
      formFields: true,
      pageSize: 1000,
      injectReferences: false,
    },
    BOBJECT_TYPES.OPPORTUNITY,
  );
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  useEffect(() => {
    if (opportunities) {
      const missingOpportunities = [];
      if (opportunities?.length > 0) {
        opportunities.forEach(opportunity => {
          const hasFutureTasks = futureTasks?.find(task => {
            const taskCompany = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY);
            return taskCompany === opportunity?.id.value;
          });

          if (!hasFutureTasks) {
            missingOpportunities.push(opportunity);
          }
        });
        setFilteredOpportunities(missingOpportunities);
      }
      if (opportunities?.length > 0 && futureTasks?.length === 0) {
        setFilteredOpportunities(opportunities);
      }
    }
  }, [opportunities, futureTasks]);

  return filteredOpportunities?.length;
};

export const useSalesInactiveOppsFilters = () => {
  const orderFilter = useRecoilValue(orderFilterAtom);
  const assignedToFilter = useRecoilValue(assignedToFilterAtom);
  const stagesFilter = useRecoilValue(stagesFilterAtom);
  const amountFilter = useRecoilValue(amountFilterAtom);
  const creationDateFilter = useRecoilValue(creationDateFilterAtom);
  const moreFilters = useRecoilValue(moreFiltersAtom);
  const filtersGroups = useRecoilValue(filtersGroupAtom);
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();

  const resetOrderFilter = useResetRecoilState(orderFilterAtom);
  const resetAssignedToFilter = useResetRecoilState(assignedToFilterAtom);
  const resetStagesFilter = useResetRecoilState(stagesFilterAtom);
  const resetAmountFilter = useResetRecoilState(amountFilterAtom);
  const resetCreationDateFilter = useResetRecoilState(creationDateFilterAtom);
  const resetMoreFilters = useResetRecoilState(moreFiltersAtom);
  const resetAllFilters = useResetRecoilState(filtersAtom);
  const resetFiltersGroups = useResetRecoilState(filtersGroupAtom);

  const setFilters = useSetRecoilState(filtersAtom);
  const setFiltersGroup = useSetRecoilState(filtersGroupAtom);

  const applyFilterGroup = filtersToApply => {
    if (!filtersToApply) {
      return;
    }
    const filtersBuild = buildSubhomeFilters({
      filtersToApply,
      subhomeFilters: inactiveOppsFilterFields,
      bobjectFields,
    });
    const moreFiltersBuild = buildMoreFilters({
      filtersToApply,
      subhomeFilters: inactiveOppsFilterFields,
      bobjectFields,
      bobjectTypes,
      moreFiltersApplied: moreFilters,
    });
    const filters = { ...filtersBuild, moreFilters: moreFiltersBuild };
    if (!isEmpty(filters)) {
      setFilters(filters);
    }
  };

  const FILTERS_DATA = {
    assignedTo: {
      data: assignedToFilter,
      reset: resetAssignedToFilter,
      type: FILTER_GROUP_TYPE.ARRAY,
    },
    stage: {
      data: stagesFilter,
      reset: resetStagesFilter,
      type: FILTER_GROUP_TYPE.ARRAY,
    },
    amount: {
      data: amountFilter,
      reset: resetAmountFilter,
      type: FILTER_GROUP_TYPE.NUMBER,
    },
    moreFilters: {
      data: moreFilters,
      reset: resetMoreFilters,
      type: FILTER_GROUP_TYPE.OBJECT,
    },
  };

  const isOneQuickFilterSelected = useMemo(() => isOneSelected(filtersGroups), [filtersGroups]);

  const usingDefaultFilters = useMemo(
    () =>
      orderFilter === defaultOrderFilter &&
      !assignedToFilter &&
      !stagesFilter &&
      !amountFilter &&
      !Object.keys(filtersGroups || {}).some(k => filtersGroups[k].selected) &&
      (!moreFilters || isEmpty(moreFilters)) &&
      isEqual(creationDateFilter, defaultCreationDateFilter),
    [
      orderFilter,
      assignedToFilter,
      stagesFilter,
      amountFilter,
      creationDateFilter,
      moreFilters,
      filtersGroups,
    ],
  );

  return {
    orderFilter,
    assignedToFilter,
    stagesFilter,
    amountFilter,
    creationDateFilter,
    moreFilters,
    usingDefaultFilters,
    resetOrderFilter,
    resetAssignedToFilter,
    resetStagesFilter,
    resetAmountFilter,
    resetCreationDateFilter,
    resetMoreFilters,
    filtersGroups,
    resetFiltersGroups,
    isOneQuickFilterSelected,
    resetAllFilters: () => {
      resetAllFilters();
      setFiltersGroup(configureFilterGroups(filtersGroups));
    },
    setFilterGroup: filterId => {
      const filter = filtersGroups[filterId];
      if (!filter?.selected) {
        applyFilterGroup(filter?.filters);
        setFiltersGroup({ ...filtersGroups, [filterId]: { ...filter, selected: true } });
      } else {
        resetFilterGroup({
          filtersToReset: filter?.filters,
          defaultFilters: inactiveOppsFilterFields,
          filtersData: FILTERS_DATA,
          bobjectFields,
          setFilters,
        });
        setFiltersGroup({ ...filtersGroups, [filterId]: { ...filter, selected: false } });
      }
    },
    setAllFiltersGroup: values => {
      let defaultGroup;
      setFiltersGroup(
        values.reduce((acc, curr) => {
          if (curr.defaultGroup) defaultGroup = curr.filters;
          return {
            ...acc,
            [curr.id]: {
              name: curr.name,
              tabName: curr.tabName,
              filters: curr.filters,
              defaultGroup: curr.defaultGroup,
              selected: curr.defaultGroup,
            },
          };
        }, {}),
      );
      if (defaultGroup) {
        applyFilterGroup(defaultGroup);
      }
    },
    setOrderFilter: value => {
      setFilters({ order: value });
    },
    setAssignedToFilter: value => {
      setFilters({ assignedTo: value });
    },
    setStagesFilter: value => {
      if (!isEqual(value, stagesFilter)) {
        if (value.includes('all')) {
          resetStagesFilter();
          return;
        }
        setFilters({ stage: value });
      }
    },
    setAmountFilter: value => {
      if (!isEqual(value, amountFilter)) {
        if (!amountFilter?.type) {
          setFilters({ amount: value });
        } else {
          const isNotEqualValue = amountFilter.value !== value.value;
          const isNotEqualType = amountFilter.type !== value.type;
          if (isNotEqualType || isNotEqualValue) {
            setFilters({ amount: value });
          }
        }
      }
    },
    setCreationDateFilter: value => {
      if (!isEqual(value, creationDateFilter)) {
        if (!creationDateFilter.start) {
          setFilters({ creationDate: value });
        } else {
          // Check that day has changed
          const diffStart = differenceInDays(creationDateFilter.start, value.start);
          const diffEnd = differenceInDays(creationDateFilter.end, value.end);
          if (diffStart !== 0 || diffEnd !== 0) {
            setFilters({ creationDate: value });
          }
        }
      }
    },
    setMoreFilters: value => {
      const moreFiltersValues = changeFieldIdsToLogicRoles({ query: value, bobjectFields });
      let parsedMoreFilters = {};

      Object.keys(moreFiltersValues).forEach(fieldId => {
        if (MORE_FILTER_KEYS[fieldId]) {
          if (MORE_FILTER_KEYS[fieldId] === 'creationDate') {
            parsedMoreFilters = {
              ...parsedMoreFilters,
              [MORE_FILTER_KEYS[fieldId]]:
                moreFiltersValues[fieldId][0]?.value || moreFiltersValues[fieldId]?.value,
            };
          } else if (MORE_FILTER_KEYS[fieldId] === 'amount') {
            parsedMoreFilters = {
              ...parsedMoreFilters,
              [MORE_FILTER_KEYS[fieldId]]:
                moreFiltersValues[fieldId][0] || moreFiltersValues[fieldId],
            };
          } else {
            parsedMoreFilters = {
              ...parsedMoreFilters,
              [MORE_FILTER_KEYS[fieldId]]: moreFiltersValues[fieldId],
            };
          }
        } else {
          parsedMoreFilters = {
            ...parsedMoreFilters,
            moreFilters: { ...moreFilters, [fieldId]: moreFiltersValues[fieldId] },
          };
        }
      });

      resetAllFilters();
      if (!isEmpty(parsedMoreFilters)) {
        setFilters(parsedMoreFilters);
      }
    },
  };
};

export const useSalesOppsInactive = () => {
  const bobjectFields = useEntity('bobjectFields');

  const query = useRecoilValue(queryAtom);
  const filteredUser =
    query && query[bobjectFields?.findByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id];
  const sort = useRecoilValue(sortAtom);
  const { items: opportunities, ...other } = useSalesItems(
    query,
    [{ [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'] }],
    sort,
    null,
    BOBJECT_TYPES.OPPORTUNITY,
  );
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const futureTasks = useSalesFutureTasks(filteredUser);

  useEffect(() => {
    const missingOpportunities = [];
    if (opportunities?.length > 0) {
      opportunities.forEach(opportunity => {
        const hasFutureTasks = futureTasks.find(task => {
          const taskOpportunity = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY);
          return taskOpportunity === opportunity?.id.value;
        });

        if (!hasFutureTasks) {
          missingOpportunities.push(opportunity);
        }
      });
      setFilteredOpportunities(missingOpportunities);
    } else {
      setFilteredOpportunities(null);
    }
  }, [opportunities, futureTasks]);

  return {
    ...other,
    items: filteredOpportunities || [],
    totalMatching: filteredOpportunities?.length,
  };
};
