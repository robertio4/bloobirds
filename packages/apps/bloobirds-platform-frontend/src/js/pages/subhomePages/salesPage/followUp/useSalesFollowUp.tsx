import { useDataModel } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { getSimpleDate, keepPreviousResponse } from '@bloobirds-it/utils';
import { addDays, addMonths, endOfDay, startOfDay } from 'date-fns';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { MainBobjectTypes } from '../../../../hooks/useSubhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { api } from '../../../../utils/api';
import { parseNonImportantQuery } from '../../subhomes.utils';
import { getTaskAggregationQuery, useSalesItems } from '../useSales';
import { DEFAULT_SALES_SUBQUERY, subQueryTypes } from '../useSales.constants';

const SessionManager = SessionManagerFactory();

const DEFAULT_TASKS_STATUSES = [
  TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
  TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
];

const SORT_FIELDS = {
  closeDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'ASC',
    },
  ],
  closeDateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
  ],
  amount: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  stage: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS}`,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE}`,
      direction: 'DESC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  select: [
    {
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'ASC',
    },
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.COMPANY}/${COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY}`,
      direction: 'ASC',
    },
    {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC',
    },
  ],
  creationDateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME}`,
      direction: 'DESC',
    },
  ],
  creationDateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME}`,
      direction: 'ASC',
    },
  ],
  lastUpdateRecent: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'DESC',
    },
  ],
  lastUpdateOldest: [
    {
      field: `${TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY}/${OPPORTUNITY_FIELDS_LOGIC_ROLE.UPDATE_DATETIME}`,
      direction: 'ASC',
    },
  ],
};

const DATE_FILTER_FIELDS = {
  today: {
    query: {
      lte: getSimpleDate(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
  next_7_days: {
    query: {
      lte: getSimpleDate(endOfDay(addDays(new Date(), 7))),
    },
    searchMode: 'RANGE__SEARCH',
  },
  next_30_days: {
    query: {
      lte: getSimpleDate(endOfDay(addMonths(new Date(), 1))),
    },
    searchMode: 'RANGE__SEARCH',
  },
  since_today: {
    query: {
      gte: startOfDay(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
  more_than_6_month: {
    query: {
      gte: endOfDay(addMonths(new Date(), -6)),
      lte: endOfDay(new Date()),
    },
    searchMode: 'RANGE__SEARCH',
  },
};

const defaultOrderFilter = 'select';
const defaultDateFilter = 'today';

const pageAtom = atom({
  key: 'salesFollowUpPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'salesFollowUpHasNextPage',
  default: true,
});

const queryAtom = atom({
  key: 'salesFollowUpQueryAtom',
  default: undefined,
});

const subQueriesAtom = atom({
  key: 'salesFollowUpSubQueriesAtom',
  default: DEFAULT_SALES_SUBQUERY,
});

const subQueriesSelector = selector({
  key: 'salesFollowUpSubQueriesSelector',
  get: ({ get }) => {
    return get(subQueriesAtom);
  },
  set: ({ set }, newValue: any) => {
    //TODO remove this
    const baseSubquery = [];

    if (newValue?.length === 0) {
      baseSubquery.push(...Object.values(subQueryTypes));
    } else {
      newValue?.forEach((value: MainBobjectTypes) => {
        baseSubquery.push(
          subQueryTypes[
            value as BobjectTypes.Company | BobjectTypes.Lead | BobjectTypes.Opportunity
          ],
        );
      });
    }

    set(subQueriesAtom, baseSubquery);
  },
});

const sortAtom = atom({
  key: 'salesFollowUpSortAtom',
  default: { value: defaultOrderFilter, hasChanged: false },
});

export const useSalesFollowUpPage = () => {
  const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return {
    hasNextPage,
    loadNextPage,
    setHasNextPage,
  };
};

export const useSalesFollowUpAggregation = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const countedTaskTypes = [
    TASK_TYPE.PROSPECT_CADENCE,
    ...(hasSalesEnabled ? [TASK_TYPE.NEXT_STEP, TASK_TYPE.MEETING] : []),
  ];
  const taskAggregationQuery = getTaskAggregationQuery(countedTaskTypes, hasSalesEnabled);
  if (hasSalesEnabled) {
    taskAggregationQuery.queries = Object.values(subQueryTypes).flat();
  } else {
    taskAggregationQuery.queries = [subQueryTypes[BobjectTypes.Opportunity]];
  }

  const { data } = useAggregationSubscription(taskAggregationQuery, BobjectTypes.Task, [
    keepPreviousResponse,
  ]);

  return data?.data?.contents[0]?.value;
};

export const useSalesTasksFollowUp = () => {
  const hasSalesEnabled = useFullSalesEnabled();

  const query = useRecoilValue(queryAtom);

  const salesConversionQuery = {
    ...query,
    ...{
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [
        TASK_TYPE.MEETING,
        TASK_TYPE.NEXT_STEP,
        TASK_TYPE.PROSPECT_CADENCE,
      ],
    },
  };
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value];
  const subQueries = useRecoilValue(subQueriesSelector);

  return {
    ...useSalesItems(
      hasSalesEnabled ? salesConversionQuery : query,
      subQueries,
      sort,
      pageAtom,
      BobjectTypes.Task,
    ),
    ...{ haveFiltersBeenChanged: !!query },
  };
};

export const useSalesFollowUpAllItems = () => {
  const settings = useUserSettings();
  const accountId = settings?.account.id;

  const hasSalesEnabled = useFullSalesEnabled();
  const countedTaskTypes = [
    TASK_TYPE.PROSPECT_CADENCE,
    ...(hasSalesEnabled ? [TASK_TYPE.NEXT_STEP, TASK_TYPE.MEETING] : []),
  ];
  const taskAggregationQuery = getTaskAggregationQuery(countedTaskTypes, hasSalesEnabled);
  if (hasSalesEnabled) {
    taskAggregationQuery.queries = Object.values(subQueryTypes).flat();
  } else {
    taskAggregationQuery.queries = [subQueryTypes[BobjectTypes.Opportunity]];
  }
  const getAllItems = () => {
    const searchQuery = {
      ...taskAggregationQuery,
      page: 0,
      formFields: true,
      pageSize: 1000,
      injectReferences: true,
      sort: [] as any[],
    };
    return api.post(`/bobjects/${accountId}/Task/search`, searchQuery);
  };
  return { getAllItems };
};

//NEW HOOKS
export const useSalesFollowUpQuery = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const [query, setQuery] = useRecoilState(queryAtom);
  const setSubqueryBobjectType = useSetRecoilState(subQueriesSelector);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const dataModel = useDataModel();
  const assignedToField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const statusField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.STATUS);
  const taskTypeField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE);
  const automatedEmailField = bobjectFieldsEntity?.findByLogicRole(TASK_ACTION.AUTOMATED_EMAIL);
  const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const priorityField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const noPriorityField = priorityTasks?.find(
    priorityTask => priorityTask.logicRole === TASK_PRIORITY_VALUE.NO_PRIORITY,
  );

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    [statusField?.id]: DEFAULT_TASKS_STATUSES,
    [taskTypeField?.id]: [
      TASK_TYPE.PROSPECT_CADENCE,
      ...(hasSalesEnabled ? [TASK_TYPE.NEXT_STEP, TASK_TYPE.MEETING] : []),
    ],
    [automatedEmailField?.id]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO, '__MATCH_EMPTY_ROWS__'],
    [scheduledDateField?.id]: DATE_FILTER_FIELDS[defaultDateFilter],
  };

  return {
    query,
    setQuery: (value: any) => {
      const noPriorityQuery = parseNonImportantQuery(value, priorityField, noPriorityField);
      setQuery({ ...defaultQuery, ...value, ...noPriorityQuery });
    },
    resetQuery: () => {
      setQuery(defaultQuery);
    },
    setSubqueryBobjectType,
  };
};

export const useSalesFollowUpSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);

  return {
    sort,
    setSort: (value: string) => {
      if (!value || value === defaultOrderFilter) {
        resetSort();
      } else {
        setSort({ value, hasChanged: true });
      }
    },
  };
};
