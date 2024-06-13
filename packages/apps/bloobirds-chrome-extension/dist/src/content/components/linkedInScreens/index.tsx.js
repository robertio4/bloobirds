import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/linkedInScreens/index.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/index.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/index.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useIsB2CAccount, useIsPersonAccountAsAccount, useLocalStorage, useObjectCreationSettings, useSalesforceDataModel, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { MessagesEvents, SidepeekState, UserHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getMainSalesforceObjectFromURL, getSalesforceObjectFromWSParam, isDynamicsPage, isLeadOrContactSalesforcePage, isLinkedInMessagesPage, isLinkedInProfilePage, isSalesforceAccountPage, isSalesforceCasePage, isSalesforceOpportunityPage, isSalesforcePage, isSalesNavigatorMessagesPage, isSalesNavigatorProfile, isTaskOrEventSalesforcePage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useSalesforceLayerEnabled } from "/src/hooks/useFeatureFlag.ts.js";
import { isListOrSetupPage } from "/src/utils/url.ts.js";
import { ContactView } from "/src/content/components/contactView/contactView.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { DynamicsPage } from "/src/content/components/dynamicsAccountPage/dynamicsAccountPage.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import MinimizableModals from "/src/content/components/minimizabeModals/minimizableModals.tsx.js";
import NoContextPage from "/src/content/components/noContextPage/noContextPage.tsx.js";
import { RelateSalesforceUserPage } from "/src/content/components/relateSalesforceUserPage/relateSalesforceUserPage.tsx.js";
import { SalesforceAccountPage } from "/src/content/components/salesforceAccountPage/salesforceAccountPage.tsx.js";
import { SalesforceCasePage } from "/src/content/components/salesforceCasePage/salesforceCasePage.tsx.js";
import { SalesforceLeadOrContactPage } from "/src/content/components/salesforceLeadOrContactPage/salesforceLeadOrContactPage.tsx.js";
import { SalesforceObjectPage } from "/src/content/components/salesforceObjectPage/salesforceObjectPage.tsx.js";
import { SalesforceOpportunityPage } from "/src/content/components/salesforceOpportunityPage/salesforceOpportunityPage.tsx.js";
import { SalesforceTaskOrEventPage } from "/src/content/components/salesforceTaskOrEventPage/salesforceTaskOrEventPage.tsx.js";
import { WhatsappDuplicates } from "/src/content/components/whatsappRenderer/layouts/whatsappduplicates/whatsappDuplicates.tsx.js";
import LeadCaptureSettings from "/src/content/components/linkedInScreens/leadCaptureSettings.tsx.js";
import MessagesInfo from "/src/content/components/linkedInScreens/messagesSynced.tsx.js";
import NavigateMessage from "/src/content/components/linkedInScreens/navigateMessage.tsx.js";
import ProfileForm from "/src/content/components/linkedInScreens/profileForm.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SalesforcePages = {
  Lead: /* @__PURE__ */ _jsxDEV(SalesforceLeadOrContactPage, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 9
  }, void 0),
  Contact: /* @__PURE__ */ _jsxDEV(SalesforceLeadOrContactPage, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 57,
    columnNumber: 12
  }, void 0),
  Account: /* @__PURE__ */ _jsxDEV(SalesforceAccountPage, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 12
  }, void 0),
  Opportunity: /* @__PURE__ */ _jsxDEV(SalesforceOpportunityPage, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 59,
    columnNumber: 16
  }, void 0)
};
const DynamicsPages = ({
  info
}) => {
  switch (info.entity) {
    case "lead":
      return /* @__PURE__ */ _jsxDEV(ProfileForm, {
        info
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 14
      }, void 0);
    case "contact":
      return /* @__PURE__ */ _jsxDEV(ProfileForm, {
        info
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 14
      }, void 0);
    case "account":
      return /* @__PURE__ */ _jsxDEV(DynamicsPage, {
        info
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 14
      }, void 0);
    case "opportunity":
      return /* @__PURE__ */ _jsxDEV(DynamicsPage, {
        info
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 14
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 14
      }, void 0);
  }
};
_c = DynamicsPages;
const DynamicsScreens = () => {
  _s();
  const {
    useGetCurrentPage: useGetCurrentPage2
  } = useExtensionContext();
  const currentPage = useGetCurrentPage2();
  const urlParams = new URLSearchParams(currentPage);
  const entity = urlParams.get("etn");
  const id = urlParams.get("id");
  if (!id) {
    return /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(DynamicsPages, {
    info: {
      entity,
      id
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 86,
    columnNumber: 10
  }, void 0);
};
_s(DynamicsScreens, "brLAKAan7cltaWyhwT2E8CjFhsU=", true, function() {
  return [useExtensionContext];
});
_c2 = DynamicsScreens;
const syncableSobjects = (isB2CAccount, isPersonAccountAsAccount) => ["Lead", "Contact", "Opportunity", ...isB2CAccount && !isPersonAccountAsAccount ? [] : ["Account"]];
const SalesforceScreens = () => {
  _s2();
  const {
    useGetSettings,
    useGetCurrentPage: useGetCurrentPage2
  } = useExtensionContext();
  const settings = useGetSettings();
  const currentPage = useGetCurrentPage2();
  const isLeadOrContactPage = isLeadOrContactSalesforcePage(currentPage);
  const isAccountPage = isSalesforceAccountPage(currentPage);
  const sfdcDataModel = useSalesforceDataModel();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const {
    get,
    set
  } = useLocalStorage();
  const isMenuOpen = get("isMenuOpen");
  const sidepeekState = get("sidepeekState");
  const userHasSalesforceUserRelated = sfdcDataModel?.mappedUsers?.find((mappedUser) => mappedUser?.bloobirdsUserId === settings?.user?.id);
  const isOpportunityPage = isSalesforceOpportunityPage(currentPage);
  const isTaskOrEventPage = isTaskOrEventSalesforcePage(currentPage);
  const isCasePage = isSalesforceCasePage(currentPage);
  useEffect(() => {
    if (sidepeekState == SidepeekState.UserMaximized) {
      set("sidepeekState", SidepeekState.InitialState);
    }
  }, [currentPage]);
  const tryToOpenExtension = () => {
    if (isMenuOpen != "undefined" && !isMenuOpen && sidepeekState != SidepeekState.UserMinimized) {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
        detail: {
          alwaysOpen: true
        }
      }));
    }
  };
  const tryToCloseExtension = () => {
    if (isMenuOpen != "undefined" && isMenuOpen && sidepeekState != SidepeekState.UserMaximized) {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
        detail: {
          close: true
        }
      }));
    }
  };
  if (!sfdcDataModel.accountId) {
    return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 12
    }, void 0);
  }
  const isMainObjectPage = isLeadOrContactPage || isAccountPage || isOpportunityPage;
  const mainSobjectFromURL = getMainSalesforceObjectFromURL(currentPage);
  const secondarySobjectFromURL = getSalesforceObjectFromWSParam(currentPage);
  let componentToRender;
  if (sfdcDataModel && !userHasSalesforceUserRelated) {
    componentToRender = {
      component: /* @__PURE__ */ _jsxDEV(RelateSalesforceUserPage, {
        onSave: () => sfdcDataModel?.mutate()
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 18
      }, void 0),
      screenKey: "RelateSalesforceUserPage"
    };
  } else if (syncableSobjects(isB2CAccount, isPersonAccountAsAccount).includes(mainSobjectFromURL) && isMainObjectPage) {
    componentToRender = {
      component: SalesforcePages[mainSobjectFromURL],
      screenKey: "SalesforcePages"
    };
  } else if (syncableSobjects(isB2CAccount, isPersonAccountAsAccount).includes(secondarySobjectFromURL) && isMainObjectPage) {
    componentToRender = {
      component: SalesforcePages[secondarySobjectFromURL],
      screenKey: "SalesforcePages"
    };
  } else if (isTaskOrEventPage) {
    componentToRender = {
      component: /* @__PURE__ */ _jsxDEV(SalesforceTaskOrEventPage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 18
      }, void 0),
      screenKey: "SalesforceTaskOrEventPage"
    };
  } else if (isCasePage) {
    componentToRender = {
      component: /* @__PURE__ */ _jsxDEV(SalesforceCasePage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 177,
        columnNumber: 38
      }, void 0),
      screenKey: "SalesforceCasePage"
    };
  } else if (!isListOrSetupPage(currentPage)) {
    componentToRender = {
      component: /* @__PURE__ */ _jsxDEV(SalesforceObjectPage, {
        closeExtensionCallback: tryToCloseExtension,
        openExtensionCallback: tryToOpenExtension
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 181,
        columnNumber: 9
      }, void 0),
      screenKey: "SalesforceObjectPage"
    };
  } else {
    componentToRender = {
      component: /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 189,
        columnNumber: 38
      }, void 0),
      screenKey: "NoContextPage"
    };
  }
  if (componentToRender?.screenKey) {
    if (componentToRender?.screenKey == "NoContextPage") {
      tryToCloseExtension();
    } else if (componentToRender?.screenKey != "SalesforceObjectPage") {
      tryToOpenExtension();
    }
  }
  return componentToRender?.component;
};
_s2(SalesforceScreens, "ObeIfj9Se9IkJm+LXC3eqEtNoUY=", true, function() {
  return [useExtensionContext, useSalesforceDataModel, useIsB2CAccount, useIsPersonAccountAsAccount, useLocalStorage];
});
_c3 = SalesforceScreens;
export default _s3(() => {
  _s3();
  const {
    useGetCurrentPage: useGetCurrentPage2,
    useGetActiveBobject: useGetActiveBobject2,
    useGetIsLoading: useGetIsLoading2,
    useGetNoMatchFound: useGetNoMatchFound2,
    useGetIsSettings: useGetIsSettings2
  } = useExtensionContext();
  const {
    getIsHome
  } = useFloatingMenuContext();
  const currentPage = useGetCurrentPage2();
  const isLoading = useGetIsLoading2();
  const isSettings = useGetIsSettings2();
  const isHome = getIsHome();
  const activeBobject = useGetActiveBobject2();
  const isProfile = isLinkedInProfilePage(currentPage) || isSalesNavigatorProfile(currentPage);
  const noMatchFound = useGetNoMatchFound2();
  const isMessaging = isLinkedInMessagesPage(currentPage) || isSalesNavigatorMessagesPage(currentPage);
  const isEmpty = !currentPage;
  const {
    save,
    helpers
  } = useUserHelpers();
  const {
    enabledObjectCreation
  } = useObjectCreationSettings();
  useEffect(() => {
    if (helpers)
      save(UserHelperKeys.DOWNLOAD_CHROME_EXTENSION);
  }, [helpers]);
  const isSalesforce = isSalesforcePage(currentPage);
  const isDynamics = isDynamicsPage(currentPage);
  const isSalesforceLayerActive = useSalesforceLayerEnabled();
  const getComponent = () => {
    if (isSettings) {
      return /* @__PURE__ */ _jsxDEV(LeadCaptureSettings, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 236,
        columnNumber: 14
      }, void 0);
    }
    if (noMatchFound?.source === "WHATSAPP" || noMatchFound?.source === "LEFTBAR") {
      if (noMatchFound?.bobjects.length === 0) {
        if (enabledObjectCreation) {
          return /* @__PURE__ */ _jsxDEV(ProfileForm, {
            info: noMatchFound.info
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 241,
            columnNumber: 18
          }, void 0);
        } else {
          return /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 243,
            columnNumber: 18
          }, void 0);
        }
      }
      return /* @__PURE__ */ _jsxDEV(WhatsappDuplicates, {
        bobjects: noMatchFound?.bobjects
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 246,
        columnNumber: 14
      }, void 0);
    }
    if (isHome) {
      return isSalesforceLayerActive ? /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 249,
        columnNumber: 40
      }, void 0) : /* @__PURE__ */ _jsxDEV(NavigateMessage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 249,
        columnNumber: 60
      }, void 0);
    }
    if (isLoading) {
      return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 252,
        columnNumber: 14
      }, void 0);
    }
    if (activeBobject) {
      return /* @__PURE__ */ _jsxDEV(ContactView, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 255,
        columnNumber: 14
      }, void 0);
    }
    if (isDynamics) {
      return /* @__PURE__ */ _jsxDEV(DynamicsScreens, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 258,
        columnNumber: 14
      }, void 0);
    }
    if (isSalesforce) {
      return /* @__PURE__ */ _jsxDEV(SalesforceScreens, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 263,
        columnNumber: 14
      }, void 0);
    } else if (isProfile) {
      return /* @__PURE__ */ _jsxDEV(ProfileForm, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 265,
        columnNumber: 14
      }, void 0);
    } else if (isMessaging) {
      return /* @__PURE__ */ _jsxDEV(MessagesInfo, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 267,
        columnNumber: 14
      }, void 0);
    } else if (isEmpty) {
      return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 269,
        columnNumber: 14
      }, void 0);
    } else {
      return isSalesforceLayerActive ? /* @__PURE__ */ _jsxDEV(NoContextPage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 40
      }, void 0) : /* @__PURE__ */ _jsxDEV(NavigateMessage, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 60
      }, void 0);
    }
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(MinimizableModals, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 277,
      columnNumber: 7
    }, void 0), getComponent()]
  }, void 0, true);
}, "SWlMa+9m0zwh4TZGulN9+0/pGTE=", false, function() {
  return [useExtensionContext, useFloatingMenuContext, useGetCurrentPage, useGetIsLoading, useGetIsSettings, useGetActiveBobject, useGetNoMatchFound, useUserHelpers, useObjectCreationSettings, useSalesforceLayerEnabled];
});
var _c, _c2, _c3;
$RefreshReg$(_c, "DynamicsPages");
$RefreshReg$(_c2, "DynamicsScreens");
$RefreshReg$(_c3, "SalesforceScreens");
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
