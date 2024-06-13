import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-rescheduleCadence-rescheduleCadence.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/rescheduleCadence/rescheduleCadence.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/rescheduleCadence/rescheduleCadence.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CustomDateDialog } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import { Button, DateTimeShortcut, IconButton, Modal, Skeleton, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCadenceInfo, useUserTimeZone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { formatDate, getUserTimeZone, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-rescheduleCadence-rescheduleCadence.module.css.js";
import { useRescheduleCadence } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-rescheduleCadence-useRescheduleCadence.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const RescheduleCadence = ({
  bobject,
  onClose,
  onSave
}) => {
  _s();
  const userTimeZone = useUserTimeZone();
  const [customDateVisible, setCustomDateVisible] = useState(false);
  const {
    t,
    i18n
  } = useTranslation("translation", {
    keyPrefix: "cadence.rescheduleCadence"
  });
  const {
    getNextTaskDate,
    handleSubmit,
    nextTask
  } = useRescheduleCadence(bobject);
  const {
    cadence
  } = useCadenceInfo(bobject);
  const cadenceNotReschedulable = cadence?.reschedulableMode !== "RESCHEDULABLE";
  const nextTaskDate = getNextTaskDate();
  const getFormattedHour = () => {
    const dateTimeInfo = !Array.isArray(bobject) ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)) : null;
    return dateTimeInfo && dateTimeInfo.getHours() !== 0 ? dateTimeInfo.getHours() + ":" + dateTimeInfo.getMinutes() : "8:00";
  };
  const taskTime = getFormattedHour();
  const tomorrowMorning = spacetime().startOf("day").add(1, "day").time(taskTime).toNativeDate();
  const nextMondayDatetime = spacetime().startOf("week").add(1, "week").time(taskTime).toNativeDate();
  const inTwoDays = spacetime().startOf("day").add(2, "day").time(taskTime).toNativeDate();
  const inOneWeek = spacetime().startOf("day").add(1, "week").time(taskTime).toNativeDate();
  const handleSave = async (date) => {
    if (nextTask) {
      handleSubmit(date, nextTask).then(() => {
        setCustomDateVisible(false);
        onSave();
        onClose();
      });
    }
  };
  if (customDateVisible) {
    return /* @__PURE__ */ _jsxDEV(CustomDateDialog, {
      bobject,
      onCancel: () => setCustomDateVisible(false),
      onSubmit: async (date) => {
        const offsetDate = spacetime().goto(userTimeZone).year(date.getFullYear()).month(date.getMonth()).date(date.getDate()).hour(date.getHours()).minute(date.getMinutes()).toNativeDate();
        await handleSave(offsetDate);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(Modal, {
    className: styles.modal,
    open: true,
    onClose,
    width: 364,
    children: [/* @__PURE__ */ _jsxDEV("header", {
      className: styles.header,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xl",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        size: 40,
        name: "cross",
        color: "bloobirds",
        onClick: onClose
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("main", {
      className: styles.content,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._mainCalendarBox,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._text,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "l",
            weight: "bold",
            color: "peanut",
            children: t("nextStepIn")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 106,
            columnNumber: 13
          }, void 0), nextTaskDate ? /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            color: "peanut",
            children: getI18nSpacetimeLng(i18n.language, new Date(), getUserTimeZone()).since(getI18nSpacetimeLng(i18n.language, new Date(nextTaskDate), getUserTimeZone())).rounded
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 110,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ _jsxDEV(Skeleton, {
            width: 60,
            height: 24,
            variant: "text"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 118,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._calendar,
          children: [/* @__PURE__ */ _jsxDEV("header", {
            children: nextTaskDate ? /* @__PURE__ */ _jsxDEV(Text, {
              align: "center",
              size: "m",
              weight: "bold",
              color: "white",
              children: formatDate(new Date(nextTaskDate), "MMM").toUpperCase()
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 124,
              columnNumber: 17
            }, void 0) : /* @__PURE__ */ _jsxDEV(Skeleton, {
              width: 40,
              height: 24,
              variant: "text"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 128,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 122,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            children: nextTaskDate ? /* @__PURE__ */ _jsxDEV(Text, {
              align: "center",
              size: "xxl",
              weight: "bold",
              color: "peanut",
              children: new Date(nextTaskDate)?.getDate()
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 133,
              columnNumber: 17
            }, void 0) : /* @__PURE__ */ _jsxDEV(Skeleton, {
              width: 30,
              height: 40,
              variant: "rect"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 137,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 131,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 121,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: "softPeanut",
        children: t("subtitle")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 142,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.shortcuts,
        children: [/* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t("tomorrow"),
          date: tomorrowMorning,
          onClick: handleSave,
          format: t("dates.shortMonth")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t("nextMonday"),
          date: nextMondayDatetime,
          onClick: handleSave,
          format: t("dates.shortMonth")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 153,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t("inTwoDays"),
          date: inTwoDays,
          onClick: handleSave,
          format: t("dates.shortMonth")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t("inOneWeek"),
          date: inOneWeek,
          onClick: handleSave,
          format: t("dates.shortMonth")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 167,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: cadenceNotReschedulable ? "error" : void 0,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Button, {
          className: styles.customButton,
          expand: true,
          variant: "tertiary",
          uppercase: true,
          iconLeft: "calendar",
          onClick: () => setCustomDateVisible(true),
          disabled: cadenceNotReschedulable,
          children: t("selectDateAndTime")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 176,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 175,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 98,
    columnNumber: 5
  }, void 0);
};
_s(RescheduleCadence, "VvR1tybKstq/6IGpbY17wmF4/8Y=", false, function() {
  return [useUserTimeZone, useTranslation, useRescheduleCadence, useCadenceInfo];
});
_c = RescheduleCadence;
var _c;
$RefreshReg$(_c, "RescheduleCadence");
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
