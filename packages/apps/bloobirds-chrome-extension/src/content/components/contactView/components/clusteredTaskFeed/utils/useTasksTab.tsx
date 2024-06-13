import React, { useMemo } from 'react';

import { useActiveAccountId, useLazyRef } from '@bloobirds-it/hooks';
import { BobjectTypes, ExtensionBobject, Filter } from '@bloobirds-it/types';
import { api, getUserTimeZone } from '@bloobirds-it/utils';
import isEqual from 'lodash/isEqual';
import useSWR from 'swr';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { useSubscribeListeners } from '../../../hooks/useSubscribeListeners';
import {
  ClusteredTaskList,
  TaskFeedRequest,
  TaskFeedTaskList,
} from '../types/clusteredTaskFeed.type';

// Define the state shape
interface TaskFeedState {
  configuration: {
    dateFilterEnabled: boolean;
    sortableFields: any[];
    sortingStrategies: any[];
    extraFieldsShownOnEachCard: any[];
    filtrableFields: any[];
    canSeeImportance: boolean;
  };
  filtersVisible: boolean;
  filterValues: Record<string, TaskFeedRequest['filters']>;
  defaultFilterValues: Record<string, TaskFeedRequest['filters']>;
  filterValuesTouched: boolean;
  tasks: TaskFeedTaskList | ClusteredTaskList;
  sort: TaskFeedRequest['sort'];
  pagination: TaskFeedRequest['pagination'];
  visibleClusters: string[];
  // Add other keys here as needed
  mainBobject: ExtensionBobject;
  openedModalInfo: { type: any; bobject: any };
}

const defaultClusterPagination = {
  type: 'CLUSTERED',
  scheduledTasks: {
    page: 0,
    size: 10,
  },
  dailyTasks: {
    page: 0,
    size: 10,
  },
  overdueTasks: {
    page: 0,
    size: 10,
  },
  reminders: {
    page: 0,
    size: 10,
  },
  completedTasks: {
    page: 0,
    size: 10,
  },
} as const;

// Create the context
const TaskFeedContext = React.createContext(null);

// Create the custom hook
function useTaskFeedStore() {
  const context = React.useContext(TaskFeedContext);
  if (context === undefined) {
    throw new Error('useTaskFeed must be used within a TaskFeedProvider');
  }
  return context;
}

function generateParsedValue(value: any, filterConfig: any, field: string): Filter {
  switch (filterConfig.type) {
    case 'BY_FIELD':
      return {
        type: 'BY_FIELD',
        field: field,
        values: value,
      };
    case 'BY_REFERENCE_FIELD':
      return {
        type: 'BY_REFERENCE_FIELD',
        values: value,
        field: field,
        relatedField: filterConfig.referenceField,
      };
    case 'DATE':
      return {
        type: 'DATE',
        dateRange: value,
      };
    case 'OWNER':
      return {
        type: 'OWNER',
        values: value,
      };
    case 'STAGE':
      return {
        type: 'STAGE',
        values: value,
      };
    case 'TYPE':
      return {
        type: 'TYPE',
        values: value,
      };
    default:
      return {
        type: 'BY_FIELD',
        field: field,
        values: value,
      };
  }
}

