import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarNotConnected-calendarNotConnected.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/calendarNotConnected/calendarNotConnected.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/calendarNotConnected/calendarNotConnected.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { Button, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { fetchAndOpenNylasUrl } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { Calendar, DayCalendarBackground, Outlook } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-assets-png.ts.js";
import { GoogleSignIn } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarNotConnected-BrandedButtons-GoogleSignIn.tsx.js";
import { MicrosoftSignIn } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarNotConnected-BrandedButtons-MicrosoftSignIn.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarNotConnected-calendarNotConnected.module.css.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CalendarNotConnected = ({
  mode,
  onCalendarReconnect
}) => {
  _s();
  const [signInClicked, setSignInClicked] = useState(false);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.calendar.calendarNotConnected"
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: mode === "week" ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.calendar_not_connected,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xxl",
        align: "center",
        children: t("syncBloobirds")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.calendar_buttons,
        children: [/* @__PURE__ */ _jsxDEV(GoogleSignIn, {
          onClick: () => {
            fetchAndOpenNylasUrl();
            setSignInClicked(true);
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(MicrosoftSignIn, {
          onClick: () => {
            fetchAndOpenNylasUrl();
            setSignInClicked(true);
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 11
      }, void 0), signInClicked && /* @__PURE__ */ _jsxDEV("div", {
        onClick: () => {
          if (onCalendarReconnect) {
            onCalendarReconnect();
          }
        },
        className: styles.link,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          color: "bloobirds",
          decoration: "underline",
          size: "s",
          children: t("clickAndRefresh")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.day_calendar_not_connected_container,
      children: [/* @__PURE__ */ _jsxDEV("img", {
        src: DayCalendarBackground,
        alt: "day_calendar_background",
        className: styles._background_image
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.day_calendar_not_connected,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xl",
          align: "center",
          weight: "bold",
          color: "peanut",
          children: t("syncBloobirds")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.day_calendar_buttons,
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            onClick: () => {
              fetchAndOpenNylasUrl();
              setSignInClicked(true);
            },
            uppercase: true,
            children: [/* @__PURE__ */ _jsxDEV("img", {
              alt: "calendar_logo",
              src: Calendar,
              height: 18,
              width: 18,
              style: {
                marginRight: 8
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 77,
              columnNumber: 17
            }, void 0), t("connectGoogle")]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 70,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            onClick: () => {
              fetchAndOpenNylasUrl();
              setSignInClicked(true);
            },
            variant: "alternative",
            uppercase: true,
            children: [/* @__PURE__ */ _jsxDEV("img", {
              alt: "outlook_logo",
              src: Outlook,
              height: 18,
              width: 18,
              style: {
                marginRight: 8
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 94,
              columnNumber: 17
            }, void 0), t("connectOutlook")]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 86,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(CalendarNotConnected, "LKpdrnNtmREP4RyvYGSqUN8bg6k=", false, function() {
  return [useTranslation];
});
_c = CalendarNotConnected;
var _c;
$RefreshReg$(_c, "CalendarNotConnected");
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
