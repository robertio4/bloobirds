import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/nurturingView/filters/nurturingTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/nurturingView/filters/nurturingTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/nurturingView/filters/nurturingTabFilters.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter, FilterGroup, Filters, QuickFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { useIsNoStatusPlanAccount, useManageUserTeamsEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, TASK_ACTION_VALUE, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { UserFilterByTeamsLeftBar } from "/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx.js";
import styles from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { SubhomeResetButton } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton.tsx.js";
import { SubhomeStageFilter } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeStageFilter/subhomeStageFilter.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { scheduledFilterValues } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { nurturingTabQuickFilters } from "/src/content/components/extensionLeftBar/components/views/nurturingView/filters/nurturingTabQuickFilters.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const NurturingTabFilters = () => {
  _s();
  const isNoStatusAccount = useIsNoStatusPlanAccount();
  const {
    t
  } = useTranslation();
  const {
    useGetDataModel,
    useGetSettings
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const userFilterAvailable = settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();
  const isUserTeamsEnabled = useManageUserTeamsEnabled(settings?.account?.id);
  const {
    selectedTab,
    setQuery,
    setHaveFiltersBeenChanged
  } = useSubhomeContext();
  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const priorityField = dataModel?.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const noPriorityField = priorityTasks?.find((priorityTask) => priorityTask.logicRole === "TASK__PRIORITY__NO_PRIORITY");
  const quickFilters = nurturingTabQuickFilters(dataModel);
  return /* @__PURE__ */ _jsxDEV(Filters, {
    bobjectType: BobjectTypes.Task,
    tabName: `filters-${selectedTab}`,
    bobjectFields: dataModel,
    defaultQuickFilters: quickFilters,
    defaultFilters: [{
      fieldLR: TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
      defaultValue: [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP]
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
      if (query) {
        Object.keys(query).forEach((key) => {
          if (key === priorityField?.id) {
            const v = query[key].find((value) => value === noPriorityField?.id);
            if (v) {
              noPriorityQuery[key] = [...query[key], "__MATCH_EMPTY_ROWS__"];
            }
          }
        });
      }
      setQuery({
        ...query,
        ...noPriorityQuery
      });
    },
    onHaveFiltersBeenChanged: (haveFiltersBeenChanged) => setHaveFiltersBeenChanged(!!haveFiltersBeenChanged),
    children: [/* @__PURE__ */ _jsxDEV(FilterGroup, {
      children: [/* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        placeholder: t("common.date"),
        values: scheduledFilterValues
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }, void 0), isUserTeamsEnabled ? /* @__PURE__ */ _jsxDEV(UserFilterByTeamsLeftBar, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 11
      }, void 0) : userFilterAvailable && /* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
        placeholder: t("leftBar.filters.assignedTo"),
        values: users?.users,
        isMultiselect: true,
        options: {
          variant: "filters"
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 13
      }, void 0), !isNoStatusAccount && /* @__PURE__ */ _jsxDEV(SubhomeStageFilter, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 32
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
        lineNumber: 110,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }, void 0), quickFilters?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.quickFilter,
      children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
        children: [/* @__PURE__ */ _jsxDEV(QuickFilters, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeResetButton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 132,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 51,
    columnNumber: 5
  }, void 0);
};
_s(NurturingTabFilters, "21rzwie5mQC59jr6d4oZ2HCOm9I=", true, function() {
  return [useIsNoStatusPlanAccount, useTranslation, useExtensionContext, useUserSearch, useManageUserTeamsEnabled, useSubhomeContext];
});
_c = NurturingTabFilters;
var _c;
$RefreshReg$(_c, "NurturingTabFilters");
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
