import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/pages/templateDetail/templateDetail.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/templateDetail/templateDetail.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/templateDetail/templateDetail.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import __vite__cjsImport4_reactShadowRoot from "/vendor/.vite-deps-react-shadow-root.js__v--23020670.js"; const ReactShadowRoot = __vite__cjsImport4_reactShadowRoot.__esModule ? __vite__cjsImport4_reactShadowRoot.default : __vite__cjsImport4_reactShadowRoot;
import { CircularBadge, Dropdown, Icon, Label, Spinner, Text, Tooltip, useHover, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { TemplateInformation } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-index.tsx.js";
import { TEMPLATE_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import Metric from "/src/content/components/extendedScreen/pages/templateDetail/metric/metric.tsx.js";
import salesforceResetStyles from "/src/content/components/extendedScreen/pages/templateDetail/resetSalesforceCSSs.module.css.js";
import styles from "/src/content/components/extendedScreen/pages/templateDetail/templateDetail.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const TemplateHeader = ({
  name,
  isBattlecard,
  isOfficial,
  cadenceUsages,
  visibility,
  createdBy,
  templateStatistics,
  type,
  ...template
}) => {
  _s();
  const {
    users
  } = useUserSearch() || {};
  const author = users?.find((user) => user.id === createdBy);
  const [anchorRef, isHovering] = useHover();
  const {
    t
  } = useTranslation();
  const {
    ref,
    visible: infoVisible,
    setVisible: setInfoVisible
  } = useVisible(false, anchorRef);
  useEffect(() => {
    setInfoVisible(isHovering);
  }, [isHovering]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.header,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "m",
      weight: "bold",
      children: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.headerIcons,
      children: [type === TEMPLATE_TYPES.EMAIL && cadenceUsages > 0 && /* @__PURE__ */ _jsxDEV(Label, {
        size: "small",
        color: "verySoftPurple",
        textColor: "purple",
        uppercase: false,
        overrideStyle: {
          maxWidth: "142px",
          letterSpacing: 0.5
        },
        children: t("extendedScreen.templateDetail.usedInXCadences", {
          count: cadenceUsages || 0
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 11
      }, void 0), visibility && /* @__PURE__ */ _jsxDEV(Label, {
        size: "small",
        color: "verySoftPurple",
        textColor: "purple",
        uppercase: false,
        overrideStyle: {
          maxWidth: "77px"
        },
        children: /* @__PURE__ */ _jsxDEV("span", {
          className: styles.visibilityLabel,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: visibility === "PUBLIC" ? "unlock" : "lock",
            color: "purple",
            size: 14
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 15
          }, void 0), visibility === "PUBLIC" ? t("extendedScreen.templateDetail.public") : t("extendedScreen.templateDetail.private")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 11
      }, void 0), isBattlecard && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("extendedScreen.templateDetail.battleCard"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "battlecards",
          color: "purple"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 11
      }, void 0), isOfficial && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("extendedScreen.templateDetail.official"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "bookmark",
          color: "purple"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Dropdown, {
        anchor: /* @__PURE__ */ _jsxDEV("div", {
          ref: anchorRef,
          className: styles.dropdownAnchorWrapper,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "infoFilled",
            color: "darkBloobirds",
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 13
        }, void 0),
        visible: infoVisible,
        ref,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.dropdownWrapper,
          children: /* @__PURE__ */ _jsxDEV(TemplateInformation, {
            template: {
              createdBy,
              ...template
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }, void 0), author && /* @__PURE__ */ _jsxDEV("div", {
        className: styles._assigned_to,
        children: /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: `${t("extendedScreen.templateDetail.author")}: ${author?.name}`,
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
            size: "s",
            color: "lightPeanut",
            style: {
              color: "var(--white)",
              fontSize: "9px"
            },
            backgroundColor: author?.color || "lightPeanut",
            children: author?.shortname || "U"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 115,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }, void 0), type === TEMPLATE_TYPES.EMAIL && templateStatistics && Object.keys(templateStatistics).length !== 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._statistics_container,
      children: [/* @__PURE__ */ _jsxDEV(Metric, {
        name: "OPENED_RATE",
        value: templateStatistics.OPENED_RATE
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(Metric, {
        name: "CLICKED_RATE",
        value: templateStatistics.CLICKED_RATE
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(Metric, {
        name: "REPLIED_RATE",
        value: templateStatistics.REPLIED_RATE
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 11
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.separator
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 48,
    columnNumber: 5
  }, void 0);
};
_s(TemplateHeader, "uTJ5D6KZUeUyPUzvA2pvPbPzM10=", false, function() {
  return [useUserSearch, useHover, useTranslation, useVisible];
});
_c = TemplateHeader;
export const TemplateDetail = () => {
  _s2();
  const {
    useGetExtendedContext
  } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const template = extendedContext?.template;
  const ref = useRef();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: !template ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.loading,
      children: /* @__PURE__ */ _jsxDEV(Spinner, {
        name: "loadingCircle"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(TemplateHeader, {
        ...template
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(ReactShadowRoot, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            ref,
            style: {
              overflow: "auto"
            },
            className: clsx(styles.templateBody, salesforceResetStyles.salesforceReset),
            dangerouslySetInnerHTML: {
              __html: template?.previewContent
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 159,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 149,
    columnNumber: 5
  }, void 0);
};
_s2(TemplateDetail, "y9/30YCLE8iDEcZIXsYW5Qp2SwM=", true, function() {
  return [useExtensionContext];
});
_c2 = TemplateDetail;
var _c, _c2;
$RefreshReg$(_c, "TemplateHeader");
$RefreshReg$(_c2, "TemplateDetail");
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
