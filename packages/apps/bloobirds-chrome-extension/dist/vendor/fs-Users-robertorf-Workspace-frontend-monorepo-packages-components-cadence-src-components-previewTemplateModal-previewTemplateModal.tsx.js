import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-previewTemplateModal-previewTemplateModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/previewTemplateModal/previewTemplateModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/previewTemplateModal/previewTemplateModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Modal, ModalCloseIcon, ModalHeader, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { deserialize, serialize, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import AttachmentList from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-attachmentList-attachmentList.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-previewTemplateModal-previewTemplateModal.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function EmailModalRow({
  children
}) {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 10
  }, this);
}
_c = EmailModalRow;
export default EmailModalRow;
const fetchMessagingTemplate = async (url) => {
  const {
    data
  } = await api.get(url, {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    data: {}
  });
  return data;
};
export const PreviewTemplateModal = ({
  templateId,
  onClose
}) => {
  _s();
  const [messagingTemplate, setMessagingTemplate] = useState();
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    rawHTMLBlock: true,
    replyHistory: true
  });
  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    singleLine: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false
  });
  useEffect(() => {
    if (templateId) {
      fetchMessagingTemplate(`/messaging/messagingTemplates/${templateId}`).then((data) => {
        setMessagingTemplate(data);
      });
    }
  }, [templateId, setMessagingTemplate]);
  const propsSubject = {
    format: messagingTemplate?.format,
    plugins: subjectPlugins
  };
  const deserializeSubject = deserialize(messagingTemplate?.subject, propsSubject);
  const htmlSubject = serialize(deserializeSubject, propsSubject);
  const propsBody = {
    format: messagingTemplate?.format,
    plugins: bodyPlugins
  };
  const deserializeContent = deserialize(messagingTemplate?.content, propsBody);
  const htmlBody = serialize(deserializeContent, propsBody);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.previewTemplateModal"
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: messagingTemplate && /* @__PURE__ */ _jsxDEV(Modal, {
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
              lineNumber: 92,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              color: "white",
              size: "m",
              children: [t("title"), " ", messagingTemplate?.name]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 93,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
            variant: "gradient",
            onClick: onClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 97,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(EmailModalRow, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            style: {
              width: "100%",
              padding: 0,
              userSelect: "none"
            },
            dangerouslySetInnerHTML: {
              __html: htmlSubject
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 100,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.editor,
          children: /* @__PURE__ */ _jsxDEV("div", {
            style: {
              padding: "16px 20px",
              maxHeight: 500,
              minHeight: 200,
              marginBottom: 40
            },
            dangerouslySetInnerHTML: {
              __html: htmlBody
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 106,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 13
        }, void 0), messagingTemplate?.mediaFiles.length > 0 && /* @__PURE__ */ _jsxDEV(AttachmentList, {
          files: messagingTemplate?.mediaFiles
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 113,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(PreviewTemplateModal, "uC5HMcharfcC8mzkL99hTQNf/q4=", false, function() {
  return [useRichTextEditorPlugins, useRichTextEditorPlugins, useTranslation];
});
_c2 = PreviewTemplateModal;
var _c, _c2;
$RefreshReg$(_c, "EmailModalRow");
$RefreshReg$(_c2, "PreviewTemplateModal");
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
