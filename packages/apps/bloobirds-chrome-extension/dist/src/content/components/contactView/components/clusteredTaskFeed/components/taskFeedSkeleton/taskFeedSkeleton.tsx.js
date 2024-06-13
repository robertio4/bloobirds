import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskFeedSkeleton/taskFeedSkeleton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskFeedSkeleton/taskFeedSkeleton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskFeedSkeleton/taskFeedSkeleton.tsx";
import { Skeleton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { TaskTabFeedGroupTitle } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabFeedGroup.tsx.js";
import styles from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabsList.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const clusterNames = ["dailyTasks", "scheduledTasks", "completedTasks"];
export function TaskFeedSkeleton() {
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      width: "100%"
    },
    children: clusterNames.map((name) => {
      return /* @__PURE__ */ _jsxDEV("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        },
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.header,
          children: /* @__PURE__ */ _jsxDEV(TaskTabFeedGroupTitle, {
            cluster: name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 23,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV(Skeleton, {
          variant: "rect",
          width: "100%",
          height: "140px"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 13
        }, this)]
      }, name + "clusterLoader", true, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 11
      }, this);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
_c = TaskFeedSkeleton;
var _c;
$RefreshReg$(_c, "TaskFeedSkeleton");
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
