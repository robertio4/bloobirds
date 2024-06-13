import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectSelector-bobjectSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectSelector/bobjectSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectSelector/bobjectSelector.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Input, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { BobjectItemCompressed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItemCompressed-bobjectItemCompressed.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectSelector-bobjectSelector.module.css.js";
import { NoResultsFound } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectSelector-components-noResultsFound-noResultsFound.tsx.js";
import { NoSearchYetMessage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectSelector-components-noSearchYetMessage-noSearchYetMessage.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const BobjectSelector = ({
  accountId,
  onBobjectChange,
  selected,
  id,
  iconSize = 12,
  size = "medium",
  bobjectType
}) => {
  _s();
  const {
    visible,
    ref,
    setVisible
  } = useVisible(false);
  const [searchValue, setSearchValue] = useState();
  const {
    data: response
  } = useSWR(searchValue && searchValue !== "" && visible ? [id || "bobjectSelector", searchValue] : null, () => {
    return api.post(`/bobjects/${accountId}/global-search`, {
      query: searchValue,
      bobjectTypes: ["Company", "Lead", "Opportunity"],
      numberOfResults: 20
    });
  }, {
    use: [keepPreviousResponse]
  });
  const results = response?.data?.results;
  const isSmall = size === "small";
  const iconMap = {
    [BobjectTypes.Company]: "company",
    [BobjectTypes.Lead]: "person",
    [BobjectTypes.Opportunity]: "fileOpportunity"
  };
  const icon = iconMap[bobjectType];
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "bobjects.bobjectSelector"
  });
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    width: 323,
    ref,
    visible,
    zIndex: 2e4,
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      onClick: () => setVisible(!visible),
      className: styles.link_button,
      children: [/* @__PURE__ */ _jsxDEV(Icon, {
        name: icon ?? "link",
        color: "bloobirds",
        size: iconSize
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: isSmall ? "xs" : "s",
        color: "bloobirds",
        children: selected || t("link")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }, void 0),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.content,
      children: [/* @__PURE__ */ _jsxDEV(Input, {
        autoFocus: true,
        width: "100%",
        placeholder: t("search"),
        onChange: setSearchValue,
        value: searchValue,
        className: styles.input
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.results,
        children: results ? results?.length > 0 ? /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: results?.map((result) => /* @__PURE__ */ _jsxDEV(BobjectItemCompressed, {
            bobject: {
              ...result,
              url: null
            },
            handleCompanyClicked: () => {
            },
            handleClick: (bobject) => {
              onBobjectChange(bobject);
              setVisible(false);
            }
          }, result?.rawBobject?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 85,
            columnNumber: 19
          }, void 0))
        }, void 0, false) : /* @__PURE__ */ _jsxDEV(NoResultsFound, {
          searchTerm: searchValue
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 15
        }, void 0) : /* @__PURE__ */ _jsxDEV(NoSearchYetMessage, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 57,
    columnNumber: 5
  }, void 0);
};
_s(BobjectSelector, "//fMK0aGblRC1Qy3PY2URXMbe1c=", false, function() {
  return [useVisible, useSWR, useTranslation];
});
_c = BobjectSelector;
var _c;
$RefreshReg$(_c, "BobjectSelector");
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
