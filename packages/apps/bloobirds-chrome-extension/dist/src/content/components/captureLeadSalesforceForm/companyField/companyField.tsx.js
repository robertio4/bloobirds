import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/captureLeadSalesforceForm/companyField/companyField.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/captureLeadSalesforceForm/companyField/companyField.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/captureLeadSalesforceForm/companyField/companyField.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useController } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Input, Item, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCompanies, useCompanyCreationEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useDebounce } from "/vendor/.vite-deps-use-debounce.js__v--e00a6ff0.js";
import styles from "/src/content/components/captureLeadSalesforceForm/companyField/companyField.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CompanyField = ({
  control,
  logicRole,
  name,
  id,
  style
}) => {
  _s();
  const {
    field: {
      value: companyName,
      onChange: setCompanyName
    }
  } = useController({
    control,
    name: "companyName"
  });
  const {
    field: {
      value: createCompany,
      onChange: setCreateCompany
    }
  } = useController({
    control,
    name: "createCompany"
  });
  const {
    field: {
      value: companyId,
      onChange,
      onBlur
    },
    fieldState: {
      error
    }
  } = useController({
    control,
    name: `fields.${id}`
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.salesforcePages.companyField"
  });
  const {
    companies,
    isLoading
  } = useCompanies(companyName);
  const [companyFound, setCompanyFound] = useState(false);
  const [focused, setFocused] = useState(false);
  const [companiesFoundCount, setCompaniesFoundCount] = useState(0);
  const isCompanyCreationEnabled = useCompanyCreationEnabled();
  const [visible] = useDebounce(focused && !isLoading && companyName.length > 0, 200);
  useEffect(() => {
    if (!isLoading) {
      setCreateCompany(false);
      const company = companies.find((company2) => company2.name === companyName);
      if (company) {
        setCompanyFound(true);
        onChange(company.id.value);
        setCompaniesFoundCount(companies.length);
      } else if (companies.length > 0) {
        setCompanyFound(false);
        onChange("");
        setCompaniesFoundCount(companies.length);
      } else {
        setCompanyFound(false);
        onChange("");
        setCompaniesFoundCount(0);
      }
    }
  }, [companyName, isLoading]);
  const description = useMemo(() => {
    if (createCompany) {
      return {
        text: t("description.createCompany", {
          companyName
        }),
        color: style === "gradient" ? "white" : "bloobirds"
      };
    }
    if (!companyFound) {
      if (companiesFoundCount > 1) {
        return {
          text: t("description.foundCompanies", {
            count: companiesFoundCount
          }),
          color: style === "gradient" ? "white" : "tangerine"
        };
      }
      return {
        text: t("description.noMatches"),
        color: style === "gradient" ? "white" : "tangerine"
      };
    }
    return {
      text: t("description.matchingCompany", {
        companyName
      }),
      color: style === "gradient" ? "white" : "bloobirds"
    };
  }, [companyName, companyFound, createCompany, companiesFoundCount]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.company_label,
      children: [name, logicRole === "LEAD__COMPANY" && /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("tooltip"),
        position: "right",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "infoFilled",
          color: style === "gradient" ? "veryLightBloobirds" : "darkBloobirds",
          size: 16
        }, void 0, false, {
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
      lineNumber: 98,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.dropdown,
      children: [/* @__PURE__ */ _jsxDEV(Dropdown, {
        width: 256,
        position: "bottom-end",
        arrow: false,
        visible,
        anchor: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.dropdownInput,
          children: [/* @__PURE__ */ _jsxDEV(Input, {
            placeholder: t("searchPlaceholder"),
            value: companyName,
            onChange: setCompanyName,
            error: error?.message,
            onFocus: () => {
              setFocused(true);
            },
            onBlur: () => {
              setFocused(false);
              onBlur();
            },
            size: "small"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 118,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
            name: "search",
            color: "bloobirds",
            size: 14,
            className: styles.searchIcon
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 132,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 117,
          columnNumber: 13
        }, void 0),
        children: [companies.length === 0 ? /* @__PURE__ */ _jsxDEV(Text, {
          className: styles.empty,
          color: "softPeanut",
          size: "s",
          children: t("notFound")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 137,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            className: styles.empty,
            color: "softPeanut",
            size: "s",
            children: t("searchResults")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 142,
            columnNumber: 15
          }, void 0), companies.map((company) => /* @__PURE__ */ _jsxDEV(Item, {
            onClick: () => {
              setCompanyName(company.name);
              setCompanyFound(true);
              setFocused(false);
            },
            children: company.name
          }, company.id.value, false, {
            fileName: _jsxFileName,
            lineNumber: 146,
            columnNumber: 17
          }, void 0))]
        }, void 0, true), isCompanyCreationEnabled && !companyId ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.item,
          role: "button",
          onClick: () => {
            setCreateCompany(true);
          },
          children: /* @__PURE__ */ _jsxDEV(Text, {
            color: "bloobirds",
            size: "s",
            children: t("createNewCompany", {
              companyName
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 167,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 13
        }, void 0) : null]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        className: styles.description,
        color: description.color,
        size: "xxs",
        children: description.text
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 97,
    columnNumber: 5
  }, void 0);
};
_s(CompanyField, "JrDZhVCyhKRB+3tgJCJezHJpG/c=", false, function() {
  return [useController, useController, useController, useTranslation, useCompanies, useCompanyCreationEnabled, useDebounce];
});
_c = CompanyField;
var _c;
$RefreshReg$(_c, "CompanyField");
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
