import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  SALESFORCE,
  TASK_ACTION
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import {
  addTaskDateGrouping,
  api,
  getValueFromLogicRole,
  injectReferencesSearchProcess,
  keepPreviousResponse
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { startOfDay, subDays } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const TASK_COLUMNS = [
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  TASK_FIELDS_LOGIC_ROLE.STATUS,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
  TASK_FIELDS_LOGIC_ROLE.DESCRIPTION,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
  TASK_FIELDS_LOGIC_ROLE.CADENCE,
  TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY,
  TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  TASK_FIELDS_LOGIC_ROLE.PRIORITY
];
export const TASK_REFERENCED_COLUMNS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
  COMPANY_FIELDS_LOGIC_ROLE.CADENCE,
  COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  LEAD_FIELDS_LOGIC_ROLE.STATUS,
  LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
  LEAD_FIELDS_LOGIC_ROLE.CADENCE,
  LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
  LEAD_FIELDS_LOGIC_ROLE.SALES_NAV_URL,
  LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY,
  ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
  SALESFORCE.OPPORTUNITY_ID_FIELD,
  SALESFORCE.CONTACT_ID_FIELD,
  SALESFORCE.LEAD_ID_FIELD,
  SALESFORCE.ACCOUNT_ID_FIELD,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.CADENCE
];
const taskTypes = ["PROSPECT_CADENCE", "CONTACT_BEFORE_MEETING", "NEXT_STEP", "SCHEDULED_EMAIL"];
const PAGE_SIZE = 25;
export const BASE_SEARCH_REQUEST = {
  formFields: true,
  injectReferences: true
};
export const checkIsOverdue = (item) => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));
  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};
export const useTasksFeed = (activeBobject, contextData, callback, pageSize) => {
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();
  const fetchNextPage = () => {
    setPage(page + 1);
  };
  const queries = {
    Company: [
      contextData?.opportunities && contextData?.opportunities?.length > 0 && {
        [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: contextData?.opportunities?.map(
          (opportunity) => opportunity?.id?.value
        )
      },
      contextData?.leads && contextData?.leads?.length > 0 && {
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: contextData?.leads?.map((lead) => lead?.id?.value)
      },
      {
        [TASK_FIELDS_LOGIC_ROLE.COMPANY]: [activeBobject?.id?.value]
      }
    ],
    Lead: [
      {
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: [activeBobject?.id?.value]
      },
      contextData?.company && {
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: [activeBobject?.id?.value],
        [TASK_FIELDS_LOGIC_ROLE.COMPANY]: [contextData?.company?.id?.value]
      }
    ],
    Opportunity: [
      {
        [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [activeBobject?.id?.value]
      },
      activeBobject?.leads && activeBobject?.leads?.length > 0 && {
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: activeBobject?.leads
      }
    ]
  };
  const fetchTasks = async () => {
    const query = {
      query: {
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
          TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
          TASK_STATUS_VALUE_LOGIC_ROLE.TODO
        ]
      },
      page: 0,
      pageSize: page && !pageSize ? page * PAGE_SIZE : pageSize,
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
      queries: queries[activeBobject?.id?.typeName]?.filter((o) => o),
      columns: TASK_COLUMNS,
      referencedColumns: TASK_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST
    };
    const response = activeBobject.id.accountId && await api.post("/bobjects/" + activeBobject.id.accountId + "/Task/search", query);
    if (response?.data) {
      const tasks = addTaskDateGrouping(
        injectReferencesSearchProcess(response?.data)?.contents,
        TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        checkIsOverdue,
        t,
        i18n.language
      );
      return {
        tasks,
        total: response.data?.totalMatching
      };
    }
    return null;
  };
  const { data, mutate, error, isValidating } = useSWR(
    activeBobject && contextData && `/tasksFeed/${activeBobject.id.value}/${page}/${pageSize ? pageSize : PAGE_SIZE}`,
    fetchTasks,
    {
      revalidateOnFocus: true,
      use: [keepPreviousResponse]
    }
  );
  callback?.(activeBobject?.id?.typeName, mutate);
  return {
    tasks: data?.tasks,
    total: data?.total,
    error,
    mutate,
    data,
    fetchNextPage,
    isLoading: isValidating
  };
};
