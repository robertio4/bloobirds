import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-dialerExtendedScreen.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/extendedScreen/dialerExtendedScreen.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/extendedScreen/dialerExtendedScreen.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Skeleton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { DialerType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { AnimatePresence, motion, useAnimation } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import { DialerOpenStatus, useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import { DialerExtendedContent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-dialerExtendedContent.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-dialerExtendedScreen.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getSize(isBig, dialerType) {
  if (dialerType == DialerType.RINGOVER_DIALER) {
    return 377;
  }
  if (dialerType == DialerType.NUMINTEC_DIALER) {
    return 417;
  }
  return isBig ? 372 : 317;
}
function getExtendedScreenPosition(sideOpen, opening, isBig, dialerType) {
  if (sideOpen === "right") {
    const size = getSize(isBig, dialerType);
    return opening ? [20, size] : [size, 20];
  } else {
    return opening ? [-50, -337] : [-337, -50];
  }
}
export const DialerExtendedScreen = ({
  position
}) => {
  _s();
  const controls = useAnimation();
  const [sideOpen, setSideOpen] = useState("right");
  const {
    toggleExtendedScreen
  } = useDialerStore();
  const open = useDialer((state) => state.open);
  const showingExternalScreen = useDialer((state) => state.showingExtendedScreen);
  const extendedScreenType = useDialer((state) => state.extendedScreenType);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const handleOnClose = () => toggleExtendedScreen(extendedScreenType);
  const {
    settings
  } = useActiveUserSettings();
  const {
    user: {
      dialerType
    }
  } = settings;
  const isAircall = dialerType === "AIRCALL_DIALER";
  useEffect(() => {
    setInternalOpen(open !== DialerOpenStatus.closed && open !== DialerOpenStatus.minimized);
  }, [open]);
  useEffect(() => {
    if (showingExternalScreen) {
      controls?.start("start").then(() => setInternalOpen(open === DialerOpenStatus.open));
      setHasBeenOpened((b) => b ? b : true);
    } else if (hasBeenOpened) {
      controls?.start("close").then(() => setInternalOpen(false));
    }
  }, [showingExternalScreen, open]);
  useEffect(() => {
    if (sideOpen === "left" && position?.x < 322 || sideOpen === "right" && position?.x > window.innerWidth - 650) {
      if (open === DialerOpenStatus.open && showingExternalScreen)
        controls?.start("start");
      if (showingExternalScreen) {
        controls?.start("close").then(async () => {
          await setSideOpen((side) => side === "left" ? "right" : "left");
          controls?.start("start");
        });
      } else {
        setSideOpen((side) => side === "left" ? "right" : "left");
      }
    }
  }, [position]);
  const variants = {
    start: () => {
      return {
        left: getExtendedScreenPosition(sideOpen, true, isAircall, dialerType),
        scaleX: [0, 1],
        opacity: 1,
        transition: {
          duration: 0.25
        }
      };
    },
    close: () => {
      return {
        left: getExtendedScreenPosition(sideOpen, false, isAircall, dialerType),
        scaleX: [1, 0],
        transition: {
          duration: 0.25
        }
      };
    }
  };
  const isRightOpen = sideOpen === "right";
  return /* @__PURE__ */ _jsxDEV(AnimatePresence, {
    children: /* @__PURE__ */ _jsxDEV(motion.div, {
      initial: {
        opacity: 0
      },
      exit: {
        opacity: 0
      },
      animate: controls,
      variants,
      className: clsx({
        [styles.extended]: !isRightOpen,
        [styles.extendedRight]: isRightOpen
      }),
      children: internalOpen ? /* @__PURE__ */ _jsxDEV(DialerExtendedContent, {
        isRightOpen,
        handleOnClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(DialerExtendedSkeleton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
};
_s(DialerExtendedScreen, "3mLxdN1QAy9ZBeISbOzQLrP7Xt0=", false, function() {
  return [useAnimation, useDialerStore, useDialer, useDialer, useDialer, useActiveUserSettings];
});
_c = DialerExtendedScreen;
const DialerExtendedSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.extendedSkeleton,
  children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
    height: "20%",
    width: "100%",
    variant: "rect"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 125,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
    height: "70%",
    width: "100%",
    variant: "rect"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 126,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
    height: "10%",
    width: "100%",
    variant: "rect"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 127,
    columnNumber: 5
  }, void 0)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 124,
  columnNumber: 3
}, void 0);
_c2 = DialerExtendedSkeleton;
var _c, _c2;
$RefreshReg$(_c, "DialerExtendedScreen");
$RefreshReg$(_c2, "DialerExtendedSkeleton");
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
