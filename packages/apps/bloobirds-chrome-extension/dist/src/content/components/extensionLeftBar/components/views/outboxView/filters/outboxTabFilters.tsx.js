import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/outboxView/filters/outboxTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/filters/outboxTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/outboxView/filters/outboxTabFilters.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter, FilterGroup, Filters, QuickFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { useManageUserTeamsEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { UserFilterByTeamsLeftBar } from "/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx.js";
import styles from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { SubhomeResetButton } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { scheduledFilterValues } from "/src/content/components/extensionLeftBar/components/views/view.utils.tsx.js";
import { EMAILING_TYPE } from "/src/content/components/extensionLeftBar/components/views/outboxView/outbox.constants.ts.js";
import { OutboxTabQuickFilters } from "/src/content/components/extensionLeftBar/components/views/outboxView/filters/outboxTabQuickFilters.ts.js";
import StatusFilter from "/src/content/components/extensionLeftBar/components/views/outboxView/filters/statusFilter.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const OutboxTabFilters = ({
  onToggleSelected
}) => {
  _s();
  const {
    useGetDataModel,
    useGetSettings
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const userFilterAvailable = settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const users = useUserSearch();
  const {
    t
  } = useTranslation();
  const isUserTeamsEnabled = useManageUserTeamsEnabled(settings?.account?.id);
  const {
    selectedTab,
    setQuery,
    setSubquery,
    selectedQuickFilter,
    setHaveFiltersBeenChanged
  } = useSubhomeContext();
  const quickFilters = OutboxTabQuickFilters(dataModel);
  return /* @__PURE__ */ _jsxDEV(Filters, {
    bobjectType: BobjectTypes.Task,
    tabName: `filters-${selectedTab}`,
    bobjectFields: dataModel,
    defaultQuickFilters: quickFilters,
    defaultFilters: [{
      fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      defaultValue: [userId]
    }, {
      fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      defaultValue: "until_now"
    }, {
      fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
      defaultValue: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE]
    }],
    onQueryChange: ({
      query,
      subquery
    }) => {
      setQuery(query);
      setSubquery(subquery);
    },
    onHaveFiltersBeenChanged: (haveFiltersBeenChanged) => setHaveFiltersBeenChanged(!!haveFiltersBeenChanged),
    children: [/* @__PURE__ */ _jsxDEV(FilterGroup, {
      children: [/* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        placeholder: t("leftBar.filters.date"),
        values: scheduledFilterValues
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 9
      }, void 0), isUserTeamsEnabled ? /* @__PURE__ */ _jsxDEV(UserFilterByTeamsLeftBar, {
        fieldLR: TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
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
        lineNumber: 87,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(StatusFilter, {
        shouldBeDisplayed: !!selectedQuickFilter,
        isAutomatedStatus: selectedQuickFilter?.id === EMAILING_TYPE.AUTOMATED
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }, void 0), quickFilters?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.quickFilter,
      children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
        children: [/* @__PURE__ */ _jsxDEV(QuickFilters, {
          onToggleSelected
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeResetButton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 50,
    columnNumber: 5
  }, void 0);
};
_s(OutboxTabFilters, "m7jzzj7QOGzn6cUtQJ1+tHJEvD0=", true, function() {
  return [useExtensionContext, useUserSearch, useTranslation, useManageUserTeamsEnabled, useSubhomeContext];
});
_c = OutboxTabFilters;
var _c;
$RefreshReg$(_c, "OutboxTabFilters");
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
