import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/tasksView/filters/components/taskTypeFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/filters/components/taskTypeFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/filters/components/taskTypeFilter.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { useActiveAccountId, useCustomTasks, useNewCadenceTableEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { TASK_ACTION_VALUE, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const getStandardTaskTypes = (t) => [{
  logicRole: TASK_TYPE.NEXT_STEP,
  value: TASK_TYPE.NEXT_STEP,
  id: TASK_TYPE.NEXT_STEP,
  name: t("task")
}, {
  logicRole: TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL,
  value: TASK_ACTION_VALUE.CALL_YES,
  id: TASK_ACTION_VALUE.CALL_YES,
  name: t("call")
}, {
  logicRole: TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL,
  value: TASK_ACTION_VALUE.EMAIL_YES,
  id: TASK_ACTION_VALUE.EMAIL_YES,
  name: t("email")
}];
const baseSubQueries = {
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL]: [TASK_ACTION_VALUE.CALL_NO, "__MATCH_EMPTY_ROWS__"],
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL]: [TASK_ACTION_VALUE.EMAIL_NO, "__MATCH_EMPTY_ROWS__"],
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_LINKEDIN]: [TASK_ACTION_VALUE.LINKEDIN_MESSAGE_NO, "__MATCH_EMPTY_ROWS__"],
  [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK]: [TASK_ACTION_VALUE.CUSTOM_TASK_NO, "__MATCH_EMPTY_ROWS__"]
};
const getDefaultTaskTypeQuery = (qfApplied, isNextStepSelected) => {
  const options = isNextStepSelected ? ["onCadence", "meetingReminders"].includes(qfApplied?.id) ? ["__MATCH_EMPTY_ROWS__"] : [TASK_TYPE.NEXT_STEP] : [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP];
  return qfApplied && !isNextStepSelected ? {} : {
    [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: options
  };
};
export const parseTaskTypeQuery = (values = [], quickFilterApplied) => {
  if (values.length === 0)
    return [];
  const parsedQuery = [];
  const addQuery = (query, isNextStepSelected = false) => {
    parsedQuery.push({
      ...baseSubQueries,
      ...query,
      ...getDefaultTaskTypeQuery(quickFilterApplied, isNextStepSelected)
    });
  };
  const customTaskIds = values.filter((value) => ![TASK_TYPE.NEXT_STEP, TASK_ACTION_VALUE.CALL_YES, TASK_ACTION_VALUE.EMAIL_YES]?.includes(
    value
  )) || [];
  if (values.includes(TASK_TYPE.NEXT_STEP)) {
    addQuery({}, true);
  }
  if (values.includes(TASK_ACTION_VALUE.CALL_YES)) {
    addQuery({
      [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL]: TASK_ACTION_VALUE.CALL_YES
    });
  }
  if (values.includes(TASK_ACTION_VALUE.EMAIL_YES)) {
    addQuery({
      [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL]: TASK_ACTION_VALUE.EMAIL_YES
    });
  }
  if (customTaskIds.length > 0) {
    addQuery({
      [TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK]: TASK_ACTION_VALUE.CUSTOM_TASK_YES,
      [TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK]: customTaskIds
    });
  }
  return parsedQuery;
};
export const TaskTypeFilter = () => {
  _s();
  const {
    t: tasksT
  } = useTranslation("translation", {
    keyPrefix: "tasks.taskTypeSelector"
  });
  const {
    t
  } = useTranslation();
  const accountId = useActiveAccountId();
  const {
    customTasks
  } = useCustomTasks();
  const customTaskEnabled = useNewCadenceTableEnabled(accountId);
  const standardTaskTypes = getStandardTaskTypes(tasksT);
  const [taskTypesWithCustom, setTaskTypesWithCustom] = React.useState(standardTaskTypes);
  useEffect(() => {
    if (customTaskEnabled) {
      setTaskTypesWithCustom([...standardTaskTypes, ...customTasks?.map((custom) => ({
        name: custom.name,
        id: custom.id
      })) || []]);
    }
  }, [customTasks]);
  return /* @__PURE__ */ _jsxDEV(Filter, {
    fieldLR: TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
    placeholder: t("leftBar.filters.taskType"),
    values: taskTypesWithCustom,
    isMultiselect: true,
    options: {
      variant: "filters"
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 138,
    columnNumber: 5
  }, void 0);
};
_s(TaskTypeFilter, "bnivG4VGXsIixmLVfiScusd1NAo=", false, function() {
  return [useTranslation, useTranslation, useActiveAccountId, useCustomTasks, useNewCadenceTableEnabled];
});
_c = TaskTypeFilter;
var _c;
$RefreshReg$(_c, "TaskTypeFilter");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
