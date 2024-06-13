import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useCustomWizards.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/hooks/src/useCustomWizards.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/hooks/src/useCustomWizards.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"];
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ContactFlowWizardContext = createContext(null);
export const CustomWizardModalProvider = ({
  children,
  wizardsMap,
  ...props
}) => {
  return /* @__PURE__ */ _jsxDEV(ContactFlowWizardContext.Provider, {
    value: {
      ...props,
      wizardsMap
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, void 0);
};
_c = CustomWizardModalProvider;
const fetcher = (url) => api.get(`${url}`).then((response) => {
  return response?.data;
});
export const useCustomWizards = (accountId, hasCustomWizardsEnabled, source = "BOTH") => {
  _s();
  const {
    data: availableCustomWizards
  } = useSWR(hasCustomWizardsEnabled && `/utils/service/customWizard/` + accountId + "?source=" + source, fetcher);
  return {
    availableCustomWizards
  };
};
_s(useCustomWizards, "oj6PcReYORXf3fVns2WcddCaEGk=", false, function() {
  return [useSWR];
});
export const useContactFlowWizardContext = () => {
  _s2();
  const context = useContext(ContactFlowWizardContext);
  if (context === void 0) {
    throw new Error("useContactFlowWizardContext must be used within the modal provider");
  }
  return context;
};
_s2(useContactFlowWizardContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "CustomWizardModalProvider");
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
