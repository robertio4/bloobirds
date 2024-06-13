import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormFields-mainContentFormEditor.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormFields/mainContentFormEditor.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormFields/mainContentFormEditor.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AttachmentList } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-dist-index.js.js";
import { EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarListsSection, EditorToolbarMeetingLink, EditorToolbarSection, EditorToolbarTemplateVariable, EditorToolbarTextMarksSection, RichTextEditor, TemplateEditorToolbarFileAttachment, TemplateEditorToolbarImage, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { TEMPLATE_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-handleTemplate.module.css.js";
import { TemplateFormContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateForm.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const MainContentFormEditor = ({
  attachedFiles,
  removeAttachedFile,
  uploadAttachedFile
}) => {
  _s();
  const [editor, setEditor] = useState(null);
  const {
    focusedRef,
    storeEditorRef,
    template,
    setElements
  } = useContext(TemplateFormContext);
  const {
    control
  } = useFormContext();
  const {
    field
  } = useController({
    control,
    name: "content"
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.templateForm"
  });
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    rawHTMLBlock: true
  });
  useEffect(() => {
    setElements(field.value, template.content, editor);
  }, [template, editor]);
  const showAttachmentSection = template?.type !== TEMPLATE_TYPES.SNIPPET;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.bodyContainer,
    onClick: () => focusedRef.current = 4,
    children: /* @__PURE__ */ _jsxDEV(RichTextEditor, {
      id: "templateEditorBody",
      placeholder: t("bodyPlaceholder"),
      plugins: bodyPlugins,
      setEditor: (value) => {
        setEditor(value);
        storeEditorRef(value);
      },
      style: {
        width: "100%",
        padding: 0
      },
      ...field,
      children: (editor2) => /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [attachedFiles?.length > 0 && /* @__PURE__ */ _jsxDEV(AttachmentList, {
          files: attachedFiles,
          onDelete: removeAttachedFile
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 15
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._editor__container_ast,
          children: editor2
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbar, {
          backgroundColor: "white",
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.editorToolbarSection,
            children: /* @__PURE__ */ _jsxDEV(EditorToolbarControlsSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 73,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.editorToolbarSection,
            children: /* @__PURE__ */ _jsxDEV(EditorToolbarFontStylesSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 76,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 75,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.editorToolbarSection,
            children: /* @__PURE__ */ _jsxDEV(EditorToolbarTextMarksSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 79,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.editorToolbarSection,
            children: /* @__PURE__ */ _jsxDEV(EditorToolbarListsSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 82,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 81,
            columnNumber: 15
          }, void 0), showAttachmentSection && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.editorToolbarLastSection,
            children: /* @__PURE__ */ _jsxDEV(EditorToolbarSection, {
              children: [/* @__PURE__ */ _jsxDEV(EditorToolbarMeetingLink, {
                color: "peanut"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 87,
                columnNumber: 21
              }, void 0), /* @__PURE__ */ _jsxDEV(TemplateEditorToolbarFileAttachment, {
                onAttachment: uploadAttachedFile,
                color: "peanut"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 88,
                columnNumber: 21
              }, void 0), /* @__PURE__ */ _jsxDEV(TemplateEditorToolbarImage, {
                color: "peanut"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 92,
                columnNumber: 21
              }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarTemplateVariable, {}, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 93,
                columnNumber: 21
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 86,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 85,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 13
        }, void 0)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 53,
    columnNumber: 5
  }, void 0);
};
_s(MainContentFormEditor, "M4Du7myNVdafN1O01gsKgAQFm+U=", false, function() {
  return [useFormContext, useController, useTranslation, useRichTextEditorPlugins];
});
_c = MainContentFormEditor;
var _c;
$RefreshReg$(_c, "MainContentFormEditor");
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
