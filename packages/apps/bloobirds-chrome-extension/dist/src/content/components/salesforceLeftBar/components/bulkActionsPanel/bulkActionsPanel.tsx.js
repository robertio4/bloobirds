import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.tsx", _s = $RefreshSig$();
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import styles from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.module.css.js";
import BulkActionButtons from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/bulkActionButtons.tsx.js";
import { SelectAllBanner } from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllBanner.tsx.js";
import SelectAllButton from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllButton.tsx.js";
import TotalResultsBanner from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/totalResultsBanner.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const BulkActionsPanel = ({
  tab,
  items,
  totalMatching,
  availableActions
}) => {
  _s();
  const {
    selectedItems
  } = useSubhomeContext();
  const hasItemsSelected = selectedItems?.length > 0;
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.actionsRow,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.leftSide,
        children: [totalMatching > 0 && /* @__PURE__ */ _jsxDEV(SelectAllButton, {
          items,
          totalMatching
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 33
        }, void 0), hasItemsSelected && /* @__PURE__ */ _jsxDEV(BulkActionButtons, {
          tab,
          availableActions
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 32
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.rightSide,
        children: /* @__PURE__ */ _jsxDEV(TotalResultsBanner, {
          totalMatching
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, void 0), hasItemsSelected && /* @__PURE__ */ _jsxDEV(SelectAllBanner, {
      items,
      totalMatching
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 28
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, void 0);
};
_s(BulkActionsPanel, "i4XNyTobOWet26fZAKFJhMyh6dU=", false, function() {
  return [useSubhomeContext];
});
_c = BulkActionsPanel;
export default BulkActionsPanel;
var _c;
$RefreshReg$(_c, "BulkActionsPanel");
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
