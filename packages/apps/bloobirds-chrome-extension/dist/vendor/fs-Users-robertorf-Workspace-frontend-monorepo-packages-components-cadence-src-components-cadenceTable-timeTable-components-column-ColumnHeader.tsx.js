import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-ColumnHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/ColumnHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/column/ColumnHeader.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { getUserTimeZone, parseUTCDateToLocal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import classnames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isThisMonth, isThisWeek, isToday } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { TIME_WINDOW } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-timeTable.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ColumnHeader = ({
  date,
  timeWindow,
  isPausedDay,
  setTimeWindowWithDate
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceTable.timetable.column"
  });
  const isDailyWindow = timeWindow === TIME_WINDOW.DAILY;
  const userTimezone = getUserTimeZone();
  const {
    i18n: {
      language
    }
  } = useTranslation();
  const handleClick = () => {
    const newTimeWindow = timeWindow === TIME_WINDOW.MONTHLY ? TIME_WINDOW.WEEKLY : TIME_WINDOW.DAILY;
    setTimeWindowWithDate(newTimeWindow, date);
  };
  const isCurrentDate = useMemo(() => {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return isToday(parseUTCDateToLocal(date));
      case TIME_WINDOW.WEEKLY:
        return isThisWeek(parseUTCDateToLocal(date), {
          weekStartsOn: 1
        });
      case TIME_WINDOW.MONTHLY:
        return isThisMonth(parseUTCDateToLocal(date));
    }
  }, [timeWindow, date]);
  const title = useMemo(() => {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return isCurrentDate ? t("today") : getI18nSpacetimeLng(language, parseUTCDateToLocal(date, userTimezone)).format("{month-short} {date-pad}");
      case TIME_WINDOW.WEEKLY: {
        const startOfWeek = new Date(date);
        const endOfWeek = new Date().setDate(startOfWeek.getDate() + 6);
        return getI18nSpacetimeLng(language, startOfWeek).format("LLL dd") + " - " + getI18nSpacetimeLng(language, endOfWeek).format("dd");
      }
      case TIME_WINDOW.MONTHLY:
        return getI18nSpacetimeLng(language, new Date(date)).format("MMM yyyy");
    }
  }, [timeWindow, date]);
  const tooltipText = useMemo(() => {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return getI18nSpacetimeLng(language, parseUTCDateToLocal(date, userTimezone)).format("{month-short} {date-pad} {year}");
      case TIME_WINDOW.WEEKLY:
        return title + " " + getI18nSpacetimeLng(language, new Date(date)).format("yyyy");
      case TIME_WINDOW.MONTHLY:
        return title;
    }
  }, [timeWindow, date]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classnames(styles.row, {
      [styles.nonClickable]: isDailyWindow,
      [styles.clickable]: !isDailyWindow
    }),
    onClick: () => isDailyWindow ? void 0 : handleClick(),
    children: /* @__PURE__ */ _jsxDEV(Tooltip, {
      position: "top",
      title: tooltipText,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        weight: isCurrentDate ? "bold" : "regular",
        color: isCurrentDate ? "bloobirds" : "softPeanut",
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 9
      }, void 0), isPausedDay && /* @__PURE__ */ _jsxDEV(Icon, {
        name: "pause",
        color: "verySoftBanana",
        size: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 25
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 86,
    columnNumber: 5
  }, void 0);
};
_s(ColumnHeader, "kmRPwlaE43KzngjDcdXARlCU9ZE=", false, function() {
  return [useTranslation, useTranslation];
});
_c = ColumnHeader;
var _c;
$RefreshReg$(_c, "ColumnHeader");
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
