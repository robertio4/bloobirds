import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-previewActivityEmailModal-previewActivityEmailModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/previewActivityEmailModal/previewActivityEmailModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/previewActivityEmailModal/previewActivityEmailModal.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Modal, ModalCloseIcon, ModalHeader, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { LightAttachmentList } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-lightAttachmentList-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getTextFromLogicRole, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import EmailModalRow from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-emailModalRow-emailModalRow.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-previewActivityEmailModal-previewActivityEmailModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const PreviewActivityEmailModal = ({
  activity,
  onClose
}) => {
  _s();
  if (!activity)
    return null;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.previewActivityModal"
  });
  const subject = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
  const body = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const activityAttachedFiles = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES);
  const activityAttachments = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS);
  const parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  const parsedAttachments = activityAttachments && JSON.parse(activityAttachments);
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    onClose,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.container,
      children: [/* @__PURE__ */ _jsxDEV(ModalHeader, {
        className: styles.header,
        variant: "gradient",
        color: "bloobirds",
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.title,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            color: "white",
            name: "mail",
            size: 24
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 36,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            color: "white",
            size: "m",
            children: [t("title"), ": ", subject]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 37,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
          variant: "gradient",
          onClick: onClose
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(EmailModalRow, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          style: {
            width: "100%",
            padding: 0,
            userSelect: "none"
          },
          dangerouslySetInnerHTML: {
            __html: subject
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.editor,
        children: /* @__PURE__ */ _jsxDEV("div", {
          style: {
            padding: "16px 20px",
            maxHeight: 500,
            minHeight: 200
          },
          dangerouslySetInnerHTML: {
            __html: body
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }, void 0), parsedAttachedFiles && parsedAttachedFiles?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.attachments,
        children: /* @__PURE__ */ _jsxDEV(LightAttachmentList, {
          files: parsedAttachedFiles,
          betterAttachments: parsedAttachments
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 5
  }, void 0);
};
_s(PreviewActivityEmailModal, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = PreviewActivityEmailModal;
export default PreviewActivityEmailModal;
var _c;
$RefreshReg$(_c, "PreviewActivityEmailModal");
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
