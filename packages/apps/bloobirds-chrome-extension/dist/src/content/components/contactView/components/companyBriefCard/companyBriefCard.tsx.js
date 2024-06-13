import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/companyBriefCard/companyBriefCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/companyBriefCard/companyBriefCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/companyBriefCard/companyBriefCard.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CircularBadge, Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { COMPANY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { ContactViewTab } from "/src/types/contactView.ts.js";
import { formatDateAsText } from "/src/utils/dates.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { StageAndStatusLabel } from "/src/content/components/stageAndStatusLabel/stageAndStatusLabel.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { InfoDetailElement } from "/src/content/components/contactView/components/briefCardComponents/infoDetailElement.tsx.js";
import styles from "/src/content/components/contactView/components/companyBriefCard/companyBriefCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CompanyBriefCard = ({
  company
}) => {
  _s();
  const {
    name,
    lastAttempt,
    lastTouch,
    attemptsCount,
    touchesCount
  } = company;
  const {
    t
  } = useTranslation();
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
  const assigneeId = company?.assignedTo;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find((user) => user?.id === assigneeId);
  const assignedColor = assigneeUser?.color;
  const assignedName = assigneeUser?.name || assigneeUser?.email;
  const assignedShortName = assigneeUser?.shortname;
  const handleViewDetails = () => {
    setActiveBobject(company);
    setActiveTab(ContactViewTab.COMPANY);
  };
  const numberOfLeadsField = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS);
  const numberOfLeads = company.rawBobject?.[numberOfLeadsField.id];
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
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.left_info,
        children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
          backgroundColor: "lightPeanut",
          className: styles.circular_badge,
          size: "small",
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "company",
            size: 16,
            color: "softPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          weight: "bold",
          color: "bloobirds",
          className: textClasses,
          children: name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.status,
        children: [sidePeekEnabled && assignedName && /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: `${assignedName ? `${t("common.assignedTo")} ${assignedName}` : t("common.assign")}`,
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
          lineNumber: 67,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(StageAndStatusLabel, {
          bobject: company,
          className: styles.statusBadge
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }, void 0), sidePeekEnabled && /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.countBobjects,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.badgesContainer,
          children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
            size: "s",
            color: "verySoftBloobirds",
            backgroundColor: "var(--verySoftPeanut)",
            children: "JP"
          }, 1, false, {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(CircularBadge, {
            size: "s",
            color: "verySoftBloobirds",
            backgroundColor: "var(--verySoftPeanut)",
            children: "JP"
          }, 2, false, {
            fileName: _jsxFileName,
            lineNumber: 99,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "bloobirds",
          weight: "bold",
          children: t("sidePeek.overview.leads", {
            count: numberOfLeads
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.detailsInfo,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.countsColumn,
          children: [/* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "check",
            iconColor: "softPeanut",
            text: t("sidePeek.overview.activity.attempts", {
              count: +attemptsCount || 0
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 114,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "checkDouble",
            text: t("sidePeek.overview.activity.touches", {
              count: +touchesCount || 0
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 113,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.datesColumn,
          children: [/* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "calendar",
            iconColor: "softPeanut",
            text: `${formatDateAsText({
              text: lastTouch,
              t
            })}`
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 125,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "calendar",
            iconColor: "softPeanut",
            text: `${formatDateAsText({
              text: lastAttempt,
              t
            })}`
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 130,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 124,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 51,
    columnNumber: 5
  }, void 0);
};
_s(CompanyBriefCard, "v5axvRg0Hyt09Ts9Z7m1BfOCDSc=", true, function() {
  return [useTranslation, useContactViewContext, useExtensionContext, useUserSearch];
});
_c = CompanyBriefCard;
var _c;
$RefreshReg$(_c, "CompanyBriefCard");
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
