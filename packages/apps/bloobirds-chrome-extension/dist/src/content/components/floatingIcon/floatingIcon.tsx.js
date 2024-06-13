import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/floatingIcon/floatingIcon.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingIcon/floatingIcon.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingIcon/floatingIcon.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDraggable from "/vendor/.vite-deps-react-draggable.js__v--b0baa450.js"; const Draggable = __vite__cjsImport3_reactDraggable.__esModule ? __vite__cjsImport3_reactDraggable.default : __vite__cjsImport3_reactDraggable;
import __vite__cjsImport4_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const classNames = __vite__cjsImport4_classnames.__esModule ? __vite__cjsImport4_classnames.default : __vite__cjsImport4_classnames;
import { useDebounce } from "/vendor/.vite-deps-use-debounce.js__v--e00a6ff0.js";
import { useFloatingIconPosition } from "/src/hooks/useFloatingIconPosition.tsx.js";
import BloobirdsLogo from "/src/content/components/bloobirds.tsx.js";
import styles from "/src/content/components/floatingIcon/floatingIcon.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const FloatingIcon = (props) => {
  _s();
  const [dragging, setDragging] = useState(false);
  const {
    onClick,
    visible
  } = props;
  const [delayedDragging] = useDebounce(dragging, 100);
  const classes = classNames(styles.container, {
    [styles.visible]: visible,
    [styles.dragging]: dragging
  });
  const classesHoverSide = classNames(styles.hoverSide, {
    [styles.visibleHoverSide]: dragging
  });
  const {
    dimensions,
    bounds,
    position,
    setPosition
  } = useFloatingIconPosition();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(Draggable, {
      handle: "#bb-icon-handle",
      bounds,
      position,
      onStart: () => {
        setDragging(true);
      },
      onStop: (_, data) => {
        setDragging(false);
        setPosition({
          x: data.x,
          y: data.y
        });
      },
      children: /* @__PURE__ */ _jsxDEV("div", {
        id: "floating-icon",
        className: classes,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.logo,
          onClick: delayedDragging ? void 0 : onClick,
          children: /* @__PURE__ */ _jsxDEV(BloobirdsLogo, {
            width: 24,
            height: 24,
            fill: "white"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 50,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: classesHoverSide,
          children: /* @__PURE__ */ _jsxDEV("div", {
            id: "bb-icon-handle",
            children: /* @__PURE__ */ _jsxDEV("svg", {
              width: "8",
              height: "14",
              viewBox: "0 0 8 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ _jsxDEV("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M1 0.75C0.447715 0.75 0 1.19772 0 1.75V2.25C0 2.80228 0.447715 3.25 1 3.25H1.5C2.05228 3.25 2.5 2.80228 2.5 2.25V1.75C2.5 1.19772 2.05228 0.75 1.5 0.75H1ZM1 5.75C0.447715 5.75 0 6.19772 0 6.75V7.25C0 7.80228 0.447715 8.25 1 8.25H1.5C2.05228 8.25 2.5 7.80228 2.5 7.25V6.75C2.5 6.19772 2.05228 5.75 1.5 5.75H1ZM0 11.75C0 11.1977 0.447715 10.75 1 10.75H1.5C2.05228 10.75 2.5 11.1977 2.5 11.75V12.25C2.5 12.8023 2.05228 13.25 1.5 13.25H1C0.447715 13.25 0 12.8023 0 12.25V11.75ZM6 0.75C5.44772 0.75 5 1.19772 5 1.75V2.25C5 2.80228 5.44772 3.25 6 3.25H6.5C7.05228 3.25 7.5 2.80228 7.5 2.25V1.75C7.5 1.19772 7.05228 0.75 6.5 0.75H6ZM5 6.75C5 6.19772 5.44772 5.75 6 5.75H6.5C7.05228 5.75 7.5 6.19772 7.5 6.75V7.25C7.5 7.80228 7.05228 8.25 6.5 8.25H6C5.44772 8.25 5 7.80228 5 7.25V6.75ZM6 10.75C5.44772 10.75 5 11.1977 5 11.75V12.25C5 12.8023 5.44772 13.25 6 13.25H6.5C7.05228 13.25 7.5 12.8023 7.5 12.25V11.75C7.5 11.1977 7.05228 10.75 6.5 10.75H6Z",
                fill: "#1991FF"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 62,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 55,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 54,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, void 0), dragging && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.movableArea,
      style: {
        ...dimensions,
        left: document.documentElement.clientWidth - 4
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(FloatingIcon, "FFfaldo808Ui3iGRFq/iS97Qphc=", false, function() {
  return [useDebounce, useFloatingIconPosition];
});
_c = FloatingIcon;
export default FloatingIcon;
var _c;
$RefreshReg$(_c, "FloatingIcon");
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
