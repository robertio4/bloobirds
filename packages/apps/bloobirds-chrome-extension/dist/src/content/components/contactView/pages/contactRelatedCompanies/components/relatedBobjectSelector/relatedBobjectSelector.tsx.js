import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/contactRelatedCompanies/components/relatedBobjectSelector/relatedBobjectSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/relatedBobjectSelector/relatedBobjectSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/contactRelatedCompanies/components/relatedBobjectSelector/relatedBobjectSelector.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Item, SearchInput, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { COMPANY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useDebounce } from "/vendor/.vite-deps-use-debounce.js__v--e00a6ff0.js";
import { useTargetMarkets } from "/src/hooks/useTargetMarkets.ts.js";
import { getTextFromLogicRole, getValueFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { keepPreviousResponse } from "/src/utils/swr.ts.js";
import styles from "/src/content/components/contactView/pages/contactRelatedCompanies/contactRelatedCompanies.module.css.js";
import { SearchItem } from "/src/content/components/contactView/pages/contactRelatedCompanies/components/searchItem/searchItem.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const companyColumns = [COMPANY_FIELDS_LOGIC_ROLE.NAME, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE];
const getCompaniesQuery = (searchValue) => ({
  query: searchValue !== "" ? {
    [COMPANY_FIELDS_LOGIC_ROLE.NAME]: {
      query: searchValue,
      searchMode: "AUTOCOMPLETE__SEARCH"
    }
  } : {},
  columns: companyColumns,
  formFields: true,
  pageSize: 15,
  searchMode: "AUTOCOMPLETE__SEARCH"
});
export const RelatedBobjectSelector = ({
  company,
  data,
  handleOnClick
}) => {
  _s();
  const {
    siblingCompanies,
    parentCompany,
    childCompanies
  } = data;
  const [searchValue, setSearchValue] = useState("");
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false);
  const [debounceSearchValue] = useDebounce(searchValue, 300);
  const targetMarkets = useTargetMarkets();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "common"
  });
  const {
    data: companies
  } = useSWR(company && [`/bobjects/${company?.id.accountId}/Company/search`, debounceSearchValue], ([url, debounceSearchValue2]) => api.post(url, getCompaniesQuery(debounceSearchValue2)), {
    use: [keepPreviousResponse]
  });
  const parsedCompanies = useMemo(() => companies?.data?.contents?.reduce((acc, resCompany) => {
    if (siblingCompanies?.some(({
      id
    }) => id.value === resCompany.id.value) || company?.id.value === resCompany.id.value || parentCompany?.id.objectId === resCompany.id.objectId || childCompanies?.find((child) => child.id.objectId === resCompany.id.objectId)) {
      return acc;
    }
    const resCompanyFields = {
      id: resCompany.id,
      name: getTextFromLogicRole(resCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME),
      website: getTextFromLogicRole(resCompany, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE)
    };
    const {
      name,
      color,
      shortName
    } = targetMarkets.find(({
      id
    }) => id === getValueFromLogicRole(resCompany, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET)) || {};
    const parsedCompany = {
      ...resCompanyFields,
      targetMarket: {
        name,
        color,
        shortName
      }
    };
    return [...acc, parsedCompany];
  }, []), [companies]);
  useEffect(() => {
    if (!parsedCompanies?.length)
      setVisible(false);
  }, [parsedCompanies]);
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    width: "376px",
    visible,
    arrow: false,
    position: "bottom-start",
    anchor: /* @__PURE__ */ _jsxDEV(SearchInput, {
      width: "376px",
      placeholder: t("search") + " ...",
      value: searchValue,
      onChange: (value) => {
        setSearchValue(value);
        setVisible(true);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 9
    }, void 0),
    children: parsedCompanies && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._drop_down_container,
      children: parsedCompanies.map((company2) => /* @__PURE__ */ _jsxDEV(Item, {
        value: company2.id.value,
        children: /* @__PURE__ */ _jsxDEV(SearchItem, {
          company: company2,
          handleOnClick: () => {
            handleOnClick(company2);
            setVisible(false);
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 15
        }, void 0)
      }, company2.id.value, false, {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 13
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
};
_s(RelatedBobjectSelector, "WtrkaukGteLFXFjteHUYS25Ohpw=", false, function() {
  return [useVisible, useDebounce, useTargetMarkets, useTranslation, useSWR];
});
_c = RelatedBobjectSelector;
var _c;
$RefreshReg$(_c, "RelatedBobjectSelector");
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
