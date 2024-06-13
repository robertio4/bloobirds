import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-dayCalendar-dayCalendar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/components/dayCalendar/dayCalendar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/components/dayCalendar/dayCalendar.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDom_server from "/vendor/.vite-deps-react-dom_server.js__v--e2336c77.js"; const ReactDOMServer = __vite__cjsImport3_reactDom_server.__esModule ? __vite__cjsImport3_reactDom_server.default : __vite__cjsImport3_reactDom_server;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { BloobirdsCalendarsSelector, Calendar, CalendarNotConnected, CalendarsSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-calendar-dist-index.js.js";
import { Button, DatePicker, Icon, IconButton, Spinner, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ChangeTimezoneModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-miscModals-dist-index.js.js";
import { ELEMENT_SLOTS_FORM } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getUserTimeZone, isToday, recoverScrollOfBox, removeScrollOfBox } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { getPluginType, insertNodes, removeNodes } from "/vendor/.vite-deps-@udecode_plate.js__v--feffb7cb.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport15_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport15_mixpanelBrowser.__esModule ? __vite__cjsImport15_mixpanelBrowser.default : __vite__cjsImport15_mixpanelBrowser;
import { Node } from "/vendor/.vite-deps-slate.js__v--2e5bd3ec.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-dayCalendar-dayCalendar.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const getSlotsNodePosition = (bodyEditor) => {
  const nodesArray = Array.from(Node.elements(bodyEditor));
  const slotsNode = nodesArray.find((node) => node[0]?.type === ELEMENT_SLOTS_FORM);
  return {
    slotsNode: slotsNode?.[0],
    slotsNodePath: slotsNode?.[1]
  };
};
export const DayCalendar = ({
  bodyEditor,
  connections,
  mutateConnections,
  hasCalendarSlotsEnabled,
  slotsData,
  setSlotsData,
  handleSlotClick
}) => {
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
  const [changeTimezoneModalVisible, setChangeTimezoneModalVisible] = useState(false);
  const {
    visible,
    setVisible,
    ref
  } = useVisible(false);
  const isoDate = useGetI18nSpacetime(date, selectedTimezone || getUserTimeZone()).format("iso-short");
  const today = isToday(spacetime(date).toNativeDate(), selectedTimezone || getUserTimeZone());
  const notConnected = eventsTypeSelected === "nylas" && connections?.list?.length === 0;
  const {
    company,
    lead,
    opportunity
  } = useSmartEmailModal();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "dayCalendar"
  });
  const {
    t: datesT
  } = useTranslation("translation", {
    keyPrefix: "dates"
  });
  function handleSlots(slots, onClickCallback) {
    const isDelete = !slots;
    const createRawHTMLBlock = (editor, html) => {
      const type = getPluginType(editor, ELEMENT_SLOTS_FORM);
      return {
        onClick: () => {
          handleSlotClick();
          onClickCallback(slots?.props?.liveEvents);
          mixpanel.track(MIXPANEL_EVENTS.EDIT_CALENDAR_SLOTS);
        },
        html,
        type,
        children: [{
          text: ""
        }]
      };
    };
    if (bodyEditor) {
      const {
        slotsNodePath,
        slotsNode
      } = getSlotsNodePosition(bodyEditor);
      const isEditing = !!slotsNode;
      if (isDelete || isEditing) {
        removeNodes(bodyEditor, {
          at: {
            path: [...slotsNodePath, 0],
            offset: 0
          }
        });
      }
      if (!isDelete) {
        insertNodes(bodyEditor, createRawHTMLBlock(bodyEditor, ReactDOMServer.renderToString(slots)), {
          at: isEditing ? {
            path: [slotsNodePath[0] - 1, 0],
            offset: 0
          } : bodyEditor.selection
        });
      }
    }
    setSlotsData((prevSlotsData) => {
      return {
        ...prevSlotsData,
        calendarSlotsVisible: false
      };
    });
    setDate(new Date());
  }
  useEffect(() => {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);
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
              lineNumber: 154,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 148,
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
              lineNumber: 162,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 156,
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
                  children: (today ? t("today") : "") + useGetI18nSpacetime(date).format(datesT("shortDayMonth"))
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 175,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 174,
                columnNumber: 19
              }, void 0)
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: [!today && /* @__PURE__ */ _jsxDEV(Button, {
            variant: "secondary",
            size: "small",
            uppercase: false,
            className: styles._today_button,
            onClick: () => resetDate(),
            children: t("today")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 186,
            columnNumber: 15
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
              lineNumber: 206,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 196,
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
              lineNumber: 222,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 212,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 146,
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
            lineNumber: 232,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._calendar_select,
            children: eventsTypeSelected === "nylas" ? /* @__PURE__ */ _jsxDEV(CalendarsSelector, {
              connections,
              disabled: eventsTypeSelected === "nylas" && connections?.list?.length === 0,
              anchor: CalendarSelectorAnchor
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 240,
              columnNumber: 17
            }, void 0) : /* @__PURE__ */ _jsxDEV(BloobirdsCalendarsSelector, {
              anchor: CalendarSelectorAnchor
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 246,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 238,
            columnNumber: 13
          }, void 0), hasCalendarSlotsEnabled && /* @__PURE__ */ _jsxDEV(Button, {
            size: "small",
            color: "bloobirds",
            variant: "secondary",
            iconLeft: "meetingSlots",
            uppercase: false,
            className: clsx(styles._slots_button, {
              [styles._slots_button_active]: slotsData.calendarSlotsVisible
            }),
            onClick: () => {
              setSlotsData((prevSlotsData) => ({
                ...prevSlotsData,
                calendarSlotsVisible: true
              }));
            },
            children: t("shareSlots")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 250,
            columnNumber: 15
          }, void 0), loading && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.loaderWrapper,
            children: /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 271,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 270,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 231,
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
          lineNumber: 275,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 230,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 145,
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
        lineNumber: 296,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Calendar, {
        contextItems: {
          Company: company,
          Lead: lead,
          Opportunity: opportunity
        },
        day: isoDate,
        mode: "day",
        events: eventsPerDay,
        notConnected,
        slotsData,
        setSlotsData,
        handleSlots,
        onCalendarReconnect: () => {
          if (mutateConnections) {
            mutateConnections().then(() => {
              mutateCalendars();
            });
          }
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 307,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 294,
      columnNumber: 7
    }, void 0), changeTimezoneModalVisible && /* @__PURE__ */ _jsxDEV(ChangeTimezoneModal, {
      onChange: (value) => {
        setSelectedTimezone(value);
        setSlotsData((prevSlotsData) => ({
          ...prevSlotsData,
          selectedTimezone: value
        }));
        setChangeTimezoneModalVisible(false);
      },
      onClose: () => setChangeTimezoneModalVisible(false),
      defaultTimezone: selectedTimezone
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 327,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 144,
    columnNumber: 5
  }, void 0);
};
_s(DayCalendar, "ZCa0Eu95MGgMdrFxTX9ZEsruAGU=", false, function() {
  return [useCalendar, useVisible, useGetI18nSpacetime, useSmartEmailModal, useTranslation, useTranslation, useGetI18nSpacetime];
});
_c = DayCalendar;
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
      lineNumber: 346,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      children: t("calendars")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 347,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 345,
    columnNumber: 5
  }, void 0);
};
_s2(CalendarSelectorAnchor, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c2 = CalendarSelectorAnchor;
var _c, _c2;
$RefreshReg$(_c, "DayCalendar");
$RefreshReg$(_c2, "CalendarSelectorAnchor");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
