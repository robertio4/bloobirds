import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/stageDivider/stageDivider.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/stageDivider/stageDivider.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/stageDivider/stageDivider.tsx", _s = $RefreshSig$();
import { useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import styles from "/src/content/components/contactView/components/stageDivider/stageDivider.module.css.js";
import { Fragment as _Fragment, jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const StageDivider = ({
  color
}) => {
  _s();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  return isNoStatusPlanAccount ? /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false) : /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    style: {
      backgroundColor: `var(--${color})`
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, void 0);
};
_s(StageDivider, "Ne5Kp//PRErVk24ueYoha5h5mnE=", false, function() {
  return [useIsNoStatusPlanAccount];
});
_c = StageDivider;
var _c;
$RefreshReg$(_c, "StageDivider");
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
