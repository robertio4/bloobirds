import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useDidMountEffect, useIsB2CAccount, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useAggregationSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import {
  BobjectTypes,
  ExtensionHelperKeys,
  FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, injectReferencesSearchProcess, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { TypeSearch } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import {
  SALES_STATUS_FIELDS_LOGIC_ROLE,
  STATUS_FIELDS_LOGIC_ROLE
} from "/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.constants.ts.js";
import { BASE_SEARCH_REQUEST } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import {
  COLUMNS_BY_BOBJECT_TYPE,
  COLUMNS_REFERENCED_BY_BOBJECT_TYPE,
  getSortFields
} from "/src/content/components/extensionLeftBar/components/views/pipelineView/pipelineTab.constants.ts.js";
const PAGE_SIZE = 25;
export const fetchBobjects = (bobjectType, query, queries, sort, accountId, page, type = TypeSearch.SEARCH, querieAggregation, setIsLoading) => {
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];
  let withNestedKeys;
  if (queries && Object.keys(queries).length > 0) {
    withNestedKeys = Object.entries(queries).map((entry) => {
      return { [entry[0]]: entry[1] };
    });
  }
  return api.post(`/bobjects/${accountId}/${bobjectType}/${type}`, {
    query,
    queries: querieAggregation || (withNestedKeys ? withNestedKeys : void 0),
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
const parseStatusQueries = (query, subquery, tabBobject, dataModel) => {
  const statusFieldId = dataModel.findFieldByLogicRole(STATUS_FIELDS_LOGIC_ROLE[tabBobject])?.id;
  const salesStatusFieldId = dataModel.findFieldByLogicRole(
    SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject]
  )?.id;
  const prospectingStatuses = dataModel.findValuesByFieldLogicRole(STATUS_FIELDS_LOGIC_ROLE[tabBobject])?.map(({ id }) => id);
  const salesStatuses = dataModel.findValuesByFieldLogicRole(SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject])?.map(({ id }) => id);
  const statusQueryValue = query[statusFieldId];
  if (!statusQueryValue)
    return {
      query,
      subquery
    };
  const hasProspectingStatus = prospectingStatuses.some(
    (statusValue) => statusQueryValue.includes(statusValue)
  );
  const hasSalesStatus = salesStatuses.some((statusValue) => statusQueryValue.includes(statusValue));
  if (hasProspectingStatus && hasSalesStatus) {
    delete query[statusFieldId];
    subquery = {
      [statusFieldId]: statusQueryValue.filter(
        (statusValue) => prospectingStatuses.includes(statusValue)
      ),
      [salesStatusFieldId]: statusQueryValue.filter(
        (statusValue) => salesStatuses.includes(statusValue)
      )
    };
  } else if (hasSalesStatus && !hasProspectingStatus) {
    delete Object.assign(query, { [salesStatusFieldId]: query[statusFieldId] })[statusFieldId];
  }
  return {
    query,
    subquery
  };
};
const getData = (key, page) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const { tabBobject, query, subquery, sort, setIsLoading } = useSubhomeContext();
  const sortValues = getSortFields(tabBobject)[sort];
  const { query: parsedQuery, subquery: parsedSubquery } = parseStatusQueries(
    query,
    subquery,
    tabBobject,
    dataModel
  );
  const { data, mutate, isValidating } = useSWR(
    key,
    () => fetchBobjects(
      tabBobject,
      parsedQuery,
      parsedSubquery,
      sortValues,
      accountId,
      page,
      TypeSearch.SEARCH,
      null,
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
export const usePipelinesItems = (bobjectType) => {
  const [page, setPage] = useState(1);
  const fetchNextPage = () => {
    setPage(page + 1);
  };
  const { data, mutate, isValidating } = getData(
    `/bobjects/pipeline/${bobjectType}/search/${page}`,
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
const useGetQueryByBobject = ({
  bobjectType,
  assignedDate,
  userId
}) => {
  const isB2CAccount = useIsB2CAccount();
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];
  const query = {
    [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: userId
  };
  if (assignedDate) {
    query[FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE] = {
      ["query"]: { gte: assignedDate },
      searchMode: "RANGE__SEARCH"
    };
  }
  const { data } = useAggregationSubscription(
    bobjectType != BobjectTypes.Company || !isB2CAccount ? {
      query,
      columns,
      referencedColumns,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: 1e3,
      sort: void 0
    } : null,
    bobjectType,
    [keepPreviousResponse]
  );
  return { data };
};
export const getPipelineAggregation = ({
  lastAssignedDate,
  bobjectType
}) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const { data } = useGetQueryByBobject({
    bobjectType,
    userId,
    assignedDate: lastAssignedDate
  });
  return {
    count: lastAssignedDate ? data?.data?.contents[0]?.value || 0 : 0
  };
};
export const useLastVisitedPipelineTab = (bobjectType) => {
  const [date, setDate] = useState();
  const [stringDate, setStringDate] = useState();
  const { deleteHelper, helpers, forceSave } = useUserHelpers();
  const key = ExtensionHelperKeys[`PIPELINE_TAB_${bobjectType.toUpperCase()}_LAST_VISIT`];
  const dateKeyValue = helpers ? helpers[key] : void 0;
  useEffect(() => {
    if (dateKeyValue !== stringDate && dateKeyValue) {
      setStringDate(dateKeyValue);
      setDate(new Date(dateKeyValue));
    }
  }, [dateKeyValue]);
  const { count } = getPipelineAggregation({ bobjectType, lastAssignedDate: date });
  const resetCount = async () => {
    await deleteHelper(key);
    await forceSave(key);
  };
  return { count, resetCount, date };
};
export const usePipelineGlobalAggregation = () => {
  const {
    count: companyCount,
    resetCount: resetCompanyCount,
    date: companyDate
  } = useLastVisitedPipelineTab(BobjectTypes.Company);
  const {
    count: leadCount,
    resetCount: resetLeadCount,
    date: leadDate
  } = useLastVisitedPipelineTab(BobjectTypes.Lead);
  const {
    count: opportunityCount,
    resetCount: resetOpportunityCount,
    date: opportunityDate
  } = useLastVisitedPipelineTab(BobjectTypes.Opportunity);
  const pipelineCounters = {
    [BobjectTypes.Company]: companyCount,
    [BobjectTypes.Lead]: leadCount,
    [BobjectTypes.Opportunity]: opportunityCount
  };
  const pipelineLastVisitDates = {
    [BobjectTypes.Company]: companyDate,
    [BobjectTypes.Lead]: leadDate,
    [BobjectTypes.Opportunity]: opportunityDate
  };
  const updateLastVisitedPipeline = (type) => {
    switch (type) {
      case BobjectTypes.Lead:
        resetLeadCount();
        break;
      case BobjectTypes.Opportunity:
        resetOpportunityCount();
        break;
      case BobjectTypes.Company:
        resetCompanyCount();
        break;
      default:
        break;
    }
  };
  return { pipelineCounters, pipelineLastVisitDates, updateLastVisitedPipeline };
};
