import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/discoveryTooltips/contactsTooltip/contactsTooltip.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/discoveryTooltips/contactsTooltip/contactsTooltip.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/discoveryTooltips/contactsTooltip/contactsTooltip.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Dropdown, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ExtensionHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import styles from "/src/content/components/contactView/components/discoveryTooltips/contactsTooltip/contactsTooltip.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactsTooltip = ({
  left,
  top,
  display
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "tooltips"
  });
  const {
    save,
    has
  } = useUserHelpers();
  const shouldBeDisplayed = useMemo(() => display && has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE) && !has(ExtensionHelperKeys.EXT_SALESFORCE_CONTACTS), [display, has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE), has(ExtensionHelperKeys.EXT_SALESFORCE_CONTACTS)]);
  return /* @__PURE__ */ _jsxDEV("span", {
    className: styles.dropdown_container,
    style: {
      left: left + 30,
      top: top + 30
    },
    children: shouldBeDisplayed && /* @__PURE__ */ _jsxDEV(Dropdown, {
      visible: shouldBeDisplayed,
      anchor: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.anchor_container,
        style: {
          background: "var(--verySoftBloobirds)"
        },
        role: "button",
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.dot,
          style: {
            background: "var(--bloobirds)"
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 13
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.dropdown_content,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.content_title,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "bloobirds",
            size: 32
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 50,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            weight: "bold",
            children: t("contactsTooltip.extensionName")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 51,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          children: [t("contactsTooltip.navigateToProfile"), " \u{1FAE7} "]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          style: {
            alignSelf: "flex-end"
          },
          children: /* @__PURE__ */ _jsxDEV(Button, {
            variant: "clear",
            onClick: () => save(ExtensionHelperKeys.EXT_SALESFORCE_CONTACTS),
            uppercase: false,
            children: t("gotIt")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 57,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, void 0);
};
_s(ContactsTooltip, "z2tg3zqc5dQGYA07DNN0NZctiaQ=", false, function() {
  return [useTranslation, useUserHelpers];
});
_c = ContactsTooltip;
var _c;
$RefreshReg$(_c, "ContactsTooltip");
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
