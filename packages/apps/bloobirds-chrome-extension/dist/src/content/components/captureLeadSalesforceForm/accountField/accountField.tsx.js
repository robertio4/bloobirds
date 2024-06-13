import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/captureLeadSalesforceForm/accountField/accountField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/captureLeadSalesforceForm/accountField/accountField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/captureLeadSalesforceForm/accountField/accountField.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useController } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Tooltip, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/src/content/components/captureLeadSalesforceForm/accountField/accountField.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const AccountField = ({
  control,
  accountName,
  hasDifferentAssignedTo,
  salesforceOwnerName,
  sobjectType,
  hasBloobirdsAssignedTo
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.salesforcePages.accountField"
  });
  const title = hasDifferentAssignedTo ? t("titleDiffAssigned") : hasBloobirdsAssignedTo ? null : t("titleAssigned", {
    salesforceOwnerName
  });
  const disabled = !hasBloobirdsAssignedTo;
  const isOpportunity = sobjectType === "Opportunity";
  const {
    field: {
      value: syncAccount,
      onChange: setSyncAccount
    }
  } = useController({
    control,
    name: "syncAccount",
    defaultValue: true
  });
  useEffect(() => {
    setSyncAccount(true);
  }, []);
  const checkBoxStyle = {
    backgroundColor: syncAccount ? "var(--lightBloobirds)" : "rgba(205, 226, 246, 0.2)",
    color: syncAccount ? "peanut" : "white",
    cursor: disabled ? "not-allowed" : "pointer"
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.company_label,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: "white",
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "extension.salesforcePages.accountField.title",
          values: {
            accountName: accountName || t("untitledCompany")
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, void 0), (hasDifferentAssignedTo || !hasBloobirdsAssignedTo) && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "alertTriangle",
          color: "banana"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: /* @__PURE__ */ _jsxDEV("span", {
        style: checkBoxStyle,
        className: styles.checkbox,
        onClick: () => !disabled && setSyncAccount(!syncAccount),
        children: [/* @__PURE__ */ _jsxDEV("span", {
          className: clsx(styles.check, {
            [styles.checked]: syncAccount
          }),
          style: {
            border: `1px solid var(--${syncAccount ? "bloobirds" : "white"})`
          },
          children: syncAccount && /* @__PURE__ */ _jsxDEV(Icon, {
            size: 16,
            name: "check",
            color: "white"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 82,
            columnNumber: 29
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          className: styles.noSelect,
          color: disabled ? "gray" : syncAccount ? "peanut" : "white",
          children: isOpportunity ? t("syncAccountAndContacts") : t("syncAlsoAccount")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 5
  }, void 0);
};
_s(AccountField, "dp3RVm6n8Un1br6OmBsTAoory7c=", false, function() {
  return [useTranslation, useController];
});
_c = AccountField;
var _c;
$RefreshReg$(_c, "AccountField");
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
