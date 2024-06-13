import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllBanner.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllBanner.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllBanner.tsx", _s = $RefreshSig$();
import { Trans } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { bobjectPlurals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import styles from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SelectAllBanner = ({
  items,
  totalMatching
}) => {
  _s();
  const {
    selectedItems,
    setSelectedItems,
    useEveryBobject: {
      isActive
    },
    setUseEveryBobject,
    isSelectAllChecked,
    query
  } = useSubhomeContext();
  const bobjectType = items[0]?.id?.typeName;
  const handleSelectAllBobjects = () => {
    setUseEveryBobject({
      isActive: true,
      total: totalMatching,
      query: {
        query,
        sort: [],
        formFields: true,
        page: 0,
        pageSize: totalMatching,
        injectReferences: true
      }
    });
    setSelectedItems(items);
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.message,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      inline: true,
      children: /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: `leftBar.bulk.selectedAllText.${bobjectPlurals[bobjectType]?.toLowerCase()}`,
        values: {
          totalMatching,
          selected: isActive ? totalMatching : selectedItems?.length
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }, void 0), " ", selectedItems?.length < totalMatching && !isActive && isSelectAllChecked && /* @__PURE__ */ _jsxDEV("span", {
      className: styles.link,
      onClick: handleSelectAllBobjects,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        inline: true,
        color: "bloobirds",
        htmlTag: "span",
        children: totalMatching > 1e3 ? /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "leftBar.bulk.continueWithMaximum"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 15
        }, void 0) : /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: `leftBar.bulk.selectAll.${bobjectPlurals[bobjectType]?.toLowerCase()}`,
          values: {
            count: totalMatching
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 5
  }, void 0);
};
_s(SelectAllBanner, "UiBLqZwcfNOUdFqiqp1R2JSGsWs=", false, function() {
  return [useSubhomeContext];
});
_c = SelectAllBanner;
var _c;
$RefreshReg$(_c, "SelectAllBanner");
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
