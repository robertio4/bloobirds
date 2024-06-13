import { useMemo } from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  BOBJECT_TYPES,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,} from '@bloobirds-it/types';
import { keepPreviousResponse } from '@bloobirds-it/utils';
import { addDays, addMonths, endOfDay, startOfDay } from 'date-fns';
import { isEmpty, isEqual, isPlainObject } from 'lodash';
import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { useEntity } from '../../../../hooks';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import SessionManagerFactory from '../../../../misc/session';
import {
  changeFieldIdsToLogicRoles,
  generateFiltersPerType,
} from '../../../../utils/bobjects.utils';
import { getSimpleDate } from '@bloobirds-it/utils';
import {
  configureFilterGroups,
  FILTER_GROUP_TYPE,
  isOneSelected,
  resetFilterGroup,
} from '../../../../utils/filterGroups.utils';
import { buildMoreFilters, buildSubhomeFilters, getRangeQuery } from '../salesPage.utils';
import { getTaskAggregationQuery, useSalesItems } from '../useSales';
import { apoinmentsFilterFields } from './apoinments.constant';

const SessionManager = SessionManagerFactory();

const MORE_FILTER_KEYS = {
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: 'amount',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: 'stage',
  [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: 'type',
};

const SORT_FIELDS = {
  closeDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'ASC',
    },
  ],
  closeDateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
  ],
  amount: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
  ],
  stage: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  select: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY}`,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  creationDateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME}`,
      direction: 'DESC',
    },
  ],
  creationDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME}`,
      direction: 'ASC',
    },
  ],
  lastUpdateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'ASC',
    },
  ],
};

const defaultAmountFilter = {
  type: '',
  value: '',
};

const defaultOrderFilter = 'select';
const defaultDateFilter = 'today';

const defaultOrder = [
  {
    field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    direction: 'ASC',
  },
  {
    field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
    direction: 'ASC',
  },
  {
    field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
    direction: 'ASC',
  },
];

const DATE_FILTER_FIELDS = {
  today: {
    query: {
      lte: getSimpleDate(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
  next_7_days: {
    query: {
      lte: getSimpleDate(endOfDay(addDays(new Date(), 7))),
    },
    searchMode: 'RANGE__SEARCH',
  },
  next_30_days: {
    query: {
      lte: getSimpleDate(endOfDay(addMonths(new Date(), 1))),
    },
    searchMode: 'RANGE__SEARCH',
  },
  since_today: {
    query: {
      gte: startOfDay(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
  more_than_6_month: {
    query: {
      gte: endOfDay(addMonths(new Date(), -6)),
      lte: endOfDay(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
};

const orderFilterAtom = atom({
  key: 'salesAppointmentsOrderFilter',
  default: defaultOrderFilter,
});

const dateFilterAtom = atom({
  key: 'salesAppointmentsDateFilter',
  default: defaultDateFilter,
});

const assignedToFilterAtom = atom({
  key: 'salesAppointmentsAssignedToFilter',
  default: null,
});

const stagesFilterAtom = atom({
  key: 'salesAppointmentsStagesFilter',
  default: null,
});

const typesFilterAtom = atom({
  key: 'salesAppointmentsTypesFilter',
  default: null,
});

const amountFilterAtom = atom({
  key: 'salesAppointmentsAmountFilter',
  default: defaultAmountFilter,
});

const moreFiltersAtom = atom({
  key: 'salesAppointmentsMoreFilters',
  default: null,
});

const pageAtom = atom({
  key: 'salesAppointmentsPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'salesAppointmentsHasNextPage',
  default: true,
});

const filtersGroupAtom = atom({
  key: 'salesAppointmentsFiltersGroup',
  default: {},
});

const filtersAtom = selector({
  key: 'salesAppointmentsFilters',
  get: ({ get }) => {
    const orderFilter = get(orderFilterAtom);
    const dateFilter = get(dateFilterAtom);
    const assignedToFilter = get(assignedToFilterAtom);
    const stagesFilter = get(stagesFilterAtom);
    const typesFilter = get(typesFilterAtom);
    const amountFilter = get(amountFilterAtom);
    const moreFilters = get(moreFiltersAtom);

    return {
      order: orderFilter,
      date: dateFilter,
      assignedTo: assignedToFilter,
      stage: stagesFilter,
      type: typesFilter,
      amount: amountFilter,
      moreFilters,
    };
  },
  set: ({ set, reset }, value) => {
    if (value instanceof DefaultValue) {
      reset(orderFilterAtom);
      reset(dateFilterAtom);
      reset(assignedToFilterAtom);
      reset(stagesFilterAtom);
      reset(typesFilterAtom);
      reset(amountFilterAtom);
      reset(moreFiltersAtom);
    } else {
      if (value.order) set(orderFilterAtom, value.order);
      if (value.date) set(dateFilterAtom, value.date);
      if (value.assignedTo) set(assignedToFilterAtom, value.assignedTo);
      if (value.stage) set(stagesFilterAtom, value.stage);
      if (value.type) set(typesFilterAtom, value.type);
      if (value.amount) set(amountFilterAtom, value.amount);
      if (value.moreFilters) set(moreFiltersAtom, value.moreFilters);
    }
    reset(hasNextPageAtom);
    reset(pageAtom);
  },
});

const queryAtom = selector({
  key: 'salesAppointmentsTasksQuery',
  get: ({ get }) => {
    const filters = get(filtersAtom);

    const { companyFilters, leadFilters, taskFilters } = generateFiltersPerType(filters);

    const scheduleDate = isPlainObject(filters.date)
      ? {
          query: {
            lte: filters.date?.query?.lte,
            gte: filters.date?.query?.gte,
          },
          searchMode: 'RANGE__SEARCH',
        }
      : DATE_FILTER_FIELDS[filters.date];

    const query = {
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'],
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]:
        filters.type?.length > 0 ? filters.type : [TASK_TYPE.MEETING, TASK_TYPE.NEXT_STEP],
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: scheduleDate,
      ...(!isEmpty(companyFilters)
        ? {
            [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
              query: {
                ...companyFilters,
              },
              searchMode: 'SUBQUERY__SEARCH',
            },
          }
        : null),
      ...(!isEmpty(leadFilters)
        ? {
            [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
              query: {
                ...leadFilters,
              },
              searchMode: 'SUBQUERY__SEARCH',
            },
          }
        : null),
      ...taskFilters,
    };

    if (filters.stage && filters.stage.length > 0) {
      query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = {
        query: {
          [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: {
            query: filters.stage,
          },
        },
        searchMode: 'SUBQUERY__SEARCH',
      };
    }

    if (filters.assignedTo && filters.assignedTo.length > 0) {
      query[TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = filters.assignedTo;
    }

    if (filters.amount?.type) {
      query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = {
        query: {
          [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: getRangeQuery(filters.amount),
        },
        searchMode: 'SUBQUERY__SEARCH',
      };
    }

    return query;
  },
});

const subQueryAtom = selector({
  key: 'salesAppointmentsSubQuery',
  get: () => {
    return [{ [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'] }];
  },
});

const sortAtom = selector({
  key: 'salesAppointmentsTaskSort',
  get: ({ get }) => {
    const filters = get(filtersAtom);

    return filters.order ? SORT_FIELDS[filters.order] : defaultOrder;
  },
});

export const useSalesAppointmentsPage = () => {
  const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return {
    hasNextPage,
    loadNextPage,
    setHasNextPage,
  };
};

export const useSalesAppointmentAggregation = () => {
  const taskAggregationQuery = getTaskAggregationQuery([TASK_TYPE.MEETING, TASK_TYPE.NEXT_STEP]);
  taskAggregationQuery.queries = [
    {
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'],
    },
  ];
  const { data } = useAggregationSubscription(taskAggregationQuery, BobjectTypes.Task, [
    keepPreviousResponse,
  ]);

  return data?.data?.contents[0]?.value;
};

export const useSalesAppointmentsFilters = () => {
  const orderFilter = useRecoilValue(orderFilterAtom);
  const dateFilter = useRecoilValue(dateFilterAtom);
  const assignedToFilter = useRecoilValue(assignedToFilterAtom);
  const stagesFilter = useRecoilValue(stagesFilterAtom);
  const typesFilter = useRecoilValue(typesFilterAtom);
  const amountFilter = useRecoilValue(amountFilterAtom);
  const moreFilters = useRecoilValue(moreFiltersAtom);
  const filtersGroups = useRecoilValue(filtersGroupAtom);
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const resetOrderFilter = useResetRecoilState(orderFilterAtom);
  const resetDateFilter = useResetRecoilState(dateFilterAtom);
  const resetAssignedToFilter = useResetRecoilState(assignedToFilterAtom);
  const resetStagesFilter = useResetRecoilState(stagesFilterAtom);
  const resetTypesFilter = useResetRecoilState(typesFilterAtom);
  const resetAmountFilter = useResetRecoilState(amountFilterAtom);
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
      subhomeFilters: apoinmentsFilterFields,
      bobjectFields,
      bobjectPicklistFieldValues,
    });
    const moreFiltersBuild = buildMoreFilters({
      filtersToApply,
      subhomeFilters: apoinmentsFilterFields,
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
    type: {
      data: typesFilter,
      reset: resetTypesFilter,
      type: FILTER_GROUP_TYPE.ARRAY,
    },
    date: {
      data: dateFilter,
      reset: resetDateFilter,
      type: FILTER_GROUP_TYPE.DATE,
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
      dateFilter === defaultDateFilter &&
      !assignedToFilter &&
      !stagesFilter &&
      !typesFilter &&
      isEqual(amountFilter, defaultAmountFilter) &&
      !Object.keys(filtersGroups || {}).some(k => filtersGroups[k].selected) &&
      (!moreFilters || isEmpty(moreFilters)),
    [
      orderFilter,
      dateFilter,
      assignedToFilter,
      stagesFilter,
      typesFilter,
      amountFilter,
      filtersGroups,
      moreFilters,
    ],
  );

  return {
    orderFilter,
    dateFilter,
    assignedToFilter,
    stagesFilter,
    typesFilter,
    amountFilter,
    moreFilters,
    usingDefaultFilters,
    resetOrderFilter,
    resetDateFilter,
    resetAssignedToFilter,
    resetStagesFilter,
    resetTypesFilter,
    resetAmountFilter,
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
          defaultFilters: apoinmentsFilterFields,
          filtersData: FILTERS_DATA,
          bobjectFields,
          setFilters,
        });
        setFiltersGroup({ ...filtersGroups, [filterId]: { ...filter, selected: false } });
      }
    },
    setAllFiltersGroup: values => {
      let defaultGroup;
      if (Array.isArray(values)) {
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
      }
    },
    setOrderFilter: value => {
      setFilters({ order: value });
    },
    setDateFilter: value => {
      setFilters({ date: value });
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
    setTypesFilter: value => {
      if (!isEqual(value, typesFilter)) {
        if (value.includes('all')) {
          resetTypesFilter();
          return;
        }
        setFilters({ type: value });
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
    setMoreFilters: value => {
      const moreFiltersValues = changeFieldIdsToLogicRoles({ query: value, bobjectFields });
      let parsedMoreFilters = {};

      Object.keys(moreFiltersValues).forEach(fieldId => {
        if (MORE_FILTER_KEYS[fieldId]) {
          if (MORE_FILTER_KEYS[fieldId] === 'amount') {
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

export const useSalesTasksAppointments = () =>
  useSalesItems(queryAtom, subQueryAtom, sortAtom, pageAtom);
