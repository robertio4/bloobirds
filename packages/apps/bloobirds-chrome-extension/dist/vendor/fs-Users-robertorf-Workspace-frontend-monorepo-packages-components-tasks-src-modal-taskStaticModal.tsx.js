import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-modal-taskStaticModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/modal/taskStaticModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/modal/taskStaticModal.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { IconButton, Modal, ModalCloseIcon, ModalHeader, ModalTitle } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useTaskForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-hooks-useTaskForm.ts.js";
import { TaskForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-taskForm-taskForm.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-modal-taskStaticModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskStaticModal = ({
  id
}) => {
  _s();
  const taskFormHookValues = useTaskForm(id);
  const {
    isEditionModal,
    handleMinimize,
    handleClose
  } = taskFormHookValues || {};
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    onClose: handleClose,
    width: 460,
    children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
      size: "small",
      children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
        size: "small",
        icon: "checkDouble",
        children: [isEditionModal ? t("common.edit") : t("common.create"), " ", t("bobjectTypes.task")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: [/* @__PURE__ */ _jsxDEV(IconButton, {
          name: "minus",
          size: 24,
          onClick: () => {
            handleMinimize();
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
          onClick: handleClose,
          size: "small"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.container,
      children: /* @__PURE__ */ _jsxDEV(TaskForm, {
        isWebapp: true,
        modalId: id,
        ...taskFormHookValues
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, void 0);
};
_s(TaskStaticModal, "J9mAr4ZweF6neSvlBjXK+8VphcQ=", false, function() {
  return [useTaskForm, useTranslation];
});
_c = TaskStaticModal;
var _c;
$RefreshReg$(_c, "TaskStaticModal");
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
