import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-tooltips-generalTooltip-generalSEETooltip.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/components/tooltips/generalTooltip/generalSEETooltip.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/components/tooltips/generalTooltip/generalSEETooltip.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { TooltipContentBlock, TooltipContentHTML } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { Button, DiscoveryTooltip, Icon, Spinner, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useGetInfoDisplayBlockByKey, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ExtensionHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-tooltips-generalTooltip-generalSEETooltip.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const GeneralSEETooltip = ({
  visible,
  hasBeenSaved
}) => {
  _s();
  const {
    saveCustom
  } = useUserHelpers();
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    tooltipContent
  } = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP);
  const shouldShowTooltip = visible && tooltipContent;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "tooltips"
  });
  useEffect(() => {
    const imgElement = new Image();
    imgElement.src = tooltipContent?.image;
    imgElement.addEventListener("load", () => {
      setImageLoaded(true);
    });
    return () => {
      imgElement.removeEventListener("load", () => {
        setImageLoaded(true);
      });
    };
  }, [tooltipContent?.image]);
  return shouldShowTooltip ? /* @__PURE__ */ _jsxDEV(DiscoveryTooltip, {
    anchor: /* @__PURE__ */ _jsxDEV(Button, {
      size: "medium",
      color: "lightestPurple",
      variant: "primary",
      iconLeft: "book",
      uppercase: false,
      className: styles.anchorButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }, void 0),
    position: "left-end",
    color: "verySoftPurple",
    className: styles.left_bar_tooltip,
    customStyles: {
      marginRight: "24px"
    },
    arrowCustomStyles: {
      opacity: 0
    },
    width: "392px",
    height: "586px",
    isPersistent: true,
    visible: !hasBeenSaved,
    children: [/* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "l",
        color: "purple",
        weight: "heavy",
        align: "center",
        className: styles.title,
        children: /* @__PURE__ */ _jsxDEV(TooltipContentHTML, {
          str: tooltipContent?.title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, void 0), tooltipContent?.bodyBlocks.sort((a, b) => a.order - b.order).map((bodyBlockProps) => /* @__PURE__ */ _jsxDEV(TooltipContentBlock, {
        ...bodyBlockProps
      }, bodyBlockProps.order + bodyBlockProps.icon, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 13
      }, void 0))]
    }, void 0, true), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipImage, {
      className: styles.image,
      children: imageLoaded ? /* @__PURE__ */ _jsxDEV("img", {
        src: tooltipContent?.image,
        alt: "see-preview-image",
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(tooltipContent?.buttonUrl, "_blank");
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Spinner, {
        name: "dots",
        color: "lightestPurple"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipFooter, {
      footerColor: "softPurple",
      children: /* @__PURE__ */ _jsxDEV("div", {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "white",
          align: "center",
          className: styles.footer,
          children: /* @__PURE__ */ _jsxDEV(TooltipContentHTML, {
            str: tooltipContent?.footer
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 95,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.buttonsWrapper,
          children: [/* @__PURE__ */ _jsxDEV(DiscoveryTooltip.TooltipButton, {
            isMainButton: true,
            onClick: () => {
              if (!hasBeenSaved) {
                saveCustom({
                  key: ExtensionHelperKeys.SEE_GENERAL_TOOLTIP,
                  data: new Date().toISOString()
                });
              }
            },
            variant: "secondary",
            color: "white",
            className: clsx(styles.footerButton, styles.secondaryButton),
            uppercase: false,
            children: t("ok")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 13
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
                  key: ExtensionHelperKeys.SEE_GENERAL_TOOLTIP,
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
                lineNumber: 132,
                columnNumber: 17
              }, void 0), " ", tooltipContent?.buttonText]
            }, void 0, true)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 115,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV("div", {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 140,
    columnNumber: 5
  }, void 0);
};
_s(GeneralSEETooltip, "AXlQs967rO11KZdaqP9Bge/yiM0=", false, function() {
  return [useUserHelpers, useGetInfoDisplayBlockByKey, useTranslation];
});
_c = GeneralSEETooltip;
var _c;
$RefreshReg$(_c, "GeneralSEETooltip");
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
