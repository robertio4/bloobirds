import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/noContextPage/components/generalSearchBarBanner.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noContextPage/components/generalSearchBarBanner.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noContextPage/components/generalSearchBarBanner.tsx", _s = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Checkbox, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useGeneralSearchVisibility, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ExtensionHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/noContextPage/noContextPage.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const GeneralSearchBarBanner = () => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "generalSearchBar"
  });
  const {
    has,
    save,
    isLoading
  } = useUserHelpers();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const dontShowHelper = has(ExtensionHelperKeys.DONT_SHOW_GENERAL_SEARCH_BAR_BANNER);
  const {
    toggleVisibility
  } = useGeneralSearchVisibility();
  let commandText = void 0;
  if (navigator.appVersion.indexOf("Win") != -1) {
    commandText = "Ctrl + K";
  } else if (navigator.appVersion.indexOf("Mac") != -1) {
    commandText = "Cmd\u2318 + K";
  }
  function banishBanner() {
    save(ExtensionHelperKeys.DONT_SHOW_GENERAL_SEARCH_BAR_BANNER);
  }
  const handleLearnMore = () => {
    window.open("https://support.bloobirds.com/hc/en-us/articles/6267573643676-How-does-the-general-search-bar-work-", "_blank");
  };
  return commandText && !dontShowHelper && !isLoading ? /* @__PURE__ */ _jsxDEV("div", {
    className: styles._info_banner,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._info_banner_title,
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: "search",
        color: "purple",
        size: 24
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: "purple",
        weight: "bold",
        children: t("bannerTitle")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "purple",
        weight: "regular",
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "generalSearchBar.bannerSubtitle"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._info_action,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "purple",
        weight: "bold",
        children: t("openSearchBar")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.bannerCommandContainer,
        onClick: toggleVisibility,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          weight: "bold",
          color: "peanut",
          children: commandText?.toUpperCase()
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._info_banner_footer,
      children: [/* @__PURE__ */ _jsxDEV(Checkbox, {
        color: "purple",
        size: "small",
        onClick: (value) => {
          if (value)
            banishBanner();
        },
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: t("checkBox")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        variant: "secondary",
        color: "purple",
        uppercase: false,
        onClick: handleLearnMore,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "book",
          color: "purple",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 11
        }, void 0), sidePeekEnabled && /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "purple",
          weight: "bold",
          children: t("learnMore")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, void 0) : null;
};
_s(GeneralSearchBarBanner, "cjxs65gdTIcYRLCRftt/knvJtSU=", true, function() {
  return [useTranslation, useUserHelpers, useExtensionContext, useGeneralSearchVisibility];
});
_c = GeneralSearchBarBanner;
var _c;
$RefreshReg$(_c, "GeneralSearchBarBanner");
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
