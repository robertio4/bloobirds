import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-userTeamsFilter-userFilterByTeams.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/userTeamsFilter/userFilterByTeams.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/userTeamsFilter/userFilterByTeams.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CheckItem, MultiSelect, Skeleton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId, useActiveUserSettings, useUserTeams } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-userTeamsFilter-userTeamsFilter.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
var IdFilterTypes = /* @__PURE__ */ ((IdFilterTypes2) => {
  IdFilterTypes2["Team"] = "TEAM";
  IdFilterTypes2["User"] = "USER";
  return IdFilterTypes2;
})(IdFilterTypes || {});
var FilterActions = /* @__PURE__ */ ((FilterActions2) => {
  FilterActions2["Select"] = "SELECT";
  FilterActions2["Unselect"] = "UNSELECT";
  return FilterActions2;
})(FilterActions || {});
export const UserFilterByTeams = ({
  value,
  onChange,
  selectProps
}) => {
  _s();
  const activeUserId = useActiveUserId();
  const {
    settings
  } = useActiveUserSettings();
  const {
    teams,
    isLoadingTeams,
    getTeamsByManagerId,
    isManagerById,
    teamUsersAggregation
  } = useUserTeams();
  const teamIds = teams?.map((t2) => t2?.id);
  const [searchValue, setSearchValue] = useState("");
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "leftBar.userTeamsFilter"
  });
  const userRoles = settings?.user?.roles;
  const isAdminUser = userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const isManager = isManagerById?.(activeUserId);
  const managerTeams = getTeamsByManagerId?.(activeUserId);
  const teamsToDisplay = isAdminUser ? teams : isManager ? managerTeams : void 0;
  const lastFilterValue = useRef(value ?? []);
  const handleValueChange = (value2) => {
    if (value2?.length === teamUsersAggregation || value2?.length === 0) {
      lastFilterValue.current = value2;
      onChange(value2);
    } else {
      let change;
      value2.forEach((v) => {
        if (lastFilterValue?.current && !lastFilterValue.current.includes(v)) {
          const idType = teamIds?.includes(v) ? "TEAM" /* Team */ : "USER" /* User */;
          change = {
            action: "SELECT" /* Select */,
            id: v,
            type: idType
          };
        }
      });
      lastFilterValue.current.forEach((v) => {
        if (!value2?.includes(v)) {
          const idType = teamIds?.includes(v) ? "TEAM" /* Team */ : "USER" /* User */;
          change = {
            action: "UNSELECT" /* Unselect */,
            id: v,
            type: idType
          };
        }
      });
      if (change) {
        if (change.type === "USER" /* User */) {
          if (change.action === "SELECT" /* Select */) {
            const teamsMatching = teams.filter((team) => team.teamUsers.every((user) => value2?.includes(user.userId)));
            teamsMatching.forEach((teamId) => {
              if (teamId && !value2?.includes(teamId?.id)) {
                value2.push(teamId?.id);
              }
            });
          }
          if (change.action === "UNSELECT" /* Unselect */) {
            const teamsMatching = teams.filter((team) => team.teamUsers.some((user) => user.userId === change.id));
            teamsMatching.forEach((teamId) => {
              if (teamId) {
                const allSelected = teamId.teamUsers.every((user) => value2?.includes(user.userId));
                if (!allSelected && value2?.includes(teamId.id)) {
                  value2 = value2.filter((id) => id !== teamId.id);
                }
              }
            });
          }
        } else if (change.type === "TEAM" /* Team */) {
          if (change.action === "SELECT" /* Select */) {
            const teamsMatching = teams.filter((team) => team.id === change.id);
            teamsMatching.forEach((team) => {
              if (team) {
                value2.push(...team.teamUsers.map((user) => user.userId), change.id);
              }
            });
          }
          if (change.action === "UNSELECT" /* Unselect */) {
            const teamsMatching = teams.filter((team) => team.id === change.id);
            teamsMatching.forEach((team) => {
              if (team) {
                value2 = value2.filter((id) => !team.teamUsers.some((user) => user.userId === id));
                value2 = value2.filter((id) => id !== change.id);
              }
            });
          }
        }
      }
      const cleanedUserIds = [...new Set(value2)];
      lastFilterValue.current = cleanedUserIds;
      onChange(cleanedUserIds);
    }
  };
  const displayedUserIds = /* @__PURE__ */ new Set();
  if (!isAdminUser && !managerTeams) {
    return null;
  }
  return isLoadingTeams ? /* @__PURE__ */ _jsxDEV(Skeleton, {
    variant: "rect",
    height: 24,
    width: selectProps?.width ?? "100%"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 136,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(MultiSelect, {
    size: "small",
    variant: "filters",
    width: "100%",
    placeholder: t("userTeamsFilterPlaceholder"),
    value,
    onChange: (value2) => handleValueChange(value2),
    onSearch: (value2) => setSearchValue(value2),
    onClose: searchValue?.length > 0 ? () => setSearchValue("") : void 0,
    onBlur: searchValue?.length > 0 ? () => setSearchValue("") : void 0,
    onFocus: searchValue?.length > 0 ? () => setSearchValue("") : void 0,
    selectAllOption: true,
    allOptionLabel: t("allTeams"),
    autocomplete: true,
    sortByChecked: false,
    renderDisplayValue: (value2) => {
      if (value2?.length === teamUsersAggregation)
        return t("allTeams");
      if (value2?.length === 1 && value2[0] === activeUserId)
        return t("me");
      const selectedUsers = value2?.filter((v) => !teamIds?.includes(v))?.length;
      if (selectedUsers > 0)
        return t("teamsSelected", {
          count: selectedUsers
        });
      return "";
    },
    ...selectProps,
    children: teamsToDisplay?.map((team) => {
      const teamChecked = value?.includes(team?.id);
      return [/* @__PURE__ */ _jsxDEV(CheckItem, {
        value: team?.id,
        label: team?.name,
        icon: team.icon,
        iconColor: teamChecked ? "bloobirds" : "softPeanut",
        className: clsx(styles.itemWrapper, {
          [styles.itemChecked]: teamChecked
        }),
        children: team?.name
      }, team?.id, false, {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 11
      }, void 0), team?.teamUsers?.map((user) => {
        if (searchValue?.length > 0) {
          if (displayedUserIds.has(user.userId)) {
            return null;
          }
          displayedUserIds.add(user.userId);
        }
        return /* @__PURE__ */ _jsxDEV(CheckItem, {
          value: user?.userId,
          label: user?.userName,
          section: team?.name,
          children: user.userName
        }, team?.id + "-" + user?.userId, false, {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 15
        }, void 0);
      })];
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 138,
    columnNumber: 5
  }, void 0);
};
_s(UserFilterByTeams, "oIKwjkg2KXoNUsVEGi3ZxaZBQ/M=", false, function() {
  return [useActiveUserId, useActiveUserSettings, useUserTeams, useTranslation];
});
_c = UserFilterByTeams;
var _c;
$RefreshReg$(_c, "UserFilterByTeams");
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
