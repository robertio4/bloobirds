import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-stopCadenceModal-stopCadenceModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/stopCadenceModal/stopCadenceModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/stopCadenceModal/stopCadenceModal.tsx", _s = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Modal, ModalCloseIcon, ModalContent, ModalFooter, ModalHeader, ModalTitle, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCadenceControlData } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-useCadenceControlModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-stopCadenceModal-stopCadenceModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const StopCadenceModal = ({
  bobject,
  handleClose,
  handleSave,
  useEveryBobject,
  subhomeTab,
  size = "medium"
}) => {
  _s();
  const {
    isSaving,
    stopCadence
  } = useCadenceControlData(bobject);
  const isBulkAction = Array.isArray(bobject);
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.stopCadenceModal"
  });
  const {
    t: bobjectTypeT
  } = useTranslation("translation", {
    keyPrefix: "bobjectTypes"
  });
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    onClose: handleClose,
    width: 640,
    children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
      size,
      children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
        size,
        children: t("stopCadence", {
          count: isBulkAction ? bobject?.length : 1
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
        onClick: handleClose,
        size
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.text,
        children: isBulkAction ? /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          align: "center",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "cadence.stopCadenceModal.messageBulk",
            values: {
              count: bobject?.length,
              bobjectTypes: bobjectTypeT(bobjectType?.toLowerCase(), {
                count: bobject?.length
              })
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 54,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          align: "center",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "cadence.stopCadenceModal.message",
            values: {
              bobjectTypes: bobjectTypeT(bobjectType?.toLowerCase())
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 66,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        variant: "clear",
        onClick: handleClose,
        children: t("cancel")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        color: "tomato",
        onClick: () => {
          stopCadence(() => {
            handleSave?.();
            handleClose();
          }, useEveryBobject, subhomeTab);
        },
        children: isSaving ? /* @__PURE__ */ _jsxDEV(Spinner, {
          color: "white",
          size: 14,
          name: "loadingCircle"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 91,
          columnNumber: 23
        }, void 0) : t("stopCadence")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, void 0);
};
_s(StopCadenceModal, "P1Hl7BP56a8NSALfa2o5XnZz5NE=", false, function() {
  return [useCadenceControlData, useTranslation, useTranslation];
});
_c = StopCadenceModal;
var _c;
$RefreshReg$(_c, "StopCadenceModal");
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
