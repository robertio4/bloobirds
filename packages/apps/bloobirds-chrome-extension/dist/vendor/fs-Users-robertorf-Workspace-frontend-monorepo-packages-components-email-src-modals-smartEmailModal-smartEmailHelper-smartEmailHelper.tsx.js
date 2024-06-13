import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-smartEmailHelper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/smartEmailHelper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/smartEmailHelper.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { IconButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ExtensionHelperKeys, SmartEmailTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import { GeneralSEETooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-tooltips-generalTooltip-generalSEETooltip.tsx.js";
import { SmartEmailHelperLayout } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-smartEmailHelperTabs.tsx.js";
import { emailHelperTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-smartEmailHelper.constants.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-smartEmailHelper.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const SmartEmailHelper = (props) => {
  _s();
  const {
    hasAttachments,
    hasLinks,
    setOpenPreview,
    control,
    bodyEditor,
    error,
    format,
    htmlContent
  } = props;
  const {
    selectedTab,
    setSelectedTab,
    tooltipVisible,
    slotsData: {
      calendarSlotsVisible
    },
    hasTimeSlotsEnabled
  } = useSmartEmailModal();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.tabs"
  });
  const emailHelperTabsTmp = emailHelperTabs();
  const {
    saveCustom,
    has
  } = useUserHelpers();
  const hasBeenSaved = has(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP);
  const hasSeenInfoBanner = has(ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER);
  const handleSwitchTab = (tab) => {
    if (selectedTab === SmartEmailTab.CLOSED_DEALS && tab !== SmartEmailTab.CLOSED_DEALS && !hasSeenInfoBanner)
      saveCustom({
        key: ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER,
        data: "Initial step viewed"
      });
    setSelectedTab(tab);
  };
  useEffect(() => {
    setOpenPreview(selectedTab === SmartEmailTab.PREVIEW);
  }, [selectedTab]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles._container, {
      [styles._container_with_attachments]: hasAttachments,
      [styles._container_with_links]: hasLinks,
      [styles._container_with_links_and_attachments]: hasAttachments && hasLinks
    }),
    children: [/* @__PURE__ */ _jsxDEV(SmartEmailHelperLayout, {
      tab: selectedTab,
      tabProps: {
        control,
        bodyEditor,
        error,
        hasAttachments,
        format,
        htmlContent
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }, void 0), (!calendarSlotsVisible || !hasTimeSlotsEnabled) && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._tab_navigator,
      children: [/* @__PURE__ */ _jsxDEV(GeneralSEETooltip, {
        visible: tooltipVisible,
        hasBeenSaved
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._tab_navigator_menu,
        children: Object.keys(emailHelperTabsTmp).map((tab, idx) => {
          return emailHelperTabsTmp[tab]?.visible && /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t(emailHelperTabsTmp[tab].key),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV("div", {
              className: clsx(styles._tab_navigator_menu_item, {
                [styles._tab_navigator_menu_item_selected]: tab === selectedTab
              }),
              children: /* @__PURE__ */ _jsxDEV(IconButton, {
                size: 32,
                dataTest: `SEE-TabNav-${emailHelperTabsTmp[tab].dataTest}`,
                name: emailHelperTabsTmp[tab].icon,
                color: tab === selectedTab ? "bloobirds" : "verySoftBloobirds",
                onClick: () => {
                  handleSwitchTab(tab);
                }
              }, emailHelperTabsTmp[tab].dataTest, false, {
                fileName: _jsxFileName,
                lineNumber: 101,
                columnNumber: 23
              }, void 0)
            }, emailHelperTabsTmp[tab].icon + "-" + idx, false, {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 21
            }, void 0)
          }, tab, false, {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 19
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 69,
    columnNumber: 5
  }, void 0);
};
_s(SmartEmailHelper, "MNcxLhCm+Hbjcc2Q6APP8J6NT4w=", false, function() {
  return [useSmartEmailModal, useTranslation, useUserHelpers];
});
_c = SmartEmailHelper;
export default SmartEmailHelper;
var _c;
$RefreshReg$(_c, "SmartEmailHelper");
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
