import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-astrolineDialer-astrolineDialer.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/astrolineDialer/astrolineDialer.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/astrolineDialer/astrolineDialer.tsx", _s = $RefreshSig$();
import { AstrolineSvg, AstrolineCrossSvg } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-assets-svg.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-astrolineDialer-astrolineDialer.module.css.js";
import { AstrolineDialerFrame } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-astrolineDialer-astrolineDialerFrame-astrolineDialerFrame.tsx.js";
import { useAstrolineVisibility } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-astrolineDialer-hooks-useAstrolineVisibility.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const AstrolineDialer = ({
  launchCCF
}) => {
  _s();
  const {
    astrolineVisible,
    toggleVisibility
  } = useAstrolineVisibility();
  return /* @__PURE__ */ _jsxDEV("div", {
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.astroline_icon,
      onClick: toggleVisibility,
      children: [/* @__PURE__ */ _jsxDEV("img", {
        className: styles.astroline_icon_img,
        alt: "astroline-logo",
        src: astrolineVisible ? AstrolineCrossSvg : AstrolineSvg
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.astroline_dialer_container,
        style: {
          display: !astrolineVisible && "none"
        },
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.astroline_dialer,
          children: /* @__PURE__ */ _jsxDEV(AstrolineDialerFrame, {
            launchCCF
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 21,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }, void 0);
};
_s(AstrolineDialer, "JdHSyoUJ5MRhgNGznzt/snfRLyQ=", false, function() {
  return [useAstrolineVisibility];
});
_c = AstrolineDialer;
var _c;
$RefreshReg$(_c, "AstrolineDialer");
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
