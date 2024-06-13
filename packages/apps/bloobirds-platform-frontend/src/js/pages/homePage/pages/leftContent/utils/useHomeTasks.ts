import { Direction, SearchRequest, useSearchSubscription } from '@bloobirds-it/plover';
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE } from '@bloobirds-it/types';
import {
  endOfDay,
  endOfMonth,
  getMonth,
  isFuture,
  isPast,
  startOfDay,
  startOfMonth,
} from 'date-fns';

import SessionManagerFactory from '../../../../../misc/session';
import { getHomeTasksQueriesAll } from './orQueries';
import { Filters, Stages } from './utils';

const SessionManager = SessionManagerFactory();

const BASE_SEARCH_REQUEST = {
  formFields: true,
  pageSize: 1000,
  injectReferences: false,
  columns: [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, TASK_FIELDS_LOGIC_ROLE.STATUS],
};

export const useCalendarTasks = (
  stage: Stages,
  taskFilters: Filters,
  usersFilter: string[] | undefined,
  dateFilter = new Date(),
  showCompleted = false,
  showOverdue = false,
) => {
  const isCurrentMonth = getMonth(new Date(dateFilter)) === getMonth(new Date());
  const isPastDate = isPast(new Date(dateFilter));
  const isFutureDate = isFuture(new Date(dateFilter));

  const query = {
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: usersFilter || SessionManager?.getUser()?.id,
    [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
      'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
      '__MATCH_EMPTY_ROWS__',
    ],
  };

  const queries = getHomeTasksQueriesAll(stage, taskFilters, false);

  const { data: pastTasks } = useSearchSubscription(
    // @ts-ignore
    (isPastDate || isCurrentMonth) &&
      (showCompleted || showOverdue) && {
        query: {
          ...query,
          [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
            query: {
              lt: startOfDay(new Date()),
            },
            searchMode: 'RANGE__SEARCH',
          },
        },
        // @ts-ignore
        queries,
        ...BASE_SEARCH_REQUEST,
      },
    BobjectTypes.Task,
  );

  const { data: todayTasks } = useSearchSubscription(
    // @ts-ignore
    isCurrentMonth && {
      query: {
        ...query,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
          query: {
            lte: endOfDay(new Date()),
            gte: startOfDay(new Date()),
          },
          searchMode: 'RANGE__SEARCH',
        },
      },
      // @ts-ignore
      queries,
      ...BASE_SEARCH_REQUEST,
    },
    BobjectTypes.Task,
  );

  const { data: futureTasks } = useSearchSubscription(
    // @ts-ignore
    (isFutureDate || isCurrentMonth) && {
      query: {
        ...query,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
          query: {
            gt: isCurrentMonth ? endOfDay(new Date()) : startOfMonth(new Date(dateFilter)),
            lte: endOfMonth(new Date(dateFilter)),
          },
          searchMode: 'RANGE__SEARCH',
        },
      },
      // @ts-ignore
      queries,
      ...BASE_SEARCH_REQUEST,
    },
    BobjectTypes.Task,
  );

  return {
    data: [
      ...(pastTasks?.data.contents || []),
      ...(todayTasks?.data.contents || []),
      ...(futureTasks?.data.contents || []),
    ],
  };
};

export const useHomeTasks = ({
  stage,
  taskFilters,
  page = 0,
  overdue = false,
  dateFilter = new Date(),
  importantSelected = false,
  usersFilter,
}: {
  stage: Stages;
  taskFilters: Filters;
  page: number;
  overdue: boolean;
  dateFilter: Date;
  importantSelected?: boolean;
  usersFilter?: string[] | undefined;
}): { isLoading: boolean; data: any } => {
  const scheduleQuery = overdue
    ? { lt: startOfDay(dateFilter) }
    : { gte: startOfDay(dateFilter), lte: endOfDay(dateFilter) };
  const query = {
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: usersFilter || SessionManager?.getUser()?.id,
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      ['query']: scheduleQuery,
      searchMode: 'RANGE__SEARCH',
    },
    [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
      'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
      '__MATCH_EMPTY_ROWS__',
    ],
    ...(importantSelected
      ? { [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: TASK_PRIORITY_VALUE.IMPORTANT }
      : {}),
  };
  const sort = [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'ASC' as Direction,
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ];
  const queries = getHomeTasksQueriesAll(stage, taskFilters, overdue);

  const searchQuery: SearchRequest = {
    query,
    // @ts-ignore
    queries,
    formFields: true,
    pageSize: 100 * (page + 1),
    injectReferences: true,
    sort,
  };

  const { data, isLoading } = useSearchSubscription(searchQuery, BobjectTypes.Task);
  return { data, isLoading };
};
