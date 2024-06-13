import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskIcons.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskIcons.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskIcons.tsx", _s = $RefreshSig$();
import { Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabsList.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const TaskIcon = (iconProps) => {
  return /* @__PURE__ */ _jsxDEV(Icon, {
    size: 16,
    ...iconProps
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 10
  }, void 0);
};
_c = TaskIcon;
const CustomTaskIcon = ({
  customTaskId
}) => {
  _s();
  const {
    customTasks
  } = useCustomTasks();
  const customTask = customTasks?.find((ct) => ct.id === customTaskId);
  if (!customTask) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.customTaskIcon,
    children: [/* @__PURE__ */ _jsxDEV(TaskIcon, {
      name: customTask.icon,
      color: customTask.iconColor
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("span", {
      className: styles.taskCardTitle,
      style: {
        marginTop: "2px"
      },
      children: customTask.name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, void 0);
};
_s(CustomTaskIcon, "NAm1pgTnKW66T8DHEBbsLdN1iUA=", false, function() {
  return [useCustomTasks];
});
_c2 = CustomTaskIcon;
export const TaskIcons = ({
  task
}) => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.taskCardIcons,
  children: task.customTaskId ? /* @__PURE__ */ _jsxDEV(CustomTaskIcon, {
    customTaskId: task.customTaskId
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 7
  }, void 0) : task.type === "PROSPECT_CADENCE" ? [task.actionCall && /* @__PURE__ */ _jsxDEV(TaskIcon, {
    name: "phone",
    color: "extraCall"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 28
  }, void 0), task.actionEmail && /* @__PURE__ */ _jsxDEV(TaskIcon, {
    name: "mail",
    color: "tangerine"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 29
  }, void 0), task.actionLinkedin && /* @__PURE__ */ _jsxDEV(TaskIcon, {
    name: "linkedin",
    color: "darkBloobirds"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 32
  }, void 0)] : task.customTaskId ? /* @__PURE__ */ _jsxDEV(CustomTaskIcon, {
    customTaskId: task.customTaskId
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 7
  }, void 0) : task?.actionCall ? /* @__PURE__ */ _jsxDEV(TaskIcon, {
    name: "phone",
    color: "extraCall"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 7
  }, void 0) : task?.actionEmail ? /* @__PURE__ */ _jsxDEV(TaskIcon, {
    name: "mail",
    color: "tangerine"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 42,
    columnNumber: 7
  }, void 0) : task?.actionLinkedin ? /* @__PURE__ */ _jsxDEV(TaskIcon, {
    name: "linkedin",
    color: "darkBloobirds"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 7
  }, void 0) : /* @__PURE__ */ _jsxDEV(TaskIcon, {
    name: task.icon,
    color: task.color
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 46,
    columnNumber: 7
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 28,
  columnNumber: 3
}, void 0);
_c3 = TaskIcons;
var _c, _c2, _c3;
$RefreshReg$(_c, "TaskIcon");
$RefreshReg$(_c2, "CustomTaskIcon");
$RefreshReg$(_c3, "TaskIcons");
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
