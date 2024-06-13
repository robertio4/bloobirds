import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceAccountPage/salesforceAccountPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceAccountPage/salesforceAccountPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceAccountPage/salesforceAccountPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useIsPersonAccountAsAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewSubTab, ContactViewTab, LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, convertLeadInBloobirds, getSalesforceSobject, querySalesforce, extractSalesforceIdFromPath } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useCreationForm } from "/src/hooks/useCreationForm.ts.js";
import { SALESFORCE } from "/src/utils/integrations.ts.js";
import { searchCompaniesByQuery, searchLeadByQuery } from "/src/utils/leads.ts.js";
import CaptureSalesforceForm from "/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.tsx.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import MultipleCompaniesPage from "/src/content/components/multipleCompaniesPage/multipleCompaniesPage.tsx.js";
import { patchLeadWithContactId, SalesforceLeadOrContactPage } from "/src/content/components/salesforceLeadOrContactPage/salesforceLeadOrContactPage.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const patchCompanyWithAccountId = async (companyId, accountId) => {
  if (accountId) {
    return await api.patch(`/bobjects/${companyId}/raw`, {
      contents: {
        [SALESFORCE.ACCOUNT_ID_FIELD]: accountId
      },
      params: {
        duplicateValidation: true
      }
    });
  } else {
    return false;
  }
};
export const SalesforceAccountPage = () => {
  _s();
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [isPerson, setIsPerson] = useState(null);
  const [exactMatch, setExactMatch] = useState();
  const [aboveLead, setAboveLead] = useState();
  const {
    getOnRefresh
  } = useFloatingMenuContext();
  const onRefresh = getOnRefresh();
  const [currentCompanyOrCompanies, setCurrentCompanyOrCompanies] = useState(null);
  const id = extractSalesforceIdFromPath(currentPage);
  const {
    createLead
  } = useCreationForm();
  const searchBySimilarCompanies = (name) => {
    searchCompaniesByQuery({
      name,
      autoMatching: false
    }).then((response) => {
      if (response && response?.exactMatch && response?.companies?.length === 1) {
        setCurrentCompanyOrCompanies([response?.companies[0]]);
        setIsLoading(false);
      } else if (response?.companies?.[0].id.objectId) {
        setCurrentCompanyOrCompanies([response?.companies[0]]);
        setIsLoading(false);
      } else if (response?.companies?.length > 1 || !response?.exactMatch) {
        setCurrentCompanyOrCompanies(response?.companies);
        setIsLoading(false);
      }
    });
  };
  const searchLeadsByConvertedAccountId = async (accountId, fallbackname) => {
    const query = `select Id, ConvertedContactId from Lead where ConvertedAccountId = '${accountId}'`;
    querySalesforce(query).then(async (sfdcLeads) => {
      if (sfdcLeads?.length === 1) {
        const data = await searchLeadByQuery({
          salesforceId: sfdcLeads?.[0]?.["Id"]
        });
        if (data?.leads && data?.leads?.length === 0 || !data?.leads) {
          searchBySimilarCompanies(fallbackname);
        } else if (data?.leads?.length === 1) {
          const lead = data?.leads?.[0];
          const possibleConvertedContactId = sfdcLeads?.[0]?.["ConvertedContactId"];
          if (possibleConvertedContactId) {
            patchLeadWithContactId(lead?.id?.value, possibleConvertedContactId);
          }
          const leadCompany = lead?.companyId;
          if (leadCompany) {
            const extensionCompany = await api.get(`/linkedin/companies/${lead?.companyId?.split("/")?.[2]}`);
            if (extensionCompany) {
              setCurrentCompanyOrCompanies([extensionCompany?.data]);
              patchCompanyWithAccountId(leadCompany, accountId);
              setExactMatch(data?.exactMatch);
              setIsLoading(false);
            } else {
              setAboveLead(lead?.id?.value);
              setIsLoading(false);
            }
          } else {
            setAboveLead(lead?.id?.value);
            setIsLoading(false);
          }
        }
      } else {
        searchBySimilarCompanies(fallbackname);
        setIsLoading(false);
      }
    });
  };
  const refresh = async () => {
    setCurrentCompanyOrCompanies(null);
    setExactMatch(null);
    if (!currentPage) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      const data = await searchCompaniesByQuery({
        salesforceId: id
      });
      if (data?.companies && data?.companies?.length === 0 || !data?.companies) {
        getSalesforceSobject("Account", id).then(async (s) => {
          const possibleName = s?.["Name"];
          const personContactId = s?.["PersonContactId"];
          if (personContactId) {
            setIsPerson(personContactId);
            setIsLoading(false);
          } else {
            await searchLeadsByConvertedAccountId(id, possibleName);
          }
        });
      } else if (data?.companies?.length === 1 || data?.companies?.length > 1 && data?.exactMatch) {
        setCurrentCompanyOrCompanies([data?.companies[0]]);
        setExactMatch(data?.exactMatch);
        if (isPersonAccountAsAccount && data?.companies?.[0]?.personContactId) {
          setIsPerson(data?.companies[0]?.personContactId);
        }
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    refresh();
  }, [currentPage]);
  const initialLeadContext = {
    activeTab: ContactViewTab.COMPANY,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentCompanyOrCompanies?.[0]
  };
  const afterSyncing = (l) => {
    if (aboveLead && l?.id?.value) {
      api.patch(`/bobjects/${aboveLead}/raw`, {
        contents: {
          [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: l?.id?.value
        },
        params: {}
      }).then(() => {
        onRefresh();
      });
      convertLeadInBloobirds(aboveLead);
    }
    setExactMatch(true);
    setCurrentCompanyOrCompanies([l]);
  };
  if (createLead) {
    return /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Account",
      sobjectId: id,
      afterSyncing
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: isLoading ? /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 9
    }, void 0) : isPerson ? /* @__PURE__ */ _jsxDEV(SalesforceLeadOrContactPage, {
      forceSalesforceId: isPerson
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 9
    }, void 0) : currentCompanyOrCompanies && (currentCompanyOrCompanies?.length > 1 || !exactMatch) ? /* @__PURE__ */ _jsxDEV(MultipleCompaniesPage, {
      companies: currentCompanyOrCompanies,
      setExactMatch,
      setCurrentCompany: setCurrentCompanyOrCompanies,
      dataToUpdate: {
        [SALESFORCE.ACCOUNT_ID_FIELD]: id
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 9
    }, void 0) : currentCompanyOrCompanies ? /* @__PURE__ */ _jsxDEV(ContactView, {
      defaultContext: initialLeadContext
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Account",
      sobjectId: id,
      afterSyncing
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(SalesforceAccountPage, "jNsDYWzAbRN45W7CornETACNA7g=", true, function() {
  return [useExtensionContext, useIsPersonAccountAsAccount, useFloatingMenuContext, useCreationForm];
});
_c = SalesforceAccountPage;
var _c;
$RefreshReg$(_c, "SalesforceAccountPage");
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
