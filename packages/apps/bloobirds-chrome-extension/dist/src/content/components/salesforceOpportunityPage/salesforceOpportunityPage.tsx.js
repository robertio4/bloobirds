import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceOpportunityPage/salesforceOpportunityPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceOpportunityPage/salesforceOpportunityPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceOpportunityPage/salesforceOpportunityPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { ContactViewSubTab, ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { querySalesforce, convertLeadInBloobirds } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { searchLeadByQuery, searchOppsByQuery } from "/src/utils/leads.ts.js";
import { getSalesforceIdFromPath } from "/src/utils/url.ts.js";
import CaptureSalesforceForm from "/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.tsx.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import { patchCompanyWithAccountId } from "/src/content/components/salesforceAccountPage/salesforceAccountPage.tsx.js";
import { patchLeadWithContactId } from "/src/content/components/salesforceLeadOrContactPage/salesforceLeadOrContactPage.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SalesforceOpportunityPage = () => {
  _s();
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [, setExactMatch] = useState();
  const [currentOppOrOpps, setCurrentOppOrOpps] = useState(null);
  const id = getSalesforceIdFromPath(currentPage);
  const searchLeadsByConvertedOpportunityId = async (opportunityId) => {
    const query = `select Id, ConvertedContactId, ConvertedAccountId from Lead where ConvertedOpportunityId = '${opportunityId}'`;
    const sfdcLeads = await querySalesforce(query);
    if (sfdcLeads?.length === 1) {
      const data = await searchLeadByQuery({
        salesforceId: sfdcLeads?.[0]?.["Id"]
      });
      if (data?.leads && data?.leads?.length === 0 || !data?.leads) {
        setIsLoading(false);
      } else if (data?.leads?.length === 1) {
        const lead = data?.leads?.[0];
        const possibleConvertedContactId = sfdcLeads?.[0]?.["ConvertedContactId"];
        const possibleConvertedAccountId = sfdcLeads?.[0]?.["ConvertedAccountId"];
        const leadCompany = lead?.companyId;
        if (lead) {
          if (possibleConvertedContactId) {
            patchLeadWithContactId(lead?.id?.value, possibleConvertedContactId);
          }
          if (leadCompany && possibleConvertedAccountId) {
            await patchCompanyWithAccountId(leadCompany, possibleConvertedAccountId);
          }
          convertLeadInBloobirds(lead?.id?.value);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    } else {
      setIsLoading(false);
    }
  };
  const refresh = async () => {
    setCurrentOppOrOpps(null);
    setExactMatch(null);
    if (!currentPage) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      const data = await searchOppsByQuery({
        salesforceId: id
      });
      if (data?.opportunities && data?.opportunities?.length === 0 || !data?.opportunities) {
        await searchLeadsByConvertedOpportunityId(id);
      } else if (data?.opportunities?.length === 1) {
        setCurrentOppOrOpps([data?.opportunities[0]]);
        setIsLoading(false);
        setExactMatch(data?.exactMatch);
      } else if (data?.opportunities?.length > 1 && data?.exactMatch) {
        setCurrentOppOrOpps([data?.opportunities[0]]);
        setExactMatch(data?.exactMatch);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    refresh();
  }, [currentPage]);
  const initialLeadContext = {
    activeTab: ContactViewTab.OPPORTUNITY,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentOppOrOpps?.[0]
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: isLoading ? /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 9
    }, void 0) : currentOppOrOpps ? /* @__PURE__ */ _jsxDEV(ContactView, {
      defaultContext: initialLeadContext
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Opportunity",
      sobjectId: id,
      afterSyncing: (l) => setCurrentOppOrOpps([l])
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(SalesforceOpportunityPage, "MErlq3A+nPSG00mltppHe0PFh4w=", true, function() {
  return [useExtensionContext];
});
_c = SalesforceOpportunityPage;
var _c;
$RefreshReg$(_c, "SalesforceOpportunityPage");
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
