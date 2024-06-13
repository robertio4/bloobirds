import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDidMountEffect } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  REPORTED_VALUES_LOGIC_ROLE,
  Direction,
} from '@bloobirds-it/types';
import {
  addTaskDateGrouping,
  api,
  injectReferencesSearchProcess,
  keepPreviousResponse,
} from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useSubscribeListeners } from '../../../../../contactView/hooks/useSubscribeListeners';
import { useExtensionContext } from '../../../../../context';
import { TypeSearch } from '../../../../extensionLeftBar.utils';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { BASE_SEARCH_REQUEST } from '../../view.utils';
import { ACTIVITY_COLUMNS, REFERENCED_COLUMNS } from '../meetingsTab.constants';

const PAGE_SIZE = 25;

export const fetchTasks = (
  query: { [x: string]: string | string[] },
  subQueryValue: { [x: string]: string | string[] },
  accountId: string,
  userId: string,
  page: number,
  type: TypeSearch = TypeSearch.SEARCH,
  setIsLoading: (value: boolean) => void,
) =>
  api
    .post(`/bobjects/${accountId}/Activity/${type}`, {
      query,
      queries: [
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: subQueryValue ? subQueryValue : [userId],
        },
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: subQueryValue
            ? subQueryValue
            : [userId],
        },
      ],
      columns: ACTIVITY_COLUMNS,
      referencedColumns: REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: Direction.ASC,
        },
      ],
    })
    .then(response => {
      setIsLoading?.(false);
      return response;
    });

const getData = (key: string, page: number) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const accountId = settings?.account?.id;

  const userId = settings?.user?.id;

  const { query, setIsLoading, haveFiltersBeenChanged } = useSubhomeContext();
  const userFieldId = dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER)?.id;

  const subQueryValue = useMemo(() => {
    if (Object.keys(query)?.includes(userFieldId) && haveFiltersBeenChanged) {
      return query[userFieldId];
    } else {
      return undefined;
    }
  }, [query]);
  const queryWithoutUser = Object.keys(query)
    ?.filter(key => !key.includes(userFieldId))
    .reduce((obj, key) => {
      obj[key] = query[key];
      return obj;
    }, {});

  const { data, mutate, isValidating } = useSWR(
    key,
    () =>
      fetchTasks(
        queryWithoutUser,
        subQueryValue,
        accountId,
        userId,
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

  useSubscribeListeners(BobjectTypes.Activity, mutate);

  return { data, mutate, isValidating };
};

export const useMeetingsTab = () => {
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const { data, mutate, isValidating } = getData(`/bobjects/activities/meetingsTab/${page}`, page);

  const filteredActivities = useMemo(() => {
    return (
      data &&
      addTaskDateGrouping(
        injectReferencesSearchProcess(data?.data)?.contents,
        ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
        () => false,
        t,
        i18n.language,
      )
    );
  }, [data, i18n.language]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  return {
    items: filteredActivities,
    isLoading: isValidating,
    totalMatching,
    mutate,
    fetchNextPage,
  };
};

export const useMeetingsGlobalAggregation = () => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;

  const query = {
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING],
    [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: [REPORTED_VALUES_LOGIC_ROLE.NO, '__MATCH_EMPTY_ROWS__'],
    [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: ['__MATCH_FULL_ROWS__'],
  };

  const { data } = useAggregationSubscription(
    {
      query,
      // @ts-ignore
      queries: [
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: [userId],
        },
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: [userId],
        },
      ],
      referencedColumns: REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: 1000,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: Direction.ASC,
        },
      ],
    },
    BobjectTypes.Activity,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value || 0;
};
