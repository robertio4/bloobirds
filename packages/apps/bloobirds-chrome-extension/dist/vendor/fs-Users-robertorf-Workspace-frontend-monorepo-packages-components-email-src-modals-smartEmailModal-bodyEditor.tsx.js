import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-bodyEditor.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/bodyEditor.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/bodyEditor.tsx", _s = $RefreshSig$();
import { useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { RichTextEditor, useRichTextEditorPlugins, initialValue } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { SmartEmailTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function BodyEditor({
  setBodyEditor,
  handleSaveSnippet,
  defaultValue = initialValue,
  children
}) {
  _s();
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true
  });
  const {
    register,
    getValues
  } = useFormContext();
  const {
    t
  } = useTranslation();
  const registerProps = register("body");
  const {
    hasSnippetsEnabled,
    setSlotsData,
    setSelectedTab,
    snippets,
    storeEditorRef
  } = useSmartEmailModal();
  return /* @__PURE__ */ _jsxDEV(RichTextEditor, {
    id: "emailBody",
    placeholder: t("emailModal.bodyPlaceholder"),
    plugins: bodyPlugins,
    style: {
      padding: "16px 21px"
    },
    setEditor: (value) => {
      storeEditorRef(value);
      setBodyEditor(value);
    },
    snippets: hasSnippetsEnabled && snippets,
    saveSnippetCallback: handleSaveSnippet,
    handleEditSlots: () => {
      setSlotsData((prevSlotsData) => {
        return {
          ...prevSlotsData,
          calendarSlotsVisible: true
        };
      });
      setSelectedTab(SmartEmailTab.CALENDAR);
    },
    defaultValue: getValues("body") || defaultValue,
    registerProps,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, this);
}
_s(BodyEditor, "HSreLSV94mtL7cRh9y9r15U9FBI=", false, function() {
  return [useRichTextEditorPlugins, useFormContext, useTranslation, useSmartEmailModal];
});
_c = BodyEditor;
export default BodyEditor;
var _c;
$RefreshReg$(_c, "BodyEditor");
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
