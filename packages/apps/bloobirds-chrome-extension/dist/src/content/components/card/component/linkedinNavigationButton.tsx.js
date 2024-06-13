import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/component/linkedinNavigationButton.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/linkedinNavigationButton.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/component/linkedinNavigationButton.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CardButton, Dropdown, IconButton, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getFieldByLogicRole, getValueFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { getTaskReferenceBobject } from "/src/utils/tasks.utils.ts.js";
import styles from "/src/content/components/card/card.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const getLinkedInUrls = (bobject, bobjectType) => {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return [getValueFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL) || bobject.linkedinUrl];
    case BobjectTypes.Lead: {
      const linkedinUrl = getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL) || bobject.linkedinUrl;
      const salesNavUrl = getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.SALES_NAV_URL) || bobject.salesNavUrl;
      return [linkedinUrl, salesNavUrl];
    }
    case BobjectTypes.Activity: {
      const referenceBobject = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject || getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
      return getLinkedInUrls(referenceBobject, referenceBobject.id.typeName);
    }
    default: {
      const referenceBobject = getTaskReferenceBobject(bobject);
      if (referenceBobject) {
        return getLinkedInUrls(referenceBobject, referenceBobject.id.typeName);
      }
      return [];
    }
  }
};
export const LinkedinNavigationButton = ({
  bobject
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const bobjectType = bobject?.id.typeName;
  const {
    ref,
    visible,
    setVisible
  } = useVisible(false);
  const linkedinUrls = getLinkedInUrls(bobject, bobjectType).filter(Boolean);
  const notInLinkedin = !linkedinUrls.length;
  function handleAnchorClick() {
    if (notInLinkedin)
      return null;
    if (linkedinUrls.length === 2) {
      setVisible((visible2) => !visible2);
    } else
      window.location.href = linkedinUrls[0];
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.linkedinDropdown,
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref,
      visible,
      position: "top",
      anchor: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: notInLinkedin ? t("extension.card.navigateLinkedinErrorTooltip") : t("extension.card.navigateLinkedinTooltip"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(CardButton, {
          iconLeft: "linkedin",
          dataTest: "linkedinButton",
          onClick: handleAnchorClick,
          variant: "secondary",
          disabled: notInLinkedin
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 11
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV("div", {
        children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("extension.card.openLinkedin"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "linkedin",
            color: "darkBloobirds",
            size: 32,
            onClick: () => window.location.href = linkedinUrls[0]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 86,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("extension.card.openLinkedinSalesNav"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "compass",
            color: "darkBloobirds",
            size: 32,
            onClick: () => window.location.href = linkedinUrls[1]
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 60,
    columnNumber: 5
  }, void 0);
};
_s(LinkedinNavigationButton, "P1+eNU4WFk9eW3odxbLG6fCWhiY=", false, function() {
  return [useTranslation, useVisible];
});
_c = LinkedinNavigationButton;
var _c;
$RefreshReg$(_c, "LinkedinNavigationButton");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
