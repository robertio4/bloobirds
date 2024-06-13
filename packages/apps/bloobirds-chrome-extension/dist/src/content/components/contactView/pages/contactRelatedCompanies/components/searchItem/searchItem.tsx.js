import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactRelatedCompanies/components/searchItem/searchItem.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/searchItem/searchItem.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/searchItem/searchItem.tsx";
import { CircularBadge, IconButton, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/src/content/components/contactView/pages/contactRelatedCompanies/components/searchItem/searchItem.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SearchItem = ({
  company: {
    name,
    website,
    targetMarket
  },
  handleOnClick,
  handleDelete
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._search_item_card,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._search_item_container,
      onClick: handleOnClick,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._circular_badge_wrapper,
        children: /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: targetMarket?.name,
          trigger: "hover",
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
            size: "medium",
            style: {
              backgroundColor: targetMarket?.color || "var(--verySoftPeanut)",
              color: "white",
              height: "32px",
              width: "32px"
            },
            children: targetMarket?.shortName || "?"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 23,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles._search_item_text,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            children: name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "softPeanut",
            children: website
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 39,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, void 0), handleDelete && /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "cross",
      color: "softPeanut",
      onClick: handleDelete
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 24
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 5
  }, void 0);
};
_c = SearchItem;
var _c;
$RefreshReg$(_c, "SearchItem");
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
