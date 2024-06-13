import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendar-calendar.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/calendar/calendar.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/calendar/calendar.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Avatar, CompoundIcon, Dropdown, Icon, IconButton, Label, Text, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { getUserTimeZone, isToday, toTitleCase } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import { useEventPlaceholder, useMouseEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useEventPlaceholder.ts.js";
import { CalendarNotConnected } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarNotConnected-calendarNotConnected.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendar-calendar.module.css.js";
import { useMouseDelta } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendar-useMouseDelta.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const randomColors = ["bloobirds", "softPeanut", "verySoftTangerine", "softTangerine", "verySoftTomato", "softTomato", "softBanana", "verySoftBanana", "verySoftMelon", "softMelon", "lightBloobirds", "verySoftBloobirds", "verySoftPurple", "lightPurple", "verySoftPeanut", "lightPeanut", "lighterGray", "gray"];
function getPxPaddingSinceMidnight(date, selectedTimezone) {
  if (!selectedTimezone) {
    const dateToUse = spacetime(date || new Date());
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  } else {
    const dateToUse = spacetime(date || new Date(), selectedTimezone);
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  }
}
function getTimeFromOffset(offset, day) {
  const correctedOffset = Math.round(offset / 10) * 10;
  return spacetime(day).add(correctedOffset * (60 / 40), "minute").format("iso-utc");
}
function getDurationFromOffset(offset) {
  const correctedOffset = Math.max(Math.round(Math.abs(offset) / 10) * 10, 10) * (60 / 40);
  return offset > 0 ? correctedOffset : -correctedOffset;
}
export function InviteeCard({
  invitee,
  handleRemoveInvitee,
  readOnly,
  width,
  shouldShowStatus
}) {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.inviteeCard"
  });
  const [randomColor] = useState(randomColors[Math.floor(Math.random() * (randomColors.length + 1))]);
  function getColorFromType(type) {
    switch (type) {
      case "Organizer":
        return "purple";
      case "AE":
      case "User":
        return "grape";
      case "Company":
        return "extraMeeting";
      case "Lead":
        return "extraMeeting";
      case "Coworker":
        return "softPeanut";
      default:
        return "random";
    }
  }
  function getStatusAvatar(status) {
    switch (status) {
      case "yes":
        return {
          bagdeColor: "lightestCall",
          icon: "check",
          iconColor: "extraCall"
        };
      case "no":
        return {
          bagdeColor: "lightestMeeting",
          icon: "cross",
          iconColor: "extraMeeting"
        };
      default:
        return {
          bagdeColor: "verySoftPeanut",
          icon: "arrowRight",
          iconColor: "softPeanut"
        };
    }
  }
  const calculatedColor = getColorFromType(invitee?.type);
  const colorToUse = calculatedColor === "random" ? randomColor : calculatedColor;
  const statusAvatar = getStatusAvatar(invitee?.status);
  const parentRef = useRef();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: (invitee?.email || invitee?.name) && /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles._invitee_card,
        style: {
          width: width || null
        },
        children: [/* @__PURE__ */ _jsxDEV(CompoundIcon, {
          parent: /* @__PURE__ */ _jsxDEV(Avatar, {
            size: "tiny",
            color: colorToUse,
            ref: parentRef,
            children: invitee?.email?.slice(0, 2).toUpperCase() || invitee?.name?.slice(0, 2).toUpperCase()
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 179,
            columnNumber: 17
          }, this),
          parentRef,
          children: shouldShowStatus && /* @__PURE__ */ _jsxDEV(Avatar, {
            size: "supertiny",
            color: statusAvatar.bagdeColor,
            children: /* @__PURE__ */ _jsxDEV(Icon, {
              name: statusAvatar.icon,
              color: statusAvatar.iconColor,
              size: 10
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 188,
              columnNumber: 19
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 187,
            columnNumber: 17
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 177,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._invitee_info,
          children: [invitee?.name && /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            children: invitee?.name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 193,
            columnNumber: 33
          }, this), invitee?.type === "Lead" && !invitee?.email && /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "tomato",
            decoration: "underscore",
            children: t("leadNoEmail")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 195,
            columnNumber: 17
          }, this), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: invitee?.name ? "softPeanut" : "peanut",
            decoration: "underscore",
            children: invitee?.email
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 199,
            columnNumber: 15
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 192,
          columnNumber: 13
        }, this), invitee?.type && /* @__PURE__ */ _jsxDEV(Label, {
          size: "small",
          uppercase: false,
          children: t(`${invitee?.type?.toLowerCase()}`)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 208,
          columnNumber: 15
        }, this), !readOnly && /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "cross",
          size: 24,
          color: "softPeanut",
          onClick: () => handleRemoveInvitee(invitee?.email)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 213,
          columnNumber: 15
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 176,
        columnNumber: 11
      }, this)
    }, void 0, false)
  }, void 0, false);
}
_s(InviteeCard, "eOMlqK5bHNqZdM1hiEmVGrTCHyw=", false, function() {
  return [useTranslation];
});
_c = InviteeCard;
const weekArray = [0, 1, 2, 3, 4, 5, 6];
const dayArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const CalendarEvent = _s2(React.memo(_c2 = _s2(({
  event,
  selectedTimezone
}) => {
  _s2();
  const {
    ref,
    visible,
    setVisible
  } = useVisible();
  const startDatetimeSpaceTime = spacetime(event.startTime).goto(selectedTimezone || getUserTimeZone());
  const calculatePosition = getPxPaddingSinceMidnight(startDatetimeSpaceTime);
  const height = event.duration * (40 / 60) - 1;
  const width = event.collisions > 0 ? `calc(${95 / (event.collisions + 1) + "%"} + ${event.collisions * 8}px)` : "95%";
  const topPosition = calculatePosition - height / 2 + "px";
  const left = `calc(${event.collisionNumber / (event.collisions + 1) * 100 + "%"} - ${event.collisionNumber > 0 ? event.collisionNumber * 8 : 0}px)`;
  const endTime = spacetime(event.endTime).goto(selectedTimezone || getUserTimeZone());
  const cellClassName = clsx(styles.calendar_cell, {
    [styles.calendar_cell_small]: height < 29,
    [styles.calendar_cell_45]: height >= 29 && height < 39,
    [styles.calendar_cell_placeholder]: event.type === "placeholder"
  });
  const participantsWithOrganizer = event?.participants?.map((participant) => {
    const ownerEmail = event?.owner?.replaceAll(/[<>]/gi, "")?.trim();
    const isOwner = participant?.email === ownerEmail;
    return isOwner ? {
      ...participant,
      type: "Organizer"
    } : participant;
  });
  const orderedParticipants = participantsWithOrganizer?.reduce((acc, invitee) => {
    if (invitee?.type === "Organizer") {
      return [invitee, ...acc];
    }
    return [...acc, invitee];
  }, []);
  const getColors = () => {
    if (event?.type === "bloobirds") {
      return {
        backgroundColor: "verySoftTomato",
        barColor: "tomato"
      };
    } else if (event?.type === "placeholder") {
      return {
        backgroundColor: "white",
        barColor: "bloobirds"
      };
    } else if (event?.type === "nylas") {
      return {
        backgroundColor: event?.backgroundColor || "verySoftBloobirds",
        barColor: event?.barColor || "bloobirds"
      };
    }
  };
  const zIndex = event?.type === "placeholder" ? 10 : event.collisionNumber;
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    width: 448,
    position: "left",
    fallbackPositions: ["left"],
    arrow: false,
    customStyles: {
      top: topPosition,
      right: "10px"
    },
    visible,
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      className: cellClassName,
      style: {
        top: calculatePosition + "px",
        height,
        width,
        left,
        backgroundColor: `var(--${getColors()?.backgroundColor})`,
        borderLeft: `2px solid var(--${getColors()?.barColor})`,
        zIndex: visible ? 10 : zIndex,
        boxShadow: visible ? "0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%)" : null,
        alignItems: "start"
      },
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        return event.type !== "placeholder" && setVisible(true);
      },
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.calendar_cell_title,
        children: event.title || "Untitled meeting"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 351,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.calendar_cell_time,
        children: startDatetimeSpaceTime.format("time")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 352,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 329,
      columnNumber: 11
    }, void 0),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.event_details_container,
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.event_details_header,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.event_details_title_name,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "calendar",
            color: "tomato",
            size: 32,
            className: styles.event_details_icon
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 365,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            className: styles.event_details_title_text,
            children: event?.title || "Untitled meeting"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 371,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 364,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "cross",
          size: 16,
          onClick: () => setVisible(false)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 375,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 363,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.event_details_title,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          children: [toTitleCase(startDatetimeSpaceTime.dayName()), ", ", startDatetimeSpaceTime.date(), " ", toTitleCase(startDatetimeSpaceTime.monthName()), " \xB7", " ", startDatetimeSpaceTime.format("time"), " - ", endTime.format("time")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 378,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 377,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.event_details_body,
        children: [/* @__PURE__ */ _jsxDEV("span", {
          className: styles.attendees_details,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "people",
            color: "softPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 386,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            className: styles.attendees_title,
            children: [event.participants?.length, " attendees"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 387,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 385,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.attendees_list_container,
          children: orderedParticipants?.map((participant) => /* @__PURE__ */ _jsxDEV(InviteeCard, {
            invitee: participant,
            readOnly: true,
            shouldShowStatus: true
          }, participant?.email, false, {
            fileName: _jsxFileName,
            lineNumber: 394,
            columnNumber: 17
          }, void 0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 391,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 384,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 403,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 356,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 317,
    columnNumber: 7
  }, void 0);
}, "VBnK8emvBl6TWQ0lbIxwF1YEMM4=", false, function() {
  return [useVisible];
})), "VBnK8emvBl6TWQ0lbIxwF1YEMM4=", false, function() {
  return [useVisible];
});
_c3 = CalendarEvent;
function generateWeek(day) {
  const firstDay = spacetime(day).startOf("week");
  return weekArray.map((i) => firstDay.add(i, "day").format("iso-date"));
}
function CalendarColumn({
  day,
  mode,
  events,
  hourMarkerRef,
  selectedTimezone
}) {
  _s3();
  const mouseDelta = useMouseDelta();
  const {
    setMeetingDuration
  } = useCalendar();
  const {
    eventPlaceholder,
    onCalendarPlaceholder
  } = useEventPlaceholder(setMeetingDuration);
  useEffect(() => {
    if (mouseDelta.delta !== 0) {
      let placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
      let placeholderDuration = getDurationFromOffset(mouseDelta.delta);
      if (placeholderDuration < 0) {
        placeholderDatetime = spacetime(placeholderDatetime).subtract(-placeholderDuration, "minute").format("iso-utc");
        placeholderDuration = -placeholderDuration;
      }
      if (onCalendarPlaceholder && typeof onCalendarPlaceholder === "function") {
        onCalendarPlaceholder(placeholderDatetime, placeholderDuration);
      }
    }
  }, [mouseDelta?.delta, mouseDelta?.initialPosition]);
  const quickPlaceHolderCreation = () => {
    const placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
    const initialDateDifferent = spacetime(eventPlaceholder?.startTime).format("iso-utc") !== spacetime(placeholderDatetime).format("iso-utc");
    if (initialDateDifferent) {
      const placeholderDatetime2 = getTimeFromOffset(mouseDelta.initialPosition, day);
      onCalendarPlaceholder(placeholderDatetime2, 60);
    }
  };
  const currentTimePadding = getPxPaddingSinceMidnight(null, selectedTimezone);
  const dayNumber = spacetime(day).format("day-number");
  const isWeekend = dayNumber === "6" || dayNumber === "";
  const columnClasses = clsx(styles.calendar_gridcell, {
    [styles.calendar_gridcell_weekend]: isWeekend
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: columnClasses,
    ref: mouseDelta.ref,
    onClick: quickPlaceHolderCreation,
    children: [isToday(day, selectedTimezone || getUserTimeZone()) && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.calendar_now_marker,
      ref: hourMarkerRef,
      style: {
        top: currentTimePadding + "px"
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 474,
      columnNumber: 9
    }, this), events[day]?.map((event) => /* @__PURE__ */ _jsxDEV(CalendarEvent, {
      event,
      selectedTimezone
    }, event.id + event?.calendarId, false, {
      fileName: _jsxFileName,
      lineNumber: 481,
      columnNumber: 9
    }, this)), eventPlaceholder?.day === day && mode === "week" && /* @__PURE__ */ _jsxDEV(CalendarEvent, {
      event: eventPlaceholder,
      selectedTimezone
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 490,
      columnNumber: 9
    }, this)]
  }, `column-${day}`, true, {
    fileName: _jsxFileName,
    lineNumber: 467,
    columnNumber: 5
  }, this);
}
_s3(CalendarColumn, "q3poNm6LSfNO2mRuQTsRMGW1uDc=", false, function() {
  return [useMouseDelta, useCalendar, useEventPlaceholder];
});
_c4 = CalendarColumn;
export const Calendar = ({
  day,
  mode = "week",
  events,
  notConnected = false,
  onCalendarReconnect,
  selectedTimezone
}) => {
  _s4();
  const hourMarkerRef = useRef(null);
  const days = mode === "week" ? generateWeek(day) : [day];
  const defaultUserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const {
    setIsMouseDown
  } = useMouseEvents();
  const {
    setEventTypesSelected
  } = useCalendar();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.calendar"
  });
  useEffect(() => {
    hourMarkerRef?.current?.scrollIntoView({
      block: "center"
    });
  }, [day]);
  useEffect(() => {
    if (notConnected)
      setEventTypesSelected("bloobirds");
  }, [notConnected]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.calendar,
    onMouseDown: () => setIsMouseDown(true),
    onMouseUp: () => setIsMouseDown(false),
    children: notConnected ? /* @__PURE__ */ _jsxDEV(CalendarNotConnected, {
      mode,
      onCalendarReconnect
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 535,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [mode !== "day" && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.calendar_column_headers,
        children: days.map((day2) => {
          const today = isToday(spacetime(day2).toNativeDate(), selectedTimezone || getUserTimeZone());
          const nameClasses = clsx(styles.calendar_column_header_name, {
            [styles.calendar_column_header_name_today]: today
          });
          const dateClasses = clsx(styles.calendar_column_header_date, {
            [styles.calendar_column_header_date_today]: today
          });
          return /* @__PURE__ */ _jsxDEV("div", {
            className: styles.calendar_column_header,
            children: [/* @__PURE__ */ _jsxDEV("span", {
              className: nameClasses,
              children: spacetime(day2).format("day-short")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 553,
              columnNumber: 21
            }, void 0), /* @__PURE__ */ _jsxDEV("span", {
              className: dateClasses,
              children: spacetime(day2).format("date")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 554,
              columnNumber: 21
            }, void 0)]
          }, `header-${day2}`, true, {
            fileName: _jsxFileName,
            lineNumber: 552,
            columnNumber: 19
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 539,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.calendar_container,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.calendar_timestrings_container,
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.calendar_timestrings,
            children: dayArray.map((hour) => /* @__PURE__ */ _jsxDEV("div", {
              className: styles.calendar_timestring_container,
              children: /* @__PURE__ */ _jsxDEV("div", {
                className: styles.calendar_timestring,
                children: [hour.toString().padStart(2, "0"), ":00", " ", defaultUserTimezone !== selectedTimezone && /* @__PURE__ */ _jsxDEV(Tooltip, {
                  title: t("yourTimezone"),
                  position: "top",
                  children: /* @__PURE__ */ _jsxDEV(Text, {
                    size: "xxs",
                    align: "right",
                    children: ["(", spacetime().goto(selectedTimezone).hour(hour).goto(defaultUserTimezone).hour(), ":00)"]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 569,
                    columnNumber: 27
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 568,
                  columnNumber: 25
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 565,
                columnNumber: 21
              }, void 0)
            }, `timestring_${hour}`, false, {
              fileName: _jsxFileName,
              lineNumber: 564,
              columnNumber: 19
            }, void 0))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 562,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 561,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.calendar_grid_container,
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.calendar_grid,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles.calendar_grid_tiles,
              children: dayArray.map((h) => /* @__PURE__ */ _jsxDEV("div", {
                className: styles.calendar_grid_tile
              }, `tile_${h}`, false, {
                fileName: _jsxFileName,
                lineNumber: 590,
                columnNumber: 21
              }, void 0))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 588,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.calendar_gridcell_container,
              children: days.map((day2) => {
                return /* @__PURE__ */ _jsxDEV(CalendarColumn, {
                  mode,
                  day: day2,
                  events,
                  hourMarkerRef,
                  selectedTimezone
                }, `column-${day2}`, false, {
                  fileName: _jsxFileName,
                  lineNumber: 596,
                  columnNumber: 23
                }, void 0);
              })
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 593,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 587,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 586,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 560,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 529,
    columnNumber: 5
  }, void 0);
};
_s4(Calendar, "2sviCsTiJ81zBWDAQK0FclOzlMQ=", false, function() {
  return [useMouseEvents, useCalendar, useTranslation];
});
_c5 = Calendar;
var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "InviteeCard");
$RefreshReg$(_c2, "CalendarEvent$React.memo");
$RefreshReg$(_c3, "CalendarEvent");
$RefreshReg$(_c4, "CalendarColumn");
$RefreshReg$(_c5, "Calendar");
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
