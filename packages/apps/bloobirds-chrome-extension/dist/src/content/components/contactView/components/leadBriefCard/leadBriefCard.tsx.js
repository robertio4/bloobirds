import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/leadBriefCard/leadBriefCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/leadBriefCard/leadBriefCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/leadBriefCard/leadBriefCard.tsx", _s = $RefreshSig$();
import { CircularBadge, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSyncBobjectStatus } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { InfoWarningSync } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-index.tsx.js";
import { LEAD_FIELDS_LOGIC_ROLE, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport7_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport7_mixpanelBrowser.__esModule ? __vite__cjsImport7_mixpanelBrowser.default : __vite__cjsImport7_mixpanelBrowser;
import { ContactViewTab } from "/src/types/contactView.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { StageAndStatusLabel } from "/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { LeadInfoDetails } from "/src/content/components/contactView/components/leadBriefCard/components/leadInfoDetails.tsx.js";
import styles from "/src/content/components/contactView/components/leadBriefCard/leadBriefCard.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const LeadBriefCard = ({
  lead
}) => {
  _s();
  const {
    fullName,
    jobTitle
  } = lead;
  const {
    setActiveTab
  } = useContactViewContext();
  const {
    setActiveBobject,
    useGetSidePeekEnabled,
    useGetDataModel
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const dataModel = useGetDataModel();
  const {
    syncStatus
  } = useSyncBobjectStatus(lead?.id?.accountId, [lead]);
  const opportunityFieldId = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES)?.id;
  const opportunitiesIds = lead?.rawBobject[opportunityFieldId]?.split("");
  const hasOpportunities = opportunitiesIds?.length > 0;
  const handleViewDetails = () => {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LEAD_FROM_CONTACT_VIEW_MENU_OTO);
    setActiveBobject(lead);
    setActiveTab(ContactViewTab.LEAD);
  };
  const detailsInfoClasses = clsx(styles.detailsInfo, {
    [styles.detailsInfoSidePeek]: sidePeekEnabled
  });
  const containerClasses = clsx(styles.container, {
    [styles.containerSidePeek]: sidePeekEnabled
  });
  const textClasses = clsx(styles.text, {
    [styles.textSidePeek]: sidePeekEnabled
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: containerClasses,
    onClick: handleViewDetails,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.details,
      children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
        backgroundColor: "softPeanut",
        color: "peanut",
        size: "s",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "person",
          color: "black",
          size: 14
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.leadInfoText,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          weight: "bold",
          color: "bloobirds",
          className: textClasses,
          children: fullName
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xxs",
          color: "softPeanut",
          className: styles.text,
          children: jobTitle
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.status,
        children: [hasOpportunities && /* @__PURE__ */ _jsxDEV(CircularBadge, {
          backgroundColor: "lightPeanut",
          size: sidePeekEnabled ? "s" : "xs",
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "fileOpportunity",
            color: "black",
            size: sidePeekEnabled ? 16 : 14
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 65,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 13
        }, void 0), syncStatus !== void 0 && !syncStatus && /* @__PURE__ */ _jsxDEV(InfoWarningSync, {
          type: "lead",
          id: lead?.id,
          size: sidePeekEnabled ? "medium" : "small"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(StageAndStatusLabel, {
          bobject: lead
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: detailsInfoClasses,
      children: /* @__PURE__ */ _jsxDEV(LeadInfoDetails, {
        lead
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 47,
    columnNumber: 5
  }, void 0);
};
_s(LeadBriefCard, "+Y61YQzcW+MeYRK0Mi0AwxlvVaw=", true, function() {
  return [useContactViewContext, useExtensionContext, useSyncBobjectStatus];
});
_c = LeadBriefCard;
var _c;
$RefreshReg$(_c, "LeadBriefCard");
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
