import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-nextStep-nextStep.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/nextStep/nextStep.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/nextStep/nextStep.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Callout, Chip, ChipGroup, ModalContent, ModalFooter, ModalSection, Radio, RadioGroup, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useFieldsData } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BOBJECT_TYPES, FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { formatDate, getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport8_lodash_isArray from "/vendor/.vite-deps-lodash_isArray.js__v--c631996a.js"; const isArray = __vite__cjsImport8_lodash_isArray.__esModule ? __vite__cjsImport8_lodash_isArray.default : __vite__cjsImport8_lodash_isArray;
import __vite__cjsImport9_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport9_mixpanelBrowser.__esModule ? __vite__cjsImport9_mixpanelBrowser.default : __vite__cjsImport9_mixpanelBrowser;
import { useCadenceTable } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadenceTable.ts.js";
import { STEPS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-cadenceControlModal.machine.tsx.js";
import CadenceIcon from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-cadenceIcon-index.js.js";
import { useCadenceControlModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-useCadenceControlModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-nextStep-nextStep.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ACTIONS = Object.seal({
  NO_STOP: "NO_STOP",
  YES_STOP: "YES_STOP"
});
const STEPS_PROPS = Object.seal({
  NEXT_STEP: {
    message: "cadence.cadenceControlModal.nextStep.nextStep.message",
    title: "cadence.cadenceControlModal.nextStep.nextStep.title"
  },
  STOP_CADENCE: {
    message: "cadence.cadenceControlModal.nextStep.stopCadence.message",
    title: "cadence.cadenceControlModal.nextStep.stopCadence.title"
  }
});
const InfoMessage = ({
  viewType,
  bobject
}) => {
  _s();
  const {
    getFieldValues
  } = useFieldsData();
  const {
    cadence: currentCadenceName,
    defaultCadence
  } = useCadenceTable(bobject);
  const LOGIC_ROLES = FIELDS_LOGIC_ROLE[bobject?.id?.typeName];
  const currentStartDate = bobject?.rawBobject?.[getFieldValues(LOGIC_ROLES.START_CADENCE)?.id] || bobject?.raw?.contents[getFieldValues(LOGIC_ROLES.START_CADENCE)?.id];
  const date = currentStartDate && formatDate(new Date(currentStartDate), "dd LLLL yyyy");
  const messageKey = STEPS_PROPS[viewType].message;
  return /* @__PURE__ */ _jsxDEV(Text, {
    size: "m",
    children: /* @__PURE__ */ _jsxDEV(Trans, {
      i18nKey: messageKey,
      values: viewType === "NEXT_STEP" ? void 0 : {
        cadenceName: currentCadenceName?.name || defaultCadence?.name,
        cadenceDate: date
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 57,
    columnNumber: 5
  }, void 0);
};
_s(InfoMessage, "D8fXQrMRetjobNBtuIeYgHKPOZw=", false, function() {
  return [useFieldsData, useCadenceTable];
});
_c = InfoMessage;
const RadioOptions = ({
  bobject,
  nextStepHandling: [nextStep, setNextStep]
}) => {
  _s2();
  const bobjectType = bobject?.id?.typeName;
  const hasAssigned = !!bobject?.assignedTo || !!getTextFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType]?.ASSIGNED_TO);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceControlModal.nextStep.radioButtons"
  });
  const {
    t: bobjectTypeT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.optionsWrapper,
    children: /* @__PURE__ */ _jsxDEV(RadioGroup, {
      defaultValue: nextStep,
      onChange: setNextStep,
      children: [/* @__PURE__ */ _jsxDEV(Radio, {
        size: "medium",
        value: STEPS.EXIT,
        children: t("nothingElse")
      }, "radio-anything", false, {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 9
      }, void 0), !hasAssigned ? /* @__PURE__ */ _jsxDEV(Tooltip, {
        position: "top",
        title: t("configureCadenceTooltip", {
          bobjectType: bobjectTypeT(bobjectType.toLowerCase())
        }),
        children: /* @__PURE__ */ _jsxDEV(Radio, {
          dataTest: "CadenceModal-NewCadence",
          size: "medium",
          value: STEPS.CONFIGURE_CADENCE,
          disabled: true,
          children: t("configureCadence")
        }, "radio-newCadence", false, {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Radio, {
        dataTest: "CadenceModal-NewCadence",
        size: "medium",
        value: STEPS.CONFIGURE_CADENCE,
        children: t("configureCadence")
      }, "radio-newCadence", false, {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Radio, {
        dataTest: "CadenceModal-NextStep",
        size: "medium",
        value: STEPS.NEXT_STEPS,
        children: t("nextStep")
      }, "radio-nextStep", false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }, void 0)
  }, "changeCadenceRadioKey", false, {
    fileName: _jsxFileName,
    lineNumber: 83,
    columnNumber: 5
  }, void 0);
};
_s2(RadioOptions, "q+H+EjtHS/THqKldjPr3BvfJZd0=", false, function() {
  return [useTranslation, useTranslation];
});
_c2 = RadioOptions;
const NextStepsStep = ({
  handleClose,
  handleContinue
}) => {
  _s3();
  const {
    bobject,
    setStepInfo,
    bobjectName,
    cadenceManagement: {
      stopCadence
    },
    cadenceWasStarted
  } = useCadenceControlModal();
  const parsedBobject = isArray(bobject) ? bobject[0] : bobject;
  const {
    t
  } = useTranslation();
  const [nextStep, setNextStep] = useState(cadenceWasStarted ? STEPS.EXIT : STEPS.CONFIGURE_CADENCE);
  const [action, setAction] = useState(ACTIONS.NO_STOP);
  const viewType = cadenceWasStarted ? "STOP_CADENCE" : "NEXT_STEP";
  const isLastStep = action === ACTIONS.YES_STOP || nextStep === STEPS.EXIT;
  function handleOnClick() {
    if (action === ACTIONS.YES_STOP || !cadenceWasStarted) {
      if (nextStep !== STEPS.CONFIGURE_CADENCE) {
        stopCadence();
      }
      setStepInfo({
        step: nextStep,
        hadStartedCadence: true
      });
      handleContinue(nextStep);
    } else {
      handleClose();
    }
  }
  useEffect(() => {
    if (parsedBobject?.id?.typeName === BOBJECT_TYPES.OPPORTUNITY) {
      mixpanel.track("ENTERED_IN_CC_OPPORTUNITY_STEP_2_CADENCE_CONTROL");
    }
  }, []);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV(ModalSection, {
        size: "l",
        title: t("cadence.cadenceControlModal.nextStep.title", {
          bobjectName
        }),
        "data-text": "ModalSection-Cadence",
        icon: "cadence",
        children: [/* @__PURE__ */ _jsxDEV(Callout, {
          width: "100%",
          withoutIcon: true,
          variant: cadenceWasStarted ? "positive" : "neutral",
          children: /* @__PURE__ */ _jsxDEV("div", {
            "data-test": `Text-ModalCadenceControlWithCadence`,
            className: styles._message__wrapper,
            children: [/* @__PURE__ */ _jsxDEV(CadenceIcon, {
              color: cadenceWasStarted ? "softMelon" : "verySoftPeanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 180,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(InfoMessage, {
              bobject: parsedBobject,
              viewType
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 181,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 176,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 175,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._section_title__wrapper,
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            weight: "medium",
            color: "peanut",
            children: t(STEPS_PROPS[viewType].title)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 185,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 11
        }, void 0), cadenceWasStarted && /* @__PURE__ */ _jsxDEV("div", {
          className: styles._actions__wrapper,
          children: /* @__PURE__ */ _jsxDEV(ChipGroup, {
            defaultValue: action,
            onChange: setAction,
            children: [/* @__PURE__ */ _jsxDEV(Chip, {
              dataTest: "stopTheCadence",
              value: ACTIONS.YES_STOP,
              children: t("cadence.cadenceControlModal.nextStep.yesStopCadence")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 192,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
              value: ACTIONS.NO_STOP,
              children: t("cadence.cadenceControlModal.nextStep.noKeepCadence")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 195,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 191,
            columnNumber: 15
          }, void 0)
        }, "stopCadenceKey", false, {
          fileName: _jsxFileName,
          lineNumber: 190,
          columnNumber: 13
        }, void 0), (action === ACTIONS.YES_STOP || !cadenceWasStarted) && /* @__PURE__ */ _jsxDEV(RadioOptions, {
          bobject: parsedBobject,
          nextStepHandling: [nextStep, setNextStep]
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 202,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 168,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._buttons__wrapper,
        children: /* @__PURE__ */ _jsxDEV(Button, {
          dataTest: `Form-${action === ACTIONS.YES_STOP ? "Continue" : "Accept"}`,
          onClick: handleOnClick,
          children: !isLastStep ? t("cadence.cadenceControlModal.nextStep.continue") : t("cadence.cadenceControlModal.nextStep.accept")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 208,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s3(NextStepsStep, "2KJukkjJkagKWjMfrmL0yGbrV0k=", false, function() {
  return [useCadenceControlModal, useTranslation];
});
_c3 = NextStepsStep;
export default NextStepsStep;
var _c, _c2, _c3;
$RefreshReg$(_c, "InfoMessage");
$RefreshReg$(_c2, "RadioOptions");
$RefreshReg$(_c3, "NextStepsStep");
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
