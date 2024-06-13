import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/hooks/useTasksTab.tsx", _s = $RefreshSig$(), _s9 = $RefreshSig$(), _s10 = $RefreshSig$(), _s11 = $RefreshSig$(), _s12 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useActiveAccountId, useLazyRef } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getUserTimeZone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport6_lodash_isEqual from "/vendor/.vite-deps-lodash_isEqual.js__v--1a3ee503.js"; const isEqual = __vite__cjsImport6_lodash_isEqual.__esModule ? __vite__cjsImport6_lodash_isEqual.default : __vite__cjsImport6_lodash_isEqual;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import __vite__cjsImport8_useSyncExternalStore_shim from "/vendor/.vite-deps-use-sync-external-store_shim.js__v--03bee27d.js"; const useSyncExternalStore = __vite__cjsImport8_useSyncExternalStore_shim["useSyncExternalStore"];
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const defaultClusterPagination = {
  type: "CLUSTERED",
  scheduledTasks: {
    page: 0,
    size: 10
  },
  dailyTasks: {
    page: 0,
    size: 10
  },
  overdueTasks: {
    page: 0,
    size: 10
  },
  reminders: {
    page: 0,
    size: 10
  }
};
const TaskFeedContext = React.createContext(null);
function useTaskFeedStore() {
  _s();
  const context = React.useContext(TaskFeedContext);
  if (context === void 0) {
    throw new Error("useTaskFeed must be used within a TaskFeedProvider");
  }
  return context;
}
_s(useTaskFeedStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function generateParsedValue(value, filterConfig, field) {
  switch (filterConfig.type) {
    case "BY_FIELD":
      return {
        type: "BY_FIELD",
        field,
        values: value
      };
    case "BY_REFERENCE_FIELD":
      return {
        type: "BY_REFERENCE_FIELD",
        values: value,
        field,
        relatedField: filterConfig.referenceField
      };
    case "DATE":
      return {
        type: "DATE",
        dateRange: value
      };
    case "OWNER":
      return {
        type: "OWNER",
        values: value
      };
    case "STAGE":
      return {
        type: "STAGE",
        values: value
      };
    case "TYPE":
      return {
        type: "TYPE",
        values: value
      };
    default:
      return {
        type: "BY_FIELD",
        field,
        values: value
      };
  }
}
function useTaskFeedContext() {
  _s9();
  var _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$(), _s6 = $RefreshSig$(), _s7 = $RefreshSig$(), _s8 = $RefreshSig$();
  const store = useTaskFeedStore();
  function useGetState2(selector) {
    _s2();
    const cb = () => selector(store?.snapshot());
    return useSyncExternalStore(store?.subscribe, cb, cb);
  }
  _s2(useGetState2, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [useSyncExternalStore];
  });
  function useTaskFeedFilterValues2() {
    _s3();
    const filterValues = useGetState2((state) => state?.filterValues);
    const filtrableFields = useGetState2((state) => state?.configuration.filtrableFields);
    const filterValuesTouched = useGetState2((state) => state?.filterValuesTouched);
    const defaultFilterValues = useGetState2((state) => state?.defaultFilterValues);
    const setFilterValue = (field, value) => {
      const filterConfig = filtrableFields.find((f) => f.field === field);
      const parsedValue = generateParsedValue(value, filterConfig, field);
      let newValues;
      if (parsedValue.values === null || parsedValue.values.length === 0 || parsedValue.values === "") {
        const {
          [field]: _,
          ...rest
        } = filterValues;
        newValues = {
          ...rest
        };
      } else {
        newValues = {
          ...filterValues,
          [field]: parsedValue
        };
      }
      store?.setState("filterValues", newValues);
      store?.setState("filterValuesTouched", !isEqual(newValues, defaultFilterValues));
      store?.setState("pagination", defaultClusterPagination);
    };
    const setDateFilterValue = (value) => {
      const start = value?.start?.toISOString();
      const end = value?.end?.toISOString();
      const newValues = {
        ...filterValues,
        date: {
          type: "DATE",
          dateRange: {
            lte: end,
            gte: start
          }
        }
      };
      store?.setState("filterValues", newValues);
      store?.setState("filterValuesTouched", !isEqual(newValues, defaultFilterValues));
      store?.setState("pagination", defaultClusterPagination);
    };
    const setTimezoneFilterValue = (value) => {
      const start = value?.start?.toISOString();
      const end = value?.end?.toISOString();
      const newValues = {
        ...filterValues,
        timezone: {
          type: "TIMEZONE",
          dateRange: {
            lte: end,
            gte: start
          }
        }
      };
      store?.setState("filterValues", newValues);
      store?.setState("filterValuesTouched", !isEqual(newValues, defaultFilterValues));
      store?.setState("pagination", defaultClusterPagination);
    };
    const getDateFilterValue = () => {
      if (filterValues?.date?.dateRange) {
        return {
          type: "custom",
          end: new Date(filterValues?.date?.dateRange?.lte),
          start: new Date(filterValues?.date?.dateRange?.gte)
        };
      } else {
        return null;
      }
    };
    const getTimezoneFilterValue = () => {
      if (filterValues?.timezone?.dateRange) {
        return {
          end: new Date(filterValues?.timezone?.dateRange?.lte),
          start: new Date(filterValues?.timezone?.dateRange?.gte)
        };
      } else {
        return null;
      }
    };
    const setObjectFilterValue = (value) => {
      const currentValues = filterValues?.object?.values || [];
      const valueIndex = currentValues.indexOf(value);
      let newValues;
      if (valueIndex !== -1) {
        newValues = [...currentValues.slice(0, valueIndex), ...currentValues.slice(valueIndex + 1)];
      } else {
        newValues = [...currentValues, value];
      }
      const newFilterValues = {
        ...filterValues,
        object: {
          type: "OBJECT",
          values: newValues
        }
      };
      store?.setState("filterValues", newFilterValues);
      store?.setState("filterValuesTouched", !isEqual(newFilterValues, defaultFilterValues));
      store?.setState("pagination", defaultClusterPagination);
    };
    const getStatusFilterValue = () => {
      return filterValues?.status?.values ? Object.values(filterValues?.status?.values).flat() : [];
    };
    const setStatusFilterValue = (value) => {
      const currentValues = filterValues?.status?.values?.[value?.section] || [];
      const valueIndex = currentValues.indexOf(value?.value);
      let newValues;
      if (valueIndex !== -1) {
        newValues = [...currentValues.slice(0, valueIndex), ...currentValues.slice(valueIndex + 1)];
      } else {
        newValues = [...currentValues, value?.value];
      }
      const newFilterValues = {
        ...filterValues,
        status: {
          type: "STATUS",
          values: {
            ...filterValues?.status?.values,
            [value?.section]: newValues
          }
        }
      };
      store?.setState("filterValues", newFilterValues);
      store?.setState("filterValuesTouched", !isEqual(newFilterValues, defaultFilterValues));
      store?.setState("pagination", defaultClusterPagination);
    };
    const setOwnerFilterValue = (value) => {
      const newValues = {
        ...filterValues,
        owner: {
          type: "OWNER",
          values: value
        }
      };
      store?.setState("filterValues", newValues);
      store?.setState("filterValuesTouched", !isEqual(newValues, defaultFilterValues));
      store?.setState("pagination", defaultClusterPagination);
    };
    const getOwnerFilterValue = () => {
      return filterValues?.owner?.values || [];
    };
    const resetFilterValues = () => {
      store?.setState("filterValues", defaultFilterValues);
      store?.setState("filterValuesTouched", false);
      store?.setState("pagination", defaultClusterPagination);
    };
    return {
      resetFilterValues,
      filterValues,
      setFilterValue,
      setDateFilterValue,
      setTimezoneFilterValue,
      setStatusFilterValue,
      setOwnerFilterValue,
      statusFilterValue: getStatusFilterValue(),
      dateFilterValue: getDateFilterValue(),
      ownerFilterValue: getOwnerFilterValue(),
      timezoneFilterValue: getTimezoneFilterValue(),
      filterValuesTouched,
      setObjectFilterValue,
      objectFilterValue: filterValues?.object?.values || []
    };
  }
  _s3(useTaskFeedFilterValues2, "8B8SdscvPbvnbVGhskauAH7tQfQ=", false, function() {
    return [useGetState2, useGetState2, useGetState2, useGetState2];
  });
  const useTaskFeedPaginationState = () => {
    _s4();
    const pagination = useGetState2((state) => state?.pagination);
    const setPagination = (paginationValue) => {
      return store?.setState("pagination", paginationValue);
    };
    return {
      pagination,
      setPagination
    };
  };
  _s4(useTaskFeedPaginationState, "NUI7dj7/kbimoZES4djtnlFkDdc=", false, function() {
    return [useGetState2];
  });
  const useGetFiltersState2 = () => {
    _s5();
    return useGetState2((state) => state?.filtersVisible);
  };
  _s5(useGetFiltersState2, "gWPyEPvMuuR6w1yoUHDP30l6J+c=", false, function() {
    return [useGetState2];
  });
  const filtersVisible = useGetFiltersState2();
  const tasks = useTasks({
    filterValues: useTaskFeedFilterValues2(),
    pagination: useGetState2((state) => state?.pagination),
    sort: useGetState2((state) => state?.sort),
    configuration: useGetState2((state) => state?.configuration)
  });
  return {
    useGetFiltersState: useGetFiltersState2,
    toggleFiltersState: () => store?.setState("filtersVisible", !filtersVisible),
    useGetState: useGetState2,
    useTaskFeedPaginationState,
    useGetConfiguration: _s6(() => {
      _s6();
      return useGetState2((state) => state?.configuration);
    }, "gWPyEPvMuuR6w1yoUHDP30l6J+c=", false, function() {
      return [useGetState2];
    }),
    useTaskFeedConfiguredFilters: _s7(() => {
      _s7();
      return useGetState2((state) => state?.configuration.filtrableFields);
    }, "gWPyEPvMuuR6w1yoUHDP30l6J+c=", false, function() {
      return [useGetState2];
    }),
    useTaskFeedIsDateFilterEnabled: _s8(() => {
      _s8();
      return useGetState2((state) => state?.configuration.dateFilterEnabled);
    }, "gWPyEPvMuuR6w1yoUHDP30l6J+c=", false, function() {
      return [useGetState2];
    }),
    setVisibleClusters: (clusters) => {
      if (clusters?.length) {
        return store?.setState("visibleClusters", clusters);
      }
    },
    useTaskFeedFilterValues: useTaskFeedFilterValues2,
    tasks
  };
}
_s9(useTaskFeedContext, "g4jHFVkPbPXfq8wq483OnpITHiU=", false, function() {
  return [useTaskFeedStore, useGetFiltersState, useTasks, useTaskFeedFilterValues, useGetState, useGetState, useGetState];
});
function TaskFeedProvider({
  children
}) {
  _s10();
  const listener = useLazyRef(() => /* @__PURE__ */ new Set());
  const userTimeZone = getUserTimeZone();
  const now = new Date();
  const startOfDay = new Date(now.toLocaleString("en-US", {
    timeZone: userTimeZone
  }));
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now.toLocaleString("en-US", {
    timeZone: userTimeZone
  }));
  endOfDay.setHours(23, 59, 59, 999);
  const state = useLazyRef(() => ({
    configuration: {
      dateFilterEnabled: false,
      sortableFields: [],
      sortingStrategies: [],
      extraFieldsShownOnEachCard: [],
      filtrableFields: []
    },
    defaultFilterValues: {
      date: {
        type: "DATE",
        dateRange: {
          lte: endOfDay.toISOString(),
          gte: startOfDay.toISOString()
        }
      }
    },
    filterValuesTouched: false,
    filterValues: {
      date: {
        type: "DATE",
        dateRange: {
          lte: endOfDay.toISOString(),
          gte: startOfDay.toISOString()
        }
      }
    },
    tasks: null,
    filtersVisible: false,
    visibleClusters: ["overdueTasks", "scheduledTasks", "reminders", "dailyTasks"],
    sort: {
      type: "BY_BLOOBIRDS_CLUSTERING"
    },
    pagination: defaultClusterPagination
  }));
  const store = useMemo(() => ({
    setState: (key, value) => {
      if (Object.is(state?.current[key], value)) {
        return;
      }
      state.current[key] = value;
      store.emit();
    },
    snapshot: () => state?.current,
    subscribe: (callback) => {
      listener.current.add(callback);
      return () => listener.current.delete(callback);
    },
    emit: () => listener.current.forEach((cb) => cb())
  }), []);
  const {
    data
  } = useSWR("/utils/task-feed-configuration", api.get, {
    suspense: true
  });
  if (data) {
    const response = data.data;
    store.setState("configuration", response);
  }
  if (!store) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV(TaskFeedContext.Provider, {
    value: store,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 425,
    columnNumber: 10
  }, this);
}
_s10(TaskFeedProvider, "IcExCc1Jwo9Tj7pz8VOAokIkf5E=", false, function() {
  return [useLazyRef, useLazyRef, useSWR];
});
_c = TaskFeedProvider;
export const useTasksGlobalAggregation = () => {
  _s11();
  const accountId = useActiveAccountId();
  const {
    data,
    mutate
  } = useSWR("/left-bar/aggregation", () => api.post(`/bobjects/${accountId}/task/aggregation`, {}), {
    refreshInterval: 60 * 1e3
  });
  useSubscribeListeners(BobjectTypes.Task, mutate);
  return data?.data?.tasksCount || 0;
};
_s11(useTasksGlobalAggregation, "igFpSe3swVe0hB4sPoefn7YyMu0=", false, function() {
  return [useActiveAccountId, useSWR, useSubscribeListeners];
});
function generateTaskFeedRequest(filterValues, pagination, sort, configuration) {
  return {
    filters: Object.values(filterValues.filterValues),
    pagination,
    sort,
    extraFieldShown: configuration.extraFieldsShownOnEachCard.map(({
      id,
      name,
      type,
      icon
    }) => ({
      field: id,
      name,
      icon,
      bobjectType: type,
      type: "FIELD"
    }))
  };
}
const sectionOrder = ["overdueTasks", "scheduledTasks", "reminders", "dailyTasks"];
function useTasks({
  filterValues,
  pagination,
  sort,
  configuration
}) {
  _s12();
  const accountId = useActiveAccountId();
  const taskFeedRequest = generateTaskFeedRequest(filterValues, pagination, sort, configuration);
  const {
    data,
    isLoading,
    mutate,
    error
  } = useSWR("task-feed" + JSON.stringify(taskFeedRequest), () => api.post(`/bobjects/${accountId}/task/feed`, taskFeedRequest).then((res) => res.data), {
    keepPreviousData: true
  });
  const sortedClusters = data?.clusters && Object.fromEntries(Object.entries(data.clusters).sort((a, b) => sectionOrder.indexOf(a[0]) - sectionOrder.indexOf(b[0])));
  return {
    ...data,
    clusters: sortedClusters,
    isLoading,
    mutate,
    taskFeedRequest,
    error
  };
}
_s12(useTasks, "QxAOiY9CPD2ych2z3/8P1jrU5J8=", false, function() {
  return [useActiveAccountId, useSWR];
});
export { TaskFeedProvider, useTaskFeedStore, useTaskFeedContext, useTasks };
var _c;
$RefreshReg$(_c, "TaskFeedProvider");
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
