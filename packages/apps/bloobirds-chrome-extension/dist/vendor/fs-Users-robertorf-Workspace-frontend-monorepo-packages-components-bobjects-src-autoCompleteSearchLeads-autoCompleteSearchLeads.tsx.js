import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-autoCompleteSearchLeads-autoCompleteSearchLeads.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/autoCompleteSearchLeads/autoCompleteSearchLeads.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/autoCompleteSearchLeads/autoCompleteSearchLeads.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Item, SearchInput, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDebounce } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getFieldByLogicRole, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-autoCompleteSearchLeads-autoCompleteSearchLeads.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const AutoCompleteSearchLeads = ({
  onLeadIdChange,
  onChange,
  searchQuery = {},
  value,
  companyId,
  disabled = false,
  name = "lead",
  injectReferences = false,
  width = "200px",
  inputSize = "small",
  accountId
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
  } = useTranslation("translation", {
    keyPrefix: "bobjects.autoCompleteSearchLeads"
  });
  useEffect(() => {
    if (value) {
      setSearchValue(value);
      setSelectedValue(value);
    } else {
      setSearchValue(null);
      setSelectedValue(null);
    }
  }, [value]);
  useEffect(() => {
    const query = {
      ...searchQuery
    };
    if (debounceSearchValue) {
      query[LEAD_FIELDS_LOGIC_ROLE.FULL_NAME] = {
        query: [debounceSearchValue],
        searchMode: "AUTOCOMPLETE__SEARCH"
      };
    }
    if (companyId) {
      query[LEAD_FIELDS_LOGIC_ROLE.COMPANY] = companyId;
    }
    api.post(`/bobjects/${accountId}/Lead/search`, {
      injectReferences,
      query,
      columns: [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, LEAD_FIELDS_LOGIC_ROLE.COMPANY, LEAD_FIELDS_LOGIC_ROLE.ICP, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE, LEAD_FIELDS_LOGIC_ROLE.EMAIL],
      formFields: true,
      pageSize: 50
    }).then((data) => {
      const contents = data?.data?.contents;
      const newOptions = contents.map((lead) => {
        const company = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY).referencedBobject;
        return {
          id: lead?.id.value,
          name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          companyName: company ? getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) : null,
          buyerPersona: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP),
          jobTitle: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE),
          bobject: lead
        };
      });
      setOptions(newOptions);
    });
  }, [debounceSearchValue, focused]);
  useEffect(() => {
    setVisible(options.length > 0 && searchValue !== selectedValue || focused);
  }, [options.length, focused]);
  const handleSelect = (bobjectId) => {
    if (!bobjectId) {
      onChange(null);
    } else {
      const lead = options.find((option) => option.id === bobjectId);
      const urlLead = bobjectId.split("/");
      const leadId = urlLead[urlLead.length - 1];
      if (onLeadIdChange && typeof onLeadIdChange === "function") {
        onLeadIdChange(leadId);
      }
      if (onChange && typeof onChange === "function") {
        onChange(lead?.bobject);
      }
      setSearchValue(lead?.name);
      setSelectedValue(lead?.name);
      setVisible(false);
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    ref,
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      width: "100%",
      visible,
      fallbackPositions: ["bottom-start", "bottom-end", "top-end"],
      arrow: false,
      anchor: /* @__PURE__ */ _jsxDEV("div", {
        children: /* @__PURE__ */ _jsxDEV(SearchInput, {
          width: "100%",
          placeholder: t("placeholder"),
          value: searchValue,
          onChange: setSearchValue,
          disabled,
          size: inputSize,
          name,
          onFocus,
          onBlur
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 11
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._item_wrapper,
        style: {
          width
        },
        children: options?.length === 0 ? /* @__PURE__ */ _jsxDEV(Text, {
          className: styles._no_results,
          size: "s",
          color: "verySoftPeanut",
          children: t("noResults")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 167,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: options.map((option) => {
            return /* @__PURE__ */ _jsxDEV(Item, {
              onMouseDown: () => {
                handleSelect(option.id);
              },
              value: option.id,
              children: /* @__PURE__ */ _jsxDEV(_Fragment, {
                children: /* @__PURE__ */ _jsxDEV("div", {
                  className: styles._lead__info,
                  children: [/* @__PURE__ */ _jsxDEV(Text, {
                    color: "peanut",
                    size: "s",
                    weight: "medium",
                    ellipsis: 30,
                    children: option?.name
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 183,
                    columnNumber: 25
                  }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                    color: "softPeanut",
                    size: "xs",
                    inline: true,
                    className: styles._lead__company,
                    children: [option?.companyName && /* @__PURE__ */ _jsxDEV(_Fragment, {
                      children: [/* @__PURE__ */ _jsxDEV(Icon, {
                        size: 16,
                        name: "company",
                        color: "softPeanut",
                        className: styles._company__icon
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 189,
                        columnNumber: 31
                      }, void 0), option?.companyName]
                    }, void 0, true), option.companyName && option.jobTitle && " | ", option.jobTitle || ""]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 186,
                    columnNumber: 25
                  }, void 0)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 182,
                  columnNumber: 23
                }, void 0)
              }, void 0, false)
            }, option.id, false, {
              fileName: _jsxFileName,
              lineNumber: 174,
              columnNumber: 19
            }, void 0);
          })
        }, void 0, false)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 138,
    columnNumber: 5
  }, void 0);
};
_s(AutoCompleteSearchLeads, "ZIYk1MM453YkI67t8LpYDHyUoD8=", false, function() {
  return [useVisible, useDebounce, useTranslation];
});
_c = AutoCompleteSearchLeads;
var _c;
$RefreshReg$(_c, "AutoCompleteSearchLeads");
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
