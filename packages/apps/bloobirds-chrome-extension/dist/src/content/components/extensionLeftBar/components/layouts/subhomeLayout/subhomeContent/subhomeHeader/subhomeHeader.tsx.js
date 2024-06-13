import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, createToast, IconButton, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useHasNewTaskFeed, useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BOBJECT_TYPES, PluralBobjectTypes, SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { isWhatsAppPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { mutate } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { CreateTaskMenu, TaskRingPosition } from "/src/content/components/contactView/components/createTaskMenu/createTaskMenu.tsx.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import { useInactiveGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/inactiveView/hooks/useInactiveTab.ts.js";
import { TasksTabFilters } from "/src/content/components/extensionLeftBar/components/views/newTasksView/filters/tasksTabFilters.tsx.js";
import { useTaskFeedContext } from "/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader.module.css.js";
import SubhomeTab from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeTabs/subhomeTab/subhomeTab.tsx.js";
import SubhomeTabs from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeTabs/subhomeTabs.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function FiltersIcon(props) {
  _s();
  const {
    t
  } = useTranslation();
  const {
    useTaskFeedFilterValues: useTaskFeedFilterValues2
  } = useTaskFeedContext();
  const {
    filterValuesTouched,
    resetFilterValues
  } = useTaskFeedFilterValues2();
  const filtersIconClass = clsx({
    [styles._filtersTouched]: filterValuesTouched
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._filters_handling_wrapper,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._filtersIcon,
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "slidersHor",
        size: 16,
        color: "bloobirds",
        onClick: props.onClick,
        className: filtersIconClass
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, this), filterValuesTouched && /* @__PURE__ */ _jsxDEV(Button, {
      uppercase: false,
      variant: "clear",
      iconLeft: "cross",
      onClick: resetFilterValues,
      size: "small",
      className: styles._clear_button,
      children: t("common.clear")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, this);
}
_s(FiltersIcon, "+gnefaufRJiy42pvm1R/lOXz1/Q=", false, function() {
  return [useTranslation, useTaskFeedContext, useTaskFeedFilterValues];
});
_c = FiltersIcon;
const RefreshIcon = ({
  isLoading,
  onClick
}) => {
  if (isLoading)
    return /* @__PURE__ */ _jsxDEV(Spinner, {
      name: "loadingCircle",
      size: 10
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 25
    }, void 0);
  else
    return /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "redoReload",
      size: 16,
      color: "bloobirds",
      onClick
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 15
    }, void 0);
};
_c2 = RefreshIcon;
const SubhomeHeader = () => {
  _s2();
  const {
    t
  } = useTranslation();
  const {
    updateLastVisitedPipeline,
    pipelineCounters
  } = useExtensionLeftBarContext();
  const isB2CAccount = useIsB2CAccount();
  const accountId = useActiveAccountId();
  const hasNewTaskFeed = useHasNewTaskFeed(accountId);
  const [showFilters, setShowFilters] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    selectedTab,
    selectedSubhomeTab,
    setSelectedSubhomeTab,
    tabBobject
  } = useSubhomeContext();
  const isPageWithTabs = [SalesforceTabs.PIPELINE, SalesforceTabs.INACTIVE].includes(selectedTab);
  const isPipelinePage = selectedTab === SalesforceTabs.PIPELINE;
  const isInactivePage = selectedTab === SalesforceTabs.INACTIVE;
  const isTasksPage = selectedTab === SalesforceTabs.TASKS;
  const {
    inactiveCounters
  } = useInactiveGlobalAggregation();
  useEffect(() => {
    return () => {
      if (isPipelinePage) {
        updateLastVisitedPipeline(tabBobject);
      }
    };
  }, [tabBobject]);
  useEffect(() => {
    if (isB2CAccount && selectedSubhomeTab === PluralBobjectTypes.Company) {
      setSelectedSubhomeTab(PluralBobjectTypes.Lead);
    }
  }, [selectedSubhomeTab]);
  const mutateList = () => {
    mutate((key) => typeof key === "string" && key.includes("task-feed") && !key.includes("configuration")).then(() => {
      setIsLoading(false);
      createToast({
        message: t("taskFeed.reload"),
        type: "success"
      });
    });
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._header,
      id: "subhomeHeader",
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._subhomeHeaderTitle,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          className: styles._title,
          size: "l",
          color: "softPeanut",
          weight: "medium",
          children: t(`leftBar.${selectedTab}`)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 116,
          columnNumber: 11
        }, void 0), isTasksPage && hasNewTaskFeed && /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV(FiltersIcon, {
            onClick: () => setShowFilters(!showFilters)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 121,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.rightSideIcons,
            children: [/* @__PURE__ */ _jsxDEV(RefreshIcon, {
              isLoading,
              onClick: mutateList
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 123,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              style: {
                position: "relative"
              },
              children: /* @__PURE__ */ _jsxDEV(CreateTaskMenu, {
                environment: {},
                position: isWhatsAppPage() ? TaskRingPosition.DOWN : TaskRingPosition.RIGHT,
                removeScroll: true,
                children: /* @__PURE__ */ _jsxDEV(Button, {
                  iconLeft: "add",
                  className: styles._create_task_button
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 130,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 125,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 124,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 122,
            columnNumber: 15
          }, void 0)]
        }, void 0, true)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 9
      }, void 0), isPageWithTabs && /* @__PURE__ */ _jsxDEV(SubhomeTabs, {
        children: [!isB2CAccount && /* @__PURE__ */ _jsxDEV(SubhomeTab, {
          icon: "company",
          active: selectedSubhomeTab === PluralBobjectTypes.Company,
          onClick: () => {
            setSelectedSubhomeTab(PluralBobjectTypes.Company);
          },
          counter: isPipelinePage && pipelineCounters[BOBJECT_TYPES.COMPANY] > 0 ? pipelineCounters[BOBJECT_TYPES.COMPANY] : isInactivePage && inactiveCounters?.[BOBJECT_TYPES.COMPANY] > 0 ? inactiveCounters[BOBJECT_TYPES.COMPANY] : void 0,
          children: t("common.company_other")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 140,
          columnNumber: 15
        }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeTab, {
          icon: "person",
          active: selectedSubhomeTab === PluralBobjectTypes.Lead,
          onClick: () => setSelectedSubhomeTab(PluralBobjectTypes.Lead),
          counter: isPipelinePage && pipelineCounters[BOBJECT_TYPES.LEAD] > 0 ? pipelineCounters[BOBJECT_TYPES.LEAD] : isInactivePage && inactiveCounters?.[BOBJECT_TYPES.LEAD] > 0 ? inactiveCounters[BOBJECT_TYPES.LEAD] : void 0,
          children: t("common.lead_other")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 157,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(SubhomeTab, {
          icon: "fileOpportunity",
          active: selectedSubhomeTab === PluralBobjectTypes.Opportunity,
          onClick: () => setSelectedSubhomeTab(PluralBobjectTypes.Opportunity),
          counter: isPipelinePage && pipelineCounters[BOBJECT_TYPES.OPPORTUNITY] > 0 ? pipelineCounters[BOBJECT_TYPES.OPPORTUNITY] : isInactivePage && inactiveCounters?.[BOBJECT_TYPES.OPPORTUNITY] > 0 ? inactiveCounters[BOBJECT_TYPES.OPPORTUNITY] : void 0,
          children: t("common.opportunity_other")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 171,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 7
    }, void 0), isTasksPage && hasNewTaskFeed && /* @__PURE__ */ _jsxDEV(TasksTabFilters, {
      filtersVisible: showFilters
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 41
    }, void 0)]
  }, void 0, true);
};
_s2(SubhomeHeader, "EQgeqcqYp4X0qVFIqs1zKWtSsrc=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useIsB2CAccount, useActiveAccountId, useHasNewTaskFeed, useSubhomeContext, useInactiveGlobalAggregation];
});
_c3 = SubhomeHeader;
export default SubhomeHeader;
var _c, _c2, _c3;
$RefreshReg$(_c, "FiltersIcon");
$RefreshReg$(_c2, "RefreshIcon");
$RefreshReg$(_c3, "SubhomeHeader");
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
