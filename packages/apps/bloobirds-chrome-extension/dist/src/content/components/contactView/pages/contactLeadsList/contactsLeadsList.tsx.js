import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactLeadsList/contactsLeadsList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactLeadsList/contactsLeadsList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactLeadsList/contactsLeadsList.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CircularBadge, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport7_lodash_capitalize from "/vendor/.vite-deps-lodash_capitalize.js__v--9add8494.js"; const capitalize = __vite__cjsImport7_lodash_capitalize.__esModule ? __vite__cjsImport7_lodash_capitalize.default : __vite__cjsImport7_lodash_capitalize;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { SyncSalesforceContactScreen } from "/src/content/components/syncSalesforceContactsScreen/syncSalesforceContactScreen.tsx.js";
import { CompanyBriefHeader } from "/src/content/components/contactView/components/companyBriefHeader/companyBriefHeader.tsx.js";
import { ContactViewContent } from "/src/content/components/contactView/components/contactViewContent/contactViewContent.tsx.js";
import { LeadBriefCard } from "/src/content/components/contactView/components/leadBriefCard/leadBriefCard.tsx.js";
import NoBobjectsPage from "/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.tsx.js";
import styles from "/src/content/components/contactView/pages/contactLeadsList/contactsLeadsList.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SyncRelatedContacts = ({
  nonMatchedDrafts,
  array,
  relatedCompanyId,
  relatedOpportunityId
}) => {
  _s();
  const {
    setShowBackButton
  } = useFloatingMenuContext();
  const {
    setCustomPage
  } = useExtensionContext();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: nonMatchedDrafts?.length > 0 && /* @__PURE__ */ _jsxDEV("span", {
      className: styles.sync__contacts__container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.badges_container,
        children: array?.map((el, i) => /* @__PURE__ */ _jsxDEV(CircularBadge, {
          size: "s",
          color: "white",
          backgroundColor: "var(--verySoftPeanut)",
          children: "C"
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 15
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "peanut",
        weight: "bold",
        children: [nonMatchedDrafts?.length, " Contact", nonMatchedDrafts?.length > 1 ? "s" : "", " not synced"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        className: styles.sync_button,
        onClick: () => {
          setShowBackButton(true);
          setCustomPage(/* @__PURE__ */ _jsxDEV(SyncSalesforceContactScreen, {
            draftBobjectToSync: nonMatchedDrafts,
            companyIdRelated: relatedCompanyId,
            opportunityRelatedId: relatedOpportunityId
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 60,
            columnNumber: 17
          }, void 0));
        },
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "peanut",
          decoration: "underline",
          weight: "bold",
          children: t("sidePeek.overview.sync")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(SyncRelatedContacts, "h09NZtXjfiSddVgwmlc44Z4J/mI=", false, function() {
  return [useFloatingMenuContext, useExtensionContext, useTranslation];
});
_c = SyncRelatedContacts;
export const ContactsLeadsList = ({
  company,
  leads
}) => {
  _s2();
  const {
    data
  } = useSWR(company?.salesforceId && "/utils/service/salesforce/relatedSobjects/Contact/AccountId/" + company?.salesforceId, () => api.get("/utils/service/salesforce/relatedSobjects/Contact/AccountId/" + company?.salesforceId).then((data2) => data2?.data));
  const isB2CAccount = useIsB2CAccount();
  const nonMatchedDrafts = data?.nonMatchedDrafts;
  const array = nonMatchedDrafts?.slice(0, 3);
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: leads?.length > 0 ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [!isB2CAccount && /* @__PURE__ */ _jsxDEV(CompanyBriefHeader, {
        company
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 29
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewContent, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.container,
          children: [/* @__PURE__ */ _jsxDEV(LeadsList, {
            leads
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 105,
            columnNumber: 15
          }, void 0), !isB2CAccount && /* @__PURE__ */ _jsxDEV(SyncRelatedContacts, {
            nonMatchedDrafts,
            array,
            relatedCompanyId: company?.id
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 107,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 11
      }, void 0)]
    }, void 0, true) : /* @__PURE__ */ _jsxDEV(NoBobjectsPage, {
      contactPage: ContactViewTab.LEAD
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 99,
    columnNumber: 5
  }, void 0);
};
_s2(ContactsLeadsList, "hK+DfOxV6/z6OdzufQ3YQH+0fHM=", false, function() {
  return [useSWR, useIsB2CAccount];
});
_c2 = ContactsLeadsList;
export const LeadsList = ({
  leads,
  withTitle = false
}) => {
  _s3();
  const {
    useGetSettings
  } = useExtensionContext();
  const {
    t,
    i18n
  } = useTranslation();
  const settings = useGetSettings();
  const hasSalesforceIntegration = settings?.account?.salesforceInstance;
  const bobjectName = hasSalesforceIntegration ? t("bobjectTypes.contact", {
    count: 0
  }) : t("bobjectTypes.lead", {
    count: 0
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: leads?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles._related_list_container,
      children: [withTitle && /* @__PURE__ */ _jsxDEV(Text, {
        className: styles._related_list_title,
        size: "xs",
        color: "softPeanut",
        weight: "bold",
        children: t("sidePeek.overview.relatedBobject", {
          bobject: i18n.language === "en" ? bobjectName : capitalize(bobjectName)
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 141,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.leadsList,
        children: leads?.map((lead, idx) => /* @__PURE__ */ _jsxDEV(LeadBriefCard, {
          lead
        }, `${lead?.id?.value}-${idx}`, false, {
          fileName: _jsxFileName,
          lineNumber: 154,
          columnNumber: 15
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)
  }, void 0, false);
};
_s3(LeadsList, "JY6Q1rw3rqyqfpBcdpIxaGKGxok=", true, function() {
  return [useExtensionContext, useTranslation];
});
_c3 = LeadsList;
var _c, _c2, _c3;
$RefreshReg$(_c, "SyncRelatedContacts");
$RefreshReg$(_c2, "ContactsLeadsList");
$RefreshReg$(_c3, "LeadsList");
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
