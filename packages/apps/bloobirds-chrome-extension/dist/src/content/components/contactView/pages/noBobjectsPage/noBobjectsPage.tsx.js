import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.tsx";
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { Trans } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import styles from "/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const noBobjectsPageContent = {
  [ContactViewTab.COMPANY]: {
    icon: "company",
    text: /* @__PURE__ */ _jsxDEV(Trans, {
      i18nKey: "sidePeek.noObjectsPage.noCompanyFound"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 11
    }, void 0)
  },
  [ContactViewTab.LEAD]: {
    icon: "person",
    text: /* @__PURE__ */ _jsxDEV(Trans, {
      i18nKey: "sidePeek.noObjectsPage.noLeadFound"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 11
    }, void 0)
  },
  [ContactViewTab.OPPORTUNITY]: {
    icon: "fileOpportunity",
    text: /* @__PURE__ */ _jsxDEV(Trans, {
      i18nKey: "sidePeek.noObjectsPage.noOppFound"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 11
    }, void 0)
  },
  [ContactViewTab.RELATED_COMPANIES]: {
    icon: "child",
    text: /* @__PURE__ */ _jsxDEV(Trans, {
      i18nKey: "sidePeek.noObjectsPage.noCompanyRelatedFound"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 11
    }, void 0)
  }
};
const NoBobjectsPage = ({
  contactPage,
  children
}) => {
  const pageContent = noBobjectsPageContent[contactPage];
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: pageContent.icon,
      size: 48,
      color: "softPeanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      color: "softPeanut",
      size: "m",
      align: "center",
      children: pageContent.text
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }, void 0), React.isValidElement(children) && children]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, void 0);
};
_c = NoBobjectsPage;
export default NoBobjectsPage;
var _c;
$RefreshReg$(_c, "NoBobjectsPage");
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
