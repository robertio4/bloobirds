import { useMemo } from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
import {BobjectTypes,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  MainBobjectTypes,
} from '@bloobirds-it/types';
import { keepPreviousResponse } from '@bloobirds-it/utils';
import { isEqual } from 'lodash';
import mixpanel from 'mixpanel-browser';
import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useUserSettings } from '../../../components/userPermissions/hooks';
import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useEntity } from '../../../hooks';
import { SortValues } from '../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../misc/session';
import { api } from '../../../utils/api';
import { parsedDateValueToRelativeDates } from '../../../utils/subhomeFilters.utils';
import { getTaskAggregationQuery, useOutboxItems } from '../useOutbox';
import {
  compoundableQueriesByBobjectAutomated,
  DATE_FILTER_FIELDS,
  SORT_FIELDS,
} from './automated.constants';

const SessionManager = SessionManagerFactory();

const defaultDateFilter = 'next_7_days';
const DEFAULT_ORDER = 'select';

const dateFilterAtom = atom({
  key: 'outboxAutomatedDateFilter',
  default: defaultDateFilter,
});

const orderFilterAtom = atom({
  key: 'outboxAutomatedOrderFilter',
  default: DEFAULT_ORDER,
});

const assignedToFilterAtom = atom({
  key: 'outboxAutomatedAssignedToFilter',
  default: null,
});

const bobjectTypeFilterAtom = atom({
  key: 'outboxAutomatedBobjectTypeFilter',
  default: null,
});

const buyerPersonaFilterAtom = atom({
  key: 'outboxAutomatedBuyerPersonaFilter',
  default: null,
});

const targetMarketsFilterAtom = atom({
  key: 'outboxAutomatedTargetMarketsFilter',
  default: null,
});

const cadencesFilterAtom = atom({
  key: 'outboxAutomatedTCadencesFilter',
  default: null,
});

const showSuccessfullySentFilterAtom = atom({
  key: 'outboxAutomatedSuccessfullySentFilter',
  default: false,
});

const compoundableQueriesBobjectTypeAtom = atom<MainBobjectTypes>({
  key: 'outboxAutomatedcompoundableQueriesBobjectType',
  default: undefined,
});

const showFailedSentFilterAtom = atom({
  key: 'outboxAutomatedFailedSentFilter',
  default: false,
});

const showPausedFilterAtom = atom({
  key: 'outboxAutomatedPausedFilter',
  default: false,
});

const showRescheduledFilterAtom = atom({
  key: 'outboxAutomatedRescheduledFilter',
  default: false,
});

const pageAtom = atom({
  key: 'outboxAutomatedPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'outboxAutomatedHasNextPage',
  default: true,
});

