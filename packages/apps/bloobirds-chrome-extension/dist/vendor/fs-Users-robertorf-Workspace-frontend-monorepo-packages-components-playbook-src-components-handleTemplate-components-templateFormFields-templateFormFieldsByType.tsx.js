import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormFields-templateFormFieldsByType.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormFields/templateFormFieldsByType.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormFields/templateFormFieldsByType.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"]; const useLayoutEffect = __vite__cjsImport2_react["useLayoutEffect"];
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { FloatingTemplateVariable, RichTextEditor } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { TEMPLATE_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-handleTemplate.module.css.js";
import { TemplateFormContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateForm.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const FieldInput = ({
  value,
  onChange,
  placeholder
}) => {
  _s();
  const {
    storeEditorRef
  } = useContext(TemplateFormContext);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.templateForm"
  });
  useLayoutEffect(() => {
    setTimeout(() => storeEditorRef({
      id: "shortcutInput"
    }), 100);
  }, []);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.input,
    children: [/* @__PURE__ */ _jsxDEV("input", {
      id: "shortcutInput",
      type: "text",
      placeholder: t("shortcutNamePlaceholder"),
      value,
      onChange
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, void 0), !value && /* @__PURE__ */ _jsxDEV("span", {
      className: styles.placeholder,
      children: placeholder
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 18
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, void 0);
};
_s(FieldInput, "J3TYjKNJNCrhsnPxj5YqMLso3Eo=", false, function() {
  return [useTranslation];
});
_c = FieldInput;
const SubjectFormEditor = ({
  isTemplateModal
}) => {
  _s2();
  const [subjectEditor, setSubjectEditor] = useState(null);
  const {
    template,
    setElements,
    plugins,
    storeEditorRef,
    focusedRef
  } = useContext(TemplateFormContext);
  const {
    control
  } = useFormContext();
  const {
    field
  } = useController({
    control,
    name: "subject"
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.templateForm"
  });
  useEffect(() => {
    setElements(field.value, template.subject, subjectEditor);
  }, [template?.subject, subjectEditor]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.nameEditor, {
      [styles.withPadding]: isTemplateModal
    }),
    onClick: () => focusedRef.current = isTemplateModal ? 1 : 3,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.subjectContainer,
      children: /* @__PURE__ */ _jsxDEV(RichTextEditor, {
        id: "templateSubjectEditor",
        placeholder: t("subjectPlaceholder"),
        plugins,
        setEditor: (value) => {
          setSubjectEditor(value);
          storeEditorRef?.(value);
        },
        style: {
          width: "100%",
          padding: 0
        },
        ...field,
        children: (editor) => /* @__PURE__ */ _jsxDEV("div", {
          className: styles.subjectFloatingTemplateVariableContainer,
          children: [editor, subjectEditor && /* @__PURE__ */ _jsxDEV(FloatingTemplateVariable, {
            editor: subjectEditor
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 70,
            columnNumber: 33
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 51,
    columnNumber: 5
  }, void 0);
};
_s2(SubjectFormEditor, "s33bsSObIKEudADfA4NBzkEHcXk=", false, function() {
  return [useFormContext, useController, useTranslation];
});
_c2 = SubjectFormEditor;
const ShortCutFormEditor = ({
  isTemplateModal
}) => {
  _s3();
  const {
    control
  } = useFormContext();
  const {
    field
  } = useController({
    control,
    name: "shortcut"
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.templateForm"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.nameEditor, {
      [styles.withPadding]: isTemplateModal
    }),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.templateNameContainer,
      children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("shortcutTooltip"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "infoFilled",
          color: "darkBloobirds",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(FieldInput, {
        value: field.value ? "/" + field.value : "",
        onChange: (value) => {
          const cleanValue = value.target.value.replace(/\s|\//g, "");
          const parsedValue = cleanValue.length > 49 ? cleanValue.slice(0, 49) : cleanValue;
          field.onChange(parsedValue);
        },
        placeholder: t("shortcutPlaceholder")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 85,
    columnNumber: 5
  }, void 0);
};
_s3(ShortCutFormEditor, "rhZ/wCYZZEzY+ou4n0wIQoO7/y0=", false, function() {
  return [useFormContext, useController, useTranslation];
});
_c3 = ShortCutFormEditor;
export const TemplateFormFieldsByType = ({
  isTemplateModal = false
}) => {
  _s4();
  const {
    template
  } = useContext(TemplateFormContext);
  switch (template?.type) {
    case TEMPLATE_TYPES.EMAIL:
      return /* @__PURE__ */ _jsxDEV(SubjectFormEditor, {
        isTemplateModal
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 14
      }, void 0);
    case TEMPLATE_TYPES.SNIPPET:
      return /* @__PURE__ */ _jsxDEV(ShortCutFormEditor, {
        isTemplateModal
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 14
      }, void 0);
    default:
      return null;
  }
};
_s4(TemplateFormFieldsByType, "c99qWxQ7TNcHY70upmS3VFMfmxs=");
_c4 = TemplateFormFieldsByType;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "FieldInput");
$RefreshReg$(_c2, "SubjectFormEditor");
$RefreshReg$(_c3, "ShortCutFormEditor");
$RefreshReg$(_c4, "TemplateFormFieldsByType");
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
