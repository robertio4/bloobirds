import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-components-dropdownHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/components/dropdownHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/components/dropdownHeader.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Chip, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import classNames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import { SearchType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const getTooltipText = ({
  hasCompany,
  hasValuesAdded,
  hasNoEmailsLeftOnContext,
  t
}) => {
  if (!hasCompany) {
    return !hasValuesAdded ? t("cannotSearchEmailsInCopmany") : t("currentEmailDoesNotHaveCompany");
  } else if (hasNoEmailsLeftOnContext) {
    return t("allRelatedEmailsHaveBeenAdded");
  } else {
    return null;
  }
};
export const DropdownHeader = ({
  hasValuesAdded,
  searchType,
  hasCompany,
  hasNoEmailsLeftOnContext,
  handleDropdownChipClick,
  allCoworkersAdded
}) => {
  _s();
  const isB2CAccount = useIsB2CAccount();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.recipientSearchInput.header"
  });
  const tooltip = getTooltipText({
    hasValuesAdded,
    hasCompany,
    hasNoEmailsLeftOnContext,
    t
  });
  const disableContextSearch = !hasCompany || hasNoEmailsLeftOnContext;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.chipGroupDiv,
    children: [!isB2CAccount && /* @__PURE__ */ _jsxDEV("div", {
      className: classNames({
        [styles.chipSelected]: searchType === SearchType.relatedBobjects
      }),
      children: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: tooltip,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Chip, {
          size: "small",
          disabled: disableContextSearch,
          variant: disableContextSearch ? "primary" : "secondary",
          selected: searchType === SearchType.relatedBobjects,
          onClick: () => {
            handleDropdownChipClick(SearchType.relatedBobjects);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
          },
          children: t("searchInCompany")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: classNames({
        [styles.chipSelected]: searchType === SearchType.globalSearch
      }),
      children: /* @__PURE__ */ _jsxDEV(Chip, {
        size: "small",
        selected: searchType === SearchType.globalSearch,
        onClick: () => {
          handleDropdownChipClick(SearchType.globalSearch);
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
        },
        children: t("searchEverywhere")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: classNames({
        [styles.chipSelected]: searchType === SearchType.companySearch
      }),
      children: /* @__PURE__ */ _jsxDEV(Chip, {
        size: "small",
        variant: allCoworkersAdded ? "primary" : "secondary",
        disabled: allCoworkersAdded,
        selected: searchType === SearchType.companySearch,
        onClick: () => {
          handleDropdownChipClick(SearchType.companySearch);
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
        },
        children: t("coworkersEmails")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 45,
    columnNumber: 5
  }, void 0);
};
_s(DropdownHeader, "Qq4xQMioUogseILf9eJ+2yCRsw8=", false, function() {
  return [useIsB2CAccount, useTranslation];
});
_c = DropdownHeader;
var _c;
$RefreshReg$(_c, "DropdownHeader");
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
