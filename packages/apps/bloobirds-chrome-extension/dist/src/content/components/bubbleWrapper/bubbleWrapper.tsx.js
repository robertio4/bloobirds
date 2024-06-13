import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/bubbleWrapper/bubbleWrapper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bubbleWrapper/bubbleWrapper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bubbleWrapper/bubbleWrapper.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDraggable from "/vendor/.vite-deps-react-draggable.js__v--b0baa450.js"; const Draggable = __vite__cjsImport3_reactDraggable.__esModule ? __vite__cjsImport3_reactDraggable.default : __vite__cjsImport3_reactDraggable;
import { Dialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-index.tsx.js";
import { useAircallPhoneLinkEnabled, useBobjectRefresh, useLocalStorage, useReminders, useSalesforceLeftBarEnabled, useSessionStorage, useWhatsappEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { MIXPANEL_EVENTS, MessagesEvents, LocalStorageKeys, SessionStorageKeys, SidepeekState, ACTIVITY_TYPES, ACTIVITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getExtensionBobjectByIdFields, getSobjectTypeFromId, getTextFromLogicRole, isWhatsAppPage, api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport8_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const classNames = __vite__cjsImport8_classnames.__esModule ? __vite__cjsImport8_classnames.default : __vite__cjsImport8_classnames;
import __vite__cjsImport9_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport9_mixpanelBrowser.__esModule ? __vite__cjsImport9_mixpanelBrowser.default : __vite__cjsImport9_mixpanelBrowser;
import normalizeUrl from "/vendor/.vite-deps-normalize-url.js__v--91e5723a.js";
import { useSWRConfig } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useBubblePosition } from "/src/hooks/useBubblePosition.tsx.js";
import { useSalesforceLayerEnabled, useSalesforceSyncListEnabled } from "/src/hooks/useFeatureFlag.ts.js";
import useWhatsapp from "/src/hooks/useWhatsapp.tsx.js";
import { Actions } from "/src/types/messages.ts.js";
import { moveMsgElement, moveSFDCButtonsElement } from "/src/utils/bubbleWrapper.utils.ts.js";
import { isLinkedInProfilePage, isLinkedinSettingsPage, isSalesforceListPage, isSalesforcePage, isSalesNavigatorProfile, shouldInjectSalesforce } from "/src/utils/url.ts.js";
import styles from "/src/content/components/app.module.css.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import FloatingIcon from "/src/content/components/floatingIcon/floatingIcon.tsx.js";
import FloatingMenu from "/src/content/components/floatingMenu/floatingMenu.tsx.js";
import { FloatingMenuProvider } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const BubbleWrapper = () => {
  _s();
  const {
    useGetLoggedIn,
    useGetSettings,
    setCurrentPage,
    useGetCurrentPage,
    setActiveBobject,
    useGetActiveBobject,
    updateActiveBobject,
    setExtendedContext,
    launchBobjectSideEffects,
    useGetSidePeekEnabled,
    setCustomPage,
    refreshActiveBobjectContext,
    setContactViewBobjectId,
    setForcedActiveSubTab,
    setNoMatchFound,
    useGetActiveBobjectContext
  } = useExtensionContext();
  const loggedIn = useGetLoggedIn();
  const {
    get,
    set
  } = useLocalStorage();
  const [isMenuOpen, setIsMenuOpen] = useState(window.location.href.includes("bb-open") || get(LocalStorageKeys.IsMenuOpen));
  useReminders({
    setViewBobjectId: setContactViewBobjectId
  });
  const [dragging, setDragging] = useState(false);
  const sidePeekEnabled = useGetSidePeekEnabled();
  const url = normalizeUrl(window.location.href);
  const {
    position,
    bounds,
    setPosition,
    width
  } = useBubblePosition();
  const [shownInCurrentPage, setShownInCurrentPage] = useState(false);
  const settings = useGetSettings();
  const activeBobjectContext = useGetActiveBobjectContext();
  const isSalesforceEnabled = useSalesforceLeftBarEnabled(settings?.account?.id);
  const currentPage = useGetCurrentPage();
  const activeBobject = useGetActiveBobject();
  const isSalesforceLayerActive = useSalesforceLayerEnabled();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const hasWhatsappEnabled = useWhatsappEnabled(settings?.account?.id);
  const {
    remove
  } = useSessionStorage();
  const isSalesforceList = isSalesforceListPage(currentPage);
  const isSalesforceSyncListEnabled = useSalesforceSyncListEnabled();
  const syncBBButtonsRendered = isSalesforceSyncListEnabled && isSalesforceList;
  useWhatsapp(isMenuOpen, sidePeekEnabled, !!document.getElementById("vepaar-app"), hasWhatsappEnabled);
  const handleMenuClose = () => {
    setIsMenuOpen(false);
    set("sidepeekState", SidepeekState.UserMinimized);
  };
  const updateBobject = async () => {
    const newBobject = await getExtensionBobjectByIdFields(activeBobject?.id);
    if (newBobject?.data)
      updateActiveBobject(newBobject.data);
  };
  useBobjectRefresh(activeBobject?.id?.value, activeBobject?.id?.typeName, updateBobject);
  const launchActiveBobjectSideEffects = async (e) => {
    const bobjectType = e.detail?.type;
    launchBobjectSideEffects(bobjectType);
    if (activeBobject) {
      if (bobjectType !== activeBobject?.id?.typeName) {
        refreshActiveBobjectContext();
        launchBobjectSideEffects(activeBobject?.id?.typeName);
      } else {
        const newBobject = await getExtensionBobjectByIdFields(activeBobject?.id);
        if (newBobject?.data)
          setActiveBobject(newBobject.data);
      }
    } else if (bobjectType) {
      launchBobjectSideEffects(bobjectType);
    }
  };
  useEffect(() => {
    window.addEventListener(MessagesEvents.ActiveBobjectUpdated, launchActiveBobjectSideEffects);
    return () => {
      window.removeEventListener(MessagesEvents.ActiveBobjectUpdated, launchActiveBobjectSideEffects);
    };
  }, [activeBobject?.id?.value]);
  const updateSubTab = (e) => {
    const subTab = e.detail?.subTab;
    if (subTab) {
      setForcedActiveSubTab(subTab);
    }
  };
  useEffect(() => {
    window.addEventListener(MessagesEvents.SubTabUpdated, updateSubTab);
    return () => {
      window.removeEventListener(MessagesEvents.SubTabUpdated, updateSubTab);
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (isLinkedInProfilePage(currentPage) || isSalesforcePage(currentPage) || isSalesNavigatorProfile(currentPage)) {
        if (get("isMenuOpen") === null) {
          setIsMenuOpen(true);
        }
      }
    }, 2e3);
  }, []);
  const openExtension = async (e) => {
    const bobjectId = e.detail?.bobjectId;
    const source = e.detail?.source;
    const bobjects = e.detail?.bobjects;
    const info = e.detail?.info;
    const resetAll = e.detail?.resetAll;
    const avoidRefreshBobjectFromContext = e.detail?.avoidRefreshBobjectFromContext;
    const matchesContext = activeBobjectContext?.bobjectIds?.includes(bobjectId);
    const alwaysOpen = e.detail?.alwaysOpen;
    const closeExtension = !!e.detail?.close;
    if (closeExtension) {
      setIsMenuOpen(false);
      return;
    }
    if (!shownInCurrentPage || alwaysOpen) {
      setIsMenuOpen(true);
    }
    setShownInCurrentPage(true);
    if (source && !bobjectId && Array.isArray(bobjects)) {
      setNoMatchFound({
        source,
        bobjects,
        info
      });
    } else if (bobjectId) {
      if (avoidRefreshBobjectFromContext && matchesContext) {
        return;
      }
      setContactViewBobjectId(bobjectId);
    } else if (resetAll) {
      setContactViewBobjectId(null);
    }
  };
  useEffect(() => {
    window.addEventListener(MessagesEvents.ForceOpenExtension, openExtension);
    return () => {
      window.removeEventListener(MessagesEvents.ForceOpenExtension, openExtension);
    };
  }, [activeBobjectContext?.bobjectIds?.length]);
  useEffect(() => {
    window.addEventListener(MessagesEvents.UrlNotFound, openExtension);
    return () => {
      window.removeEventListener(MessagesEvents.UrlNotFound, openExtension);
    };
  }, []);
  useEffect(() => {
    set(LocalStorageKeys.IsMenuOpen, isMenuOpen);
  }, [isMenuOpen]);
  useEffect(() => {
    moveMsgElement(isMenuOpen && sidePeekEnabled);
  }, [isMenuOpen, sidePeekEnabled]);
  useEffect(() => {
    moveSFDCButtonsElement(isMenuOpen && sidePeekEnabled && loggedIn, syncBBButtonsRendered);
  }, [isMenuOpen, sidePeekEnabled, loggedIn, url]);
  const setActiveBobjectFromUrl = (message) => {
    if (message.type === Actions.HistoryUpdate || message.message === Actions.TabUpdate) {
      const url2 = normalizeUrl(window.location.href);
      if (url2 !== currentPage) {
        setShownInCurrentPage(false);
        setTimeout(() => {
          setCurrentPage(url2);
          setActiveBobject(null);
          setExtendedContext(null);
          setCustomPage(null);
        }, 250);
      }
    }
  };
  useEffect(() => {
    chrome?.runtime?.onMessage.addListener(setActiveBobjectFromUrl);
    return () => {
      chrome?.runtime?.onMessage.removeListener(setActiveBobjectFromUrl);
    };
  }, [currentPage]);
  useEffect(() => {
    remove(SessionStorageKeys.ActiveTab);
    remove(SessionStorageKeys.ActiveSubTab);
  }, [activeBobject?.id?.value]);
  const isSalesforce = isSalesforcePage(currentPage);
  if (isSalesforce && !loggedIn) {
    return null;
  }
  if (isSalesforce && !isSalesforceEnabled) {
    return null;
  }
  if (isLinkedinSettingsPage(currentPage)) {
    return null;
  }
  if (isSalesforce && !shouldInjectSalesforce(currentPage)) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classNames(styles.container, {
      [styles.dragging]: dragging
    }),
    children: [isSalesforceLayerActive && !hasAircallPhoneLinkEnabled && /* @__PURE__ */ _jsxDEV(Dialer, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 66
    }, void 0), position && /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(FloatingIcon, {
        visible: !isMenuOpen,
        onClick: () => {
          if (sidePeekEnabled) {
            mixpanel.track(MIXPANEL_EVENTS.MAXIMIZE_SIDEPEEK_VIEW);
          } else {
            mixpanel.track(MIXPANEL_EVENTS.MAXIMIZE_BUBBLE_VIEW);
          }
          setIsMenuOpen(true);
          set("sidepeekState", SidepeekState.UserMaximized);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 295,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Draggable, {
        handle: "#bb-handle",
        bounds,
        position,
        onStart: () => {
          setDragging(true);
        },
        onStop: (e, data) => {
          setDragging(false);
          setPosition({
            x: data.x,
            y: data.y
          });
        },
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.content,
          children: !sidePeekEnabled && /* @__PURE__ */ _jsxDEV(FloatingMenuWrapper, {
            visible: isMenuOpen,
            dragging,
            onClose: handleMenuClose,
            position,
            url
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 323,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 321,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 309,
        columnNumber: 11
      }, void 0), sidePeekEnabled && /* @__PURE__ */ _jsxDEV(FloatingMenuWrapper, {
        visible: isMenuOpen,
        dragging: false,
        onClose: handleMenuClose,
        position,
        width,
        url
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 335,
        columnNumber: 13
      }, void 0)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 286,
    columnNumber: 5
  }, void 0);
};
_s(BubbleWrapper, "dsS5yelwEVJeNGyDx0GxLljBrHY=", true, function() {
  return [useExtensionContext, useLocalStorage, useReminders, useBubblePosition, useSalesforceLeftBarEnabled, useSalesforceLayerEnabled, useAircallPhoneLinkEnabled, useWhatsappEnabled, useSessionStorage, useSalesforceSyncListEnabled, useWhatsapp, useBobjectRefresh];
});
_c = BubbleWrapper;
const FloatingMenuWrapper = (props) => {
  _s2();
  const {
    position
  } = props;
  const {
    setActiveBobject,
    setExtendedContext,
    setIsLoading,
    useGetSalesforceSyncMutate,
    updateActiveBobject
  } = useExtensionContext();
  const salesforceSyncMutate = useGetSalesforceSyncMutate();
  const {
    get
  } = useLocalStorage();
  const {
    mutate
  } = useSWRConfig();
  const onRefresh = async (activeBobject) => {
    setIsLoading(!!salesforceSyncMutate);
    if (activeBobject?.salesforceId) {
      const sobjectId = activeBobject?.salesforceId;
      const sobjectType = getSobjectTypeFromId(sobjectId);
      setIsLoading(true);
      await api.get(`/utils/service/salesforce/resync/${sobjectType}/${sobjectId}`, {});
      setIsLoading(false);
      mutate(`/utils/service/salesforce/related/${sobjectType}/${sobjectId}`);
    }
    if (isWhatsAppPage() && activeBobject) {
      updateActiveBobject(activeBobject);
    } else {
      setActiveBobject(null);
    }
    setExtendedContext(null);
    if (salesforceSyncMutate && typeof salesforceSyncMutate === "function")
      salesforceSyncMutate().then(() => setIsLoading(false));
  };
  chrome?.storage?.sync?.get("activityId", ({
    activityId
  }) => {
    if (activityId) {
      api.get(`/bobjects/${activityId}/form`).then((res) => {
        if (res.data) {
          const activity = res.data;
          const activityType = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
          let contextType = void 0;
          switch (activityType) {
            case ACTIVITY_TYPES.MEETING:
              contextType = ExtendedContextTypes.MEETING_DETAILS;
              break;
            case ACTIVITY_TYPES.CALL:
              contextType = ExtendedContextTypes.CALL_DETAILS;
              break;
          }
          setExtendedContext({
            type: contextType,
            bobject: activity
          });
          setTimeout(() => {
            chrome?.storage?.sync?.set({
              activityId: ""
            });
          }, 1e3);
        }
      });
    }
  });
  const initialContext = {
    isHome: false,
    onRefresh,
    history: [],
    goBack: void 0,
    showBackButton: false,
    lastVisitedBobjects: get(LocalStorageKeys.LastVisitedBobjects) || [],
    position,
    customPage: null,
    meta: null,
    isDuplicatePage: false
  };
  return /* @__PURE__ */ _jsxDEV(FloatingMenuProvider, {
    value: initialContext,
    children: /* @__PURE__ */ _jsxDEV(FloatingMenu, {
      ...props
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 432,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 431,
    columnNumber: 5
  }, void 0);
};
_s2(FloatingMenuWrapper, "BK7mgVFrOpErWh+uIQB7/DUzs9s=", true, function() {
  return [useExtensionContext, useLocalStorage, useSWRConfig];
});
_c2 = FloatingMenuWrapper;
var _c, _c2;
$RefreshReg$(_c, "BubbleWrapper");
$RefreshReg$(_c2, "FloatingMenuWrapper");
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
