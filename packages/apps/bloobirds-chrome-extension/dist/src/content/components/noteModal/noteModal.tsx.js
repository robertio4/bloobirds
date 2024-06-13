import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/noteModal/noteModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noteModal/noteModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noteModal/noteModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDraggable from "/vendor/.vite-deps-react-draggable.js__v--b0baa450.js"; const Draggable = __vite__cjsImport3_reactDraggable.__esModule ? __vite__cjsImport3_reactDraggable.default : __vite__cjsImport3_reactDraggable;
import { FormProvider, useController, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { BobjectSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Button, IconButton, Spinner } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMinimizableModal, useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport12_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport12_mixpanelBrowser.__esModule ? __vite__cjsImport12_mixpanelBrowser.default : __vite__cjsImport12_mixpanelBrowser;
import { useDraggablePosition } from "/src/hooks/useDraggablePosition.tsx.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { DraggableTopBar } from "/src/content/components/draggableTopBar/draggableTopBar.tsx.js";
import useNoteData from "/src/content/components/extendedScreen/pages/noteDetail/useNoteData.tsx.js";
import NoteContentEditor from "/src/content/components/noteModal/noteContentEditor.tsx.js";
import styles from "/src/content/components/noteModal/noteModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const NoteModal = ({
  id
}) => {
  _s();
  const {
    closeModal,
    minimize,
    data,
    onSave
  } = useMinimizableModal(id);
  const {
    location
  } = data || {
    location: "bubble"
  };
  const {
    useGetExtendedContext,
    setExtendedContext,
    useGetSettings,
    useGetSidePeekEnabled,
    useGetDataModel
  } = useExtensionContext();
  const isExtendedOpened = useGetExtendedContext()?.open;
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const dataModel = useGetDataModel();
  const {
    minimizableModals
  } = useMinimizableModals();
  const notesOpened = minimizableModals?.filter((modal) => modal?.open && modal?.type === "note")?.length;
  const methods = useForm();
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
    isEditionModal,
    onSubmit,
    isDirty,
    ...defaultValues
  } = useNoteData(dataModel, accountId, data, plugins, titlePlugins, methods.getValues, onSave, closeModal, methods.watch);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.noteModal"
  });
  const sidePeekEnabled = useGetSidePeekEnabled();
  const [dragging, setDragging] = useState();
  const [nameSelected, setNameSelected] = useState(defaultName);
  const {
    position,
    setPosition,
    bounds
  } = useDraggablePosition(id, {
    width: 320,
    height: window.innerHeight > 660 ? 592 : window.innerHeight - 40
  }, (notesOpened + 1) * 12, location, isExtendedOpened ? sidePeekEnabled ? 398 : 348 : 8);
  const {
    field: {
      value: mainNote,
      onChange: mainNoteOnChange
    }
  } = useController({
    control: methods.control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE,
    defaultValue: defaultValues.mainNote
  });
  const {
    field: {
      value: related,
      onChange: relatedOnChange
    }
  } = useController({
    control: methods.control,
    name: "related",
    defaultValue: defaultValues.defaultRelated
  });
  const handleToggleView = () => {
    closeModal();
    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject: data.bobject,
      extraInfo: {
        ...data,
        [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: methods.getValues(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE),
        [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: methods.getValues(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE),
        [ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE]: mainNote,
        related,
        relatedName: nameSelected,
        bobjectId: data?.bobjectId
      },
      actionsDisabled: false
    });
  };
  useEffect(() => {
    setNameSelected(defaultName);
  }, [defaultName]);
  useEffect(() => {
    mainNoteOnChange(defaultValues?.mainNote);
  }, [defaultValues.mainNote]);
  useEffect(() => {
    relatedOnChange(defaultValues?.defaultRelated);
  }, [defaultValues.defaultRelated]);
  const wrapperClasses = clsx(styles.wrapper, {
    [styles.dragging]: dragging
  });
  return /* @__PURE__ */ _jsxDEV(FormProvider, {
    ...methods,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: wrapperClasses,
      children: /* @__PURE__ */ _jsxDEV(Draggable, {
        handle: "#note" + id,
        position,
        bounds,
        onStart: () => setDragging(true),
        onStop: () => setDragging(false),
        onDrag: (e, data2) => {
          setPosition({
            x: data2.x,
            y: data2.y
          });
        },
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.container,
          onClick: (event) => event.stopPropagation(),
          children: [/* @__PURE__ */ _jsxDEV(DraggableTopBar, {
            dragging,
            id,
            onClose: closeModal,
            onMinimize: () => {
              const title = (methods?.getValues(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE) || defaultValues?.title)?.[0]?.children[0]?.text || `${t("newNote")}: ${nameSelected}`;
              minimize({
                title,
                data: {
                  ...methods.getValues(),
                  [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: title,
                  relatedName: nameSelected
                }
              });
            },
            onToggleView: handleToggleView,
            enableTogglePosition: isEditionModal
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 166,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindow, {
            children: /* @__PURE__ */ _jsxDEV("div", {
              className: styles.content_container,
              children: /* @__PURE__ */ _jsxDEV(NoteContentEditor, {
                id,
                plugins,
                titlePlugins,
                defaultValues,
                children: /* @__PURE__ */ _jsxDEV("div", {
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
                      lineNumber: 197,
                      columnNumber: 23
                    }, void 0)
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 196,
                    columnNumber: 21
                  }, void 0), /* @__PURE__ */ _jsxDEV("span", {
                    className: styles.bottom_bar_right,
                    children: [/* @__PURE__ */ _jsxDEV(IconButton, {
                      name: mainNote ? "starChecked" : "starUnchecked",
                      onClick: () => {
                        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_STAR_FROM_NOTE_MODAL);
                        mainNoteOnChange(!mainNote);
                      },
                      color: "bloobirds",
                      size: 24,
                      className: styles.mainNote
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 214,
                      columnNumber: 23
                    }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
                      size: "small",
                      onClick: () => {
                        methods.handleSubmit(onSubmit)();
                      },
                      disabled: !isDirty || isSubmitting,
                      children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
                        name: "loadingCircle",
                        size: 12
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 231,
                        columnNumber: 41
                      }, void 0) : t("save")
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 224,
                      columnNumber: 23
                    }, void 0)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 213,
                    columnNumber: 21
                  }, void 0)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 195,
                  columnNumber: 19
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 189,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 188,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 187,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 165,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 153,
    columnNumber: 5
  }, void 0);
};
_s(NoteModal, "gz+M7C1mxdeT5kcQGSec1MWyJKc=", true, function() {
  return [useMinimizableModal, useExtensionContext, useMinimizableModals, useForm, useRichTextEditorPlugins, useRichTextEditorPlugins, useNoteData, useTranslation, useDraggablePosition, useController, useController];
});
_c = NoteModal;
var _c;
$RefreshReg$(_c, "NoteModal");
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
