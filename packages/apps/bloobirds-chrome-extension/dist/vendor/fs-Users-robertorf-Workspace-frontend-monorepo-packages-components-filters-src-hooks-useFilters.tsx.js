import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-hooks-useFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/hooks/useFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/hooks/useFilters.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useSessionStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getBobjectFromLogicRole, isEqual, mergeTwoObjects } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport6_lodash_isEmpty from "/vendor/.vite-deps-lodash_isEmpty.js__v--1143220c.js"; const isEmpty = __vite__cjsImport6_lodash_isEmpty.__esModule ? __vite__cjsImport6_lodash_isEmpty.default : __vite__cjsImport6_lodash_isEmpty;
import __vite__cjsImport7_lodash_isObject from "/vendor/.vite-deps-lodash_isObject.js__v--2eabab46.js"; const isObject = __vite__cjsImport7_lodash_isObject.__esModule ? __vite__cjsImport7_lodash_isObject.default : __vite__cjsImport7_lodash_isObject;
import { parseFilterRelativeDateValue, removeFiltersById, resetFiltersByBobjectType, transformFilterBobjectTypeToORsState, transformFilterStateToFilter, transformFiltersToFiltersState, transformMoreFiltersToFilters, transformQuickFiltersToFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-utils-filters.utils.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const FiltersContext = createContext(null);
const defaultStructure = () => ({
  Company: {},
  Lead: {},
  Opportunity: {},
  Task: {},
  Activity: {},
  conditions: {},
  hasLoadedStorage: false
});
const FiltersProvider = ({
  setSubqueryBobjectType,
  children,
  bobjectFields,
  defaultQuickFilters
}) => {
  _s();
  const [haveFiltersBeenChanged, setHaveFiltersBeenChanged] = useState(false);
  const [bobjectType, setBobjectType] = useState(BobjectTypes.Company);
  const [key, setKey] = useState();
  const {
    get,
    set,
    remove
  } = useSessionStorage();
  const [defaultFilters, setDefaultFilters] = useState(defaultStructure());
  const [filters, setFilters] = useState(defaultStructure());
  const [selectedQuickFilter, setSelectedQuickFilter] = useState();
  useEffect(() => {
    if (selectedQuickFilter?.filters) {
      setQuickFilter(selectedQuickFilter);
    }
  }, [selectedQuickFilter]);
  useEffect(() => {
    if (key) {
      const storedFilters = get(key);
      set(key, {
        ...storedFilters,
        quickFilter: selectedQuickFilter
      });
    }
  }, [selectedQuickFilter]);
  useEffect(() => {
    if (key) {
      const sessionFilters = get(key);
      const savedFilters = sessionFilters?.filters;
      const savedQuickFilter = sessionFilters?.quickFilter;
      if (savedQuickFilter) {
        setSelectedQuickFilter(savedQuickFilter);
      }
      const parsedQuickFilters = savedQuickFilter && transformQuickFiltersToFilters(savedQuickFilter?.filters || [], bobjectFields);
      const aggregatedSessionStorageFilters = mergeTwoObjects(savedFilters, parsedQuickFilters);
      setHaveFiltersBeenChanged(savedFilters && !isEqual(savedFilters, defaultFilters) || savedQuickFilter);
      let mergedFilters;
      if (savedQuickFilter) {
        if (savedQuickFilter.type === "ORs") {
          mergedFilters = {
            ...filters,
            ORs: parsedQuickFilters
          };
        } else {
          mergedFilters = mergeTwoObjects(defaultFilters, aggregatedSessionStorageFilters);
        }
      } else {
        mergedFilters = {
          ...defaultFilters,
          ...aggregatedSessionStorageFilters
        };
      }
      setFilters({
        ...mergedFilters,
        ...{
          hasLoadedStorage: true
        }
      });
    }
  }, [key]);
  const findFilterById = (filterId) => {
    let filter;
    Object.keys(filters).forEach((bobjectType2) => {
      if (filters[bobjectType2][filterId]) {
        filter = filters[bobjectType2][filterId];
      }
    });
    if (isObject(filter) && Array.isArray(filter?.query))
      filter = filter?.query;
    return filter;
  };
  const getFilterValue = (filterLR) => {
    if (filters) {
      const filterId = bobjectFields.findFieldByLogicRole(filterLR)?.id;
      const filterValue = findFilterById(filterId);
      return transformFilterStateToFilter(filterValue);
    }
    return "";
  };
  const removeSelectedQuickFilter = (quickFilter) => {
    let fieldIdsToRemove = quickFilter?.filters?.map((filter) => filter?.bobjectFieldId);
    if (quickFilter.type === "ORs") {
      fieldIdsToRemove = [Object.keys(filters["ORs"])[0]];
    }
    const cleanedFilters = removeFiltersById(filters, fieldIdsToRemove);
    const mergedFilters = mergeTwoObjects(defaultFilters, cleanedFilters);
    setFilters(mergedFilters);
    setSelectedQuickFilter(void 0);
  };
  const removeFilter = (fieldId) => {
    const cleanedFilters = removeFiltersById(filters, [fieldId]);
    setFilters(cleanedFilters);
    const storedFilters = get(key);
    set(key, {
      ...storedFilters,
      filters: cleanedFilters
    });
    if (isEqual(cleanedFilters, defaultFilters) || selectedQuickFilter)
      setHaveFiltersBeenChanged(false);
  };
  const setFilter = (filterBobjectType, fieldLR, filterValues, autoChanged = true) => {
    setHaveFiltersBeenChanged(autoChanged);
    const fieldId = bobjectFields?.findFieldByLogicRole(fieldLR)?.id;
    const isRemoveAction = !filterValues || Array.isArray(filterValues) && filterValues?.length === 0;
    if (isRemoveAction) {
      removeFilter(fieldId);
    } else {
      const transformedValue = transformFiltersToFiltersState(filterValues);
      if (transformedValue) {
        const aggregatedFilters = {
          ...filters,
          [filterBobjectType]: {
            ...filters[filterBobjectType],
            [fieldId]: transformedValue
          }
        };
        const oRsBobjectType = transformFilterBobjectTypeToORsState(filterBobjectType);
        if (typeof setSubqueryBobjectType === "function")
          setSubqueryBobjectType(oRsBobjectType);
        setFilters(aggregatedFilters);
        const {
          hasLoadedStorage,
          ...filtersForStorage
        } = aggregatedFilters;
        const storedFilters = get(key);
        set(key, {
          ...storedFilters,
          filters: filtersForStorage
        });
      }
    }
  };
  const setORsFilters = (id, value, filterBobjectType, filtersValues) => {
    setHaveFiltersBeenChanged(true);
    let aggregatedFilters = {
      ...filters
    };
    for (const {
      fieldLR,
      filterValues
    } of filtersValues) {
      const fieldId = bobjectFields?.findFieldByLogicRole(fieldLR)?.id;
      const isRemoveAction = !filterValues || Array.isArray(filterValues) && filterValues?.length === 0;
      if (isRemoveAction) {
        aggregatedFilters = removeFiltersById(aggregatedFilters, [fieldId]);
      } else {
        const transformedValue = transformFiltersToFiltersState(filterValues);
        if (transformedValue) {
          aggregatedFilters["ORs"] = {
            [filterBobjectType]: {
              ...aggregatedFilters["ORs"][filterBobjectType],
              [fieldId]: transformedValue
            }
          };
        }
      }
    }
    setFilters(aggregatedFilters);
  };
  const setFilterConditions = (key2, value) => {
    if (key2 === "relatedBobjectType")
      resetFilters(value);
  };
  const setDefaultFiltersValues = (fields) => {
    const tempFilters = {};
    for (const {
      fieldLR,
      defaultValue
    } of fields) {
      const bobjectType2 = getBobjectFromLogicRole(fieldLR);
      const fieldId = bobjectFields?.findFieldByLogicRole(fieldLR)?.id;
      const parsedDefaultValue = defaultValue?.start ? parseFilterRelativeDateValue(defaultValue) : defaultValue;
      tempFilters[bobjectType2] = {
        ...tempFilters[bobjectType2],
        [fieldId]: parsedDefaultValue
      };
    }
    const newDefaultFilters = {
      ...defaultStructure(),
      ...tempFilters
    };
    setDefaultFilters(newDefaultFilters);
    setFilters(newDefaultFilters);
  };
  const setMoreFilters = (moreFilters) => {
    const parsedMoreFilters = transformMoreFiltersToFilters(moreFilters, bobjectFields);
    const mergedFilters = mergeTwoObjects(defaultFilters, parsedMoreFilters);
    setFilters({
      ...isEmpty(parsedMoreFilters) ? defaultFilters : mergedFilters,
      hasLoadedStorage: true
    });
  };
  const setQuickFilter = (quickFilter) => {
    const parsedQuickFilters = transformQuickFiltersToFilters(quickFilter?.filters || [], bobjectFields);
    let mergedFilters;
    if (quickFilter.type === "ORs") {
      mergedFilters = {
        ...filters,
        ["ORs"]: parsedQuickFilters
      };
    } else {
      mergedFilters = mergeTwoObjects(filters, parsedQuickFilters);
    }
    setHaveFiltersBeenChanged(true);
    setFilters(mergedFilters);
  };
  const resetFilters = (bobjectType2) => {
    setHaveFiltersBeenChanged(false);
    setSelectedQuickFilter(null);
    if (typeof setSubqueryBobjectType === "function")
      setSubqueryBobjectType([]);
    if (bobjectType2) {
      const filtersToSet = resetFiltersByBobjectType(bobjectType2, filters);
      setFilters(filtersToSet);
    } else {
      setFilters({
        ...defaultFilters,
        ...{
          hasLoadedStorage: true
        }
      });
    }
    remove(key);
  };
  return /* @__PURE__ */ _jsxDEV(FiltersContext.Provider, {
    value: {
      bobjectType,
      filters,
      defaultFilters,
      haveFiltersBeenChanged,
      key,
      selectedQuickFilter,
      getFilterValue,
      removeFilter,
      removeSelectedQuickFilter,
      resetFilters,
      setBobjectType,
      setFilter,
      setORsFilters,
      setFilters,
      setHaveFiltersBeenChanged,
      setKey,
      setMoreFilters,
      setQuickFilter,
      setSelectedQuickFilter,
      setFilterConditions,
      setDefaultFiltersValues,
      setSubqueryBobjectType,
      defaultQuickFilters
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 348,
    columnNumber: 5
  }, void 0);
};
_s(FiltersProvider, "ojW9Jd9JydKXhRAQONiuMQWBmjA=", false, function() {
  return [useSessionStorage];
});
_c = FiltersProvider;
const useFilters = (bobjectType, key) => {
  _s2();
  const context = useContext(FiltersContext);
  if (context === void 0) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  useEffect(() => {
    if (context && bobjectType) {
      context.setBobjectType(bobjectType);
    }
  }, [context]);
  useEffect(() => {
    if (context && key) {
      context.setKey(key);
    }
  }, [key]);
  return context;
};
_s2(useFilters, "LH+0QL25+reXST9pi8Nhe127lCg=");
export { FiltersProvider, useFilters };
var _c;
$RefreshReg$(_c, "FiltersProvider");
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
