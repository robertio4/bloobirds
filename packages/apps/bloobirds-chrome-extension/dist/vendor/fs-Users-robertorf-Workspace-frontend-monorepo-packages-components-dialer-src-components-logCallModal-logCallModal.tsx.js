import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-components-logCallModal-logCallModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/components/logCallModal/logCallModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/components/logCallModal/logCallModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Controller, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Chip, ChipGroup, DateTimePicker, Input, Item, Modal, ModalCloseIcon, ModalContent, ModalFooter, ModalHeader, ModalTitle, Select, Spinner, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, MessagesEvents, MIXPANEL_EVENTS, PluralBobjectTypes, BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import __vite__cjsImport10_md5 from "/vendor/.vite-deps-md5.js__v--42d373d6.js"; const md5 = __vite__cjsImport10_md5.__esModule ? __vite__cjsImport10_md5.default : __vite__cjsImport10_md5;
import __vite__cjsImport11_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport11_mixpanelBrowser.__esModule ? __vite__cjsImport11_mixpanelBrowser.default : __vite__cjsImport11_mixpanelBrowser;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { fillReferenceFields, getMainBobjectId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-utils.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-components-logCallModal-logCallModal.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const LogCallModal = (props) => {
  _s();
  const {
    leadId,
    companyId,
    userPhoneNumber,
    dialedNumber,
    onClose,
    opportunityId,
    leadsPhoneNumbers
  } = props;
  const [loggingCall, setLoggingCall] = useState();
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const {
    settings
  } = useActiveUserSettings();
  const {
    createToast
  } = useToasts();
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const {
    t
  } = useTranslation();
  const defaultValues = {
    direction: "OUTGOING",
    userPhoneNumber,
    dialedNumber,
    callDateTime: new Date()
  };
  const {
    control,
    getValues,
    setValue
  } = useForm({
    defaultValues
  });
  async function openCorrectContactFlow(activity) {
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(`/linkedin/${PluralBobjectTypes[mainBobjectId.split("/")[1]]?.toLowerCase()}/${mainBobjectId.split("/")[2]}`);
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }
  async function logCall() {
    const values = getValues();
    setLoggingCall(true);
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LOG_CALL_BUTTON_ON_MODAL_OTO);
    const response = await api.post(`/calls/whiteLabel/call`, {
      sdrPhone: values?.userPhoneNumber,
      leadPhone: values?.dialedNumber,
      leadId,
      companyId,
      direction: values?.direction,
      callDateTime: values?.callDateTime?.toISOString(),
      callSid: `BB${md5(`${userPhoneNumber}${dialedNumber}${new Date().toISOString()}`)}`,
      otherFields: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunityId
      }
    });
    try {
      createToast({
        message: t("dialer.logCall.toast.success"),
        type: "success"
      });
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    } catch (e) {
      console.error(e);
    }
    const activity = response?.data?.activity;
    if (activity) {
      api.get(`/bobjects/${activity?.value}/form?injectReferences=true`).then((response2) => {
        const activityToCCF = fillReferenceFields(response2?.data);
        if (response2?.data) {
          setActivityCCF(activityToCCF);
        }
        openCorrectContactFlow(activityToCCF);
      });
    } else {
      onClose();
    }
    setTimeout(() => {
      setLoggingCall(false);
    }, 1500);
  }
  const {
    data: userPhones
  } = useSWR(`/entities/users/${settings?.user?.id}/phoneNumbers`, async () => {
    const response = await api.get(`/entities/users/${settings?.user?.id}/phoneNumbers`);
    const filteredPhones = response?.data?._embedded?.phoneNumbers.filter((phoneNumber) => phoneNumber?.type === "TWILIO_NUMBER" || phoneNumber?.type === "VERIFIED_NUMBER");
    if (!getValues()?.userPhoneNumber && filteredPhones.length > 0) {
      const defaultOrFirst = filteredPhones.find((phoneNumber) => phoneNumber?.phoneByDefault) || filteredPhones[0];
      setValue("userPhoneNumber", defaultOrFirst.phoneNumber);
    }
    return filteredPhones;
  });
  useEffect(() => {
    if (!getValues()?.userPhoneNumber && userPhones?.length > 0) {
      const defaultOrFirst = userPhones.find((phoneNumber) => phoneNumber?.phoneByDefault) || userPhones[0];
      setValue("userPhoneNumber", defaultOrFirst.phoneNumber);
    }
  }, []);
  function handleClose() {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: mainActivityBobject.id.typeName
      }
    }));
    onClose();
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: !showCorrectContactFlow ? /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: /* @__PURE__ */ _jsxDEV(Modal, {
        onClose,
        width: 342,
        open: true,
        children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
          size: "small",
          className: styles.header,
          children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
            size: "small",
            icon: "callOutgoing",
            children: t("dialer.logCallModal.title")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 186,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
            onClick: onClose,
            size: "small"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 189,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(ModalContent, {
          className: styles.content,
          children: [/* @__PURE__ */ _jsxDEV(Controller, {
            control,
            name: "direction",
            render: ({
              field
            }) => {
              const handleOnChange = field.onChange;
              return /* @__PURE__ */ _jsxDEV(_Fragment, {
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  size: "s",
                  children: t("dialer.direction.title")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 199,
                  columnNumber: 23
                }, void 0), /* @__PURE__ */ _jsxDEV(ChipGroup, {
                  value: field.value,
                  onChange: handleOnChange,
                  children: [/* @__PURE__ */ _jsxDEV(Chip, {
                    value: "OUTGOING",
                    size: "small",
                    children: t("dialer.direction.outgoing")
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 201,
                    columnNumber: 25
                  }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
                    value: "INCOMING",
                    size: "small",
                    children: t("dialer.direction.incoming")
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 204,
                    columnNumber: 25
                  }, void 0)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 200,
                  columnNumber: 23
                }, void 0)]
              }, void 0, true);
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 192,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Controller, {
            control,
            name: "callDateTime",
            render: ({
              field
            }) => {
              const handleOnChange = field.onChange;
              return /* @__PURE__ */ _jsxDEV(DateTimePicker, {
                value: field.value,
                onChange: handleOnChange,
                placeholder: t("dialer.logCallModal.date"),
                width: "100%"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 218,
                columnNumber: 21
              }, void 0);
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 212,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Controller, {
            control,
            name: "userPhoneNumber",
            render: ({
              field
            }) => {
              const handleOnChange = field.onChange;
              return /* @__PURE__ */ _jsxDEV(Select, {
                width: "100%",
                value: field.value,
                onChange: handleOnChange,
                placeholder: t("dialer.logCallModal.yourPhoneNumber"),
                borderless: true,
                children: userPhones?.map((phoneNumber) => /* @__PURE__ */ _jsxDEV(Item, {
                  value: phoneNumber?.phoneNumber,
                  children: phoneNumber?.phoneNumber
                }, phoneNumber.id, false, {
                  fileName: _jsxFileName,
                  lineNumber: 241,
                  columnNumber: 25
                }, void 0))
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 233,
                columnNumber: 21
              }, void 0);
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 227,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Controller, {
            control,
            name: "dialedNumber",
            render: ({
              field
            }) => {
              const handleOnChange = field.onChange;
              return leadsPhoneNumbers?.length > 0 ? /* @__PURE__ */ _jsxDEV(Select, {
                width: "100%",
                value: field.value,
                onChange: handleOnChange,
                placeholder: t("dialer.logCallModal.phoneNumber"),
                borderless: true,
                children: leadsPhoneNumbers.map((phoneNumber, idx) => /* @__PURE__ */ _jsxDEV(Item, {
                  value: phoneNumber,
                  children: phoneNumber
                }, phoneNumber + "-" + idx, false, {
                  fileName: _jsxFileName,
                  lineNumber: 263,
                  columnNumber: 25
                }, void 0))
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 255,
                columnNumber: 21
              }, void 0) : /* @__PURE__ */ _jsxDEV(Input, {
                width: "100%",
                value: field.value,
                onChange: handleOnChange,
                placeholder: t("dialer.logCallModal.phoneNumber"),
                borderless: true
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 269,
                columnNumber: 21
              }, void 0);
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 249,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
          className: styles.footer,
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            size: "small",
            variant: "clear",
            onClick: onClose,
            children: t("common.cancel")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 281,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            size: "small",
            variant: "primary",
            onClick: logCall,
            children: !loggingCall ? t("dialer.logCall.button") : /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              color: "white",
              size: 12
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 288,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 284,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 280,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 184,
        columnNumber: 11
      }, void 0)
    }, void 0, false) : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: activityCCF && mainActivityBobject && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
        referenceBobject: mainActivityBobject,
        handleClose
      })
    }, void 0, false)
  }, void 0, false);
};
_s(LogCallModal, "2U3bDiRDB1AlFIKpK2qWWb3bR7s=", false, function() {
  return [useActiveUserSettings, useToasts, useWizardContext, useTranslation, useForm, useSWR];
});
_c = LogCallModal;
var _c;
$RefreshReg$(_c, "LogCallModal");
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
