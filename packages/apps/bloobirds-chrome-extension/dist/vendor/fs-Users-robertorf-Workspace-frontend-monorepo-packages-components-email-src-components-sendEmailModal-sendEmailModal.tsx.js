import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-sendEmailModal-sendEmailModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/sendEmailModal/sendEmailModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/sendEmailModal/sendEmailModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, createToast, Modal, ModalCloseIcon, ModalContent, ModalFooter, ModalHeader, ModalTitle, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { TASK_FIELDS_LOGIC_ROLE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { replaceVariables, api, getFieldByLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-sendEmailModal-sendEmailModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
var ModalType = /* @__PURE__ */ ((ModalType2) => {
  ModalType2["SEND"] = "SEND_NOW";
  ModalType2["RETRY"] = "RETRY";
  ModalType2["RESEND"] = "RESEND";
  return ModalType2;
})(ModalType || {});
const MODAL_TEXT = (t) => ({
  ["SEND_NOW" /* SEND */]: {
    single: t("send")
  },
  ["RETRY" /* RETRY */]: {
    single: t("retry")
  },
  ["RESEND" /* RESEND */]: {
    bulk: t("bulk")
  }
});
_c = MODAL_TEXT;
const SendEmailModal = ({
  bobject,
  modalType,
  onSubmit = () => {
  },
  onClose = () => {
  }
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.sendEmailModal"
  });
  const title = modalType === "SEND_NOW" /* SEND */ ? t("sendEmail") : t("retrySend");
  const isBulkAction = Array.isArray(bobject);
  const text = isBulkAction ? replaceVariables(MODAL_TEXT(t)[modalType]?.bulk, {
    EMAILS_NUMBER: bobject?.length
  }) : MODAL_TEXT(t)[modalType].single;
  const isScheduledEmail = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole === TASK_TYPE.SCHEDULED_EMAIL;
  const [isSubmitting, setIsSubmitting] = useState(null);
  const sendEmail = async () => {
    try {
      const isBulkAction2 = Array.isArray(bobject);
      setIsSubmitting(true);
      if (isBulkAction2) {
        const url = isScheduledEmail ? `/messaging/scheduledEmails/send` : `/messaging/automatedEmail/send`;
        const tasksId = bobject.map((bobjectItem) => bobjectItem?.id.objectId);
        await api.put(url, {
          tasksId
        });
        onClose();
        setIsSubmitting(false);
        createToast({
          type: "success",
          message: t("toasts.success"),
          position: "top-right"
        });
        onSubmit();
      } else {
        const url = isScheduledEmail ? `/messaging/scheduledEmails/${bobject?.id.objectId}/send` : `/messaging/automatedEmail/${bobject?.id.objectId}/send`;
        await api.put(url);
        onClose();
        setIsSubmitting(false);
        createToast({
          type: "success",
          message: t("toasts.success"),
          position: "top-right"
        });
        onSubmit();
      }
    } catch (e) {
      onClose();
      setIsSubmitting(false);
      if (e?.response?.status === 504) {
        createToast({
          type: "warning",
          message: t("toasts.delay"),
          position: "top-right"
        });
      } else {
        createToast({
          type: "error",
          message: t("toasts.error"),
          position: "top-right"
        });
        onSubmit();
      }
    }
  };
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    width: 640,
    onClose,
    children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
      children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
        onClick: onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.content,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: text
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "smartEmailModal.components.sendEmailModal.cannotBeUndonde"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 136,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 135,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        variant: "tertiary",
        onClick: onClose,
        children: t("back")
      }, "backButton", false, {
        fileName: _jsxFileName,
        lineNumber: 141,
        columnNumber: 9
      }, void 0), ",", /* @__PURE__ */ _jsxDEV(Button, {
        variant: "primary",
        dataTest: "confirmSendAutomatedEmailButton",
        onClick: () => {
          sendEmail();
        },
        children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
          color: "white",
          size: 14,
          name: "loadingCircle"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 154,
          columnNumber: 13
        }, void 0) : t("sendButton", {
          count: isBulkAction ? bobject.length : 1
        })
      }, "sendEmailButton", false, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 127,
    columnNumber: 5
  }, void 0);
};
_s(SendEmailModal, "F3jlZAIEPsxoFBWdai4nOHZzp1g=", false, function() {
  return [useTranslation];
});
_c2 = SendEmailModal;
export default SendEmailModal;
var _c, _c2;
$RefreshReg$(_c, "MODAL_TEXT");
$RefreshReg$(_c2, "SendEmailModal");
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
