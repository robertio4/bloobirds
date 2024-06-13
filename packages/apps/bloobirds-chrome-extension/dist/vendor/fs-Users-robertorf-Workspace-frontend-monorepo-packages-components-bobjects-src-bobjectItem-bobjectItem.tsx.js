import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-bobjectItem.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectItem/bobjectItem.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectItem/bobjectItem.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const forwardRef = __vite__cjsImport2_react["forwardRef"]; const useImperativeHandle = __vite__cjsImport2_react["useImperativeHandle"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CommandBox, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel, useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-bobjectItem.module.css.js";
import { SearchCardCenter, SearchCardLeft, SearchPreviewButton, SearchStatusLabel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-components-bobjectCardComponents.tsx.js";
import { BobjectActions } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-utils-actionButtons.tsx.js";
import { getStage, getStatus } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-utils-searchBar.utils.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function BobjectItem({
  bobject,
  hits,
  isSelected,
  handleElementClicked,
  isWebapp = false,
  actions
}) {
  _s();
  const dataModel = useDataModel();
  const type = bobject?.bobjectType;
  const stage = getStage(bobject);
  const status = getStatus(type, stage, bobject, dataModel);
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const classNames = clsx(styles.bobjectItem, {
    [styles.bobjectItem_selected]: isSelected,
    [styles.bobjectItem_prospecting]: stage === "prospecting",
    [styles.bobjectItem_sales]: stage === "sales",
    [styles.bobjectItem_border]: isNoStatusPlanAccount,
    [styles.bobjectItem_webapp]: isWebapp
  });
  const classNamesRight = clsx(styles.bobjectItemRight, {
    [styles.bobjectItemRightOTO]: !isWebapp
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classNames,
    children: [/* @__PURE__ */ _jsxDEV(SearchCardLeft, {
      bobject,
      hits,
      handleCompanyClicked: handleElementClicked
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }, this), isSelected && isWebapp && /* @__PURE__ */ _jsxDEV(SearchPreviewButton, {
      isSelected,
      bobject,
      handleClick: actions?.handleMainBobjectClick
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 9
    }, this), /* @__PURE__ */ _jsxDEV(SearchCardCenter, {
      bobject,
      isWebapp
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: classNamesRight,
      children: !isSelected ? isWebapp ? /* @__PURE__ */ _jsxDEV(SearchStatusLabel, {
        status
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 13
      }, this) : null : /* @__PURE__ */ _jsxDEV(BobjectActions, {
        bobject,
        closeModal: () => handleElementClicked(void 0, void 0),
        handleActionOnClick: actions?.handleActionOnClick,
        isWebapp
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 87,
    columnNumber: 5
  }, this);
}
_s(BobjectItem, "5aZPrW1MtTQ7klyMU3anrYu2PvA=", false, function() {
  return [useDataModel, useIsNoStatusPlanAccount];
});
_c = BobjectItem;
export const BobjectTypeMatch = _s2(forwardRef(_c2 = _s2(({
  bobjectType,
  applyFilter,
  isSelected
}, ref) => {
  _s2();
  const store = CommandBox.useCommandBoxStore();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "bobjects.bobjectItem"
  });
  useImperativeHandle(ref, () => ({
    deleteInput() {
      store.setState("search", "");
    }
  }));
  function handleClick(bobjectType2) {
    store.setState("search", "");
    applyFilter(bobjectType2);
  }
  const classNames = clsx(styles.bobjectItem, styles.bobjectItemType, {
    [styles.bobjectItem_selected]: isSelected
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classNames,
    onClick: () => handleClick(bobjectType),
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.circleIcon,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "filter",
        size: 20,
        color: "bloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 150,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.bobjectItemContent,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "bloobirds",
        children: bobjectType === "All" ? t("all") : PluralBobjectTypes[bobjectType]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 148,
    columnNumber: 7
  }, void 0);
}, "gQCBOJwhAFtO33/ZqKH9NDHHQeg=", false, function() {
  return [CommandBox.useCommandBoxStore, useTranslation];
})), "gQCBOJwhAFtO33/ZqKH9NDHHQeg=", false, function() {
  return [CommandBox.useCommandBoxStore, useTranslation];
});
_c3 = BobjectTypeMatch;
var _c, _c2, _c3;
$RefreshReg$(_c, "BobjectItem");
$RefreshReg$(_c2, "BobjectTypeMatch$forwardRef");
$RefreshReg$(_c3, "BobjectTypeMatch");
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
