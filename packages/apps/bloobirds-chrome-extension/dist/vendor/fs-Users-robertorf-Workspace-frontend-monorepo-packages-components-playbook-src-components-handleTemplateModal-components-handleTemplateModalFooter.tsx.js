import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplateModal-components-handleTemplateModalFooter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplateModal/components/handleTemplateModalFooter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplateModal/components/handleTemplateModalFooter.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { AttachmentList } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplateModal-handleTemplateModal.module.css.js";
import { AttachmentLinkList } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplateModal-components-attachmentList.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const HandleTemplateModalFooter = ({
  attachedFiles,
  removeAttachedFile,
  attachedLinks,
  removeAttachedLink,
  isSubmitting,
  isEditing,
  openConfirmationModal
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.handleTemplate"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [attachedFiles?.length > 0 && /* @__PURE__ */ _jsxDEV(AttachmentList, {
      files: attachedFiles,
      onDelete: removeAttachedFile
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }, void 0), attachedLinks?.length > 0 && /* @__PURE__ */ _jsxDEV(AttachmentLinkList, {
      files: attachedLinks,
      onDelete: removeAttachedLink
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.footerActions,
      children: [/* @__PURE__ */ _jsxDEV("span", {
        "data-intercom": "send-email-modal-action-cancel",
        children: /* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          color: isSubmitting ? void 0 : "tomato",
          onClick: () => openConfirmationModal(isEditing ? "Delete" : "Discard"),
          disabled: isSubmitting,
          children: isEditing ? t("deleteTemplate") : t("discardTemplate")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.footerButtons,
        children: [isEditing && /* @__PURE__ */ _jsxDEV(Button, {
          variant: "secondary",
          iconLeft: "clock",
          onClick: () => openConfirmationModal("Discard"),
          color: "purple",
          children: t("discardChanges")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
          onClick: () => openConfirmationModal("Save"),
          variant: "primary",
          iconLeft: "save",
          color: "purple",
          children: t("saveTemplate")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, void 0);
};
_s(HandleTemplateModalFooter, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = HandleTemplateModalFooter;
var _c;
$RefreshReg$(_c, "HandleTemplateModalFooter");
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
