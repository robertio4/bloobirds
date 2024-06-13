import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/taskIconDisplay/taskIconDisplay.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskIconDisplay/taskIconDisplay.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskIconDisplay/taskIconDisplay.tsx", _s = $RefreshSig$();
import { Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { isAutomatedEmailTask, isCadenceTask, isCallTask, isEmailTask, isLinkedinMessageTask, isMeetingTypeTask, isScheduledTask } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { getFieldByLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { TASK_TYPE } from "/src/utils/task.ts.js";
import styles from "/src/content/components/taskIconDisplay/taskIconDisplay.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskIconDisplay = ({
  bobject,
  size = 18
}) => {
  _s();
  const isScheduled = isScheduledTask(bobject);
  const isCadence = isCadenceTask(bobject);
  const isCall = isCallTask(bobject);
  const isEmail = isEmailTask(bobject);
  const isAutomatedEmail = isAutomatedEmailTask(bobject);
  const isLinkedinMessage = isLinkedinMessageTask(bobject);
  const isMeeting = isMeetingTypeTask(bobject);
  const isScheduledEmailTask = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole === TASK_TYPE.SCHEDULED_EMAIL;
  const {
    customTasks
  } = useCustomTasks();
  const customTaskId = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find((ct) => ct.id === customTaskId?.value);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [isScheduled && !customTask && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icons,
      children: [!isCall && !isEmail && !isLinkedinMessage && /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "clock",
        color: "melon"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 13
      }, void 0), isCall && /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "phone",
        color: "melon"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 22
      }, void 0), isEmail && /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "mail",
        color: "tangerine"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 23
      }, void 0), isLinkedinMessage && /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "linkedin",
        color: "darkBloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 33
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }, void 0), isMeeting && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icons,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "calendar",
        color: "tomato"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }, void 0), isScheduledEmailTask && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icons,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "scheduleMail",
        color: "tangerine"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 9
    }, void 0), isAutomatedEmail && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icons,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "autoMail",
        color: "tangerine"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }, void 0), isCadence && !isAutomatedEmail && !customTask && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icons,
      children: [isCall && /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "phone",
        color: "melon"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 22
      }, void 0), isEmail && /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "mail",
        color: "tangerine"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 23
      }, void 0), isLinkedinMessage && /* @__PURE__ */ _jsxDEV(Icon, {
        size,
        name: "linkedin",
        color: "darkBloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 33
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }, void 0), customTask && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icons,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: customTask.icon,
        color: customTask.iconColor,
        size
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(TaskIconDisplay, "NAm1pgTnKW66T8DHEBbsLdN1iUA=", false, function() {
  return [useCustomTasks];
});
_c = TaskIconDisplay;
var _c;
$RefreshReg$(_c, "TaskIconDisplay");
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
