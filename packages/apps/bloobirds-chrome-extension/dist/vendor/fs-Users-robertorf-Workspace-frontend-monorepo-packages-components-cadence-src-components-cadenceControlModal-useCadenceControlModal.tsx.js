import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-useCadenceControlModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/useCadenceControlModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/useCadenceControlModal.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useState = __vite__cjsImport2_react["useState"];
import { BobjectTypes, BulkActions, FIELDS_LOGIC_ROLE, IMPORT_THRESHOLD, LEAD_FIELDS_LOGIC_ROLE, MIXPANEL_EVENTS, OPPORTUNITY_FIELDS_LOGIC_ROLE, PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getTextFromLogicRole, getValueFromLogicRole, isCompany, isLead, isOpportunity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport5_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport5_mixpanelBrowser.__esModule ? __vite__cjsImport5_mixpanelBrowser.default : __vite__cjsImport5_mixpanelBrowser;
import { useHasCadenceStarted } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useHasCadenceStarted.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CadenceControlModalProvider = ({
  children,
  ...props
}) => {
  _s();
  const {
    bobject,
    initialStep
  } = props;
  const [stepInfo, setStepInfo] = useState(initialStep);
  const opportunityBobject = isOpportunity(bobject);
  const leadBobject = isLead(bobject);
  const companyBobject = isCompany(bobject);
  const {
    hasStarted: cadenceWasStarted,
    isLoading: isLoadingCadenceStarted
  } = useHasCadenceStarted({
    id: bobject?.id,
    companyId: opportunityBobject ? getValueFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY) : void 0
  });
  const cadenceManagement = useCadenceControlData(bobject);
  const bobjectName = leadBobject ? bobject?.fullName || getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) : bobject?.name || getTextFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobject?.id?.typeName]?.NAME);
  return !isLoadingCadenceStarted && /* @__PURE__ */ _jsxDEV(CadenceControlModalContext.Provider, {
    value: {
      ...props,
      isOpportunity: opportunityBobject,
      isLead: leadBobject,
      isCompany: companyBobject,
      bobjectName,
      stepInfo,
      setStepInfo,
      cadenceManagement,
      cadenceWasStarted
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 59,
    columnNumber: 7
  }, void 0);
};
_s(CadenceControlModalProvider, "FpD6z3xg3h09aSPRUpovrRJGqxA=", false, function() {
  return [useHasCadenceStarted, useCadenceControlData];
});
_c = CadenceControlModalProvider;
const CadenceControlModalContext = createContext(null);
export const useCadenceControlModal = () => {
  _s2();
  const context = useContext(CadenceControlModalContext);
  if (context === void 0) {
    throw new Error("useInactiveHandlingModal must be used within the modal provider");
  }
  return context;
};
_s2(useCadenceControlModal, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const putStartCadence = ({
  bobjectId,
  bobjectType,
  startCadence,
  cadenceId
}) => {
  return api.put(`/messaging/cadences/${cadenceId}/start`, {
    bobjectId,
    bobjectType,
    startCadence
  });
};
const launchQueuedBulkAction = ({
  action,
  query,
  params,
  total,
  bobjectType,
  bobjectIds,
  contents
}) => {
  const isStartCadence = action === BulkActions.START_CADENCE;
  const isByQuery = !!query;
  return api.post(`/bobjects/bulkAction/${isByQuery ? "createBulkByQuery" : "createBulk"}`, {
    importName: `${isStartCadence ? "Start" : "Stop"} cadence in ${total} ${PluralBobjectTypes[bobjectType]}`,
    actionType: action,
    bobjectIds,
    ...isByQuery ? {
      query
    } : {},
    bobjectType,
    contents,
    ...isStartCadence ? params : {}
  });
};
const putBulkCadence = ({
  startCadence,
  cadenceId,
  bobjects
}) => {
  const body = bobjects.map((bobject) => ({
    bobjectId: bobject?.id.objectId,
    bobjectType: bobject?.id.typeName,
    startCadence,
    cadenceId
  }));
  return api.put(`/messaging/cadences/start`, body);
};
const putBulkStopCadence = ({
  bobjects
}) => {
  const body = bobjects.map((bobject) => ({
    bobjectId: bobject?.id.objectId,
    bobjectType: bobject?.id.typeName
  }));
  return api.put(`/messaging/cadences/stop`, body);
};
const putStopCadence = ({
  bobjectId,
  bobjectType
}) => {
  return bobjectType !== BobjectTypes.Activity && api.put(`/messaging/cadences/${bobjectType}/${bobjectId}/stop`);
};
const isBulkAction = (bobjectToCheck) => Array.isArray(bobjectToCheck);
export const useCadenceControlData = (bobject) => {
  _s3();
  const [isSaving, setIsSaving] = useState(false);
  const bobjectType = isBulkAction(bobject) ? bobject[0]?.id.typeName : bobject?.id.typeName;
  const baseQueuedProps = {
    bobjectType,
    contents: {}
  };
  const stopCadence = (callback, useEveryBobject, subhomeTab) => {
    setIsSaving(true);
    const {
      isActive,
      total,
      query
    } = useEveryBobject || {};
    const handleCallback = () => {
      setIsSaving(false);
      callback?.();
    };
    if (isBulkAction(bobject)) {
      if (isActive && total >= IMPORT_THRESHOLD && bobject?.length < total) {
        launchQueuedBulkAction({
          action: BulkActions.STOP_CADENCE,
          total,
          query: query ?? {},
          ...baseQueuedProps
        }).then(handleCallback);
      } else if (bobject?.length >= IMPORT_THRESHOLD) {
        const bobjectIds = bobject.map((bob) => bob.id.value);
        launchQueuedBulkAction({
          action: BulkActions.STOP_CADENCE,
          total: bobject?.length,
          bobjectIds,
          ...baseQueuedProps
        }).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.STOP_CADENCE_IMPORT_BULK_ACTION_CLICKED_ON_ + bobjectType.toUpperCase() + "_ON" + subhomeTab?.toUpperCase() + "_TAB");
      } else {
        putBulkStopCadence({
          bobjects: bobject
        }).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.STOP_CADENCE_BASIC_BULK_ACTION_CLICKED_ON_ + bobjectType?.toUpperCase() + "_ON" + subhomeTab?.toUpperCase() + "_TAB");
      }
    } else {
      putStopCadence({
        bobjectId: bobject?.id.objectId,
        bobjectType
      })?.then(handleCallback);
    }
  };
  const saveCadence = (cadence, callback, date, useEveryBobject, subhomeTab) => {
    setIsSaving(true);
    const {
      isActive,
      total,
      query
    } = useEveryBobject || {};
    const params = {
      startCadenceDate: date,
      cadenceId: cadence
    };
    const handleCallback = () => {
      setIsSaving(false);
      callback?.();
    };
    if (isBulkAction(bobject)) {
      if (isActive && total >= IMPORT_THRESHOLD && bobject?.length < total) {
        launchQueuedBulkAction({
          action: BulkActions.START_CADENCE,
          total,
          query: query ?? {},
          params,
          ...baseQueuedProps
        }).then(handleCallback);
      } else if (bobject?.length >= IMPORT_THRESHOLD) {
        const bobjectIds = bobject.map((bob) => bob.id.value);
        launchQueuedBulkAction({
          action: BulkActions.START_CADENCE,
          total: bobject?.length,
          bobjectIds,
          params,
          ...baseQueuedProps
        }).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.SET_CADENCE_IMPORT_BULK_ACTION_CLICKED_ON_ + bobjectType?.toUpperCase() + subhomeTab ? "_ON" + subhomeTab?.toUpperCase() + "_TAB" : "");
      } else {
        putBulkCadence({
          startCadence: date,
          cadenceId: cadence,
          bobjects: bobject
        }).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.SET_CADENCE_BASIC_BULK_ACTION_CLICKED_ON_ + bobjectType?.toUpperCase() + subhomeTab ? "_ON" + subhomeTab?.toUpperCase() + "_TAB" : "");
      }
    } else {
      putStartCadence({
        bobjectId: bobject?.id.objectId,
        bobjectType,
        startCadence: date,
        cadenceId: cadence
      }).then(handleCallback);
    }
  };
  return {
    isSaving,
    saveCadence,
    stopCadence
  };
};
_s3(useCadenceControlData, "eMOwVGmsGTxcHU/RKzhImH6r4B4=");
var _c;
$RefreshReg$(_c, "CadenceControlModalProvider");
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
