import { useEffect, useMemo } from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
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
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { useEntity } from '../../../hooks';
import SessionManagerFactory from '../../../misc/session';
import { differenceInDays, endOfDay, startOfDay, subDays } from '@bloobirds-it/utils';
import { getAggregationQuery, useInboxActivities } from '../useInbox';

const SessionManager = SessionManagerFactory();

const defaultDateFilter = {
  start: startOfDay(subDays(new Date(), 7)),
  end: endOfDay(new Date()),
};

const dateFilterAtom = atom({
  key: 'inboxEmailsDateFilter',
  default: defaultDateFilter,
});

const activityUserFilterAtom = atom({
  key: 'activityUserFilter',
  default: null,
});

const directionFilterAtom = atom({
  key: 'inboxEmailsDirectionFilter',
  default: ACTIVITY_DIRECTION.INCOMING,
});

const reportedFilterAtom = atom({
  key: 'inboxEmailsReportedFilter',
  default: false,
});

const pageAtom = atom({
  key: 'inboxEmailsPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'inboxEmailsHasNextPage',
  default: true,
});

const filtersAtom = selector({
  key: 'inboxEmailsFilters',
  get: ({ get }) => {
    const dateFilter = get(dateFilterAtom);
    const activityUserFilter = get(activityUserFilterAtom);
    const directionFilter = get(directionFilterAtom);
    const reportedFilter = get(reportedFilterAtom);

    return {
      date: dateFilter,
      activityUser: activityUserFilter,
      direction: directionFilter,
      showReported: reportedFilter,
    };
  },
  set: ({ set, reset }, value) => {
    if (value instanceof DefaultValue) {
      reset(dateFilterAtom);
      reset(activityUserFilterAtom);
      reset(directionFilterAtom);
      reset(reportedFilterAtom);
    } else {
      if (value.date) set(dateFilterAtom, value.date);
      if (value.activityUser) set(activityUserFilterAtom, value.activityUser);
      if (value.direction) set(directionFilterAtom, value.direction);
      if (typeof value.showReported === 'boolean') set(reportedFilterAtom, value.showReported);
      reset(hasNextPageAtom);
      reset(pageAtom);
    }
  },
});

const oldQueryAtom = selector({
  key: 'inboxEmailsActivitiesQuery',
  get: ({ get }) => {
    const filters = get(filtersAtom);

    const query = {
      ACTIVITY__USER: SessionManager?.getUser()?.id,
      ACTIVITY__TYPE: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
      ACTIVITY__TIME: {
        query: {
          gte: filters.date.start,
          lte: filters.date.end,
        },
        searchMode: 'RANGE__SEARCH',
      },
      ACTIVITY__REPORTED: filters.showReported
        ? REPORTED_VALUES_LOGIC_ROLE.YES
        : [REPORTED_VALUES_LOGIC_ROLE.NO, '__MATCH_EMPTY_ROWS__'],
    };

    if (filters.direction) {
      query.ACTIVITY__DIRECTION = filters.direction;
    }

    if (filters.activityUser) {
      query.ACTIVITY__USER = filters.activityUser;
    }

    return query;
  },
});

const queryAtom = atom({
  key: 'inboxEmailsQueryAtom',
  default: {},
});

const querySelector = selector({
  key: 'inboxEmailsQuerySelector',
  get: ({ get }) => get(queryAtom),
  set: ({ set, get }, query) => {
    set(queryAtom, query);
  },
});

const isRefactorQuickFilterEnabledAtom = atom({
  key: 'inboxEmailsIsRefactorQuickFilterEnabledAtom',
  default: false,
});

export const useInboxEmailAggregation = () => {
  const { data } = useAggregationSubscription(
    getAggregationQuery(ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL, {
      [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: ACTIVITY_DIRECTION.INCOMING,
    }),
    BOBJECT_TYPES.ACTIVITY,
  );
  return data?.data?.contents[0]?.value;
};

export const useInboxEmailsPage = () => {
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

export const useInboxEmailsFilters = () => {
  const dateFilter = useRecoilValue(dateFilterAtom);
  const activityUserFilter = useRecoilValue(activityUserFilterAtom);
  const directionFilter = useRecoilValue(directionFilterAtom);
  const showReportedFilter = useRecoilValue(reportedFilterAtom);
  const resetDateFilter = useResetRecoilState(dateFilterAtom);
  const resetActivityUserFilter = useResetRecoilState(activityUserFilterAtom);
  const resetDirectionFilter = useResetRecoilState(directionFilterAtom);
  const resetShowReportedFilter = useResetRecoilState(reportedFilterAtom);
  const resetAllFilters = useResetRecoilState(filtersAtom);
  const setFilters = useSetRecoilState(filtersAtom);

  const usingDefaultFilters = useMemo(
    () =>
      isEqual(dateFilter, defaultDateFilter) &&
      !activityUserFilter &&
      directionFilter === ACTIVITY_DIRECTION.INCOMING &&
      !showReportedFilter,
    [dateFilter, activityUserFilter, directionFilter, showReportedFilter],
  );

  return {
    dateFilter,
    activityUserFilter,
    directionFilter,
    showReportedFilter,
    usingDefaultFilters,
    resetDateFilter,
    resetActivityUserFilter,
    resetDirectionFilter,
    resetShowReportedFilter,
    resetAllFilters,
    setDirectionFilter: value => {
      if (!isEqual(value, directionFilter)) {
        setFilters({ direction: value.includes('all') ? [] : value });
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

export const useInboxActivitiesEmails = () => {

  return useInboxActivities(querySelector, pageAtom);
};

// NEW Hooks
export const useInboxEmailsQuery = () => {
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
      [activityTypeField?.id]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL],
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

export const useInboxEmailsFooter = () => {
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
