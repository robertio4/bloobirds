import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-openClickedStatistics-openClickedStatistics.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/openClickedStatistics/openClickedStatistics.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/openClickedStatistics/openClickedStatistics.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { Icon, Label, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport3_react["useState"];
import { formatDate, getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-openClickedStatistics-openClickedStatistics.module.css.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const Statistic = ({
  title,
  value,
  size
}) => {
  if (!value)
    return null;
  const length = Object.keys(value)?.length;
  const style = {
    color: length ? "var(--melon)" : "var(--peanut)",
    backgroundColor: length ? "var(--verySoftMelon)" : "var(--verySoftPeanut)",
    borderColor: length ? "var(--verySoftMelon)" : "var(--verySoftPeanut)"
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._statistic,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      weight: "medium",
      size: size === "medium" ? "m" : "xs",
      color: "peanut",
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Label, {
      size: "small",
      overrideStyle: style,
      children: length
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, void 0);
};
_c = Statistic;
const History = ({
  opens,
  clicks,
  size
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const openHistory = Object.entries(opens).map(([date, data]) => ({
    date: new Date(parseInt(date, 10) * 1e3),
    type: "opened",
    data
  }));
  const clickHistory = Object.entries(clicks).map(([date, data]) => ({
    date: new Date(parseInt(date, 10) * 1e3),
    type: "clicked",
    data
  }));
  const history = [...openHistory, ...clickHistory];
  history.sort((a, b) => b.date - a.date);
  return /* @__PURE__ */ _jsxDEV("ul", {
    className: styles._history_list,
    children: history.map(({
      date,
      type,
      data
    }) => /* @__PURE__ */ _jsxDEV("li", {
      className: styles._history_item,
      style: {
        margin: size === "medium" ? "28px 0 0" : "12px 0 0"
      },
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: size === "medium" ? "s" : "xxs",
        color: "peanut",
        children: type === "opened" ? t("activityTimelineItem.item.opened") : t("activityTimelineItem.item.clickedLink")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 11
      }, void 0), type === "clicked" && /* @__PURE__ */ _jsxDEV("a", {
        className: styles._history_link,
        href: data?.startsWith("http") ? data : `//${data}`,
        target: "_blank",
        rel: "noopener noreferrer",
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: size === "medium" ? "s" : "xxs",
          color: "bloobirds",
          ellipsis: 48,
          children: data?.replace(/https?:\/\/(www.)?/, "")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: size === "medium" ? "xs" : "xxxs",
        color: "softPeanut",
        children: formatDate(date, "dd LLL yyyy 'at' p OOO")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 11
      }, void 0)]
    }, `${date}-${type}`, true, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }, void 0))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 55,
    columnNumber: 5
  }, void 0);
};
_s(History, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = History;
export const OpenClickedStatistics = ({
  bobject,
  size = "medium"
}) => {
  _s2();
  const [showDetails, setShowDetails] = useState(false);
  const {
    t
  } = useTranslation();
  const openHistory = getTextFromLogicRole(bobject, "ACTIVITY__EMAIL_HISTORY_OPEN");
  const emailHistory = getTextFromLogicRole(bobject, "ACTIVITY__EMAIL_HISTORY_CLICK");
  if (!openHistory && !emailHistory) {
    return null;
  }
  const opens = openHistory ? JSON.parse(openHistory) : {};
  const clicks = emailHistory ? JSON.parse(emailHistory) : {};
  const emptyHistory = Object.keys(opens)?.length === 0 && Object.keys(clicks)?.length === 0;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._statistic_container,
      children: [/* @__PURE__ */ _jsxDEV(Statistic, {
        title: t("activityTimelineItem.item.opened"),
        value: opens,
        size
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Statistic, {
        title: t("activityTimelineItem.item.clicked"),
        value: clicks,
        size
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, void 0), !emptyHistory && /* @__PURE__ */ _jsxDEV("div", {
        className: styles._showDetails,
        onClick: () => setShowDetails(!showDetails),
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: size === "medium" ? "s" : "xxs",
          color: "bloobirds",
          children: showDetails ? t("activityTimelineItem.item.hideDetails") : t("activityTimelineItem.item.showDetails")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 117,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
          size: size === "medium" ? 16 : 12,
          name: showDetails ? "chevronUp" : "chevronDown",
          color: "bloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 122,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 7
    }, void 0), showDetails && /* @__PURE__ */ _jsxDEV(History, {
      opens,
      clicks,
      size
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 23
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 111,
    columnNumber: 5
  }, void 0);
};
_s2(OpenClickedStatistics, "2s+w4VPYA9V2PREAJYZ7YfR/BJs=", false, function() {
  return [useTranslation];
});
_c3 = OpenClickedStatistics;
var _c, _c2, _c3;
$RefreshReg$(_c, "Statistic");
$RefreshReg$(_c2, "History");
$RefreshReg$(_c3, "OpenClickedStatistics");
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
