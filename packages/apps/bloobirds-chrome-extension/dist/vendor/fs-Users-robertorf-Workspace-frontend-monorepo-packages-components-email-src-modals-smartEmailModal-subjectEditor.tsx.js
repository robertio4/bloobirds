import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-subjectEditor.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/subjectEditor.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/subjectEditor.tsx", _s = $RefreshSig$();
import { useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { RichTextEditor, useRichTextEditorPlugins, initialValue } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function SubjectEditor({
  setSubjectEditor,
  defaultValue = initialValue,
  validator,
  children
}) {
  _s();
  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "emailModal"
  });
  const {
    storeEditorRef
  } = useSmartEmailModal();
  const {
    register,
    getValues
  } = useFormContext();
  const registerProps = register("subject");
  return /* @__PURE__ */ _jsxDEV(RichTextEditor, {
    id: "emailSubject",
    placeholder: t("subjectPlaceholder"),
    plugins: subjectPlugins,
    style: {
      width: "100%",
      padding: 0
    },
    setEditor: (value) => {
      storeEditorRef(value);
      setSubjectEditor(value);
    },
    defaultValue: getValues("subject") || defaultValue,
    registerProps,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
_s(SubjectEditor, "JBtK2Fr/K5YEEryLQjEqE4bCZbQ=", false, function() {
  return [useRichTextEditorPlugins, useTranslation, useSmartEmailModal, useFormContext];
});
_c = SubjectEditor;
export default SubjectEditor;
var _c;
$RefreshReg$(_c, "SubjectEditor");
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
