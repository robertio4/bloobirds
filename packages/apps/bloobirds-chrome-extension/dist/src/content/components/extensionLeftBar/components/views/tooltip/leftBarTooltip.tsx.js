import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/tooltip/leftBarTooltip.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tooltip/leftBarTooltip.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tooltip/leftBarTooltip.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { TooltipContentBlock, TooltipContentHTML } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { DiscoveryTooltip, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useGetInfoDisplayBlockByKey, useMediaQuery, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ExtensionHelperKeys, SalesforceTabs, SalesforceTabsIcon } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { isWhatsAppPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { TaskTab } from "/src/content/components/taskSidebar/taskSidebar.tsx.js";
import { useExtensionLeftBarContext } from "/src/content/components/extensionLeftBar/extensionLeftBarContext.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/tooltip/leftBarTooltip.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export var lBTVisibilityType = /* @__PURE__ */ ((lBTVisibilityType2) => {
  lBTVisibilityType2["Hidden"] = "Hidden";
  lBTVisibilityType2["Top"] = "Top";
  lBTVisibilityType2["Bottom"] = "Bottom";
  return lBTVisibilityType2;
})(lBTVisibilityType || {});
function TooltipButton({
  hasBeenSaved
}) {
  _s();
  const {
    t
  } = useTranslation();
  const {
    setDisplayLeftBarTooltip,
    setCurrentTab,
    currentTab
  } = useExtensionLeftBarContext();
  return /* @__PURE__ */ _jsxDEV(TaskTab, {
    icon: SalesforceTabsIcon.TOOLTIP,
    colors: {
      basic: "lightPurple",
      iconColor: "purple",
      bgUnselected: "lightestPurple",
      opacity: hasBeenSaved ? 0.2 : 1
    },
    name: SalesforceTabs.TOOLTIP,
    onClick: () => {
      setCurrentTab(currentTab === SalesforceTabs.TOOLTIP ? null : SalesforceTabs.TOOLTIP);
      setDisplayLeftBarTooltip(true);
    },
    isHighlighted: currentTab === SalesforceTabs.TOOLTIP,
    children: t("leftBar.leftBarHints")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
_s(TooltipButton, "qOwgDHZQRg8GMo/gw6TRA4yb/s8=", false, function() {
  return [useTranslation, useExtensionLeftBarContext];
});
_c = TooltipButton;
export const LeftBarTooltip = () => {
  _s2();
  const {
    has,
    saveCustom
  } = useUserHelpers();
  const hasBeenSaved = has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP);
  const {
    tooltipContent
  } = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.LEFT_BAR_TOOLTIP);
  const shouldBeVisible = has(ExtensionHelperKeys.TOUR_DONE) && tooltipContent?.bodyBlocks?.length > 0;
  const isLinkedinPage = window.location.href.includes("linkedin");
  const {
    windowDimensions,
    isMediumDesktop
  } = useMediaQuery();
  const {
    t
  } = useTranslation();
  const xPosition = isLinkedinPage ? 62 : isWhatsAppPage() ? 10 : 100;
  return /* @__PURE__ */ _jsxDEV("div", {
    children: shouldBeVisible ? /* @__PURE__ */ _jsxDEV(DiscoveryTooltip, {
      anchor: /* @__PURE__ */ _jsxDEV(TooltipButton, {
        hasBeenSaved
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 19
      }, void 0),
      position: hasBeenSaved ? "right-end" : "right-start",
      color: "verySoftPurple",
      className: styles.left_bar_tooltip,
      customStyles: {
        position: hasBeenSaved ? "fixed" : "absolute",
        ...hasBeenSaved ? {
          transform: `translate(64px, ${xPosition}px)`
        } : {}
      },
      arrowCustomStyles: {
        position: hasBeenSaved ? "fixed" : "absolute",
        ...hasBeenSaved ? {
          transform: "translate(0px, 350px)"
        } : {}
      },
      visible: !hasBeenSaved,
      height: "fit-content",
      rounded: true,
      children: [/* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [!hasBeenSaved && /* @__PURE__ */ _jsxDEV(Text, {
          size: "l",
          color: "purple",
          weight: "heavy",
          align: "center",
          className: styles.title,
          children: /* @__PURE__ */ _jsxDEV(TooltipContentHTML, {
            str: tooltipContent?.title
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 80,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 15
        }, void 0), tooltipContent?.bodyBlocks.sort((a, b) => a.order - b.order).map((bodyBlockProps) => /* @__PURE__ */ _jsxDEV(TooltipContentBlock, {
          ...bodyBlockProps
        }, bodyBlockProps.order + bodyBlockProps.icon, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 17
        }, void 0))]
      }, void 0, true), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipImage, {
        className: clsx(styles.image, {
          [styles.image_small]: isMediumDesktop
        }),
        children: windowDimensions.height > 760 && /* @__PURE__ */ _jsxDEV("img", {
          src: tooltipContent?.image,
          alt: "cards-image"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 47
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipFooter, {
        footerColor: "softPurple",
        children: /* @__PURE__ */ _jsxDEV("div", {
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "white",
            className: styles.footer,
            children: /* @__PURE__ */ _jsxDEV(TooltipContentHTML, {
              str: tooltipContent?.footer
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 104,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 103,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            children: [/* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipButton, {
              isMainButton: true,
              onClick: () => {
                if (!hasBeenSaved) {
                  saveCustom({
                    key: ExtensionHelperKeys.LEFT_BAR_TOOLTIP,
                    data: new Date().toISOString()
                  });
                }
              },
              variant: "secondary",
              color: "white",
              className: clsx(styles.footerButton, styles.secondaryButton),
              uppercase: false,
              children: /* @__PURE__ */ _jsxDEV(_Fragment, {
                children: [t("common.ok"), "!"]
              }, void 0, true)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 107,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipButton, {
              isMainButton: true,
              color: "purple",
              variant: "tertiary",
              className: clsx(styles.footerButton, styles.mainButton),
              uppercase: false,
              onClick: () => {
                window.open(tooltipContent?.buttonUrl, "_blank");
                if (!hasBeenSaved) {
                  saveCustom({
                    key: ExtensionHelperKeys.LEFT_BAR_TOOLTIP,
                    data: new Date().toISOString()
                  });
                }
              },
              children: /* @__PURE__ */ _jsxDEV(_Fragment, {
                children: [/* @__PURE__ */ _jsxDEV(Icon, {
                  name: "book",
                  color: "purple",
                  size: 16
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 141,
                  columnNumber: 21
                }, void 0), " ", tooltipContent?.buttonText]
              }, void 0, true)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 124,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 106,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 5
  }, void 0);
};
_s2(LeftBarTooltip, "ygrop+CLBRChhJBOi2HY1Ha8Ajw=", false, function() {
  return [useUserHelpers, useGetInfoDisplayBlockByKey, useMediaQuery, useTranslation];
});
_c2 = LeftBarTooltip;
var _c, _c2;
$RefreshReg$(_c, "TooltipButton");
$RefreshReg$(_c2, "LeftBarTooltip");
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
