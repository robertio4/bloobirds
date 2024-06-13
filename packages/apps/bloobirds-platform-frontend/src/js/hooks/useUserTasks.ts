import { useEffect } from 'react';

import { usePausePeriods } from '@bloobirds-it/hooks';
import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  BOBJECT_TYPES,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { getRangeBetweenDates, isToday, injectReferencesSearchProcess } from '@bloobirds-it/utils';
import {
  endOfDay,
  endOfMonth,
  getMonth,
  isFuture,
  isPast,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import mixpanel from 'mixpanel-browser';
import {
  atom,
  atomFamily,
  DefaultValue,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import SessionManagerFactory from '../misc/session';
import {
  TASK_TYPE_EQUIVALENCE,
  TaskTypeLogicRoles,
} from '../pages/homePage/pages/leftContent/utils/constants';
import { UserHomeConfig } from '../pages/homePage/typings/home';
import { TasksHookFamilies } from '../typings/tasks';

type Filters = {
  user?: string;
  date?: Date;
  prospectingTypes?: UserHomeConfig[];
  salesTypes?: UserHomeConfig[];
  tasksType?: 'PROSPECTING';
};

const SessionManager = SessionManagerFactory();

const BASE_SEARCH_REQUEST = {
  formFields: true,
  pageSize: 1000,
  injectReferences: true,
  columns: [
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    TASK_FIELDS_LOGIC_ROLE.STATUS,
    TASK_FIELDS_LOGIC_ROLE.TITLE,
    TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
    TASK_FIELDS_LOGIC_ROLE.COMPANY,
    TASK_FIELDS_LOGIC_ROLE.LEAD,
    TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
    TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL,
    TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL,
    TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL,
    TASK_FIELDS_LOGIC_ROLE.IS_ACTION_LINKEDIN,
  ],
  referencedColumns: [
    LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
    COMPANY_FIELDS_LOGIC_ROLE.NAME,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  ],
};

const PROSPECTING_DEFAULT_FILTERS = [
  TASK_TYPE.NEXT_STEP,
  TASK_TYPE.PROSPECT_CADENCE,
  TASK_TYPE.CONTACT_BEFORE_MEETING,
];

const SALES_DEFAULT_FILTERS = [TASK_TYPE.NEXT_STEP, TASK_TYPE.PROSPECT_CADENCE];

const calendarOpenAtom = atom({
  key: 'appCalendarOpenAtom',
  default: false,
});

const calendarExtended = atom({
  key: 'appCalendarExtended',
  default: true,
});

const userFilterAtom = atom({
  key: 'appCalendarUserFilter',
  default: undefined,
});

const dateFilterAtom = atomFamily({
  key: 'appCalendarDateFilter',
  default: new Date(),
});

const prospectingTypesFilterAtom = atomFamily({
  key: 'appCalendarProspectingTypesFilter',
  default: PROSPECTING_DEFAULT_FILTERS,
});

const salesTypesFilterAtom = atomFamily({
  key: 'appCalendarSalesTypesFilter',
  default: SALES_DEFAULT_FILTERS,
});

const filtersAtom = selectorFamily({
  key: 'appCalendarFilters',
  get: family => ({ get }): Filters => {
    const userFilter = get(userFilterAtom);
    const dateFilter = get(dateFilterAtom(family));
    const prospectingTypesFilter = get(prospectingTypesFilterAtom(family));
    const salesTypesFilter = get(salesTypesFilterAtom(family));

    return {
      user: userFilter,
      date: dateFilter,
      prospectingTypes: prospectingTypesFilter,
      salesTypes: salesTypesFilter,
    };
  },
  set: family => ({ set, reset }, value) => {
    if (value instanceof DefaultValue) {
      reset(userFilterAtom);
      reset(dateFilterAtom(family));
      reset(prospectingTypesFilterAtom(family));
      reset(salesTypesFilterAtom(family));
    } else {
      if (value.user) set(userFilterAtom, value.user);
      if (value.date) set(dateFilterAtom(family), value.date);
      if (value.prospectingTypes) set(prospectingTypesFilterAtom(family), value.prospectingTypes);
      if (value.salesTypes) set(salesTypesFilterAtom(family), value.salesTypes);
    }
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

const itemsAtom = atomFamily({
  key: 'appCalendarTodayTasksItemsAtom',
  default: [],
});

const responseAtom = selectorFamily({
  key: 'appCalendarTodayTasksResponse',
  get: () => null,
  set: (family: TasksHookFamilies) => ({ set }, response) => {
    // @ts-ignore
    set(itemsAtom(family), response?.contents);
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

const itemsOverdueAtom = atomFamily({
  key: 'appCalendarTodayTasksOverdueItemsAtom',
  default: [],
});

const responseOverdueAtom = selectorFamily({
  key: 'appCalendarTodayOverdueTasksResponse',
  get: () => null,
  set: (family: TasksHookFamilies) => ({ set }, response) => {
    // @ts-ignore
    set(itemsOverdueAtom(family), response?.contents);
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

const queryAtom = selectorFamily({
  key: 'appCalendarQuery',
  get: (family: TasksHookFamilies) => ({ get }) => {
    const filters: Filters = get(filtersAtom(family));
    const isAllFilters = checkIsAllFilters(filters, family);
    const types = getTypesFilter(filters);
    const showOverdue = isAllFilters || types.includes(TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE);

    return {
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: filters.user || SessionManager?.getUser()?.id,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]:
        showOverdue || isAllFilters
          ? [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE]
          : [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
    };
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

const filterToTaskTypeLR = (filter: string): TaskTypeLogicRoles[] => {
  return TASK_TYPE_EQUIVALENCE[filter] ?? undefined;
};

const getFiltersEnumName = (filters: UserHomeConfig[]) => {
  let logicRoles: TaskTypeLogicRoles[] = [];
  filters
    .filter((f: UserHomeConfig) => f.enabled)
    .forEach((f: UserHomeConfig) => {
      const lrList = filterToTaskTypeLR(f.enumName);
      if (lrList) {
        lrList.forEach(lr => (logicRoles = logicRoles.concat(lr)));
      }
    });
  return logicRoles;
};

const getTypesFilter = (filters: Filters): TaskTypeLogicRoles[] => {
  const filterTypes = filters.prospectingTypes;
  return getFiltersEnumName(filterTypes);
};

const getTaskTypes = (filters: Filters) => {
  const types = getTypesFilter(filters);
  const isAllFilters = types.length === 0;
  return isAllFilters
    ? PROSPECTING_DEFAULT_FILTERS
    : types.filter(
        type =>
          ![TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE, TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED].includes(
            type,
          ),
      );
};

const checkIsAllFilters = (filters: Filters, family: TasksHookFamilies) => {
  const types = getTypesFilter(filters);
  return types.length === 0 && family !== TasksHookFamilies.Home;
};

export const useAppCalendarVisibility = () => {
  const [calendarOpen, setCalendarOpen] = useRecoilState(calendarOpenAtom);
  const [isExtended, setIsExtended] = useRecoilState(calendarExtended);

  const openCalendar = () => {
    if (!calendarOpen) {
      mixpanel.track('CALENDAR_OPENED');
      setCalendarOpen(true);
    }
  };

  const closeCalendar = () => {
    if (calendarOpen) {
      setCalendarOpen(false);
    }
  };

  const openAppCalendarTodayTasks = () => {
    if (!calendarOpen) {
      mixpanel.track('CALENDAR_OPENED_SINCE_TODAY_TASKS');
      setIsExtended(false);
      setCalendarOpen(true);
    }
  };

  return {
    isOpen: calendarOpen,
    openCalendar,
    closeCalendar,
    isExtended,
    setIsExtended,
    openAppCalendarTodayTasks,
  };
};

export const useUserTasks = (family: TasksHookFamilies) => {
  const query = useRecoilValue(queryAtom(family));
  const filters = useRecoilValue(filtersAtom(family));
  const types = getTypesFilter(filters as Filters);
  const isCurrentMonth = getMonth(new Date(filters.date)) === getMonth(new Date());
  const isPastDate = isPast(new Date(filters.date));
  const isFutureDate = isFuture(new Date(filters.date));
  const isAllFilters = checkIsAllFilters(filters, family);
  const showOverdue = isAllFilters || types.includes(TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE);
  const showCompleted = isAllFilters || types.includes(TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED);
  let statuses = showOverdue
    ? [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE]
    : [TASK_STATUS_VALUE_LOGIC_ROLE.TODO];
  statuses = !showCompleted
    ? [...statuses]
    : [
        ...statuses,
        TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
        TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
      ];

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
          [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
            'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
            '__MATCH_EMPTY_ROWS__',
          ],
          [TASK_FIELDS_LOGIC_ROLE.STATUS]: !showOverdue
            ? statuses.filter(status => status !== TASK_STATUS_VALUE_LOGIC_ROLE.TODO)
            : statuses,
          [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: getTaskTypes(filters),
        },
        ...BASE_SEARCH_REQUEST,
      },
    BOBJECT_TYPES.TASK,
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
        [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
          'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
          '__MATCH_EMPTY_ROWS__',
        ],
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: statuses,
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: getTaskTypes(filters),
      },
      ...BASE_SEARCH_REQUEST,
    },
    BOBJECT_TYPES.TASK,
  );

  const { data: futureTasks } = useSearchSubscription(
    // @ts-ignore
    (isFutureDate || isCurrentMonth) && {
      query: {
        ...query,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
          query: {
            gt: isCurrentMonth ? endOfDay(new Date()) : startOfMonth(new Date(filters.date)),
            lte: endOfMonth(new Date(filters.date)),
          },
          searchMode: 'RANGE__SEARCH',
        },
        [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
          'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
          '__MATCH_EMPTY_ROWS__',
        ],
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: statuses,
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: getTaskTypes(filters),
      },
      ...BASE_SEARCH_REQUEST,
    },
    BOBJECT_TYPES.TASK,
  );

  return {
    data: [
      ...(pastTasks?.data.contents || []),
      ...(todayTasks?.data.contents || []),
      ...(futureTasks?.data.contents || []),
    ],
  };
};

export const useUserDateTasks = ({
  date,
  family,
  importantSelected,
}: {
  date: Date;
  family: TasksHookFamilies;
  importantSelected?: boolean;
}) => {
  const query = useRecoilValue(queryAtom(family));
  const filters = useRecoilValue(filtersAtom(family));
  const setResponse = useSetRecoilState(responseAtom(family));
  const items = useRecoilValue(itemsAtom(family));
  const resetItems = useResetRecoilState(itemsAtom(family));
  const isAllFilters = checkIsAllFilters(filters, family);
  const types = getTypesFilter(filters);
  const showCompleted = isAllFilters || types.includes(TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED);
  const isTodayDate = isToday(new Date(date));
  const isFutureDate = isFuture(new Date(date));
  const tasksTypes = getTaskTypes(filters);
  const makeRequest =
    !!date && (isTodayDate || isFutureDate || showCompleted) && tasksTypes.length > 0;

  const { data, isValidating } = useSearchSubscription(
    // @ts-ignore
    makeRequest && {
      ...BASE_SEARCH_REQUEST,
      query: {
        ...query,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
          query: {
            gte: startOfDay(date),
            lte: endOfDay(date),
          },
          searchMode: 'RANGE__SEARCH',
        },
        [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
          'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
          '__MATCH_EMPTY_ROWS__',
        ],
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: tasksTypes,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
          ...(isTodayDate || isFutureDate ? [TASK_STATUS_VALUE_LOGIC_ROLE.TODO] : []),
          ...(showCompleted
            ? [
                TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
                TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
              ]
            : []),
        ],
        ...(importantSelected
          ? { [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: TASK_PRIORITY_VALUE.IMPORTANT }
          : {}),
      },
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: 'ASC',
        },
        {
          field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
          direction: 'ASC',
        },
      ],
      injectReferences: true,
    },
    BOBJECT_TYPES.TASK,
  );

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    } else {
      setResponse({ contents: [] });
    }
  }, [data]);

  useEffect(() => {
    return () => setResponse(null);
  }, []);

  return { tasks: items, isLoading: isValidating, resetItems };
};

export const useUserDateOverdueTasks = ({
  date,
  family,
  importantSelected,
}: {
  date: Date;
  family: TasksHookFamilies;
  importantSelected?: boolean;
}) => {
  const query = useRecoilValue(queryAtom(family));
  const filters = useRecoilValue(filtersAtom(family));
  const setResponseOverdue = useSetRecoilState(responseOverdueAtom(family));
  const items = useRecoilValue(itemsOverdueAtom(family));
  const resetItems = useResetRecoilState(itemsOverdueAtom(family));
  const isAllFilters = checkIsAllFilters(filters, family);
  const types = getTypesFilter(filters);
  const tasksTypes = getTaskTypes(filters);
  const showOverdue = isAllFilters || types.includes(TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE);
  const makeRequest = !!date && showOverdue && tasksTypes?.length > 0;

  const { data, isValidating } = useSearchSubscription(
    // @ts-ignore
    makeRequest && {
      ...BASE_SEARCH_REQUEST,
      query: {
        ...query,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
          query: {
            lt: startOfDay(date),
          },
          searchMode: 'RANGE__SEARCH',
        },
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: tasksTypes,
        [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
          'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
          '__MATCH_EMPTY_ROWS__',
        ],
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
          TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
          TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
        ],
        ...(importantSelected
          ? { [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: TASK_PRIORITY_VALUE.IMPORTANT }
          : {}),
      },
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: 'ASC',
        },
        {
          field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
          direction: 'ASC',
        },
      ],
      injectReferences: true,
    },
    BOBJECT_TYPES.TASK,
  );

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      const extendedResponseWithOverdue = {
        ...extendedResponse,
        contents: extendedResponse?.contents?.map(content => ({ ...content, isOverdue: true })),
      };
      setResponseOverdue(extendedResponseWithOverdue);
    } else {
      setResponseOverdue({ contents: [] });
    }
  }, [data]);

  return { tasks: items, isLoading: isValidating, resetItems };
};

