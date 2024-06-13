import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/lastActivityOverview/lastActivityOverview.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/lastActivityOverview/lastActivityOverview.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/lastActivityOverview/lastActivityOverview.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Label, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useNewLastActivity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ContactViewSubTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { formatDateAsText } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { InfoDetailElement } from "/src/content/components/contactView/components/briefCardComponents/infoDetailElement.tsx.js";
import styles from "/src/content/components/contactView/components/lastActivityOverview/lastActivityOverview.module.css.js";
import { LastContactsView } from "/src/content/components/contactView/components/lastActivityOverview/lastContactsView/lastContactsView.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const LastActivityOverview = ({
  bobjectId,
  attemptsCount,
  lastAttempt,
  lastTouch,
  touchesCount,
  leadsIds,
  companyId
}) => {
  _s();
  const hasNewLastActivity = useNewLastActivity(bobjectId?.accountId);
  const {
    setActiveSubTab
  } = useContactViewContext();
  const {
    useGetSidePeekEnabled
  } = useExtensionContext();
  const {
    t
  } = useTranslation();
  const sidePeekEnabled = useGetSidePeekEnabled();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles._last_activity_container, {
      [styles._last_activity_container_center]: sidePeekEnabled
    }),
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._last_activity_header,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        className: sidePeekEnabled && styles._last_activity_title_sidePeek,
        size: "xs",
        color: "softPeanut",
        weight: "bold",
        children: t("sidePeek.overview.activity.lastActivity")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Label, {
        color: "lightBloobirds",
        textColor: "bloobirds",
        size: "small",
        uppercase: false,
        overrideStyle: {
          cursor: "pointer"
        },
        onClick: () => {
          setActiveSubTab(ContactViewSubTab.ACTIVITIES);
        },
        children: t("sidePeek.overview.activity.viewAll")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, void 0), hasNewLastActivity ? /* @__PURE__ */ _jsxDEV(LastContactsView, {
      bobjectId,
      leadsIds,
      companyId
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("table", {
      className: styles._last_activity_statistics,
      children: [/* @__PURE__ */ _jsxDEV("tr", {
        className: styles._last_activity_row,
        children: [/* @__PURE__ */ _jsxDEV("td", {
          children: /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "check",
            iconColor: "verySoftPeanut",
            text: t("sidePeek.overview.activity.attempts", {
              count: parseInt(attemptsCount) || 0
            }),
            textSize: "xs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 74,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 73,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("td", {
          children: /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "calendar",
            iconColor: "verySoftPeanut",
            text: `${t("sidePeek.overview.activity.lastAttempt")}: ${formatDateAsText({
              text: lastAttempt,
              t
            })}`,
            textSize: "xs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("tr", {
        className: styles._last_activity_row,
        children: [/* @__PURE__ */ _jsxDEV("td", {
          children: /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "checkDouble",
            iconColor: "verySoftPeanut",
            text: t("sidePeek.overview.activity.touches", {
              count: parseInt(touchesCount) || 0
            }),
            textSize: "xs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 97,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("td", {
          children: /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
            icon: "calendar",
            iconColor: "verySoftPeanut",
            text: `${t("sidePeek.overview.activity.lastTouch")}: ${formatDateAsText({
              text: lastTouch,
              t
            })}`,
            textSize: "xs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 107,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, void 0);
};
_s(LastActivityOverview, "GprgdjF2Wk37QjBV7qofncGOHEU=", true, function() {
  return [useNewLastActivity, useContactViewContext, useExtensionContext, useTranslation];
});
_c = LastActivityOverview;
var _c;
$RefreshReg$(_c, "LastActivityOverview");
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
