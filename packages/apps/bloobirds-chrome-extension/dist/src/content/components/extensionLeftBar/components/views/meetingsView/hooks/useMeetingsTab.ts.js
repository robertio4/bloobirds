import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useDidMountEffect } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useAggregationSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  REPORTED_VALUES_LOGIC_ROLE,
  Direction
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
import { TypeSearch } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { BASE_SEARCH_REQUEST } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { ACTIVITY_COLUMNS, REFERENCED_COLUMNS } from "/src/content/components/extensionLeftBar/components/views/meetingsView/meetingsTab.constants.ts.js";
const PAGE_SIZE = 25;
export const fetchTasks = (query, subQueryValue, accountId, userId, page, type = TypeSearch.SEARCH, setIsLoading) => api.post(`/bobjects/${accountId}/Activity/${type}`, {
  query,
  queries: [
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: subQueryValue ? subQueryValue : [userId]
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: subQueryValue ? subQueryValue : [userId]
    }
  ],
  columns: ACTIVITY_COLUMNS,
  referencedColumns: REFERENCED_COLUMNS,
  ...BASE_SEARCH_REQUEST,
  page: 0,
  pageSize: page ? page * PAGE_SIZE : 1e3,
  sort: [
    {
      field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      direction: Direction.ASC
    }
  ]
}).then((response) => {
  setIsLoading?.(false);
  return response;
});
const getData = (key, page) => {
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
      return void 0;
    }
  }, [query]);
  const queryWithoutUser = Object.keys(query)?.filter((key2) => !key2.includes(userFieldId)).reduce((obj, key2) => {
    obj[key2] = query[key2];
    return obj;
  }, {});
  const { data, mutate, isValidating } = useSWR(
    key,
    () => fetchTasks(
      queryWithoutUser,
      subQueryValue,
      accountId,
      userId,
      page,
      TypeSearch.SEARCH,
      setIsLoading
    ),
    {
      use: [keepPreviousResponse]
    }
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
    return data && addTaskDateGrouping(
      injectReferencesSearchProcess(data?.data)?.contents,
      ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      () => false,
      t,
      i18n.language
    );
  }, [data, i18n.language]);
  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return {
    items: filteredActivities,
    isLoading: isValidating,
    totalMatching,
    mutate,
    fetchNextPage
  };
};
export const useMeetingsGlobalAggregation = () => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const query = {
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING],
    [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: [REPORTED_VALUES_LOGIC_ROLE.NO, "__MATCH_EMPTY_ROWS__"],
    [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: ["__MATCH_FULL_ROWS__"]
  };
  const { data } = useAggregationSubscription(
    {
      query,
      queries: [
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: [userId]
        },
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: [userId]
        }
      ],
      referencedColumns: REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: 1e3,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: Direction.ASC
        }
      ]
    },
    BobjectTypes.Activity,
    [keepPreviousResponse]
  );
  return data?.data?.contents[0]?.value || 0;
};
