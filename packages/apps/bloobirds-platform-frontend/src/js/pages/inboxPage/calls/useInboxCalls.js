import { useEffect, useMemo } from 'react';

import { isEqual } from 'lodash';
import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { useEntity } from '../../../hooks';
import SessionManagerFactory from '../../../misc/session';
import { differenceInDays, endOfDay, startOfDay, subDays } from '@bloobirds-it/utils';
import { useInboxActivities } from '../useInbox';

const SessionManager = SessionManagerFactory();

const defaultDateFilter = {
  start: startOfDay(subDays(new Date(), 7)),
  end: endOfDay(new Date()),
};

const dateFilterAtom = atom({
  key: 'inboxCallsDateFilter',
  default: defaultDateFilter,
});

const activityUserFilterAtom = atom({
  key: 'inboxActivityUserDateFilter',
  default: null,
});

const directionFiltersAtom = atom({
  key: 'inboxCallsDirectionFilter',
  default: null,
});

const sourceFilterAtom = atom({
  key: 'inboxCallsSourceFilter',
  default: null,
});

const reportedFilterAtom = atom({
  key: 'inboxCallsReportedFilter',
  default: false,
});

const unknownContactsFilterAtom = atom({
  key: 'inboxCallsUnknownContactsFilter',
  default: false,
});

const pageAtom = atom({
  key: 'inboxCallsPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'inboxCallsHasNextPage',
  default: true,
});

const filtersAtom = selector({
  key: 'inboxCallsFilters',
  get: ({ get }) => {
    const dateFilter = get(dateFilterAtom);
    const activityUserFilter = get(activityUserFilterAtom);
    const sourceFilter = get(sourceFilterAtom);
    const directionFilter = get(directionFiltersAtom);
    const reportedFilter = get(reportedFilterAtom);
    const unknownContactsFilter = get(unknownContactsFilterAtom);

    return {
      date: dateFilter,
      activityUser: activityUserFilter,
      direction: directionFilter,
      source: sourceFilter,
      showReported: reportedFilter,
      showUnknownContacts: unknownContactsFilter,
    };
  },
  set: ({ set, reset }, value) => {
    if (value instanceof DefaultValue) {
      reset(dateFilterAtom);
      reset(dateFilterAtom);
      reset(activityUserFilterAtom);
      reset(directionFiltersAtom);
      reset(reportedFilterAtom);
      reset(unknownContactsFilterAtom);
    } else {
      if (value.date) set(dateFilterAtom, value.date);
      if (value.activityUser) set(activityUserFilterAtom, value.activityUser);
      if (value.source) set(sourceFilterAtom, value.source);
      if (value.direction) set(directionFiltersAtom, value.direction);
      if (typeof value.showReported === 'boolean') set(reportedFilterAtom, value.showReported);
      if (typeof value.showUnknownContacts === 'boolean') {
        set(unknownContactsFilterAtom, value.showUnknownContacts);
      }
      reset(hasNextPageAtom);
      reset(pageAtom);
    }
  },
});

const oldQueryAtom = selector({
  key: 'inboxCallsActivitiesQuery',
  get: ({ get }) => {
    const filters = get(filtersAtom);

    const query = {
      ACTIVITY__USER: SessionManager?.getUser()?.id,
      ACTIVITY__TYPE: 'ACTIVITY__TYPE__CALL',
      ACTIVITY__TIME: {
        query: {
          gte: filters.date.start,
          lte: filters.date.end,
        },
        searchMode: 'RANGE__SEARCH',
      },
      ACTIVITY__REPORTED: filters.showReported
        ? 'ACTIVITY__REPORTED__YES'
        : ['ACTIVITY__REPORTED__NO', '__MATCH_EMPTY_ROWS__'],
    };

    if (filters.source) {
      query.ACTIVITY__DATA_SOURCE = filters.source;
    }

    if (filters.activityUser) {
      query.ACTIVITY__USER = filters.activityUser;
    }

    if (filters.direction) {
      query.ACTIVITY__DIRECTION = filters.direction;
    }

    if (filters.showUnknownContacts) {
      query.ACTIVITY__COMPANY = ['__MATCH_EMPTY_ROWS__'];
      query.ACTIVITY__LEAD = ['__MATCH_EMPTY_ROWS__'];
      query.ACTIVITY__OPPORTUNITY = ['__MATCH_EMPTY_ROWS__'];
    }

    return query;
  },
});

const queryAtom = atom({
  key: 'inboxCallsQueryAtom',
  default: {},
});

const querySelector = selector({
  key: 'inboxCallsQuerySelector',
  get: ({ get }) => get(queryAtom),
  set: ({ set, get }, query) => {
    set(queryAtom, query);
  },
});

/* END - NEW ATOMS */

const isRefactorQuickFilterEnabledAtom = atom({
  key: 'inboxCallsIsRefactorQuickFilterEnabledAtom',
  default: false,
});

