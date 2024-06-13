import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-visibilityFiltersGroup.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/visibilityFiltersGroup.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/visibilityFiltersGroup.tsx", _s = $RefreshSig$();
import { useSegmentationFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-useSegmentationFilter.tsx.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-segmentationFilter.module.css.js";
import { Checkbox } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const VisibilityFiltersGroup = () => {
  _s();
  const {
    visibilityFilters,
    setVisibilityFilters,
    isSmartEmail,
    shouldShowBattlecards
  } = useSegmentationFilter();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.filterGroup, {
      [styles.smartFilterGroup]: isSmartEmail
    }),
    children: [/* @__PURE__ */ _jsxDEV(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters?.onlyMine,
      onClick: (value) => setVisibilityFilters({
        ...visibilityFilters,
        onlyMine: value
      }),
      children: t("playbook.segmentationFilter.onlyMine")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters?.onlyPrivate,
      onClick: (value) => setVisibilityFilters({
        ...visibilityFilters,
        onlyPrivate: value
      }),
      children: t("playbook.segmentationFilter.onlyPrivate")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters?.onlyOfficial,
      onClick: (value) => setVisibilityFilters({
        ...visibilityFilters,
        onlyOfficial: value
      }),
      children: t("playbook.segmentationFilter.onlyOfficial")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }, void 0), shouldShowBattlecards && /* @__PURE__ */ _jsxDEV(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters?.onlyBattlecards,
      onClick: (value) => setVisibilityFilters({
        ...visibilityFilters,
        onlyBattlecards: value
      }),
      children: t("playbook.segmentationFilter.onlyBattlecards")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, void 0);
};
_s(VisibilityFiltersGroup, "tsMGWP4oUt3QlgV7BPGVkQXPuv8=", false, function() {
  return [useSegmentationFilter, useTranslation];
});
_c = VisibilityFiltersGroup;
var _c;
$RefreshReg$(_c, "VisibilityFiltersGroup");
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