function useTaskFeedContext() {
  const store = useTaskFeedStore();

  function useGetState<R>(selector: (state: TaskFeedState) => R) {
    const cb = () => selector(store?.snapshot());
    return useSyncExternalStore<R>(store?.subscribe, cb, cb);
  }

  function useTaskFeedFilterValues() {
    const filterValues = useGetState(state => state?.filterValues);
    const filtrableFields = useGetState(state => state?.configuration.filtrableFields);
    const filterValuesTouched = useGetState(state => state?.filterValuesTouched);
    const defaultFilterValues = useGetState(state => state?.defaultFilterValues);

    const setFilterValue = (field: string, value: string[]) => {
      // Parse it to the correct type
      const filterConfig = filtrableFields.find(f => f.field === field);
      const parsedValue = generateParsedValue(value, filterConfig, field);
      // If parsedValues.value is empty, remove the field from the filterValues
      let newValues;
      if (
        parsedValue.values === null ||
        parsedValue.values.length === 0 ||
        parsedValue.values === ''
      ) {
        const { [field]: _, ...rest } = filterValues;
        newValues = { ...rest };
      } else {
        newValues = { ...filterValues, [field]: parsedValue };
      }
      store?.setState('filterValues', newValues);
      store?.setState('filterValuesTouched', !isEqual(newValues, defaultFilterValues));
      store?.setState('pagination', defaultClusterPagination);
    };

    const setDateFilterValue = value => {
      // Get the end and start date from the value and send it as iso string
      const start = value?.start?.toISOString();
      const end = value?.end?.toISOString();
      const newValues = {
        ...filterValues,
        date: {
          type: 'DATE',
          dateRange: {
            lte: end,
            gte: start,
          },
        },
      };
      store?.setState('filterValues', newValues);
      store?.setState('filterValuesTouched', !isEqual(newValues, defaultFilterValues));
      store?.setState('pagination', defaultClusterPagination);
    };

    const getDateFilterValue = () => {
      if (filterValues?.date?.dateRange) {
        return {
          type: 'custom',
          end: new Date(filterValues?.date?.dateRange?.lte),
          start: new Date(filterValues?.date?.dateRange?.gte),
        };
      } else {
        return null;
      }
    };

    const setObjectFilterValue = value => {
      const currentValues = (filterValues?.object?.values || []) as Array<any>;
      const valueIndex = currentValues.indexOf(value);

      let newValues;
      if (valueIndex !== -1) {
        // Value exists, remove it
        newValues = [...currentValues.slice(0, valueIndex), ...currentValues.slice(valueIndex + 1)];
      } else {
        // Value doesn't exist, add it
        newValues = [...currentValues, value];
      }
      const newFilterValues = {
        ...filterValues,
        object: {
          type: 'OBJECT',
          values: newValues,
        },
      };
      store?.setState('filterValues', newFilterValues);
      store?.setState('filterValuesTouched', !isEqual(newFilterValues, defaultFilterValues));
      store?.setState('pagination', defaultClusterPagination);
    };

    const getStatusFilterValue = () => {
      // Return an array of the values of the statuse
      return filterValues?.status?.values ? Object.values(filterValues?.status?.values).flat() : [];
    };

    const setStatusFilterValue = value => {
      const currentValues = filterValues?.status?.values?.[value?.section] || [];
      const valueIndex = currentValues.indexOf(value?.value);

      let newValues;
      if (valueIndex !== -1) {
        // Value exists, remove it
        newValues = [...currentValues.slice(0, valueIndex), ...currentValues.slice(valueIndex + 1)];
      } else {
        // Value doesn't exist, add it
        newValues = [...currentValues, value?.value];
      }

      const newFilterValues = {
        ...filterValues,
        status: {
          type: 'STATUS',
          values: {
            ...filterValues?.status?.values,
            [value?.section]: newValues,
          },
        },
      };
      store?.setState('filterValues', newFilterValues);
      store?.setState('filterValuesTouched', !isEqual(newFilterValues, defaultFilterValues));
      store?.setState('pagination', defaultClusterPagination);
    };

    const setOwnerFilterValue = (values: Array<string>) => {
      const { owner, ...rest } = filterValues;
      const newValues =
        values.length === 0
          ? rest // If the value is empty, remove the owner filter
          : {
              ...rest,
              ...(values?.length !== 0 && {
                owner: {
                  type: 'OWNER',
                  values,
                },
              }),
            };
      store?.setState('filterValues', newValues);
      store?.setState('filterValuesTouched', !isEqual(newValues, defaultFilterValues));
      store?.setState('pagination', defaultClusterPagination);
    };

    const getOwnerFilterValue = () => {
      return filterValues?.owner?.values || [];
    };

    const resetFilterValues = () => {
      store?.setState('filterValues', defaultFilterValues);
      store?.setState('filterValuesTouched', false);
      store?.setState('pagination', defaultClusterPagination);
    };

    return {
      resetFilterValues,
      filterValues,
      setFilterValue,
      setDateFilterValue,
      setStatusFilterValue,
      setOwnerFilterValue,
      statusFilterValue: getStatusFilterValue(),
      dateFilterValue: getDateFilterValue(),
      ownerFilterValue: getOwnerFilterValue(),
      filterValuesTouched,
      setObjectFilterValue,
      objectFilterValue: filterValues?.object?.values || [],
    };
  }

  const useTaskFeedPaginationState = () => {
    const pagination = useGetState(state => state?.pagination);
    const setPagination = (paginationValue: TaskFeedRequest['pagination']) => {
      return store?.setState('pagination', paginationValue);
    };
    return {
      pagination,
      setPagination,
    };
  };

  const useGetFiltersState = () => useGetState(state => state?.filtersVisible);
  const filtersVisible = useGetFiltersState();
  const tasks = useTasks({
    bobjectIdFields: useGetState(state => state?.mainBobject)?.id,
    filterValues: useTaskFeedFilterValues()?.filterValues,
    pagination: useGetState(state => state?.pagination),
    sort: useGetState(state => state?.sort),
    configuration: useGetState(state => state?.configuration),
  });

  function setOpenedModalInfo(openedModalInfo) {
    store?.setState('openedModalInfo', openedModalInfo);
  }

  return {
    useGetModalInfo: () => useGetState(state => state?.openedModalInfo),
    setOpenedModalInfo,
    useGetFiltersState,
    toggleFiltersState: () => store?.setState('filtersVisible', !filtersVisible),
    useGetState,
    useTaskFeedPaginationState,
    useGetConfiguration: () => useGetState(state => state?.configuration),
    useTaskFeedConfiguredFilters: () => useGetState(state => state?.configuration.filtrableFields),
    useTaskFeedIsDateFilterEnabled: () =>
      useGetState(state => state?.configuration.dateFilterEnabled),
    setVisibleClusters: clusters => {
      if (clusters?.length) {
        return store?.setState('visibleClusters', clusters);
      }
    },
    useTaskFeedFilterValues,
    tasks,
  };
}

