import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/contactViewScreens.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactViewScreens.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactViewScreens.tsx", _s = $RefreshSig$();
import { ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { isCompany, isLead, isOpportunity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { SalesforceNoCompanyPage } from "/src/content/components/salesforceNoCompanyPage/salesforceNoCompanyPage.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { ContactCompanyPage } from "/src/content/components/contactView/pages/contactCompanyPage/contactCompanyPage.tsx.js";
import { ContactLeadPage } from "/src/content/components/contactView/pages/contactLeadPage/contactLeadPage.tsx.js";
import { ContactsLeadsList } from "/src/content/components/contactView/pages/contactLeadsList/contactsLeadsList.tsx.js";
import { ContactOpportunityList } from "/src/content/components/contactView/pages/contactOpportunityList/contactOpportunityList.tsx.js";
import { ContactOpportunityPage } from "/src/content/components/contactView/pages/contactOpportunityPage/contactOpportunityPage.tsx.js";
import { ContactRelatedCompanies } from "/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ContactViewScreens = () => {
  _s();
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    setActiveBobject
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const {
    activeTab
  } = useContactViewContext();
  if (!activeBobject) {
    return null;
  }
  if (isCompany(activeBobject)) {
    switch (activeTab) {
      case ContactViewTab.LEAD:
        return /* @__PURE__ */ _jsxDEV(ContactsLeadsList, {
          company: data?.company,
          leads: data?.leads
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 16
        }, void 0);
      case ContactViewTab.COMPANY:
        return /* @__PURE__ */ _jsxDEV(ContactCompanyPage, {
          company: data?.company || activeBobject,
          leads: data?.leads,
          opportunities: data?.opportunities,
          loading: !data
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 11
        }, void 0);
      case ContactViewTab.OPPORTUNITY:
        return /* @__PURE__ */ _jsxDEV(ContactOpportunityList, {
          company: data?.company || activeBobject,
          opportunities: data?.opportunities
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 11
        }, void 0);
      case ContactViewTab.RELATED_COMPANIES:
        return /* @__PURE__ */ _jsxDEV(ContactRelatedCompanies, {
          company: data?.company,
          childCompanies: data?.childCompanies,
          parentCompany: data?.parentCompany,
          siblingCompanies: data?.siblingCompanies
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 11
        }, void 0);
      default:
        return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
    }
  }
  if (isLead(activeBobject)) {
    switch (activeTab) {
      case ContactViewTab.LEAD:
        return /* @__PURE__ */ _jsxDEV(ContactLeadPage, {
          lead: activeBobject,
          leads: data?.leads
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 16
        }, void 0);
      case ContactViewTab.COMPANY:
        return /* @__PURE__ */ _jsxDEV(SalesforceNoCompanyPage, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 16
        }, void 0);
      case ContactViewTab.OPPORTUNITY:
        if (data?.opportunities?.length === 1) {
          setActiveBobject(data?.opportunities?.[0]);
          return /* @__PURE__ */ _jsxDEV(ContactOpportunityPage, {
            opportunity: data?.opportunities?.[0]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 70,
            columnNumber: 18
          }, void 0);
        } else {
          return /* @__PURE__ */ _jsxDEV(ContactOpportunityList, {
            company: data?.company,
            opportunities: data?.opportunities,
            lead: activeBobject
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 13
          }, void 0);
        }
      case ContactViewTab.RELATED_COMPANIES:
        return /* @__PURE__ */ _jsxDEV(ContactRelatedCompanies, {
          company: data?.company,
          parentCompany: data?.parentCompany,
          childCompanies: data?.childCompanies,
          siblingCompanies: data?.siblingCompanies
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 11
        }, void 0);
      default:
        return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
    }
  }
  if (isOpportunity(activeBobject)) {
    switch (activeTab) {
      case ContactViewTab.LEAD:
        if (data?.leads?.length === 1) {
          setActiveBobject(data?.leads[0]);
          return /* @__PURE__ */ _jsxDEV(ContactLeadPage, {
            lead: data?.leads[0],
            leads: data?.leads
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 18
          }, void 0);
        }
        return /* @__PURE__ */ _jsxDEV(ContactsLeadsList, {
          company: data?.company,
          leads: data?.leads
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 16
        }, void 0);
      case ContactViewTab.COMPANY:
        return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
      case ContactViewTab.OPPORTUNITY:
        return /* @__PURE__ */ _jsxDEV(ContactOpportunityPage, {
          opportunity: activeBobject
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 16
        }, void 0);
      case ContactViewTab.RELATED_COMPANIES:
        return /* @__PURE__ */ _jsxDEV(ContactRelatedCompanies, {
          company: data?.company,
          childCompanies: data?.childCompanies,
          parentCompany: data?.parentCompany,
          siblingCompanies: data?.siblingCompanies
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 11
        }, void 0);
      default:
        return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
    }
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s(ContactViewScreens, "8szKkgFyStHuaZhzOQ3LpF1ngSY=", true, function() {
  return [useExtensionContext, useContactViewContext];
});
_c = ContactViewScreens;
export default ContactViewScreens;
var _c;
$RefreshReg$(_c, "ContactViewScreens");
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
