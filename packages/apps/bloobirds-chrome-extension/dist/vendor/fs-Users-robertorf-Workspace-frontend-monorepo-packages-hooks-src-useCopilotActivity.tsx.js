import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useCopilotActivity.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/hooks/src/useCopilotActivity.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/hooks/src/useCopilotActivity.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getFieldByLogicRole, getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useActiveAccountId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveAccount.ts.js";
import { useCopilotEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useFeatureFlags.ts.js";
import useInterval from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useInterval.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CopilotActivityContext = createContext({});
export const CopilotActivityContextProvider = ({
  activity,
  children
}) => {
  _s();
  useEffect(() => {
    setTranscript(void 0);
    resumeTranscriptInterval();
    setInsights(void 0);
    resumeInsightsInterval();
    setCRMUpdates(void 0);
    resumeUpdatesInterval();
  }, [activity?.id?.objectId]);
  const accountId = useActiveAccountId();
  const isCopilotEnabled = useCopilotEnabled(accountId);
  const type = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole;
  const recording = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  const botId = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.BOT_ID);
  const hasRecording = !!recording;
  const hasBot = !!botId;
  const canGetCallTranscript = hasRecording && type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  const canGetMeetingTranscript = hasBot && type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING;
  const canGetTranscript = canGetCallTranscript || canGetMeetingTranscript;
  const [overlay, setOverlay] = useState();
  const hasOverlay = !!overlay;
  const [transcript, setTranscript] = useState();
  const [insights, setInsights] = useState();
  const [crmUpdates, setCRMUpdates] = useState();
  const [canGetInsights, setCanGetInsights] = useState(transcript?.status === "GENERATED");
  useEffect(() => {
    if (transcript?.status === "GENERATED") {
      setCanGetInsights(true);
    }
  }, [transcript]);
  const [isTranscriptIntervalCleared, cancelTranscriptInterval, resumeTranscriptInterval] = useInterval(() => {
    if (isCopilotEnabled && canGetTranscript) {
      api.get(`/copilot/transcript/${type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL ? "call" : "meeting"}/${activity?.id.objectId}`).then((response) => {
        setTranscript(response.data);
      });
    }
  }, 15e3, activity?.id.objectId);
  const [isInsightsIntervalCleared, cancelInsightsInterval, resumeInsightsInterval] = useInterval(() => {
    if (isCopilotEnabled) {
      api.get(`/copilot/transcript/insights/${activity?.id.objectId}`).then((response) => {
        setInsights(response.data);
      });
    }
  }, 15e3, activity?.id.objectId);
  const [isUpdatesIntervalCleared, cancelUpdatesInterval, resumeUpdatesInterval] = useInterval(() => {
    if (isCopilotEnabled) {
      api.get(`/copilot/transcript/crm-updates/${activity?.id.objectId}`).then((response) => {
        setCRMUpdates(response.data);
      });
    }
  }, 15e3, activity?.id.objectId);
  useEffect(() => {
    if ((transcript?.status === "GENERATED" || transcript?.status === "ERROR") && !isTranscriptIntervalCleared) {
      cancelTranscriptInterval();
    }
  }, [transcript, cancelTranscriptInterval, isTranscriptIntervalCleared]);
  useEffect(() => {
    if ((insights?.status === "GENERATED" || insights?.status === "ERROR") && !isInsightsIntervalCleared) {
      cancelInsightsInterval();
    }
  }, [insights, isInsightsIntervalCleared, cancelInsightsInterval]);
  useEffect(() => {
    if ((crmUpdates?.status === "GENERATED" || crmUpdates?.status === "ERROR") && !isUpdatesIntervalCleared) {
      cancelUpdatesInterval();
    }
  }, [crmUpdates, isUpdatesIntervalCleared, cancelUpdatesInterval]);
  const regenerateAnalysis = () => {
    if (isCopilotEnabled && canGetInsights) {
      api.get(`/copilot/transcript/insights/${activity?.id.objectId}?regenerate=true`).then((response) => {
        setInsights(response.data);
        resumeInsightsInterval();
      });
    }
  };
  const regenerateUpdates = () => {
    if (isCopilotEnabled && canGetInsights) {
      api.get(`/copilot/transcript/crm-updates/${activity?.id.objectId}?regenerate=true`).then((response) => {
        setCRMUpdates(response.data);
        resumeUpdatesInterval();
      });
    }
  };
  const value = {
    hasOverlay,
    overlay,
    resetOverlay: () => setOverlay(void 0),
    transcript,
    insights,
    crmUpdates,
    setOverlay,
    regenerateAnalysis,
    regenerateUpdates,
    clearAllSubscriptions: () => {
      cancelUpdatesInterval();
      cancelInsightsInterval();
      cancelTranscriptInterval();
    },
    activity,
    reloadTranscript: () => api.get(`/copilot/transcript/${type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL ? "call" : "meeting"}/${activity?.id.objectId}`).then((response) => {
      setTranscript(response.data);
    })
  };
  return /* @__PURE__ */ _jsxDEV(CopilotActivityContext.Provider, {
    value,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 213,
    columnNumber: 5
  }, void 0);
};
_s(CopilotActivityContextProvider, "PGoXSEdfhbn1XJ0a52YoR/Hsfek=", false, function() {
  return [useActiveAccountId, useCopilotEnabled, useInterval, useInterval, useInterval];
});
_c = CopilotActivityContextProvider;
export const useCopilotActivity = () => {
  _s2();
  return useContext(CopilotActivityContext);
};
_s2(useCopilotActivity, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
$RefreshReg$(_c, "CopilotActivityContextProvider");
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
