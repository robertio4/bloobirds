import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-bloobirdsCalendarsSelector-bloobirdsCalendarsSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/bloobirdsCalendarsSelector/bloobirdsCalendarsSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/bloobirdsCalendarsSelector/bloobirdsCalendarsSelector.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Checkbox, Dropdown, Icon, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useFullSalesEnabled, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarsSelector-calendarsSelector.module.css.js";
import CalendarContext from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-context.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const BloobirdsCalendarsSelector = ({
  anchor
}) => {
  _s();
  const {
    accountId,
    userId,
    usersSelected,
    setUsersSelected,
    accountExecutivesSelected,
    setAccountExecutivesSelected
  } = useCalendar();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.bloobirdsCalendarSelector"
  });
  const {
    ref,
    visible,
    setVisible
  } = useVisible();
  const {
    dataModel
  } = useContext(CalendarContext);
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const userResponse = useUserSearch();
  const users = userResponse?.users;
  const sortedUsers = users?.reduce((acc, user) => {
    if (user?.id === userId) {
      return [user, ...acc];
    }
    return [...acc, user];
  }, []);
  const activityAccountExecutiveField = dataModel?.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE);
  const totalCalendarsSelected = [...accountExecutivesSelected, ...usersSelected];
  const accountExecutivePicklistValues = activityAccountExecutiveField?.filter((ae) => ae?.enabled);
  const handleSelectUser = (user, value) => {
    if (value) {
      setUsersSelected((curr) => [...curr, user?.id]);
    } else {
      setUsersSelected(usersSelected?.filter((id) => id !== user?.id));
    }
  };
  const handleSelectAccountExecutive = (ae, value) => {
    if (value) {
      setAccountExecutivesSelected((curr) => [...curr, ae?.id]);
    } else {
      setAccountExecutivesSelected(accountExecutivesSelected?.filter((id) => id !== ae?.id));
    }
  };
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    anchor: anchor ? anchor(visible, setVisible) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles._select_anchor,
      onClick: () => setVisible(true),
      children: [/* @__PURE__ */ _jsxDEV("span", {
        style: {
          display: "flex"
        },
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
          color: "peanut",
          className: styles._select_text,
          children: [totalCalendarsSelected?.length, " ", t("calendar").toLowerCase(), totalCalendarsSelected?.length === 1 ? "" : "s", " ", t("selected").toLowerCase()]
        }, void 0, true, {
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
          marginRight: "4px"
        },
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "chevronDown",
          size: 12,
          color: "softPeanut"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 11
    }, void 0),
    visible,
    ref,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._calendars_container,
      children: [users?.length > 0 && /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          color: "peanut",
          children: t("users")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._calendars_list,
          children: sortedUsers?.map((user) => {
            const isSelfUser = userId === user?.id;
            return /* @__PURE__ */ _jsxDEV(Checkbox, {
              size: "small",
              disabled: isSelfUser,
              checked: !!usersSelected?.find((id) => id === user?.id),
              onClick: (v) => handleSelectUser(user, v),
              children: [user?.name, " ", isSelfUser && `(${t("you")})`]
            }, user?.id, true, {
              fileName: _jsxFileName,
              lineNumber: 97,
              columnNumber: 19
            }, void 0);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 13
        }, void 0)]
      }, void 0, true), !isFullSalesEnabled && accountExecutivePicklistValues?.length > 0 && /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          color: "peanut",
          children: t("accountExecutives")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 113,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._calendars_list,
          children: accountExecutivePicklistValues?.map((ae) => /* @__PURE__ */ _jsxDEV(Checkbox, {
            size: "small",
            checked: !!accountExecutivesSelected?.find((id) => id === ae?.id),
            onClick: (v) => handleSelectAccountExecutive(ae, v),
            children: ae?.value
          }, ae?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 118,
            columnNumber: 17
          }, void 0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 116,
          columnNumber: 13
        }, void 0)]
      }, void 0, true)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 63,
    columnNumber: 5
  }, void 0);
};
_s(BloobirdsCalendarsSelector, "KS4tTLuMOrBDJqgzq/dqb7iq7D4=", false, function() {
  return [useCalendar, useTranslation, useVisible, useFullSalesEnabled, useUserSearch];
});
_c = BloobirdsCalendarsSelector;
var _c;
$RefreshReg$(_c, "BloobirdsCalendarsSelector");
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
