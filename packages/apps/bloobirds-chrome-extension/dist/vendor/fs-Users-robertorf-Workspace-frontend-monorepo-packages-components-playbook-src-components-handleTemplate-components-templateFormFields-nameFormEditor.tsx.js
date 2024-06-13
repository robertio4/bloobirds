import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormFields-nameFormEditor.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormFields/nameFormEditor.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormFields/nameFormEditor.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { RichTextEditor } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-handleTemplate.module.css.js";
import { TemplateFormContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateForm.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const NameFormEditor = ({
  isTemplateModal = false
}) => {
  _s();
  const [editor, setEditor] = useState(null);
  const {
    template,
    setElements,
    plugins,
    storeEditorRef,
    focusedRef
  } = useContext(TemplateFormContext);
  const {
    control,
    formState: {
      errors
    }
  } = useFormContext();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.nameFormEditor"
  });
  const {
    field
  } = useController({
    control,
    name: "name",
    rules: {
      validate: (fieldValue) => {
        const value = fieldValue && (fieldValue[0].children ? fieldValue[0].children[0].text : fieldValue[0].text);
        if (value === void 0 || value === "")
          return t("requiredText");
        else
          return void 0;
      }
    }
  });
  useEffect(() => {
    setElements(field.value, template.name, editor, true);
  }, [template, editor]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.nameEditor, {
      [styles.withPadding]: isTemplateModal
    }),
    onClick: () => focusedRef.current = isTemplateModal ? 0 : 2,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      color: "verySoftPeanut",
      children: [t("title"), ":"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.templateNameContainer,
      children: [/* @__PURE__ */ _jsxDEV(RichTextEditor, {
        id: "templateNameEditor",
        placeholder: t("placeholder"),
        plugins,
        setEditor: (value) => {
          setEditor(value);
          storeEditorRef?.(value);
        },
        style: {
          width: "100%",
          padding: 0
        },
        ...field
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "xxs",
        color: "tomato",
        className: styles._error_text,
        children: errors?.name?.message
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, void 0);
};
_s(NameFormEditor, "usZXf/zA6fvkm1ev2xL/yUFrTRE=", false, function() {
  return [useFormContext, useTranslation, useController];
});
_c = NameFormEditor;
var _c;
$RefreshReg$(_c, "NameFormEditor");
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
