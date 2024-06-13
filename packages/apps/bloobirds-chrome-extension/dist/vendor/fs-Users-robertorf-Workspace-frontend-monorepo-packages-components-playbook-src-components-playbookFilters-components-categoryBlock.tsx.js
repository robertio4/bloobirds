import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-categoryBlock.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/categoryBlock.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/categoryBlock.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CheckItem, IconButton, MultiSelect, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-segmentationFilter.module.css.js";
import { useSegmentationFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-useSegmentationFilter.tsx.js";
import { ActiveFiltersLabelBlock } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-activeFiltersLabels.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CategoryBlock = ({
  segmentationField: {
    id: sectionId,
    name: sectionName,
    values: sectionValues
  },
  selectedValues,
  segmentationField,
  onChange
}) => {
  _s();
  const {
    clearBlock,
    isSmartEmail
  } = useSegmentationFilter();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.segmentationFilter"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.categoryBlock,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.blockHeader,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        children: sectionName
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 9
      }, void 0), selectedValues?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.clearLabel,
        onClick: () => {
          clearBlock(sectionId);
        },
        children: [/* @__PURE__ */ _jsxDEV(IconButton, {
          name: "cross",
          size: 14,
          color: "purple"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xxs",
          color: "purple",
          children: t("clearButton")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.selectorMultiselect,
      children: /* @__PURE__ */ _jsxDEV(MultiSelect, {
        dropdownProps: {
          zIndex: 2e4
        },
        size: "small",
        value: selectedValues ? selectedValues : [],
        width: isSmartEmail ? "356px" : "100%",
        renderDisplayValue: () => selectedValues?.length === 0 || !selectedValues ? t("selectedValue", {
          sectionName
        }) : t("multipleSelectedValues", {
          count: selectedValues?.length ?? 0
        }),
        onChange,
        selectAllOption: true,
        autocomplete: true,
        children: sectionValues.map((value) => {
          return React.cloneElement(/* @__PURE__ */ _jsxDEV(CheckItem, {
            value: value.id,
            label: value.name,
            children: value.name
          }, value.id, false, {
            fileName: _jsxFileName,
            lineNumber: 54,
            columnNumber: 15
          }, void 0), {
            checked: selectedValues?.includes(value.id) && false
          });
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, void 0), selectedValues?.length > 0 && /* @__PURE__ */ _jsxDEV(ActiveFiltersLabelBlock, {
      segmentationField,
      selectedValues,
      sectionValues
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 5
  }, void 0);
};
_s(CategoryBlock, "oA9xNW0H5eLXrLJDPyIEZlFgVQY=", false, function() {
  return [useSegmentationFilter, useTranslation];
});
_c = CategoryBlock;
var _c;
$RefreshReg$(_c, "CategoryBlock");
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
