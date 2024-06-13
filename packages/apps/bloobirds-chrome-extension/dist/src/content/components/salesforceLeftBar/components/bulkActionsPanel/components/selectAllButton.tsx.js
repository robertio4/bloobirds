import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeftBar/components/bulkActionsPanel/components/selectAllButton.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Checkbox, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import styles from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SelectAllButton = ({
  items,
  totalMatching
}) => {
  _s();
  const {
    isSelectAllChecked,
    toggleSelectAll,
    selectedItems,
    setSelectedItems,
    setSelectAllChecked,
    setUseEveryBobject,
    useEveryBobject: {
      isActive
    }
  } = useSubhomeContext();
  const {
    t
  } = useTranslation();
  useEffect(() => {
    if ((selectedItems.length === items.length || selectedItems.length === totalMatching) && selectedItems.length > 0 || isActive) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [selectedItems, isActive]);
  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(items);
      toggleSelectAll(!isSelectAllChecked);
    }
    setUseEveryBobject({
      isActive: false
    });
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.selectAllWrapper,
    children: /* @__PURE__ */ _jsxDEV(Checkbox, {
      size: "small",
      onClick: handleSelectAll,
      checked: isSelectAllChecked,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        children: t("leftBar.bulk.selectAll.general")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 46,
    columnNumber: 5
  }, void 0);
};
_s(SelectAllButton, "+uVyh6tlllbrqJC8KLN5+5IIxos=", false, function() {
  return [useSubhomeContext, useTranslation];
});
_c = SelectAllButton;
export default SelectAllButton;
var _c;
$RefreshReg$(_c, "SelectAllButton");
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
