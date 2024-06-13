import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-logCallButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/logCallButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/logCallButton.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { serialize, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport9_md5 from "/vendor/.vite-deps-md5.js__v--42d373d6.js"; const md5 = __vite__cjsImport9_md5.__esModule ? __vite__cjsImport9_md5.default : __vite__cjsImport9_md5;
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import { useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const LogCallButton = () => {
  _s();
  const {
    createToast
  } = useToasts();
  const dialedNumber = useDialer((state) => state.dialedPhoneNumber);
  const userPhoneNumber = useDialer((state) => state.selectedPhoneNumber);
  const bobject = useDialer((state) => state.bobjectMatch);
  const callDirection = useDialer((state) => state.callDirection);
  const [loggingCall, setLoggingCall] = useState(false);
  const {
    setActivityLogCall,
    snapshot,
    finishCall
  } = useDialerStore();
  const {
    t
  } = useTranslation();
  const plugins = useRichTextEditorPlugins({
    images: false
  });
  async function logCall() {
    setLoggingCall(true);
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LOG_CALL_BUTTON_ON_DIALER_OTO);
    const activity = await api.post(`/calls/whiteLabel/call${bobject && bobject.hasMatched ? "" : "?mandatoryMatch=false"}`, {
      sdrPhone: userPhoneNumber,
      leadPhone: dialedNumber,
      leadId: bobject?.type === "Lead" ? bobject?.id : null,
      companyId: bobject?.type === "Company" ? bobject?.id : null,
      direction: callDirection === "inbound" ? "INCOMING" : "OUTGOING",
      callDateTime: new Date().toISOString(),
      callSid: `BB${md5(`${userPhoneNumber}${dialedNumber}${new Date().toISOString()}`)}`,
      otherFields: {
        ACTIVITY__NOTE: serialize(snapshot().note, {
          format: "AST",
          plugins
        })
      }
    });
    setActivityLogCall(activity?.data.activity?.value);
    createToast({
      message: t("dialer.logCall.toast.success"),
      type: "success"
    });
    setTimeout(() => {
      setLoggingCall(false);
      finishCall();
    }, 1500);
  }
  const disabled = !bobject || !dialedNumber || dialedNumber.length <= 9 || !dialedNumber.startsWith("+") || loggingCall;
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.spacer
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.logCallButton, {
        [styles.logCallButton__disabled]: disabled
      }),
      onClick: () => {
        if (!disabled)
          logCall();
      },
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "noteAction",
        size: 16,
        color: "white"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 9
      }, void 0), t("dialer.logCall.button")]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(LogCallButton, "oisVb9j9hGb/eg/eXkCTZk+ZrB0=", false, function() {
  return [useToasts, useDialer, useDialer, useDialer, useDialer, useDialerStore, useTranslation, useRichTextEditorPlugins];
});
_c = LogCallButton;
var _c;
$RefreshReg$(_c, "LogCallButton");
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