export const useUserPausePeriods = () => {
  const { periods } = usePausePeriods({
    userId: SessionManager?.getUser()?.id,
  });
  const notFinishedPeriods = periods?.list.filter(period => !period.finished);
  const datesOfPeriods = notFinishedPeriods
    .map(period => getRangeBetweenDates(period.startDate, period.endDate))
    .flat();

  return { periods: datesOfPeriods };
};

export const useUserTasksFilters = (family: TasksHookFamilies) => {
  const [userFilter, setUserFilter] = useRecoilState(userFilterAtom);
  const dateFilter = useRecoilValue(dateFilterAtom(family));
  const prospectingTypesFilter = useRecoilValue(prospectingTypesFilterAtom(family));
  const salesTypesFilter = useRecoilValue(salesTypesFilterAtom(family));
  const filters = useRecoilValue(filtersAtom(family));
  const resetDateFilter = useResetRecoilState(dateFilterAtom(family));
  const resetProspectingTypesFilter = useResetRecoilState(prospectingTypesFilterAtom(family));
  const resetSalesTypesFilter = useResetRecoilState(salesTypesFilterAtom(family));
  const resetAllFilters = useResetRecoilState(filtersAtom(family));
  const resetOverdueItems = useResetRecoilState(itemsOverdueAtom(family));
  const setFilters = useSetRecoilState(filtersAtom(family));

  return {
    userFilter,
    dateFilter,
    prospectingTypesFilter,
    salesTypesFilter,
    filters,
    resetDateFilter,
    resetProspectingTypesFilter,
    resetSalesTypesFilter,
    resetAllFilters,
    setUserFilter,
    setDateFilter: (value: Date) => {
      setFilters({ date: value });
    },
    setProspectingTypesFilter: (filters: UserHomeConfig[]) => {
      const isAllFilters = filters.length === 0 && family !== TasksHookFamilies.Home;
      const showOverdue =
        isAllFilters || !!filters.find(f => f.enumName === 'OVERDUE' && f.enabled);

      if (!showOverdue) {
        resetOverdueItems();
      }

      setFilters({ prospectingTypes: filters });
    },

    setSalesTypesFilter: (filters: UserHomeConfig[]) => {
      const isAllFilters = filters.length === 0 && family !== TasksHookFamilies.Home;
      const showOverdue =
        isAllFilters || !!filters.find(f => f.enumName === 'OVERDUE' && f.enabled);

      if (!showOverdue) {
        resetOverdueItems();
      }

      setFilters({ salesTypes: filters });
    },
    setFilters,
  };
};
