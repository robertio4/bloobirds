import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/tasksView/filters/tasksTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/filters/tasksTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/filters/tasksTabFilters.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter, FilterGroup, Filters, QuickFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMinimizableModals, useUserSearch, useIsNoStatusPlanAccount, useLocalStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, LocalStorageKeys, TASK_ACTION_VALUE, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import stylesQF from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { SubhomeResetButton } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton.tsx.js";
import { SubhomeStageFilter } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeStageFilter/subhomeStageFilter.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { scheduledFilterValues } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { StartTask } from "/src/content/components/extensionLeftBar/components/views/tasksView/components/startTask.tsx.js";
import { parseTaskTypeQuery, TaskTypeFilter } from "/src/content/components/extensionLeftBar/components/views/tasksView/filters/components/taskTypeFilter.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/tasksView/filters/tasksTabFilters.module.css.js";
import { tasksTabQuickFilters } from "/src/content/components/extensionLeftBar/components/views/tasksView/filters/tasksTabQuickFilters.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TasksTabFilters = () => {
  _s();
  const {
    useGetDataModel,
    useGetSettings
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const userFilterAvailable = settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();
  const {
    t
  } = useTranslation();
  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const priorityField = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const noPriorityField = priorityTasks?.find((priorityTask) => priorityTask.logicRole === "TASK__PRIORITY__NO_PRIORITY");
  const customTaskId = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)?.id;
  const taskTypeId = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.id;
  const {
    selectedTab,
    setQuery,
    setSubquery,
    stage,
    setHaveFiltersBeenChanged
  } = useSubhomeContext();
  const [quickFilterSelected, setQuickFilterSelected] = useState();
  const quickFilters = tasksTabQuickFilters(dataModel);
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const {
    set,
    remove
  } = useLocalStorage();
  function openTaskModal() {
    openMinimizableModal({
      type: "task",
      data: {
        location: "leftBar"
      }
    });
  }
  const onToggleSelected = (quickFilterSelected2) => {
    setQuickFilterSelected(quickFilterSelected2);
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.rightButtons,
      children: [/* @__PURE__ */ _jsxDEV(StartTask, {
        stage,
        quickFilter: quickFilterSelected
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        onClick: openTaskModal,
        children: "+"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Filters, {
      bobjectType: BobjectTypes.Task,
      tabName: `filters-${selectedTab}`,
      bobjectFields: dataModel,
      defaultQuickFilters: quickFilters,
      defaultFilters: [{
        fieldLR: TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
        defaultValue: [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP, TASK_TYPE.CONTACT_BEFORE_MEETING]
      }, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
        defaultValue: [userId]
      }, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
        defaultValue: [TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE, TASK_STATUS_VALUE_LOGIC_ROLE.TODO]
      }, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        defaultValue: "until_now"
      }, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
        defaultValue: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO, "__MATCH_EMPTY_ROWS__"]
      }],
      onQueryChange: ({
        query
      }) => {
        const noPriorityQuery = {};
        let taskTypeQuery = {};
        if (query) {
          const queriedFields = Object.keys(query);
          queriedFields.forEach((key) => {
            if (key === priorityField?.id) {
              const v = query[key].find((value) => value === noPriorityField?.id);
              if (v) {
                noPriorityQuery[key] = [...query[key], "__MATCH_EMPTY_ROWS__"];
              }
            }
            if (key === customTaskId) {
              taskTypeQuery = parseTaskTypeQuery(query[key], quickFilterSelected) || {};
              query[key] = [];
              if (!quickFilterSelected) {
                delete query[taskTypeId];
              }
              set(LocalStorageKeys.TaskTypeSubQuery, JSON.stringify(taskTypeQuery));
              setSubquery(taskTypeQuery);
            }
          });
          if (!queriedFields?.includes(customTaskId)) {
            remove(LocalStorageKeys.TaskTypeSubQuery);
            setSubquery(void 0);
          }
        }
        setQuery({
          ...query,
          ...noPriorityQuery
        });
      },
      onHaveFiltersBeenChanged: (haveFiltersBeenChanged) => setHaveFiltersBeenChanged(!!haveFiltersBeenChanged),
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.filterRow,
        style: {
          marginTop: 16
        },
        children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
          children: [/* @__PURE__ */ _jsxDEV(Filter, {
            fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
            placeholder: t("leftBar.filters.date"),
            values: scheduledFilterValues
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 149,
            columnNumber: 13
          }, void 0), userFilterAvailable && /* @__PURE__ */ _jsxDEV(Filter, {
            fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
            placeholder: t("leftBar.filters.assignedTo"),
            values: users?.users,
            isMultiselect: true,
            options: {
              variant: "filters"
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 155,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(TaskTypeFilter, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 163,
            columnNumber: 13
          }, void 0), !isNoStatusPlanAccount && /* @__PURE__ */ _jsxDEV(SubhomeStageFilter, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 40
          }, void 0), /* @__PURE__ */ _jsxDEV(Filter, {
            fieldLR: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
            placeholder: t("leftBar.filters.priority"),
            values: priorityTasks,
            isMultiselect: true,
            options: {
              renderDisplayValue: (value) => {
                if (value?.length === priorityTasks?.length) {
                  return t("common.all");
                }
                if (value?.length === 1) {
                  return priorityTasks.find((priority) => priority.id === value[0])?.name;
                }
                return "";
              }
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 165,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 148,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 9
      }, void 0), quickFilters?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
        className: stylesQF.quickFilter,
        children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
          children: [/* @__PURE__ */ _jsxDEV(QuickFilters, {
            onToggleSelected
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 187,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeResetButton, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 188,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 186,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 185,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(TasksTabFilters, "IXY+sfvggGGJC5SLgfpTbR+gupg=", true, function() {
  return [useExtensionContext, useMinimizableModals, useUserSearch, useTranslation, useSubhomeContext, useIsNoStatusPlanAccount, useLocalStorage];
});
_c = TasksTabFilters;
var _c;
$RefreshReg$(_c, "TasksTabFilters");
if (import.meta.hot) {
  let isReactRefreshBoundary = function(mod) {
    if (mod == null || typeof mod !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const exportName in mod) {
      hasExports = true;
      if (exportName === "__esModule") {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(mod, exportName);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = mod[exportName];
      if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  };
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept((mod) => {
    if (isReactRefreshBoundary(mod)) {
      if (!window.__vite_plugin_react_timeout) {
        window.__vite_plugin_react_timeout = setTimeout(() => {
          window.__vite_plugin_react_timeout = 0;
          RefreshRuntime.performReactRefresh();
        }, 30);
      }
    } else {
      import.meta.hot.invalidate();
    }
  });
}
