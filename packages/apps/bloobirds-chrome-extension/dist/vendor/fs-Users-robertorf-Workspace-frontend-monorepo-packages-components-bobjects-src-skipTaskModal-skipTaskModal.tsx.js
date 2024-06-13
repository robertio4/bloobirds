import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-skipTaskModal-skipTaskModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/skipTaskModal/skipTaskModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/skipTaskModal/skipTaskModal.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, IconButton, Item, Modal, Select, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useOpenSkipTaskModal, useSkipModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-skipTaskModal-skipTaskModal.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SkipTaskModal = () => {
  _s();
  const {
    isOpen
  } = useOpenSkipTaskModal();
  return isOpen ? /* @__PURE__ */ _jsxDEV(SkipTaskModalComponent, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 19
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s(SkipTaskModal, "d02QfxsCiaF11O2cCjG9NVwk63M=", false, function() {
  return [useOpenSkipTaskModal];
});
_c = SkipTaskModal;
const SkipTaskModalComponent = () => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "bobjects.skipTaskModal"
  });
  const {
    closeSkipTaskModal,
    task,
    onSave
  } = useOpenSkipTaskModal();
  const {
    skipTask,
    skipReasons,
    isRequiredField
  } = useSkipModal();
  const [reasonSelected, setReasonSelected] = useState(void 0);
  const handleSkip = () => {
    skipTask(task, reasonSelected).then(() => {
      closeSkipTaskModal();
      onSave();
    });
  };
  return /* @__PURE__ */ _jsxDEV(Modal, {
    className: styles.modal,
    open: true,
    onClose: closeSkipTaskModal,
    children: [/* @__PURE__ */ _jsxDEV("header", {
      className: styles.header,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xl",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 40,
        name: "cross",
        color: "bloobirds",
        onClick: closeSkipTaskModal
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("main", {
      className: styles.content,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        children: t("subtitle")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Select, {
        size: "small",
        variant: "form",
        placeholder: t("placeholder"),
        autocomplete: true,
        width: "100%",
        value: reasonSelected,
        onChange: setReasonSelected,
        children: [/* @__PURE__ */ _jsxDEV(Item, {
          value: "",
          children: /* @__PURE__ */ _jsxDEV("em", {
            children: t("none")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 47,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, void 0), skipReasons?.map((reason) => /* @__PURE__ */ _jsxDEV(Item, {
          label: reason.name,
          value: reason.id,
          children: reason.name
        }, reason.id, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 13
        }, void 0))]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("footer", {
      className: styles.footer,
      children: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: isRequiredField && !reasonSelected && t("required"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Button, {
          variant: "primary",
          disabled: isRequiredField && !reasonSelected,
          uppercase: false,
          onClick: handleSkip,
          children: t("save")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 58,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 5
  }, void 0);
};
_s2(SkipTaskModalComponent, "PskHYhjlNq+NA2Nmf0/2Fov4xrs=", false, function() {
  return [useTranslation, useOpenSkipTaskModal, useSkipModal];
});
_c2 = SkipTaskModalComponent;
var _c, _c2;
$RefreshReg$(_c, "SkipTaskModal");
$RefreshReg$(_c2, "SkipTaskModalComponent");
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
