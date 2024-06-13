import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-messagingTemplatesButton-messagingTemplatesButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/messagingTemplatesButton/messagingTemplatesButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/messagingTemplatesButton/messagingTemplatesButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMessagingTemplate } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-messagingTemplatesButton-messagingTemplatesButton.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const MessagingTemplatesButton = ({
  value,
  onClick,
  isPlaybookTab,
  autofilledTemplate
}) => {
  _s();
  const {
    messagingTemplate
  } = useMessagingTemplate(value);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.messagingTemplatesButton"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.select,
      children: [autofilledTemplate && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.labelSuggestedTemplate,
        children: ["Autofilled from ", autofilledTemplate]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.label,
        onClick,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          children: value ? `${t("template")}:` : isPlaybookTab ? t("noTemplateSelected") : t("openTemplates")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "peanut",
          children: messagingTemplate?.name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, void 0), !isPlaybookTab && (value ? /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        iconLeft: "plus",
        className: styles.button,
        uppercase: false,
        onClick,
        color: "purple",
        children: t("openTemplates")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "plus",
        size: 20,
        onClick,
        color: "purple"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 13
      }, void 0))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, void 0);
};
_s(MessagingTemplatesButton, "Rcw1WPpmmFxEgXQGOZdk3kB0rFM=", false, function() {
  return [useMessagingTemplate, useTranslation];
});
_c = MessagingTemplatesButton;
export default MessagingTemplatesButton;
var _c;
$RefreshReg$(_c, "MessagingTemplatesButton");
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
