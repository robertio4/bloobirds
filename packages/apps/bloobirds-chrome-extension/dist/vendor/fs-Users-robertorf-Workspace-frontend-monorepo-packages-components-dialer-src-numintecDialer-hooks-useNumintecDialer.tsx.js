import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-numintecDialer-hooks-useNumintecDialer.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/numintecDialer/hooks/useNumintecDialer.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/numintecDialer/hooks/useNumintecDialer.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useOpenCCFWithoutObject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useEventSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import { MIXPANEL_EVENTS, PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getTextFromLogicRole, isLead } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import __vite__cjsImport8_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport8_mixpanelBrowser.__esModule ? __vite__cjsImport8_mixpanelBrowser.default : __vite__cjsImport8_mixpanelBrowser;
import { useDialer, useDialerStore } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js";
import { fillReferenceFields, getMainBobjectId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-utils.ts.js";
import NumintecDialerFrame from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-numintecDialer-numintecDialerFrame.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const NumintecContext = React.createContext(null);
export const NumintecDialer = () => {
  _s();
  const dialedPhoneNumber = useDialer((state) => state.dialedPhoneNumber);
  const {
    maximize,
    setActivity,
    closeExtendedScreen,
    snapshot,
    setActivityExternal,
    setMatchedBobject
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
  useEventSubscription("numintec", (data) => {
    window.onbeforeunload = null;
    switch (data?.event) {
      case "INCOMING_CALL":
        setCallId(data?.callSid);
        setActivityExternal(null);
        setContactInfo(data?.phoneContact, setMatchedBobject);
        maximize();
        break;
      case "on_outgoing_call_early":
      case "on_incoming_call_early":
        setCallId(data?.callSid);
        setContactInfo(data?.phoneContact, setMatchedBobject);
        setActivity(data?.activityId, true);
        window.onbeforeunload = () => true;
        break;
      case "on_outgoing_call_terminated":
      case "on_incoming_call_terminated":
        setActivityExternal(null);
        setMainActivityBobject(null);
        setContact(null);
        break;
      case "CALL_ENDED":
        setContact(null);
        getCallAndLaunchCCF(snapshot()?.activity);
        break;
      case "on_incoming_call_missed":
        setContact(null);
        break;
    }
  });
  async function openCorrectContactFlow(activity) {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_NUMINTEC_OTO);
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(`/linkedin/${PluralBobjectTypes[mainBobjectId.split("/")[1]]?.toLowerCase()}/${mainBobjectId.split("/")[2]}`);
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }
  const getCallAndLaunchCCF = async (activity) => {
    if (!document.hidden && activity) {
      if (activity) {
        api.get(`/bobjects/${activity?.id?.value}/form?injectReferences=true`).then((response) => {
          if (response?.data) {
            const activityToCCF = fillReferenceFields(response?.data);
            if (activityToCCF) {
              setActivityCCF(activityToCCF);
              openCorrectContactFlow(activityToCCF);
            }
          }
        });
      }
    }
  };
  const setContactInfo = async (phoneNumber, setMatchedBobject2) => {
    setMatchedBobject2(null);
    const response = await api.post("/calls/whiteLabel/search", {
      phoneNumber
    });
    if (response.status !== 200) {
      setMatchedBobject2({
        hasMatched: false
      });
      return;
    }
    const bobjects = Array.isArray(response.data) ? response.data : [response.data];
    if (bobjects.length === 0) {
      setMatchedBobject2({
        hasMatched: false
      });
      return;
    }
    if (bobjects.length > 1) {
      setContact({
        multipleContacts: true,
        numberOfContacts: bobjects.length
      });
      setMatchedBobject2({
        hasMatched: false
      });
      return;
    }
    const bobject = bobjects[0];
    const leadName = isLead(bobject) ? getTextFromLogicRole(bobject, "LEAD__FULL_NAME") : void 0;
    const leadId = isLead(bobject) ? bobject.id.value : void 0;
    const companyId = isLead(bobject) ? getTextFromLogicRole(bobject, "LEAD__COMPANY") : bobject.id.value;
    setContact({
      leadName,
      leadId,
      companyName: isLead(bobject) ? getTextFromLogicRole(bobject, "LEAD__COMPANY_NAME") : getTextFromLogicRole(bobject, "COMPANY__NAME"),
      companyId,
      multipleContacts: false
    });
    const foundBobject = {
      bobject,
      companyId,
      id: leadId,
      name: leadName,
      type: bobject.id.typeName,
      hasMatched: true
    };
    setMatchedBobject2(foundBobject);
  };
  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /* @__PURE__ */ _jsxDEV(NumintecContext.Provider, {
    value: {
      launch,
      setLaunch,
      contact
    },
    children: /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(NumintecDialerFrame, {
        ref
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 9
      }, void 0), showCorrectContactFlow && activityCCF && (mainActivityBobject || hasOpenCCFWithoutObjectAccount) && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
        referenceBobject: mainActivityBobject,
        handleClose
      })]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 190,
    columnNumber: 5
  }, void 0);
};
_s(NumintecDialer, "ET0fDOyjOZCrQEXHfhrjiZtc5IY=", false, function() {
  return [useDialer, useDialerStore, useWizardContext, useOpenCCFWithoutObject, useEventSubscription];
});
_c = NumintecDialer;
export const useNumintecDialer = () => {
  _s2();
  const context = React.useContext(NumintecContext);
  if (!context) {
    throw new Error("useNumintecDialer must be used within the NumintecProvider");
  }
  return context;
};
_s2(useNumintecDialer, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "NumintecDialer");
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
