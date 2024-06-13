import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewActions/contactViewActions.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewActions/contactViewActions.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewActions/contactViewActions.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Action, Dropdown, Spinner, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMediaQuery } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import __vite__cjsImport6_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport6_mixpanelBrowser.__esModule ? __vite__cjsImport6_mixpanelBrowser.default : __vite__cjsImport6_mixpanelBrowser;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/components/contactViewActions/contactViewActions.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CONTACT_ACTIONS_MAXIMUM_WINDOW_SIZE = 1226;
export const ContactViewActions = (props) => {
  const {
    children
  } = props;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.actions__container,
    "data-test": `contact-view-ACTIONS-tab`,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 5
  }, void 0);
};
_c = ContactViewActions;
export const ContactViewAction = (props) => {
  _s();
  const {
    color,
    icon,
    onClick,
    isDisabled,
    size = "s",
    isLoading = false,
    tooltip
  } = props;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions"
  });
  const {
    useGetSidePeekEnabled: useGetSidePeekEnabled2
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled2();
  const {
    windowDimensions
  } = useMediaQuery();
  return isLoading ? /* @__PURE__ */ _jsxDEV("div", {
    style: {
      backgroundColor: `var(--${color})`
    },
    className: styles.loading_container,
    children: /* @__PURE__ */ _jsxDEV(Spinner, {
      size: 16,
      name: "loadingCircle",
      color: "white"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: isDisabled ? t("noPermissionsToPerformAction") : tooltip,
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(Action, {
      color,
      icon,
      onClick: (e) => {
        mixpanel.track(`CLICK_ON_ACTION_FROM_BUBBLE_IN_ICON_${icon?.toUpperCase()}`);
        onClick(e);
      },
      size: sidePeekEnabled && windowDimensions.width > CONTACT_ACTIONS_MAXIMUM_WINDOW_SIZE ? "m" : size,
      disabled: isDisabled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 65,
    columnNumber: 5
  }, void 0);
};
_s(ContactViewAction, "omhmQ+x8mhp7YPE+B//CA+qWlnc=", true, function() {
  return [useTranslation, useExtensionContext, useMediaQuery];
});
_c2 = ContactViewAction;
export const ContactViewDropdownAction = _s2(React.forwardRef(_c3 = _s2((props, ref) => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions"
  });
  const {
    color,
    icon,
    visible,
    children,
    setVisible,
    isDisabled
  } = props;
  const {
    useGetSidePeekEnabled: useGetSidePeekEnabled2
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled2();
  const {
    windowDimensions
  } = useMediaQuery();
  return /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: isDisabled && t("noPermissionsToPerformAction"),
    position: "top",
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      anchor: /* @__PURE__ */ _jsxDEV(Action, {
        color,
        icon,
        onClick: () => setVisible(!visible),
        disabled: isDisabled,
        size: sidePeekEnabled && windowDimensions.width > CONTACT_ACTIONS_MAXIMUM_WINDOW_SIZE ? "m" : "s"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 13
      }, void 0),
      visible,
      ref,
      children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 95,
    columnNumber: 7
  }, void 0);
}, "omhmQ+x8mhp7YPE+B//CA+qWlnc=", false, function() {
  return [useTranslation, useExtensionContext, useGetSidePeekEnabled, useMediaQuery];
})), "omhmQ+x8mhp7YPE+B//CA+qWlnc=", true, function() {
  return [useTranslation, useExtensionContext, useMediaQuery];
});
_c4 = ContactViewDropdownAction;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "ContactViewActions");
$RefreshReg$(_c2, "ContactViewAction");
$RefreshReg$(_c3, "ContactViewDropdownAction$React.forwardRef");
$RefreshReg$(_c4, "ContactViewDropdownAction");
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
