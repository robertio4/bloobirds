import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/noteModal/noteContentEditor.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noteModal/noteContentEditor.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noteModal/noteContentEditor.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { RichTextEditor, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarListsSection, EditorToolbarTextMarksSection } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import styles from "/src/content/components/noteModal/noteModal.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const NoteContentEditor = ({
  id,
  plugins,
  titlePlugins,
  defaultValues,
  children: bottomBar
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.noteModal"
  });
  const {
    register,
    getValues
  } = useFormContext();
  const registerProps = register(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const titleRegisterProps = register(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  return /* @__PURE__ */ _jsxDEV(RichTextEditor, {
    id: id + "-body",
    defaultValue: getValues(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE) || defaultValues?.body,
    plugins,
    placeholder: t("placeholder"),
    registerProps,
    style: {
      color: "var(--peanut) !important",
      padding: "12px 28px 4px 28px"
    },
    children: (editor) => /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.editor,
        children: [/* @__PURE__ */ _jsxDEV(RichTextEditor, {
          id: id + "-title",
          defaultValue: getValues(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE) || defaultValues?.title,
          placeholder: `${t("newNote")}: `,
          plugins: titlePlugins,
          style: {
            padding: "0px 24px 4px 24px",
            color: "var(--peanut) !important"
          },
          registerProps: titleRegisterProps
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("span", {
          className: styles.divider
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.body_wrapper,
          children: editor
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: [/* @__PURE__ */ _jsxDEV(NoteToolbar, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 13
        }, void 0), bottomBar]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, void 0);
};
_s(NoteContentEditor, "czpjjiYaQta5y3x6xH47ChlDEXY=", false, function() {
  return [useTranslation, useFormContext];
});
_c = NoteContentEditor;
const NoteToolbar = React.memo(_c2 = () => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.toolbar,
  children: /* @__PURE__ */ _jsxDEV(EditorToolbar, {
    backgroundColor: "var(--peanut) !important",
    children: [/* @__PURE__ */ _jsxDEV(EditorToolbarControlsSection, {
      color: "peanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarFontStylesSection, {
      color: "peanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarTextMarksSection, {
      color: "peanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarListsSection, {
      color: "peanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 64,
    columnNumber: 5
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 63,
  columnNumber: 3
}, void 0));
_c3 = NoteToolbar;
export default _c4 = React.memo(NoteContentEditor);
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "NoteContentEditor");
$RefreshReg$(_c2, "NoteToolbar$React.memo");
$RefreshReg$(_c3, "NoteToolbar");
$RefreshReg$(_c4, "%default%");
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
