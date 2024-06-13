import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceTaskOrEventPage/salesforceTaskOrEventPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceTaskOrEventPage/salesforceTaskOrEventPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceTaskOrEventPage/salesforceTaskOrEventPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { ContactViewSubTab, ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { searchCompaniesByQuery, searchLeadByQuery } from "/src/utils/leads.ts.js";
import { getSalesforceIdFromPath, isSalesforceEventPage, isSalesforceTaskPage } from "/src/utils/url.ts.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import NavigateMessageSalesforce from "/src/content/components/linkedInScreens/navigateMessageSalesforce.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SalesforceTaskOrEventPage = () => {
  _s();
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [, setExactMatch] = useState();
  const [currentLeadOrLeads, setCurrentLeadOrLeads] = useState(null);
  const [currentCompanyOrCompanies, setCurrentCompanyOrCompanies] = useState(null);
  const id = getSalesforceIdFromPath(currentPage);
  const isTask = isSalesforceTaskPage(currentPage);
  const isEvent = isSalesforceEventPage(currentPage);
  const sobjectType = isTask ? "Task" : isEvent ? "Event" : null;
  const {
    data
  } = useSWR(sobjectType && `/sobject/${id}`, () => api.get(`/utils/service/salesforce/sobject/${sobjectType}/${id}`).then((data2) => data2?.data));
  const refresh = () => {
    setCurrentLeadOrLeads(null);
    if (!currentPage && data) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      if (data?.["WhoId"]) {
        searchLeadByQuery({
          salesforceId: data?.["WhoId"]
        }).then((data2) => {
          setIsLoading(false);
          if (data2?.leads) {
            setCurrentLeadOrLeads([data2?.leads[0]]);
          }
          setExactMatch(data2?.exactMatch);
        });
      } else if (data?.["WhatId"]) {
        searchCompaniesByQuery({
          salesforceId: data?.["WhatId"]
        }).then((data2) => {
          setIsLoading(false);
          if (data2?.companies) {
            setCurrentCompanyOrCompanies([data2?.companies[0]]);
          }
          setExactMatch(data2?.exactMatch);
        });
      } else {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    refresh();
  }, [currentPage, data]);
  const initialLeadContext = {
    activeTab: ContactViewTab.LEAD,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentLeadOrLeads?.[0]
  };
  const initialCompanyContext = {
    activeTab: ContactViewTab.COMPANY,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentCompanyOrCompanies?.[0]
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: isLoading ? /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }, void 0) : currentLeadOrLeads || currentCompanyOrCompanies ? /* @__PURE__ */ _jsxDEV(ContactView, {
      defaultContext: currentLeadOrLeads ? initialLeadContext : initialCompanyContext
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(NavigateMessageSalesforce, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(SalesforceTaskOrEventPage, "mNbCaKM80C0pnm0lHuKd3ao+s4M=", true, function() {
  return [useExtensionContext, useSWR];
});
_c = SalesforceTaskOrEventPage;
var _c;
$RefreshReg$(_c, "SalesforceTaskOrEventPage");
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
