import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-searchBobjects-searchBobjects.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/searchBobjects/searchBobjects.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/searchBobjects/searchBobjects.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Dropdown, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSearchBobjects, useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { BobjectItemCompressed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItemCompressed-bobjectItemCompressed.tsx.js";
import { NoResultsFound } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectSelector-components-noResultsFound-noResultsFound.tsx.js";
import { NoSearchYetMessage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectSelector-components-noSearchYetMessage-noSearchYetMessage.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-searchBobjects-searchBobjects.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SearchBobjects = ({
  accountId,
  onChange,
  anchorElement,
  children,
  hiddenDropdown = false,
  customStyles,
  isBubbleHomePage = false,
  search,
  forceOpen = false,
  setForceOpen,
  numberOfResults = 1e3
}) => {
  _s();
  const [searchValue, setSearchValue] = useState();
  const {
    visible,
    setVisible,
    ref
  } = useVisible();
  const isB2CAccount = useIsB2CAccount();
  useEffect(() => {
    if (search) {
      setSearchValue(search);
    }
  }, [search]);
  useEffect(() => {
    if (forceOpen)
      setVisible(true);
  }, [forceOpen]);
  useEffect(() => {
    if (!visible)
      setForceOpen?.(false);
  }, [visible]);
  const handleChange = (bobject) => {
    onChange(bobject);
    setVisible(false);
  };
  const {
    results,
    totalMatching
  } = useSearchBobjects({
    searchValue,
    accountId,
    callback: () => setVisible(true),
    numberOfResults,
    bobjectTypes: isB2CAccount ? [BobjectTypes.Lead, BobjectTypes.Opportunity] : [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity]
  });
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    width: "100%",
    arrow: false,
    ref,
    visible: visible && !hiddenDropdown,
    zIndex: 2e4,
    anchor: anchorElement(setSearchValue, searchValue),
    customStyles,
    children: children ? children(results, totalMatching) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.content,
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.results,
        children: results ? results?.length > 0 ? /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: results?.map((result) => /* @__PURE__ */ _jsxDEV(BobjectItemCompressed, {
            bobject: {
              ...result,
              url: null
            },
            handleCompanyClicked: () => {
            },
            handleClick: (bobject) => {
              handleChange(bobject);
            }
          }, result?.rawBobject?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 89,
            columnNumber: 21
          }, void 0))
        }, void 0, false) : /* @__PURE__ */ _jsxDEV(NoResultsFound, {
          searchTerm: searchValue
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 17
        }, void 0) : /* @__PURE__ */ _jsxDEV(NoSearchYetMessage, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 103,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 71,
    columnNumber: 5
  }, void 0);
};
_s(SearchBobjects, "9UYTwc37S2LDbeJJmKKdMMsdI/E=", false, function() {
  return [useVisible, useIsB2CAccount, useSearchBobjects];
});
_c = SearchBobjects;
var _c;
$RefreshReg$(_c, "SearchBobjects");
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
