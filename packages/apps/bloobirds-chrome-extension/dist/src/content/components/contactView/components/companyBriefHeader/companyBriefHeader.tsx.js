import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/companyBriefHeader/companyBriefHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/companyBriefHeader/companyBriefHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/companyBriefHeader/companyBriefHeader.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CircularBadge, Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useFullSalesEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useAccountId } from "/src/hooks/useAccountId.ts.js";
import { useTargetMarkets } from "/src/hooks/useTargetMarkets.ts.js";
import { COMPANY_STAGE_LOGIC_ROLE } from "/src/utils/company.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { StageAndStatusLabel } from "/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx.js";
import { StageDivider } from "/src/content/components/contactView/components/stageDivider/stageDivider.tsx.js";
import styles from "/src/content/components/contactView/components/companyBriefHeader/companyBriefHeader.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CompanyBriefHeader = ({
  company,
  sidePeekEnabled,
  lead = null
}) => {
  _s();
  const targetMarkets = useTargetMarkets();
  const tm = targetMarkets?.find((bp) => bp?.id === company?.targetMarket);
  const shortname = tm?.shortName;
  const accountId = useAccountId();
  const hasSalesEnabled = useFullSalesEnabled(accountId);
  const {
    useGetDataModel
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const isSalesStage = dataModel?.findValueById(company?.stage)?.logicRole === COMPANY_STAGE_LOGIC_ROLE.SALES;
  const assigneeId = company?.assignedTo;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find((user) => user?.id === assigneeId);
  const assignedColor = assigneeUser?.color;
  const assignedName = assigneeUser?.name || assigneeUser?.email;
  const assignedShortName = assigneeUser?.shortname;
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.info_container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.info,
        children: [!sidePeekEnabled && /* @__PURE__ */ _jsxDEV(CircularBadge, {
          backgroundColor: tm?.color || "lightPeanut",
          className: styles.circular_badge,
          size: "small",
          children: shortname || company && /* @__PURE__ */ _jsxDEV(Icon, {
            name: "company",
            size: 20,
            color: "softPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 29
          }, void 0) || lead && /* @__PURE__ */ _jsxDEV(Icon, {
            name: "person",
            size: 20,
            color: "softPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 54,
            columnNumber: 26
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.content_container,
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            color: "peanut",
            weight: "bold",
            className: styles.name,
            children: company?.name || lead?.fullName || t("sidePeek.bobjectBriefCard.untitledCompany")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 58,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.info,
        children: [sidePeekEnabled && assignedName && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: `${assignedName}` ? `${t("common.assignedTo")}Assigned to ${assignedName}` : t("common.assign"),
          position: "bottom",
          children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
            style: {
              fontSize: "9px"
            },
            backgroundColor: assignedColor || "lightPeanut",
            size: "small",
            className: styles.assign_badge,
            children: assignedShortName || "U"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(StageAndStatusLabel, {
          bobject: company
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }, void 0), hasSalesEnabled && /* @__PURE__ */ _jsxDEV(StageDivider, {
      color: isSalesStage ? "peanut" : "softGrape"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 27
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, void 0);
};
_s(CompanyBriefHeader, "L92oWixqSn5wFaATSwRt9efXrA4=", true, function() {
  return [useTargetMarkets, useAccountId, useFullSalesEnabled, useExtensionContext, useUserSearch, useTranslation];
});
_c = CompanyBriefHeader;
var _c;
$RefreshReg$(_c, "CompanyBriefHeader");
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
