import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceObjectPage/salesforceObjectPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceObjectPage/salesforceObjectPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceObjectPage/salesforceObjectPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getSalesforceIdFromPathOtherObjects, getSalesforceSobjectFromPage } from "/src/utils/url.ts.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import NoContextPage from "/src/content/components/noContextPage/noContextPage.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SalesforceObjectPage = ({
  closeExtensionCallback,
  openExtensionCallback
}) => {
  _s();
  const {
    useGetCurrentPage,
    setActiveBobject
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedObject, setRelatedObject] = useState(null);
  const sobjectType = getSalesforceSobjectFromPage(currentPage);
  const sobjectId = sobjectType && getSalesforceIdFromPathOtherObjects(currentPage, sobjectType);
  const {
    data
  } = useSWR(sobjectType && sobjectId && `/sobject/${sobjectId}`, () => api.get(`/utils/service/salesforce/getBloobirdsRelatedObject/${sobjectType}/${sobjectId}`).then((data2) => {
    return data2;
  }).catch(() => {
    setIsLoading(false);
  }));
  const refresh = () => {
    if (!currentPage && data) {
      setIsLoading(true);
    } else if (!sobjectId || !sobjectType) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      if (data) {
        const relatedObjectData = data?.data;
        if (relatedObjectData?.["id"]) {
          setActiveBobject(relatedObjectData);
          setRelatedObject(relatedObjectData);
          openExtensionCallback?.();
        }
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    refresh();
  }, [currentPage, data]);
  if (isLoading) {
    return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 12
    }, void 0);
  } else if (relatedObject) {
    openExtensionCallback?.();
    return /* @__PURE__ */ _jsxDEV(ContactView, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 12
    }, void 0);
  } else {
    closeExtensionCallback?.();
    return /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 12
    }, void 0);
  }
};
_s(SalesforceObjectPage, "r3tVbhcVpRjJCDifMLZ/6EPeWFg=", true, function() {
  return [useExtensionContext, useSWR];
});
_c = SalesforceObjectPage;
var _c;
$RefreshReg$(_c, "SalesforceObjectPage");
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
