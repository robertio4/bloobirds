import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/pages/bobjectDetail/sectionField/sectionField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/bobjectDetail/sectionField/sectionField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/bobjectDetail/sectionField/sectionField.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useCopyToClipboard } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { IconButton, Input, Text, Tooltip, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/extendedScreen/pages/bobjectDetail/bobjectDetail.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SectionField = ({
  value,
  name,
  key,
  activityAction,
  onSubmit,
  validation,
  refresh
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extendedScreen.bobjectDetail.sectionField"
  });
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const [copiedValue, copyToClipboard] = useCopyToClipboard();
  const [ref, hover] = useHover();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(void 0);
  const [displayValue, setDisplayValue] = useState(value);
  const submitValue = () => {
    const errorString = validation(inputValue);
    if (errorString) {
      setError(errorString);
    } else {
      if (inputValue !== value) {
        onSubmit(inputValue);
        setDisplayValue(inputValue);
      }
      setError(void 0);
      setEditing(false);
    }
  };
  useEffect(() => {
    if (refresh) {
      setDisplayValue(value);
      setInputValue(value);
    }
  }, [refresh]);
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setInputValue(value);
      setEditing(false);
    }
  };
  const actionClasses = clsx(styles.action, {
    [styles.actionSidePeek]: sidePeekEnabled
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.sectionField,
    ref,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.fieldLabel,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        color: "softPeanut",
        className: styles.label,
        size: "xs",
        children: name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }, void 0), editing ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.input,
      children: [/* @__PURE__ */ _jsxDEV(Input, {
        size: "small",
        value: inputValue,
        onChange: setInputValue,
        onSubmit: submitValue,
        width: "100%",
        error,
        onKeyDown,
        autoFocus: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        onClick: submitValue,
        className: styles.saveButton,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "bloobirds",
          weight: "bold",
          className: styles.save,
          children: t("save")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      className: styles.fieldValue,
      children: displayValue
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.fieldActions,
      children: [!editing && hover && /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("edit"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "edit",
            size: 20,
            onClick: () => setEditing(true)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: copiedValue?.value ? t("copied") : t("copyToClipboard"),
          position: "top",
          children: value && /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "copy",
            onClick: () => copyToClipboard(value),
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 112,
            columnNumber: 25
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 13
        }, void 0)]
      }, void 0, true), !editing && value && /* @__PURE__ */ _jsxDEV("span", {
        className: actionClasses,
        children: activityAction
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 31
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 7
    }, void 0)]
  }, key, true, {
    fileName: _jsxFileName,
    lineNumber: 75,
    columnNumber: 5
  }, void 0);
};
_s(SectionField, "2fBMqKSr2dVMxMdEOTMuIr56JFQ=", true, function() {
  return [useTranslation, useExtensionContext, useCopyToClipboard, useHover];
});
_c = SectionField;
var _c;
$RefreshReg$(_c, "SectionField");
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
