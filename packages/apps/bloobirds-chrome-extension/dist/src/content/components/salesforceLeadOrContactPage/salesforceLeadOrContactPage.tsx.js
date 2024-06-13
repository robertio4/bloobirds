import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceLeadOrContactPage/salesforceLeadOrContactPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeadOrContactPage/salesforceLeadOrContactPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceLeadOrContactPage/salesforceLeadOrContactPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useActiveAccountId, useIsPersonAccountAsAccount, useObjectCreationSettings, useOtoUpdateContactId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewSubTab, ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getSalesforceSobject, querySalesforce, convertLeadInBloobirds, extractSalesforceIdFromPath, isSalesforceContactPage, isSalesforceLeadPage, isSalesforceAccountPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useCreationForm } from "/src/hooks/useCreationForm.ts.js";
import { SALESFORCE } from "/src/utils/integrations.ts.js";
import { searchLeadByQuery } from "/src/utils/leads.ts.js";
import CaptureSalesforceForm from "/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.tsx.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import MultipleLeadsPage from "/src/content/components/linkedInScreens/multipleLeadsPage.tsx.js";
import NavigateMessageSalesforce from "/src/content/components/linkedInScreens/navigateMessageSalesforce.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const patchLeadWithContactId = (leadId, contactId) => {
  api.patch(`/bobjects/${leadId}/raw`, {
    contents: {
      [SALESFORCE.CONTACT_ID_FIELD]: contactId
    },
    params: {
      duplicateValidation: true
    }
  });
};
const isNewId = (sobjectId) => {
  return sobjectId?.startsWith("new");
};
export const SalesforceLeadOrContactPage = ({
  forceSalesforceId
}) => {
  _s();
  const [possibleName, setPossibleName] = useState();
  const {
    useGetCurrentPage,
    useGetActiveBobject
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [exactMatch, setExactMatch] = useState();
  const [currentLeadOrLeads, setCurrentLeadOrLeads] = useState(null);
  const id = extractSalesforceIdFromPath(currentPage);
  const isLead = isSalesforceLeadPage(currentPage);
  const isContact = isSalesforceContactPage(currentPage);
  const isAccount = isSalesforceAccountPage(currentPage);
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const accountId = useActiveAccountId();
  const hasOtoUpdateContactId = useOtoUpdateContactId(accountId);
  const {
    createLead,
    syncLead
  } = useCreationForm();
  const {
    enabledObjectCreation
  } = useObjectCreationSettings();
  const searchBySimilarLeads = (sobjectType) => {
    getSalesforceSobject(sobjectType, id).then((s) => {
      const possibleEmail = s?.["Email"] || s?.["PersonEmail"];
      const possibleName2 = s?.["Name"];
      setPossibleName(possibleName2);
      const possibleCompany = s?.["Company"];
      searchLeadByQuery({
        companyName: !hasOtoUpdateContactId ? possibleCompany : null,
        leadFullName: !hasOtoUpdateContactId ? possibleName2 : null,
        email: possibleEmail,
        autoMatching: false
      }).then((response) => {
        if (response && response?.exactMatch && response?.leads?.length === 1) {
          setCurrentLeadOrLeads([response?.leads[0]]);
          if (hasOtoUpdateContactId) {
            setExactMatch(true);
          }
          setIsLoading(false);
        } else if (response?.leads?.[0].id.objectId) {
          setCurrentLeadOrLeads([response?.leads[0]]);
          setIsLoading(false);
        } else if (response?.leads?.length > 1 || !response?.exactMatch) {
          setCurrentLeadOrLeads(response?.leads);
          setIsLoading(false);
        }
      });
    });
  };
  const searchLeadsByConvertedContactId = async (contactId) => {
    const query = `select Id from Lead where ConvertedContactId = '${contactId}'`;
    querySalesforce(query).then(async (leads) => {
      if (leads?.length === 1) {
        const data = await searchLeadByQuery({
          salesforceId: leads?.[0]?.["Id"]
        });
        if (data?.leads && data?.leads?.length === 0 || !data?.leads) {
          searchBySimilarLeads("Contact");
        } else if (data?.leads?.length === 1) {
          setCurrentLeadOrLeads([data?.leads[0]]);
          patchLeadWithContactId(data?.leads?.[0]?.id?.value, contactId);
          convertLeadInBloobirds(data?.leads?.[0]?.id?.value);
          setExactMatch(data?.exactMatch);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  };
  const refresh = async () => {
    setCurrentLeadOrLeads(null);
    if (!currentPage) {
      setIsLoading(true);
    } else {
      if (!isNewId(forceSalesforceId || id)) {
        setIsLoading(true);
        const data = await searchLeadByQuery({
          salesforceId: forceSalesforceId || id
        });
        if (data?.leads && data?.leads?.length === 0 || !data?.leads) {
          if (isContact) {
            await searchLeadsByConvertedContactId(id);
          } else {
            searchBySimilarLeads(isPersonAccountAsAccount && isAccount ? "Account" : "Lead");
          }
        } else if (data?.leads?.length === 1) {
          setCurrentLeadOrLeads([data?.leads[0]]);
          setExactMatch(data?.exactMatch);
          setIsLoading(false);
        } else if (data?.leads?.length > 1 && data?.exactMatch) {
          setCurrentLeadOrLeads([data?.leads[0]]);
          setExactMatch(data?.exactMatch);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    refresh();
  }, [currentPage, activeBobject]);
  const initialLeadContext = {
    activeTab: ContactViewTab.LEAD,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentLeadOrLeads?.[0],
    actionsDisabled: false
  };
  const afterSyncing = (l) => {
    setCurrentLeadOrLeads([l]);
    setExactMatch(true);
  };
  if (createLead && enabledObjectCreation) {
    if (isLead) {
      return /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
        defaultSobjectType: "Lead",
        sobjectId: id,
        afterSyncing
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 188,
        columnNumber: 9
      }, void 0);
    }
    if (isContact) {
      return /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
        defaultSobjectType: "Contact",
        sobjectId: id,
        afterSyncing
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 9
      }, void 0);
    }
    if (forceSalesforceId) {
      return /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
        defaultSobjectType: "Account",
        sobjectId: forceSalesforceId,
        afterSyncing
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 208,
        columnNumber: 9
      }, void 0);
    }
  }
  if (syncLead && !enabledObjectCreation) {
    return /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Lead",
      sobjectId: id,
      afterSyncing,
      syncLead: true
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: isLoading ? /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 9
    }, void 0) : currentLeadOrLeads && (currentLeadOrLeads?.length > 1 || !exactMatch) ? /* @__PURE__ */ _jsxDEV(MultipleLeadsPage, {
      leads: currentLeadOrLeads,
      setCurrentLead: setCurrentLeadOrLeads,
      setExactMatch,
      dataToUpdate: {
        [isContact ? SALESFORCE.CONTACT_ID_FIELD : isLead ? SALESFORCE.LEAD_ID_FIELD : null]: id
      },
      leadName: possibleName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 9
    }, void 0) : currentLeadOrLeads ? /* @__PURE__ */ _jsxDEV(ContactView, {
      defaultContext: initialLeadContext
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 9
    }, void 0) : enabledObjectCreation && isLead ? /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Lead",
      sobjectId: id,
      afterSyncing
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 251,
      columnNumber: 9
    }, void 0) : enabledObjectCreation && isContact ? /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Contact",
      sobjectId: id,
      afterSyncing
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 9
    }, void 0) : enabledObjectCreation && forceSalesforceId ? /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Account",
      sobjectId: id,
      afterSyncing
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 9
    }, void 0) : enabledObjectCreation ? /* @__PURE__ */ _jsxDEV(NavigateMessageSalesforce, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 272,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(MultipleLeadsPage, {
      leads: currentLeadOrLeads,
      setCurrentLead: setCurrentLeadOrLeads,
      setExactMatch,
      dataToUpdate: {
        [isContact ? SALESFORCE.CONTACT_ID_FIELD : isLead ? SALESFORCE.LEAD_ID_FIELD : null]: id
      },
      leadName: possibleName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(SalesforceLeadOrContactPage, "TLEVXMd3ucS32De4wrHdQvCGoic=", true, function() {
  return [useExtensionContext, useIsPersonAccountAsAccount, useActiveAccountId, useOtoUpdateContactId, useCreationForm, useObjectCreationSettings];
});
_c = SalesforceLeadOrContactPage;
var _c;
$RefreshReg$(_c, "SalesforceLeadOrContactPage");
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
