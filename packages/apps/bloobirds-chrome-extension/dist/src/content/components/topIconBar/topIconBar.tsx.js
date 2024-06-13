import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/topIconBar/topIconBar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/topIconBar/topIconBar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/topIconBar/topIconBar.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, IconButton, Item, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useLocalStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { LocalStorageKeys, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getAuthUrl, logout } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport7_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const classNames = __vite__cjsImport7_classnames.__esModule ? __vite__cjsImport7_classnames.default : __vite__cjsImport7_classnames;
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import { useCreationForm } from "/src/hooks/useCreationForm.ts.js";
import { useIsNewAuthEnabled } from "/src/hooks/useIsNewAuthEnabled.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import styles from "/src/content/components/topIconBar/topIconBar.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function TopIconBar(props) {
  _s();
  const {
    onClose,
    onRefresh,
    onSettings,
    dragging,
    onBackButton,
    backgroundColor
  } = props;
  const {
    setCreateLead,
    setSyncLead
  } = useCreationForm();
  const {
    getShowBackButton,
    setIsHome,
    getIsDuplicatePage
  } = useFloatingMenuContext();
  const showBackButton = getShowBackButton();
  const isDuplicatePage = getIsDuplicatePage();
  const {
    useGetLoggedIn: useGetLoggedIn2,
    setLoggedIn,
    useGetActiveBobject: useGetActiveBobject2,
    setExtendedContext,
    toggleSidePeek,
    useGetSidePeekEnabled: useGetSidePeekEnabled2,
    useGetIsSettings: useGetIsSettings2,
    setIsSettings,
    resetExtensionContext
  } = useExtensionContext();
  const loggedIn = useGetLoggedIn2();
  const activeBobject = useGetActiveBobject2();
  const sidePeekEnabled = useGetSidePeekEnabled2();
  const isSettings = useGetIsSettings2();
  const {
    remove
  } = useLocalStorage();
  const {
    t
  } = useTranslation();
  const isNewAuthEnabled = useIsNewAuthEnabled();
  const {
    visible,
    setVisible,
    ref: dropdownRef
  } = useVisible();
  const handleHomeClick = (e) => {
    resetExtensionContext(e);
    setIsHome(true);
    e.stopPropagation();
  };
  const handleToggleView = () => {
    if (sidePeekEnabled) {
      mixpanel.track(MIXPANEL_EVENTS.CHANGE_TO_BUBBLE_VIEW);
    } else {
      mixpanel.track(MIXPANEL_EVENTS.CHANGE_TO_SIDEPEEK_VIEW);
    }
    toggleSidePeek();
    setExtendedContext(null);
  };
  const handleClose = () => {
    if (sidePeekEnabled) {
      mixpanel.track(MIXPANEL_EVENTS.MINIMIZE_SIDEPEEK_MENU);
    } else {
      mixpanel.track(MIXPANEL_EVENTS.MINIMIZE_BUBBLE_MENU);
    }
    onClose();
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    id: "bb-handle",
    className: classNames(styles.container, {
      [styles.dragging]: dragging,
      [styles.sidePeekEnabled]: sidePeekEnabled
    }),
    style: {
      backgroundColor: backgroundColor && `var(--${backgroundColor})`
    },
    children: [!sidePeekEnabled && /* @__PURE__ */ _jsxDEV("svg", {
      className: styles.handle,
      width: "8",
      height: "14",
      viewBox: "0 0 8 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ _jsxDEV("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1 0.75C0.447715 0.75 0 1.19772 0 1.75V2.25C0 2.80228 0.447715 3.25 1 3.25H1.5C2.05228 3.25 2.5 2.80228 2.5 2.25V1.75C2.5 1.19772 2.05228 0.75 1.5 0.75H1ZM1 5.75C0.447715 5.75 0 6.19772 0 6.75V7.25C0 7.80228 0.447715 8.25 1 8.25H1.5C2.05228 8.25 2.5 7.80228 2.5 7.25V6.75C2.5 6.19772 2.05228 5.75 1.5 5.75H1ZM0 11.75C0 11.1977 0.447715 10.75 1 10.75H1.5C2.05228 10.75 2.5 11.1977 2.5 11.75V12.25C2.5 12.8023 2.05228 13.25 1.5 13.25H1C0.447715 13.25 0 12.8023 0 12.25V11.75ZM6 0.75C5.44772 0.75 5 1.19772 5 1.75V2.25C5 2.80228 5.44772 3.25 6 3.25H6.5C7.05228 3.25 7.5 2.80228 7.5 2.25V1.75C7.5 1.19772 7.05228 0.75 6.5 0.75H6ZM5 6.75C5 6.19772 5.44772 5.75 6 5.75H6.5C7.05228 5.75 7.5 6.19772 7.5 6.75V7.25C7.5 7.80228 7.05228 8.25 6.5 8.25H6C5.44772 8.25 5 7.80228 5 7.25V6.75ZM6 10.75C5.44772 10.75 5 11.1977 5 11.75V12.25C5 12.8023 5.44772 13.25 6 13.25H6.5C7.05228 13.25 7.5 12.8023 7.5 12.25V11.75C7.5 11.1977 7.05228 10.75 6.5 10.75H6Z",
        fill: "#9ACFFF"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 9
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      children: /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [(isDuplicatePage || onBackButton && showBackButton && !isSettings && activeBobject) && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("common.back"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "arrowLeft",
            onClick: onBackButton
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 118,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 117,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("common.search"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "search",
            onClick: handleHomeClick
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 122,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 121,
          columnNumber: 11
        }, this), loggedIn && onRefresh && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("common.refresh"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "redoReload",
            onClick: () => {
              setCreateLead(false);
              setSyncLead(false);
              setIsHome(false);
              onRefresh(activeBobject);
              setIsSettings(false);
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 126,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 125,
          columnNumber: 13
        }, this)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.actions,
      children: /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [onClose && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("common.minimise"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "minus",
            onClick: handleClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 144,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: sidePeekEnabled ? t("common.bubble") : t("common.sidePeek"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: sidePeekEnabled ? "floatingpeek" : "sidepeek",
            onClick: handleToggleView
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 151,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 11
        }, this), loggedIn && /* @__PURE__ */ _jsxDEV(Dropdown, {
          anchor: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "moreVertical",
            onClick: () => setVisible(!visible)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 158,
            columnNumber: 23
          }, this),
          visible,
          ref: dropdownRef,
          children: [onSettings && /* @__PURE__ */ _jsxDEV(Item, {
            children: /* @__PURE__ */ _jsxDEV(IconButton, {
              name: "settings",
              onClick: () => {
                setVisible(false);
                onSettings();
              },
              children: t("common.settings")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 164,
              columnNumber: 19
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 163,
            columnNumber: 17
          }, this), /* @__PURE__ */ _jsxDEV(Item, {
            children: /* @__PURE__ */ _jsxDEV(IconButton, {
              name: "logout",
              onClick: async () => {
                await logout();
                setVisible(false);
                setLoggedIn(false);
                remove(LocalStorageKeys.LastVisitedBobjects);
                if (isNewAuthEnabled) {
                  const authUrl = getAuthUrl();
                  window.location.href = `${authUrl}?logout=true&afterLogout=${window.location.href}`;
                }
              },
              children: t("common.logout")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 176,
              columnNumber: 17
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 175,
            columnNumber: 15
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 157,
          columnNumber: 13
        }, this)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 88,
    columnNumber: 5
  }, this);
}
_s(TopIconBar, "o6EyO8/kaB3PLfNqBl+yNZs366w=", false, function() {
  return [useCreationForm, useFloatingMenuContext, useExtensionContext, useGetLoggedIn, useGetActiveBobject, useGetSidePeekEnabled, useGetIsSettings, useLocalStorage, useTranslation, useIsNewAuthEnabled, useVisible];
});
_c = TopIconBar;
export default TopIconBar;
var _c;
$RefreshReg$(_c, "TopIconBar");
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
