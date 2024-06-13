import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/tourHandler/components/tourSteps/tourStep.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/components/tourSteps/tourStep.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/components/tourSteps/tourStep.tsx";
import { Icon, IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import BloobirdsLogo from "/src/content/components/bloobirds.tsx.js";
import styles from "/src/content/components/tourHandler/components/tourSteps/tourStep.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TourStep = ({
  icon,
  titleKey,
  contentKey,
  handleClose,
  t
}) => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.tourStepWrapper,
  children: [/* @__PURE__ */ _jsxDEV("div", {
    className: styles.tourStepHeader,
    children: [/* @__PURE__ */ _jsxDEV(BloobirdsLogo, {
      width: 16,
      height: 16,
      fill: "#1991ff"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "cross",
      onClick: handleClose
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV("div", {
    className: styles.tourStepContent,
    children: [icon && /* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      size: 32
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 16
    }, void 0), titleKey && /* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      weight: "bold",
      children: t(titleKey)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }, void 0), contentKey && /* @__PURE__ */ _jsxDEV(Text, {
      size: "xxs",
      children: t(contentKey)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 22
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV("div", {
    className: styles.tourStepControls
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, void 0)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 15,
  columnNumber: 3
}, void 0);
_c = TourStep;
var _c;
$RefreshReg$(_c, "TourStep");
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
