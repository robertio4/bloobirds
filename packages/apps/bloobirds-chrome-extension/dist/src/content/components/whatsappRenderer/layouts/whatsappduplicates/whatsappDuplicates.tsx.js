import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/whatsappRenderer/layouts/whatsappduplicates/whatsappDuplicates.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/whatsappRenderer/layouts/whatsappduplicates/whatsappDuplicates.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/whatsappRenderer/layouts/whatsappduplicates/whatsappDuplicates.tsx", _s = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { MultipleBobjectsLayout } from "/src/content/components/linkedInScreens/multipleBobjectsLayout.tsx.js";
import WhatsappBobjectCard from "/src/content/components/whatsappRenderer/layouts/components/card.tsx.js";
import styles from "/src/content/components/whatsappRenderer/layouts/whatsappduplicates/whatsappDuplicates.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function Callout() {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.warningCallout,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "alertTriangle",
      color: "banana",
      className: styles.warningIcon
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      },
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "sidePeek.whatsappDuplicates.callout"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 16,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
_c = Callout;
export const WhatsappDuplicates = ({
  bobjects
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.whatsappDuplicates"
  });
  const isOpportunitiesDuplicates = bobjects[0]?.id?.typeName === BobjectTypes.Opportunity;
  return /* @__PURE__ */ _jsxDEV(MultipleBobjectsLayout, {
    children: [/* @__PURE__ */ _jsxDEV(MultipleBobjectsLayout.Header, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(MultipleBobjectsLayout.List, {
      children: /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._text,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            color: "peanut",
            className: styles.headerText,
            children: t(isOpportunitiesDuplicates ? "headerTextOpportunities" : "headerText")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 33,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            weight: "bold",
            color: "peanut",
            children: t("titleText")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 36,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 11
        }, void 0), !isOpportunitiesDuplicates && /* @__PURE__ */ _jsxDEV(Callout, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 42
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._leadListWrapper,
          children: bobjects.map((bobject, index) => /* @__PURE__ */ _jsxDEV(WhatsappBobjectCard, {
            bobject
          }, index + bobject?.id?.value, false, {
            fileName: _jsxFileName,
            lineNumber: 43,
            columnNumber: 15
          }, void 0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 11
        }, void 0)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, void 0);
};
_s(WhatsappDuplicates, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = WhatsappDuplicates;
var _c, _c2;
$RefreshReg$(_c, "Callout");
$RefreshReg$(_c2, "WhatsappDuplicates");
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
