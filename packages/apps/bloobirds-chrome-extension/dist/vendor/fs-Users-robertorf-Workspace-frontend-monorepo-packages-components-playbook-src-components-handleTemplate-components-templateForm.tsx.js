import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateForm.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const createContext = __vite__cjsImport2_react["createContext"];
import { useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { removeHtmlTags, createParagraph } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { insertElements, resetEditorChildren } from "/vendor/.vite-deps-@udecode_plate.js__v--feffb7cb.js";
import { MainContentFormEditor } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormFields-mainContentFormEditor.tsx.js";
import { NameFormEditor } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormFields-nameFormEditor.tsx.js";
import { TemplateFormFieldsByType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormFields-templateFormFieldsByType.tsx.js";
import { TemplateHeader } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormHeader.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TemplateFormContext = createContext(null);
export const TemplateForm = ({
  template,
  contextProps,
  ...attachedFilesFunctions
}) => {
  _s();
  const {
    formState: {
      isDirty
    }
  } = useFormContext();
  const singleLinePlugins = useRichTextEditorPlugins({
    templateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true
  });
  const setElements = (templateFieldValue, templateValue, editor, paragraph = false) => {
    if (editor && !!(isDirty && templateFieldValue ? templateFieldValue : templateValue)) {
      const toJson = (e) => typeof e === "string" ? JSON.parse(removeHtmlTags(e)) : e;
      const parseValue = (e) => paragraph ? createParagraph(e) : toJson(e);
      const value = isDirty && templateFieldValue ? templateFieldValue : parseValue(templateValue);
      resetEditorChildren(editor);
      insertElements(editor, value, {
        at: [0]
      });
    }
  };
  return /* @__PURE__ */ _jsxDEV(TemplateFormContext.Provider, {
    value: {
      ...contextProps,
      template,
      setElements,
      plugins: singleLinePlugins
    },
    children: [/* @__PURE__ */ _jsxDEV(TemplateHeader, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(NameFormEditor, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(TemplateFormFieldsByType, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(MainContentFormEditor, {
      ...attachedFilesFunctions
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, void 0);
};
_s(TemplateForm, "e+vLH9oJKnypnO5SIVcYAuxtB6s=", false, function() {
  return [useFormContext, useRichTextEditorPlugins];
});
_c = TemplateForm;
var _c;
$RefreshReg$(_c, "TemplateForm");
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
