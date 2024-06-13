import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/tasksView/components/startTask.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/components/startTask.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tasksView/components/startTask.tsx", _s = $RefreshSig$();
import { Button, Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport5_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport5_mixpanelBrowser.__esModule ? __vite__cjsImport5_mixpanelBrowser.default : __vite__cjsImport5_mixpanelBrowser;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useTasksAggregation } from "/src/content/components/extensionLeftBar/components/views/tasksView/hooks/useTasksTab.ts.js";
import styles from "/src/content/components/extensionLeftBar/components/views/tasksView/components/startTask.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const StartTask = ({
  disabled = false,
  stage,
  quickFilter
}) => {
  _s();
  const numItems = useTasksAggregation(stage, quickFilter);
  const {
    setOpenStartTasksNavigation
  } = useExtensionContext();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx((numItems === 0 || disabled) && styles.notAllowed),
    children: /* @__PURE__ */ _jsxDEV(Button, {
      color: numItems !== 0 && !disabled ? "bloobirds" : "verySoftPeanut",
      className: styles.startButton,
      size: "small",
      onClick: () => {
        mixpanel.track(MIXPANEL_EVENTS.START_TASKS_FROM_TASK_TAB_OTO);
        setOpenStartTasksNavigation({
          open: true,
          stage,
          quickFilter
        });
      },
      disabled: numItems === 0 || disabled,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "play",
        size: 16,
        color: "white"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, void 0);
};
_s(StartTask, "O5mnK6xMB00g0tk/ql1RIgMmPiM=", false, function() {
  return [useTasksAggregation, useExtensionContext];
});
_c = StartTask;
var _c;
$RefreshReg$(_c, "StartTask");
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
