import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/contactViewTabs.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactViewTabs.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactViewTabs.tsx", _s = $RefreshSig$();
import { useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/contactView.module.css.js";
import ContactViewTabElement from "/src/content/components/contactView/contactViewTabElement.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ContactViewTabs = () => {
  _s();
  const {
    setActiveBobject,
    useGetActiveBobjectContext,
    closeExtendedScreen
  } = useExtensionContext();
  const data = useGetActiveBobjectContext();
  const {
    activeTab
  } = useContactViewContext();
  const isB2CAccount = useIsB2CAccount();
  const handleClickCompany = () => {
    if (data?.company) {
      setActiveBobject(data?.company);
    }
    closeExtendedScreen();
  };
  const handleClickLeads = () => {
    if (data?.company && activeTab === ContactViewTab.LEAD) {
      setActiveBobject(data?.company, ContactViewTab.LEAD);
    }
    if (data?.leads?.length === 1 && activeTab === ContactViewTab.OPPORTUNITY) {
      setActiveBobject(data?.leads?.[0], ContactViewTab.LEAD);
    }
    closeExtendedScreen();
  };
  const handleClickOpportunities = () => {
    if (data?.company && activeTab === ContactViewTab.OPPORTUNITY) {
      setActiveBobject(data?.company, ContactViewTab.OPPORTUNITY);
    }
    closeExtendedScreen();
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.header__container,
    children: [!isB2CAccount && /* @__PURE__ */ _jsxDEV(ContactViewTabElement, {
      tab: ContactViewTab.COMPANY,
      icon: "company",
      onClick: handleClickCompany,
      bobjects: [data?.company]
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewTabElement, {
      tab: ContactViewTab.LEAD,
      icon: "people",
      number: data?.leads?.length,
      onClick: handleClickLeads,
      bobjects: data?.leads
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewTabElement, {
      tab: ContactViewTab.OPPORTUNITY,
      icon: "fileOpportunity",
      number: data?.numberOfOpportunities,
      onClick: handleClickOpportunities,
      bobjects: data?.opportunities
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }, void 0), !isB2CAccount && /* @__PURE__ */ _jsxDEV(ContactViewTabElement, {
      tab: ContactViewTab.RELATED_COMPANIES,
      icon: "child",
      number: data ? data.numberOfChildCompanies + (data.parentCompany ? 1 : 0) + (data.siblingCompanies ? data.siblingCompanies.length - 1 : 0) : void 0
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 45,
    columnNumber: 5
  }, void 0);
};
_s(ContactViewTabs, "PeZUlc51IFyLZTNyz1WUypFUP4w=", true, function() {
  return [useExtensionContext, useContactViewContext, useIsB2CAccount];
});
_c = ContactViewTabs;
export default ContactViewTabs;
var _c;
$RefreshReg$(_c, "ContactViewTabs");
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