export const useInboxCallsPage = () => {
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

export const useInboxCallsFilters = () => {
  const dateFilter = useRecoilValue(dateFilterAtom);
  const activityUserFilter = useRecoilValue(activityUserFilterAtom);
  const directionFilter = useRecoilValue(directionFiltersAtom);
  const sourceFilter = useRecoilValue(sourceFilterAtom);
  const showUnknownContactsFilter = useRecoilValue(unknownContactsFilterAtom);
  const showReportedFilter = useRecoilValue(reportedFilterAtom);
  const resetDateFilter = useResetRecoilState(dateFilterAtom);
  const resetActivityUserFilter = useResetRecoilState(activityUserFilterAtom);
  const resetDirectionFilter = useResetRecoilState(directionFiltersAtom);
  const resetSourceFilter = useResetRecoilState(sourceFilterAtom);
  const resetShowUnknownContactsFilter = useResetRecoilState(unknownContactsFilterAtom);
  const resetShowReportedFilter = useResetRecoilState(reportedFilterAtom);
  const resetAllFilters = useResetRecoilState(filtersAtom);
  const setFilters = useSetRecoilState(filtersAtom);

  const usingDefaultFilters = useMemo(
    () =>
      isEqual(dateFilter, defaultDateFilter) &&
      !sourceFilter &&
      !activityUserFilter &&
      !directionFilter &&
      !showReportedFilter &&
      !showUnknownContactsFilter,
    [
      dateFilter,
      activityUserFilter,
      sourceFilter,
      directionFilter,
      showReportedFilter,
      showUnknownContactsFilter,
    ],
  );

  return {
    dateFilter,
    activityUserFilter,
    directionFilter,
    sourceFilter,
    showReportedFilter,
    showUnknownContactsFilter,
    usingDefaultFilters,
    resetDateFilter,
    resetActivityUserFilter,
    resetSourceFilter,
    resetDirectionFilter,
    resetShowReportedFilter,
    resetShowUnknownContactsFilter,
    resetAllFilters,
    setDirectionFilter: value => {
      if (!isEqual(value, directionFilter)) {
        if (value.includes('all') || value?.length === 0) {
          resetDirectionFilter();
          return;
        }
        setFilters({ direction: value });
      }
    },
    setActivityUserFilter: value => {
      if (!isEqual(value, activityUserFilter)) {
        if (value.includes('all') || value?.length === 0) {
          resetActivityUserFilter();
          return;
        }
        setFilters({ activityUser: value });
      }
    },
    setShowReportedFilter: value => {
      setFilters({ showReported: value });
    },
    setShowUnknownContactsFilter: value => {
      setFilters({ showUnknownContacts: value });
    },
    setSourceFilter: value => {
      if (!isEqual(value, sourceFilter)) {
        if (value.includes('all') || value?.length === 0) {
          resetSourceFilter();
          return;
        }
        setFilters({ source: value });
      }
    },
    setDateFilter: value => {
      if (!isEqual(value, dateFilter)) {
        if (!dateFilter.start) {
          setFilters({ date: value });
        } else {
          // Check that day has changed
          const diffStart = differenceInDays(dateFilter.start, value.start);
          const diffEnd = differenceInDays(dateFilter.end, value.end);
          if (diffStart !== 0 || diffEnd !== 0) {
            setFilters({ date: value });
          }
        }
      }
    },
  };
};

export const useInboxActivitiesCalls = () => {
  return useInboxActivities(querySelector, pageAtom);
};

// NEW Hooks
export const useInboxCallsQuery = () => {
  const [query, setQuery] = useRecoilState(querySelector);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const filters = useRecoilValue(filtersAtom);

  const defaultQuery = useMemo(() => {
    const userField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
    const reportedField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED);
    const activityTypeField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
    const timeField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TIME);

    return {
      [userField?.id]: SessionManager?.getUser()?.id,
      [reportedField?.id]: [REPORTED_VALUES_LOGIC_ROLE.NO, '__MATCH_EMPTY_ROWS__'],
      [activityTypeField?.id]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL],
      [timeField?.id]: {
        query: {
          gte: filters?.date?.start,
          lte: filters?.date?.end,
        },
        searchMode: 'RANGE__SEARCH',
      },
    };
  }, [bobjectFieldsEntity]);

  const resetQuery = () => setQuery(defaultQuery);

  const setNewQuery = newQuery => {
    setQuery({ ...defaultQuery, ...newQuery });
  };

  return { query, setQuery: setNewQuery, resetQuery };
};

export const useInboxCallsFooter = () => {
  const [query] = useRecoilState(querySelector);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const activityTimeField = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const dateFilterValue = query[activityTimeField?.id];
  const dateFilter = dateFilterValue
    ? {
        start: new Date(dateFilterValue?.query?.gte),
        end: new Date(dateFilterValue?.query?.lte),
      }
    : undefined;

  return { dateFilter };
};
