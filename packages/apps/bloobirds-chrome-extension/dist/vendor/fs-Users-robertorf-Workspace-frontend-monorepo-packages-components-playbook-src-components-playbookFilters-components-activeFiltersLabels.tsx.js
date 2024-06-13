import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-components-activeFiltersLabels.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/activeFiltersLabels.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFilters/components/activeFiltersLabels.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { IconButton, Label, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-segmentationFilter.module.css.js";
import { useSegmentationFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFilters-useSegmentationFilter.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ActiveFilterLabel = ({
  removeLabel,
  selectedValue: {
    id,
    name
  }
}) => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.filterLabel,
  children: /* @__PURE__ */ _jsxDEV(Label, {
    value: id,
    color: "verySoftPurple",
    uppercase: false,
    size: "small",
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      color: "purple",
      size: "xs",
      weight: "medium",
      className: styles.filterLabelText,
      children: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
      color: "peanut",
      name: "cross",
      onClick: removeLabel
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, void 0)]
  }, id, true, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 9,
  columnNumber: 3
}, void 0);
_c = ActiveFilterLabel;
export const ActiveFiltersLabelBlock = ({
  segmentationField,
  sectionValues,
  selectedValues
}) => {
  _s();
  const [showMore, setShowMore] = useState(false);
  const [elementHeight, setElementHeight] = useState();
  const {
    removeLabelValue
  } = useSegmentationFilter();
  const getElementHeight = () => document.getElementById(`filterBlockWapper${segmentationField.id}`)?.offsetHeight;
  useEffect(() => {
    setElementHeight(getElementHeight());
  }, [selectedValues.length]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.activeFilterLabelWrapperMask,
      style: {
        maxHeight: !showMore && "112px"
      },
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.activeFilterLabelWrapper,
        id: `filterBlockWapper${segmentationField.id}`,
        children: selectedValues?.map((selectedValue) => {
          const {
            id,
            name
          } = sectionValues.find((value) => value.id === selectedValue) || {};
          return /* @__PURE__ */ _jsxDEV(ActiveFilterLabel, {
            selectedValue: {
              id,
              name
            },
            removeLabel: () => removeLabelValue(id, segmentationField)
          }, id, false, {
            fileName: _jsxFileName,
            lineNumber: 42,
            columnNumber: 15
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }, void 0), !showMore && elementHeight > 112 && /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "more",
      color: "purple",
      onClick: () => {
        setShowMore(!showMore);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(ActiveFiltersLabelBlock, "Ryn62021KB+6YNvk9LPe22alyH4=", false, function() {
  return [useSegmentationFilter];
});
_c2 = ActiveFiltersLabelBlock;
var _c, _c2;
$RefreshReg$(_c, "ActiveFilterLabel");
$RefreshReg$(_c2, "ActiveFiltersLabelBlock");
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
