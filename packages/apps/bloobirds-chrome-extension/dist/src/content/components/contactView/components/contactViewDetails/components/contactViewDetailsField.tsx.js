import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewDetails/components/contactViewDetailsField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewDetails/components/contactViewDetailsField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewDetails/components/contactViewDetailsField.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { parseCurrency, isUTCDateString } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { CopyText } from "/src/content/components/copyText/CopyText.tsx.js";
import styles from "/src/content/components/contactView/components/contactViewDetails/contactViewDetails.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ContactViewDetailsField = ({
  field,
  sidePeekEnabled
}) => {
  _s();
  const detailRowClasses = clsx(styles.detail_row, {
    [styles.detail_row_sidePeek]: sidePeekEnabled
  });
  const {
    t
  } = useTranslation();
  const {
    t: datesT
  } = useTranslation("translation", {
    keyPrefix: "dates"
  });
  const {
    name,
    value
  } = field || {};
  let valueToPrint = value;
  const dataModel = useDataModel();
  const {
    prefix,
    suffix
  } = dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};
  if (name === "Amount") {
    const amount = parseCurrency(value);
    valueToPrint = `${prefix ? prefix : ""} ${amount ? amount : "-"} ${suffix ? suffix : ""}`;
  }
  if (isUTCDateString(value)) {
    valueToPrint = spacetime(value).format(datesT("standardDate"));
  }
  const printableValue = typeof valueToPrint == "string" || typeof valueToPrint == "number";
  return /* @__PURE__ */ _jsxDEV("div", {
    className: detailRowClasses,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.detail_row_left, {
        [styles.detail_row_left_sidePeek]: sidePeekEnabled
      }),
      children: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: name,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          className: styles.detail_row_text,
          size: "xs",
          color: "softPeanut",
          children: name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.detail_row_right,
      style: sidePeekEnabled ? void 0 : {
        width: "calc(100% - 88px)"
      },
      children: value && value !== "-" ? /* @__PURE__ */ _jsxDEV(CopyText, {
        textToCopy: value,
        isLinkTypeField: false,
        children: /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: value,
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Text, {
            className: styles.detail_row_text,
            size: "xs",
            color: "peanut",
            children: printableValue ? valueToPrint : t("notPrintable")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 54,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
        className: styles.detail_row_text,
        size: "xs",
        color: "peanut",
        children: printableValue ? valueToPrint : t("notPrintable")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, void 0);
};
_s(ContactViewDetailsField, "JRQXTl9oqDEr/zcuXAJd6gDYiWo=", false, function() {
  return [useTranslation, useTranslation, useDataModel];
});
_c = ContactViewDetailsField;
var _c;
$RefreshReg$(_c, "ContactViewDetailsField");
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
