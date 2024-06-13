import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/meetingsView/filters/meetingsTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/meetingsView/filters/meetingsTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/meetingsView/filters/meetingsTabFilters.tsx", _s = $RefreshSig$();
import { useTranslation, Trans } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter, FilterGroup, Filters, QuickFilters, RelativeDateFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { useCopilotEnabled, useManageUserTeamsEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, BobjectTypes, REPORTED_VALUES_LOGIC_ROLE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { endOfDay, startOfDay } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { addYears } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { UserFilterByTeamsLeftBar } from "/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx.js";
import styles from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { SubhomeResetButton } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { meetingsTabQuickFilters } from "/src/content/components/extensionLeftBar/components/views/meetingsView/filters/meetingsTabQuickFilters.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const reportedFilterValues = [{
  id: "",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.all"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 20
  }, void 0)
}, {
  id: REPORTED_VALUES_LOGIC_ROLE.YES,
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.yes"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 48
  }, void 0)
}, {
  id: [REPORTED_VALUES_LOGIC_ROLE.NO, "__MATCH_EMPTY_ROWS__"],
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.no"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 12
  }, void 0)
}];
const hasCopilotAnalysisFilterValues = [{
  id: "",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.all"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 20
  }, void 0)
}, {
  id: "__MATCH_FULL_ROWS__",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.yes"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 39,
    columnNumber: 39
  }, void 0)
}, {
  id: "__MATCH_EMPTY_ROWS__",
  value: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "leftBar.filters.no"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 42,
    columnNumber: 12
  }, void 0)
}];
export const MeetingsTabFilters = () => {
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
    setHaveFiltersBeenChanged
  } = useSubhomeContext();
  const quickFilters = meetingsTabQuickFilters(dataModel);
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  return /* @__PURE__ */ _jsxDEV(Filters, {
    bobjectType: BobjectTypes.Activity,
    tabName: `filters-${selectedTab}`,
    bobjectFields: dataModel,
    defaultQuickFilters: quickFilters,
    defaultFilters: [{
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME,
      defaultValue: {
        start: startOfDay(new Date("1970-01-01")),
        end: endOfDay(addYears(new Date(), 5))
      }
    }, {
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER,
      defaultValue: [userId]
    }, {
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
      defaultValue: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING]
    }, {
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
      defaultValue: ["__MATCH_FULL_ROWS__"]
    }, {
      fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
      defaultValue: [REPORTED_VALUES_LOGIC_ROLE.NO, "__MATCH_EMPTY_ROWS__"]
    }],
    onQueryChange: ({
      query
    }) => {
      setQuery(query);
    },
    onHaveFiltersBeenChanged: (haveFiltersBeenChanged) => setHaveFiltersBeenChanged(!!haveFiltersBeenChanged),
    children: [/* @__PURE__ */ _jsxDEV(FilterGroup, {
      children: [/* @__PURE__ */ _jsxDEV(RelativeDateFilter, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 9
      }, void 0), isUserTeamsEnabled ? /* @__PURE__ */ _jsxDEV(UserFilterByTeamsLeftBar, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.USER
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 102,
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
        lineNumber: 105,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
        placeholder: t("leftBar.filters.reported"),
        values: reportedFilterValues,
        sortDisabled: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, void 0), isCopilotEnabled && /* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS,
        placeholder: t("leftBar.filters.copilotAnalysis"),
        values: hasCopilotAnalysisFilterValues,
        sortDisabled: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 7
    }, void 0), quickFilters?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.quickFilter,
      children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
        children: [/* @__PURE__ */ _jsxDEV(QuickFilters, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 132,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeResetButton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 133,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, void 0);
};
_s(MeetingsTabFilters, "kRVB77/kTrqWV1/2Gn5ohXbuuKk=", true, function() {
  return [useExtensionContext, useUserSearch, useTranslation, useManageUserTeamsEnabled, useSubhomeContext, useCopilotEnabled];
});
_c = MeetingsTabFilters;
var _c;
$RefreshReg$(_c, "MeetingsTabFilters");
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
