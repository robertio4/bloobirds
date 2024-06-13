import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookConfirmationModal-playbookConfirmationModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookConfirmationModal/playbookConfirmationModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookConfirmationModal/playbookConfirmationModal.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Modal, ModalCloseIcon, ModalContent, ModalFooter, ModalHeader, ModalTitle, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCadencesUsingTemplate } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-hooks-useCadencesUsingTemplate.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookConfirmationModal-playbookConfirmationModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function ConfirmationModalHeader({
  icon,
  text,
  onClose
}) {
  return /* @__PURE__ */ _jsxDEV(ModalHeader, {
    variant: "gradient",
    color: "purple",
    className: styles.modal_header,
    children: [/* @__PURE__ */ _jsxDEV(ModalTitle, {
      variant: "gradient",
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.modal_title,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          color: "purple",
          name: icon,
          size: 24
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          color: "purple",
          size: "m",
          children: text
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(ModalCloseIcon, {
      size: "small",
      onClick: onClose,
      color: "purple"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, this);
}
_c = ConfirmationModalHeader;
function EditTemplateConfirmationModal(props) {
  _s();
  const {
    openMode,
    onClose,
    onAccept,
    cadencesUsingTemplate
  } = props;
  const {
    t
  } = useTranslation();
  if (!cadencesUsingTemplate || cadencesUsingTemplate?.length === 0) {
    onAccept();
    return null;
  } else {
    return /* @__PURE__ */ _jsxDEV(Modal, {
      open: !!openMode,
      onClose,
      width: 640,
      children: [/* @__PURE__ */ _jsxDEV(ConfirmationModalHeader, {
        icon: "autoMail",
        text: t("playbook.handleTemplate.confirmation.saveExisting"),
        onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ModalContent, {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          color: "softPeanut",
          size: "s",
          className: styles.modal_text,
          children: t("playbook.handleTemplate.edit.text", {
            count: cadencesUsingTemplate?.length ?? 0
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 11
        }, this), cadencesUsingTemplate && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.cadences,
          children: cadencesUsingTemplate?.map((cadence) => "name" in cadence && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.cadence,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "circle",
              color: "lightPurple"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 75,
              columnNumber: 23
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              color: "softPeanut",
              size: "s",
              children: cadence.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 76,
              columnNumber: 23
            }, this)]
          }, cadence.id, true, {
            fileName: _jsxFileName,
            lineNumber: 74,
            columnNumber: 21
          }, this))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ModalFooter, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttons,
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            variant: "clear",
            color: "purple",
            onClick: onClose,
            children: t("playbook.handleTemplate.cancel")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 87,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.buttons_right,
            children: /* @__PURE__ */ _jsxDEV(Button, {
              variant: "primary",
              color: "purple",
              onClick: onAccept,
              children: t("playbook.handleTemplate.accept")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 91,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 90,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, this);
  }
}
_s(EditTemplateConfirmationModal, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = EditTemplateConfirmationModal;
function DeleteConfirmationModal(props) {
  _s2();
  const {
    openMode,
    cadencesUsingTemplate: outsideCadences,
    templateId,
    onClose,
    onAccept
  } = props;
  const {
    cadencesUsingTemplate: cadences,
    isValidating
  } = useCadencesUsingTemplate(templateId);
  const {
    t
  } = useTranslation();
  const cadencesUsingTemplate = outsideCadences || cadences;
  if (isValidating) {
    return null;
  } else if (cadencesUsingTemplate && cadencesUsingTemplate.length) {
    return /* @__PURE__ */ _jsxDEV(Modal, {
      open: !!openMode,
      onClose,
      width: 640,
      children: [/* @__PURE__ */ _jsxDEV(ConfirmationModalHeader, {
        icon: "trashFull",
        text: "Delete template",
        onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ModalContent, {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          color: "softPeanut",
          size: "s",
          className: styles.modal_text,
          children: t("playbook.handleTemplate.delete.text", {
            count: cadencesUsingTemplate?.length ?? 0
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 123,
          columnNumber: 11
        }, this), cadencesUsingTemplate && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.cadences,
          children: cadencesUsingTemplate?.map((cadence) => "name" in cadence && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.cadence,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "circle",
              color: "lightPurple"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 134,
              columnNumber: 23
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              color: "softPeanut",
              size: "s",
              children: cadence.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 135,
              columnNumber: 23
            }, this)]
          }, cadence.id, true, {
            fileName: _jsxFileName,
            lineNumber: 133,
            columnNumber: 21
          }, this))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 129,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ModalFooter, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.button_end,
          children: /* @__PURE__ */ _jsxDEV(Button, {
            variant: "primary",
            color: "purple",
            onClick: onClose,
            children: t("playbook.handleTemplate.close")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 146,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 145,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 7
    }, this);
  } else {
    return /* @__PURE__ */ _jsxDEV(DiscardConfirmationModal, {
      openMode,
      templateId,
      onClose,
      onAccept
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 7
    }, this);
  }
}
_s2(DeleteConfirmationModal, "dFxH/Uu9miLPLaKt+33BNdseC0Q=", false, function() {
  return [useCadencesUsingTemplate, useTranslation];
});
_c3 = DeleteConfirmationModal;
function DiscardConfirmationModal(props) {
  _s3();
  const {
    openMode,
    templateId,
    onClose,
    onAccept
  } = props;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.handleTemplate"
  });
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: !!openMode,
    onClose,
    width: 500,
    children: [/* @__PURE__ */ _jsxDEV(ConfirmationModalHeader, {
      icon: "cross",
      text: t(`${openMode?.toLowerCase()}.titleWithValue`, {
        value: templateId ? "template" : "changes"
      }),
      onClose
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        className: styles.modal_text_delete,
        children: [openMode === "Discard" ? t("discard.changesNotSaved") : t("discard.aboutToDelete"), /* @__PURE__ */ _jsxDEV(Text, {
          htmlTag: "span",
          size: "s",
          weight: "bold",
          children: t("discard.noUndone")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 188,
          columnNumber: 11
        }, this), " ", t("discard.sure")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 186,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.buttons,
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          color: "purple",
          onClick: onClose,
          children: t("cancel")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 196,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Button, {
          variant: "primary",
          color: "tomato",
          onClick: onAccept,
          children: t(`${openMode?.toLowerCase()}.title`)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 199,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 177,
    columnNumber: 5
  }, this);
}
_s3(DiscardConfirmationModal, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c4 = DiscardConfirmationModal;
export function PlaybookConfirmationModal({
  openMode = "",
  cadencesUsingTemplate = [],
  templateId = "",
  onAccept = () => {
  },
  onClose = () => {
  }
}) {
  switch (openMode) {
    case "Save":
      return /* @__PURE__ */ _jsxDEV(EditTemplateConfirmationModal, {
        openMode,
        cadencesUsingTemplate,
        onAccept,
        onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 227,
        columnNumber: 9
      }, this);
    case "Delete":
      return /* @__PURE__ */ _jsxDEV(DeleteConfirmationModal, {
        openMode,
        cadencesUsingTemplate,
        templateId,
        onAccept,
        onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 236,
        columnNumber: 9
      }, this);
    case "Discard":
      return /* @__PURE__ */ _jsxDEV(DiscardConfirmationModal, {
        openMode,
        templateId,
        onAccept,
        onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 246,
        columnNumber: 9
      }, this);
    default:
      return null;
  }
}
_c5 = PlaybookConfirmationModal;
var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "ConfirmationModalHeader");
$RefreshReg$(_c2, "EditTemplateConfirmationModal");
$RefreshReg$(_c3, "DeleteConfirmationModal");
$RefreshReg$(_c4, "DiscardConfirmationModal");
$RefreshReg$(_c5, "PlaybookConfirmationModal");
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
