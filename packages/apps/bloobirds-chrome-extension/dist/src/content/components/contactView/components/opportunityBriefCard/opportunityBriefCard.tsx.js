import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/opportunityBriefCard/opportunityBriefCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/opportunityBriefCard/opportunityBriefCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/opportunityBriefCard/opportunityBriefCard.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CircularBadge, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useNoStatusOppSetting, useSyncBobjectStatus, useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { InfoWarningSync } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-index.tsx.js";
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { parseCurrency } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { ContactViewTab } from "/src/types/contactView.ts.js";
import { formatDateAsText } from "/src/utils/dates.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { SalesforceStageLabel } from "/src/content/components/salesforceStageLabel/salesforceStageLabel.tsx.js";
import { StageAndStatusLabel } from "/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { InfoDetailElement } from "/src/content/components/contactView/components/briefCardComponents/infoDetailElement.tsx.js";
import { MainNoteButton } from "/src/content/components/contactView/components/leadBriefCard/components/mainNoteButton.tsx.js";
import styles from "/src/content/components/contactView/components/opportunityBriefCard/opportunityBriefCard.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const OpportunityBriefCard = ({
  opportunity
}) => {
  _s();
  const {
    name,
    status,
    amount,
    closeDate,
    mainNote
  } = opportunity;
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const {
    setActiveTab
  } = useContactViewContext();
  const {
    setActiveBobject,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const dataModel = useDataModel();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    syncStatus
  } = useSyncBobjectStatus(opportunity?.id?.accountId, [opportunity]);
  const {
    prefix,
    suffix
  } = dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};
  const handleViewDetails = () => {
    setActiveBobject(opportunity);
    setActiveTab(ContactViewTab.OPPORTUNITY);
  };
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    onClick: handleViewDetails,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.headerText,
      children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
        backgroundColor: "softPeanut",
        color: "peanut",
        size: "s",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "fileOpportunity",
          color: "black",
          size: 14
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.opportunityName,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          weight: "bold",
          className: styles.text,
          color: "bloobirds",
          children: name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, void 0), syncStatus !== void 0 && !syncStatus && /* @__PURE__ */ _jsxDEV(InfoWarningSync, {
        type: "opportunity",
        id: opportunity?.id,
        size: sidePeekEnabled ? "medium" : "small"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.mainInfo,
      children: [amount && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.amountWrapper,
        children: [prefix && /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "softPeanut",
          className: styles.amountCurrency,
          children: prefix
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 15
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          className: styles.amount,
          children: parseCurrency(amount)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }, void 0), suffix && /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "softPeanut",
          className: styles.amountCurrency,
          children: suffix
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.status,
        children: isNoStatusOppSetting ? /* @__PURE__ */ _jsxDEV(SalesforceStageLabel, {
          bobject: opportunity
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 13
        }, void 0) : status && /* @__PURE__ */ _jsxDEV(StageAndStatusLabel, {
          bobject: opportunity
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 23
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, void 0), (closeDate || mainNote) && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.infoFields,
      children: [closeDate && /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
        icon: "calendar",
        iconColor: "softPeanut",
        text: ` ${t("sidePeek.bobjectBriefCard.closes")} ${formatDateAsText({
          text: closeDate,
          t
        })}`
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 13
      }, void 0), mainNote && /* @__PURE__ */ _jsxDEV(MainNoteButton, {
        bobject: opportunity
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 24
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, void 0);
};
_s(OpportunityBriefCard, "j1/7Wu0bcph6UpXOKZVNlYprT+I=", true, function() {
  return [useNoStatusOppSetting, useContactViewContext, useExtensionContext, useDataModel, useSyncBobjectStatus, useTranslation];
});
_c = OpportunityBriefCard;
var _c;
$RefreshReg$(_c, "OpportunityBriefCard");
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
