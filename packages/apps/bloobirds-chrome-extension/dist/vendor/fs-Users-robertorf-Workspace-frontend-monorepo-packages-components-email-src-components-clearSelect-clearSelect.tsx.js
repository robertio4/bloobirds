import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-clearSelect-clearSelect.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/clearSelect/clearSelect.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/clearSelect/clearSelect.tsx", _s = $RefreshSig$();
import { Dropdown, Icon, Item, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-clearSelect-clearSelect.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ClearSelect = ({
  value,
  options,
  onChange,
  emptyMessage
}) => {
  _s();
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false);
  if (options?.length === 0) {
    return /* @__PURE__ */ _jsxDEV(Text, {
      color: "softPeanut",
      size: "m",
      children: emptyMessage
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    visible,
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      tabIndex: 0,
      role: "button",
      className: styles.select,
      onClick: () => setVisible(!visible),
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        color: "softPeanut",
        size: "m",
        children: options.find((option) => option.value === value)?.label
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
        name: "chevronDown",
        color: "verySoftPeanut",
        size: 16
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }, void 0),
    children: options.map((option) => /* @__PURE__ */ _jsxDEV(Item, {
      value: option,
      onClick: () => {
        onChange(option.value);
        setVisible(false);
      },
      children: option.label
    }, option.value, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 9
    }, void 0))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, void 0);
};
_s(ClearSelect, "VBnK8emvBl6TWQ0lbIxwF1YEMM4=", false, function() {
  return [useVisible];
});
_c = ClearSelect;
export default ClearSelect;
var _c;
$RefreshReg$(_c, "ClearSelect");
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
