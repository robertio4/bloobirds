import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Item, Text, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactDetails/contactDetailSource/contactDetailSource.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export var Source = /* @__PURE__ */ ((Source2) => {
  Source2["bloobirds"] = "bloobirds";
  Source2["salesforce"] = "salesforce";
  return Source2;
})(Source || {});
export const ContactDetailsSource = ({
  source,
  setSource,
  size = "s"
}) => {
  _s();
  const {
    visible,
    setVisible,
    ref
  } = useVisible();
  const {
    useGetSettings
  } = useExtensionContext();
  const {
    t
  } = useTranslation();
  const settings = useGetSettings();
  const salesforceInstance = settings?.account?.salesforceInstance;
  const sourceIcon = useMemo(() => {
    return source === "salesforce" /* salesforce */ ? "salesforceOutlined" : "bloobirds";
  }, [source]);
  const sourceTitle = useMemo(() => {
    return source === "salesforce" /* salesforce */ ? t("common.salesforce") : t("common.bloobirds");
  }, [source]);
  const iconSize = size === "s" ? 16 : 20;
  const textSize = size === "s" ? "xs" : "s";
  const handleSourceChange = (src) => {
    setSource(src);
    setVisible(false);
  };
  const Anchor = () => {
    return /* @__PURE__ */ _jsxDEV("div", {
      className: styles.detail_header_row,
      onClick: () => {
        if (salesforceInstance) {
          setVisible(!visible);
        }
      },
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.detail_header_col,
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: sourceIcon,
          color: "bloobirds",
          size: iconSize
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.detail_header_col,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          color: "bloobirds",
          size: textSize,
          children: sourceTitle
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, void 0);
  };
  return !salesforceInstance ? /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: t("sidePeek.overview.tooltips.youCannotSelectOtherSource"),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(Anchor, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 77,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(Dropdown, {
    anchor: Anchor(),
    visible,
    ref,
    children: [/* @__PURE__ */ _jsxDEV(Item, {
      className: styles.detail_dropdown_row,
      onClick: () => handleSourceChange("salesforce" /* salesforce */),
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "salesforceOutlined",
        color: "bloobirds",
        size: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "peanut",
        children: t("common.salesforce")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
      className: styles.detail_dropdown_row,
      onClick: () => handleSourceChange("bloobirds" /* bloobirds */),
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "bloobirds",
        color: "bloobirds",
        size: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "peanut",
        children: t("common.bloobirds")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 81,
    columnNumber: 5
  }, void 0);
};
_s(ContactDetailsSource, "H+AU2LNNZVbIURd/YKABBuLqQ5A=", true, function() {
  return [useVisible, useExtensionContext, useTranslation];
});
_c = ContactDetailsSource;
var _c;
$RefreshReg$(_c, "ContactDetailsSource");
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
