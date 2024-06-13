import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-cancelEmailModal-cancelEmailModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/cancelEmailModal/cancelEmailModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/cancelEmailModal/cancelEmailModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Modal, ModalContent, ModalFooter, Spinner, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-cancelEmailModal-cancelEmailModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CancelEmailModal = ({
  handleClose,
  onSubmit,
  open,
  bobject
}) => {
  _s();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    createToast
  } = useToasts();
  const isBulkAction = Array.isArray(bobject);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.cancelEmailModal"
  });
  const cancelEmail = () => {
    setIsSubmitting(true);
    api.delete(`/bobjects/${bobject?.id?.value}`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    }).then(() => {
      handleClose();
      if (onSubmit) {
        onSubmit();
      }
      setIsSubmitting(false);
      createToast({
        message: t("toasts.success"),
        type: "success"
      });
    }).catch(() => {
      handleClose();
      setIsSubmitting(false);
      createToast({
        message: t("toasts.error"),
        type: "error"
      });
    });
  };
  return /* @__PURE__ */ _jsxDEV(Modal, {
    title: "Cancel email",
    open,
    onClose: handleClose,
    width: 640,
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.text,
        children: !isBulkAction ? /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          align: "center",
          children: [t("title"), /* @__PURE__ */ _jsxDEV("br", {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 71,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("b", {
            children: t("subtitle")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          align: "center",
          children: [t("titleBulk", {
            count: bobject?.length || 0
          }), /* @__PURE__ */ _jsxDEV("br", {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 77,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("b", {
            children: t("subtitle")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        variant: "clear",
        onClick: handleClose,
        children: t("back")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        color: "tomato",
        onClick: cancelEmail,
        children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
          color: "white",
          size: 14,
          name: "loadingCircle"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 13
        }, void 0) : t("cancelEmail")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 65,
    columnNumber: 5
  }, void 0);
};
_s(CancelEmailModal, "Z/0yCJWmoHUXGnwoPZmTGBr8DQo=", false, function() {
  return [useToasts, useTranslation];
});
_c = CancelEmailModal;
export default CancelEmailModal;
var _c;
$RefreshReg$(_c, "CancelEmailModal");
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
