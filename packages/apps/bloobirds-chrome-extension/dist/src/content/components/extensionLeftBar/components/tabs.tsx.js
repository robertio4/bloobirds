import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/tabs.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/tabs.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/tabs.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$(), _s6 = $RefreshSig$(), _s7 = $RefreshSig$(), _s8 = $RefreshSig$(), _s9 = $RefreshSig$(), _s10 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useActiveUserSettings, useCadenceV2Enabled, useMediaQuery, useUserHelpers, useActiveAccountId, useHasNewTaskFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ExtensionHelperKeys, SalesforceTabs, SalesforceTabsIcon, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { LeftBarButton, LeftBarUserDropdown } from "/src/content/components/leftBarFooter/leftBarFooter.tsx.js";
import TaskSidebar, { TaskTab } from "/src/content/components/taskSidebar/taskSidebar.tsx.js";
import { redirectButtonsLeftBar } from "/src/content/components/extensionLeftBar/extensionLeftBar.constants.ts.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import { useInactiveGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/inactiveView/hooks/useInactiveTab.ts.js";
import { useInboxAllGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/inboxView/hooks/useInboxTab.ts.js";
import { useMeetingsGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/meetingsView/hooks/useMeetingsTab.ts.js";
import { useTasksGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx.js";
import { useNurturingAllGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/nurturingView/hooks/useNurturingTab.ts.js";
import { useOutboxAllGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/outboxView/hooks/useOutboxTab.ts.js";
import { useTasksAggregation } from "/src/content/components/extensionLeftBar/components/views/tasksView/hooks/useTasksTab.ts.js";
import { LeftBarTooltip, lBTVisibilityType } from "/src/content/components/extensionLeftBar/components/views/tooltip/leftBarTooltip.tsx.js";
import { Fragment as _Fragment, jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const LeftBarFooter = () => {
  _s();
  const {
    settings
  } = useActiveUserSettings();
  const canSeeDashboards = settings?.user?.permissions?.includes(UserPermission.VIEW_DASHBOARDS_TAB);
  const {
    isSmallDesktop
  } = useMediaQuery();
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const {
    t
  } = useTranslation();
  const [hideButtons, setHideButtons] = useState(window.innerHeight < 820);
  useEffect(() => {
    const handleResize = () => {
      setHideButtons(window.innerHeight < 820);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const userEmail = settings?.user?.email;
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      marginBottom: "30%"
    },
    children: [!hideButtons && redirectButtonsLeftBar(userEmail).map(({
      iconName,
      label,
      url,
      externalUrl
    }, idx) => {
      if (label === "Cadences" && (!cadenceV2Enabled || !hasCadencePermission)) {
        return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
      }
      if (label === "Dashboards" && !canSeeDashboards) {
        return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
      }
      return /* @__PURE__ */ _jsxDEV(LeftBarButton, {
        iconName,
        url,
        externalUrl,
        children: t(label)
      }, label + "-" + idx, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 13
      }, void 0);
    }), /* @__PURE__ */ _jsxDEV(LeftBarUserDropdown, {
      size: isSmallDesktop ? "small" : "medium",
      hideButtons
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 60,
    columnNumber: 5
  }, void 0);
};
_s(LeftBarFooter, "fpWp0RlAThtPkUpG83JYF3bR3NA=", false, function() {
  return [useActiveUserSettings, useMediaQuery, useCadenceV2Enabled, useTranslation];
});
_c = LeftBarFooter;
function TasksTab() {
  _s2();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const counter = useTasksAggregation();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.TASKS,
    counter,
    colors: {
      basic: "softGrape",
      contrast: "softPeanut"
    },
    name: SalesforceTabs.TASKS,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.TASKS ? null : SalesforceTabs.TASKS);
    },
    isHighlighted: currentTab === SalesforceTabs.TASKS,
    children: t("leftBar.tasks")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 91,
    columnNumber: 5
  }, this);
}
_s2(TasksTab, "PZRpvr9s7nwkRlrBH21b3BkFM0E=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useTasksAggregation];
});
_c2 = TasksTab;
function NewTasksTab() {
  _s3();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const counter = useTasksGlobalAggregation();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.TASKS,
    counter,
    colors: {
      basic: "softGrape",
      contrast: "softPeanut"
    },
    name: SalesforceTabs.TASKS,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.TASKS ? null : SalesforceTabs.TASKS);
    },
    isHighlighted: currentTab === SalesforceTabs.TASKS,
    children: t("leftBar.tasks")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 113,
    columnNumber: 5
  }, this);
}
_s3(NewTasksTab, "5O9ju9DOLQWtiS/rbBLiOZgohCc=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useTasksGlobalAggregation];
});
_c3 = NewTasksTab;
function InboxTab() {
  _s4();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const {
    items
  } = useInboxAllGlobalAggregation();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.INBOX,
    counter: items?.length,
    colors: {
      basic: "lightPeanut",
      contrast: "peanut"
    },
    name: SalesforceTabs.INBOX,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.INBOX ? null : SalesforceTabs.INBOX);
    },
    isHighlighted: currentTab === SalesforceTabs.INBOX,
    children: t("leftBar.inbox")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 134,
    columnNumber: 5
  }, this);
}
_s4(InboxTab, "IY3eA7bcN9wneiZHCJLgNuCCWvI=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useInboxAllGlobalAggregation];
});
_c4 = InboxTab;
function OutboxTab() {
  _s5();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const counter = useOutboxAllGlobalAggregation();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.OUTBOX,
    counter,
    colors: {
      basic: "lightPeanut",
      contrast: "peanut"
    },
    name: SalesforceTabs.OUTBOX,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.OUTBOX ? null : SalesforceTabs.OUTBOX);
    },
    isHighlighted: currentTab === SalesforceTabs.OUTBOX,
    children: t("leftBar.outbox")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 155,
    columnNumber: 5
  }, this);
}
_s5(OutboxTab, "v4t6ekNi0jJuo59v4OS6y9R7XI0=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useOutboxAllGlobalAggregation];
});
_c5 = OutboxTab;
function MeetingsTab() {
  _s6();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const counter = useMeetingsGlobalAggregation();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.MEETINGS,
    counter,
    colors: {
      basic: "verySoftTomato",
      contrast: "softPeanut"
    },
    name: SalesforceTabs.MEETINGS,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.MEETINGS ? null : SalesforceTabs.MEETINGS);
    },
    isHighlighted: currentTab === SalesforceTabs.MEETINGS,
    children: t("leftBar.meetings")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 176,
    columnNumber: 5
  }, this);
}
_s6(MeetingsTab, "h+HG1Fkeh12Kh9eJwBIGUl3uVzU=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useMeetingsGlobalAggregation];
});
_c6 = MeetingsTab;
function NurturingTab() {
  _s7();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const counter = useNurturingAllGlobalAggregation();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.NURTURING,
    counter,
    colors: {
      basic: "verySoftTangerine",
      contrast: "softPeanut"
    },
    name: SalesforceTabs.NURTURING,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.NURTURING ? null : SalesforceTabs.NURTURING);
    },
    isHighlighted: currentTab === SalesforceTabs.NURTURING,
    children: t("leftBar.nurturing")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 197,
    columnNumber: 5
  }, this);
}
_s7(NurturingTab, "QnF8EsmR+/E59c1DRbMYSId6oGw=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useNurturingAllGlobalAggregation];
});
_c7 = NurturingTab;
function InactiveTab() {
  _s8();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const {
    total: counter
  } = useInactiveGlobalAggregation();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.INACTIVE,
    counter,
    colors: {
      basic: "lightPeanut",
      contrast: "softPeanut"
    },
    name: SalesforceTabs.INACTIVE,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.INACTIVE ? null : SalesforceTabs.INACTIVE);
    },
    isHighlighted: currentTab === SalesforceTabs.INACTIVE,
    children: t("leftBar.inactive")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 218,
    columnNumber: 5
  }, this);
}
_s8(InactiveTab, "Is/82e+9m/H3OL4eb9BqbyiRbTQ=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useInactiveGlobalAggregation];
});
_c8 = InactiveTab;
function PipelineTab() {
  _s9();
  const {
    t
  } = useTranslation();
  const {
    setCurrentTab,
    currentTab,
    pipelineCounters
  } = useExtensionLeftBarContext();
  const counter = Object.keys(pipelineCounters).reduce((acc, curr) => pipelineCounters[curr] ? acc + pipelineCounters[curr] : acc, 0);
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.PIPELINE,
    counter,
    colors: {
      basic: "verySoftBanana",
      contrast: "softPeanut"
    },
    name: SalesforceTabs.PIPELINE,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.PIPELINE ? null : SalesforceTabs.PIPELINE);
    },
    isHighlighted: currentTab === SalesforceTabs.PIPELINE,
    children: t("leftBar.pipeline")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 241,
    columnNumber: 5
  }, this);
}
_s9(PipelineTab, "iLrqHr5CIJHMWmair3nUA1FIj+k=", false, function() {
  return [useTranslation, useExtensionLeftBarContext];
});
_c9 = PipelineTab;
const Tabs = () => {
  _s10();
  const {
    has
  } = useUserHelpers();
  const [leftBarTooltipVisibility, setLeftBarTooltipVisibility] = useState(has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP) ? lBTVisibilityType.Bottom : lBTVisibilityType.Hidden);
  const accountId = useActiveAccountId();
  const hasNewTaskFeed = useHasNewTaskFeed(accountId);
  useEffect(() => {
    setTimeout(() => {
      if (!has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP) && leftBarTooltipVisibility === lBTVisibilityType.Hidden) {
        setLeftBarTooltipVisibility(lBTVisibilityType.Top);
      }
      if (has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP)) {
        setLeftBarTooltipVisibility(lBTVisibilityType.Bottom);
      }
    }, 1e3);
  }, [has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP)]);
  return /* @__PURE__ */ _jsxDEV(TaskSidebar, {
    children: [leftBarTooltipVisibility === lBTVisibilityType.Top && /* @__PURE__ */ _jsxDEV(LeftBarTooltip, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 62
    }, void 0), hasNewTaskFeed ? /* @__PURE__ */ _jsxDEV(NewTasksTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 25
    }, void 0) : /* @__PURE__ */ _jsxDEV(TasksTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 43
    }, void 0), /* @__PURE__ */ _jsxDEV(InboxTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 282,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(OutboxTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 283,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(MeetingsTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 284,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(NurturingTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(InactiveTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 286,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(PipelineTab, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 7
    }, void 0), leftBarTooltipVisibility === lBTVisibilityType.Bottom && /* @__PURE__ */ _jsxDEV(LeftBarTooltip, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 288,
      columnNumber: 65
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 279,
    columnNumber: 5
  }, void 0);
};
_s10(Tabs, "bC8rYTWSiK7eLgjKgnLKL6+msqY=", false, function() {
  return [useUserHelpers, useActiveAccountId, useHasNewTaskFeed];
});
_c10 = Tabs;
export default Tabs;
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
$RefreshReg$(_c, "LeftBarFooter");
$RefreshReg$(_c2, "TasksTab");
$RefreshReg$(_c3, "NewTasksTab");
$RefreshReg$(_c4, "InboxTab");
$RefreshReg$(_c5, "OutboxTab");
$RefreshReg$(_c6, "MeetingsTab");
$RefreshReg$(_c7, "NurturingTab");
$RefreshReg$(_c8, "InactiveTab");
$RefreshReg$(_c9, "PipelineTab");
$RefreshReg$(_c10, "Tabs");
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
