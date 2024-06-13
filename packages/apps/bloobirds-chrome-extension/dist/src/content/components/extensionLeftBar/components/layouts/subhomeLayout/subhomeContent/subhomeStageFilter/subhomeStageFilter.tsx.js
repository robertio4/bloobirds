import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeStageFilter/subhomeStageFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeStageFilter/subhomeStageFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeStageFilter/subhomeStageFilter.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useFilters } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { Item, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SubhomeStageFilter = () => {
  _s();
  const {
    stage,
    setStage
  } = useSubhomeContext();
  const {
    setHaveFiltersBeenChanged
  } = useFilters();
  const {
    t
  } = useTranslation();
  const updateStage = (stage2) => {
    setHaveFiltersBeenChanged(true);
    setStage(stage2);
  };
  return /* @__PURE__ */ _jsxDEV(Select, {
    size: "small",
    onChange: updateStage,
    value: stage,
    borderless: false,
    placeholder: t("leftBar.filters.stages"),
    variant: "filters",
    children: [/* @__PURE__ */ _jsxDEV(Item, {
      value: "ALL",
      children: t("common.all")
    }, "home-left-stage-all", false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
      value: "PROSPECT",
      children: t("common.prospecting")
    }, "home-left-stage-prospecting", false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
      value: "SALES",
      children: t("common.sales")
    }, "home-left-stage-sales", false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
_s(SubhomeStageFilter, "ZRNR3CPg6ErEacYIt4FTThrs+OY=", false, function() {
  return [useSubhomeContext, useFilters, useTranslation];
});
_c = SubhomeStageFilter;
var _c;
$RefreshReg$(_c, "SubhomeStageFilter");
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
