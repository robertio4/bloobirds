import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-snippetsTooltipBlock-snippetsTooltipBlock.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/snippetsTooltipBlock/snippetsTooltipBlock.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/snippetsTooltipBlock/snippetsTooltipBlock.tsx", _s = $RefreshSig$();
import { Checkbox, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ExtensionHelperKeys, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport6_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport6_mixpanelBrowser.__esModule ? __vite__cjsImport6_mixpanelBrowser.default : __vite__cjsImport6_mixpanelBrowser;
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-snippetsTooltipBlock-snippetsTooltipBlock.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SnippetsTooltipBlock = ({
  hasBeenSeen
}) => {
  _s();
  const containerClasses = clsx(styles.container, {
    [styles.containerSeen]: hasBeenSeen
  });
  const {
    save,
    has
  } = useUserHelpers();
  const banishTooltip = () => {
    save(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
    mixpanel.track(MIXPANEL_EVENTS.SNIPPETS_TOOLTIP_BLOCK_MARKED_AS_HIDDEN);
  };
  return !has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN) ? /* @__PURE__ */ _jsxDEV("div", {
    className: containerClasses,
    onClick: () => window.open("https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time", "_blank"),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cardText,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.leftIcons_container,
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "snippet",
          color: "lightPurple",
          size: 24
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.templateTextWrapper,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: /* @__PURE__ */ _jsxDEV("div", {
            children: [/* @__PURE__ */ _jsxDEV("b", {
              children: "Always write better and faster"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 37,
              columnNumber: 15
            }, void 0), " Snippets are a great ally for professionals generating a great deal of content and who can reuse pieces of it to deliver quality texts faster."]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 36,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.shortcutContainer,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            weight: "bold",
            children: "Shortcut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 43,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            onClick: () => window.open("https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time", "_blank"),
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "purple",
              className: styles.shortcut,
              children: "/why-snippets-are-the-best"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 54,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 46,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._footer_section,
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
          },
          children: [/* @__PURE__ */ _jsxDEV(Checkbox, {
            onClick: (value) => {
              if (value)
                banishTooltip();
            },
            size: "small",
            color: "purple"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 66,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            children: "Do not show this again"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s(SnippetsTooltipBlock, "WAnJIObu3gC0w3B9TA1GcDRyIzU=", false, function() {
  return [useUserHelpers];
});
_c = SnippetsTooltipBlock;
var _c;
$RefreshReg$(_c, "SnippetsTooltipBlock");
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
