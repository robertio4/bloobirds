import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-blankPageTooltip-blankPageTooltip.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/blankPageTooltip/blankPageTooltip.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/blankPageTooltip/blankPageTooltip.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { IllustrationGroup as blankPageEmail } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-assets-dist-index.js.js";
import { DiscoveryTooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ExtensionHelperKeys, UserHelperTooltipsKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getDifferenceInHours } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-blankPageTooltip-blankPageTooltip.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const BlankPageTooltip = () => {
  _s();
  const {
    saveCustom,
    get
  } = useUserHelpers();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "tooltips"
  });
  const shouldBeDisplayed = getDifferenceInHours({
    startDate: new Date(get(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP) || ""),
    endDate: new Date()
  }) > 120;
  return shouldBeDisplayed ? /* @__PURE__ */ _jsxDEV(DiscoveryTooltip, {
    title: t("blankPageTooltip.title"),
    isPersistent: true,
    visible: true,
    position: "bottom",
    height: "318px",
    children: [/* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipImage, {
      className: styles._home_filters_image,
      children: /* @__PURE__ */ _jsxDEV("img", {
        src: blankPageEmail,
        width: 180,
        alt: "calendar"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipFooter, {
      description: t("blankPageTooltip.description"),
      children: [/* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipButton, {
        variant: "clear",
        color: "white",
        uppercase: false,
        className: styles._home_filters_button,
        onClick: () => {
          saveCustom({
            key: UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP,
            data: new Date().toISOString()
          });
        },
        children: /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [t("ok"), "!"]
        }, void 0, true)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipButton, {
        uppercase: false,
        isMainButton: true,
        className: styles._home_filters_button,
        onClick: () => {
          window.open("https://youtu.be/62LcjNaitGQ", "_blank");
        },
        iconLeft: "play",
        children: t("watchNow")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s(BlankPageTooltip, "E3/Bpyn5LD0FZul+MwEd3ZNfe/M=", false, function() {
  return [useUserHelpers, useTranslation];
});
_c = BlankPageTooltip;
var _c;
$RefreshReg$(_c, "BlankPageTooltip");
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
