import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-scheduleEmailModal-customDateDialog-customDateDialog.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/scheduleEmailModal/customDateDialog/customDateDialog.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/scheduleEmailModal/customDateDialog/customDateDialog.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, DatePickerCalendar, DatePickerContainer, DatePickerDay, DatePickerFooter, DatePickerGrid, DatePickerGridItem, DatePickerHeader, getCalendarDays, getCalendarMonths, getCalendarYears, getUpdatedView, Modal, TimePicker, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getUserTimeZone, getValueFromLogicRole, isBeforeToday } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { isSameDay, isSameMonth, isSameYear } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-scheduleEmailModal-customDateDialog-customDateDialog.module.css.js";
import { getI18nSpacetimeLng } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CustomDateDialog = ({
  bobject,
  onSubmit,
  onCancel,
  showDateTime = true,
  customButtonText,
  customButtonVariant
}) => {
  _s();
  const getFormattedHour = () => {
    const dateTimeInfo = !Array.isArray(bobject) ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)) : null;
    return dateTimeInfo ? dateTimeInfo.getHours() + ":" + dateTimeInfo.getMinutes() : "8:00";
  };
  const taskTime = getFormattedHour();
  const {
    t,
    i18n
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.components.scheduleEmailModal"
  });
  const taskTimePresentDate = spacetime().startOf("day").time(taskTime).goto("utc").toNativeDate();
  const [format, setFormat] = useState("day");
  const [value, setValue] = useState(taskTimePresentDate);
  const [view, setView] = useState(value);
  return /* @__PURE__ */ _jsxDEV(Modal, {
    className: styles.modal,
    open: true,
    onClose: onCancel,
    width: 492,
    children: [/* @__PURE__ */ _jsxDEV(DatePickerContainer, {
      children: [/* @__PURE__ */ _jsxDEV(DatePickerHeader, {
        onNext: () => setView(getUpdatedView(view, format, "forwards")),
        onBack: () => setView(getUpdatedView(view, format, "backwards")),
        children: [/* @__PURE__ */ _jsxDEV("button", {
          "aria-label": "calendar month",
          onClick: () => setFormat("month"),
          className: styles.month,
          children: getI18nSpacetimeLng(i18n.language, view).format("{month-short}")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("button", {
          "aria-label": "calendar year",
          onClick: () => setFormat("year"),
          className: styles.year,
          children: getI18nSpacetimeLng(i18n.language, view).format("{year}")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 11
        }, void 0), showDateTime && /* @__PURE__ */ _jsxDEV(TimePicker, {
          value,
          onChange: setValue
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 28
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 9
      }, void 0), format === "year" && /* @__PURE__ */ _jsxDEV(DatePickerGrid, {
        children: getCalendarYears(view).map((year) => /* @__PURE__ */ _jsxDEV(DatePickerGridItem, {
          active: isSameYear(value, year),
          onClick: () => {
            setFormat("month");
            setView(year);
          },
          children: getI18nSpacetimeLng(i18n.language, year).format("{year}")
        }, year.toISOString(), false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 15
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 11
      }, void 0), format === "month" && /* @__PURE__ */ _jsxDEV(DatePickerGrid, {
        children: getCalendarMonths(view).map((month) => /* @__PURE__ */ _jsxDEV(DatePickerGridItem, {
          active: isSameMonth(value, month),
          onClick: () => {
            setFormat("day");
            setView(month);
          },
          children: getI18nSpacetimeLng(i18n.language, month).format("{month-short}")
        }, month.toISOString(), false, {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 15
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 11
      }, void 0), format === "day" && /* @__PURE__ */ _jsxDEV(DatePickerCalendar, {
        children: getCalendarDays(view).map((day) => /* @__PURE__ */ _jsxDEV(DatePickerDay, {
          value: day,
          outside: !isSameMonth(day, view),
          selected: isSameDay(day, value),
          disabled: isBeforeToday(day, getUserTimeZone()),
          onClick: () => {
            const newValue = new Date(day);
            newValue.setHours(value.getHours());
            newValue.setMinutes(value.getMinutes());
            setValue(newValue);
          }
        }, day.toISOString(), false, {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 15
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(DatePickerFooter, {
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        onClick: onCancel,
        color: "tomato",
        variant: "clear",
        size: "small",
        children: t("cancel")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          display: "flex"
        },
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          onClick: () => {
            const today = new Date();
            setFormat("day");
            setView(today);
            setValue(today);
          },
          variant: "clear",
          size: "small",
          children: t("today")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 152,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: isBeforeToday(value, getUserTimeZone()) && t("tooltip"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Button, {
            onClick: () => {
              onSubmit(value);
            },
            variant: customButtonVariant || "clear",
            size: "small",
            dataTest: "DateTimePicker-Ok",
            disabled: isBeforeToday(value, getUserTimeZone()),
            children: customButtonText || t("send")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 165,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 164,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 151,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 73,
    columnNumber: 5
  }, void 0);
};
_s(CustomDateDialog, "PAhtoS8YA2dKXih9OBFlHC4wk+Y=", false, function() {
  return [useTranslation];
});
_c = CustomDateDialog;
export default CustomDateDialog;
var _c;
$RefreshReg$(_c, "CustomDateDialog");
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
