import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/draggableTopBar/draggableTopBar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/draggableTopBar/draggableTopBar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/draggableTopBar/draggableTopBar.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Tooltip, IconButton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import __vite__cjsImport4_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const classNames = __vite__cjsImport4_classnames.__esModule ? __vite__cjsImport4_classnames.default : __vite__cjsImport4_classnames;
import styles from "/src/content/components/draggableTopBar/draggableTopBar.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function DraggableTopBar(props) {
  _s();
  const {
    onClose,
    dragging,
    onMinimize,
    id,
    enableTogglePosition,
    onToggleView
  } = props;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.draggableTopBar"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    id: "note" + id,
    className: classNames(styles.container, {
      [styles.dragging]: dragging
    }),
    children: [/* @__PURE__ */ _jsxDEV("svg", {
      className: styles.handle,
      width: "8",
      height: "14",
      viewBox: "0 0 8 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ _jsxDEV("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1 0.75C0.447715 0.75 0 1.19772 0 1.75V2.25C0 2.80228 0.447715 3.25 1 3.25H1.5C2.05228 3.25 2.5 2.80228 2.5 2.25V1.75C2.5 1.19772 2.05228 0.75 1.5 0.75H1ZM1 5.75C0.447715 5.75 0 6.19772 0 6.75V7.25C0 7.80228 0.447715 8.25 1 8.25H1.5C2.05228 8.25 2.5 7.80228 2.5 7.25V6.75C2.5 6.19772 2.05228 5.75 1.5 5.75H1ZM0 11.75C0 11.1977 0.447715 10.75 1 10.75H1.5C2.05228 10.75 2.5 11.1977 2.5 11.75V12.25C2.5 12.8023 2.05228 13.25 1.5 13.25H1C0.447715 13.25 0 12.8023 0 12.25V11.75ZM6 0.75C5.44772 0.75 5 1.19772 5 1.75V2.25C5 2.80228 5.44772 3.25 6 3.25H6.5C7.05228 3.25 7.5 2.80228 7.5 2.25V1.75C7.5 1.19772 7.05228 0.75 6.5 0.75H6ZM5 6.75C5 6.19772 5.44772 5.75 6 5.75H6.5C7.05228 5.75 7.5 6.19772 7.5 6.75V7.25C7.5 7.80228 7.05228 8.25 6.5 8.25H6C5.44772 8.25 5 7.80228 5 7.25V6.75ZM6 10.75C5.44772 10.75 5 11.1977 5 11.75V12.25C5 12.8023 5.44772 13.25 6 13.25H6.5C7.05228 13.25 7.5 12.8023 7.5 12.25V11.75C7.5 11.1977 7.05228 10.75 6.5 10.75H6Z",
        fill: "#9ACFFF"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      children: enableTogglePosition && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("switch"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "sidepeek",
          onClick: onToggleView
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.actions,
      children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("minimise"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "minus",
          onClick: onMinimize
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("close"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "cross",
          onClick: onClose
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }, this);
}
_s(DraggableTopBar, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = DraggableTopBar;
var _c;
$RefreshReg$(_c, "DraggableTopBar");
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
