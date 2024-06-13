import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-calendarTab-calendarTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/calendarTab/calendarTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/calendarTab/calendarTab.tsx", _s = $RefreshSig$();
import { SmartEmailTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import { DayCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-dayCalendar-dayCalendar.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CalendarTab = ({
  tabProps
}) => {
  _s();
  const {
    bodyEditor
  } = tabProps;
  const {
    setSelectedTab,
    slotsData,
    setSlotsData,
    id,
    user,
    accountId,
    connections,
    mutateConnections,
    hasTimeSlotsEnabled
  } = useSmartEmailModal();
  return /* @__PURE__ */ _jsxDEV(DayCalendar, {
    bodyEditor,
    hasCalendarSlotsEnabled: hasTimeSlotsEnabled,
    slotsData,
    setSlotsData,
    id,
    accountId,
    userId: user?.id,
    connections,
    mutateConnections,
    handleSlotClick: () => {
      setSelectedTab(SmartEmailTab.CALENDAR);
      setSlotsData((prevSlotsData) => {
        return {
          ...prevSlotsData,
          calendarSlotsVisible: true
        };
      });
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
_s(CalendarTab, "3sENjTUgSa4JTg7DelosUYFw6Fk=", false, function() {
  return [useSmartEmailModal];
});
_c = CalendarTab;
var _c;
$RefreshReg$(_c, "CalendarTab");
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
