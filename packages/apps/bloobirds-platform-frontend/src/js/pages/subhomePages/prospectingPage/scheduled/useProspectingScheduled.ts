import { useDataModel } from '@bloobirds-it/hooks';
import { BobjectType as PloverBobjectType, useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled, useProspectingNurturingTab } from '../../../../hooks/useFeatureFlags';
// eslint-disable-next-line import/no-unresolved
import { MainBobjectTypes } from '../../../../hooks/useSubhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { parsedDateValueToRelativeDates } from '../../../../utils/subhomeFilters.utils';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { parseNonImportantQuery } from '../../subhomes.utils';
import { SORT_FIELDS } from '../onCadence/onCadence.constant';
import { getTaskAggregationQuery, useProspectingItems } from '../useProspecting';
import { DEFAULT_SUBQUERY, getSubqueriesByBobjectType } from '../useProspecting.constants';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'select';

const queryAtom = atom({
  key: 'prospectingScheduledQueryAtom',
  default: undefined,
});

const sortAtom = atom<{ value: keyof typeof SORT_FIELDS; hasChanged: boolean }>({
  key: 'prospectingScheduledSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

const subQueriesAtom = atom({
  key: 'prospectScheduledSubQueriesAtom',
  default: DEFAULT_SUBQUERY,
});

const pageAtom = atom({
  key: 'prospectingScheduledPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingScheduledHasNextPage',
  default: true,
});

export const useProspectingScheduledPage = () => {
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

export const useProspectingScheduledAggregation = () => {
  const { data } = useAggregationSubscription(
    getTaskAggregationQuery([TASK_TYPE.NEXT_STEP]),
    BobjectTypes.Task as PloverBobjectType,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useProspectingTasksScheduled = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value];
  const query = useRecoilValue(queryAtom);
  const currentSubQueries = useRecoilValue(subQueriesAtom);

  return useProspectingItems(
    query,
    sort,
    pageAtom,
    BobjectTypes.Task,
    hasSalesEnabled ? currentSubQueries : [{}],
    [keepPreviousResponse],
  );
};

// New Hooks

export const useProspectingScheduledQuery = () => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const [query, setQuery] = useRecoilState(queryAtom);
  const setSubqueryBobjectType = useSetRecoilState(subQueriesAtom);
  const hasNurturingTab = useProspectingNurturingTab();
  const dataModel = useDataModel();

  const bobjectFieldsEntity = useEntity('bobjectFields');
  const assignedToField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const statusField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.STATUS);
  const taskTypeField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE);
  const opportunityField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const priorityField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const noPriorityField = priorityTasks?.find(
    priorityTask => priorityTask.logicRole === TASK_PRIORITY_VALUE.NO_PRIORITY,
  );

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    [statusField?.id]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE],
    [taskTypeField?.id]: [TASK_TYPE.NEXT_STEP],
    ...(isFullSalesEnabled ? { [opportunityField?.id]: ['__MATCH_EMPTY_ROWS__'] } : {}),
  };

  function handleOrsBobjectTypeChange(bobjectType: MainBobjectTypes[]) {
    const parsedOrs = [];
    const subqueriesByBobjectType = getSubqueriesByBobjectType(hasNurturingTab);
    if (bobjectType?.length === 0 || !bobjectType) {
      parsedOrs.push(...Object.values(subqueriesByBobjectType));
    } else {
      bobjectType?.forEach((value: MainBobjectTypes) => {
        parsedOrs.push(subqueriesByBobjectType[value as BobjectTypes.Company | BobjectTypes.Lead]);
      });
    }

    setSubqueryBobjectType(parsedOrs);
  }

  return {
    query,
    setQuery: (value: any) => {
      const noPriorityQuery = parseNonImportantQuery(value, priorityField, noPriorityField);
      setQuery({ ...defaultQuery, ...value, ...noPriorityQuery });
    },
    resetQuery: () => setQuery(defaultQuery),
    setSubqueryBobjectType: (value: MainBobjectTypes[]) => handleOrsBobjectTypeChange(value),
  };
};

export const useProspectingScheduledSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);

  return {
    sort,
    setSort: (value: keyof typeof SORT_FIELDS) => {
      if (!value || value === DEFAULT_ORDER) {
        resetSort();
      } else {
        setSort({ value, hasChanged: true });
      }
    },
  };
};

export const useProspectingScheduledFooter = () => {
  const [query] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const dateFilterValue = query && query[scheduledDateField?.id];
  const dateFilter = parsedDateValueToRelativeDates(dateFilterValue?.query);

  return { dateFilter };
};
