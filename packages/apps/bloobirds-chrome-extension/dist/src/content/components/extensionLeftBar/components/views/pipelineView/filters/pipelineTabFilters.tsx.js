import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/pipelineView/filters/pipelineTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/pipelineView/filters/pipelineTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/pipelineView/filters/pipelineTabFilters.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Filter, FilterGroup, Filters, QuickFilters, RelativeDateFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { CheckItem, Item, Section, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useFullSalesEnabled, useIsNoStatusPlanAccount, useManageUserTeamsEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, SingularFromPluralBobjectTypes, UserPermission, StatusBBCategories } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { UserFilterByTeamsLeftBar } from "/src/content/components/users/userTeamsFilter/userFilterByTeams.tsx.js";
import styles from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { SubhomeResetButton } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeResetButton/subhomeResetButton.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { SALES_STATUS_FIELDS_LOGIC_ROLE, STATUS_FIELDS_LOGIC_ROLE } from "/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.constants.ts.js";
import { useSalesforceStatusFilter } from "/src/content/components/extensionLeftBar/components/views/pipelineView/hooks/useSalesforceStatusFilter.ts.js";
import { pipelineTabQuickFilters } from "/src/content/components/extensionLeftBar/components/views/pipelineView/filters/pipelineTabQuickFilters.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SortFilter = () => {
  _s();
  const {
    tabBobject,
    sort,
    setSort
  } = useSubhomeContext();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "leftBar.filters"
  });
  useEffect(() => {
    setSort(tabBobject === BobjectTypes.Opportunity ? "lastUpdateRecent" : "recentAssigned");
  }, [tabBobject]);
  if (tabBobject === BobjectTypes.Opportunity) {
    return /* @__PURE__ */ _jsxDEV(Select, {
      size: "small",
      variant: "filters",
      placeholder: t("orderBy"),
      value: sort,
      onChange: (value) => {
        setSort(value);
      },
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: "lastUpdateRecent",
        children: t("lastUpdateRecent")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "lastUpdateOldest",
        children: t("lastUpdateOldest")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, void 0);
  } else {
    return /* @__PURE__ */ _jsxDEV(Select, {
      size: "small",
      variant: "filters",
      placeholder: t("orderBy"),
      value: sort,
      onChange: (value) => {
        setSort(value);
      },
      renderDisplayValue: (value) => t(value),
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: "recentAssigned",
        children: t("recentAssigned")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: "lastAssigned",
        children: t("lastAssigned")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, void 0);
  }
};
_s(SortFilter, "mcBFaMFm3MC8hf2oR0r1cGfX0Nk=", false, function() {
  return [useSubhomeContext, useTranslation];
});
_c = SortFilter;
export const PipelineTabFilters = () => {
  _s2();
  const {
    useGetDataModel,
    useGetSettings
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const accountId = settings?.account?.id;
  const userFilterAvailable = settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const {
    selectedTab,
    selectedSubhomeTab,
    tabBobject,
    setQuery,
    setSubquery,
    setHaveFiltersBeenChanged
  } = useSubhomeContext();
  const users = useUserSearch();
  const {
    t
  } = useTranslation();
  const prospectingStatuses = dataModel.findValuesByFieldLogicRole(STATUS_FIELDS_LOGIC_ROLE[tabBobject]);
  const salesStatuses = dataModel.findValuesByFieldLogicRole(SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject]);
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const isUserTeamsEnabled = useManageUserTeamsEnabled(settings?.account?.id);
  const bobjectType = SingularFromPluralBobjectTypes[selectedSubhomeTab];
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const generateStatusValues = () => {
    const items = [];
    if (prospectingStatuses?.length > 0 && bobjectType !== BobjectTypes.Opportunity) {
      if (isFullSalesEnabled) {
        items.push(/* @__PURE__ */ _jsxDEV(Section, {
          id: "salesProspecting",
          children: t("common.prospecting")
        }, "salesProspecting", false, {
          fileName: _jsxFileName,
          lineNumber: 118,
          columnNumber: 11
        }, void 0));
      }
      prospectingStatuses.sort((a, b) => a.ordering - b.ordering).forEach((status) => {
        items.push(/* @__PURE__ */ _jsxDEV(CheckItem, {
          label: status?.name,
          value: status?.id,
          children: status?.name
        }, status?.id, false, {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 13
        }, void 0));
      });
    }
    if (isFullSalesEnabled && salesStatuses?.length > 0) {
      if (bobjectType !== BobjectTypes.Opportunity) {
        items.push(salesStatuses?.length > 0 ? /* @__PURE__ */ _jsxDEV(Section, {
          id: "salesStatuses",
          children: t("common.sales")
        }, "salesStatuses", false, {
          fileName: _jsxFileName,
          lineNumber: 138,
          columnNumber: 13
        }, void 0) : void 0);
      }
      salesStatuses.sort((a, b) => a.ordering - b.ordering).forEach((status) => {
        items.push(/* @__PURE__ */ _jsxDEV(CheckItem, {
          label: status?.name,
          value: status?.id,
          children: status?.name
        }, status?.id, false, {
          fileName: _jsxFileName,
          lineNumber: 148,
          columnNumber: 13
        }, void 0));
      });
    }
    return items;
  };
  const generateSalesforceStatusValues = () => {
    const items = [];
    StatusBBCategories?.forEach((category) => {
      items.push(/* @__PURE__ */ _jsxDEV(CheckItem, {
        label: category?.value,
        value: category?.logicRole,
        children: category?.value
      }, category?.id, false, {
        fileName: _jsxFileName,
        lineNumber: 163,
        columnNumber: 9
      }, void 0));
    });
    return items;
  };
  const statusValues = !isNoStatusPlanAccount ? generateStatusValues() : generateSalesforceStatusValues();
  const quickFilters = pipelineTabQuickFilters(tabBobject, dataModel);
  const {
    parseSalesforceStatus
  } = useSalesforceStatusFilter(tabBobject);
  return /* @__PURE__ */ _jsxDEV(Filters, {
    bobjectType: tabBobject,
    tabName: `filters-${selectedTab}-${tabBobject}`,
    bobjectFields: dataModel,
    defaultQuickFilters: quickFilters,
    defaultFilters: [{
      fieldLR: FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO,
      defaultValue: [userId]
    }],
    onQueryChange: ({
      query,
      subquery
    }) => {
      const parsedQuery = parseSalesforceStatus(query);
      setQuery(parsedQuery);
      setSubquery(subquery);
    },
    onHaveFiltersBeenChanged: (haveFiltersBeenChanged) => setHaveFiltersBeenChanged(!!haveFiltersBeenChanged),
    children: [/* @__PURE__ */ _jsxDEV(FilterGroup, {
      children: [/* @__PURE__ */ _jsxDEV(SortFilter, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 204,
        columnNumber: 9
      }, void 0), tabBobject === BobjectTypes.Opportunity && /* @__PURE__ */ _jsxDEV(RelativeDateFilter, {
        fieldLR: OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 11
      }, void 0), isUserTeamsEnabled ? /* @__PURE__ */ _jsxDEV(UserFilterByTeamsLeftBar, {
        fieldLR: FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 209,
        columnNumber: 11
      }, void 0) : userFilterAvailable && /* @__PURE__ */ _jsxDEV(
        Filter,
        {
          fieldLR: FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO,
          placeholder: t("leftBar.filters.assignedTo"),
          values: users?.users,
          isMultiselect: true,
          options: {
            variant: "filters"
          }
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 212,
          columnNumber: 13
        },
        void 0
      ), isNoStatusPlanAccount ? /* @__PURE__ */ _jsxDEV(
        Filter,
        {
          fieldLR: FIELDS_LOGIC_ROLE[tabBobject].SALESFORCE_STATUS,
          placeholder: t("leftBar.filters.status"),
          values: statusValues,
          isMultiselect: true,
          options: {
            variant: "filters"
          }
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 223,
          columnNumber: 11
        },
        void 0
      ) : /* @__PURE__ */ _jsxDEV(
        Filter,
        {
          fieldLR: FIELDS_LOGIC_ROLE[tabBobject].STATUS,
          placeholder: t("leftBar.filters.status"),
          values: statusValues,
          isMultiselect: true,
          options: {
            variant: "filters"
          }
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 232,
          columnNumber: 11
        },
        void 0
      )]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 203,
      columnNumber: 7
    }, void 0), quickFilters?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.quickFilter,
      children: /* @__PURE__ */ _jsxDEV(FilterGroup, {
        children: [/* @__PURE__ */ _jsxDEV(QuickFilters, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 245,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeResetButton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 246,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 244,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 180,
    columnNumber: 5
  }, void 0);
};
_s2(PipelineTabFilters, "jmw/gvEuVn50QYx25F6FaBWPgG4=", true, function() {
  return [useExtensionContext, useSubhomeContext, useUserSearch, useTranslation, useFullSalesEnabled, useManageUserTeamsEnabled, useIsNoStatusPlanAccount, useSalesforceStatusFilter];
});
_c2 = PipelineTabFilters;
var _c, _c2;
$RefreshReg$(_c, "SortFilter");
$RefreshReg$(_c2, "PipelineTabFilters");
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
