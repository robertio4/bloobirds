import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-autoCompleteSearchCompanies-autoCompleteSearchCompanies.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/autoCompleteSearchCompanies/autoCompleteSearchCompanies.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/autoCompleteSearchCompanies/autoCompleteSearchCompanies.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Item, Input, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDebounce } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { COMPANY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getValueFromLogicRole, api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-autoCompleteSearchCompanies-autoCompleteSearchCompanies.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const AutoCompleteSearchCompanies = ({
  onCompanyIdChange,
  onChange,
  value,
  disabled = false,
  name = "company",
  width = "200px",
  accountId,
  size = "medium"
}) => {
  _s();
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(value);
  const [selectedValue, setSelectedValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue, 200);
  const {
    t
  } = useTranslation();
  useEffect(() => {
    if (value) {
      setSearchValue(value);
      setSelectedValue(value);
    }
  }, [value]);
  useEffect(() => {
    const query = {};
    if (debounceSearchValue) {
      query[COMPANY_FIELDS_LOGIC_ROLE.NAME] = [debounceSearchValue];
    }
    api.post(`/bobjects/${accountId}/Company/search`, {
      injectReferences: false,
      query,
      formFields: true,
      pageSize: 50
    }).then((data) => {
      const contents = data?.data?.contents;
      const newOptions = contents.map((company) => ({
        id: company?.id.value,
        name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
        targetMarket: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET),
        website: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE),
        country: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY, true),
        bobject: company
      }));
      setOptions(newOptions);
    });
  }, [debounceSearchValue]);
  useEffect(() => {
    setVisible(options.length > 0 && searchValue !== selectedValue || focused);
  }, [options.length, selectedValue, searchValue, focused]);
  const handleSelect = (bobjectId) => {
    if (!bobjectId) {
      if (onChange && typeof onChange === "function") {
        onChange(null);
      }
    } else {
      const company = options.find((option) => option.id === bobjectId);
      if (onCompanyIdChange && typeof onCompanyIdChange === "function") {
        onCompanyIdChange(bobjectId);
      }
      if (onChange && typeof onChange === "function") {
        onChange(company?.bobject);
      }
      setSearchValue(company?.name);
      setSelectedValue(company?.name);
    }
  };
  const onClose = () => {
    if ((!searchValue || searchValue === "") && (value !== "" || value)) {
      handleSelect(null);
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    ref,
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      width: "100%",
      visible,
      onClose,
      arrow: false,
      anchor: /* @__PURE__ */ _jsxDEV(Input, {
        width: "100%",
        placeholder: searchValue ? `${t("common.company_other")} *` : `${t("common.search")} ${t("common.company_other").toLowerCase()} *`,
        value: searchValue,
        onChange: setSearchValue,
        disabled,
        size,
        name,
        onFocus,
        onBlur,
        icon: "search"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 11
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._item_wrapper,
        style: {
          width
        },
        children: options?.length > 0 ? /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: options.map((option) => {
            return /* @__PURE__ */ _jsxDEV(Item, {
              onMouseDown: () => handleSelect(option.id),
              value: option.id,
              children: /* @__PURE__ */ _jsxDEV("div", {
                className: styles._company__info,
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  color: "peanut",
                  size: "s",
                  weight: "medium",
                  ellipsis: 30,
                  children: option?.name
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 153,
                  columnNumber: 23
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  color: "softPeanut",
                  size: "s",
                  inline: true,
                  className: styles._company__website,
                  children: [option?.website && /* @__PURE__ */ _jsxDEV(_Fragment, {
                    children: [/* @__PURE__ */ _jsxDEV(Icon, {
                      size: 16,
                      name: "timezones",
                      color: "softPeanut",
                      className: styles._company__icon
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 159,
                      columnNumber: 29
                    }, void 0), option?.website]
                  }, void 0, true), option.website && option?.country && " | ", option?.country || ""]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 156,
                  columnNumber: 23
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 152,
                columnNumber: 21
              }, void 0)
            }, option.id, false, {
              fileName: _jsxFileName,
              lineNumber: 147,
              columnNumber: 19
            }, void 0);
          })
        }, void 0, false) : /* @__PURE__ */ _jsxDEV("div", {
          className: styles.noResults,
          children: /* @__PURE__ */ _jsxDEV(Text, {
            color: "softPeanut",
            size: "s",
            children: t("common.noResultsFound")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 178,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 177,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 112,
    columnNumber: 5
  }, void 0);
};
_s(AutoCompleteSearchCompanies, "ZIYk1MM453YkI67t8LpYDHyUoD8=", false, function() {
  return [useVisible, useDebounce, useTranslation];
});
_c = AutoCompleteSearchCompanies;
var _c;
$RefreshReg$(_c, "AutoCompleteSearchCompanies");
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
