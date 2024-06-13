import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDidMountEffect } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  TASK_ACTION_VALUE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  BobjectTypes,
} from '@bloobirds-it/types';
import {
  addTaskDateGrouping,
  api,
  endOfDay,
  injectReferencesSearchProcess,
  keepPreviousResponse,
} from '@bloobirds-it/utils';
import isEmpty from 'lodash/isEmpty';
import useSWR from 'swr';

import { useSubscribeListeners } from '../../../../../contactView/hooks/useSubscribeListeners';
import { useExtensionContext } from '../../../../../context';
import { checkIsOverdue, TypeSearch } from '../../../../extensionLeftBar.utils';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { BASE_SEARCH_REQUEST } from '../../view.utils';
import { TASK_COLUMNS, TASK_REFERENCED_COLUMNS } from '../outbox.constants';

const PAGE_SIZE = 1000;

const fetchOutbox = (
  query: { [x: string]: any },
  queries: { [x: string]: any },
  accountId: string,
  page: number,
  type: TypeSearch = TypeSearch.SEARCH,
  setIsLoading: (arg0: boolean) => void,
) => {
  return api
    .post(`/bobjects/${accountId}/Task/${type}`, {
      query,
      columns: TASK_COLUMNS,
      referencedColumns: TASK_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: 'ASC',
        },
        {
          field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
          direction: 'ASC',
        },
      ],
      queries:
        queries && Object.keys(queries).length > 0
          ? queries
          : [
              {
                [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.SCHEDULED_EMAIL],
                [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
                  TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
                ],
              },
              {
                [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE],
                [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
                  TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES,
                ],
              },
            ],
    })
    .then(response => {
      setIsLoading?.(false);
      return response;
    });
};

const getData = (key: string, page: number) => {
  //const { haveFiltersBeenChanged } = useFilters();
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const { query, subquery, setIsLoading } = useSubhomeContext();

  if (!query && Object.keys(query).length === 0) {
    return { data: null };
  }

  const { data, mutate, isValidating } = useSWR(
    key,
    () =>
      fetchOutbox(
        query,
        subquery && !isEmpty(subquery) ? [subquery] : undefined,
        accountId,
        page,
        TypeSearch.SEARCH,
        setIsLoading,
      ),
    {
      use: [keepPreviousResponse],
    },
  );

  useDidMountEffect(() => {
    setIsLoading?.(true);
    mutate();
  }, [query]);

  useSubscribeListeners(BobjectTypes.Task, mutate);

  return { data, mutate, isValidating };
};

export const useOutboxTab = () => {
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const { data, mutate, isValidating } = getData(`/bobjects/outbox/query/${page}`, page);

  const filteredActivities = useMemo(
    () =>
      data &&
      addTaskDateGrouping(
        injectReferencesSearchProcess(data?.data)?.contents,
        TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        checkIsOverdue,
        t,
        i18n.language,
      ),
    [data, i18n.language],
  );

  const totalMatching = useMemo(() => data?.data?.totalMatching, [data]);

  return {
    items: filteredActivities,
    isLoading: isValidating,
    totalMatching,
    mutate,
    fetchNextPage,
  };
};

export const useOutboxGlobalAggregation = () => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;

  const query = {
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
    ],
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        lte: endOfDay(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
  };

  const { data } = useAggregationSubscription(
    {
      query,
      columns: TASK_COLUMNS,
      referencedColumns: TASK_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: 1000,
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: 'ASC',
        },
      ],
      queries: [
        {
          [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.SCHEDULED_EMAIL],
          [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING],
        },
        {
          [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE],
          [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES],
        },
      ],
    },
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value || 0;
};

export const useOutboxAllGlobalAggregation = () => {
  const subquery = [
    {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.SCHEDULED_EMAIL],
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
      ],
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE],
      [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES],
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
      ],
    },
  ];
  return useOutboxGlobalAggregation(`/bobjects/outbox/globalAggregation`, subquery);
};

export const useOutboxScheduledEmailsGlobalAggregation = () => {
  const subquery = [
    {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.SCHEDULED_EMAIL],
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
      ],
    },
  ];
  return useOutboxGlobalAggregation(`/bobjects/outbox/automatedEmailsGlobalAggregation`, subquery);
};

export const useOutboxAutomatedEmailsGlobalAggregation = () => {
  const subquery = [
    {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE],
      [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES],
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
      ],
    },
  ];
  return useOutboxGlobalAggregation(`/bobjects/outbox/scheduledEmailsGlobalAggregation`, subquery);
};
