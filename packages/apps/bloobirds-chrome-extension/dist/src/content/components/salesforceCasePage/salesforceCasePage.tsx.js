import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceCasePage/salesforceCasePage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceCasePage/salesforceCasePage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceCasePage/salesforceCasePage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useActiveAccountId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewSubTab, ACTIVITY_FIELDS_LOGIC_ROLE, MessagesEvents, CUSTOM_TASK_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { getSalesforceIdFromPath } from "/src/utils/url.ts.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import NoContextPage from "/src/content/components/noContextPage/noContextPage.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SalesforceCasePage = () => {
  _s();
  const {
    useGetCurrentPage,
    setActiveBobject,
    setExtendedContext,
    setForcedActiveSubTab
  } = useExtensionContext();
  const accountId = useActiveAccountId();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedObject, setRelatedObject] = useState(null);
  const id = getSalesforceIdFromPath(currentPage);
  const sobjectType = "Case";
  const {
    data
  } = useSWR(sobjectType && `/sobject/${id}`, () => api.get(`/utils/service/salesforce/getBloobirdsRelatedObject/${sobjectType}/${id}`).then((data2) => data2?.data));
  const fetchLastActivity = (contactId) => {
    api.post(`/bobjects/${accountId}/Activity/search`, {
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [contactId?.value]
      },
      formFields: true,
      pageSize: 1,
      injectReferences: false,
      sort: [{
        field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
        direction: "DESC"
      }]
    }).then((data2) => {
      if (data2?.data?.totalMatching > 0) {
        const lastActivity = data2?.data?.contents?.[0];
        const lastActivityType = getValueFromLogicRole(lastActivity, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK_TYPE);
        if (lastActivityType && lastActivityType == CUSTOM_TASK_TYPES.WHATSAPP_BUSINESS) {
          setExtendedContext({
            type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
            bobject: lastActivity
          });
        }
      }
      setIsLoading(false);
    });
  };
  const refresh = () => {
    if (!currentPage && data) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      if (data) {
        if (data?.["id"]) {
          window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
          setActiveBobject(data);
          setRelatedObject(data);
          if (currentPage && currentPage.includes("?channel=OMNI")) {
            fetchLastActivity(data?.["id"]);
            setForcedActiveSubTab(ContactViewSubTab.ACTIVITIES);
          }
        }
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    refresh();
  }, [currentPage, data]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: isLoading ? /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 25
    }, void 0) : relatedObject ? /* @__PURE__ */ _jsxDEV(ContactView, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 55
    }, void 0) : /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 73
    }, void 0)
  }, void 0, false);
};
_s(SalesforceCasePage, "Oqg5YPp2Wdmu6c/ntvvvqUfDlkc=", true, function() {
  return [useExtensionContext, useActiveAccountId, useSWR];
});
_c = SalesforceCasePage;
var _c;
$RefreshReg$(_c, "SalesforceCasePage");
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
