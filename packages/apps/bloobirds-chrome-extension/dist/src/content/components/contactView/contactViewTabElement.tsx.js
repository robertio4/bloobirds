import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/contactViewTabElement.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactViewTabElement.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactViewTabElement.tsx", _s = $RefreshSig$();
import { CircularBadge, Icon, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSyncBobjectStatus } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport6_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport6_mixpanelBrowser.__esModule ? __vite__cjsImport6_mixpanelBrowser.default : __vite__cjsImport6_mixpanelBrowser;
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/contactView.module.css.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ContactViewTabElement = ({
  tab,
  icon,
  number,
  onClick,
  bobjects
}) => {
  _s();
  const {
    activeTab,
    setActiveTab
  } = useContactViewContext();
  const {
    useGetSettings
  } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const {
    syncStatus
  } = useSyncBobjectStatus(accountId, bobjects);
  const bobjectName = bobjects?.[0]?.name;
  const bobjectType = bobjects?.[0]?.id?.typeName;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.tab__container, {
      [styles.tab__container__selected]: activeTab === tab
    }),
    onClick: () => {
      mixpanel.track(`CLICK_ON_HEADER_TAB_FROM_BUBBLE_IN_ICON_${tab}`);
      if (onClick) {
        onClick();
      }
      setActiveTab(tab);
    },
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      size: 20,
      color: activeTab === tab ? "bloobirds" : "softPeanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, void 0), number && number !== 0 ? /* @__PURE__ */ _jsxDEV(CircularBadge, {
      backgroundColor: activeTab === tab ? "var(--bloobirds)" : "var(--softPeanut)",
      color: "white",
      size: "xs",
      style: {
        fontSize: "10px",
        lineHeight: "10px",
        fontWeight: 500
      },
      children: number
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }, void 0) : null, bobjects?.length > 0 && syncStatus !== void 0 && (syncStatus ? /* @__PURE__ */ _jsxDEV("span", {
      className: styles.tab__container__sync
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: bobjects?.length === 1 ? `${bobjectType} "${bobjectName}" not synced` : tab === ContactViewTab.LEAD ? "Leads not synced" : "Opportunities not synced",
      position: "top",
      children: /* @__PURE__ */ _jsxDEV("span", {
        className: styles.tab__container__noSync
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 13
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 11
    }, void 0))]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, void 0);
};
_s(ContactViewTabElement, "ED8+36kqT+tpzyEgQr/GQLDAe1Q=", true, function() {
  return [useContactViewContext, useExtensionContext, useSyncBobjectStatus];
});
_c = ContactViewTabElement;
export default ContactViewTabElement;
var _c;
$RefreshReg$(_c, "ContactViewTabElement");
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
