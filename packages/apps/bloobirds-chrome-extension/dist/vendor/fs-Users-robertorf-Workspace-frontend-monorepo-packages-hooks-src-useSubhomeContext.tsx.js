import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useSubhomeContext.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/hooks/src/useSubhomeContext.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/hooks/src/useSubhomeContext.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"];
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SubhomeContext = React.createContext(null);
function SubhomePageProvider({
  children,
  parentRef
}) {
  _s();
  const [haveFiltersBeenChanged, setHaveFiltersBeenChanged] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAllChecked, setSelectAllCheckedState] = useState(false);
  const selectOneItem = (item) => {
    const exists = selectedItems.some((selectedItem) => selectedItem?.id.objectId === item?.id.objectId);
    let newSelectedItems = [...selectedItems];
    if (exists) {
      newSelectedItems = newSelectedItems.filter((selectedItem) => selectedItem?.id.objectId !== item?.id.objectId);
    } else {
      newSelectedItems = [...newSelectedItems, item];
    }
    setSelectedItems(newSelectedItems);
  };
  return /* @__PURE__ */ _jsxDEV(SubhomeContext.Provider, {
    value: {
      haveFiltersBeenChanged,
      setHaveFiltersBeenChanged,
      selectOneItem,
      selectedItems,
      setSelectedItems,
      isSelectAllChecked,
      toggleSelectAll: (value) => {
        setSelectAllCheckedState(value);
      },
      parentRef
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 5
  }, this);
}
_s(SubhomePageProvider, "iH3B01cKfxxPauUo41/Jvvk+Wmo=");
_c = SubhomePageProvider;
function useSubhomeContext() {
  _s2();
  const context = React.useContext(SubhomeContext);
  if (context === void 0) {
    throw new Error("useSubhomeContext must be used within a SubhomeContextProvider");
  }
  return context;
}
_s2(useSubhomeContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
export { SubhomePageProvider, useSubhomeContext };
var _c;
$RefreshReg$(_c, "SubhomePageProvider");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
