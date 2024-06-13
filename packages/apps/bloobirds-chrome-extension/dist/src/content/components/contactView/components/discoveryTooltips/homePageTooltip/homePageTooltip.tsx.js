import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/discoveryTooltips/homePageTooltip/homePageTooltip.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/discoveryTooltips/homePageTooltip/homePageTooltip.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/discoveryTooltips/homePageTooltip/homePageTooltip.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { BubbleTooltipWrapper } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { DiscoveryTooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ExtensionHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import HomePageImage from "/src/assets/discoveryTooltips/homePage.png__import_base64.js";
import styles from "/src/content/components/contactView/components/discoveryTooltips/homePageTooltip/homePageTooltip.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const HomePageTooltip = ({
  display
}) => {
  _s();
  const {
    save,
    has
  } = useUserHelpers();
  const shouldBeDisplayed = useMemo(() => display && !has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE), [display, has(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE)]);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "tooltips"
  });
  return /* @__PURE__ */ _jsxDEV(BubbleTooltipWrapper, {
    alwaysVisible: true,
    children: /* @__PURE__ */ _jsxDEV("span", {
      className: styles.discovery_tooltip,
      children: shouldBeDisplayed && /* @__PURE__ */ _jsxDEV(DiscoveryTooltip, {
        title: t("homePageTooltip.title"),
        visible: true,
        isPersistent: true,
        position: "left",
        children: [/* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipImage, {
          className: styles.image,
          children: /* @__PURE__ */ _jsxDEV("img", {
            src: HomePageImage,
            width: 230,
            alt: "calendar"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 31,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipFooter, {
          description: t("homePageTooltip.description"),
          children: /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipButton, {
            variant: "secondary",
            isMainButton: true,
            size: "small",
            onClick: () => save(ExtensionHelperKeys.EXT_BUBBLE_HOME_PAGE),
            children: t("gotIt")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 34,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, void 0);
};
_s(HomePageTooltip, "GyQOU5YK5/1qjS5iCvZhf9xybzA=", false, function() {
  return [useUserHelpers, useTranslation];
});
_c = HomePageTooltip;
var _c;
$RefreshReg$(_c, "HomePageTooltip");
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
