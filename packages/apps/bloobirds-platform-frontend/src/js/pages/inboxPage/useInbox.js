import { useEffect, useMemo } from 'react';

import { useAggregationSubscription, useSearchSubscription } from '@bloobirds-it/plover';
import { BobjectTypes, BOBJECT_TYPES } from '@bloobirds-it/types';
import {
  keepPreviousResponse,
  endOfDay,
  startOfDay,
  subDays,
  injectReferencesSearchProcess,
} from '@bloobirds-it/utils';
import { atom, selector, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  DATA_SOURCES,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../constants/activity';
import SessionManagerFactory from '../../misc/session';

const SessionManager = SessionManagerFactory();

const PAGE_SIZE = 20;

export const getAggregationQuery = (activityTypeLR, extraQuery) => ({
  query: {
    ACTIVITY__USER: SessionManager?.getUser()?.id,
    ACTIVITY__TYPE: Array.isArray(activityTypeLR) ? activityTypeLR : [activityTypeLR],
    ACTIVITY__TIME: {
      query: {
        lte: endOfDay(new Date()),
        gte: startOfDay(subDays(new Date(), 7)),
      },
      searchMode: 'RANGE__SEARCH',
    },
    ACTIVITY__REPORTED: [REPORTED_VALUES_LOGIC_ROLE.NO, '__MATCH_EMPTY_ROWS__'],
    ...extraQuery,
  },
  formFields: false,
  aggregations: [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE],
});

export const useInboxGlobalAggregation = () => {
  const { data: callsAgg } = useAggregationSubscription(
    getAggregationQuery('ACTIVITY__TYPE__CALL'),
    BobjectTypes.Activity,
    [keepPreviousResponse],
  );
  const callsCounter = callsAgg?.data?.contents[0]?.value;
  const { data: emailsAgg } = useAggregationSubscription(
    getAggregationQuery(ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL, {
      [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: ACTIVITY_DIRECTION.INCOMING,
    }),
    BobjectTypes.Activity,
    [keepPreviousResponse],
  );
  const emailCounter = emailsAgg?.data?.contents[0]?.value;

  const { data: linkedInAgg } = useAggregationSubscription(
    {
      ...getAggregationQuery(ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN, {
        [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: ACTIVITY_DIRECTION.INCOMING,
        [ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE]: DATA_SOURCES.CHROME_EXTENSION,
      }),
      aggregations: [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD],
    },
    BobjectTypes.Activity,
    [keepPreviousResponse],
  );
  const linkedInCounter =
    linkedInAgg?.data?.contents.length === 0 ? undefined : linkedInAgg?.data?.contents.length;

  return {
    callsCounter,
    emailCounter,
    linkedInCounter,
    globalCounter: (emailCounter || 0) + (callsCounter || 0) + (linkedInCounter || 0),
  };
};

const BASE_INBOX_SEARCH_REQUEST = {
  formFields: true,
  sort: [
    {
      field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      direction: 'DESC',
    },
  ],
  pageSize: 1000,
  injectReferences: true,
};

const itemsAtom = atom({
  key: 'inboxItemsAtom',
  default: [],
});

const responseAtom = selector({
  key: 'inboxResponse',
  get: () => null,
  set: ({ set }, response) => {
    set(itemsAtom, response.contents);
  },
});

export const useInboxActivities = (tabQueryAtom, tabPageAtom) => {
  const query = useRecoilValue(tabQueryAtom);
  const page = tabPageAtom ? useRecoilValue(tabPageAtom) : null;
  const setResponse = useSetRecoilState(responseAtom);
  const items = useRecoilValue(itemsAtom);
  const resetItems = useResetRecoilState(itemsAtom);

  const { data, error, isLoading } = useSearchSubscription(
    {
      query,
      ...BASE_INBOX_SEARCH_REQUEST,
      pageSize: page ? page * PAGE_SIZE : 1000,
      page: 0,
    },
    BOBJECT_TYPES.ACTIVITY,
  );

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { activities: items, isLoading, totalMatching, resetItems };
};
