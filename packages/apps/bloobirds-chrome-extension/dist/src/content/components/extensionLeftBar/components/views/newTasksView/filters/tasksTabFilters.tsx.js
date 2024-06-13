import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/filters/tasksTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/filters/tasksTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/filters/tasksTabFilters.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$(), _s6 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { TimezoneRangeFilter, UserFilterByTeams } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-index.tsx.js";
import { CheckItem, Icon, MultiSelect, RelativeDatePicker, Section } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useActiveUserSettings, useIsB2CAccount, useManageUserTeamsEnabled, useTimezonesEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { AnimatePresence, motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import { useTaskFeedContext } from "/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx.js";
import { CustomChipGroup, Chip } from "/src/content/components/extensionLeftBar/components/views/newTasksView/filters/components/customChipGroup.tsx.js";
import styles from "/src/content/components/extensionLeftBar/components/views/newTasksView/filters/tasksTabFilters.module.css.js";
import { Fragment as _Fragment, jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const DateFilter = ({
  filter
}) => {
  _s();
  const {
    useTaskFeedFilterValues
  } = useTaskFeedContext();
  const {
    setDateFilterValue,
    dateFilterValue
  } = useTaskFeedFilterValues();
  return /* @__PURE__ */ _jsxDEV(RelativeDatePicker, {
    width: "100%",
    size: "small",
    variant: "filters",
    onChange: setDateFilterValue,
    value: dateFilterValue,
    placeholder: filter.fieldName || "Date",
    adornment: /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
_s(DateFilter, "3l0E0kgOwxJ5b2xzYnu4DSIAN7g=", true, function() {
  return [useTaskFeedContext];
});
_c = DateFilter;
const OwnerFilter = ({
  filter
}) => {
  _s2();
  const {
    useTaskFeedFilterValues
  } = useTaskFeedContext();
  const {
    setOwnerFilterValue,
    ownerFilterValue
  } = useTaskFeedFilterValues();
  const {
    settings
  } = useActiveUserSettings();
  const isUserTeamsEnabled = useManageUserTeamsEnabled(settings?.account?.id);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filter,
    children: isUserTeamsEnabled ? /* @__PURE__ */ _jsxDEV(UserFilterByTeams, {
      value: ownerFilterValue,
      onChange: setOwnerFilterValue
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(MultiSelect, {
      placeholder: filter.fieldName || "Owner",
      width: "100%",
      size: "small",
      variant: "filters",
      selectAllOption: true,
      value: ownerFilterValue,
      onChange: setOwnerFilterValue,
      children: filter.users.map((user) => /* @__PURE__ */ _jsxDEV(CheckItem, {
        value: user.key,
        children: user.value
      }, user.key, false, {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 13
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 48,
    columnNumber: 5
  }, void 0);
};
_s2(OwnerFilter, "1RVLjRuLW7YkJgyl5bNRHyXgpIs=", true, function() {
  return [useTaskFeedContext, useActiveUserSettings, useManageUserTeamsEnabled];
});
_c2 = OwnerFilter;
const StatusFilter = ({
  filter
}) => {
  _s3();
  const {
    useTaskFeedFilterValues
  } = useTaskFeedContext();
  const {
    setStatusFilterValue,
    statusFilterValue
  } = useTaskFeedFilterValues();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filter,
    children: /* @__PURE__ */ _jsxDEV(MultiSelect, {
      placeholder: filter.fieldName || "Status",
      size: "small",
      variant: "filters",
      selectAllOption: true,
      value: statusFilterValue,
      width: "100%",
      children: filter.statuses ? Object.keys(filter.statuses).map((status) => {
        return [/* @__PURE__ */ _jsxDEV(Section, {
          children: status
        }, status, false, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 17
        }, void 0), filter.statuses[status] && filter.statuses[status].map((item) => /* @__PURE__ */ _jsxDEV(CheckItem, {
          value: item.key,
          onClick: (value) => setStatusFilterValue({
            value,
            section: status
          }),
          children: item.value
        }, item.key, false, {
          fileName: _jsxFileName,
          lineNumber: 92,
          columnNumber: 21
        }, void 0))];
      }) : null
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 77,
    columnNumber: 5
  }, void 0);
};
_s3(StatusFilter, "Xpj0WOvSQaNdTmmhW1p4HJOPLTk=", true, function() {
  return [useTaskFeedContext];
});
_c3 = StatusFilter;
const TaskTypeFilter = ({
  filter
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filter,
    children: /* @__PURE__ */ _jsxDEV(MultiSelect, {
      width: "100%",
      placeholder: filter.fieldName || "Task Type",
      size: "small",
      variant: "filters",
      selectAllOption: true,
      children: [/* @__PURE__ */ _jsxDEV(CheckItem, {
        value: "1",
        children: "Task Type 1"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CheckItem, {
        value: "2",
        children: "Task Type 2"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 110,
    columnNumber: 5
  }, void 0);
};
_c4 = TaskTypeFilter;
const StageFilter = ({
  filter
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filter,
    children: /* @__PURE__ */ _jsxDEV(MultiSelect, {
      width: "100%",
      placeholder: filter.fieldName || "Stage",
      size: "small",
      variant: "filters",
      selectAllOption: true,
      children: [/* @__PURE__ */ _jsxDEV(CheckItem, {
        value: "1",
        children: "Stage 1"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CheckItem, {
        value: "2",
        children: "Stage 2"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 127,
    columnNumber: 5
  }, void 0);
};
_c5 = StageFilter;
const ObjectFilter = ({
  filter
}) => {
  _s4();
  const {
    useTaskFeedFilterValues
  } = useTaskFeedContext();
  const {
    setObjectFilterValue,
    objectFilterValue
  } = useTaskFeedFilterValues();
  const isB2CAccount = useIsB2CAccount();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filter,
    children: /* @__PURE__ */ _jsxDEV(MultiSelect, {
      placeholder: filter.fieldName || "Object",
      size: "small",
      variant: "filters",
      selectAllOption: true,
      value: objectFilterValue,
      width: "100%",
      children: filter.bobjectTypes && filter.bobjectTypes.filter((t) => isB2CAccount ? t.key !== "Company" : true).map((bobjectType) => /* @__PURE__ */ _jsxDEV(CheckItem, {
        value: bobjectType.value,
        onClick: (value) => setObjectFilterValue(value),
        children: bobjectType.key
      }, bobjectType.value, false, {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 15
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 147,
    columnNumber: 5
  }, void 0);
};
_s4(ObjectFilter, "hYrbKy3ryLJyLGeAfGFsM5LzKCg=", true, function() {
  return [useTaskFeedContext, useIsB2CAccount];
});
_c6 = ObjectFilter;
const TimezoneFilter = () => {
  _s5();
  const {
    useTaskFeedFilterValues
  } = useTaskFeedContext();
  const {
    setTimezoneFilterValue,
    timezoneFilterValue
  } = useTaskFeedFilterValues();
  return /* @__PURE__ */ _jsxDEV(TimezoneRangeFilter, {
    value: timezoneFilterValue,
    onChange: setTimezoneFilterValue
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 177,
    columnNumber: 10
  }, void 0);
};
_s5(TimezoneFilter, "JY3tPOSJFig1EXgupB5Op3bXJdo=", true, function() {
  return [useTaskFeedContext];
});
_c7 = TimezoneFilter;
const hidableClusters = ["overdueTasks", "reminders"];
export const TasksTabFilters = ({
  filtersVisible
}) => {
  _s6();
  const {
    useTaskFeedConfiguredFilters,
    useTaskFeedFilterValues,
    useGetState,
    setVisibleClusters,
    tasks
  } = useTaskFeedContext();
  const {
    t
  } = useTranslation();
  const filters = useTaskFeedConfiguredFilters();
  const {
    filterValues,
    setFilterValue
  } = useTaskFeedFilterValues();
  const sort = useGetState((state) => state?.sort);
  const visibleClusters = useGetState((state) => state?.visibleClusters);
  const accountId = useActiveAccountId();
  const isTimezonesEnabled = useTimezonesEnabled(accountId);
  const clustersWithoutTasks = tasks?.clusters && hidableClusters.filter((cluster) => tasks.clusters[cluster].tasks.length === 0);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filters,
    children: [/* @__PURE__ */ _jsxDEV(AnimatePresence, {
      children: [filtersVisible && /* @__PURE__ */ _jsxDEV(motion.div, {
        className: styles.filterRow,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.filterGroup,
          children: filters?.filter((f) => f).map((filter) => {
            if (filter.type === "DATE") {
              return /* @__PURE__ */ _jsxDEV(DateFilter, {
                filter
              }, filter.field, false, {
                fileName: _jsxFileName,
                lineNumber: 212,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "OWNER") {
              return /* @__PURE__ */ _jsxDEV(OwnerFilter, {
                filter
              }, filter.field, false, {
                fileName: _jsxFileName,
                lineNumber: 215,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "STATUS") {
              return /* @__PURE__ */ _jsxDEV(StatusFilter, {
                filter
              }, filter.field, false, {
                fileName: _jsxFileName,
                lineNumber: 218,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "TASK_TYPE") {
              return /* @__PURE__ */ _jsxDEV(TaskTypeFilter, {
                filter
              }, filter.field, false, {
                fileName: _jsxFileName,
                lineNumber: 221,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "STAGE") {
              return /* @__PURE__ */ _jsxDEV(StageFilter, {
                filter
              }, filter.field, false, {
                fileName: _jsxFileName,
                lineNumber: 224,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "OBJECT") {
              return /* @__PURE__ */ _jsxDEV(ObjectFilter, {
                filter
              }, filter.field, false, {
                fileName: _jsxFileName,
                lineNumber: 227,
                columnNumber: 28
              }, void 0);
            }
            return /* @__PURE__ */ _jsxDEV("div", {
              className: styles.filter,
              children: /* @__PURE__ */ _jsxDEV(MultiSelect, {
                width: "100%",
                placeholder: filter.fieldName,
                value: filterValues[filter.field]?.values || [],
                onChange: (value) => setFilterValue(filter.field, value),
                size: "small",
                variant: "filters",
                selectAllOption: true,
                autocomplete: filter.fieldPicklistValues?.length > 8,
                children: filter.fieldPicklistValues?.map((item) => /* @__PURE__ */ _jsxDEV(CheckItem, {
                  value: item.valueId,
                  children: item.valueName
                }, item.valueId, false, {
                  fileName: _jsxFileName,
                  lineNumber: 242,
                  columnNumber: 27
                }, void 0))
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 231,
                columnNumber: 23
              }, void 0)
            }, filter.field, false, {
              fileName: _jsxFileName,
              lineNumber: 230,
              columnNumber: 21
            }, void 0);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 207,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 11
      }, void 0), sort?.type === "BY_BLOOBIRDS_CLUSTERING" && /* @__PURE__ */ _jsxDEV(CustomChipGroup, {
        onChange: (value) => {
          if (value?.length)
            setVisibleClusters(value);
        },
        value: visibleClusters,
        hiddenValues: clustersWithoutTasks,
        children: [/* @__PURE__ */ _jsxDEV(Chip, {
          value: "overdueTasks",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "calendar",
            size: 14,
            color: "tomato"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 263,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.overdueTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 264,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 262,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
          value: "scheduledTasks",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "event",
            size: 14,
            color: "bloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 267,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.scheduledTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 268,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 266,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
          value: "reminders",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "clock",
            size: 14,
            color: "melon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 271,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.reminders")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 272,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 270,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
          value: "dailyTasks",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "cadence",
            size: 14,
            color: "grape"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 275,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.dailyTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 276,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 274,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 255,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 204,
      columnNumber: 7
    }, void 0), isTimezonesEnabled && /* @__PURE__ */ _jsxDEV(TimezoneFilter, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 30
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 203,
    columnNumber: 5
  }, void 0);
};
_s6(TasksTabFilters, "zpboyKXHPXhxaUp7FkNoaBwW58U=", true, function() {
  return [useTaskFeedContext, useTranslation, useActiveAccountId, useTimezonesEnabled];
});
_c8 = TasksTabFilters;
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
$RefreshReg$(_c, "DateFilter");
$RefreshReg$(_c2, "OwnerFilter");
$RefreshReg$(_c3, "StatusFilter");
$RefreshReg$(_c4, "TaskTypeFilter");
$RefreshReg$(_c5, "StageFilter");
$RefreshReg$(_c6, "ObjectFilter");
$RefreshReg$(_c7, "TimezoneFilter");
$RefreshReg$(_c8, "TasksTabFilters");
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
