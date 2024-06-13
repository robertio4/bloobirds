import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/leadBriefCard/components/leadInfoDetails.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/leadBriefCard/components/leadInfoDetails.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/leadBriefCard/components/leadInfoDetails.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { formatDateAsText } from "/src/utils/dates.ts.js";
import { InfoDetailElement } from "/src/content/components/contactView/components/briefCardComponents/infoDetailElement.tsx.js";
import styles from "/src/content/components/contactView/components/leadBriefCard/leadBriefCard.module.css.js";
import { MainNoteButton } from "/src/content/components/contactView/components/leadBriefCard/components/mainNoteButton.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const LeadInfoDetails = ({
  lead
}) => {
  _s();
  const {
    attemptsCount,
    touchesCount,
    lastTouch,
    lastAttempt,
    cadence,
    mainNote,
    cadenceEnded
  } = lead;
  const hasRunningCadence = cadence && cadenceEnded !== "true";
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      style: {
        flexShrink: 1
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.countsColumn,
      children: [/* @__PURE__ */ _jsxDEV(InfoDetailElement, {
        icon: "check",
        iconColor: "softPeanut",
        text: t("sidePeek.overview.activity.attempts", {
          count: parseInt(attemptsCount) || 0
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
        icon: "checkDouble",
        text: t("sidePeek.overview.activity.touches", {
          count: parseInt(touchesCount) || 0
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
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
        lineNumber: 36,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
        icon: "calendar",
        iconColor: "softPeanut",
        text: `${formatDateAsText({
          text: lastAttempt,
          t
        })}`
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.actionsColumn,
      children: [hasRunningCadence && /* @__PURE__ */ _jsxDEV(InfoDetailElement, {
        icon: "statusCircle",
        iconColor: "grape",
        iconSize: 6,
        text: t("sidePeek.bobjectBriefCard.onCadence")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 11
      }, void 0), mainNote && /* @__PURE__ */ _jsxDEV(MainNoteButton, {
        bobject: lead
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 22
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(LeadInfoDetails, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = LeadInfoDetails;
var _c;
$RefreshReg$(_c, "LeadInfoDetails");
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
