import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-relativeDateFilter-relativeDateFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/relativeDateFilter/relativeDateFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/relativeDateFilter/relativeDateFilter.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { RelativeDatePicker } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMediaQuery } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { getBobjectFromLogicRole, isObject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-hooks-index.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-relativeDateFilter-relativeDateFilter.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const RelativeDateFilter = ({
  fieldLR
}) => {
  _s();
  const {
    getFilterValue,
    setFilter
  } = useFilters();
  const {
    isSmallDesktop
  } = useMediaQuery();
  const {
    t
  } = useTranslation();
  const handleOnChange = (value) => {
    setFilter(getBobjectFromLogicRole(fieldLR), fieldLR, value);
  };
  const filterValue = getFilterValue(fieldLR);
  let parsedFilterValue;
  if (isObject(filterValue)) {
    parsedFilterValue = {
      type: "custom",
      start: new Date(filterValue?.value?.start),
      end: new Date(filterValue?.value?.end)
    };
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filter_relative_date,
    children: /* @__PURE__ */ _jsxDEV(RelativeDatePicker, {
      width: isSmallDesktop ? "80" : "150",
      value: parsedFilterValue,
      onChange: handleOnChange,
      placeholder: t("common.creationDate"),
      size: "small",
      t: (key) => t(`leftBar.dateFilter.${key}`)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, void 0);
};
_s(RelativeDateFilter, "W0hHRSf7o8LTf8Mppwc7Zt9S0vc=", false, function() {
  return [useFilters, useMediaQuery, useTranslation];
});
_c = RelativeDateFilter;
export default RelativeDateFilter;
var _c;
$RefreshReg$(_c, "RelativeDateFilter");
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
