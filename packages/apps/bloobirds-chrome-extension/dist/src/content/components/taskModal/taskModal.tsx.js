import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/taskModal/taskModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskModal/taskModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskModal/taskModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDraggable from "/vendor/.vite-deps-react-draggable.js__v--b0baa450.js"; const Draggable = __vite__cjsImport3_reactDraggable.__esModule ? __vite__cjsImport3_reactDraggable.default : __vite__cjsImport3_reactDraggable;
import { useMinimizableModal, useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { TaskForm, useTaskForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-index.tsx.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useDraggablePosition } from "/src/hooks/useDraggablePosition.tsx.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { DraggableTopBar } from "/src/content/components/draggableTopBar/draggableTopBar.tsx.js";
import styles from "/src/content/components/taskModal/taskModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskModal = ({
  id
}) => {
  _s();
  const {
    data: {
      location
    }
  } = useMinimizableModal(id);
  const taskFormHookValues = useTaskForm(id);
  const {
    handleMinimize,
    handleClose
  } = taskFormHookValues || {};
  const {
    minimizableModals
  } = useMinimizableModals();
  const notesOpened = minimizableModals?.filter((modal) => modal?.open && modal?.type === "task")?.length;
  const {
    useGetExtendedContext,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const isExtendedOpened = useGetExtendedContext()?.open;
  const sidePeekEnabled = useGetSidePeekEnabled();
  const [dragging, setDragging] = useState();
  const {
    position,
    setPosition,
    bounds
  } = useDraggablePosition(id, {
    width: 320,
    height: 280
  }, (notesOpened + 1) * 20, location, isExtendedOpened ? sidePeekEnabled ? 398 : 348 : 8);
  const wrapperClasses = clsx(styles.wrapper, {
    [styles.dragging]: dragging
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: wrapperClasses,
    children: /* @__PURE__ */ _jsxDEV(Draggable, {
      handle: "#note" + id,
      position,
      bounds,
      onStart: () => setDragging(true),
      onStop: () => setDragging(false),
      onDrag: (e, data) => {
        setPosition({
          x: data.x,
          y: data.y
        });
      },
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.container,
        onClick: (event) => event.stopPropagation(),
        children: [/* @__PURE__ */ _jsxDEV(DraggableTopBar, {
          dragging,
          id,
          onClose: handleClose,
          onMinimize: () => {
            handleMinimize();
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindow, {
          height: 230,
          children: /* @__PURE__ */ _jsxDEV(TaskForm, {
            modalId: id,
            ...taskFormHookValues
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 65,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 5
  }, void 0);
};
_s(TaskModal, "Lk7BzQfiI3yBqfXUE1aHUpau4ns=", true, function() {
  return [useMinimizableModal, useTaskForm, useMinimizableModals, useExtensionContext, useDraggablePosition];
});
_c = TaskModal;
var _c;
$RefreshReg$(_c, "TaskModal");
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
