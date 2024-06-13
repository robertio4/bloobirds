import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskButtons/components/priorityButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskButtons/components/priorityButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/components/taskCard/components/taskButtons/components/priorityButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, createToast, Icon, Label } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents, TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskPriorityButton = ({
  task,
  displayOnly = false
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const dataModel = useDataModel();
  const priorityTaskFields = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const defaultValue = priorityTaskFields?.find((priorityTask) => [priorityTask.logicRole, priorityTask.name, priorityTask.id].includes(task.priority));
  const isImportantSelected = defaultValue?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT;
  const handleChangePriority = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    api.patch(`/bobjects/${task?.id}/raw`, {
      contents: {
        [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: isImportantSelected ? TASK_PRIORITY_VALUE.NO_PRIORITY : TASK_PRIORITY_VALUE.IMPORTANT
      },
      params: {
        skipEmptyUpdates: true
      }
    }).then(() => {
      createToast({
        type: "success",
        message: t("extension.card.toasts.changesSaved.success")
      });
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
    });
  };
  if (displayOnly)
    return isImportantSelected ? /* @__PURE__ */ _jsxDEV(Label, {
      overrideStyle: {
        backgroundColor: defaultValue?.backgroundColor,
        color: defaultValue?.textColor,
        borderColor: defaultValue?.backgroundColor,
        textTransform: "initial"
      },
      hoverStyle: {
        opacity: 0.7
      },
      size: "small",
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "flagFilled",
        size: 12,
        color: "softTomato"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 9
      }, void 0)
    }, defaultValue?.id, false, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, void 0) : null;
  return /* @__PURE__ */ _jsxDEV("div", {
    onClick: handleChangePriority,
    children: /* @__PURE__ */ _jsxDEV(Button, {
      variant: "secondary",
      color: isImportantSelected ? "softTomato" : "bloobirds",
      size: "small",
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "flagFilled",
        size: 12,
        color: isImportantSelected ? "tomato" : "bloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 9
      }, void 0)
    }, defaultValue?.id, false, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 74,
    columnNumber: 5
  }, void 0);
};
_s(TaskPriorityButton, "whvfqQ87nV7ADrm25DWfqYeR54o=", false, function() {
  return [useTranslation, useDataModel];
});
_c = TaskPriorityButton;
var _c;
$RefreshReg$(_c, "TaskPriorityButton");
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
