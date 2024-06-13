import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-cadenceControlModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/cadenceControlModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/cadenceControlModal.tsx", _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Modal } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ACTIVITY_MODE, BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getExtensionBobjectByIdFields, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useMachine } from "/vendor/.vite-deps-@xstate_react.js__v--bb985310.js";
import __vite__cjsImport9_lodash_isArray from "/vendor/.vite-deps-lodash_isArray.js__v--c631996a.js"; const isArray = __vite__cjsImport9_lodash_isArray.__esModule ? __vite__cjsImport9_lodash_isArray.default : __vite__cjsImport9_lodash_isArray;
import ConfigureCadenceStep from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-configureCadence-configureCadence.tsx.js";
import { EVENTS, STEPS, stepsMachine } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-cadenceControlModal.machine.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-cadenceControlModal.module.css.js";
import CadenceFeedbackStep from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-cadenceFeedbackStep-cadenceFeedbackStep.tsx.js";
import { CreateNextStep } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-createNextStep-createNextStep.tsx.js";
import NextStepsStep from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-nextStep-nextStep.tsx.js";
import { CadenceControlModalProvider, useCadenceControlModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-useCadenceControlModal.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const STEPS_PROPS = (t) => Object.seal({
  INITIAL: {
    title: t("cadenceControl"),
    width: 640,
    dataTest: "CadenceNextSteps"
  },
  NEXT_STEPS: {
    title: t("cadenceControl"),
    width: 640,
    dataTest: "CadenceNextSteps"
  },
  CONFIGURE_CADENCE_OPPORTUNITY: {
    title: t("selectCadence"),
    width: 806,
    dataTest: "CadenceConfigOpportunity"
  },
  CONFIGURE_CADENCE_COMPANY: {
    title: t("selectCadence"),
    width: 806,
    dataTest: "CadenceConfigCompany"
  },
  UPDATE_LEADS_STATUSES: {
    title: t("updatesLeadStatus"),
    width: 1020,
    dataTest: "CadenceUpdateLead"
  },
  CADENCE_FEEDBACK: {
    title: t("yourTasksAreBeingRescheduled"),
    width: 512,
    dataTest: "CadenceFeedback"
  },
  SCHEDULE_NEXT_STEP: {
    title: t("createNextStepTitle"),
    width: 760,
    dataTest: "NextStepModal"
  }
});
_c = STEPS_PROPS;
const withProvider = (ModalComponent) => {
  var _s = $RefreshSig$();
  return _s((props) => {
    _s();
    const {
      bobject,
      ...rest
    } = props;
    const isBulk = isArray(bobject);
    const sampleBobject = isBulk ? bobject[0] : bobject;
    const [bobjectFromExtensionBobject, setBobjectFromExtensionBobject] = useState(bobject);
    React.useEffect(() => {
      return () => {
        props?.callbackOnClose?.();
      };
    }, []);
    if (!sampleBobject?.cadence && !isBulk && bobjectFromExtensionBobject?.raw) {
      getExtensionBobjectByIdFields(sampleBobject?.id).then(({
        data
      }) => setBobjectFromExtensionBobject(data));
    }
    const modalProps = {
      ...rest,
      bobject: bobjectFromExtensionBobject
    };
    return /* @__PURE__ */ _jsxDEV(CadenceControlModalProvider, {
      ...modalProps,
      children: /* @__PURE__ */ _jsxDEV(ModalComponent, {
        ...modalProps
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 7
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 5
    }, void 0);
  }, "ThmrzoLT+MhIFGJp6FMNLLcAq08=");
};
export const ControlModal = ({
  bobject,
  setIsOpen,
  initialStep,
  callbackOnClose,
  callbackOnSave,
  useEveryBobject,
  subhomeTab,
  onEmailPreviewClicked,
  previousStep = true
}) => {
  _s2();
  const {
    isOpportunity,
    stepInfo
  } = useCadenceControlModal();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const mutateTasks = () => {
    window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
      detail: {
        type: BobjectTypes.Task
      }
    }));
  };
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceControlModal"
  });
  function handleClose() {
    callbackOnClose?.();
    setIsOpen?.(false);
  }
  const handleOpenModal = (type) => {
    const companyName = bobject.name;
    const parsedOpp = isOpportunity ? bobject : void 0;
    openMinimizableModal({
      type,
      title: companyName && companyName !== "" ? companyName.slice(0, 10) : t("untitledCompany"),
      data: {
        mode: ACTIVITY_MODE.CREATE,
        company: {
          name: getValueFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          data: bobject
        },
        opportunity: parsedOpp && {
          name: getValueFromLogicRole(parsedOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
          data: parsedOpp
        }
      }
    });
  };
  const [{
    value: step
  }, send] = useMachine(stepsMachine, {
    context: {
      nextStep: () => handleOpenModal("task"),
      handleClose
    }
  });
  let currentStep = step;
  useEffect(() => {
    if (send) {
      if (typeof initialStep === "string" || typeof stepInfo === "string") {
        send(initialStep || stepInfo);
      } else {
        send(initialStep?.step || stepInfo?.step);
      }
    }
  }, [initialStep, send]);
  if (step === STEPS.CONFIGURE_CADENCE) {
    currentStep = isOpportunity ? `${STEPS.CONFIGURE_CADENCE}_OPPORTUNITY` : `${STEPS.CONFIGURE_CADENCE}_COMPANY`;
  }
  const otherProps = STEPS_PROPS(t)[currentStep];
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    onClose: handleClose,
    ...otherProps,
    className: styles.modalCadence,
    children: [step === STEPS.NEXT_STEPS && /* @__PURE__ */ _jsxDEV(NextStepsStep, {
      handleContinue: (selectedStep) => {
        if (selectedStep !== STEPS.CONFIGURE_CADENCE) {
          mutateTasks();
          callbackOnSave?.("stop");
        }
        send(EVENTS.NEXT, {
          selectedStep
        });
      },
      handleClose
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 9
    }, void 0), step === STEPS.CONFIGURE_CADENCE && /* @__PURE__ */ _jsxDEV(
      ConfigureCadenceStep,
      {
        bobject,
        previousStep: initialStep?.step ? initialStep?.step !== STEPS.CONFIGURE_CADENCE : previousStep,
        handleBack: () => send(EVENTS.PREVIOUS),
        handleNext: () => {
          mutateTasks();
          send(EVENTS.NEXT);
          callbackOnSave?.(initialStep?.step === STEPS.CONFIGURE_CADENCE ? "start" : "reschedule");
        },
        useEveryBobject,
        subhomeTab,
        onEmailPreviewClicked
      },
      void 0,
      false,
      {
        fileName: _jsxFileName,
        lineNumber: 203,
        columnNumber: 9
      },
      void 0
    ), step === STEPS.CADENCE_FEEDBACK && /* @__PURE__ */ _jsxDEV(CadenceFeedbackStep, {
      handleNext: () => {
        send(EVENTS.NEXT);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 9
    }, void 0), step === STEPS.SCHEDULE_NEXT_STEP && /* @__PURE__ */ _jsxDEV(CreateNextStep, {
      handleBack: () => send(EVENTS.PREVIOUS),
      handleNext: () => {
        send(EVENTS.NEXT);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 186,
    columnNumber: 5
  }, void 0);
};
_s2(ControlModal, "i506tEiVwSnRzX/zOxS0yt6cB+o=", false, function() {
  return [useCadenceControlModal, useMinimizableModals, useTranslation, useMachine];
});
_c2 = ControlModal;
export const CadenceControlModal = withProvider(ControlModal);
_c3 = CadenceControlModal;
var _c, _c2, _c3;
$RefreshReg$(_c, "STEPS_PROPS");
$RefreshReg$(_c2, "ControlModal");
$RefreshReg$(_c3, "CadenceControlModal");
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
