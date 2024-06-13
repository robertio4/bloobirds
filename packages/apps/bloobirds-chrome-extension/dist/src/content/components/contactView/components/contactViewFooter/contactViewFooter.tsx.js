import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewFooter/contactViewFooter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewFooter/contactViewFooter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewFooter/contactViewFooter.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport5_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport5_mixpanelBrowser.__esModule ? __vite__cjsImport5_mixpanelBrowser.default : __vite__cjsImport5_mixpanelBrowser;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/components/contactViewFooter/contactViewFooter.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactViewFooterTab = (props) => {
  _s();
  const {
    name,
    icon,
    onClick,
    selected,
    color
  } = props;
  const isSelected = selected === name;
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    t
  } = useTranslation();
  const selectedColor = color || (name === "Playbook" ? "purple" : "bloobirds");
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.tab_container, {
      [styles.tab_container_selected]: isSelected,
      [styles.tab_container_playbook_selected]: isSelected && selectedColor === "purple"
    }),
    "data-test": `contact-view-${name}-tab`,
    onClick: () => {
      if (onClick) {
        mixpanel.track(`CLICK_ON_TAB_FROM_BUBBLE_IN_ICON_${icon?.toUpperCase()}`);
        onClick(name);
      }
    },
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      color: isSelected ? selectedColor : "softPeanut",
      size: 24,
      className: !sidePeekEnabled && styles.footer_icon
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, void 0), sidePeekEnabled && /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: isSelected ? selectedColor : "softPeanut",
      weight: isSelected ? "heavy" : "regular",
      children: t(`common.${name}`)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, void 0);
};
_s(ContactViewFooterTab, "vtIkBa6xQVKNmjv+4TpL8Gbi8bo=", true, function() {
  return [useExtensionContext, useTranslation];
});
_c = ContactViewFooterTab;
export const ContactViewFooter = (props) => {
  const {
    children
  } = props;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.footer_container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.footer_wrapper,
      children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.footer_shadow
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 68,
    columnNumber: 5
  }, void 0);
};
_c2 = ContactViewFooter;
var _c, _c2;
$RefreshReg$(_c, "ContactViewFooterTab");
$RefreshReg$(_c2, "ContactViewFooter");
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
