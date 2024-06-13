import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/taskSidebar/taskSidebar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskSidebar/taskSidebar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskSidebar/taskSidebar.tsx";
import { Icon, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/src/content/components/taskSidebar/taskSidebar.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskTab = ({
  children,
  icon,
  counter,
  colors = {
    bgUnselected: "verySoftBloobirds",
    iconColor: "peanut",
    opacity: 1
  },
  onClick,
  name,
  isHighlighted
}) => {
  const colorsToUse = {
    bgUnselected: "verySoftBloobirds",
    iconColor: "peanut",
    ...colors
  };
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: children,
    position: "right",
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.taskContainer,
      style: isHighlighted ? {
        backgroundColor: `var(--${colorsToUse.basic})`,
        opacity: colorsToUse?.opacity
      } : {
        backgroundColor: `var(--${colorsToUse.bgUnselected})`,
        opacity: colorsToUse?.opacity
      },
      onClick,
      "data-test": `Button-Task-${name}`,
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        size: 24,
        name: icon,
        color: colorsToUse.iconColor
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, void 0), counter > 0 && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.taskCounter,
        children: counter < 100 ? counter : "99+"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 25
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, void 0);
};
_c = TaskTab;
const TaskSidebar = ({
  children
}) => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.container,
  children
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 57,
  columnNumber: 39
}, void 0);
_c2 = TaskSidebar;
export default TaskSidebar;
var _c, _c2;
$RefreshReg$(_c, "TaskTab");
$RefreshReg$(_c2, "TaskSidebar");
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
