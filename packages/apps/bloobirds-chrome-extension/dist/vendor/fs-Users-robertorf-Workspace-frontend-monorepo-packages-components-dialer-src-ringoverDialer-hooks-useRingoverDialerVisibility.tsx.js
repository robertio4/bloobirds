import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringoverDialer-hooks-useRingoverDialerVisibility.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/ringoverDialer/hooks/useRingoverDialerVisibility.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/ringoverDialer/hooks/useRingoverDialerVisibility.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useOpenCCFWithoutObject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { MIXPANEL_EVENTS, PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getTextFromLogicRole, isLead, isSalesforcePage, normalizeUrl } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import __vite__cjsImport8_ringoverSdk from "/vendor/.vite-deps-ringover-sdk.js__v--7af149f0.js"; const RingoverSDK = __vite__cjsImport8_ringoverSdk.__esModule ? __vite__cjsImport8_ringoverSdk.default : __vite__cjsImport8_ringoverSdk;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import { fillReferenceFields, getMainBobjectId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-utils.ts.js";
import RingoverDialerFrame from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringoverDialer-ringoverDialerFrame.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const RingoverContext = React.createContext(null);
export const RingoverDialer = () => {
  _s();
  const dialedPhoneNumber = useDialer((state) => state.dialedPhoneNumber);
  const {
    maximize,
    setActivityExternal,
    closeExtendedScreen
  } = useDialerStore();
  const [launch, setLaunch] = useState();
  const ref = useRef(null);
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const [contact, setContact] = useState(null);
  const [callId, setCallId] = useState(null);
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  const {
    data: activity
  } = useSWR(
    callId ? `/calls/ringover/calls/${callId}` : null,
    async (url) => {
      const response = await api.get(url);
      return response?.data;
    },
    {
      onErrorRetry: (error, key, config, revalidate, {
        retryCount
      }) => {
        if (retryCount >= 15) {
          return;
        }
        setTimeout(() => revalidate({
          retryCount
        }), 1e3);
      }
    }
  );
  useEffect(() => {
    if (activity) {
      setActivityExternal(activity);
    }
  }, [activity]);
  async function openCorrectContactFlow(activity2) {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_AIRCALL_OTO);
    const mainBobjectId = getMainBobjectId(activity2);
    if (mainBobjectId) {
      const response = await api.get(`/linkedin/${PluralBobjectTypes[mainBobjectId.split("/")[1]]?.toLowerCase()}/${mainBobjectId.split("/")[2]}`);
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }
  const createCallAndLaunchCCF = async (details) => {
    const {
      data: activity2
    } = await api.post("/calls/ringover/calls/" + details?.call_id + "/end");
    if (activity2) {
      api.get(`/bobjects/${activity2?.activity}/form?injectReferences=true`).then((response) => {
        if (response?.data) {
          const activityToCCF = fillReferenceFields(response?.data);
          if (activityToCCF) {
            setActivityCCF(activityToCCF);
            openCorrectContactFlow(activityToCCF);
          }
        }
      });
    }
  };
  const setContactInfo = async (phoneNumber) => {
    const response = await api.post("/calls/whiteLabel/search", {
      phoneNumber
    });
    if (response.status !== 200) {
      return;
    }
    const bobjects = Array.isArray(response.data) ? response.data : [response.data];
    if (bobjects.length === 0) {
      return;
    }
    if (bobjects.length > 1) {
      setContact({
        multipleContacts: true,
        numberOfContacts: bobjects.length
      });
      return;
    }
    const bobject = bobjects[0];
    setContact({
      leadName: isLead(bobject) ? getTextFromLogicRole(bobject, "LEAD__FULL_NAME") : void 0,
      leadId: isLead(bobject) ? bobject.id.value : void 0,
      companyName: isLead(bobject) ? getTextFromLogicRole(bobject, "LEAD__COMPANY_NAME") : getTextFromLogicRole(bobject, "COMPANY__NAME"),
      companyId: isLead(bobject) ? getTextFromLogicRole(bobject, "LEAD__COMPANY") : bobject.id.value,
      multipleContacts: false
    });
  };
  const ringoverPhoneExt = useMemo(() => {
    if (ref.current) {
      try {
        const newPhone = new RingoverSDK({
          type: "relative",
          size: "auto",
          container: "ringover-phone",
          position: {
            top: null,
            bottom: "2px",
            left: "2px",
            right: "2px"
          },
          border: false,
          animation: true,
          backgroundColor: "transparent",
          trayicon: false
        });
        newPhone.on("ringingCall", (e) => {
          if (e.data.direction === "in") {
            setContactInfo(e.data.from);
            closeExtendedScreen();
            setActivityExternal(null);
            setTimeout(() => setCallId(e.data.call_id), 3e3);
            maximize();
          } else {
            setContactInfo(e.data.to);
            closeExtendedScreen();
            setActivityExternal(null);
            setTimeout(() => setCallId(e.data.call_id), 3e3);
          }
        });
        newPhone.on("hangupCall", (e) => {
          setContact(null);
          createCallAndLaunchCCF(e.data);
        });
        newPhone.generate();
        return newPhone;
      } catch (e) {
        console.error("setting ringover sdk error", e);
      }
    }
    return null;
  }, [ref.current, launch]);
  useEffect(() => {
    if (dialedPhoneNumber) {
      if (isSalesforcePage(normalizeUrl(window.location.href))) {
        const possibleCti = document.querySelector('iframe[src*="cti.ringover.io"]');
        if (possibleCti) {
          possibleCti.remove();
          setTimeout(
            ringoverPhoneExt?.dial(dialedPhoneNumber),
            1
          );
        } else {
          ringoverPhoneExt?.dial(dialedPhoneNumber);
        }
      } else {
        ringoverPhoneExt?.dial(dialedPhoneNumber);
      }
    }
  }, [dialedPhoneNumber, ringoverPhoneExt]);
  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /* @__PURE__ */ _jsxDEV(RingoverContext.Provider, {
    value: {
      ringoverPhoneExt,
      launch,
      setLaunch,
      contact
    },
    children: /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(RingoverDialerFrame, {
        ref
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 231,
        columnNumber: 9
      }, void 0), showCorrectContactFlow && activityCCF && (mainActivityBobject || hasOpenCCFWithoutObjectAccount) && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
        referenceBobject: mainActivityBobject,
        handleClose
      })]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 222,
    columnNumber: 5
  }, void 0);
};
_s(RingoverDialer, "6YO72K1xqEaLw0tFhoJ6CO0Oqoo=", false, function() {
  return [useDialer, useDialerStore, useWizardContext, useOpenCCFWithoutObject, useSWR];
});
_c = RingoverDialer;
export const useRingoverDialer = () => {
  _s2();
  const context = React.useContext(RingoverContext);
  if (!context) {
    throw new Error("useRingoverDialer must be used within the RingoverProvider");
  }
  return context;
};
_s2(useRingoverDialer, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
export const useRingoverDialerVisibility = () => {
  _s3();
  const {
    ringoverPhoneExt
  } = useRingoverDialer();
  const openRingoverDialer = (phoneNumber) => {
    ringoverPhoneExt?.send("dial_number", {
      phone_number: phoneNumber
    }, () => {
    });
  };
  return {
    openRingoverDialer
  };
};
_s3(useRingoverDialerVisibility, "YaQOxp7rYxRhVVXZAG84xoKYV0s=", false, function() {
  return [useRingoverDialer];
});
var _c;
$RefreshReg$(_c, "RingoverDialer");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
