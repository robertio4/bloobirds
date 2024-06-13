import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/wizardHelper/components/cadenceTaskManager/cadenceTaskManager.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/cadenceTaskManager/cadenceTaskManager.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/cadenceTaskManager/cadenceTaskManager.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CadenceControlModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-index.tsx.js";
import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useTasksFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useSWRConfig } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { WizardHelpers } from "/src/content/components/contactView/components/wizardHelper/wizardHelper.tsx.js";
import { StartCadenceHelper } from "/src/content/components/contactView/components/wizardHelper/components/startCadenceHelper/startCadenceHelper.tsx.js";
import { TodayTasksHelper } from "/src/content/components/contactView/components/wizardHelper/components/todayTasksHelper/todayTasksHelper.tsx.js";
import { hasOngoingCadenceTasks } from "/src/content/components/contactView/components/wizardHelper/components/cadenceTaskManager/utils/cadenceTaskManager.utils.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const RenderHelper = ({
  toggleCadenceControlVisibility,
  bobject,
  cadenceControlCallback,
  minimized,
  step,
  isLoading,
  hasCadenceTasks
}) => {
  switch (step) {
    case WizardHelpers.START_CADENCE:
      return /* @__PURE__ */ _jsxDEV(StartCadenceHelper, {
        bobject,
        cadenceControlCallback,
        isLoading,
        minimized
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }, void 0);
    case WizardHelpers.TODAY_TASKS:
      return /* @__PURE__ */ _jsxDEV(TodayTasksHelper, {
        hasCadenceTasks,
        isLoading,
        minimized,
        toggleCadenceControlVisibility
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
  }
};
_c = RenderHelper;
export const CadenceTaskManager = ({
  bobject,
  relatedCompany,
  minimized
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    cache
  } = useSWRConfig();
  const {
    useGetActiveBobjectContext,
    useGetActiveBobject,
    useGetSettings,
    refreshActiveBobjectContext
  } = useExtensionContext();
  const settings = useGetSettings();
  const activeBobject = useGetActiveBobject();
  const contextData = useGetActiveBobjectContext();
  const {
    tasks
  } = useTasksFeed(activeBobject, contextData, useSubscribeListeners);
  const cadenceAction = useRef(null);
  const [isProcessingTasks, setIsProcessingTasks] = useState(false);
  const [placeholderLoading, setPlaceholderLoading] = useState(true);
  const [cadenceControlVisibility, setCadenceControlVisibility] = useState(false);
  const taskRequestSWRKey = `/tasksFeed/${bobject?.id?.value}/1/25`;
  const hasLoadedTasks = !!cache.get(taskRequestSWRKey);
  const hasCadenceTasks = useMemo(() => hasOngoingCadenceTasks(bobject, tasks), [tasks?.length]);
  const isLead = bobject?.id?.typeName === BobjectTypes.Lead;
  const step = tasks?.length > 0 ? WizardHelpers.TODAY_TASKS : WizardHelpers.START_CADENCE;
  const {
    createToast
  } = useToasts();
  function toggleCadenceControlVisibility() {
    setCadenceControlVisibility(!cadenceControlVisibility);
  }
  function cadenceControlCallback(action) {
    setIsProcessingTasks(true);
    if (isLead && relatedCompany) {
      cache.delete(`/tasksFeed/${relatedCompany?.id?.value}/1/25`);
    }
    cadenceAction.current = action;
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: bobject?.id?.typeName
        }
      }));
      refreshActiveBobjectContext();
      setTimeout(() => {
        setPlaceholderLoading(false);
      }, 800);
    }, 2e3);
  }
  useEffect(() => {
    const isCached = cache.get(taskRequestSWRKey);
    const isStopping = cadenceAction?.current === "stop" && !hasCadenceTasks;
    const isStarting = cadenceAction?.current === "start" && hasCadenceTasks;
    const isRescheduling = cadenceAction?.current === "reschedule" && hasCadenceTasks;
    const hasFinishedProcessing = isStarting || isStopping || isRescheduling;
    if (isCached && isProcessingTasks && hasFinishedProcessing) {
      createToast({
        type: "success",
        message: hasCadenceTasks ? t("sidePeek.overview.toasts.cadenceTasksAdded") : t("sidePeek.overview.toasts.cadenceTasksDeleted")
      });
      setIsProcessingTasks(false);
    }
  }, [hasCadenceTasks]);
  useEffect(() => {
    if (placeholderLoading && hasLoadedTasks) {
      const processHasEnded = cadenceAction?.current === null || cadenceAction?.current !== "reschedule" || cadenceAction?.current === "reschedule" && tasks?.length;
      setPlaceholderLoading(false);
      if (isProcessingTasks && processHasEnded)
        setIsProcessingTasks(false);
    }
  }, [tasks?.[0]?.id.value, hasLoadedTasks]);
  useEffect(() => {
    return () => {
      cache.delete(taskRequestSWRKey);
    };
  }, []);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(RenderHelper, {
      bobject,
      toggleCadenceControlVisibility,
      step,
      cadenceControlCallback,
      isLoading: placeholderLoading || isProcessingTasks,
      hasCadenceTasks,
      minimized
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 7
    }, void 0), cadenceControlVisibility && /* @__PURE__ */ _jsxDEV(
      CadenceControlModal,
      {
        bobject: {
          ...bobject,
          assignedTo: settings?.user?.id
        },
        setIsOpen: setCadenceControlVisibility,
        initialStep: {
          step: hasCadenceTasks ? "NEXT_STEPS" : "CONFIGURE_CADENCE",
          hadStartedCadence: false
        },
        callbackOnSave: cadenceControlCallback
      },
      void 0,
      false,
      {
        fileName: _jsxFileName,
        lineNumber: 163,
        columnNumber: 9
      },
      void 0
    )]
  }, void 0, true);
};
_s(CadenceTaskManager, "vTHYwnZ4/4vjYUo0Ol8hm1sl430=", true, function() {
  return [useTranslation, useSWRConfig, useExtensionContext, useTasksFeed, useToasts];
});
_c2 = CadenceTaskManager;
var _c, _c2;
$RefreshReg$(_c, "RenderHelper");
$RefreshReg$(_c2, "CadenceTaskManager");
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
