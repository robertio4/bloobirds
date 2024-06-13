import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskFilters/tasksTabFilters.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskFilters/tasksTabFilters.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskFilters/tasksTabFilters.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { ActivityFeedUserFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityFeed-dist-index.js.js";
import { Button, CheckItem, Icon, MultiSelect, RelativeDatePicker, Section } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { CreateTaskMenu, TaskRingPosition } from "/src/content/components/contactView/components/createTaskMenu/createTaskMenu.tsx.js";
import { useTaskFeedContext } from "/src/content/components/contactView/components/clusteredTaskFeed/utils/useTasksTab.tsx.js";
import { Chip, CustomChipGroup } from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskFilters/components/customChipGroup.tsx.js";
import styles from "/src/content/components/contactView/components/clusteredTaskFeed/components/taskFilters/tasksTabFilters.module.css.js";
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
    lineNumber: 25,
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
  return /* @__PURE__ */ _jsxDEV("div", {
    children: /* @__PURE__ */ _jsxDEV(MultiSelect, {
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
        lineNumber: 53,
        columnNumber: 11
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 42,
    columnNumber: 5
  }, void 0);
};
_s2(OwnerFilter, "a/lVbucy++czQHyZ6A+ke2zHFx4=", true, function() {
  return [useTaskFeedContext];
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
          lineNumber: 79,
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
          lineNumber: 82,
          columnNumber: 21
        }, void 0))];
      }) : null
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 67,
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
        lineNumber: 108,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CheckItem, {
        value: "2",
        children: "Task Type 2"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 100,
    columnNumber: 5
  }, void 0);
};
_c4 = TaskTypeFilter;
const StageFilter = ({
  filter
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
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
        lineNumber: 125,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CheckItem, {
        value: "2",
        children: "Stage 2"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 117,
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
        lineNumber: 150,
        columnNumber: 15
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 137,
    columnNumber: 5
  }, void 0);
};
_s4(ObjectFilter, "hYrbKy3ryLJyLGeAfGFsM5LzKCg=", true, function() {
  return [useTaskFeedContext, useIsB2CAccount];
});
_c6 = ObjectFilter;
const hidableClusters = ["overdueTasks", "reminders"];
export const TasksTabFilters = ({
  filtersVisible
}) => {
  _s5();
  const {
    useTaskFeedConfiguredFilters,
    useTaskFeedFilterValues,
    useGetState,
    setVisibleClusters,
    tasks
  } = useTaskFeedContext();
  const {
    useGetActiveBobjectContext
  } = useExtensionContext() || {};
  const activeBobjectContext = useGetActiveBobjectContext();
  const {
    t
  } = useTranslation();
  const filters = useTaskFeedConfiguredFilters();
  const {
    filterValues,
    setFilterValue
  } = useTaskFeedFilterValues();
  const {
    setOwnerFilterValue,
    ownerFilterValue
  } = useTaskFeedFilterValues();
  const sort = useGetState((state) => state?.sort);
  const visibleClusters = useGetState((state) => state?.visibleClusters);
  const fullView = false;
  const clustersWithoutTasks = tasks?.clusters && hidableClusters.filter((cluster) => tasks.clusters[cluster].tasks.length === 0);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.filtersWrapper,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.filters,
      children: [fullView && filtersVisible && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.filterRow,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.filterGroup,
          children: filters?.filter((f) => f).map((filter) => {
            if (filter.type === "DATE") {
              return /* @__PURE__ */ _jsxDEV(DateFilter, {
                filter
              }, filter, false, {
                fileName: _jsxFileName,
                lineNumber: 198,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "OWNER") {
              return /* @__PURE__ */ _jsxDEV(OwnerFilter, {
                filter
              }, filter, false, {
                fileName: _jsxFileName,
                lineNumber: 201,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "STATUS") {
              return /* @__PURE__ */ _jsxDEV(StatusFilter, {
                filter
              }, filter, false, {
                fileName: _jsxFileName,
                lineNumber: 204,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "TASK_TYPE") {
              return /* @__PURE__ */ _jsxDEV(TaskTypeFilter, {
                filter
              }, filter, false, {
                fileName: _jsxFileName,
                lineNumber: 207,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "STAGE") {
              return /* @__PURE__ */ _jsxDEV(StageFilter, {
                filter
              }, filter, false, {
                fileName: _jsxFileName,
                lineNumber: 210,
                columnNumber: 28
              }, void 0);
            }
            if (filter.type === "OBJECT") {
              return /* @__PURE__ */ _jsxDEV(ObjectFilter, {
                filter
              }, filter, false, {
                fileName: _jsxFileName,
                lineNumber: 213,
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
                  lineNumber: 228,
                  columnNumber: 27
                }, void 0))
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 217,
                columnNumber: 23
              }, void 0)
            }, filter.field, false, {
              fileName: _jsxFileName,
              lineNumber: 216,
              columnNumber: 21
            }, void 0);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 193,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 192,
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
            lineNumber: 248,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.overdueTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 249,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 247,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
          value: "scheduledTasks",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "event",
            size: 14,
            color: "bloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 252,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.scheduledTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 253,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 251,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
          value: "reminders",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "clock",
            size: 14,
            color: "melon"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 256,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.reminders")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 257,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 255,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
          value: "dailyTasks",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "cadence",
            size: 14,
            color: "grape"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 260,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.dailyTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 261,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 259,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Chip, {
          value: "completedTasks",
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "checkDouble",
            size: 14,
            color: "darkBloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 264,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            children: t("taskFeed.completedTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 265,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 263,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 240,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.rightFilters,
      children: [!fullView && /* @__PURE__ */ _jsxDEV("div", {
        className: styles.ownerFilter,
        children: /* @__PURE__ */ _jsxDEV(ActivityFeedUserFilter, {
          selectedUser: ownerFilterValue,
          setUserFilter: setOwnerFilterValue,
          isTaskFeed: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 273,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 272,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(CreateTaskMenu, {
        environment: activeBobjectContext,
        position: TaskRingPosition.LEFT,
        children: /* @__PURE__ */ _jsxDEV(Button, {
          iconLeft: "add",
          className: styles.createTaskButton
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 281,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 280,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 189,
    columnNumber: 5
  }, void 0);
};
_s5(TasksTabFilters, "jgXiWQGrAsBSvhAfDESUll5cIe8=", true, function() {
  return [useTaskFeedContext, useExtensionContext, useTranslation];
});
_c7 = TasksTabFilters;
var _c, _c2, _c3, _c4, _c5, _c6, _c7;
$RefreshReg$(_c, "DateFilter");
$RefreshReg$(_c2, "OwnerFilter");
$RefreshReg$(_c3, "StatusFilter");
$RefreshReg$(_c4, "TaskTypeFilter");
$RefreshReg$(_c5, "StageFilter");
$RefreshReg$(_c6, "ObjectFilter");
$RefreshReg$(_c7, "TasksTabFilters");
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
