import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-stageSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/stageSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/stageSelector.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Item, Select } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MessagesEvents, TemplateStage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-segmentationFilter.module.css.js";
import { useSegmentationFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-useSegmentationFilter.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const StageSelector = () => {
  _s();
  const {
    stageSelector: [stage, setSelectedStage],
    isSmartEmail,
    defaultStage
  } = useSegmentationFilter();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.segmentationFilter"
  });
  const updateStage = (stage2) => {
    setSelectedStage(stage2);
    window.dispatchEvent(new CustomEvent(MessagesEvents.PlaybookFeed));
  };
  const renderStage = (stage2) => {
    switch (stage2) {
      case TemplateStage.All:
        return t("prospectAndSalesStages");
      case TemplateStage.Prospecting:
        return t("prospectStage");
      case TemplateStage.Sales:
        return t("salesStage");
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.stageSelector, {
      [styles.smartStageSelector]: isSmartEmail
    }),
    children: /* @__PURE__ */ _jsxDEV(Select, {
      size: "small",
      placeholder: t("stage"),
      width: "100%",
      borderless: false,
      renderDisplayValue: renderStage,
      onChange: updateStage,
      value: stage ? stage : defaultStage,
      children: [/* @__PURE__ */ _jsxDEV(Item, {
        value: TemplateStage.All,
        children: t("all")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: TemplateStage.Prospecting,
        children: t("prospectStage")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
        value: TemplateStage.Sales,
        children: t("salesStage")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, void 0);
};
_s(StageSelector, "SNX7vlZ5OJQ4PoSy6M9XOeNiqf0=", false, function() {
  return [useSegmentationFilter, useTranslation];
});
_c = StageSelector;
var _c;
$RefreshReg$(_c, "StageSelector");
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
