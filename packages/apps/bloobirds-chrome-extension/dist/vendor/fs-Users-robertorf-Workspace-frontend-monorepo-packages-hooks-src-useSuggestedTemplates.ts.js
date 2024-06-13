import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import {
  TASK_ACTION,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TemplateStage
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getValueFromLogicRole, injectReferencesSearchProcess } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { startOfDay } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { useMessagingTemplates } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useMessagingTemplates.ts.js";
import { BASE_SEARCH_REQUEST } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useTasksFeed.ts.js";
const NEEDED_COLUMNS = [
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
  TASK_FIELDS_LOGIC_ROLE.PRIORITY,
  TASK_FIELDS_LOGIC_ROLE.TEMPLATE,
  TASK_FIELDS_LOGIC_ROLE.SUGGESTED_PITCH,
  TASK_FIELDS_LOGIC_ROLE.SUGGESTED_LINKEDIN_TEMPLATE,
  TASK_FIELDS_LOGIC_ROLE.SUGGESTED_WHATSAPP_TEMPLATE
];
const isTodayOrOverdue = (task) => {
  const date = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  return startOfDay(new Date(date)) <= startOfDay(new Date());
};
const taskTypes = ["PROSPECT_CADENCE", "CUSTOM_TASK", "SCHEDULED_EMAIL"];
const getQueryDictionary = (bobjectId) => {
  if (!bobjectId)
    return;
  const isCompanyId = bobjectId.includes("Company");
  const isOpportunityId = bobjectId.includes("Opportunity");
  return {
    query: {
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: taskTypes,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
        TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
        TASK_STATUS_VALUE_LOGIC_ROLE.TODO
      ]
    },
    columns: NEEDED_COLUMNS,
    page: 0,
    pageSize: 100,
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
    queries: [
      {
        [TASK_FIELDS_LOGIC_ROLE[isCompanyId ? "COMPANY" : isOpportunityId ? "OPPORTUNITY" : "LEAD"]]: [bobjectId]
      }
    ],
    ...BASE_SEARCH_REQUEST
  };
};
var TypeConverter = /* @__PURE__ */ ((TypeConverter2) => {
  TypeConverter2["Pitches"] = "PITCH";
  TypeConverter2["Emails"] = "EMAIL";
  TypeConverter2["LinkedIn"] = "LINKEDIN_MESSAGE";
  TypeConverter2["QualifyingQuestions"] = "QUALIFYING_QUESTION";
  TypeConverter2["Snippets"] = "SNIPPET";
  TypeConverter2["WhatsApp"] = "WHATSAPP";
  return TypeConverter2;
})(TypeConverter || {});
var LogicRoleConverter = ((LogicRoleConverter2) => {
  LogicRoleConverter2[LogicRoleConverter2["Emails"] = TASK_FIELDS_LOGIC_ROLE.TEMPLATE] = "Emails";
  LogicRoleConverter2[LogicRoleConverter2["Pitches"] = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_PITCH] = "Pitches";
  LogicRoleConverter2[LogicRoleConverter2["LinkedIn"] = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_LINKEDIN_TEMPLATE] = "LinkedIn";
  LogicRoleConverter2[LogicRoleConverter2["WhatsApp"] = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_WHATSAPP_TEMPLATE] = "WhatsApp";
  return LogicRoleConverter2;
})(LogicRoleConverter || {});
function getTemplateId(task, templateType) {
  const logicRole = LogicRoleConverter[templateType];
  return getValueFromLogicRole(task, logicRole);
}
export const useSuggestedTemplates = (bobject, context, templateType) => {
  const [tasks, setTasks] = useState([]);
  const bobjectId = bobject?.id?.value;
  useEffect(() => {
    if (bobject && bobject?.id?.accountId) {
      api.post("/bobjects/" + bobject?.id?.accountId + "/Task/search", getQueryDictionary(bobjectId)).then((response) => {
        if (response?.data) {
          const tasks2 = injectReferencesSearchProcess(response?.data)?.contents;
          setTasks(tasks2);
        }
      });
    }
  }, [bobjectId]);
  const ids = useMemo(
    () => tasks?.reduce((acc, t) => {
      const templateId = getTemplateId(t, templateType);
      if (templateId && isTodayOrOverdue(t)) {
        acc.push({
          id: templateId,
          taskTitle: getValueFromLogicRole(t, TASK_FIELDS_LOGIC_ROLE.TITLE)
        });
      }
      return acc;
    }, []),
    [tasks.length]
  );
  const { messagingTemplates } = useMessagingTemplates({
    type: TypeConverter[templateType],
    size: 1e3,
    page: 0,
    stage: TemplateStage.All,
    name: "",
    visibility: "PUBLIC",
    segmentationValues: {},
    onlyMine: false,
    onlyOfficials: false,
    onlyBattlecards: false
  });
  return useMemo(() => {
    if (!messagingTemplates?.length || !ids || Object.values(ids).length === 0)
      return [];
    return ids.reduce((acc, { id, taskTitle }) => {
      const matchingTemplate = messagingTemplates?.find((template) => template.id === id);
      if (matchingTemplate) {
        acc.push({ ...matchingTemplate, taskTitle });
      }
      return acc;
    }, []);
  }, [messagingTemplates?.length, ids?.length]);
};
