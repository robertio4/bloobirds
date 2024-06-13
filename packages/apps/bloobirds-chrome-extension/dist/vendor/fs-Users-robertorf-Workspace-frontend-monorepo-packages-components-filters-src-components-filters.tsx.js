import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-filters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/filters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/filters.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const Children = __vite__cjsImport2_react["Children"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { FiltersProvider, useFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-hooks-index.ts.js";
import { transformFiltersToQuery } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-utils-filters.utils.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-filter.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const withProvider = (Component) => ({
  ...props
}) => /* @__PURE__ */ _jsxDEV(FiltersProvider, {
  setSubqueryBobjectType: props.setOrsBobjectType,
  bobjectFields: props.bobjectFields,
  defaultSort: props.defaultSort,
  defaultQuickFilters: props.defaultQuickFilters,
  children: /* @__PURE__ */ _jsxDEV(Component, {
    ...props
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 63,
    columnNumber: 5
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 57,
  columnNumber: 3
}, void 0);
const Filters = ({
  bobjectType,
  children,
  defaultFilters = [],
  tabName,
  onQueryChange,
  bobjectFields,
  onHaveFiltersBeenChanged
}) => {
  _s();
  const {
    filters,
    setDefaultFiltersValues,
    haveFiltersBeenChanged
  } = useFilters(bobjectType, tabName);
  const hasDefaultFilters = typeof defaultFilters === "object";
  useEffect(() => {
    if (typeof onHaveFiltersBeenChanged === "function")
      onHaveFiltersBeenChanged(haveFiltersBeenChanged);
  }, [haveFiltersBeenChanged]);
  useEffect(() => {
    if (defaultFilters)
      setDefaultFiltersValues(defaultFilters);
  }, [hasDefaultFilters, tabName]);
  useEffect(() => {
    if (!filters.hasLoadedStorage)
      return;
    const queryFromFilters = transformFiltersToQuery(filters, bobjectType, bobjectFields);
    let subqueryFromFilters;
    if (Object.prototype.hasOwnProperty.call(filters, "ORs")) {
      subqueryFromFilters = transformFiltersToQuery(filters["ORs"], bobjectType, bobjectFields);
    }
    onQueryChange({
      query: queryFromFilters,
      subquery: subqueryFromFilters
    });
  }, [filters]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: Children.map(children, (child, index) => {
      return React.cloneElement(child);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 104,
    columnNumber: 5
  }, void 0);
};
_s(Filters, "/unOJr3NIXeR2qQzy61SyQJGfBc=", false, function() {
  return [useFilters];
});
_c = Filters;
export default _c2 = withProvider(Filters);
var _c, _c2;
$RefreshReg$(_c, "Filters");
$RefreshReg$(_c2, "%default%");
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
