import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/tourHandler/components/sliderControls/sliderControls.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/components/sliderControls/sliderControls.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/components/sliderControls/sliderControls.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { IconButton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/src/content/components/tourHandler/tourHandler.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SliderControls = ({
  length,
  position,
  setPosition,
  closeModal
}) => {
  _s();
  function moveBack() {
    if (position === 0)
      return;
    setPosition(position - 1);
  }
  function moveForward() {
    if (position === length - 1) {
      return;
    } else {
      setPosition(position + 1);
    }
  }
  useEffect(() => {
    const down = (e) => {
      if (e.key === "ArrowRight") {
        moveForward();
      } else if (e.key === "ArrowLeft") {
        moveBack();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [position]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.sliderControls,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.sliderControlsLeft,
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "chevronLeft",
        disabled: position === 0,
        size: 16,
        onClick: moveBack
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("ul", {
      children: Array.from({
        length
      }).map((dot, index) => /* @__PURE__ */ _jsxDEV("li", {
        "data-testid": `dot-${dot}`,
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "statusCircle",
          size: 8,
          color: position === index ? "bloobirds" : "veryLightBloobirds",
          onClick: () => setPosition(index)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 13
        }, void 0)
      }, index, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 11
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.sliderControlsLeft,
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "chevronRight",
        disabled: position === length - 1,
        size: 16,
        onClick: moveForward
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, void 0);
};
_s(SliderControls, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SliderControls;
var _c;
$RefreshReg$(_c, "SliderControls");
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
