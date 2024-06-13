import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/idShortcuts/LittleBsInjector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/idShortcuts/LittleBsInjector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/idShortcuts/LittleBsInjector.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDom from "/vendor/.vite-deps-react-dom.js__v--47a99a8e.js"; const ReactDOM = __vite__cjsImport3_reactDom.__esModule ? __vite__cjsImport3_reactDom.default : __vite__cjsImport3_reactDom;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useAllowBLinksInCRM, useDebouncedCallback, useIsB2CAccount, useIsPersonAccountAsAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES, LocalStorageKeys, MessagesEvents, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getSobjectTypeFromId, getTextFromLogicRole, injectReferencedBobjects, isSalesforcePage, isSyncableSobject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport9_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport9_mixpanelBrowser.__esModule ? __vite__cjsImport9_mixpanelBrowser.default : __vite__cjsImport9_mixpanelBrowser;
import normalizeUrl from "/vendor/.vite-deps-normalize-url.js__v--91e5723a.js";
import { v4 as uuid } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { getReferencedBobject } from "/src/utils/bobjects.utils.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/idShortcuts/idShortcuts.module.css.js";
import { extractRecordIdElements, generateBBLink, generateCurrentPage, getShouldProcessMutations } from "/src/content/components/idShortcuts/idShortcuts.utils.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function ButtonsRenderer() {
  _s();
  const [listOfPortalElements, setListOfPortalElements] = useState([]);
  const openedRecordId = useRef(null);
  const openCurrentPageRef = useRef(null);
  const [iframe, setIframe] = useState(null);
  const isDynamics = !!document.location.href.match("^.*://.*.crm4.dynamics.com.*");
  const {
    setCurrentPage,
    setActiveBobject,
    setExtendedContext,
    setCustomPage,
    useGetCurrentPage: useGetCurrentPage2,
    useGetActiveBobject: useGetActiveBobject2,
    addBobjectToHistory,
    setContactViewBobjectId,
    closeExtendedScreen,
    useGetSettings: useGetSettings2
  } = useExtensionContext();
  const {
    createToast
  } = useToasts();
  const currentPage = useGetCurrentPage2();
  const settings = useGetSettings2();
  const activeBobject = useGetActiveBobject2();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const shouldShowAccounts = !isB2CAccount || isPersonAccountAsAccount;
  const {
    t
  } = useTranslation();
  const debouncedExtractNodes = useDebouncedCallback(() => {
    if (isB2CAccount !== null && isPersonAccountAsAccount != null) {
      extractRecordIdElements(document.body, insertBloobirdsLink, shouldShowAccounts, insertActivityBloobirdsLink);
    }
  }, 250, [isB2CAccount, isPersonAccountAsAccount, settings]);
  const debouncedExtractIframeNodes = useDebouncedCallback(() => {
    if (iframe) {
      const iframeDocument = iframe.contentDocument;
      if (iframeDocument) {
        extractRecordIdElements(iframeDocument.body, insertBloobirdsLink, shouldShowAccounts, insertActivityBloobirdsLink);
      }
    }
  }, 250, [isB2CAccount, isPersonAccountAsAccount, iframe]);
  function processBs(mutationsList) {
    const shouldProcessMutations = getShouldProcessMutations(mutationsList);
    if (shouldProcessMutations) {
      debouncedExtractNodes();
    }
  }
  function processReportsBs(mutationsList) {
    const shouldProcessMutations = getShouldProcessMutations(mutationsList);
    if (shouldProcessMutations) {
      debouncedExtractIframeNodes();
    }
  }
  const debouncedProcessBs = useDebouncedCallback((mutationsList) => {
    processBs(mutationsList);
  }, 1e3, []);
  const debouncedProcessReportsBs = useDebouncedCallback((mutationsList) => {
    processReportsBs(mutationsList);
  }, 1e3, []);
  const mutationObserver = useMemo(() => {
    const observer = new MutationObserver((mutationsList) => {
      debouncedProcessBs(mutationsList);
    });
    return observer;
  }, []);
  const mutationObserverReports = useMemo(() => {
    return new MutationObserver((mutationsList) => {
      debouncedProcessReportsBs(mutationsList);
    });
  }, [iframe]);
  useEffect(() => {
    mutationObserver.observe(document.querySelector("div.active") || document.body, {
      childList: true,
      subtree: true
    });
    return () => {
      mutationObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
      mutationObserverReports.observe(iframe.contentDocument?.body, {
        childList: true,
        subtree: true
      });
    }
    return () => {
      mutationObserverReports.disconnect();
    };
  }, [iframe]);
  function updateCurrentPage(recordid, href) {
    let newPage;
    if (isDynamics) {
      newPage = href;
      if (!newPage) {
        const dynamicsUrl = new URL(document.location.href);
        const resource = dynamicsUrl.origin;
        const urlSearchParams = new URLSearchParams(window.location.search);
        const bobjectDynamicsType = urlSearchParams?.get("etn");
        const appId = urlSearchParams?.get("appid");
        newPage = `${resource}/main.aspx?appid=${appId}&etn=${bobjectDynamicsType}&pagetype=entityrecord&id=${recordid}`;
      }
    } else {
      newPage = generateCurrentPage(recordid, getSobjectTypeFromId(recordid));
    }
    const isMenuOpen = localStorage.getItem(LocalStorageKeys.IsMenuOpen);
    if (!recordid || isMenuOpen === "true" && (openedRecordId.current === recordid || currentPage === newPage) || !isSyncableSobject(recordid) && !isDynamics) {
      return;
    }
    openedRecordId.current = recordid;
    if (activeBobject) {
      addBobjectToHistory(activeBobject);
    }
    setCurrentPage(newPage);
    setExtendedContext(null);
    setCustomPage(null);
    setActiveBobject(null);
    const event = new CustomEvent(MessagesEvents.ForceOpenExtension, {
      detail: {
        alwaysOpen: true
      }
    });
    window.dispatchEvent(event);
  }
  openCurrentPageRef.current = updateCurrentPage;
  async function openExtendedActivity(activityId) {
    if (!activityId) {
      closeExtendedScreen();
      setActiveBobject(null);
      setExtendedContext(null);
      createToast({
        message: t("extension.salesforceToasts.activityNotFound"),
        type: "info",
        position: "top-center"
      });
    }
    const bobject = await api.get(`/bobjects/${activityId}/form?injectReferences=true`).then((res) => res.data);
    const activity = injectReferencedBobjects(bobject);
    const referencedBobject = getReferencedBobject(activity);
    const activityType = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
    setContactViewBobjectId(referencedBobject?.id?.value);
    let contextType = void 0;
    switch (activityType) {
      case ACTIVITY_TYPES.MEETING:
        contextType = ExtendedContextTypes.MEETING_DETAILS;
        break;
      case ACTIVITY_TYPES.EMAIL:
        contextType = ExtendedContextTypes.EMAIL_THREAD;
        break;
      case ACTIVITY_TYPES.CALL:
        contextType = ExtendedContextTypes.CALL_DETAILS;
        break;
    }
    setExtendedContext({
      type: contextType,
      bobject: activity
    });
  }
  function insertActivityBloobirdsLink(recordId, button) {
    const bbLink = generateBBLink(recordId, button);
    if (bbLink)
      setListOfPortalElements((prevState) => [...prevState, {
        anchor: bbLink,
        children: /* @__PURE__ */ _jsxDEV("div", {
          onClick: (event) => {
            event.stopPropagation();
            api.post(`/bobjects/${settings?.account?.id}/Activity/search/crm`, {
              crmIds: [recordId],
              crm: "SALESFORCE"
            }).then((response) => {
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SFDC_B_LINK_ + "ACTIVITY");
              window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
                detail: {
                  alwaysOpen: true
                }
              }));
              return openExtendedActivity(response?.data?.[recordId]?.value);
            });
          },
          className: styles.icon,
          style: {
            cursor: "pointer"
          },
          children: [/* @__PURE__ */ _jsxDEV("style", {
            scoped: true,
            children: `
                  svg {
                    fill: #1991ff;
                    stroke: #1991ff;
                  };
                  path {
                    fill: #1991ff;
                    stroke: #1991ff;
                  };
                `
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 299,
            columnNumber: 15
          }, this), /* @__PURE__ */ _jsxDEV(Icon, {
            name: "bloobirds",
            size: 14
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 311,
            columnNumber: 15
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 275,
          columnNumber: 13
        }, this)
      }]);
  }
  async function insertBloobirdsLink(recordId, button) {
    if (!recordId || !button) {
      return;
    }
    const bbLink = generateBBLink(recordId, button);
    const href = button.getAttribute("href");
    if (bbLink)
      ReactDOM.unstable_batchedUpdates(() => {
        setListOfPortalElements((prevState) => [...prevState, {
          anchor: bbLink,
          children: /* @__PURE__ */ _jsxDEV("div", {
            onClick: (event) => {
              event.stopPropagation();
              const sobjectType = getSobjectTypeFromId(recordId);
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SFDC_B_LINK_ + sobjectType?.toUpperCase());
              openCurrentPageRef.current(recordId, href);
            },
            className: styles.icon,
            style: {
              cursor: "pointer",
              marginBottom: isDynamics ? "2px" : "0"
            },
            children: [!isDynamics && /* @__PURE__ */ _jsxDEV("style", {
              scoped: true,
              children: `
                svg {
                  fill: #1991ff;
                  stroke: #1991ff;
                };
                path {
                  fill: #1991ff;
                  stroke: #1991ff;
                };
              `
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 347,
              columnNumber: 19
            }, this), /* @__PURE__ */ _jsxDEV(Icon, {
              name: "bloobirds",
              size: 14
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 360,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 334,
            columnNumber: 15
          }, this)
        }]);
      });
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isB2CAccount === null || isPersonAccountAsAccount === null) {
        return;
      }
      extractRecordIdElements(document.body, insertBloobirdsLink, shouldShowAccounts, insertActivityBloobirdsLink);
      const iframe2 = document.querySelector('iframe[title="Report Viewer"]');
      setIframe(iframe2);
      if (iframe2) {
        const iframeDocument = iframe2.contentDocument;
        if (iframeDocument) {
          extractRecordIdElements(iframeDocument.body, insertBloobirdsLink, shouldShowAccounts, insertActivityBloobirdsLink);
        }
      }
    }, 1e3);
    return () => {
      clearTimeout(timer);
    };
  }, [isB2CAccount, isPersonAccountAsAccount]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: listOfPortalElements.map((element) => {
      return ReactDOM.createPortal(element.children, element.anchor);
    })
  }, void 0, false);
}
_s(ButtonsRenderer, "BOWr6YylgFXhFNvVAq6q16j13aM=", false, function() {
  return [useExtensionContext, useToasts, useGetCurrentPage, useGetSettings, useGetActiveBobject, useIsB2CAccount, useIsPersonAccountAsAccount, useTranslation, useDebouncedCallback, useDebouncedCallback, useDebouncedCallback, useDebouncedCallback];
});
_c = ButtonsRenderer;
function LittleBsInjector() {
  _s2();
  const [utabId, setUtabId] = useState(null);
  const accountId = useActiveAccountId();
  const url = normalizeUrl(window.location.href);
  const allowBLinksInCRM = useAllowBLinksInCRM(accountId);
  const {
    useGetLoggedIn: useGetLoggedIn2
  } = useExtensionContext();
  const loggedIn = useGetLoggedIn2();
  const isDynamics = !!document.location.href.match("^.*://.*.crm4.dynamics.com.*");
  useEffect(() => {
    function chromeTabListener(request) {
      if (request.message === "TAB_UPDATED") {
        setUtabId(uuid());
      }
    }
    chrome?.runtime?.onMessage.addListener(chromeTabListener);
    return () => {
      chrome?.runtime?.onMessage.removeListener(chromeTabListener);
    };
  }, []);
  if (!loggedIn) {
    return null;
  }
  if (isDynamics) {
    return /* @__PURE__ */ _jsxDEV(ButtonsRenderer, {}, utabId || "first-render", false, {
      fileName: _jsxFileName,
      lineNumber: 440,
      columnNumber: 12
    }, this);
  } else if (isSalesforcePage(url) && allowBLinksInCRM) {
    return /* @__PURE__ */ _jsxDEV(ButtonsRenderer, {}, utabId || "first-render", false, {
      fileName: _jsxFileName,
      lineNumber: 443,
      columnNumber: 12
    }, this);
  }
  return null;
}
_s2(LittleBsInjector, "tWzCGAsI9/V86KPPL9jjkV70ejo=", false, function() {
  return [useActiveAccountId, useAllowBLinksInCRM, useExtensionContext, useGetLoggedIn];
});
_c2 = LittleBsInjector;
export default LittleBsInjector;
var _c, _c2;
$RefreshReg$(_c, "ButtonsRenderer");
$RefreshReg$(_c2, "LittleBsInjector");
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
