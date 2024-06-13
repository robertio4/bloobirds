import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/tasksView/tasksTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/tasksTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/tasksTab.tsx", _s = $RefreshSig$();
import { RescheduleModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import SubhomeHeader from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader.tsx.js";
import SubhomeLayout, { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { TasksTabFilters } from "/src/content/components/extensionLeftBar/components/views/tasksView/filters/tasksTabFilters.tsx.js";
import { TasksTabList } from "/src/content/components/extensionLeftBar/components/views/tasksView/list/tasksTabsList.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const TasksTabContent = ({
  parentRef
}) => {
  _s();
  const {
    query,
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
    children: [/* @__PURE__ */ _jsxDEV(TasksTabFilters, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0), Object.keys(query).length > 0 ? /* @__PURE__ */ _jsxDEV(TasksTabList, {
      parentRef,
      isLoading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }, void 0) : null, openedModal === "reschedule" && /* @__PURE__ */ _jsxDEV(RescheduleModal, {
      bobject,
      onSave,
      onClose: resetOpenedModalInfo
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(TasksTabContent, "DIMRCq9Y2AikIOGC72NMqjmyN60=", false, function() {
  return [useSubhomeContext];
});
_c = TasksTabContent;
export default function TasksTab(props) {
  return /* @__PURE__ */ _jsxDEV(SubhomeLayout, {
    defaultTab: SalesforceTabs.TASKS,
    children: [/* @__PURE__ */ _jsxDEV(SubhomeHeader, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(TasksTabContent, {
      ...props
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 47,
    columnNumber: 5
  }, this);
}
_c2 = TasksTab;
var _c, _c2;
$RefreshReg$(_c, "TasksTabContent");
$RefreshReg$(_c2, "TasksTab");
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
