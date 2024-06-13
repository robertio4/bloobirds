import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/filters/components/customChipGroup.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/filters/components/customChipGroup.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/filters/components/customChipGroup.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/src/content/components/extensionLeftBar/components/views/newTasksView/filters/components/customChipGroup.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const Chip = ({
  selected,
  onClick,
  children
}) => {
  const classes = clsx(styles._chip, {
    [styles._selected]: selected
  });
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && "color" in child.props && selected) {
      return React.cloneElement(child, {
        color: "white"
      });
    }
    return child;
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classes,
    onClick,
    children: modifiedChildren
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, void 0);
};
_c = Chip;
const CustomChipGroup = ({
  onChange,
  children,
  value,
  hiddenValues
}) => {
  _s();
  const [selectedChips, setSelectedChips] = useState(value);
  const {
    t
  } = useTranslation();
  const handleChipClick = (value2) => {
    if (selectedChips.length === React.Children.count(children)) {
      setSelectedChips([value2]);
    } else if (selectedChips.includes(value2)) {
      const newClusters = selectedChips.filter((chip) => chip !== value2);
      if (newClusters.length === 0) {
        setSelectedChips(Array.isArray(value2) ? value2 : [value2]);
      } else {
        setSelectedChips(newClusters);
      }
    } else {
      setSelectedChips([...selectedChips, value2]);
    }
  };
  const handleAllClick = () => {
    setSelectedChips(React.Children.map(children, (child) => child.props.value));
  };
  useEffect(() => {
    onChange(selectedChips);
  }, [selectedChips]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._chipGroup,
    children: [/* @__PURE__ */ _jsxDEV(Chip, {
      value: "all",
      selected: selectedChips.length === React.Children.count(children),
      onClick: handleAllClick,
      children: t("common.all")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }, void 0), React.Children.map(children, (child) => {
      if (!hiddenValues || !hiddenValues.includes(child.props.value)) {
        return React.cloneElement(child, {
          selected: selectedChips.includes(child.props.value) && selectedChips.length !== React.Children.count(children),
          onClick: () => handleChipClick(child.props.value)
        });
      } else {
        return null;
      }
    })]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 54,
    columnNumber: 5
  }, void 0);
};
_s(CustomChipGroup, "TsLOJGxVjRgH4QtsTLba314XHSc=", false, function() {
  return [useTranslation];
});
_c2 = CustomChipGroup;
export { CustomChipGroup, Chip };
var _c, _c2;
$RefreshReg$(_c, "Chip");
$RefreshReg$(_c2, "CustomChipGroup");
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
