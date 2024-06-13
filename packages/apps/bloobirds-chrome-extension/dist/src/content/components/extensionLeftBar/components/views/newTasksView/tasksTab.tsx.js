import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/tasksTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/tasksTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/tasksTab.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"]; const Suspense = __vite__cjsImport2_react["Suspense"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { RescheduleModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Skeleton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { preload } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import SubhomeHeader from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader.tsx.js";
import SubhomeLayout, { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { TaskFeedProvider } from "/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx.js";
import { TasksTabList } from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/tasksTabsList.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const TasksTabContent = ({
  parentRef
}) => {
  _s();
  const isB2CAccount = useIsB2CAccount();
  useEffect(() => {
    preload("/taskFeed/cadences", () => api.get(`/messaging/cadences/?bobjectTypes=${!isB2CAccount ? BobjectTypes.Company : ""},${BobjectTypes.Lead},${BobjectTypes.Opportunity}`).then((response) => response.data));
  }, []);
  const {
    openedModalInfo: {
      openedModal,
      bobject
    },
    resetOpenedModalInfo,
    isLoading
  } = useSubhomeContext();
  function onSave() {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: BobjectTypes.Task
      }
    }));
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(TasksTabList, {
      parentRef,
      isLoading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }, void 0), openedModal === "reschedule" && /* @__PURE__ */ _jsxDEV(RescheduleModal, {
      bobject,
      onSave,
      onClose: resetOpenedModalInfo
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(TasksTabContent, "pZA7PXuEJM6gLIVTmj/pF3lBPLU=", false, function() {
  return [useIsB2CAccount, useSubhomeContext];
});
_c = TasksTabContent;
function TasksSkeleton() {
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    },
    children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ _jsxDEV(Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
        height: "40px",
        width: "100%",
        variant: "rect"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV(Skeleton, {
        height: "154px",
        width: "100%",
        variant: "rect"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 11
      }, this)]
    }, index + "title", true, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }, this))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 55,
    columnNumber: 5
  }, this);
}
_c2 = TasksSkeleton;
export default function TasksTab(props) {
  return /* @__PURE__ */ _jsxDEV(Suspense, {
    fallback: /* @__PURE__ */ _jsxDEV(TasksSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 25
    }, this),
    children: /* @__PURE__ */ _jsxDEV(TaskFeedProvider, {
      children: /* @__PURE__ */ _jsxDEV(SubhomeLayout, {
        defaultTab: SalesforceTabs.TASKS,
        children: [/* @__PURE__ */ _jsxDEV(SubhomeHeader, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(TasksTabContent, {
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 68,
    columnNumber: 5
  }, this);
}
_c3 = TasksTab;
var _c, _c2, _c3;
$RefreshReg$(_c, "TasksTabContent");
$RefreshReg$(_c2, "TasksSkeleton");
$RefreshReg$(_c3, "TasksTab");
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