const filtersAtom = selector({
  key: 'outboxAutomatedFilters',
  get: ({ get }) => {
    const dateFilter = get(dateFilterAtom);
    const orderFilter = get(orderFilterAtom);
    const bobjectTypeFilter = get(bobjectTypeFilterAtom);
    const cadencesFilter = get(cadencesFilterAtom);
    const buyerPersonaFilter = get(buyerPersonaFilterAtom);
    const targetMarketsFilter = get(targetMarketsFilterAtom);
    const assignedToFilter = get(assignedToFilterAtom);
    const showSuccessfullySentFilter = get(showSuccessfullySentFilterAtom);
    const showFailedSentFilter = get(showFailedSentFilterAtom);
    const showPausedFilter = get(showPausedFilterAtom);
    const showRescheduledFilter = get(showRescheduledFilterAtom);

    return {
      date: dateFilter,
      order: orderFilter,
      assignedTo: assignedToFilter,
      bobjectType: bobjectTypeFilter,
      cadences: cadencesFilter,
      buyerPersonas: buyerPersonaFilter,
      targetMarket: targetMarketsFilter,
      showSuccessfullySent: showSuccessfullySentFilter,
      showFailedSent: showFailedSentFilter,
      showPaused: showPausedFilter,
      showRescheduled: showRescheduledFilter,
    };
  },
  set: ({ set, reset }, value: any) => {
    if (value instanceof DefaultValue) {
      reset(dateFilterAtom);
      reset(orderFilterAtom);
      reset(assignedToFilterAtom);
      reset(cadencesFilterAtom);
      reset(bobjectTypeFilterAtom);
      reset(buyerPersonaFilterAtom);
      reset(targetMarketsFilterAtom);
      reset(showSuccessfullySentFilterAtom);
      reset(showFailedSentFilterAtom);
      reset(showPausedFilterAtom);
      reset(showRescheduledFilterAtom);
    } else {
      if (value?.date) set(dateFilterAtom, value.date);
      if (value?.order) set(orderFilterAtom, value.order);
      if (value?.assignedTo) set(assignedToFilterAtom, value.assignedTo);
      if (value?.bobjectType) {
        if (Array.isArray(value?.bobjectType)) {
          set(bobjectTypeFilterAtom, value.bobjectType[0]);
        } else {
          set(bobjectTypeFilterAtom, value.bobjectType);
        }
      }
      if (value.cadences) set(cadencesFilterAtom, value.cadences);
      if (value.buyerPersonas) {
        set(buyerPersonaFilterAtom, value.buyerPersonas);
        set(bobjectTypeFilterAtom, BobjectTypes.Lead);
      }
      if (value.targetMarket) {
        set(targetMarketsFilterAtom, value.targetMarket);
        set(bobjectTypeFilterAtom, BobjectTypes.Company);
      }
      if (typeof value?.showSuccessfullySent === 'boolean')
        set(showSuccessfullySentFilterAtom, value.showSuccessfullySent);
      if (typeof value?.showFailedSent === 'boolean')
        set(showFailedSentFilterAtom, value.showFailedSent);
      if (typeof value?.showPaused === 'boolean') set(showPausedFilterAtom, value.showPaused);
      if (typeof value?.showRescheduled === 'boolean')
        set(showRescheduledFilterAtom, value.showRescheduled);
      mixpanel.track(`${MIXPANEL_EVENTS.FILTERS_CHANGED_IN_}AUTOMATED_TAB`, {
        Order: value?.order,
        'Assigned To': value?.assignedTo,
        Cadences: value?.cadences,
        'Buyer Personas': value?.buyerPersonas,
        'Target Market': value?.targetMarket,
      });
    }
    reset(hasNextPageAtom);
    reset(pageAtom);
  },
});

/* START - NEW ATOMS */
const queryAtom = atom({
  key: 'outboxAutomatedQueryAtom',
  default: {},
});

