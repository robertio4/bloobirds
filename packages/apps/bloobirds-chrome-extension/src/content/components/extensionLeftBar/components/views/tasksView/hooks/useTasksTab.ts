import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCustomTasks, useDidMountEffect, useLocalStorage } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  LocalStorageKeys,
  QuickFilter,
  TASK_FIELDS_LOGIC_ROLE,
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
import { checkIsOverdue, TypeSearch } from '../../../../extensionLeftBar.utils';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { Clusters } from '../../newTasksView/types';
import { BASE_SEARCH_REQUEST, Stages } from '../../view.utils';
import { TASK_COLUMNS, TASK_REFERENCED_COLUMNS } from '../tasksTab.constants';
import { getQueries, getQuery, getTypeOptions } from './utils/useTasksTab.utils';

const PAGE_SIZE = 25;

const fetchTasks = (
  query: { [x: string]: any },
  subqueries: { [x: string]: any },
  stage: Stages,
  accountId: string,
  page: number,
  type: TypeSearch = TypeSearch.SEARCH,
  setIsLoading?: (isLoading: boolean) => void,
) => {
  const queries = getQueries(stage, subqueries);

  return api
    .post(`/bobjects/${accountId}/Task/${type}`, {
      query,
      queries,
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
    })
    .then(response => {
      setIsLoading?.(false);
      return response;
    });
};

const useGetData = (key: string, page: number, type: TypeSearch) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const { query, stage, subquery, setIsLoading } = useSubhomeContext();
  const { data, mutate, isValidating } = useSWR(
    key,
    () => fetchTasks(query, subquery, stage, accountId, page, type, setIsLoading),
    {
      use: [keepPreviousResponse],
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    },
  );

  useSubscribeListeners(BobjectTypes.Task, mutate);

  useDidMountEffect(() => {
    setIsLoading?.(true);
    mutate();
  }, [query, stage]);

  return { data, mutate, isValidating };
};

export const useTasksTab = () => {
  const [page, setPage] = useState(1);
  const { customTasks } = useCustomTasks();
  const { t, i18n } = useTranslation();

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const { data, mutate, isValidating } = useGetData(
    `/bobjects/tasks/query/${page}`,
    page,
    TypeSearch.SEARCH,
  );

  const filteredTasks = useMemo(
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

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  return {
    items: filteredTasks,
    isLoading: !filteredTasks && isValidating,
    totalMatching,
    mutate,
    fetchNextPage,
    customTasks,
  };
};

const getAllTasks = (
  key: string,
  taskTypeOptions: any,
  stage: Stages = 'ALL',
  type: TypeSearch,
) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const accountId = settings?.account?.id;
  const { get } = useLocalStorage();
  const savedSubqueries = get(LocalStorageKeys.TaskTypeSubQuery);
  const subqueries = savedSubqueries ? JSON.parse(savedSubqueries) : [];

  const { data, mutate, isValidating } = useSWR(key ? key + userId : null, () =>
    fetchTasks(getQuery(taskTypeOptions, userId), subqueries, stage, accountId, 1, type),
  );

  return { data, mutate, isValidating };
};
const fetchByCluster = (key: string, clusterBody) => {
  return api.post(key, clusterBody).then(response => {
    return response;
  });
};

export const useTasksAllSearch = (
  stage: Stages,
  quickFilter: QuickFilter,
  cluster: { key: keyof Clusters; body: Record<string, any> },
) => {
  const accountId = useExtensionContext().useGetSettings()?.account?.id;
  const typeOptions = getTypeOptions(quickFilter?.id);

  const { data, mutate, isValidating } = getAllTasks(
    `/bobjects/tasks/allSearch${quickFilter?.id || ''}/${stage}`,
    typeOptions,
    stage,
    TypeSearch.SEARCH,
  );
  const {
    data: clusterData,
    isLoading: isLoadingClusterData,
    mutate: mutateClusterData,
  } = useSWR(
    cluster
      ? `/bobjects/${accountId}/task/search/startTasks?cluster=${cluster.key.toUpperCase()}`
      : null,
    key => fetchByCluster(key, cluster.body),
  );

  useSubscribeListeners(BobjectTypes.Task, mutateClusterData);

  const returnedTasks = cluster ? clusterData?.data : data?.data;
  return {
    tasks: returnedTasks && injectReferencesSearchProcess(returnedTasks)?.contents,
    isLoading: isValidating || isLoadingClusterData,
    mutate,
  };
};

export const useTasksGlobalAggregation = (taskTypeOptions: any, stage: Stages = 'ALL') => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const { get } = useLocalStorage();
  const savedSubqueries = get(LocalStorageKeys.TaskTypeSubQuery);
  const subqueries = savedSubqueries ? JSON.parse(savedSubqueries) : [];

  const { data } = useAggregationSubscription(
    {
      // @ts-ignore the types come from different packages
      query: getQuery(taskTypeOptions, userId),
      queries: getQueries(stage, subqueries),
      columns: TASK_COLUMNS,
      referencedColumns: TASK_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: 1000,
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          // @ts-ignore the types come from different packages
          direction: 'ASC',
        },
      ],
    },
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value || 0;
};

export const useTasksAggregation = (stage: Stages = 'ALL', quickFilter?: QuickFilter) => {
  const typeOptions = getTypeOptions(quickFilter?.id);

  return useTasksGlobalAggregation(typeOptions, stage);
};
