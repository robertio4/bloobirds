import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inboxView/filters/inboxTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/filters/inboxTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inboxView/filters/inboxTabFilters.tsx", _s = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter, FilterGroup, Filters, QuickFilters, RelativeDateFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { useCopilotEnabled, useManageUserTeamsEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, REPORTED_VALUES_LOGIC_ROLE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { endOfDay, startOfDay, subDays } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { UserFilterByTeamsLeftBar } from "/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx.js";
import styles from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { SubhomeResetButton } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { activityTypes } from "/src/content/components/extensionLeftBar/components/views/inboxView/utils/index.tsx.js";
import { InboxTabQuickFilters } from "/src/content/components/extensionLeftBar/components/views/inboxView/filters/inboxTabQuickFilters.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const getReportedValues = (dataModel) => {
  const reportedLR = ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED;
  const reportedField = dataModel?.findFieldByLogicRole(reportedLR);
  const reportedValues = reportedField?.values;
  return reportedValues.map((direction) => {
    if (direction.logicRole === REPORTED_VALUES_LOGIC_ROLE.YES)
      direction.name = "Reported";
    if (direction.logicRole === REPORTED_VALUES_LOGIC_ROLE.NO)
      direction.name = "Not reported";
    return direction;
  });
};
const reportedFilterValues = [{
  id: "",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.all"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 20
  }, void 0)
}, {
  id: REPORTED_VALUES_LOGIC_ROLE.YES,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.yes"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 42,
    columnNumber: 48
  }, void 0)
}, {
  id: [REPORTED_VALUES_LOGIC_ROLE.NO, "__MATCH_EMPTY_ROWS__"],
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.no"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 45,
    columnNumber: 12
  }, void 0)
}];
const hasCopilotAnalysisFilterValues = [{
  id: "",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.all"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 49,
    columnNumber: 20
  }, void 0)
}, {
  id: "__MATCH_FULL_ROWS__",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.yes"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 50,
    columnNumber: 39
  }, void 0)
}, {
  id: "__MATCH_EMPTY_ROWS__",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.no"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 53,
    columnNumber: 12
  }, void 0)
}];
export const InboxTabFilters = ({
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
  const {
    selectedTab,
    setQuery,
    setSubquery,
    setHaveFiltersBeenChanged
  } = useSubhomeContext();
  const quickFilters = InboxTabQuickFilters(dataModel);
  const reportedValues = getReportedValues(dataModel);
  const noReportedId = reportedValues.find((reported) => reported.logicRole === REPORTED_VALUES_LOGIC_ROLE.NO)?.id;
  const isWhatsappAdmin = settings?.user?.permissions?.includes(UserPermission.WHATSAPP_BUSINESS_ADMIN);
  const assignedToField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  const isUserTeamsEnabled = useManageUserTeamsEnabled(settings?.account?.id);
  return /* @__PURE__ */ _jsxDEV(Filters, {
    bobjectType: BobjectTypes.Activity,
    tabName: `filters-${selectedTab}`,
    bobjectFields: dataModel,
    defaultQuickFilters: quickFilters,
    defaultFilters: [{
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER,
      defaultValue: isWhatsappAdmin ? [userId, null] : [userId]
    }, {
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
      defaultValue: [noReportedId]
    }, {
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
      defaultValue: {
        start: startOfDay(subDays(new Date(), 7)),
        end: endOfDay(new Date())
      }
    }, {
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
      defaultValue: activityTypes
    }],
    onQueryChange: ({
      query,
      subquery
    }) => {
      if (isWhatsappAdmin && assignedToField?.id && assignedToField?.id in query && Array.isArray(query[assignedToField?.id]) && query[assignedToField?.id].includes(userId) && !query[assignedToField?.id].includes(null)) {
        query[assignedToField?.id].push(null);
      }
      setQuery(query);
      setSubquery(subquery);
    },
    onHaveFiltersBeenChanged: (haveFiltersBeenChanged) => setHaveFiltersBeenChanged(!!haveFiltersBeenChanged),
    children: [/* @__PURE__ */ _jsxDEV(FilterGroup, {
      children: [/* @__PURE__ */ _jsxDEV(RelativeDateFilter, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TIME
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 9
      }, void 0), isUserTeamsEnabled ? /* @__PURE__ */ _jsxDEV(UserFilterByTeamsLeftBar, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 11
      }, void 0) : userFilterAvailable && /* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER,
        placeholder: t("leftBar.filters.assignedTo"),
        values: users?.users,
        isMultiselect: true,
        options: {
          variant: "filters"
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
        placeholder: t("leftBar.filters.reported"),
        values: reportedFilterValues,
        sortDisabled: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 9
      }, void 0), isCopilotEnabled && /* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS,
        placeholder: t("leftBar.filters.copilotAnalysis"),
        values: hasCopilotAnalysisFilterValues,
        sortDisabled: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 7
    }, void 0), quickFilters?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.quickFilter,
      children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
        children: [/* @__PURE__ */ _jsxDEV(QuickFilters, {
          onToggleSelected
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 165,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeResetButton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 166,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 88,
    columnNumber: 5
  }, void 0);
};
_s(InboxTabFilters, "Cd+g79Yi/fvSSz06lJ2OseAsSUo=", true, function() {
  return [useExtensionContext, useUserSearch, useTranslation, useSubhomeContext, useCopilotEnabled, useManageUserTeamsEnabled];
});
_c = InboxTabFilters;
var _c;
$RefreshReg$(_c, "InboxTabFilters");
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
