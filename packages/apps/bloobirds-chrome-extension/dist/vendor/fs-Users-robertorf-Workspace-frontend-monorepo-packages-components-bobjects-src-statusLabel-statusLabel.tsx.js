import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-statusLabel-statusLabel.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/statusLabel/statusLabel.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/statusLabel/statusLabel.tsx";
import { Label, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { colors } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-statusLabel-statusLabel.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const StatusLabel = ({
  backgroundColor = colors.peanut,
  textColor = "white",
  maxWidth = "auto",
  logicRole = "",
  key = "",
  name = "unknown",
  showColor = true,
  onClick
}) => {
  const style = {
    backgroundColor,
    borderColor: backgroundColor,
    color: textColor,
    maxWidth
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._status_wrapper,
    children: /* @__PURE__ */ _jsxDEV(Label, {
      value: logicRole,
      dataTest: logicRole ?? "status",
      align: "center",
      inline: false,
      onClick,
      selected: showColor,
      hoverStyle: style,
      overrideStyle: {
        width: "100%",
        boxSizing: "border-box"
      },
      ...showColor ? {
        selectedStyle: style
      } : {},
      children: /* @__PURE__ */ _jsxDEV(Text, {
        htmlTag: "span",
        color: textColor,
        size: "s",
        className: styles._status_text,
        children: name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }, void 0)
    }, `status-${key ? key : name}`, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, void 0)
  }, `status-${name}`, false, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, void 0);
};
_c = StatusLabel;
var _c;
$RefreshReg$(_c, "StatusLabel");
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
