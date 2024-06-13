import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-usePlaybookFeed.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/usePlaybookFeed.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/usePlaybookFeed.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"];
import { useQualifyingQuestions } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const PlaybookFeedContext = React.createContext(null);
const PlaybookFeedProvider = ({
  props,
  children
}) => {
  _s();
  const QQsHandling = useQualifyingQuestions({
    enabled: true,
    stage: props.stage,
    segmentationValues: props.segmentationValues,
    bobjectType: props.activeBobject?.id?.typeName
  });
  const [searchValue, setSearchValue] = useState();
  return /* @__PURE__ */ _jsxDEV(PlaybookFeedContext.Provider, {
    value: {
      searchValue,
      setSearchValue,
      ...QQsHandling,
      ...props
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
_s(PlaybookFeedProvider, "R82yQMzaVcR381lVZ0g158yguaY=", false, function() {
  return [useQualifyingQuestions];
});
_c = PlaybookFeedProvider;
const usePlaybookFeed = () => {
  _s2();
  const context = React.useContext(PlaybookFeedContext);
  if (context === void 0) {
    throw new Error("useSubhomeFilters must be used within a SubhomeFiltersProvider");
  }
  return context;
};
_s2(usePlaybookFeed, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
export { PlaybookFeedProvider, usePlaybookFeed };
var _c;
$RefreshReg$(_c, "PlaybookFeedProvider");
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
