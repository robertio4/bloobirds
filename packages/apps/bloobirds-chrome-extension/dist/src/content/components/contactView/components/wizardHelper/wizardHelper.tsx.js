import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/wizardHelper/wizardHelper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/wizardHelper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/wizardHelper.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CircularBadge, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes, OPPORTUNITY_LEADS_LOGIC_ROLES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, isDynamicsPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { isSalesforcePage } from "/src/utils/url.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { SyncSalesforceContactScreen } from "/src/content/components/syncSalesforceContactsScreen/syncSalesforceContactScreen.tsx.js";
import { useContextBobjects } from "/src/content/components/contactView/hooks/useContextBobjects.ts.js";
import { CadenceTaskManager } from "/src/content/components/contactView/components/wizardHelper/components/cadenceTaskManager/cadenceTaskManager.tsx.js";
import { CreateInSfdcHelper } from "/src/content/components/contactView/components/wizardHelper/components/createInSfdcHelper/createInSfdcHelper.tsx.js";
import styles from "/src/content/components/contactView/components/wizardHelper/wizardHelper.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export var WizardHelpers = /* @__PURE__ */ ((WizardHelpers2) => {
  WizardHelpers2["SYNC_TO_BB"] = "SYNC_TO_BB";
  WizardHelpers2["HANDLE_INACTIVE"] = "HANDLE_INACTIVE";
  WizardHelpers2["START_CADENCE"] = "START_CADENCE";
  WizardHelpers2["TODAY_TASKS"] = "TODAY_TASKS";
  WizardHelpers2["CREATE_IN_SFDC"] = "CREATE_IN_SFDC";
  return WizardHelpers2;
})(WizardHelpers || {});
function isFiveMinutesOlder(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const diffInMinutes = (currentDate - givenDate) / 1e3 / 60;
  return diffInMinutes >= 1;
}
export const WizardHelper = (props) => {
  _s();
  const {
    setCustomPage,
    useGetSettings,
    useGetCurrentPage
  } = useExtensionContext();
  const {
    handleMutateAndRefresh
  } = useContextBobjects();
  const {
    t
  } = useTranslation();
  const settings = useGetSettings();
  const currentPage = useGetCurrentPage();
  const {
    setShowBackButton,
    setLastVisitedBobject
  } = useFloatingMenuContext();
  const salesforceInstance = settings?.account?.salesforceInstance;
  const isCurrentPageSalesforcePage = isSalesforcePage(currentPage);
  const {
    bobject,
    relatedCompany,
    minimized
  } = props;
  const notCreatedInSfdc = salesforceInstance && !bobject?.salesforceId;
  const createdOld = bobject?.creationDateTime && isFiveMinutesOlder(bobject?.creationDateTime);
  const bobjectType = bobject?.id?.typeName;
  const isCompany = bobjectType === BobjectTypes.Company;
  const isOpportunity = bobjectType === BobjectTypes.Opportunity;
  const shouldGetRelatedContact = bobject?.salesforceId && (isCompany || isOpportunity && bobject?.leads?.length < Object.keys(OPPORTUNITY_LEADS_LOGIC_ROLES).length);
  const relatedSobjectType = isCompany ? "Contact" : "OpportunityContactRole";
  const {
    data,
    mutate
  } = useSWR(shouldGetRelatedContact && `/utils/service/salesforce/relatedSobjects/${relatedSobjectType}/AccountId/${bobject?.salesforceId}`, (url) => api.get(url).then((data2) => data2.data));
  const matchedDraftsWithoutBloobirdsId = data?.relatedObjects.filter((relatedObject) => !bobject?.leads?.includes(relatedObject?.id?.value));
  const nonMatchedDrafts = isOpportunity ? data?.nonMatchedDrafts.concat(matchedDraftsWithoutBloobirdsId) : data?.nonMatchedDrafts;
  const sample = nonMatchedDrafts?.slice(0, 3);
  const containerClasses = clsx(styles.wizard__container, {
    [styles.wizard__container__minimized]: minimized
  });
  const shouldRenderSyncRelatedObjects = nonMatchedDrafts?.length > 0 && isCurrentPageSalesforcePage;
  useEffect(() => {
    if (isOpportunity) {
      mutate();
    }
  }, [isOpportunity]);
  return /* @__PURE__ */ _jsxDEV("div", {
    id: "bb-wizard-helper",
    className: containerClasses,
    children: [/* @__PURE__ */ _jsxDEV(CadenceTaskManager, {
      ...props
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 7
    }, void 0), notCreatedInSfdc && createdOld && !isDynamicsPage(currentPage) ? /* @__PURE__ */ _jsxDEV(CreateInSfdcHelper, {
      bobject
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 9
    }, void 0) : shouldRenderSyncRelatedObjects ? /* @__PURE__ */ _jsxDEV("span", {
      className: styles.sync__contacts__container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.badges_container,
        children: sample?.map((el, i) => /* @__PURE__ */ _jsxDEV(CircularBadge, {
          size: "s",
          color: "white",
          backgroundColor: "var(--verySoftPeanut)",
          children: "C"
        }, i, false, {
          fileName: _jsxFileName,
          lineNumber: 124,
          columnNumber: 15
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "peanut",
        weight: "bold",
        children: [t("sidePeek.overview.contacts", {
          count: nonMatchedDrafts?.length
        }), " ", t("sidePeek.overview.notSynced")?.toLowerCase()]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        className: styles.sync_button,
        onClick: () => {
          setShowBackButton(true);
          setCustomPage(/* @__PURE__ */ _jsxDEV(SyncSalesforceContactScreen, {
            draftBobjectToSync: nonMatchedDrafts,
            companyIdRelated: isOpportunity ? relatedCompany?.id : bobject?.id,
            onSync: () => {
              if (handleMutateAndRefresh) {
                mutate();
                handleMutateAndRefresh().then((r) => setLastVisitedBobject(r));
              }
            },
            opportunityRelatedId: isOpportunity && bobject?.id
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 138,
            columnNumber: 17
          }, void 0));
        },
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "white",
          decoration: "underline",
          weight: "bold",
          children: t("sidePeek.overview.sync")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 152,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 116,
    columnNumber: 5
  }, void 0);
};
_s(WizardHelper, "tMbesqV5EbqZCT/yrlifovsfpfQ=", true, function() {
  return [useExtensionContext, useContextBobjects, useTranslation, useFloatingMenuContext, useSWR];
});
_c = WizardHelper;
var _c;
$RefreshReg$(_c, "WizardHelper");
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
