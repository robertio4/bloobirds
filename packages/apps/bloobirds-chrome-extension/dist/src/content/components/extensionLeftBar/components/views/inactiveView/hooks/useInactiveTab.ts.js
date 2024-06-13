import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useDidMountEffect, useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useAggregationSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import {
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, injectReferencesSearchProcess, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { TypeSearch } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { BASE_SEARCH_REQUEST } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import {
  COLUMNS_BY_BOBJECT_TYPE,
  COLUMNS_REFERENCED_BY_BOBJECT_TYPE,
  getSortFields,
  INACTIVE_FIELDS_LOGIC_ROLE,
  INACTIVE_YES_FIELDS_LOGIC_ROLE,
  SALES_STATUS_FIELDS_LOGIC_ROLE,
  STATUS_FIELDS_LOGIC_ROLE,
  STATUS_VALUES_LOGIC_ROLE
} from "/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.constants.ts.js";
const PAGE_SIZE = 25;
const getQueries = (tabBobject, dataModel) => {
  let statuses;
  if (tabBobject !== BobjectTypes.Opportunity) {
    statuses = dataModel.findValuesByFieldLogicRole(SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject])?.filter(
      (salesStatus) => !["__CLIENT", "__DISCARDED", "__ON_HOLD"].some(
        (term) => salesStatus?.logicRole?.includes(term)
      )
    )?.map((status) => status?.id);
  } else {
    statuses = dataModel.findValuesByFieldLogicRole(SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject])?.filter(
      (salesStatus) => ![
        OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
        OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON
      ].includes(salesStatus?.logicRole)
    )?.map((status) => status?.id);
  }
  if (tabBobject === BobjectTypes.Opportunity) {
    return [
      {
        [SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject]]: statuses
      }
    ];
  }
  return [
    {
      [STATUS_FIELDS_LOGIC_ROLE[tabBobject]]: STATUS_VALUES_LOGIC_ROLE[tabBobject]
    },
    {
      [SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject]]: statuses
    }
  ];
};
export const fetchTasks = (bobjectType, query, sort, accountId, page, dataModel, type = TypeSearch.SEARCH, setIsLoading) => {
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];
  const queries = getQueries(bobjectType, dataModel);
  return api.post(`/bobjects/${accountId}/${bobjectType}/${type}`, {
    query,
    queries,
    columns,
    referencedColumns,
    ...BASE_SEARCH_REQUEST,
    page: 0,
    pageSize: page ? page * PAGE_SIZE : 1e3,
    sort: sort ? [sort] : void 0
  }).then((response) => {
    setIsLoading?.(false);
    return response;
  });
};
const getData = (key, page) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const { tabBobject, query, sort, setIsLoading } = useSubhomeContext();
  const sortValues = getSortFields(tabBobject)[sort];
  const { data, mutate, isValidating } = useSWR(
    key,
    () => fetchTasks(
      tabBobject,
      query,
      sortValues,
      accountId,
      page,
      dataModel,
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
  }, [query, sort]);
  useSubscribeListeners(tabBobject, mutate);
  return { data, mutate, isValidating };
};
export const useInactiveItems = (bobjectType) => {
  const [page, setPage] = useState(1);
  const fetchNextPage = () => {
    setPage(page + 1);
  };
  const { data, mutate, isValidating } = getData(
    `/bobjects/inactive/${bobjectType}/search/${page}`,
    page
  );
  const items = useMemo(() => {
    if (data?.data) {
      return injectReferencesSearchProcess(data?.data).contents;
    }
    return [];
  }, [data]);
  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { items, isLoading: isValidating, totalMatching, mutate, fetchNextPage };
};
const useGetQueryByBobject = (tabBobject) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const isB2CAccount = useIsB2CAccount();
  const query = {
    [FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO]: userId,
    [INACTIVE_FIELDS_LOGIC_ROLE[tabBobject]]: [INACTIVE_YES_FIELDS_LOGIC_ROLE[tabBobject]]
  };
  const columns = COLUMNS_BY_BOBJECT_TYPE[tabBobject];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[tabBobject];
  const queries = getQueries(tabBobject, dataModel);
  const { data } = useAggregationSubscription(
    tabBobject != BobjectTypes.Company || !isB2CAccount ? {
      query,
      queries,
      columns,
      referencedColumns,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: 1e3,
      sort: void 0
    } : null,
    tabBobject,
    [keepPreviousResponse]
  );
  return data?.data?.contents[0]?.value || 0;
};
export const useInactiveGlobalAggregation = () => {
  const inactiveCounters = {
    [BobjectTypes.Company]: useGetQueryByBobject(BobjectTypes.Company),
    [BobjectTypes.Lead]: useGetQueryByBobject(BobjectTypes.Lead),
    [BobjectTypes.Opportunity]: useGetQueryByBobject(BobjectTypes.Opportunity)
  };
  return {
    inactiveCounters,
    total: inactiveCounters[BobjectTypes.Company] + inactiveCounters[BobjectTypes.Lead] + inactiveCounters[BobjectTypes.Opportunity]
  };
};
