import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/dateGroupHeader/dateGroupHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/dateGroupHeader/dateGroupHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/dateGroupHeader/dateGroupHeader.tsx";
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/src/content/components/dateGroupHeader/dateGroupHeader.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const DateGroupHeader = ({
  bobject,
  small
}) => {
  const date = bobject.taskDate || bobject.activityDate || bobject.date;
  return /* @__PURE__ */ _jsxDEV("header", {
    className: styles._header,
    id: date.hashDate,
    children: [!small && /* @__PURE__ */ _jsxDEV(Icon, {
      className: styles._header_icon,
      name: "calendar",
      color: "lightPeanut",
      size: 16
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }, void 0), date?.prefix && /* @__PURE__ */ _jsxDEV(Text, {
      color: "peanut",
      weight: "medium",
      size: "xs",
      inline: true,
      children: date.prefix
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }, void 0), date?.formattedDate && /* @__PURE__ */ _jsxDEV(Text, {
      color: "softPeanut",
      size: "xs",
      inline: true,
      children: date.formattedDate
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, void 0);
};
_c = DateGroupHeader;
export const DateGroupHeaderText = ({
  text
}) => /* @__PURE__ */ _jsxDEV("header", {
  children: /* @__PURE__ */ _jsxDEV(Text, {
    color: "softPeanut",
    weight: "medium",
    size: "xs",
    inline: true,
    className: styles.heading_text,
    children: text
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 35,
  columnNumber: 3
}, void 0);
_c2 = DateGroupHeaderText;
var _c, _c2;
$RefreshReg$(_c, "DateGroupHeader");
$RefreshReg$(_c2, "DateGroupHeaderText");
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
