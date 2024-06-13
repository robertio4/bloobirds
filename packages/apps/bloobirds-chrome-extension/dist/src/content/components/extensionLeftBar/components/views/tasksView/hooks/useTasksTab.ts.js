import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useCustomTasks, useDidMountEffect, useLocalStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useAggregationSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import {
  BobjectTypes,
  LocalStorageKeys,
  TASK_FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import {
  addTaskDateGrouping,
  api,
  injectReferencesSearchProcess,
  keepPreviousResponse
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { checkIsOverdue, TypeSearch } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { BASE_SEARCH_REQUEST } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { TASK_COLUMNS, TASK_REFERENCED_COLUMNS } from "/src/content/components/extensionLeftBar/components/views/tasksView/tasksTab.constants.ts.js";
import { getQueries, getQuery, getTypeOptions } from "/src/content/components/extensionLeftBar/components/views/tasksView/hooks/utils/useTasksTab.utils.ts.js";
const PAGE_SIZE = 25;
const fetchTasks = (query, subqueries, stage, accountId, page, type = TypeSearch.SEARCH, setIsLoading) => {
  const queries = getQueries(stage, subqueries);
  return api.post(`/bobjects/${accountId}/Task/${type}`, {
    query,
    queries,
    columns: TASK_COLUMNS,
    referencedColumns: TASK_REFERENCED_COLUMNS,
    ...BASE_SEARCH_REQUEST,
    page: 0,
    pageSize: page ? page * PAGE_SIZE : 1e3,
    sort: [
      {
        field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        direction: "ASC"
      },
      {
        field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
        direction: "ASC"
      }
    ]
  }).then((response) => {
    setIsLoading?.(false);
    return response;
  });
};
const useGetData = (key, page, type) => {
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
      revalidateOnMount: true
    }
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
    TypeSearch.SEARCH
  );
  const filteredTasks = useMemo(
    () => data && addTaskDateGrouping(
      injectReferencesSearchProcess(data?.data)?.contents,
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      checkIsOverdue,
      t,
      i18n.language
    ),
    [data, i18n.language]
  );
  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return {
    items: filteredTasks,
    isLoading: !filteredTasks && isValidating,
    totalMatching,
    mutate,
    fetchNextPage,
    customTasks
  };
};
const getAllTasks = (key, taskTypeOptions, stage = "ALL", type) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const accountId = settings?.account?.id;
  const { get } = useLocalStorage();
  const savedSubqueries = get(LocalStorageKeys.TaskTypeSubQuery);
  const subqueries = savedSubqueries ? JSON.parse(savedSubqueries) : [];
  const { data, mutate, isValidating } = useSWR(
    key ? key + userId : null,
    () => fetchTasks(getQuery(taskTypeOptions, userId), subqueries, stage, accountId, 1, type)
  );
  return { data, mutate, isValidating };
};
const fetchByCluster = (key, clusterBody) => {
  return api.post(key, clusterBody).then((response) => {
    return response;
  });
};
export const useTasksAllSearch = (stage, quickFilter, cluster) => {
  const accountId = useExtensionContext().useGetSettings()?.account?.id;
  const typeOptions = getTypeOptions(quickFilter?.id);
  const { data, mutate, isValidating } = getAllTasks(
    `/bobjects/tasks/allSearch${quickFilter?.id || ""}/${stage}`,
    typeOptions,
    stage,
    TypeSearch.SEARCH
  );
  const {
    data: clusterData,
    isLoading: isLoadingClusterData,
    mutate: mutateClusterData
  } = useSWR(
    cluster ? `/bobjects/${accountId}/task/search/startTasks?cluster=${cluster.key.toUpperCase()}` : null,
    (key) => fetchByCluster(key, cluster.body)
  );
  useSubscribeListeners(BobjectTypes.Task, mutateClusterData);
  const returnedTasks = cluster ? clusterData?.data : data?.data;
  return {
    tasks: returnedTasks && injectReferencesSearchProcess(returnedTasks)?.contents,
    isLoading: isValidating || isLoadingClusterData,
    mutate
  };
};
export const useTasksGlobalAggregation = (taskTypeOptions, stage = "ALL") => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const { get } = useLocalStorage();
  const savedSubqueries = get(LocalStorageKeys.TaskTypeSubQuery);
  const subqueries = savedSubqueries ? JSON.parse(savedSubqueries) : [];
  const { data } = useAggregationSubscription(
    {
      query: getQuery(taskTypeOptions, userId),
      queries: getQueries(stage, subqueries),
      columns: TASK_COLUMNS,
      referencedColumns: TASK_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: 1e3,
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: "ASC"
        }
      ]
    },
    BobjectTypes.Task,
    [keepPreviousResponse]
  );
  return data?.data?.contents[0]?.value || 0;
};
export const useTasksAggregation = (stage = "ALL", quickFilter) => {
  const typeOptions = getTypeOptions(quickFilter?.id);
  return useTasksGlobalAggregation(typeOptions, stage);
};