const newSortAtom = atom({
  key: 'outboxAutomatedSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

/* END - NEW ATOMS */

export const useOutboxAutomatedPage = () => {
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

export const useOutboxAutomatedAggregation = () => {
  const { data } = useAggregationSubscription(
    getTaskAggregationQuery([TASK_TYPE.PROSPECT_CADENCE], {
      [TASK_ACTION.AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES],
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
      ],
    }),
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useOutboxAutomatedFilters = () => {
  const bobjectFilter = useRecoilValue(bobjectTypeFilterAtom);

  const dateFilter = useRecoilValue(dateFilterAtom);
  const orderFilter = useRecoilValue(orderFilterAtom);
  const assignedToFilter = useRecoilValue(assignedToFilterAtom);
  const bobjectTypeFilter = bobjectFilter;
  const cadencesFilter = useRecoilValue(cadencesFilterAtom);
  const buyerPersonaFilter = useRecoilValue(buyerPersonaFilterAtom);
  const targetMarketsFilter = useRecoilValue(targetMarketsFilterAtom);

  const showSuccessfullySentFilter = useRecoilValue(showSuccessfullySentFilterAtom);
  const showFailedSentFilter = useRecoilValue(showFailedSentFilterAtom);
  const showPausedFilter = useRecoilValue(showPausedFilterAtom);
  const showRescheduledFilter = useRecoilValue(showRescheduledFilterAtom);

  const resetDateFilter = useResetRecoilState(dateFilterAtom);
  const resetOrderFilter = useResetRecoilState(orderFilterAtom);
  const resetBobjectTypeFilter = useResetRecoilState(bobjectTypeFilterAtom);
  const resetCadencesFilter = useResetRecoilState(cadencesFilterAtom);
  const resetAssignedToFilter = useResetRecoilState(assignedToFilterAtom);
  const resetTargetMarketsFilter = useResetRecoilState(targetMarketsFilterAtom);
  const resetBuyerPersonaFilter = useResetRecoilState(buyerPersonaFilterAtom);
  const resetShowSuccessfullySentFilter = useResetRecoilState(showSuccessfullySentFilterAtom);
  const resetShowFailedSentFilter = useResetRecoilState(showFailedSentFilterAtom);
  const resetShowPausedFilter = useResetRecoilState(showPausedFilterAtom);
  const resetShowRescheduledFilter = useResetRecoilState(showRescheduledFilterAtom);
  const resetFilters = useResetRecoilState(filtersAtom);

  const setFilters = useSetRecoilState(filtersAtom);
  const leadBasedFilter = !bobjectTypeFilter;

  const usingDefaultFiltersExcludeDate = useMemo(
    () =>
      orderFilter === DEFAULT_ORDER &&
      leadBasedFilter &&
      !cadencesFilter &&
      !buyerPersonaFilter &&
      !targetMarketsFilter &&
      !assignedToFilter &&
      !showSuccessfullySentFilter &&
      !showFailedSentFilter &&
      !showPausedFilter &&
      !showRescheduledFilter,
    [
      orderFilter,
      cadencesFilter,
      bobjectTypeFilter,
      buyerPersonaFilter,
      targetMarketsFilter,
      assignedToFilter,
      showSuccessfullySentFilter,
      showFailedSentFilter,
      showPausedFilter,
      showRescheduledFilter,
    ],
  );

  const usingDefaultFilters = useMemo(
    () => dateFilter === defaultDateFilter && usingDefaultFiltersExcludeDate,
    [dateFilter, usingDefaultFiltersExcludeDate],
  );

  return {
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
    usingDefaultFilters,
    usingDefaultFiltersExcludeDate,
    resetDateFilter,
    resetOrderFilter,
    resetCadencesFilter,
    resetAssignedToFilter,
    resetTargetMarketsFilter,
    resetBuyerPersonaFilter,
    resetShowSuccessfullySentFilter,
    resetShowFailedSentFilter,
    resetShowPausedFilter,
    resetShowRescheduledFilter,
    resetBobjectTypeFilter,
    resetFilters,
    setDateFilter: (value: string) => {
      setFilters({ date: value });
    },
    setOrderFilter: (value: string) => {
      setFilters({ order: value });
    },
    setAssignedToFilter: (value: Array<string>) => {
      if (!isEqual(value, assignedToFilter)) {
        if (value.includes('all') || value?.length === 0) {
          resetAssignedToFilter();
          return;
        }
        setFilters({ assignedTo: value });
      }
    },
    setBobjectTypeFilter: (value: Array<string>) => {
      if (!isEqual(value, bobjectTypeFilter)) {
        if (value.includes('all') || value?.length === 0) {
          resetBobjectTypeFilter();
          return;
        }

        setFilters({ bobjectType: value });
      }
    },
    setCadencesFilter: (value: Array<string>) => {
      setFilters({ cadences: value });
    },
    setTargetMarketsFilter: (value: string) => {
      if (!isEqual(value, targetMarketsFilter)) {
        if (value.includes('all') || value?.length === 0) {
          resetTargetMarketsFilter();
          return;
        }

        setFilters({ targetMarket: value, bobjectType: BobjectTypes.Company });
      }
    },
    setBuyerPersonaFilter: (value: string) => {
      if (!isEqual(value, buyerPersonaFilter)) {
        if (value.includes('all') || value?.length === 0) {
          resetBuyerPersonaFilter();
          return;
        }
        setFilters({ buyerPersonas: value, bobjectType: BobjectTypes.Lead });
      }
    },
    setShowSuccessfullySentFilter: (value: boolean) => {
      if (value) {
        setFilters({
          showSuccessfullySent: value,
          date: 'all_time',
          order: 'scheduledDateDesc',
        });
      } else {
        setFilters({ showSuccessfullySent: value, date: defaultDateFilter, order: DEFAULT_ORDER });
      }
    },
    setShowFailedSentFilter: (value: boolean) => {
      if (value) {
        setFilters({ showFailedSent: value, date: 'all_time', order: 'lastUpdateMostRecent' });
      } else {
        setFilters({ showFailedSent: value, date: defaultDateFilter, order: DEFAULT_ORDER });
      }
    },
    setShowPausedFilter: (value: boolean) => {
      if (value) {
        setFilters({ showPaused: value, date: 'all_time', order: 'lastUpdateMostRecent' });
      } else {
        setFilters({ showPaused: value, date: defaultDateFilter, order: DEFAULT_ORDER });
      }
    },
    setShowRescheduledFilter: (value: boolean) => {
      if (value) {
        setFilters({ showRescheduled: value, date: 'all_time' });
      } else {
        setFilters({ showRescheduled: value, date: defaultDateFilter });
      }
    },
  };
};

export const useOutboxAutomatedTasks = () => {
  const sort = SORT_FIELDS[useRecoilValue(newSortAtom)?.value];
  const [relatedBobjectType, setRelatedBobjectType] = useRecoilState<MainBobjectTypes>(
    compoundableQueriesBobjectTypeAtom,
  );

  function getRelatedBobjectFilter() {
    let relatedBobjectQuery = [];
    if (Array.isArray(relatedBobjectType) && relatedBobjectType.length > 0) {
      relatedBobjectType.forEach(bobject => {
        relatedBobjectQuery.push(compoundableQueriesByBobjectAutomated[bobject]);
      });
    } else {
      relatedBobjectQuery = [{}];
    }
    return relatedBobjectQuery;
  }

  const bobjectQueriesFilter = getRelatedBobjectFilter();
  const currentQuery = useRecoilValue(queryAtom);

  return {
    ...useOutboxItems(currentQuery, sort, pageAtom, bobjectQueriesFilter),
    setRelatedBobjectType,
  };
};

export const useOutboxAutomatedAllItems = () => {
  const currentQueryAtom = queryAtom;
  const settings = useUserSettings();
  const accountId = settings.account.id;
  const query = useRecoilValue(currentQueryAtom);
  const getAllItems = () => {
    const searchQuery = {
      query,
      page: 0,
      formFields: true,
      pageSize: 1000,
      injectReferences: true,
      sort: [] as string[],
    };
    return api.post(`/bobjects/${accountId}/Task/search`, searchQuery);
  };
  return { getAllItems };
};

// NEW Hooks
export const useOutboxAutomatedQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const filters = useRecoilValue(filtersAtom);

  const defaultQuery = useMemo(() => {
    const assignedToField = bobjectFieldsEntity?.findByLogicRole(
      TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    );
    const statusField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.STATUS);
    const automatedEmailField = bobjectFieldsEntity?.findByLogicRole(TASK_ACTION.AUTOMATED_EMAIL);
    const taskTypeField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE);
    const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    );

    return {
      [assignedToField?.id]: SessionManager?.getUser()?.id,
      [statusField?.id]: [
        TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
        TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
        ...(filters?.showFailedSent ? [TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED] : []),
      ],
      [taskTypeField?.id]: [TASK_TYPE.PROSPECT_CADENCE],
      [scheduledDateField?.id]: DATE_FILTER_FIELDS[filters.date],
      [automatedEmailField?.id]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES],
    };
  }, [bobjectFieldsEntity]);

  const resetQuery = () => setQuery(defaultQuery);

  const setNewQuery = (query: any) => {
    setQuery({ ...defaultQuery, ...query });
  };

  return { query, setQuery: setNewQuery, resetQuery };
};

export const useOutboxAutomatedSort = () => {
  const [sort, setSort] = useRecoilState(newSortAtom);
  const resetSort = useResetRecoilState(newSortAtom);

  return {
    sort,
    setSort: (value: SortValues) => {
      if (!value || value === DEFAULT_ORDER) {
        resetSort();
      } else {
        setSort({ value: value, hasChanged: true });
      }
    },
  };
};

export const useOutboxAutomatedFooter = () => {
  const [query] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const dateFilterValue = query[scheduledDateField?.id];
  const dateFilter = parsedDateValueToRelativeDates(dateFilterValue?.query);

  return { dateFilter };
};
