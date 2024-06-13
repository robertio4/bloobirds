import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/notificationReminders/components/reportCallRemindersBulk.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationReminders/components/reportCallRemindersBulk.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationReminders/components/reportCallRemindersBulk.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Card, CardBody, CardHeader, CardLeft, IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { ACTIVITY_DIRECTION, MessagesEvents, SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import CardIcon from "/src/content/components/cardIcon/cardIcon.tsx.js";
import { useNotificationReminders } from "/src/content/components/notificationReminders/notificationReminders.tsx.js";
import styles from "/src/content/components/notificationReminders/notificationReminders.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function ReportCallRemindersBulk() {
  _s();
  const {
    t
  } = useTranslation();
  const {
    dismissReminder,
    reminder
  } = useNotificationReminders();
  const openInboxTab = () => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.OpenLeftBarTab, {
      detail: {
        tab: SalesforceTabs.INBOX
      }
    }));
    dismissReminder();
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.reportCallReminder,
    children: /* @__PURE__ */ _jsxDEV(Card, {
      expand: true,
      size: "small",
      onClick: () => null,
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        children: [/* @__PURE__ */ _jsxDEV(CardLeft, {
          children: /* @__PURE__ */ _jsxDEV(CardIcon, {
            name: "phone",
            color: "melon",
            direction: ACTIVITY_DIRECTION.INCOMING,
            size: "xxs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 36,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.closeCard,
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            color: "softPeanut",
            onClick: () => {
              dismissReminder();
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 44,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(CardBody, {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles._callCard_body__wrap,
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              weight: "bold",
              className: styles._callCard_body__text,
              children: t("reminders.reportCallBulk", {
                count: reminder?.notifications?.length || 0
              })
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 54,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.buttons,
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          onClick: dismissReminder,
          size: "small",
          variant: "clear",
          color: "peanut",
          iconLeft: "cross",
          expand: true,
          uppercase: false,
          className: styles.reminderButton,
          children: t("common.dismiss")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Button, {
          onClick: openInboxTab,
          size: "small",
          variant: "primary",
          iconLeft: "thumbsUp",
          expand: true,
          uppercase: false,
          className: styles.reminderButton,
          children: t("reminders.reportCallBulkButton")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 5
  }, this);
}
_s(ReportCallRemindersBulk, "ExuuWZgQv+M8a7teqbQtmKCdBVg=", false, function() {
  return [useTranslation, useNotificationReminders];
});
_c = ReportCallRemindersBulk;
var _c;
$RefreshReg$(_c, "ReportCallRemindersBulk");
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
