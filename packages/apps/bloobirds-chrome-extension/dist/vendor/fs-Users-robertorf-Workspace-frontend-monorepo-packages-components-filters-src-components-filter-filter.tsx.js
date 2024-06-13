import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-filter-filter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/filter/filter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/filter/filter.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CheckItem, Item, MultiSelect, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { getBobjectFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport7_lodash_sortBy from "/vendor/.vite-deps-lodash_sortBy.js__v--db3f7ac0.js"; const sortBy = __vite__cjsImport7_lodash_sortBy.__esModule ? __vite__cjsImport7_lodash_sortBy.default : __vite__cjsImport7_lodash_sortBy;
import { useFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-hooks-index.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-filter.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const getItemProps = (fieldLR, value, isMultiselect, isAssignedTo, t) => {
  _s();
  let placeholder;
  if (Array.isArray(value) && isMultiselect) {
    value = value.filter((item) => item !== void 0);
  }
  const userId = useActiveUserId();
  if (isAssignedTo && (!value || value === userId || value?.[0] === userId)) {
    placeholder = t("leftBar.filters.me");
    value = [];
  }
  return {
    ...placeholder ? {
      placeholder
    } : {},
    value: value ?? (isMultiselect ? [] : "")
  };
};
_s(getItemProps, "y0VIO/jVOExQwUK8u5smajDxZ24=", false, function() {
  return [useActiveUserId];
});
const checkDisplayConditions = (showByDefault, conditions, strictConditions, filterConditions) => {
  const [field, value] = Object.entries(filterConditions)[0];
  if (showByDefault && !conditions[field])
    return true;
  if (strictConditions) {
    const selectedConditions = conditions[field];
    return selectedConditions?.length === 1 ? selectedConditions[0] === value : false;
  } else {
    return conditions[field] === value || conditions[field]?.includes(value);
  }
};
const Filter = ({
  fieldLR,
  placeholder,
  values,
  conditions: filterConditions,
  strictConditions = false,
  isMultiselect = false,
  showByDefault = false,
  options,
  fieldBySort = "value",
  sortDisabled = false
}) => {
  _s2();
  const {
    setFilter,
    getFilterValue,
    filters: {
      conditions
    }
  } = useFilters();
  const {
    t
  } = useTranslation();
  const bobjectType = getBobjectFromLogicRole(fieldLR);
  const value = getFilterValue(fieldLR);
  const isAssignedTo = fieldLR.includes("ASSIGNED") || fieldLR.includes("USER");
  const itemComponentsCreated = React.isValidElement(Array.isArray(values) && values[0]);
  const shouldBeDisplayed = !filterConditions || conditions && checkDisplayConditions(showByDefault, conditions, strictConditions, filterConditions);
  const itemProps = getItemProps(fieldLR, value, isMultiselect, isAssignedTo, t);
  const handleOnChange = (value2) => {
    setFilter(bobjectType, fieldLR, value2);
  };
  const getItems = () => {
    if (sortDisabled) {
      return values;
    }
    return sortBy(values, fieldBySort);
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filter_wrapper,
    children: shouldBeDisplayed ? isMultiselect ? /* @__PURE__ */ _jsxDEV(MultiSelect, {
      placeholder,
      value: value ?? [],
      onChange: handleOnChange,
      size: "small",
      variant: "filters",
      selectAllOption: true,
      allOptionLabel: t("common.all"),
      autocomplete: values?.length > 8,
      ...itemProps,
      ...options,
      children: itemComponentsCreated ? values : sortBy(values, fieldBySort)?.map((item) => /* @__PURE__ */ _jsxDEV(CheckItem, {
        value: item.id,
        children: item?.name ? item?.name : item?.value
      }, item.id, false, {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 19
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ _jsxDEV(Select, {
      size: "small",
      variant: "filters",
      placeholder,
      value: value ?? "",
      onChange: handleOnChange,
      autocomplete: values?.length > 8,
      ...options,
      children: itemComponentsCreated ? values : getItems()?.map((item) => /* @__PURE__ */ _jsxDEV(Item, {
        value: item.id,
        children: item.value || item?.name
      }, item.id, false, {
        fileName: _jsxFileName,
        lineNumber: 176,
        columnNumber: 19
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 140,
    columnNumber: 5
  }, void 0);
};
_s2(Filter, "5/psCqBA51K1yCAIrDAPlbqaLmA=", false, function() {
  return [useFilters, useTranslation];
});
_c = Filter;
export default Filter;
var _c;
$RefreshReg$(_c, "Filter");
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
