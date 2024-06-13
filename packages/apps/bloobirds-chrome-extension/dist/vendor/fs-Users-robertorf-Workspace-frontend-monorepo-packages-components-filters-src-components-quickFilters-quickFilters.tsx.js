import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-quickFilters-quickFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/quickFilters/quickFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/quickFilters/quickFilters.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useSessionStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import CustomQuickFilter from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-quickFilters-quickFilter-quickFilter.tsx.js";
import { useFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-hooks-useFilters.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const QuickFilters = ({
  onToggleSelected
}) => {
  _s();
  const {
    key,
    selectedQuickFilter,
    removeSelectedQuickFilter,
    setSelectedQuickFilter,
    defaultQuickFilters
  } = useFilters();
  const quickFilters = defaultQuickFilters;
  const {
    stored
  } = useSessionStorage();
  const applyQuickFilter = (quickFilter, status) => {
    if (status) {
      setSelectedQuickFilter(quickFilter);
    } else {
      removeSelectedQuickFilter(quickFilter);
    }
  };
  useEffect(() => {
    if (quickFilters && !selectedQuickFilter && stored && !stored[key] && key) {
      const defaultQuickFilter = quickFilters.find((filter) => filter?.defaultGroup);
      setSelectedQuickFilter(defaultQuickFilter);
    } else {
      setSelectedQuickFilter(void 0);
    }
  }, [key]);
  useEffect(() => {
    onToggleSelected?.(selectedQuickFilter);
  }, [selectedQuickFilter]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: quickFilters?.length ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: quickFilters.map((quickFilter) => /* @__PURE__ */ _jsxDEV(CustomQuickFilter, {
        quickFilter,
        onApply: applyQuickFilter,
        isSelected: selectedQuickFilter?.id === quickFilter?.id
      }, `quick-filter-${quickFilter?.id}`, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 13
      }, void 0))
    }, void 0, false) : null
  }, void 0, false);
};
_s(QuickFilters, "9tYjjM1ZSARHCoIfUnk8IikbkMs=", false, function() {
  return [useFilters, useSessionStorage];
});
_c = QuickFilters;
export default QuickFilters;
var _c;
$RefreshReg$(_c, "QuickFilters");
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
