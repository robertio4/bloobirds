import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { BASE_SEARCH_REQUEST, useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export const TASK_COLUMNS = [
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME
];
export const TASK_REFERENCED_COLUMNS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME
];
export const useRescheduleCadence = (bobject) => {
  const activeUserId = useActiveUserId();
  const [nextTask, setNextTask] = useState();
  useEffect(() => {
    if (bobject.id.accountId)
      getNextTask();
  }, [bobject?.id?.value]);
  const queries = {
    Company: [
      {
        [TASK_FIELDS_LOGIC_ROLE.COMPANY]: [bobject?.id?.value]
      }
    ],
    Lead: [
      {
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: [bobject?.id?.value]
      }
    ],
    Opportunity: [
      {
        [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [bobject?.id?.value]
      }
    ]
  };
  const getNextTask = () => {
    const query = {
      query: {
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: ["PROSPECT_CADENCE"],
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
          TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
          TASK_STATUS_VALUE_LOGIC_ROLE.TODO
        ]
      },
      page: 0,
      pageSize: 1,
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
      queries: queries[bobject?.id?.typeName],
      columns: TASK_COLUMNS,
      referencedColumns: TASK_REFERENCED_COLUMNS,
      ...BASE_SEARCH_REQUEST
    };
    api.post("/bobjects/" + bobject.id.accountId + "/Task/search", query).then(({ data }) => {
      setNextTask(data?.contents?.[0]);
    });
  };
  const getNextTaskDate = () => {
    return nextTask && (getValueFromLogicRole(nextTask, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE) || getValueFromLogicRole(nextTask, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));
  };
  const handleSubmit = (date, task) => {
    const body = {
      userId: activeUserId,
      taskFromId: task.id.value,
      rescheduleAllCadence: true,
      newDate: date
    };
    return api.put("/messaging/cadences/rescheduleStep", body).then(() => {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Task }
        })
      );
    });
  };
  return {
    nextTask,
    getNextTaskDate,
    handleSubmit
  };
};
