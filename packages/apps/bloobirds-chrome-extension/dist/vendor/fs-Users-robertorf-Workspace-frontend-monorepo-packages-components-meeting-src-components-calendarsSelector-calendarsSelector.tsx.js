import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarsSelector-calendarsSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/calendarsSelector/calendarsSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/calendarsSelector/calendarsSelector.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Checkbox, Dropdown, Icon, Item, Select, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarsSelector-calendarsSelector.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CalendarsSelector = ({
  connections,
  disabled,
  anchor
}) => {
  _s();
  const {
    visible,
    setVisible
  } = useVisible(false);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.calendarSelector"
  });
  const {
    calendarSelected,
    setSelectedCalendar,
    calendarsAvailable,
    accountSelected,
    setAccountSelected,
    calendarsWithColor
  } = useCalendar();
  const myCalendars = calendarsAvailable?.data?.filter((calendar) => calendar?.primary) || [];
  const otherCalendars = calendarsAvailable?.data?.filter((calendar) => !calendar?.primary) || [];
  const openLearnHow = () => {
    if (connections?.list[0]?.provider === "gmail") {
      window.open("https://www.youtube.com/watch?v=Atgi1wxj8m4", "_blank");
    } else if (connections?.list[0]?.provider === "eas") {
      window.open("https://support.microsoft.com/en-us/office/share-your-calendar-in-outlook-2fcf4f4f-8d46-4d8b-ae79-5d94549e531b", "_blank");
    } else {
      window.open("https://www.youtube.com/watch?v=Atgi1wxj8m4", "_blank");
    }
  };
  const handleClickCalendar = (value, id) => {
    value ? setSelectedCalendar((prevSelected) => [...prevSelected, id]) : setSelectedCalendar((prevSelected) => prevSelected?.filter((c) => c !== id));
  };
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    anchor: anchor ? anchor(visible, setVisible) : /* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles._select_anchor, {
        [styles._select_disabled]: disabled
      }),
      onClick: () => disabled ? null : setVisible(!visible),
      children: [/* @__PURE__ */ _jsxDEV("span", {
        className: styles._email_selector,
        children: [/* @__PURE__ */ _jsxDEV("span", {
          className: styles._icon_container,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "calendar",
            size: 12,
            color: "softPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 71,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 15
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: disabled ? "softPeanut" : "peanut",
          className: styles._select_text,
          children: disabled ? t("noCalendarsSelected") : calendarSelected?.length > 0 ? calendarSelected?.length > 1 ? calendarSelected?.length + " " + t("calendarsSelected").toLowerCase() : calendarsAvailable?.data?.find((c) => c?.id === calendarSelected[0])?.name : t("noCalendarsSelected")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 73,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        style: {
          marginRight: "4px",
          display: "flex"
        },
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "chevronDown",
          size: 12,
          color: "softPeanut"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 11
    }, void 0),
    visible,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._calendars_container,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        children: [t("calendarAccount"), ":"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._accounts_selector,
        children: /* @__PURE__ */ _jsxDEV(Select, {
          size: "small",
          value: accountSelected,
          onChange: setAccountSelected,
          borderless: false,
          width: "300px",
          children: connections?.list?.map((connection) => /* @__PURE__ */ _jsxDEV(Item, {
            value: connection?.id,
            children: connection?.email
          }, connection?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 106,
            columnNumber: 15
          }, void 0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 9
      }, void 0), myCalendars?.length > 0 && /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          color: "peanut",
          children: t("myCalendars")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._calendars_list,
          children: myCalendars?.map((calendar) => /* @__PURE__ */ _jsxDEV(Checkbox, {
            size: "small",
            checked: !!calendarSelected?.find((c) => c === calendar?.id),
            onClick: (v) => handleClickCalendar(v, calendar?.id),
            color: calendarsWithColor?.find((c) => c.calendarId === calendar?.id)?.color,
            children: calendar?.name
          }, calendar?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 17
          }, void 0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 117,
          columnNumber: 13
        }, void 0)]
      }, void 0, true), otherCalendars?.length > 0 && /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          color: "peanut",
          children: t("otherCalendars")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._calendars_list,
          children: otherCalendars?.map((calendar) => /* @__PURE__ */ _jsxDEV(Checkbox, {
            size: "small",
            checked: !!calendarSelected?.find((c) => c === calendar?.id),
            onClick: (v) => handleClickCalendar(v, calendar?.id),
            color: calendarsWithColor?.find((c) => c.calendarId === calendar?.id)?.color,
            children: calendar?.name
          }, calendar?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 139,
            columnNumber: 17
          }, void 0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 137,
          columnNumber: 13
        }, void 0)]
      }, void 0, true), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._help_container,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "peanut",
          children: t("infoText.missingCalendar")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 153,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          children: [t("infoText.learnHere"), " ", /* @__PURE__ */ _jsxDEV("a", {
            style: {
              color: "var(--bloobirds)",
              cursor: "pointer"
            },
            onClick: openLearnHow,
            children: t("infoText.howToAsk")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 158,
            columnNumber: 13
          }, void 0), " ", t("infoText.toSeeIt")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 156,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 60,
    columnNumber: 5
  }, void 0);
};
_s(CalendarsSelector, "4NNN0LKakZU2zz7DVl8KP65tTP4=", false, function() {
  return [useVisible, useTranslation, useCalendar];
});
_c = CalendarsSelector;
var _c;
$RefreshReg$(_c, "CalendarsSelector");
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
