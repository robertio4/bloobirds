import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactOpportunityList/contactOpportunityList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactOpportunityList/contactOpportunityList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactOpportunityList/contactOpportunityList.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsNoStatusPlanAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import __vite__cjsImport6_lodash_capitalize from "/vendor/.vite-deps-lodash_capitalize.js__v--9add8494.js"; const capitalize = __vite__cjsImport6_lodash_capitalize.__esModule ? __vite__cjsImport6_lodash_capitalize.default : __vite__cjsImport6_lodash_capitalize;
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { CompanyBriefHeader } from "/src/content/components/contactView/components/companyBriefHeader/companyBriefHeader.tsx.js";
import { ContactViewContent } from "/src/content/components/contactView/components/contactViewContent/contactViewContent.tsx.js";
import { OpportunityBriefCard } from "/src/content/components/contactView/components/opportunityBriefCard/opportunityBriefCard.tsx.js";
import styles from "/src/content/components/contactView/pages/contactLeadsList/contactsLeadsList.module.css.js";
import NoBobjectsPage from "/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactOpportunityList = ({
  company,
  opportunities,
  lead = null
}) => {
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: opportunities?.length > 0 ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(CompanyBriefHeader, {
        company,
        lead
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ContactViewContent, {
        children: /* @__PURE__ */ _jsxDEV(OpportunityList, {
          opportunities
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 11
      }, void 0)]
    }, void 0, true) : /* @__PURE__ */ _jsxDEV(NoBobjectsPage, {
      contactPage: ContactViewTab.OPPORTUNITY
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, void 0);
};
_c = ContactOpportunityList;
export const OpportunityList = ({
  opportunities,
  withTitle = false
}) => {
  _s();
  const {
    t,
    i18n
  } = useTranslation();
  const {
    useGetDataModel
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const salesforceStatusField = dataModel?.findFieldByLogicRole("SALESFORCE_OPPORTUNITY_STAGE");
  const oppStatusField = dataModel?.findFieldByLogicRole("OPPORTUNITY__STATUS");
  const opportunitiesSortedByStatus = opportunities?.sort((a, b) => {
    const getOrderingFromField = (opp) => {
      const fieldValue = isNoStatusPlanAccount ? salesforceStatusField?.values?.find((value) => value?.name == opp?.salesforceStage) : oppStatusField?.values?.find((value) => value?.id == opp?.status);
      return fieldValue !== void 0 && fieldValue?.ordering !== void 0 ? fieldValue.ordering : Infinity;
    };
    return getOrderingFromField(a) - getOrderingFromField(b);
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: opportunitiesSortedByStatus?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles._related_list_container,
      children: [withTitle && /* @__PURE__ */ _jsxDEV(Text, {
        className: styles._related_list_title,
        size: "xs",
        color: "softPeanut",
        weight: "bold",
        children: t("sidePeek.overview.relatedBobjectOpp", {
          bobject: i18n.language === "en" ? t("bobjectTypes.opportunity", {
            count: 0
          }) : capitalize(t("bobjectTypes.opportunity", {
            count: 0
          }))
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.leadsList,
        children: opportunitiesSortedByStatus?.map((opp, index) => {
          return /* @__PURE__ */ _jsxDEV(OpportunityBriefCard, {
            opportunity: opp
          }, index, false, {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 22
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)
  }, void 0, false);
};
_s(OpportunityList, "9h6FV770XaFWVddJ8peXlorh5zg=", true, function() {
  return [useTranslation, useExtensionContext, useIsNoStatusPlanAccount];
});
_c2 = OpportunityList;
var _c, _c2;
$RefreshReg$(_c, "ContactOpportunityList");
$RefreshReg$(_c2, "OpportunityList");
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
