import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inactiveView/filters/inactiveTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inactiveView/filters/inactiveTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inactiveView/filters/inactiveTabFilters.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter, FilterGroup, Filters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { Item, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useManageUserTeamsEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, FIELDS_LOGIC_ROLE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { UserFilterByTeamsLeftBar } from "/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx.js";
import { SubhomeResetButton } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { INACTIVE_FIELDS_LOGIC_ROLE, INACTIVE_YES_FIELDS_LOGIC_ROLE } from "/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.constants.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SortFilter = () => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    tabBobject,
    sort,
    setSort
  } = useSubhomeContext();
  useEffect(() => {
    setSort(tabBobject === BobjectTypes.Opportunity ? "lastUpdateRecent" : "recentAssigned");
  }, [tabBobject]);
  if (tabBobject === BobjectTypes.Opportunity) {
    return /* @__PURE__ */ _jsxDEV(Select, {
      size: "small",
      variant: "filters",
      placeholder: t("leftBar.filters.orderBy"),
      value: sort,
      onChange: (value) => {
        setSort(value);
      },
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: "lastUpdateRecent",
        children: t("leftBar.filters.lastUpdateRecent")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "lastUpdateOldest",
        children: t("leftBar.filters.lastUpdateOldest")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, void 0);
  } else {
    return /* @__PURE__ */ _jsxDEV(Select, {
      size: "small",
      variant: "filters",
      placeholder: t("leftBar.filters.orderBy"),
      value: sort,
      onChange: (value) => {
        setSort(value);
      },
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: "lastAssigned",
        children: t("leftBar.filters.lastAssigned")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "recentAssigned",
        children: t("leftBar.filters.recentAssigned")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0);
  }
};
_s(SortFilter, "GZiWDW+uBrwOEJQgjxRV29QYvZk=", false, function() {
  return [useTranslation, useSubhomeContext];
});
_c = SortFilter;
export const InactiveTabFilters = () => {
  _s2();
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
    tabBobject,
    setQuery,
    setHaveFiltersBeenChanged
  } = useSubhomeContext();
  if (!dataModel)
    return null;
  return /* @__PURE__ */ _jsxDEV(Filters, {
    bobjectType: tabBobject,
    tabName: `filters-${selectedTab}-${tabBobject}`,
    bobjectFields: dataModel,
    defaultFilters: [
      {
        fieldLR: FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO,
        defaultValue: [userId]
      },
      {
        fieldLR: INACTIVE_FIELDS_LOGIC_ROLE[tabBobject],
        defaultValue: [INACTIVE_YES_FIELDS_LOGIC_ROLE[tabBobject]]
      }
    ],
    onQueryChange: ({
      query
    }) => {
      setQuery(query);
    },
    onHaveFiltersBeenChanged: (haveFiltersBeenChanged) => setHaveFiltersBeenChanged(!!haveFiltersBeenChanged),
    children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
      children: [/* @__PURE__ */ _jsxDEV(SortFilter, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 9
      }, void 0), isUserTeamsEnabled ? /* @__PURE__ */ _jsxDEV(UserFilterByTeamsLeftBar, {
        fieldLR: FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 11
      }, void 0) : userFilterAvailable && /* @__PURE__ */ _jsxDEV(Filter, {
        fieldLR: FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO,
        placeholder: t("leftBar.filters.assignedTo"),
        values: users?.users,
        isMultiselect: true,
        options: {
          variant: "filters"
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeResetButton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 81,
    columnNumber: 5
  }, void 0);
};
_s2(InactiveTabFilters, "Aubw8yMTKtewUaj74UfaYdv/CZA=", true, function() {
  return [useExtensionContext, useUserSearch, useTranslation, useManageUserTeamsEnabled, useSubhomeContext];
});
_c2 = InactiveTabFilters;
var _c, _c2;
$RefreshReg$(_c, "SortFilter");
$RefreshReg$(_c2, "InactiveTabFilters");
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
