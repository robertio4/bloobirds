import { useEffect, useMemo } from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
import {BobjectTypes,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
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

import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useEntity } from '../../../hooks';
import SessionManagerFactory from '../../../misc/session';
import { parsedDateValueToRelativeDates } from '../../../utils/subhomeFilters.utils';
import { getTaskAggregationQuery, useOutboxItems } from '../useOutbox';
import { DATE_FILTER_FIELDS } from './scheduled.constants';

const SessionManager = SessionManagerFactory();

const defaultDateFilter = 'next_7_days';

const dateFilterAtom = atom({
  key: 'outboxScheduledDateFilter',
  default: defaultDateFilter,
});

const assignedToFilterAtom = atom({
  key: 'outboxScheduledAssignedToFilter',
  default: null,
});

const showSuccessfullySentFilterAtom = atom({
  key: 'outboxScheduledSuccessfullySentFilter',
  default: false,
});

const showFailedSentFilterAtom = atom({
  key: 'outboxScheduledFailedSentFilter',
  default: false,
});

const pageAtom = atom({
  key: 'outboxScheduledPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'outboxScheduledHasNextPage',
  default: true,
});

const filtersAtom = selector({
  key: 'outboxScheduledFilters',
  get: ({ get }) => {
    const dateFilter = get(dateFilterAtom);
    const assignedToFilter = get(assignedToFilterAtom);
    const showSuccessfullySentFilter = get(showSuccessfullySentFilterAtom);
    const showFailedSentFilter = get(showFailedSentFilterAtom);

    return {
      date: dateFilter,
      assignedTo: assignedToFilter,
      showSuccessfullySent: showSuccessfullySentFilter,
      showFailedSent: showFailedSentFilter,
    };
  },
  set: ({ set, reset }, value: any) => {
    if (value instanceof DefaultValue) {
      reset(dateFilterAtom);
      reset(assignedToFilterAtom);
      reset(showSuccessfullySentFilterAtom);
      reset(showFailedSentFilterAtom);
    } else {
      if (value?.date) set(dateFilterAtom, value.date);
      if (value?.assignedTo) set(assignedToFilterAtom, value.assignedTo);
      if (typeof value?.showSuccessfullySent === 'boolean')
        set(showSuccessfullySentFilterAtom, value.showSuccessfullySent);
      if (typeof value?.showFailedSent === 'boolean')
        set(showFailedSentFilterAtom, value.showFailedSent);
      mixpanel.track(`${MIXPANEL_EVENTS.FILTERS_CHANGED_IN_}SCHEDULED_TAB`, {
        Date: value.date,
        'Assigned To': value?.assignedTo,
      });
    }
    reset(hasNextPageAtom);
    reset(pageAtom);
  },
});

/* START - NEW ATOMS */
const queryAtom = atom({
  key: 'outboxScheduledQueryAtom',
  default: {},
});

/* END - NEW ATOMS */

export const useOutboxScheduledPage = () => {
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

export const useOutboxScheduledAggregation = () => {
  const { data } = useAggregationSubscription(
    getTaskAggregationQuery([TASK_TYPE.SCHEDULED_EMAIL], {
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

export const useOutboxScheduledFilters = () => {
  const dateFilter = useRecoilValue(dateFilterAtom);
  const assignedToFilter = useRecoilValue(assignedToFilterAtom);
  const showSuccessfullySentFilter = useRecoilValue(showSuccessfullySentFilterAtom);
  const showFailedSentFilter = useRecoilValue(showFailedSentFilterAtom);

  const resetDateFilter = useResetRecoilState(dateFilterAtom);
  const resetAssignedToFilter = useResetRecoilState(assignedToFilterAtom);
  const resetShowSuccessfullySentFilter = useResetRecoilState(showSuccessfullySentFilterAtom);
  const resetShowFailedSentFilter = useResetRecoilState(showFailedSentFilterAtom);
  const resetFilters = useResetRecoilState(filtersAtom);

  const setFilters = useSetRecoilState(filtersAtom);

  const usingDefaultFiltersExcludeDate = useMemo(
    () => !assignedToFilter && !showSuccessfullySentFilter && !showFailedSentFilter,
    [assignedToFilter, showSuccessfullySentFilter, showFailedSentFilter],
  );

  const usingDefaultFilters = useMemo(
    () => dateFilter === defaultDateFilter && usingDefaultFiltersExcludeDate,
    [dateFilter, usingDefaultFiltersExcludeDate],
  );

  return {
    dateFilter,
    assignedToFilter,
    showSuccessfullySentFilter,
    showFailedSentFilter,
    usingDefaultFilters,
    usingDefaultFiltersExcludeDate,
    resetDateFilter,
    resetAssignedToFilter,
    resetShowSuccessfullySentFilter,
    resetShowFailedSentFilter,
    resetFilters,
    setDateFilter: (value: string) => {
      setFilters({ date: value });
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
    setShowSuccessfullySentFilter: (value: boolean) => {
      if (value) {
        setFilters({ showSuccessfullySent: value, date: 'all_time' });
      } else {
        setFilters({
          showSuccessfullySent: value,
          date: showFailedSentFilter ? 'all_time' : defaultDateFilter,
        });
      }
    },
    setShowFailedSentFilter: (value: boolean) => {
      if (value) {
        setFilters({ showFailedSent: value, date: 'all_time' });
      } else {
        setFilters({
          showFailedSent: value,
          date: showSuccessfullySentFilter ? 'all_time' : defaultDateFilter,
        });
      }
    },
  };
};

export const useOutboxScheduledTasks = () => {
  const query = useRecoilValue(queryAtom);

  return useOutboxItems(
    query,
    [
      {
        field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        direction: 'ASC',
      },
      {
        field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
        direction: 'ASC',
      },
    ],
    pageAtom,
    [{}],
  );
};

// NEW Hooks
export const useOutboxScheduledQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const filters = useRecoilValue(filtersAtom);

  const defaultQuery = useMemo(() => {
    const assignedToField = bobjectFieldsEntity?.findByLogicRole(
      TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    );
    const statusField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.STATUS);
    const automatedStatus = bobjectFieldsEntity?.findByLogicRole(
      TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
    );
    const taskTypeField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE);
    const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    );

    return {
      [assignedToField?.id]: SessionManager?.getUser()?.id,
      [statusField?.id]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE],
      [taskTypeField?.id]: [TASK_TYPE.SCHEDULED_EMAIL],
      [scheduledDateField?.id]: DATE_FILTER_FIELDS[filters.date],
      [automatedStatus?.id]: [TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING],
    };
  }, [bobjectFieldsEntity]);

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  const resetQuery = () => setQuery(defaultQuery);

  const setNewQuery = (query: any) => {
    setQuery({ ...defaultQuery, ...query });
  };

  return { query, setQuery: setNewQuery, resetQuery };
};

export const useOutboxScheduledFooter = () => {
  const [query] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const dateFilterValue = query[scheduledDateField?.id];
  const dateFilter = parsedDateValueToRelativeDates(dateFilterValue?.query);

  return { dateFilter };
};
