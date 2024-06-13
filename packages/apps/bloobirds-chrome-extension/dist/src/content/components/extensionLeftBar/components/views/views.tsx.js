import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/views.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/views.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/views.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Tooltip, IconButton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useHasNewTaskFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import __vite__cjsImport7_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const cx = __vite__cjsImport7_classnames.__esModule ? __vite__cjsImport7_classnames.default : __vite__cjsImport7_classnames;
import { motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import styles from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import InactiveTab from "/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.tsx.js";
import InboxTab from "/src/content/components/extensionLeftBar/components/views/inboxView/inboxTab.tsx.js";
import MeetingsTab from "/src/content/components/extensionLeftBar/components/views/meetingsView/meetingsTab.tsx.js";
import TasksTab from "/src/content/components/extensionLeftBar/components/views/newTasksView/tasksTab.tsx.js";
import NurturingTab from "/src/content/components/extensionLeftBar/components/views/nurturingView/nurturingTab.tsx.js";
import OutboxTab from "/src/content/components/extensionLeftBar/components/views/outboxView/outboxTab.tsx.js";
import PipelineTab from "/src/content/components/extensionLeftBar/components/views/pipelineView/pipelineTab.tsx.js";
import OldTasksTab from "/src/content/components/extensionLeftBar/components/views/tasksView/tasksTab.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default function ExtensionLeftBarContent({
  dimensions,
  onToggle,
  openTab
}) {
  _s();
  const {
    t
  } = useTranslation();
  const parentRef = useRef(null);
  const {
    currentTab
  } = useExtensionLeftBarContext();
  const [animationComplete, setAnimationComplete] = useState(false);
  const accountId = useActiveAccountId();
  const hasNewTaskFeed = useHasNewTaskFeed(accountId);
  const menuBtnRef = useRef(null);
  const buttonContainerStyles = cx(styles.buttonContainer, {
    [styles.buttonContainerCollapsed]: !open,
    [styles.buttonContainerInContent]: open && openTab,
    [styles.buttonWithoutHeader]: dimensions?.top === 0
  });
  let view;
  switch (currentTab) {
    case SalesforceTabs.TASKS:
      view = hasNewTaskFeed ? /* @__PURE__ */ _jsxDEV(TasksTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, this) : /* @__PURE__ */ _jsxDEV(OldTasksTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }, this);
      break;
    case SalesforceTabs.PIPELINE:
      view = /* @__PURE__ */ _jsxDEV(PipelineTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 14
      }, this);
      break;
    case SalesforceTabs.MEETINGS:
      view = /* @__PURE__ */ _jsxDEV(MeetingsTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 14
      }, this);
      break;
    case SalesforceTabs.NURTURING:
      view = /* @__PURE__ */ _jsxDEV(NurturingTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 14
      }, this);
      break;
    case SalesforceTabs.INACTIVE:
      view = /* @__PURE__ */ _jsxDEV(InactiveTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 14
      }, this);
      break;
    case SalesforceTabs.INBOX:
      view = /* @__PURE__ */ _jsxDEV(InboxTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 14
      }, this);
      break;
    case SalesforceTabs.OUTBOX:
      view = /* @__PURE__ */ _jsxDEV(OutboxTab, {
        parentRef
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 14
      }, this);
      break;
    case SalesforceTabs.TOOLTIP:
    default:
      break;
  }
  const onAnimationComplete = () => {
    setAnimationComplete(true);
  };
  const onAnimationStart = () => {
    setAnimationComplete(false);
  };
  return /* @__PURE__ */ _jsxDEV(motion.div, {
    id: "bb-left-bar",
    initial: {
      width: "0px",
      opacity: 0
    },
    animate: {
      width: "384px",
      opacity: 1
    },
    transition: {
      duration: 0.25
    },
    exit: {
      width: "0px",
      opacity: 0
    },
    ref: parentRef,
    className: styles["animated-div"],
    style: dimensions,
    onAnimationComplete,
    onAnimationStart,
    onMouseOver: () => menuBtnRef.current.style.display = "flex",
    onMouseOut: () => menuBtnRef.current.style.display = "none",
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles["button-position-wrapper"],
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: buttonContainerStyles,
        ref: menuBtnRef,
        style: {
          display: "none"
        },
        children: /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t(`common.${[open ? "collapse" : "expand"]}`),
          position: "right",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            className: styles.button,
            name: open ? "chevronLeft" : "chevronRight",
            onClick: () => onToggle(),
            size: 10,
            color: "bloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      style: dimensions,
      className: cx(styles.content, "left-bar-content"),
      children: animationComplete && view
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 90,
    columnNumber: 5
  }, this);
}
_s(ExtensionLeftBarContent, "ExLRnpV26qrebIs8aDsGTu4cDDc=", false, function() {
  return [useTranslation, useExtensionLeftBarContext, useActiveAccountId, useHasNewTaskFeed];
});
_c = ExtensionLeftBarContent;
var _c;
$RefreshReg$(_c, "ExtensionLeftBarContent");
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
