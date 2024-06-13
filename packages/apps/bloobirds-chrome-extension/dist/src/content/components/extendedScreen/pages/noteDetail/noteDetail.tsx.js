import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/pages/noteDetail/noteDetail.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/noteDetail/noteDetail.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/noteDetail/noteDetail.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useController, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { BobjectSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Button, IconButton, Spinner } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSessionStorage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarListsSection, EditorToolbarTextMarksSection, RichTextEditor, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, SessionStorageKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import __vite__cjsImport10_objectHash from "/vendor/.vite-deps-object-hash.js__v--f8e8e6a0.js"; const hash = __vite__cjsImport10_objectHash.__esModule ? __vite__cjsImport10_objectHash.default : __vite__cjsImport10_objectHash;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/extendedScreen/pages/noteDetail/noteDetail.module.css.js";
import useNoteData from "/src/content/components/extendedScreen/pages/noteDetail/useNoteData.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const NoteDetail = ({
  id,
  data,
  onSave
}) => {
  _s();
  const {
    useGetSettings,
    useGetDataModel,
    closeExtendedScreen
  } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const dataModel = useGetDataModel();
  const {
    set
  } = useSessionStorage();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.noteModal"
  });
  const {
    control,
    getValues,
    handleSubmit,
    watch
  } = useForm();
  const titlePlugins = useRichTextEditorPlugins({
    singleLine: true
  });
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  const {
    defaultName,
    isSubmitting,
    onSubmit,
    isDirty,
    ...defaultValues
  } = useNoteData(dataModel, accountId, data, plugins, titlePlugins, getValues, onSave, closeExtendedScreen, watch);
  const [nameSelected, setNameSelected] = useState(defaultName);
  const {
    field: {
      value: title,
      onChange: titleOnChange
    }
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.TITLE,
    defaultValue: defaultValues.title
  });
  const {
    field: {
      value: mainNote,
      onChange: mainNoteOnChange
    }
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE,
    defaultValue: defaultValues.mainNote
  });
  const {
    field: {
      value: note,
      onChange: noteOnChange
    }
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.NOTE,
    defaultValue: defaultValues.body
  });
  const {
    field: {
      value: related,
      onChange: relatedOnChange
    }
  } = useController({
    control,
    name: "related",
    defaultValue: defaultValues.defaultRelated
  });
  useEffect(() => {
    setNameSelected(defaultName);
  }, [defaultName]);
  useEffect(() => {
    titleOnChange(defaultValues?.title);
  }, [hash(defaultValues.title)]);
  useEffect(() => {
    mainNoteOnChange(defaultValues?.mainNote);
  }, [defaultValues.mainNote]);
  useEffect(() => {
    noteOnChange(defaultValues?.body);
  }, [hash(defaultValues.body)]);
  useEffect(() => {
    relatedOnChange(defaultValues?.defaultRelated);
  }, [defaultValues.defaultRelated]);
  useEffect(() => {
    set(SessionStorageKeys.NoteInfo, {
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: note,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: title,
      [ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE]: mainNote,
      related,
      relatedName: nameSelected
    });
  }, [note, title, mainNote, related]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    onClick: (event) => event.stopPropagation(),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.content_container,
      children: /* @__PURE__ */ _jsxDEV(RichTextEditor, {
        id: id + "-body",
        defaultValue: note,
        plugins,
        placeholder: t("placeholder"),
        onChange: noteOnChange,
        style: {
          color: "var(--peanut) !important",
          padding: "12px 28px 4px 28px"
        },
        children: (editor) => /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.editor,
            children: [/* @__PURE__ */ _jsxDEV(RichTextEditor, {
              id: id + "-title",
              defaultValue: title,
              placeholder: `${t("newNote")}: `,
              plugins: titlePlugins,
              onChange: titleOnChange,
              style: {
                padding: "0px 24px 4px 24px",
                color: "var(--peanut) !important"
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 158,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("span", {
              className: styles.divider
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 169,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.body_wrapper,
              children: editor
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 170,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 157,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles.toolbar,
              children: /* @__PURE__ */ _jsxDEV(EditorToolbar, {
                backgroundColor: "var(--peanut) !important",
                children: [/* @__PURE__ */ _jsxDEV(EditorToolbarControlsSection, {
                  color: "peanut"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 175,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarFontStylesSection, {
                  color: "peanut"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 176,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarTextMarksSection, {
                  color: "peanut"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 177,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarListsSection, {
                  color: "peanut"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 178,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 174,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 173,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.bottom_bar,
              children: [/* @__PURE__ */ _jsxDEV("span", {
                className: styles.record_related,
                children: /* @__PURE__ */ _jsxDEV(BobjectSelector, {
                  accountId,
                  selected: nameSelected,
                  id,
                  onBobjectChange: (bobject) => {
                    relatedOnChange(bobject?.rawBobject?.id);
                    if (bobject?.bobjectType === BobjectTypes.Company) {
                      setNameSelected(bobject?.companyName);
                    } else if (bobject?.bobjectType === BobjectTypes.Lead) {
                      setNameSelected(bobject?.fullName);
                    } else if (bobject?.bobjectType === BobjectTypes.Opportunity) {
                      setNameSelected(bobject?.name);
                    }
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 183,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 182,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV("span", {
                className: styles.bottom_bar_right,
                children: [/* @__PURE__ */ _jsxDEV(IconButton, {
                  name: mainNote ? "starChecked" : "starUnchecked",
                  onClick: () => {
                    mainNoteOnChange(!mainNote);
                  },
                  color: "bloobirds",
                  size: 24,
                  className: styles.mainNote
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 200,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
                  size: "small",
                  onClick: () => {
                    handleSubmit(onSubmit)();
                  },
                  disabled: !isDirty || isSubmitting,
                  children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
                    name: "loadingCircle",
                    size: 12
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 216,
                    columnNumber: 39
                  }, void 0) : t("save")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 209,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 199,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 181,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 172,
            columnNumber: 15
          }, void 0)]
        }, void 0, true)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 7
    }, void 0)
  }, id, false, {
    fileName: _jsxFileName,
    lineNumber: 142,
    columnNumber: 5
  }, void 0);
};
_s(NoteDetail, "5Vr21TLP4g6g6Nr0u/jE/j75qMM=", true, function() {
  return [useExtensionContext, useSessionStorage, useTranslation, useForm, useRichTextEditorPlugins, useRichTextEditorPlugins, useNoteData, useController, useController, useController, useController];
});
_c = NoteDetail;
var _c;
$RefreshReg$(_c, "NoteDetail");
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
