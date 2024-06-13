import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-dayCalendar-dayCalendar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/dayCalendar/dayCalendar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/dayCalendar/dayCalendar.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, DatePicker, Icon, IconButton, Spinner, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ChangeTimezoneModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-miscModals-dist-index.js.js";
import { MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getUserTimeZone, isToday } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport9_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport9_mixpanelBrowser.__esModule ? __vite__cjsImport9_mixpanelBrowser.default : __vite__cjsImport9_mixpanelBrowser;
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { BloobirdsCalendarsSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-bloobirdsCalendarsSelector-bloobirdsCalendarsSelector.tsx.js";
import { Calendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendar-calendar.tsx.js";
import { CalendarNotConnected } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarNotConnected-calendarNotConnected.tsx.js";
import { CalendarsSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarsSelector-calendarsSelector.tsx.js";
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import DayCalendarContext from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-dayCalendar-context.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-dayCalendar-dayCalendar.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const DayCalendarChild = () => {
  _s();
  const {
    date,
    setDate,
    eventsPerDay,
    eventsTypeSelected,
    setEventTypesSelected,
    mutateCalendars,
    selectedTimezone,
    setSelectedTimezone,
    resetDate,
    loading
  } = useCalendar();
  const {
    connections,
    mutateConnections
  } = useContext(DayCalendarContext);
  const [changeTimezoneModalVisible, setChangeTimezoneModalVisible] = useState(false);
  const {
    visible,
    setVisible,
    ref
  } = useVisible(false);
  const isoDate = spacetime(date).format("iso-short");
  const today = isToday(spacetime(date).toNativeDate(), selectedTimezone || getUserTimeZone());
  const notConnected = eventsTypeSelected === "nylas" && connections?.list?.length === 0;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "dayCalendar"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._filters_wrapper,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._main_filters_container,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._left_main_filters,
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            onClick: () => setDate((date2) => spacetime(date2).subtract(1, "day").toNativeDate()),
            variant: "clear",
            size: "small",
            className: styles._day_button,
            children: /* @__PURE__ */ _jsxDEV(Icon, {
              name: "chevronLeft",
              size: 15
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 70,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 64,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            onClick: () => setDate((date2) => spacetime(date2).add(1, "day").toNativeDate()),
            variant: "clear",
            size: "small",
            className: styles._day_button,
            children: /* @__PURE__ */ _jsxDEV(Icon, {
              name: "chevronRight",
              size: 15
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 78,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(DatePicker, {
            withTimePicker: false,
            value: date,
            openDefaultValue: date,
            onChange: (date2) => setDate(date2),
            dropDownRef: ref,
            visible,
            setVisible,
            dropdownProps: {
              anchor: /* @__PURE__ */ _jsxDEV("span", {
                onClick: () => setVisible(true),
                className: styles._date_button,
                children: /* @__PURE__ */ _jsxDEV(Text, {
                  size: "m",
                  color: today ? "bloobirds" : "peanut",
                  weight: "regular",
                  children: (today ? t("today") : "") + useGetI18nSpacetime(date).format("{month-short} {date-ordinal}, {day}")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 92,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 91,
                columnNumber: 19
              }, void 0)
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 81,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            variant: "secondary",
            size: "small",
            uppercase: false,
            className: styles._today_button,
            onClick: () => resetDate(),
            children: t("today")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 102,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._event_type,
            style: {
              backgroundColor: eventsTypeSelected === "bloobirds" ? "var(--bloobirds)" : "var(--white)",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px"
            },
            onClick: () => setEventTypesSelected("bloobirds"),
            children: /* @__PURE__ */ _jsxDEV(Icon, {
              name: "bloobirds",
              color: eventsTypeSelected === "nylas" ? "bloobirds" : "white",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 121,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 111,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._event_type,
            style: {
              backgroundColor: eventsTypeSelected === "nylas" ? "var(--bloobirds)" : "var(--white)",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px"
            },
            onClick: () => setEventTypesSelected("nylas"),
            children: /* @__PURE__ */ _jsxDEV(Icon, {
              name: "calendar",
              size: 16,
              color: eventsTypeSelected === "nylas" ? "white" : "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 137,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 127,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._secondary_filters_container,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._secondary_filters_right,
          children: [/* @__PURE__ */ _jsxDEV(IconButton, {
            name: "timezonesAlter",
            size: 18,
            color: "bloobirds",
            onClick: () => setChangeTimezoneModalVisible(true)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 147,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._calendar_select,
            children: eventsTypeSelected === "nylas" ? /* @__PURE__ */ _jsxDEV(CalendarsSelector, {
              connections,
              disabled: eventsTypeSelected === "nylas" && connections?.list?.length === 0,
              anchor: CalendarSelectorAnchor
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 155,
              columnNumber: 17
            }, void 0) : /* @__PURE__ */ _jsxDEV(BloobirdsCalendarsSelector, {
              anchor: CalendarSelectorAnchor
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 161,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 153,
            columnNumber: 13
          }, void 0), loading && /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 25
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
          size: "small",
          color: "lightestPurple",
          variant: "primary",
          iconLeft: "suggestions",
          uppercase: false,
          className: styles._tip_button,
          onClick: () => {
            mixpanel.track(MIXPANEL_EVENTS.CALENDAR_TIPS_SEE_CLICKED);
            window.open("https://support.bloobirds.com/hc/en-us/articles/8908326645020-Advantages-of-creating-meetings-on-Bloobirds-vs-Google-Calendar-or-Outlook", "_blank");
          },
          children: t("calendarTips")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 166,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._calendar_wrapper,
      children: notConnected ? /* @__PURE__ */ _jsxDEV(CalendarNotConnected, {
        mode: "day",
        onCalendarReconnect: () => {
          if (mutateConnections) {
            mutateConnections().then(() => {
              mutateCalendars();
            });
          }
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 187,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Calendar, {
        day: isoDate,
        mode: "day",
        events: eventsPerDay,
        notConnected,
        onCalendarReconnect: () => {
          if (mutateConnections) {
            mutateConnections().then(() => {
              mutateCalendars();
            });
          }
        },
        selectedTimezone
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 7
    }, void 0), changeTimezoneModalVisible && /* @__PURE__ */ _jsxDEV(ChangeTimezoneModal, {
      onChange: (value) => {
        setSelectedTimezone(value);
        setChangeTimezoneModalVisible(false);
      },
      onClose: () => setChangeTimezoneModalVisible(false),
      defaultTimezone: selectedTimezone
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 60,
    columnNumber: 5
  }, void 0);
};
_s(DayCalendarChild, "+1NREQfSQtQ7WaxvWqzgiZKiB5c=", false, function() {
  return [useCalendar, useVisible, useTranslation, useGetI18nSpacetime];
});
_c = DayCalendarChild;
const CalendarSelectorAnchor = (visible, setVisible) => {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "dayCalendar"
  });
  return /* @__PURE__ */ _jsxDEV("span", {
    className: styles._selector_anchor,
    onClick: () => setVisible(!visible),
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "settings",
      size: 16,
      color: "bloobirds"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      children: t("calendars")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 233,
    columnNumber: 5
  }, void 0);
};
_s2(CalendarSelectorAnchor, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = CalendarSelectorAnchor;
export const DayCalendar = (props) => {
  const initialContext = {
    id: props?.id,
    accountId: props?.accountId,
    userId: props?.userId,
    settings: props?.settings,
    connections: props?.connections,
    mutateConnections: props?.mutateConnections
  };
  return /* @__PURE__ */ _jsxDEV(DayCalendarContext.Provider, {
    value: initialContext,
    children: /* @__PURE__ */ _jsxDEV(DayCalendarChild, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 251,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 250,
    columnNumber: 5
  }, void 0);
};
_c3 = DayCalendar;
var _c, _c2, _c3;
$RefreshReg$(_c, "DayCalendarChild");
$RefreshReg$(_c2, "CalendarSelectorAnchor");
$RefreshReg$(_c3, "DayCalendar");
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
