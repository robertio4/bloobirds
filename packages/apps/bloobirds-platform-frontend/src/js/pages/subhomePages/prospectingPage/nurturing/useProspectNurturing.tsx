import { useEffect } from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  MainBobjectTypes,
} from '@bloobirds-it/types';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import SessionManagerFactory from '../../../../misc/session';
import { api } from '../../../../utils/api';
import { parsedDateValueToRelativeDates } from '../../../../utils/subhomeFilters.utils';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { getTaskAggregationQuery, useProspectingItems } from '../useProspecting';
import { nurturingORs, nurturingORsWoFullSales, SORT_FIELDS } from './nurturing.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_TASKS_STATUSES = [
  TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
  TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
];

const DEFAULT_TASK_TYPES = [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP];

const defaultOrderFilter = 'select';

const pageAtom = atom({
  key: 'prospectingNurturingPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingNurturingHasNextPage',
  default: true,
});

const hasFullSalesAtom = atom({
  key: 'prospectingNurturingFullSales',
  default: false,
});

const queryAtom = atom({
  key: 'prospectingNurturingQueryAtom',
  default: undefined,
});

const subQueriesAtom = atom({
  key: 'prospectingNurturingSubQueriesAtom',
  default: Object.values(nurturingORs),
});

const subQueriesSelector = selector({
  key: 'prospectingNurturingSubQueriesSelector',
  get: ({ get }) => {
    return get(subQueriesAtom);
  },
  set: ({ get, set }, newValue: any) => {
    const baseSubquery = [];
    const hasFullSales = get(hasFullSalesAtom);
    if (newValue?.length === 0) {
      baseSubquery.push(...Object.values(hasFullSales ? nurturingORs : nurturingORsWoFullSales));
    } else {
      newValue?.forEach((value: MainBobjectTypes) => {
        baseSubquery.push(
          (hasFullSales ? nurturingORs : nurturingORsWoFullSales)[
            value as BobjectTypes.Company | BobjectTypes.Lead
          ],
        );
      });
    }

    set(subQueriesAtom, baseSubquery);
  },
});

const sortAtom = atom({
  key: 'prospectingNurturingSortAtom',
  default: { value: defaultOrderFilter, hasChanged: false },
});

export const useProspectingNurturingPage = () => {
  const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return {
    page,
    hasNextPage,
    loadNextPage,
    setHasNextPage,
  };
};

export const useProspectingNurturingAggregation = () => {
  const subQueries = useRecoilValue(subQueriesSelector);
  const taskAggregationQuery = getTaskAggregationQuery(DEFAULT_TASK_TYPES);

  const { data } = useAggregationSubscription(
    {
      ...taskAggregationQuery,
      //@ts-ignore
      queries: subQueries,
    },
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useProspectingTasksNurturing = () => {
  const query = useRecoilValue(queryAtom);
  const hasFullSalesEnabled = useFullSalesEnabled();
  const setHasFullSalesRecoil = useSetRecoilState(hasFullSalesAtom);
  const subQueries = useRecoilValue(subQueriesSelector);
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value];

  useEffect(() => {
    setHasFullSalesRecoil(hasFullSalesEnabled);
  }, [hasFullSalesEnabled]);
  return {
    ...useProspectingItems(query, sort, pageAtom, BobjectTypes.Task, subQueries, [
      keepPreviousResponse,
    ]),
    ...{ haveFiltersBeenChanged: !!query },
  };
};

export const useProspectingNurturingAllItems = (): { getAllItems: () => Promise<any> } => {
  const settings = useUserSettings();
  const accountId = settings.account.id;
  const query = useRecoilValue(queryAtom);
  const queries = useRecoilValue(subQueriesAtom);

  const getAllItems = () => {
    const searchQuery = {
      query,
      queries,
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
export const useProspectingNurturingQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const setSubqueryBobjectType = useSetRecoilState(subQueriesSelector);
  const bobjectFieldsEntity = useEntity('bobjectFields');

  const assignedToField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const statusField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.STATUS);
  const taskTypeField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE);

  const automatedEmailField = bobjectFieldsEntity?.findByLogicRole(TASK_ACTION.AUTOMATED_EMAIL);

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    [statusField?.id]: DEFAULT_TASKS_STATUSES,
    [taskTypeField?.id]: [TASK_TYPE.NEXT_STEP, TASK_TYPE.PROSPECT_CADENCE],
    [automatedEmailField?.id]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO, '__MATCH_EMPTY_ROWS__'],
  };

  return {
    query,
    setQuery: (value: any) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => {
      setQuery(defaultQuery);
    },
    setSubqueryBobjectType,
  };
};

export const useProspectingNurturingSort = () => {
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

export const useProspectingNurturingFooter = () => {
  const [query] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const dateFilterValue = query && query[scheduledDateField?.id];
  const dateFilter = parsedDateValueToRelativeDates(dateFilterValue?.query);

  return { dateFilter };
};
