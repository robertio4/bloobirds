import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringHangupButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/ringHangupButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/ringHangupButton.tsx", _s = $RefreshSig$();
import { Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import __vite__cjsImport5__twilio_voiceSdk from "/vendor/.vite-deps-@twilio_voice-sdk.js__v--b339a92b.js"; const Call = __vite__cjsImport5__twilio_voiceSdk["Call"];
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import { DialerStatus, useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const LoadingRingButton = () => {
  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)"
    }
  };
  return /* @__PURE__ */ _jsxDEV("svg", {
    height: "32",
    width: "32",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: /* @__PURE__ */ _jsxDEV(motion.path, {
      variants: icon,
      d: "M18.538 15.637a.735.735 0 0 0-.622-.76c-.756-.099-1.5-.284-2.216-.551a.73.73 0 0 0-.768.161l-.928.929a.73.73 0 0 1-.878.118 12.426 12.426 0 0 1-4.66-4.66.73.73 0 0 1 .118-.878l.926-.925a.732.732 0 0 0 .163-.773 10.1 10.1 0 0 1-.55-2.207.733.733 0 0 0-.738-.629H6.192a.731.731 0 0 0-.728.785 13.742 13.742 0 0 0 2.134 6.023 13.532 13.532 0 0 0 4.167 4.165 13.723 13.723 0 0 0 5.976 2.129.73.73 0 0 0 .797-.734v-2.193zm1.462.008v2.182a2.193 2.193 0 0 1-2.404 2.192 15.188 15.188 0 0 1-6.621-2.354 14.977 14.977 0 0 1-4.607-4.605 15.207 15.207 0 0 1-2.36-6.67A2.193 2.193 0 0 1 6.193 4h2.185c1.1-.01 2.04.796 2.194 1.893.085.647.244 1.282.471 1.892a2.194 2.194 0 0 1-.496 2.316l-.524.525a10.964 10.964 0 0 0 3.352 3.352l.527-.527a2.192 2.192 0 0 1 2.312-.494 8.67 8.67 0 0 0 1.9.472A2.193 2.193 0 0 1 20 15.645z",
      fill: "var(--white)",
      fillRule: "evenodd",
      clipRule: "evenodd",
      initial: "hidden",
      animate: "visible"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 27,
    columnNumber: 5
  }, void 0);
};
_c = LoadingRingButton;
export const RingHangupButton = () => {
  _s();
  const status = useDialer((state) => state.status);
  const dialedPhoneNumber = useDialer((state) => state.dialedPhoneNumber);
  const selectedPhoneNumber = useDialer((state) => state.selectedPhoneNumber);
  const callStatus = useDialer((state) => state.callStatus);
  const {
    settings
  } = useActiveUserSettings();
  const {
    startCall,
    hangCall,
    snapshot,
    setState
  } = useDialerStore();
  const disabled = status === DialerStatus.callEnded || status === DialerStatus.authorizing || status === DialerStatus.registering || status === DialerStatus.idle && (dialedPhoneNumber?.length < 9 || !dialedPhoneNumber?.startsWith("+"));
  const shouldRenderGreenButton = DialerStatus.callEnded === status || DialerStatus.idle === status || status === DialerStatus.incoming;
  const onClickHandler = async () => {
    if (!disabled) {
      if (status === DialerStatus.idle) {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_DIALER_OTO);
        const params = {
          twilioPhone: selectedPhoneNumber,
          isOutgoing: "true",
          leadPhone: dialedPhoneNumber,
          userId: settings?.user?.id
        };
        const {
          device,
          call
        } = snapshot();
        if (call) {
          console.log("There is already a call in progress");
          return;
        }
        const newCall = await device?.connect({
          params
        });
        startCall(newCall);
        setState("status", DialerStatus.connected);
      }
      if (status !== DialerStatus.idle && status !== DialerStatus.incoming) {
        hangCall();
      }
      if (status === DialerStatus.incoming) {
        snapshot().call?.accept();
        setState("status", DialerStatus.connected);
        setState("incomingAccepted", true);
      }
    }
  };
  const buttonClasses = clsx(styles.ringHangupButton, {
    [styles.ringHangupButton_disabled]: disabled,
    [styles.ringHangupButton_hangup]: !shouldRenderGreenButton,
    [styles.ringHangupButton_loading]: status < DialerStatus.idle,
    [styles.ringHangupButton_animate]: callStatus === Call.State.Ringing || callStatus === Call.State.Connecting || callStatus === Call.State.Pending
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.ringHangupButtonContainer,
    children: [/* @__PURE__ */ _jsxDEV(motion.div, {
      className: buttonClasses,
      onClick: onClickHandler,
      animate: status === DialerStatus.incoming ? {
        scale: [1, 1.1, 1.1, 1, 1],
        rotate: [0, 0, 180, 180, 0]
      } : {},
      transition: status === DialerStatus.incoming ? {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        loop: Infinity,
        repeatDelay: 1
      } : {},
      children: status < DialerStatus.idle ? /* @__PURE__ */ _jsxDEV(LoadingRingButton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Icon, {
        color: "white",
        name: shouldRenderGreenButton ? "phone" : "phoneHang",
        size: 32
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 7
    }, void 0), status === DialerStatus.incoming && /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.ringHangupButton, styles.ringHangupButton_hangup),
      onClick: () => {
        snapshot().call?.reject();
        hangCall();
      },
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "phoneHang",
        size: 32,
        color: "white"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 100,
    columnNumber: 5
  }, void 0);
};
_s(RingHangupButton, "BSZWals4BibNE6rrCBNSbJB/Eus=", false, function() {
  return [useDialer, useDialer, useDialer, useDialer, useActiveUserSettings, useDialerStore];
});
_c2 = RingHangupButton;
var _c, _c2;
$RefreshReg$(_c, "LoadingRingButton");
$RefreshReg$(_c2, "RingHangupButton");
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
