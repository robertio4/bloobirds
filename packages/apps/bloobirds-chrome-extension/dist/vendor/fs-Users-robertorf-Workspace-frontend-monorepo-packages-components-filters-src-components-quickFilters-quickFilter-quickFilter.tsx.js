import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-quickFilters-quickFilter-quickFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/quickFilters/quickFilter/quickFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/quickFilters/quickFilter/quickFilter.tsx";
import { Chip, Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport4_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport4_mixpanelBrowser.__esModule ? __vite__cjsImport4_mixpanelBrowser.default : __vite__cjsImport4_mixpanelBrowser;
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-quickFilters-quickFilter-quickFilter.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CustomQuickFilter = ({
  onApply,
  blackListedField,
  isSelected,
  quickFilter
}) => {
  const hasBlackListedField = blackListedField && quickFilter?.filters?.some((filter) => filter?.bobjectFieldId === blackListedField?.id);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.wrapper, {
      [styles.chip]: !isSelected,
      [styles.chipSelected]: isSelected
    }),
    children: /* @__PURE__ */ _jsxDEV(Chip, {
      size: "small",
      selected: isSelected,
      disabled: !quickFilter?.defaultGroup && hasBlackListedField,
      onClick: (status) => {
        if (!hasBlackListedField) {
          mixpanel.track(`QUICKFILTER_CLICKED_${quickFilter?.id.toUpperCase()}`);
          onApply(quickFilter, status);
        }
      },
      children: [quickFilter?.iconName && /* @__PURE__ */ _jsxDEV(Icon, {
        name: quickFilter?.iconName,
        color: isSelected ? "white" : quickFilter?.iconColor,
        size: 16,
        className: styles.icon
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 11
      }, void 0), quickFilter?.name]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
_c = CustomQuickFilter;
export default CustomQuickFilter;
var _c;
$RefreshReg$(_c, "CustomQuickFilter");
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
