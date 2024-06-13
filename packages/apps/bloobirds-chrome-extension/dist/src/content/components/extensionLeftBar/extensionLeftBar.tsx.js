import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/extensionLeftBar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/extensionLeftBar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/extensionLeftBar.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport2_react["useCallback"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useEvent } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { useSalesforceLeftBarEnabled, useSessionStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { MessagesEvents, SalesforceTabs, SessionStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { isElementLoaded, isLoggedIn } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport7_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const classNames = __vite__cjsImport7_classnames.__esModule ? __vite__cjsImport7_classnames.default : __vite__cjsImport7_classnames;
import { AnimatePresence, motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import Tabs, { LeftBarFooter } from "/src/content/components/extensionLeftBar/components/tabs.tsx.js";
import ExtensionLeftBarContent from "/src/content/components/extensionLeftBar/components/views/views.tsx.js";
import styles from "/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js";
import { getSelector, getStyle, setPadding } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default function ExtensionLeftBar({
  url
}) {
  _s();
  const {
    useGetLoggedIn,
    useGetSettings,
    useGetDataModel
  } = useExtensionContext();
  const loggedIn = useGetLoggedIn();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const [open, setOpen] = useState(true);
  const [dimensions, setDimensions] = useState(getStyle(url, true, open));
  const mainContent = document.getElementById("content-main");
  const minimizableModalsContainer = document.querySelector("div.oneUtilityBarContainer");
  const {
    setIsCollapsedLeftBar,
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  const {
    set,
    get
  } = useSessionStorage();
  const [openTab, setOpenTab] = useState(false);
  const isSalesforceLeftBarEnabled = useSalesforceLeftBarEnabled(settings?.account?.id);
  const observer = new MutationObserver(() => {
    setPadding(open, window.location.href);
  });
  const config = {
    childList: true,
    subtree: true
  };
  const openLeftBar = async (e) => {
    const tabSelected = e.detail?.tab;
    setCurrentTab(tabSelected || SalesforceTabs.TASKS);
    setOpenTab(true);
    setOpen(true);
  };
  useEffect(() => {
    if (mainContent) {
      observer.observe(mainContent, config);
    } else if (minimizableModalsContainer) {
      observer.observe(minimizableModalsContainer, config);
    } else {
      observer.disconnect();
    }
    return () => observer.disconnect();
  }, [mainContent, minimizableModalsContainer, url]);
  useEffect(() => {
    setCurrentTab(get(SessionStorageKeys.CurrentTab) || "");
    setOpen(get(SessionStorageKeys.BarStatus) !== "closed");
    window.addEventListener(MessagesEvents.OpenLeftBarTab, openLeftBar);
    return () => window.removeEventListener(MessagesEvents.OpenLeftBarTab, openLeftBar);
  }, []);
  const isLogged = useCallback(() => {
    isLoggedIn().then((isLogged2) => {
      const selector = getSelector(url);
      isElementLoaded(selector).then(() => {
        if (isSalesforceLeftBarEnabled) {
          setPadding(isLogged2 && get(SessionStorageKeys.BarStatus) !== "closed", url);
        }
      });
    });
  }, [isSalesforceLeftBarEnabled]);
  useEffect(() => {
    isLogged();
    window.addEventListener(MessagesEvents.UserLoggedIn, () => {
      isLogged();
    });
    window.addEventListener(MessagesEvents.UserLoggedOut, () => {
      isLogged();
    });
  }, [isSalesforceLeftBarEnabled]);
  useEffect(() => {
    if (loggedIn && isSalesforceLeftBarEnabled) {
      setPadding(open, url);
      setIsCollapsedLeftBar(!open);
    }
  }, [open, loggedIn]);
  useEffect(() => {
    set(SessionStorageKeys.BarStatus, open ? "open" : "closed");
    set(SessionStorageKeys.CurrentTab, currentTab || "");
  }, [open, currentTab]);
  useEffect(() => {
    if (currentTab && currentTab !== SalesforceTabs.TOOLTIP) {
      setOpenTab(true);
    } else {
      setOpenTab(false);
    }
  }, [currentTab]);
  useEvent("resize", () => {
    setDimensions(getStyle(url, true, open));
  });
  const onToggle = () => {
    if (openTab) {
      setCurrentTab(null);
    } else {
      setOpen(!open);
    }
  };
  const leftBarStyles = classNames(styles.leftBar, {
    [styles.leftBarCollapsed]: !open
  });
  if (loggedIn && isSalesforceLeftBarEnabled && dataModel) {
    return /* @__PURE__ */ _jsxDEV("div", {
      className: styles.root,
      onClick: () => {
        if (!open)
          setOpen(true);
      },
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: leftBarStyles,
        style: {
          ...dimensions,
          zIndex: (dimensions?.zIndex || 1) + 1
        },
        children: open && /* @__PURE__ */ _jsxDEV(motion.div, {
          initial: {
            width: "0px"
          },
          animate: {
            width: "56px",
            height: "100%"
          },
          transition: {
            duration: 0.5
          },
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.leftBar_wrapper,
            children: [/* @__PURE__ */ _jsxDEV(Tabs, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 142,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(LeftBarFooter, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 143,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 141,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(AnimatePresence, {
        children: openTab && /* @__PURE__ */ _jsxDEV(ExtensionLeftBarContent, {
          dimensions,
          onToggle,
          openTab
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 150,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 7
    }, this);
  }
  return null;
}
_s(ExtensionLeftBar, "PrKjrWvir/4oYcNjY4VtC/WwXlY=", true, function() {
  return [useExtensionContext, useExtensionLeftBarContext, useSessionStorage, useSalesforceLeftBarEnabled, useEvent];
});
_c = ExtensionLeftBar;
var _c;
$RefreshReg$(_c, "ExtensionLeftBar");
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
