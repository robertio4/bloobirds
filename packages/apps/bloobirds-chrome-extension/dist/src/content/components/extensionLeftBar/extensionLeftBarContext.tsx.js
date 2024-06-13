import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport3_mixpanelBrowser.__esModule ? __vite__cjsImport3_mixpanelBrowser.default : __vite__cjsImport3_mixpanelBrowser;
import { usePipelineGlobalAggregation } from "/src/content/components/extensionLeftBar/components/views/pipelineView/hooks/usePipelineTab.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ExtensionLeftBarContext = React.createContext(null);
function ExtensionLeftBarProvider({
  children
}) {
  _s();
  const [currentTab, setCurrentTab] = useState();
  const [currentSubTab, setCurrentSubTab] = useState();
  const [isCollapsedLeftBar, setIsCollapsedLeftBar] = useState(false);
  const [displayLeftBarTooltip, setDisplayLeftBarTooltip] = useState(false);
  const {
    pipelineCounters,
    pipelineLastVisitDates,
    updateLastVisitedPipeline
  } = usePipelineGlobalAggregation();
  return /* @__PURE__ */ _jsxDEV(ExtensionLeftBarContext.Provider, {
    value: {
      currentTab,
      setCurrentTab: (value) => {
        if (value) {
          mixpanel.track(`LEFT_BAR_TAB_CLICKED_${value.toUpperCase()}`);
        }
        setCurrentTab(value);
      },
      currentSubTab,
      setCurrentSubTab,
      isCollapsedLeftBar,
      setIsCollapsedLeftBar,
      collapseLeftBar: () => {
        setIsCollapsedLeftBar(true);
        setCurrentTab(null);
        setCurrentSubTab(null);
      },
      pipelineCounters,
      updateLastVisitedPipeline,
      pipelineLastVisitDates,
      displayLeftBarTooltip,
      setDisplayLeftBarTooltip
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
_s(ExtensionLeftBarProvider, "9Wn6k+EOikIwJcWEd1U5BI3XMPU=", false, function() {
  return [usePipelineGlobalAggregation];
});
_c = ExtensionLeftBarProvider;
function useExtensionLeftBarContext() {
  _s2();
  const context = React.useContext(ExtensionLeftBarContext);
  if (context === void 0) {
    throw new Error("useExtensionLeftBarContext must be used within a ExtensionLeftBarProvider");
  }
  return context;
}
_s2(useExtensionLeftBarContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
export { ExtensionLeftBarProvider, useExtensionLeftBarContext };
var _c;
$RefreshReg$(_c, "ExtensionLeftBarProvider");
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
