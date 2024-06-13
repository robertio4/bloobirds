import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactButtons/contactButtons.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactButtons/contactButtons.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactButtons/contactButtons.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { SimilarDealsTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { useSimilarDeals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-index.tsx.js";
import { Icon, IconButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsOTOAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE, BobjectTypes, CRM, LEAD_FIELDS_LOGIC_ROLE, MIXPANEL_EVENTS, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getExtensionBobjectByIdFields } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { addHttpIfNeeded, createBloobirdsUrl, isLinkedinOrSalesNav } from "/src/utils/url.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import styles from "/src/content/components/contactView/pages/contactButtons/contactButtons.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactButtons = ({
  bobject,
  mainNoteBobject,
  isDisabled,
  hasOpportunities = false
}) => {
  _s();
  const {
    actionsDisabled
  } = useContactViewContext();
  const {
    useGetDataModel,
    useGetSettings,
    setExtendedContext
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const isOTOAccount = useIsOTOAccount();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions.contactButtons"
  });
  const {
    t: bobjectT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  const bobjectType = bobject.id.typeName;
  const bobjectLinkedInUrl = bobject.linkedInUrl;
  const bobjectSalesforceId = bobject.salesforceId;
  const bobjectDynamicsId = bobject.dynamicsId;
  const bobjectDynamicsType = bobject.dynamicsType;
  const website = bobject?.website;
  const mainNote = bobject?.mainNote && !!mainNoteBobject;
  const hubspotPortalId = settings?.account?.hubspotPortalId;
  const salesforceInstance = settings?.account?.salesforceInstance;
  const hasDynamicIntegration = settings?.account?.mainCrm === CRM.DYNAMICS;
  const bobjectHubspotId = bobject?.hubspotId;
  const bloobirdsUrl = createBloobirdsUrl(bobject.id);
  const isOpportunityBobject = bobject.id.typeName === "Opportunity";
  const hubspotBobjectType = bobject?.id?.typeName === "Lead" ? "contact" : bobject?.id?.typeName === "Company" ? "company" : "deal";
  const companyIdField = dataModel?.findFieldByLogicRole(bobjectType === BobjectTypes.Lead ? LEAD_FIELDS_LOGIC_ROLE.COMPANY : OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY)?.id;
  const [relatedCompany, setRelatedCompany] = useState();
  const {
    data: msndynamicdriver
  } = useSWR(hasDynamicIntegration ? `/integrations/manager/drivers/msndynamics` : null, async () => await api.get(`/integrations/manager/drivers/msndynamics`).then((res) => res.data));
  useEffect(() => {
    if (companyIdField && bobject?.rawBobject[companyIdField]) {
      getExtensionBobjectByIdFields({
        typeName: BobjectTypes.Company,
        objectId: bobject?.rawBobject[companyIdField]?.split("/")[2]
      }).then((res) => setRelatedCompany(res?.data));
    }
  }, []);
  function openNoteModal() {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MAIN_NOTE_ICON_FROM_CONTACT_VIEW);
    const bobjectFieldsData = {};
    mainNoteBobject?.data?.fields.forEach((field) => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const activityMainNoteYes = dataModel?.findValueByLogicRole(ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES);
    const isMainNote = bobjectFieldsData[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] === activityMainNoteYes?.id;
    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject: mainNoteBobject?.data,
      extraInfo: {
        lead: bobjectType === "Lead" && {
          ...bobject,
          fullName: bobject?.fullName
        },
        company: bobjectType === "Company" && {
          ...bobject,
          fullName: bobject?.name
        },
        opportunity: bobjectType === "Opportunity" && {
          ...bobject,
          fullName: bobject?.name
        },
        bobjectId: mainNoteBobject?.data?.id?.value,
        originallyMainNote: isMainNote,
        location: "bubble",
        ...bobjectFieldsData
      },
      actionsDisabled
    });
  }
  const handleGoToSalesforce = (e) => {
    if (isLinkedinOrSalesNav(window.location.href)) {
      window.open(`${salesforceInstance}/${bobjectSalesforceId}`, "_blank");
    } else {
      window.open(`${salesforceInstance}/${bobjectSalesforceId}`, e.metaKey || navigator.appVersion.indexOf("Mac") == -1 && e.ctrlKey ? "_blank" : "_self");
    }
  };
  const handleGoToDynamics = (e) => {
    if (msndynamicdriver?.resource) {
      const resource = msndynamicdriver.resource;
      if (isLinkedinOrSalesNav(window.location.href)) {
        window.open(`${resource}/main.aspx?etn=${bobjectDynamicsType}&pagetype=entityrecord&id=%7B${bobjectDynamicsId}%7D`, "_blank");
      } else {
        window.open(`${resource}/main.aspx?etn=${bobjectDynamicsType}&pagetype=entityrecord&id=%7B${bobjectDynamicsId}%7D`, e.metaKey || navigator.appVersion.indexOf("Mac") == -1 && e.ctrlKey ? "_blank" : "_self");
      }
    }
  };
  const handleGoToLinkedin = (e) => {
    if (bobjectLinkedInUrl) {
      if (isLinkedinOrSalesNav(window.location.href)) {
        window.open(addHttpIfNeeded(bobjectLinkedInUrl), e.metaKey || navigator.appVersion.indexOf("Mac") == -1 && e.ctrlKey ? "_blank" : "_self");
      } else {
        window.open(addHttpIfNeeded(bobjectLinkedInUrl), "_blank");
      }
    } else {
      if (isLinkedinOrSalesNav(window.location.href)) {
        window.open("https://linkedin.com/search/results/all/?keywords=" + bobject.name + "&origin=GLOBAL_SEARCH_HEADER&sid=Y5G", "_blank");
      } else {
        window.open("https://linkedin.com/search/results/all/?keywords=" + bobject.name + "&origin=GLOBAL_SEARCH_HEADER&sid=Y5G", "_self");
      }
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.buttonsContainer,
    children: [!isOpportunityBobject && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: bobjectLinkedInUrl ? t("openInLinkedIn", {
        bobjectType: bobjectT(bobjectType.toLowerCase())
      }) : t("searchInLinkedIn", {
        bobjectType: bobjectT(bobjectType.toLowerCase())
      }),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 20,
        name: "linkedin",
        color: bobjectLinkedInUrl ? "bloobirds" : "softPeanut",
        onClick: handleGoToLinkedin
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 199,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 9
    }, void 0), bobjectSalesforceId && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("goToSFDC"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 20,
        name: "salesforceOutlined",
        onClick: handleGoToSalesforce
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 209,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 9
    }, void 0), bobjectDynamicsId && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: "Go to Dynamics 365",
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 20,
        name: "microsoftDynamics",
        onClick: handleGoToDynamics
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 214,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 9
    }, void 0), bobjectHubspotId && hubspotPortalId && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("goToHubspot"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        color: "tangerine",
        size: 20,
        name: "hubspot",
        onClick: (e) => window.open(`https://app.hubspot.com/contacts/${hubspotPortalId}/${hubspotBobjectType}/${bobjectHubspotId}`, e.metaKey || navigator.appVersion.indexOf("Mac") == -1 && e.ctrlKey ? "_blank" : null)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 9
    }, void 0), website && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: website,
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 20,
        name: "timezones",
        onClick: () => window.open(addHttpIfNeeded(website), "_blank")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 236,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 9
    }, void 0), !isOTOAccount && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("openInBB"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 20,
        name: "bloobirds",
        onClick: () => window.open(addHttpIfNeeded(bloobirdsUrl), "_black")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 245,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 9
    }, void 0), mainNote && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: isDisabled ? t("noPermissions") : t("openMainNote"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        color: "banana",
        size: 20,
        name: "note",
        onClick: openNoteModal,
        disabled: isDisabled
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 254,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 9
    }, void 0), hasOpportunities && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.noTooltipIcon,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        color: "peanut",
        size: 20,
        name: "fileOpportunity"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 265,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 9
    }, void 0), (bobjectType === BobjectTypes.Company || bobject?.rawBobject[companyIdField]) && /* @__PURE__ */ _jsxDEV(SimilarDealsButton, {
      bobject,
      relatedCompany
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 189,
    columnNumber: 5
  }, void 0);
};
_s(ContactButtons, "Y+C1W8eEXhwnTBJKDowCbktRv7s=", true, function() {
  return [useContactViewContext, useExtensionContext, useIsOTOAccount, useTranslation, useTranslation, useSWR];
});
_c = ContactButtons;
const SimilarDealsButton = ({
  bobject,
  relatedCompany
}) => {
  _s2();
  const bobjectType = bobject.id.typeName;
  const {
    useGetSettings,
    openExtendedScreen,
    useGetExtendedContext,
    closeExtendedScreen
  } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const isExtendedOpened = extendedContext?.open;
  const settings = useGetSettings();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions.contactButtons"
  });
  const accountId = settings?.account?.id;
  const {
    similarDeals
  } = useSimilarDeals(accountId, bobjectType === BobjectTypes.Company ? bobject?.id.objectId : void 0);
  const showIcon = similarDeals?.length > 0;
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      position: "relative",
      display: "flex"
    },
    children: [showIcon && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("similarWonDeals"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(IconButton, {
        color: "softPeanut",
        size: 20,
        name: "deals",
        onClick: () => {
          if (isExtendedOpened && extendedContext?.type === ExtendedContextTypes.SIMILAR_DEALS) {
            closeExtendedScreen();
          } else {
            openExtendedScreen({
              type: ExtendedContextTypes.SIMILAR_DEALS,
              bobject: bobjectType === BobjectTypes.Company ? bobject : relatedCompany
            });
          }
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 305,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 304,
      columnNumber: 9
    }, void 0), similarDeals?.length > 0 && /* @__PURE__ */ _jsxDEV(SimilarDealsTooltip, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 325,
      columnNumber: 36
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 302,
    columnNumber: 5
  }, void 0);
};
_s2(SimilarDealsButton, "AU94RTivTMD6cqL7GN1WLoTu/KY=", true, function() {
  return [useExtensionContext, useTranslation, useSimilarDeals];
});
_c2 = SimilarDealsButton;
var _c, _c2;
$RefreshReg$(_c, "ContactButtons");
$RefreshReg$(_c2, "SimilarDealsButton");
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
