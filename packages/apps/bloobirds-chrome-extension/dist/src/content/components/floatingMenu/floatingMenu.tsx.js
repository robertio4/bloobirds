import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/floatingMenu/floatingMenu.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingMenu/floatingMenu.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingMenu/floatingMenu.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useEmailConnections } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { isUnassignedTask } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport5_classnames from "/vendor/.vite-deps-classnames.js__v--b33663e5.js"; const classNames = __vite__cjsImport5_classnames.__esModule ? __vite__cjsImport5_classnames.default : __vite__cjsImport5_classnames;
import { AnimatePresence, motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import { isSalesforcePage } from "/src/utils/url.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { ExtendedScreen } from "/src/content/components/extendedScreen/ExtendedScreen.tsx.js";
import { getStyle } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import Main from "/src/content/components/linkedInScreens/index.tsx.js";
import LoginForm from "/src/content/components/loginForm/loginForm.tsx.js";
import NavigationBar from "/src/content/components/navegationBar/navegationBar.tsx.js";
import TopIcons from "/src/content/components/topIconBar/topIconBar.tsx.js";
import styles from "/src/content/components/floatingMenu/floatingMenu.module.css.js";
import { useFloatingMenuContext, useFloatingMenuContextStore } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const FloatingScreens = () => {
  _s();
  const store = useFloatingMenuContextStore();
  const {
    useGetLoggedIn,
    useGetExtendedContext,
    useGetContactViewBobjectId,
    closeExtendedScreen
  } = useExtensionContext();
  const {
    setIsHome
  } = useFloatingMenuContext();
  const loggedIn = useGetLoggedIn();
  const {
    connections,
    mutate
  } = useEmailConnections();
  const leftBarExtendedContext = useGetExtendedContext();
  const contactViewBobjectId = useGetContactViewBobjectId();
  useEffect(() => {
    if (connections) {
      store.setState("connections", connections);
      store.setState("mutateConnections", mutate);
    }
  }, [connections]);
  useEffect(() => {
    if (leftBarExtendedContext === null) {
      closeExtendedScreen();
      setIsHome(false);
    }
  }, [leftBarExtendedContext]);
  useEffect(() => {
    if (!contactViewBobjectId) {
      closeExtendedScreen();
    } else {
      setIsHome(false);
    }
  }, [contactViewBobjectId]);
  if (!connections && loggedIn) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(Main, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ExtendedScreen, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(FloatingScreens, "AhFTTpIqsQWeqP4zntRmXqTZ13Q=", true, function() {
  return [useFloatingMenuContextStore, useExtensionContext, useFloatingMenuContext, useEmailConnections];
});
_c = FloatingScreens;
export default function FloatingMenu(props) {
  _s2();
  const {
    dragging,
    onClose,
    visible,
    width = 0,
    url
  } = props;
  const {
    useGetLoggedIn,
    useGetCurrentPage,
    useGetSidePeekEnabled,
    useGetCurrentTask,
    useGetOpenStartTasksNavigation,
    useGetCustomPage,
    updateIsSettings
  } = useExtensionContext();
  const {
    setGoBack,
    getGoBack,
    setIsHome,
    getIsHome,
    getOnRefresh,
    getIsDuplicatePage
  } = useFloatingMenuContext();
  const customPage = useGetCustomPage();
  const currentPage = useGetCurrentPage();
  const currentTask = useGetCurrentTask();
  const isDuplicatePage = getIsDuplicatePage();
  const goBack = getGoBack();
  const loggedIn = useGetLoggedIn();
  const isHome = getIsHome();
  const openStartTaskNavigation = useGetOpenStartTasksNavigation();
  const {
    open: openStartTask,
    stage,
    quickFilter
  } = openStartTaskNavigation;
  const sidePeekEnabled = useGetSidePeekEnabled();
  const onRefresh = getOnRefresh();
  const isSalesforce = isSalesforcePage(url);
  useEffect(() => {
    setIsHome(false);
  }, [currentPage]);
  useEffect(() => {
    if (currentTask && isUnassignedTask(currentTask) && !isHome)
      setIsHome(true);
  }, [currentTask]);
  const onSettings = () => {
    updateIsSettings();
  };
  const onGoBack = () => {
    isDuplicatePage && goBack ? goBack() : setGoBack(() => null);
  };
  const classnames = classNames(styles.container, {
    [styles.bubbleView]: !sidePeekEnabled && visible,
    [styles.sidePeekView]: sidePeekEnabled && visible
  });
  const withFooter = !isSalesforce;
  const height = getStyle(url, withFooter)?.height;
  const top = getStyle(url)?.top;
  const widthSidePeek = (width - 56) * 0.33;
  const xSidePeek = width - widthSidePeek;
  return /* @__PURE__ */ _jsxDEV(motion.div, {
    style: sidePeekEnabled && {
      position: "absolute",
      top: top ?? (isSalesforce ? "90px" : "52px"),
      left: xSidePeek || "300px",
      transition: "all 0.25s ease-in-out",
      pointerEvents: "all"
    },
    initial: {
      x: xSidePeek
    },
    animate: {
      opacity: [sidePeekEnabled ? 1 : 0, 1],
      x: [sidePeekEnabled ? xSidePeek : 0, 0]
    },
    transition: {
      duration: !sidePeekEnabled ? 0.5 : 0.25,
      ease: "easeInOut"
    },
    children: /* @__PURE__ */ _jsxDEV("div", {
      style: {
        width: sidePeekEnabled ? widthSidePeek : void 0,
        height: sidePeekEnabled ? height : "100%"
      },
      className: classnames,
      id: "floating-menu",
      children: /* @__PURE__ */ _jsxDEV(AnimatePresence, {
        children: customPage ? customPage : /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [!openStartTask ? /* @__PURE__ */ _jsxDEV(TopIcons, {
            dragging,
            onClose,
            onRefresh,
            onSettings,
            onBackButton: onGoBack
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 170,
            columnNumber: 17
          }, this) : /* @__PURE__ */ _jsxDEV(NavigationBar, {
            dragging,
            stage,
            quickFilter
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 178,
            columnNumber: 17
          }, this), loggedIn ? /* @__PURE__ */ _jsxDEV(FloatingScreens, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 180,
            columnNumber: 27
          }, this) : /* @__PURE__ */ _jsxDEV(LoginForm, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 180,
            columnNumber: 49
          }, this)]
        }, void 0, true)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 136,
    columnNumber: 5
  }, this);
}
_s2(FloatingMenu, "Siww34grq8d3OSUGLqMOtp092SQ=", true, function() {
  return [useExtensionContext, useFloatingMenuContext];
});
_c2 = FloatingMenu;
var _c, _c2;
$RefreshReg$(_c, "FloatingScreens");
$RefreshReg$(_c2, "FloatingMenu");
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
