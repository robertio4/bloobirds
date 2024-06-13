import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookTabs-playbookTabs.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookTabs/playbookTabs.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookTabs/playbookTabs.tsx";
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const memo = __vite__cjsImport2_react["memo"];
import { SnippetsTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { PlaybookTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { Environment } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-types-playbook.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-playbookFeed.module.css.js";
import { PlaybookTabElement } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookTabs-playbookTabElement.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PlaybookTabs = memo(_c = ({
  environment,
  hasSnippetsEnabled,
  hasWhatsappEnabled,
  tabSelected,
  handleChangeTab,
  sidePeekEnabled
}) => {
  const props = {
    onClick: handleChangeTab,
    selected: tabSelected,
    sidePeekEnabled,
    isSmartEmail: environment === Environment.SMART_EMAIL
  };
  switch (environment) {
    case Environment.SMART_EMAIL:
      return hasSnippetsEnabled ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles.tabs_container,
        children: [/* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
          name: PlaybookTab.EMAILS,
          icon: "mail",
          className: styles.see_tabs_item,
          dataTest: "playbook-tab-emails-SEE",
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          style: {
            position: "relative",
            display: "flex"
          },
          children: [/* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
            name: PlaybookTab.SNIPPETS,
            icon: "snippet",
            className: styles.see_tabs_item,
            dataTest: "playbook-tab-snippets-SEE",
            ...props
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 46,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(SnippetsTooltip, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 11
      }, void 0) : null;
    case Environment.EXTENSION:
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.tabs_container,
        children: [/* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
          name: PlaybookTab.PITCHES,
          icon: "chat",
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 13
        }, void 0), hasSnippetsEnabled && /* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
          name: PlaybookTab.SNIPPETS,
          icon: "snippet",
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 15
        }, void 0), /* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
          name: PlaybookTab.EMAILS,
          icon: "mail",
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
          name: PlaybookTab.LINKEDIN,
          icon: "linkedin",
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 13
        }, void 0), hasWhatsappEnabled && /* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
          name: PlaybookTab.WHATSAPP,
          icon: "whatsapp",
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 15
        }, void 0), /* @__PURE__ */ _jsxDEV(PlaybookTabElement, {
          name: PlaybookTab.QQS,
          icon: "chatSupport",
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 11
      }, void 0);
    case Environment.DIALER:
    case Environment.LINKEDIN_TEMPLATE_SELECTOR:
    case Environment.WHATSAPP_TEMPLATE_SELECTOR:
      return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
  }
}, (prevProps, nextProps) => prevProps.tabSelected === nextProps.tabSelected);
_c2 = PlaybookTabs;
var _c, _c2;
$RefreshReg$(_c, "PlaybookTabs$memo");
$RefreshReg$(_c2, "PlaybookTabs");
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
