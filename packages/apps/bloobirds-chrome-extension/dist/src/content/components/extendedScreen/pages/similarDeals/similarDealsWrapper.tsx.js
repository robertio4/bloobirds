import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/pages/similarDeals/similarDealsWrapper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/similarDeals/similarDealsWrapper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/similarDeals/similarDealsWrapper.tsx", _s = $RefreshSig$();
import { SimilarDealsContent, useSimilarDeals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-index.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/extendedScreen/pages/similarDeals/similarDealsWrapper.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SimilarDealsWrapper = ({
  company
}) => {
  _s();
  const {
    useGetSettings,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const isSidePeekEnabled = useGetSidePeekEnabled();
  const similarDealsHook = useSimilarDeals(accountId, company?.id.objectId);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._wrapper,
    children: /* @__PURE__ */ _jsxDEV(SimilarDealsContent, {
      activeBobject: company,
      similarDealsHook,
      isBubble: !isSidePeekEnabled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, void 0);
};
_s(SimilarDealsWrapper, "jnKpiLJwkK30WFoP/O6nAEb3pJM=", true, function() {
  return [useExtensionContext, useSimilarDeals];
});
_c = SimilarDealsWrapper;
export default SimilarDealsWrapper;
var _c;
$RefreshReg$(_c, "SimilarDealsWrapper");
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
