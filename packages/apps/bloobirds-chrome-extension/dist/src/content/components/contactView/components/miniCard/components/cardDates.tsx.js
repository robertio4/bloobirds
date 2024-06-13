import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/miniCard/components/cardDates.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/components/cardDates.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/components/cardDates.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { formatDateAsText } from "/src/utils/dates.ts.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const DateText = ({
  value,
  prefixText
}) => {
  _s();
  const {
    t
  } = useTranslation();
  return value ? /* @__PURE__ */ _jsxDEV("div", {
    children: /* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      ellipsis: 25,
      color: "darkBloobirds",
      inline: true,
      children: [/* @__PURE__ */ _jsxDEV("b", {
        children: prefixText
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 9
      }, void 0), " ", formatDateAsText({
        text: value,
        t
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 11,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s(DateText, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = DateText;
export const ScheduledDateTime = ({
  scheduledDateTime,
  isOverdue,
  isCadence = false
}) => {
  _s2();
  const {
    t
  } = useTranslation();
  return scheduledDateTime ? /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: isOverdue && "Overdue",
    position: "top",
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._datetime,
      children: [!isCadence && /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: isOverdue ? "tomato" : "darkBloobirds",
        children: formatDateAsText({
          text: scheduledDateTime,
          patternFormat: "{time-24}",
          t
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: isOverdue ? "tomato" : "darkBloobirds",
        children: formatDateAsText({
          text: scheduledDateTime,
          patternFormat: t("dates.shortMonth"),
          t
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s2(ScheduledDateTime, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = ScheduledDateTime;
var _c, _c2;
$RefreshReg$(_c, "DateText");
$RefreshReg$(_c2, "ScheduledDateTime");
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
