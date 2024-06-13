import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialPad.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialPad.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialPad.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { DialerStatus, useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function DialPadButton({
  children,
  onClick
}) {
  _s();
  const status = useDialer((state) => state.status);
  const disabled = status === DialerStatus.authorizing;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.dialPadButton, {
      [styles.dialPadButton__disabled]: disabled
    }),
    onClick: () => {
      if (!disabled)
        onClick();
    },
    children: typeof children === "string" ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: "peanut",
        align: "center",
        children
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 11
      }, this), children === "2" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "ABC"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 13
      }, this), children === "3" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "DEF"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 13
      }, this), children === "4" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "GHI"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 13
      }, this), children === "5" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "JKL"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 13
      }, this), children === "6" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "MNO"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 13
      }, this), children === "7" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "PQRS"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 13
      }, this), children === "8" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "TUV"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 13
      }, this), children === "9" && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "WXYZ"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 13
      }, this)]
    }, void 0, true) : children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
_s(DialPadButton, "Nu+4TuVLCPhezBTkLDYn1RjYaHk=", false, function() {
  return [useDialer];
});
_c = DialPadButton;
export function DialPad() {
  _s2();
  const {
    setDialedPhoneNumber,
    snapshot
  } = useDialerStore();
  const dialedPhoneNumber = useDialer((state) => state.dialedPhoneNumber);
  const status = useDialer((state) => state.status);
  const handleNumberClick = (number) => {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber + number);
    }
    if (status === DialerStatus.connected) {
      setDialedPhoneNumber(dialedPhoneNumber + number);
      snapshot()?.call?.sendDigits(number);
    }
  };
  const handleBackspaceClick = () => {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber.slice(0, -1));
    }
  };
  const handlePlusClick = () => {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber + "+");
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.dialPad,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.dialPadRow,
      children: [/* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("1"),
        children: "1"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("2"),
        children: "2"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("3"),
        children: "3"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.dialPadRow,
      children: [/* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("4"),
        children: "4"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("5"),
        children: "5"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("6"),
        children: "6"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.dialPadRow,
      children: [/* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("7"),
        children: "7"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("8"),
        children: "8"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("9"),
        children: "9"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.dialPadRow,
      children: [/* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("*"),
        children: "*"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("0"),
        children: "0"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: () => handleNumberClick("#"),
        children: "#"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.dialPadRow,
      children: [/* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: handlePlusClick,
        children: "+"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(DialPadButton, {
        onClick: handleBackspaceClick,
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "arrowLeft",
          size: 16,
          color: "bloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 129,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, this);
}
_s2(DialPad, "CDPhnVahmAp2p/mt9Xd1Gg/S3EY=", false, function() {
  return [useDialerStore, useDialer, useDialer];
});
_c2 = DialPad;
var _c, _c2;
$RefreshReg$(_c, "DialPadButton");
$RefreshReg$(_c2, "DialPad");
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
