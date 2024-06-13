import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useCustomTasks, useDidMountEffect, useNoStatusOppSetting } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useAggregationSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  BobjectTypes,
  FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import {
  addTaskDateGrouping,
  api,
  endOfDay,
  injectReferencesSearchProcess,
  keepPreviousResponse
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { checkIsOverdue, TypeSearch } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { useSalesforceStatusFilter } from "/src/content/components/extensionLeftBar/components/views/pipelineView/hooks/useSalesforceStatusFilter.ts.js";
import { BASE_SEARCH_REQUEST } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { TASK_COLUMNS, TASK_REFERENCED_COLUMNS } from "/src/content/components/extensionLeftBar/components/views/nurturingView/nurturingTab.constants.ts.js";
const PAGE_SIZE = 25;
const getQueries = (stage, statuses, isNoStatusOppSetting, oppNoStatusQuery) => {
  const queries = [
    {
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
        query: {
          [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: [COMPANY_STATUS_LOGIC_ROLE.NURTURING],
          [COMPANY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ["__MATCH_FULL_ROWS__"],
          ...stage !== "ALL" && {
            [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
              stage === "PROSPECT" ? COMPANY_STAGE_LOGIC_ROLE.PROSPECT : COMPANY_STAGE_LOGIC_ROLE.SALES
            ]
          }
        },
        searchMode: "SUBQUERY__SEARCH"
      },
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: ["__MATCH_EMPTY_ROWS__"]
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
        query: {
          [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: [
            COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING
          ],
          [COMPANY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ["__MATCH_FULL_ROWS__"],
          ...stage !== "ALL" && {
            [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
              stage === "PROSPECT" ? COMPANY_STAGE_LOGIC_ROLE.PROSPECT : COMPANY_STAGE_LOGIC_ROLE.SALES
            ]
          }
        },
        searchMode: "SUBQUERY__SEARCH"
      },
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: isNoStatusOppSetting ? ["__MATCH_EMPTY_ROWS__"] : void 0,
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: ["__MATCH_EMPTY_ROWS__"]
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
        query: {
          [LEAD_FIELDS_LOGIC_ROLE.STATUS]: [LEAD_STATUS_LOGIC_ROLE.NURTURING],
          [LEAD_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ["__MATCH_FULL_ROWS__"],
          ...stage !== "ALL" && {
            [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [
              stage === "PROSPECT" ? LEAD_STAGE_LOGIC_ROLE.PROSPECT : LEAD_STAGE_LOGIC_ROLE.SALES
            ]
          }
        },
        searchMode: "SUBQUERY__SEARCH"
      }
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
        query: {
          [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING],
          [LEAD_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ["__MATCH_FULL_ROWS__"],
          ...stage !== "ALL" && {
            [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [
              stage === "PROSPECT" ? LEAD_STAGE_LOGIC_ROLE.PROSPECT : LEAD_STAGE_LOGIC_ROLE.SALES
            ]
          }
        },
        searchMode: "SUBQUERY__SEARCH"
      }
    }
  ];
  if (isNoStatusOppSetting) {
    queries.push({
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: {
        query: {
          ...oppNoStatusQuery,
          ...{ [OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ["__MATCH_FULL_ROWS__"] }
        },
        searchMode: "SUBQUERY__SEARCH"
      }
    });
  } else {
    queries.push({
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: {
        query: {
          [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: statuses.length === 0 ? ["__MATCH_EMPTY_ROWS__"] : statuses.map((status) => status.id),
          [OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ["__MATCH_FULL_ROWS__"]
        },
        searchMode: "SUBQUERY__SEARCH"
      }
    });
  }
  return queries;
};
export const fetchTasks = (query, stage, statuses, isNoStatusOppSetting, accountId, page, type = TypeSearch.SEARCH, oppNoStatusQuery, setIsLoading) => {
  const queries = getQueries(stage, statuses, isNoStatusOppSetting, oppNoStatusQuery);
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
const getData = (key, page) => {
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const statuses = dataModel.findValuesByFieldLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS)?.filter((a) => a.isNurturing);
  const { parseSalesforceStatus } = useSalesforceStatusFilter(BobjectTypes.Opportunity);
  const salesForceStatusField = dataModel?.findFieldByLogicRole(
    FIELDS_LOGIC_ROLE[BobjectTypes.Opportunity].SALESFORCE_STATUS
  );
  const oppNoStatusQuery = parseSalesforceStatus(
    {
      [salesForceStatusField?.id]: ["SFDC_STATUS_TYPE_NURTURING"]
    },
    BobjectTypes.Opportunity
  );
  const { query, stage, setIsLoading } = useSubhomeContext();
  const { data, mutate, isValidating } = useSWR(
    key,
    () => fetchTasks(
      query,
      stage,
      statuses,
      isNoStatusOppSetting,
      accountId,
      page,
      TypeSearch.SEARCH,
      oppNoStatusQuery,
      setIsLoading
    ),
    {
      use: [keepPreviousResponse]
    }
  );
  useDidMountEffect(() => {
    setIsLoading?.(true);
    mutate();
  }, [query, stage]);
  useSubscribeListeners(BobjectTypes.Task, mutate);
  return { data, mutate, isValidating };
};
export const useNurturingTab = () => {
  const [page, setPage] = useState(1);
  const { customTasks } = useCustomTasks();
  const { t, i18n } = useTranslation();
  const fetchNextPage = () => {
    setPage(page + 1);
  };
  const { data, mutate, isValidating } = getData(`/bobjects/tasks/nurturing/${page}`, page);
  const filteredTasks = useMemo(() => {
    return data && addTaskDateGrouping(
      injectReferencesSearchProcess(data?.data)?.contents,
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      checkIsOverdue,
      t,
      i18n.language
    );
  }, [data, i18n.language]);
  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return {
    items: filteredTasks,
    isLoading: isValidating,
    totalMatching,
    mutate,
    fetchNextPage,
    customTasks
  };
};
export const useNurturingGlobalAggregation = (key, taskTypes) => {
  const { useGetDataModel, useGetSettings } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const statuses = dataModel.findValuesByFieldLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS)?.filter((a) => a.isNurturing);
  const { parseSalesforceStatus } = useSalesforceStatusFilter(BobjectTypes.Opportunity);
  const salesForceStatusField = dataModel?.findFieldByLogicRole(
    FIELDS_LOGIC_ROLE[BobjectTypes.Opportunity].SALESFORCE_STATUS
  );
  const oppNoStatusQuery = parseSalesforceStatus(
    {
      [salesForceStatusField?.id]: ["SFDC_STATUS_TYPE_NURTURING"]
    },
    BobjectTypes.Opportunity
  );
  const query = {
    [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE
    ],
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        lte: endOfDay(new Date())
      },
      searchMode: "RANGE__SEARCH"
    },
    [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
      "__MATCH_EMPTY_ROWS__",
      TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO
    ]
  };
  const queries = getQueries("ALL", statuses, isNoStatusOppSetting, oppNoStatusQuery);
  const { data } = useAggregationSubscription(
    {
      query,
      queries,
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
export const useNurturingAllGlobalAggregation = () => {
  return useNurturingGlobalAggregation(`/bobjects/nurturing/globalAggregation`, [
    TASK_TYPE.PROSPECT_CADENCE,
    TASK_TYPE.NEXT_STEP
  ]);
};
export const useNurturingOnCadenceGlobalAggregation = () => {
  return useNurturingGlobalAggregation(`/bobjects/nurturing/onCadenceGlobalAggregation`, [
    TASK_TYPE.PROSPECT_CADENCE
  ]);
};
export const useNurturingManualTasksGlobalAggregation = () => {
  return useNurturingGlobalAggregation(`/bobjects/nurturing/manualTasksGlobalAggregation`, [
    TASK_TYPE.NEXT_STEP
  ]);
};
