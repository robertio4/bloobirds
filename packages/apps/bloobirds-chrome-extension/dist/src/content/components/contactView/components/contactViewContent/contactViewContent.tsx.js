import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewContent/contactViewContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewContent/contactViewContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewContent/contactViewContent.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useRef = __vite__cjsImport2_react["useRef"];
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/src/content/components/contactView/components/contactViewContent/contactViewContent.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactViewContent = _s(React.forwardRef(_c = _s((props, ref) => {
  _s();
  const {
    children,
    fullWidth,
    onScroll
  } = props;
  const lastScrollTop = useRef(0);
  return /* @__PURE__ */ _jsxDEV("div", {
    ref,
    id: "bb-contact-view-content",
    onScroll: () => {
      if (onScroll) {
        const contactEl = document.getElementById("bb-contact-view-content");
        const currentScrollTop = contactEl.scrollTop;
        const isScrollDown = currentScrollTop > lastScrollTop.current;
        const isScrollUp = currentScrollTop < lastScrollTop.current;
        lastScrollTop.current = currentScrollTop;
        const heightWizardHelper = document.getElementById("bb-wizard-helper")?.clientHeight;
        const heightMinimizedHeader = 62 + 54 + 5 + 80;
        const heightMaximizedHeader = 100 + 54 + 5 + heightWizardHelper;
        const scroll = contactEl.scrollTop;
        const scrollHeight = contactEl.scrollHeight;
        const clientHeight = contactEl.clientHeight;
        const canMinimize = heightMaximizedHeader + clientHeight - heightMinimizedHeader < scrollHeight;
        const canMaximize = heightMinimizedHeader + clientHeight - heightMaximizedHeader < scrollHeight;
        onScroll(scroll, canMinimize && isScrollDown, canMaximize && isScrollUp);
      }
    },
    className: clsx(styles.content_container, {
      [styles.content_container_full]: fullWidth
    }),
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 7
  }, void 0);
}, "6j1ZRr4/7hw48cVBAUaD4VLVcNc=")), "6j1ZRr4/7hw48cVBAUaD4VLVcNc=");
_c2 = ContactViewContent;
ContactViewContent.defaultProps = {
  fullWidth: false
};
var _c, _c2;
$RefreshReg$(_c, "ContactViewContent$React.forwardRef");
$RefreshReg$(_c2, "ContactViewContent");
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
