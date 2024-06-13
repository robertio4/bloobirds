import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useDidMountEffect } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useAggregationSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import {
  TASK_ACTION_VALUE,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  BobjectTypes
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import {
  addTaskDateGrouping,
  api,
  endOfDay,
  injectReferencesSearchProcess,
  keepPreviousResponse
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport6_lodash_isEmpty from "/vendor/.vite-deps-lodash_isEmpty.js__v--1143220c.js"; const isEmpty = __vite__cjsImport6_lodash_isEmpty.__esModule ? __vite__cjsImport6_lodash_isEmpty.default : __vite__cjsImport6_lodash_isEmpty;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { checkIsOverdue, TypeSearch } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { BASE_SEARCH_REQUEST } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { TASK_COLUMNS, TASK_REFERENCED_COLUMNS } from "/src/content/components/extensionLeftBar/components/views/outboxView/outbox.constants.ts.js";
const PAGE_SIZE = 1e3;
const fetchOutbox = (query, queries, accountId, page, type = TypeSearch.SEARCH, setIsLoading) => {
  return api.post(`/bobjects/${accountId}/Task/${type}`, {
    query,
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
    ],
    queries: queries && Object.keys(queries).length > 0 ? queries : [
      {
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.SCHEDULED_EMAIL],
        [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
          TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING
        ]
      },
      {
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE],
        [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
          TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES
        ]
      }
    ]
  }).then((response) => {
    setIsLoading?.(false);
    return response;
  });
};
const getData = (key, page) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const { query, subquery, setIsLoading } = useSubhomeContext();
  if (!query && Object.keys(query).length === 0) {
    return { data: null };
  }
  const { data, mutate, isValidating } = useSWR(
    key,
    () => fetchOutbox(
      query,
      subquery && !isEmpty(subquery) ? [subquery] : void 0,
      accountId,
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
    () => data && addTaskDateGrouping(
      injectReferencesSearchProcess(data?.data)?.contents,
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      checkIsOverdue,
      t,
      i18n.language
    ),
    [data, i18n.language]
  );
  const totalMatching = useMemo(() => data?.data?.totalMatching, [data]);
  return {
    items: filteredActivities,
    isLoading: isValidating,
    totalMatching,
    mutate,
    fetchNextPage
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
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE
    ],
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        lte: endOfDay(new Date())
      },
      searchMode: "RANGE__SEARCH"
    }
  };
  const { data } = useAggregationSubscription(
    {
      query,
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
      ],
      queries: [
        {
          [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.SCHEDULED_EMAIL],
          [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING]
        },
        {
          [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE],
          [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES]
        }
      ]
    },
    BobjectTypes.Task,
    [keepPreviousResponse]
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
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED
      ]
    },
    {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [TASK_TYPE.PROSPECT_CADENCE],
      [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES],
      [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: [
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED
      ]
    }
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
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED
      ]
    }
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
        TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED
      ]
    }
  ];
  return useOutboxGlobalAggregation(`/bobjects/outbox/scheduledEmailsGlobalAggregation`, subquery);
};
