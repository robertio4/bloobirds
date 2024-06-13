import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialerConnectionHint.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialerConnectionHint.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialerConnectionHint.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import __vite__cjsImport4__twilio_voiceSdk from "/vendor/.vite-deps-@twilio_voice-sdk.js__v--b339a92b.js"; const Call = __vite__cjsImport4__twilio_voiceSdk["Call"];
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { DialerStatus, useDialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function getHint(status, warnings, errors, callStatus, t) {
  if (warnings.length > 0) {
    return t("dialer.hints.unstableConnection");
  }
  if (errors.length > 0) {
    return t("dialer.hints.connectionError");
  }
  switch (status) {
    case DialerStatus.authorizing:
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.textAuthorizing,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: t("dialer.hints.noConfig")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: t("dialer.hints.logManually")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: /* @__PURE__ */ _jsxDEV("a", {
            href: "https://support.bloobirds.com/hc/en-us/articles/6956014352412-How-to-add-phone-numbers",
            target: "_blank",
            rel: "noreferrer",
            children: t("dialer.hints.help")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 28,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: t("dialer.hints.onlyAdmins")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 9
      }, this);
    case DialerStatus.registering:
      return t("dialer.hints.buildingDialer");
    case DialerStatus.idle:
      return t("dialer.hints.readyToCall");
    case DialerStatus.connected:
      switch (callStatus) {
        case Call.State.Connecting:
          return t("dialer.hints.connecting");
        case Call.State.Ringing:
          return t("dialer.hints.ringing");
        case Call.State.Open:
          return t("dialer.hints.callInProgress");
        case Call.State.Closed:
          return t("dialer.hints.callEnded");
        case Call.State.Reconnecting:
          return t("dialer.hints.reconnecting");
        case Call.State.Pending:
          return t("dialer.hints.incomingCall");
      }
      break;
    case DialerStatus.callEnded:
      return t("dialer.hints.callEnded");
  }
}
export const DialerConnectionHint = () => {
  _s();
  const status = useDialer((state) => state.status);
  const callStatus = useDialer((state) => state.callStatus);
  const errors = useDialer((state) => state.errors);
  const warnings = useDialer((state) => state.warnings);
  const {
    t
  } = useTranslation();
  const hint = getHint(status, warnings, errors, callStatus, t);
  const hintClasses = clsx(styles.connectionHint, {
    [styles.noConfig]: status === DialerStatus.authorizing
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: hintClasses,
    children: /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "softPeanut",
      children: hint
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 81,
    columnNumber: 5
  }, void 0);
};
_s(DialerConnectionHint, "FQIa2uI+QP4GZM1V3KTZ6wZ0cuE=", false, function() {
  return [useDialer, useDialer, useDialer, useDialer, useTranslation];
});
_c = DialerConnectionHint;
var _c;
$RefreshReg$(_c, "DialerConnectionHint");
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