// Create the provider component
function TaskFeedProvider({ mainBobject, children }) {
  const listener = useLazyRef<Set<() => void>>(() => new Set());

  const userTimeZone = getUserTimeZone();
  const now = new Date();

  const startOfDay = new Date(now.toLocaleString('en-US', { timeZone: userTimeZone }));
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now.toLocaleString('en-US', { timeZone: userTimeZone }));
  endOfDay.setHours(23, 59, 59, 999);

  const state = useLazyRef<TaskFeedState>(() => ({
    configuration: {
      dateFilterEnabled: false,
      sortableFields: [],
      sortingStrategies: [],
      extraFieldsShownOnEachCard: [],
      filtrableFields: [],
      canSeeImportance: false,
    },
    defaultFilterValues: {},
    filterValuesTouched: false,
    filterValues: {},
    tasks: null,
    filtersVisible: false,
    visibleClusters: [
      'completedTasks',
      'overdueTasks',
      'scheduledTasks',
      'reminders',
      'dailyTasks',
    ],
    sort: {
      type: 'BY_BLOOBIRDS_CLUSTERING',
    },
    pagination: defaultClusterPagination,
    // Initialize other keys here as needed
    mainBobject,
  }));

  const store = useMemo(
    () => ({
      setState: (key, value) => {
        if (Object.is(state?.current[key], value)) {
          return;
        }
        state.current[key] = value;
        store.emit();
      },
      snapshot: () => state?.current,
      subscribe: callback => {
        listener.current.add(callback);
        return () => listener.current.delete(callback);
      },
      emit: () => listener.current.forEach(cb => cb()),
    }),
    [],
  );

  // Use useSWR to fetch the task feed configuration
  const { data } = useSWR('/utils/task-feed-configuration', api.get, { suspense: true });

  // Update the state with the fetched data
  if (data) {
    // @ts-ignore
    const response = data.data;
    store.setState('configuration', response);
  }
  // If store is undefined, return null
  if (!store) {
    return null;
  }
  return <TaskFeedContext.Provider value={store}>{children}</TaskFeedContext.Provider>;
}

function generateTaskFeedRequest(
  filterValues: Record<string, TaskFeedRequest['filters']>,
  pagination: TaskFeedState['pagination'],
  sort: TaskFeedState['sort'],
  configuration: TaskFeedState['configuration'],
) {
  return {
    filters: Object.values(filterValues).flat(),
    pagination,
    sort,
    extraFieldShown: configuration.extraFieldsShownOnEachCard.map(({ id, name, type, icon }) => ({
      field: id,
      name,
      icon,
      bobjectType: type,
      type: 'FIELD',
    })),
  };
}

const sectionOrder = [
  'overdueTasks',
  'scheduledTasks',
  'reminders',
  'dailyTasks',
  'completedTasks',
];

function useTasks({ bobjectIdFields, filterValues, pagination, sort, configuration }) {
  const accountId = useActiveAccountId();
  const taskFeedRequest: TaskFeedRequest = generateTaskFeedRequest(
    filterValues,
    pagination,
    sort,
    configuration,
  );
  const { data, isLoading, mutate } = useSWR<ClusteredTaskList>(
    'task-feed/sidepeek/' + JSON.stringify(taskFeedRequest) + bobjectIdFields?.value,
    () =>
      api
        .post(
          `/bobjects/${accountId}/task/feed/${bobjectIdFields?.typeName}/${bobjectIdFields?.objectId}`,
          taskFeedRequest,
        )
        .then(res => res.data),
    {
      keepPreviousData: true,
    },
  );
  //TODO review this
  const sortedClusters =
    data?.clusters &&
    Object.fromEntries(
      Object.entries(data.clusters).sort(
        (a, b) => sectionOrder.indexOf(a[0]) - sectionOrder.indexOf(b[0]),
      ),
    );
  useSubscribeListeners(BobjectTypes.Task, mutate);
  return {
    ...data,
    clusters: sortedClusters,
    isLoading,
    taskFeedRequest,
  };
}

export { TaskFeedProvider, useTaskFeedStore, useTaskFeedContext, useTasks };
