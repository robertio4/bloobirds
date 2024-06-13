import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/bloobirds.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bloobirds.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bloobirds.tsx";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function BloobirdsLogo({
  width = 60,
  height = 60,
  fill = "#9ACFFF"
}) {
  return /* @__PURE__ */ _jsxDEV("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width,
    height,
    fill: "none",
    viewBox: "0 0 60 60",
    children: [/* @__PURE__ */ _jsxDEV("path", {
      fill,
      fillRule: "evenodd",
      d: "M40.163 22.06a2.547 2.547 0 002.55 2.546 2.55 2.55 0 002.553-2.546 2.549 2.549 0 00-2.552-2.544 2.546 2.546 0 00-2.551 2.544z",
      clipRule: "evenodd"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("path", {
      fill,
      fillRule: "evenodd",
      d: "M34.138 26.438c-.59 0-1.198.056-1.879.164a.404.404 0 01-.466-.375l-.002-.028a.403.403 0 01.34-.421c3.968-.633 6.87-4.133 6.69-8.19C38.635 13.353 34.896 10 30.49 10H15.572c-.84 0-1.522.68-1.522 1.52v36.96c0 .84.681 1.52 1.522 1.52h18.147c6.386 0 11.805-4.82 12.205-10.996.443-6.829-4.97-12.566-11.786-12.566z",
      clipRule: "evenodd"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }, this);
}
_c = BloobirdsLogo;
export default BloobirdsLogo;
var _c;
$RefreshReg$(_c, "BloobirdsLogo");
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
