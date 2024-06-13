import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-segmentationFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/segmentationFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/segmentationFilter.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { TemplateStage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { baseUrls } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { CategoryBlock } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-categoryBlock.tsx.js";
import { StageSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-stageSelector.tsx.js";
import { VisibilityFiltersGroup } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-visibilityFiltersGroup.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-segmentationFilter.module.css.js";
import { SegmentationFilterProvider, useSegmentationFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-useSegmentationFilter.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const withProvider = (Component) => ({
  ...props
}) => {
  return /* @__PURE__ */ _jsxDEV(SegmentationFilterProvider, {
    ...props,
    children: /* @__PURE__ */ _jsxDEV(Component, {
      ...props
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 46,
    columnNumber: 5
  }, void 0);
};
const SegmentationFiltersView = ({
  segmentationFields,
  isSalesEnabled
}) => {
  _s();
  const {
    selectedSegmentation,
    setSelectedSegmentation,
    isSmartEmail,
    shouldShowVisibilityFilters
  } = useSegmentationFilter();
  const {
    t
  } = useTranslation();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.wrapper,
    children: [shouldShowVisibilityFilters && /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles.header, {
          [styles.smartHeader]: isSmartEmail
        }),
        children: /* @__PURE__ */ _jsxDEV(Text, {
          weight: "bold",
          children: t("playbook.segmentationFilter.segmentationAndFilters")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(VisibilityFiltersGroup, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 11
      }, void 0)]
    }, void 0, true), /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.segmentationHeader, {
        [styles.smartSegmentationHeader]: isSmartEmail
      }),
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        weight: "bold",
        size: shouldShowVisibilityFilters ? "s" : "l",
        children: t("playbook.segmentationFilter.segmentation")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "settings",
        color: "purple",
        onClick: () => window.open(`${baseUrls["development"]}/app/playbook/messaging-segmentation`, "_blank")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }, void 0), isSalesEnabled && !isNoStatusPlanAccount && /* @__PURE__ */ _jsxDEV(StageSelector, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 52
    }, void 0), [{
      stage: TemplateStage.Prospecting,
      key: "playbook.segmentationFilter.prospect"
    }, {
      stage: TemplateStage.Sales,
      key: "playbook.segmentationFilter.sales"
    }].map(({
      stage,
      key
    }) => segmentationFields?.[stage]?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.selectorsWrapper, {
        [styles.smartSelectorsWrapper]: isSmartEmail
      }),
      children: [!isNoStatusPlanAccount && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "purple",
        weight: "bold",
        className: styles.segmentationTitle,
        children: t(key)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 17
      }, void 0), segmentationFields?.[stage]?.map((segmentation) => /* @__PURE__ */ _jsxDEV(CategoryBlock, {
        segmentationField: segmentation,
        selectedValues: selectedSegmentation?.[segmentation.id],
        onChange: (value) => setSelectedSegmentation({
          ...selectedSegmentation,
          ...value?.length > 0 ? {
            [segmentation.id]: value
          } : {}
        })
      }, segmentation.id, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 17
      }, void 0))]
    }, stage, true, {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 13
    }, void 0))]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 63,
    columnNumber: 5
  }, void 0);
};
_s(SegmentationFiltersView, "JjpBK+ClSKAHSdP0nixxp64IHic=", false, function() {
  return [useSegmentationFilter, useTranslation, useIsNoStatusPlanAccount];
});
_c = SegmentationFiltersView;
export const SegmentationFilter = withProvider(SegmentationFiltersView);
_c2 = SegmentationFilter;
var _c, _c2;
$RefreshReg$(_c, "SegmentationFiltersView");
$RefreshReg$(_c2, "SegmentationFilter");
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
