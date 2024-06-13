import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/bubbleWindow/bubbleWindow.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bubbleWindow/bubbleWindow.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bubbleWindow/bubbleWindow.tsx", _s = $RefreshSig$();
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import classNames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/bubbleWindow/bubbleWindow.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const BubbleWindow = ({
  children,
  height
}) => {
  _s();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.window,
    style: {
      height: sidePeekEnabled ? "100%" : height ? `${height}px` : "550px"
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 5
  }, void 0);
};
_s(BubbleWindow, "4i97H0v//x7XKvyGnqjsbPnAgHo=", true, function() {
  return [useExtensionContext];
});
_c = BubbleWindow;
export const BubbleWindowHeader = ({
  name,
  color,
  backgroundColor
}) => {
  return /* @__PURE__ */ _jsxDEV("header", {
    className: styles.header,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.horizontalLine,
      style: {
        color: `var(--${color})`
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.circularBadge,
      style: {
        color: `var(--${color})`,
        backgroundColor: `var(--${backgroundColor})`
      },
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name,
        color,
        size: 32
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 45,
    columnNumber: 5
  }, void 0);
};
_c2 = BubbleWindowHeader;
export const BubbleWindowHeaderCircularBadge = ({
  title,
  color,
  borderColor,
  titleColor,
  backgroundColor
}) => {
  return /* @__PURE__ */ _jsxDEV("header", {
    className: styles.header,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.horizontalLine,
      style: {
        color: `var(--${color})`
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.circularBadge,
      style: {
        color: `var(--${borderColor})`,
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      children: /* @__PURE__ */ _jsxDEV(Text, {
        color: titleColor,
        size: "l",
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 68,
    columnNumber: 5
  }, void 0);
};
_c3 = BubbleWindowHeaderCircularBadge;
export const BubbleWindowContent = ({
  children,
  className
}) => {
  return /* @__PURE__ */ _jsxDEV("main", {
    className: classNames(styles.content, className),
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 89,
    columnNumber: 10
  }, void 0);
};
_c4 = BubbleWindowContent;
export const BubbleWindowFooter = ({
  children,
  className
}) => {
  return /* @__PURE__ */ _jsxDEV("footer", {
    className: classNames(styles.footer, className),
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 93,
    columnNumber: 10
  }, void 0);
};
_c5 = BubbleWindowFooter;
export const BubbleWindowGradientFooter = ({
  children
}) => {
  return /* @__PURE__ */ _jsxDEV("footer", {
    className: styles.footerGradient,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 97,
    columnNumber: 10
  }, void 0);
};
_c6 = BubbleWindowGradientFooter;
var _c, _c2, _c3, _c4, _c5, _c6;
$RefreshReg$(_c, "BubbleWindow");
$RefreshReg$(_c2, "BubbleWindowHeader");
$RefreshReg$(_c3, "BubbleWindowHeaderCircularBadge");
$RefreshReg$(_c4, "BubbleWindowContent");
$RefreshReg$(_c5, "BubbleWindowFooter");
$RefreshReg$(_c6, "BubbleWindowGradientFooter");
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
