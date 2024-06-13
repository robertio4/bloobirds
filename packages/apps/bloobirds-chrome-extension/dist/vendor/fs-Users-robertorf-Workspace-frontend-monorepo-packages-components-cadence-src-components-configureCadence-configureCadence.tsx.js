import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-configureCadence-configureCadence.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/configureCadence/configureCadence.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/configureCadence/configureCadence.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useLayoutEffect = __vite__cjsImport2_react["useLayoutEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { Button, Callout, createToast, DateTimePicker, Icon, Item, ModalContent, ModalFooter, Select, Spinner, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getFieldByLogicRole, getTextFromLogicRole, isLead, isOpportunity, toSentenceCase } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { addHours, isBefore } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import __vite__cjsImport11_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport11_mixpanelBrowser.__esModule ? __vite__cjsImport11_mixpanelBrowser.default : __vite__cjsImport11_mixpanelBrowser;
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { useCadenceSteps } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadenceSteps.ts.js";
import { useCadenceTable } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadenceTable.ts.js";
import { useCadences } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadences.ts.js";
import { useCadenceControlData } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-useCadenceControlModal.tsx.js";
import { CadencePreview } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadencePreview-cadencePreview.tsx.js";
import { CadenceSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceSelector-cadenceSelector.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-configureCadence-configureCadence.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const parseDate = (date) => new Date(date.getTime() - date.getTimezoneOffset() * 6e4);
export const ConfigureCadenceStep = ({
  handleBack,
  handleNext,
  bobject,
  previousStep,
  useEveryBobject,
  subhomeTab,
  onCadenceChange,
  onDateChange
}) => {
  _s();
  const userId = useActiveUserId();
  const {
    cadence,
    defaultCadence
  } = useCadenceTable(Array.isArray(bobject) ? void 0 : bobject);
  const {
    saveCadence
  } = useCadenceControlData(bobject);
  const [selectedCadence, setSelectedCadence] = useState(cadence?.id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateHasChanged, setDateHasChanged] = useState(false);
  const isBulkAction = Array.isArray(bobject);
  const selectedBobject = isBulkAction ? bobject[0] : bobject;
  const {
    cadences,
    isLoading
  } = useCadences({
    bobjectTypeName: selectedBobject?.id.typeName,
    accountId: selectedBobject?.id?.accountId
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.configureCadence"
  });
  const {
    t: bobjectTypeT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  const {
    steps
  } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCadenceSelector, setShowCadenceSelector] = useState(false);
  const ref = useRef(null);
  const modalRef = useRef(null);
  useClickAway(ref, () => setShowCadenceSelector(false));
  const isSelectedDatePast = isBefore(addHours(selectedDate, 1) || new Date(), new Date().setHours(0));
  const LOGIC_ROLES = FIELDS_LOGIC_ROLE[selectedBobject?.id.typeName];
  const enabledCadences = cadences?.filter((cadenceElement) => cadenceElement?.enabled);
  const stage = isOpportunity(bobject) ? "sales" : "prospecting";
  useEffect(() => {
    let showDateTime = false;
    steps?.forEach((step) => {
      if (step?.dayNumber === 0 && step.actionTypes.includes("AUTOMATED_EMAIL")) {
        showDateTime = step.automationSchedulingMode === "DELAY";
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);
  }, [steps, selectedCadence]);
  useLayoutEffect(() => {
    if (!showCadenceSelector) {
      if (modalRef?.current) {
        modalRef?.current?.click();
      }
    }
  }, [showCadenceSelector]);
  const bobjectName = selectedBobject?.id.typeName;
  const findCadenceByName = (cadenceName) => cadences?.find((cadenceData) => cadenceData.name === cadenceName);
  const generateData = (isActionInBulk) => {
    if (isActionInBulk) {
      return {
        currentCadence: null,
        currentStartDate: null,
        defaultCadence: null
      };
    }
    return {
      currentCadence: cadence,
      currentStartDate: getTextFromLogicRole(bobject, LOGIC_ROLES?.START_CADENCE),
      currentDefaultCadence: defaultCadence
    };
  };
  const {
    currentCadence,
    currentStartDate,
    currentDefaultCadence
  } = generateData(isBulkAction);
  const hasData = !!(selectedCadence && selectedDate);
  const cadenceHasChanged = selectedCadence !== currentCadence?.id;
  useEffect(() => {
    setDateHasChanged(true);
  }, [selectedDate]);
  useEffect(() => {
    if (currentDefaultCadence) {
      setSelectedCadence(currentDefaultCadence?.id);
    }
  }, [currentDefaultCadence]);
  useEffect(() => {
    if (currentCadence) {
      setSelectedCadence(cadence?.enabled ? currentCadence?.id : null);
    }
  }, [currentCadence]);
  useEffect(() => {
    if (currentStartDate) {
      setSelectedDate(new Date(currentStartDate));
    }
  }, [currentStartDate]);
  useEffect(() => {
    if (selectedDate?.getHours() === 0 && selectedDate?.getMinutes() === 0) {
      selectedDate.setHours(new Date().getHours());
      selectedDate.setMinutes(new Date().getMinutes());
      setSelectedDate(selectedDate);
    }
  }, [selectedDate]);
  const disableButton = isSubmitting || !hasData || !(dateHasChanged || cadenceHasChanged);
  const showMessage = selectedCadence === findCadenceByName(defaultCadence)?.id && selectedCadence && defaultCadence || selectedDate && !isOpportunity;
  const hasCadences = cadences?.length > 0;
  const leadStatus = getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const showLeadChangeStatusMessage = isLead(bobject) && [LEAD_STATUS_LOGIC_ROLE.NEW, LEAD_STATUS_LOGIC_ROLE.BACKLOG, LEAD_STATUS_LOGIC_ROLE.DELIVERED].includes(leadStatus);
  function localSaveCadence(startCadenceDate) {
    const url = `/messaging/cadences/${selectedCadence}/start`;
    const body = {
      bobjectId: selectedBobject?.id?.objectId,
      bobjectType: selectedBobject?.id?.typeName,
      startCadence: startCadenceDate || new Date()
    };
    const toastMessage = t("toast", {
      bobjectType: bobjectTypeT(bobject?.id?.typeName?.toLowerCase())
    });
    api.put(url, body).then(() => {
      createToast({
        type: "success",
        message: toastMessage
      });
      handleNext();
    });
  }
  const actionsEnabled = previousStep || handleNext;
  const startButton = useRef(void 0);
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [isLead(bobject) && !isLoading && !cadences && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._banner_wrapper,
      children: /* @__PURE__ */ _jsxDEV(Callout, {
        width: "100%",
        variant: "alert",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "cadence",
            color: "banana"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 231,
            columnNumber: 15
          }, void 0), "\uFE0F", " ", /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "cadence.configureCadence.topCallout",
            values: {
              cadence: t("cadence")
            },
            components: [/* @__PURE__ */ _jsxDEV("strong", {}, "0", false, {
              fileName: _jsxFileName,
              lineNumber: 236,
              columnNumber: 19
            }, void 0), /* @__PURE__ */ _jsxDEV("a", {
              className: styles._lead_cadence_link,
              onClick: () => {
                window.open("https://app.bloobirds.com/app/playbook/cadences", "_blank");
              }
            }, "1", false, {
              fileName: _jsxFileName,
              lineNumber: 237,
              columnNumber: 19
            }, void 0), /* @__PURE__ */ _jsxDEV("strong", {}, "2", false, {
              fileName: _jsxFileName,
              lineNumber: 244,
              columnNumber: 19
            }, void 0)]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 232,
            columnNumber: 15
          }, void 0), "\u2728"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 230,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 229,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalContent, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._section_title__wrapper,
        ref: modalRef,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          dataTest: "Text-Modal-ConfigureProspectingCadence",
          size: "m",
          weight: "bold",
          align: "center",
          color: "peanut",
          children: t("title")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 254,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 253,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._cadence_preview_wrapper,
        children: /* @__PURE__ */ _jsxDEV(CadencePreview, {
          cadenceId: selectedCadence
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 265,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 264,
        columnNumber: 9
      }, void 0), showCadenceSelector && /* @__PURE__ */ _jsxDEV(CadenceSelector, {
        selectedBobject,
        onCadenceSelected: (c) => {
          setSelectedCadence(c.id);
          setShowCadenceSelector(false);
          onCadenceChange?.(c.id);
        },
        ref,
        userId,
        className: styles._command_box_wrapper
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 268,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._section__wrapper,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._list__wrapper,
          children: /* @__PURE__ */ _jsxDEV(Select, {
            dataTest: `${bobjectName?.toUpperCase()}__CADENCE`,
            defaultValue: defaultCadence && findCadenceByName(defaultCadence)?.id,
            value: selectedCadence || !hasCadences && "none",
            placeholder: t("placeholder", {
              bobjectType: toSentenceCase(bobjectTypeT(bobjectName?.toLowerCase()))
            }),
            disabled: !hasCadences,
            width: "100%",
            onClick: () => setShowCadenceSelector(true),
            children: hasCadences ? enabledCadences?.map((cadenceItem) => /* @__PURE__ */ _jsxDEV(Item, {
              value: cadenceItem.id,
              dataTest: `${cadenceItem.name}`,
              className: styles.hidden,
              children: cadenceItem.name
            }, cadenceItem.id, false, {
              fileName: _jsxFileName,
              lineNumber: 295,
              columnNumber: 19
            }, void 0)) : /* @__PURE__ */ _jsxDEV(Item, {
              value: "none",
              dataTest: "cadence-not-exist",
              children: t("none")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 305,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 282,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 281,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(DateTimePicker, {
            dataTest: "BaseInput-Cadence-DatetimePicker",
            value: selectedDate,
            placeholder: t("datePlaceholder"),
            withTimePicker: isStartCadenceWithDateTime,
            onChange: (date) => {
              setDateHasChanged(true);
              setSelectedDate(date);
              onDateChange?.(date);
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 312,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 311,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 280,
        columnNumber: 9
      }, void 0), isSelectedDatePast && /* @__PURE__ */ _jsxDEV(Callout, {
        width: "100%",
        variant: "alert",
        icon: "alertTriangle",
        children: t("bottomCallout")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 326,
        columnNumber: 11
      }, void 0), showLeadChangeStatusMessage && /* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles._on_prospection_message, {
          [styles._with_more_messages]: isSelectedDatePast
        }),
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          htmlTag: "span",
          color: "peanut",
          inline: true,
          children: [/* @__PURE__ */ _jsxDEV("span", {
            role: "img",
            "aria-label": "backhand",
            children: ["\u{1F449}", " "]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 337,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "cadence.configureCadence.leadStatusCallout"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 340,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 336,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 331,
        columnNumber: 11
      }, void 0), actionsEnabled && (!isBulkAction && hasCadences && showMessage ? /* @__PURE__ */ _jsxDEV(Callout, {
        variant: "alert",
        width: "100%",
        withoutIcon: true,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles._message__wrapper,
          children: /* @__PURE__ */ _jsxDEV("div", {
            children: [/* @__PURE__ */ _jsxDEV("span", {
              role: "img",
              "aria-label": "hand",
              children: "\u{1F449}"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 349,
              columnNumber: 19
            }, void 0), " ", selectedCadence === findCadenceByName(defaultCadence)?.id && /* @__PURE__ */ _jsxDEV(Trans, {
              i18nKey: "cadence.configureCadence.recommendedStage",
              values: {
                stage
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 353,
              columnNumber: 21
            }, void 0), " ", !selectedDate && /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: t("selectDateInfo")
            }, void 0, false)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 348,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 347,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 346,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
        className: styles._cadence_placeholder
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 360,
        columnNumber: 13
      }, void 0)), isBulkAction && /* @__PURE__ */ _jsxDEV(Callout, {
        width: "100%",
        withoutIcon: true,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles._message__wrapper,
          children: /* @__PURE__ */ _jsxDEV("div", {
            children: [/* @__PURE__ */ _jsxDEV("span", {
              role: "img",
              "aria-label": "hand",
              children: "\u{1F449}"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 366,
              columnNumber: 17
            }, void 0), " ", t("bulkInfo")]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 365,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 364,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 363,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 7
    }, void 0), actionsEnabled && /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._buttons__wrapper,
        children: [previousStep && /* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          onClick: handleBack,
          children: t("back")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 379,
          columnNumber: 15
        }, void 0), handleNext && /* @__PURE__ */ _jsxDEV("div", {
          ref: startButton,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: disableButton && t("startCadenceDateInfo"),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(Button, {
              dataTest: "saveCadence",
              disabled: disableButton,
              onClick: (event) => {
                event.currentTarget.disabled = true;
                setIsSubmitting(true);
                mixpanel.track(MIXPANEL_EVENTS.CLICK_START_CADENCE_FROM_MODAL);
                setTimeout(() => {
                  if (selectedCadence && selectedDate) {
                    const startCadenceDate = isStartCadenceWithDateTime ? spacetime(selectedDate).format("iso-utc") : parseDate(selectedDate);
                    saveCadence ? saveCadence(selectedCadence, handleNext, startCadenceDate, useEveryBobject, subhomeTab) : localSaveCadence(startCadenceDate);
                    setIsSubmitting(false);
                  }
                }, 2500);
              },
              children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
                name: "loadingCircle",
                size: 16,
                color: "white"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 413,
                columnNumber: 23
              }, void 0) : t("start")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 386,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 385,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 384,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 377,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 376,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 226,
    columnNumber: 5
  }, void 0);
};
_s(ConfigureCadenceStep, "UXTD0G7B7Hbc/zwTeOQ/5PjN38E=", false, function() {
  return [useActiveUserId, useCadenceTable, useCadenceControlData, useCadences, useTranslation, useTranslation, useCadenceSteps, useClickAway];
});
_c = ConfigureCadenceStep;
export default ConfigureCadenceStep;
var _c;
$RefreshReg$(_c, "ConfigureCadenceStep");
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
