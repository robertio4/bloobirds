import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/notificationReminders/notificationReminders.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationReminders/notificationReminders.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationReminders/notificationReminders.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useLayoutEffect = __vite__cjsImport2_react["useLayoutEffect"];
import { useGetBobjectByTypeAndId, useNotifications } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { NotificationsCategory } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { ReportCallReminderCard } from "/src/content/components/notificationReminders/components/reportCallReminderCard.tsx.js";
import { ReportCallRemindersBulk } from "/src/content/components/notificationReminders/components/reportCallRemindersBulk.tsx.js";
import styles from "/src/content/components/notificationReminders/notificationReminders.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
var ReminderType = /* @__PURE__ */ ((ReminderType2) => {
  ReminderType2["REPORT_CALL"] = "REPORT_CALL";
  ReminderType2["REPORT_CALL_BULK"] = "REPORT_CALL_BULK";
  return ReminderType2;
})(ReminderType || {});
const RemindersContext = React.createContext(null);
export function useNotificationReminders() {
  _s();
  const context = React.useContext(RemindersContext);
  if (!context) {
    throw new Error(`useReminders must be used within a RemindersProvider`);
  }
  return context;
}
_s(useNotificationReminders, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function NotificationRemindersProvider(props) {
  _s2();
  const {
    markAsReadById,
    notifications,
    markAsReadByTypes,
    mutate: mutateNotifications
  } = useNotifications(NotificationsCategory.CALLS);
  const [reminder, setReminder] = React.useState(null);
  const [notificationsUpdated, setNotificationsUpdated] = React.useState(0);
  const onVisibilityChange = async () => {
    if (document.visibilityState === "visible") {
      await mutateNotifications?.();
      setNotificationsUpdated((notificationsUpdated2) => notificationsUpdated2 + 1);
    }
  };
  useEffect(() => {
    const filteredNotifications = notifications?.filter((n) => n.type === "REPORT_CALL" /* REPORT_CALL */ && !n.read);
    if (filteredNotifications.length === 1) {
      setReminder({
        type: "REPORT_CALL" /* REPORT_CALL */,
        activityId: `${filteredNotifications[0].accountId}/Activity/${filteredNotifications[0].objectId}`,
        notificationId: filteredNotifications[0].id
      });
    }
    if (filteredNotifications.length > 1) {
      setReminder({
        type: "REPORT_CALL_BULK" /* REPORT_CALL_BULK */,
        notifications: filteredNotifications
      });
    }
  }, [notificationsUpdated]);
  useLayoutEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);
  function dismissReminder() {
    if (reminder.type === "REPORT_CALL" /* REPORT_CALL */) {
      markAsReadById?.(reminder.notificationId);
      setReminder(null);
    }
    if (reminder.type === "REPORT_CALL_BULK" /* REPORT_CALL_BULK */) {
      markAsReadByTypes?.(["REPORT_CALL" /* REPORT_CALL */]);
      setReminder(null);
    }
  }
  const value = {
    reminder,
    dismissReminder
  };
  return /* @__PURE__ */ _jsxDEV(RemindersContext.Provider, {
    value,
    ...props
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 89,
    columnNumber: 10
  }, this);
}
_s2(NotificationRemindersProvider, "Q0oaFL9mf+vBShJaJfwKzJvvwSo=", false, function() {
  return [useNotifications];
});
_c = NotificationRemindersProvider;
function ReportCallReminderWrapper({
  reminder
}) {
  _s3();
  const {
    bobject: activity
  } = useGetBobjectByTypeAndId(reminder.activityId, true);
  if (!activity) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV(ReportCallReminderCard, {
    activity
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 99,
    columnNumber: 10
  }, this);
}
_s3(ReportCallReminderWrapper, "4n95smXvMYKdgxfQDpuqi4vv3ik=", false, function() {
  return [useGetBobjectByTypeAndId];
});
_c2 = ReportCallReminderWrapper;
function getReminder(reminder) {
  switch (reminder.type) {
    case "REPORT_CALL" /* REPORT_CALL */:
      return /* @__PURE__ */ _jsxDEV(ReportCallReminderWrapper, {
        reminder
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 14
      }, this);
    case "REPORT_CALL_BULK" /* REPORT_CALL_BULK */:
      return /* @__PURE__ */ _jsxDEV(ReportCallRemindersBulk, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 14
      }, this);
    default:
      return null;
  }
}
export function RemindersWrapped() {
  _s4();
  const {
    reminder
  } = useNotificationReminders();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.remindersContainer,
    children: reminder && getReminder(reminder)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 115,
    columnNumber: 10
  }, this);
}
_s4(RemindersWrapped, "ZsC0nbHJkyhF8y3CrEaNMNwssKo=", false, function() {
  return [useNotificationReminders];
});
_c3 = RemindersWrapped;
export function NotificationReminders() {
  return /* @__PURE__ */ _jsxDEV(NotificationRemindersProvider, {
    children: /* @__PURE__ */ _jsxDEV(RemindersWrapped, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 120,
    columnNumber: 5
  }, this);
}
_c4 = NotificationReminders;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "NotificationRemindersProvider");
$RefreshReg$(_c2, "ReportCallReminderWrapper");
$RefreshReg$(_c3, "RemindersWrapped");
$RefreshReg$(_c4, "NotificationReminders");
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
