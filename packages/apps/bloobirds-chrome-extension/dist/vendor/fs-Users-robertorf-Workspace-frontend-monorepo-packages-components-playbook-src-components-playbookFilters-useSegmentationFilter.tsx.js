import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-useSegmentationFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/useSegmentationFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/useSegmentationFilter.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"];
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SegmentationFilterContext = createContext(null);
export const SegmentationFilterProvider = ({
  children,
  filterValues,
  shouldShowBattlecards,
  shouldShowVisibilityFilters,
  stage,
  defaultStage,
  setFiltersContext,
  visibilityFilters,
  isSmartEmail
}) => {
  function removeLabelValue(valueToRemove, segmentationField) {
    const filteredValues = filterValues[segmentationField.id].filter((value) => value !== valueToRemove);
    const newSegmentation = filteredValues && Object.keys(filterValues).reduce((acc, key) => {
      const isFilteredKeyEmpty = key === segmentationField.id && filteredValues.length === 0;
      return {
        ...acc,
        ...isFilteredKeyEmpty ? {} : {
          [key]: key === segmentationField.id ? filteredValues : filterValues[key]
        }
      };
    }, {});
    setFiltersContext({
      segmentationData: newSegmentation,
      stage,
      visibilityFilters,
      shouldShowBattlecards,
      shouldShowVisibilityFilters
    });
  }
  function clearBlock(blockId) {
    const newValue = filterValues && Object.keys(filterValues).reduce((acc, key) => {
      if (blockId !== key) {
        acc[key] = filterValues[key];
      }
      return acc;
    }, {});
    setFiltersContext({
      segmentationData: newValue,
      stage,
      visibilityFilters,
      shouldShowBattlecards,
      shouldShowVisibilityFilters
    });
  }
  return /* @__PURE__ */ _jsxDEV(SegmentationFilterContext.Provider, {
    value: {
      stageSelector: [stage, (value) => {
        setFiltersContext({
          segmentationData: filterValues,
          stage: value,
          visibilityFilters,
          shouldShowBattlecards,
          shouldShowVisibilityFilters
        });
      }],
      selectedSegmentation: filterValues,
      setSelectedSegmentation: (value) => {
        setFiltersContext({
          stage,
          segmentationData: value,
          shouldShowBattlecards,
          visibilityFilters,
          shouldShowVisibilityFilters
        });
      },
      visibilityFilters,
      setVisibilityFilters: (value) => {
        setFiltersContext({
          stage,
          segmentationData: filterValues,
          shouldShowBattlecards,
          shouldShowVisibilityFilters,
          visibilityFilters: {
            ...visibilityFilters,
            ...value
          }
        });
      },
      removeLabelValue,
      clearBlock,
      isSmartEmail,
      shouldShowBattlecards,
      shouldShowVisibilityFilters,
      defaultStage
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 100,
    columnNumber: 5
  }, void 0);
};
_c = SegmentationFilterProvider;
export const useSegmentationFilter = () => {
  _s();
  const context = useContext(SegmentationFilterContext);
  if (context === void 0) {
    throw new Error("useInactiveHandlingModal must be used within the modal provider");
  }
  return context;
};
_s(useSegmentationFilter, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "SegmentationFilterProvider");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
