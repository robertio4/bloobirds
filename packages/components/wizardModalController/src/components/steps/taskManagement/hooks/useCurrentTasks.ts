import { useMemo, useState } from 'react';

import { useActiveAccountId } from '@bloobirds-it/hooks';
import { BobjectId } from '@bloobirds-it/types';
import { api, getUserTimeZone } from '@bloobirds-it/utils';
import { addYears } from 'date-fns';
import useSWR from 'swr';

import { ClusteredTaskList } from '../types/taskManagement.types';

function generateTaskFeedRequest(
  filterValues: any,
  pagination: any,
  sort: any,
  configuration: any,
) {
  return {
    filters: Object.values(filterValues || {}),
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

const defaultSort = {
  type: 'BY_BLOOBIRDS_CLUSTERING',
};

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
};

const defaultConfiguration = {
  dateFilterEnabled: false,
  sortableFields: [],
  sortingStrategies: [],
  extraFieldsShownOnEachCard: [],
  filtrableFields: [],
  canSeeImportance: false,
};

const sectionOrder = ['overdueTasks', 'scheduledTasks', 'dailyTasks'];

export const useCurrentTasks = (bobjectId: BobjectId) => {
  const userTimeZone = getUserTimeZone();
  const [pagination, setPagination] = useState(defaultClusterPagination);
  const now = new Date();

  const startOfDay = new Date(now.toLocaleString('en-US', { timeZone: userTimeZone }));
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now.toLocaleString('en-US', { timeZone: userTimeZone }));
  endOfDay.setHours(23, 59, 59, 999);

  const defaultFilterValues = {
    date: {
      type: 'DATE',
      dateRange: {
        lte: addYears(now, 5).toISOString(),
        gte: startOfDay.toISOString(),
      },
    },
  };
  const accountId = useActiveAccountId();
  const paginationStringified = JSON.stringify(pagination);
  const taskFeedRequest = useMemo(
    () =>
      generateTaskFeedRequest(defaultFilterValues, pagination, defaultSort, defaultConfiguration),
    [paginationStringified],
  );
  const { data, isLoading, mutate } = useSWR<ClusteredTaskList>(
    `task-feed/contact-flow/${bobjectId?.typeName}/${bobjectId?.objectId}` + paginationStringified,
    () =>
      api
        .post(
          `/bobjects/${accountId}/task/feed/${bobjectId?.typeName}/${bobjectId?.objectId}`,
          taskFeedRequest,
        )
        .then(res => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: true,
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

  return {
    ...data,
    mutate,
    clusters: sortedClusters,
    isLoading,
    taskFeedRequest,
    visibleClusters: ['overdueTasks', 'scheduledTasks', 'dailyTasks'],
    paginationState: { pagination, setPagination },
    configuration: defaultConfiguration,
    hasCadenceSteps: sortedClusters?.dailyTasks?.totalElements > 0,
    hasNextSteps: sortedClusters?.scheduledTasks?.totalElements > 0,
  };
};
