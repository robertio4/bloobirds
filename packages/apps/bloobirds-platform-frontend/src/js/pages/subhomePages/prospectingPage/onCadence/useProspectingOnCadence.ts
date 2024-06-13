import { useMemo } from 'react';

import { useDataModel } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  BobjectTypes,
  MainBobjectTypes,
  Bobject,
} from '@bloobirds-it/types';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled, useProspectingNurturingTab } from '../../../../hooks/useFeatureFlags';
import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { api } from '../../../../utils/api';
import { parsedDateValueToRelativeDates } from '../../../../utils/subhomeFilters.utils';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { parseNonImportantQuery } from '../../subhomes.utils';
import { getTaskAggregationQuery, useProspectingItems } from '../useProspecting';
import { DEFAULT_SUBQUERY, getSubqueriesByBobjectType } from '../useProspecting.constants';
import { SORT_FIELDS } from './onCadence.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'select';

const queryAtom = atom({
  key: 'prospectingOnCadenceQueryAtom',
  default: undefined,
});

const sortAtom = atom({
  key: 'prospectOnCadenceSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

const subQueriesAtom = atom({
  key: 'prospectOnCadenceSubQueriesAtom',
  default: DEFAULT_SUBQUERY,
});

const pageAtom = atom({
  key: 'prospectingOnCadencePage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingOnCadenceHasNextPage',
  default: true,
});

export const useProspectingOnCadencePage = () => {
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

export const useProspectingOnCadenceAggregation = () => {
  const { data } = useAggregationSubscription(
    getTaskAggregationQuery([TASK_TYPE.PROSPECT_CADENCE], {
      [TASK_ACTION.AUTOMATED_EMAIL]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO, '__MATCH_EMPTY_ROWS__'],
    }),
    BobjectTypes.Task,
    [keepPreviousResponse],
  );
  return data?.data?.contents[0]?.value;
};

export const useProspectingTasksOnCadence = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value as keyof typeof SORT_FIELDS];
  const query = useRecoilValue(queryAtom);
  const currentSubQueries = useRecoilValue(subQueriesAtom);

  return {
    ...useProspectingItems(
      query,
      sort,
      pageAtom,
      BobjectTypes.Task,
      hasSalesEnabled ? currentSubQueries : [{}],
      [keepPreviousResponse],
    ),
    ...{ haveFiltersBeenChanged: !!query },
  };
};

export const useProspectingOnCadenceAllItems = () => {
  const settings = useUserSettings();
  const hasSalesEnabled = useFullSalesEnabled();
  const accountId = settings.account.id;
  const query = useRecoilValue(queryAtom);
  const queries = useRecoilValue(subQueriesAtom);
  const getAllItems = (): Promise<{
    contents: Bobject<BobjectTypes.Task>[];
    page: number;
    totalMatching: number;
  }> => {
    const searchQuery = {
      query,
      queries: hasSalesEnabled ? queries : [{}],
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

export const useProspectingOnCadenceQuery = () => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const [query, setQuery] = useRecoilState(queryAtom);
  const setORsValues = useSetRecoilState(subQueriesAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const dataModel = useDataModel();

  const hasNurturingTab = useProspectingNurturingTab();

  const assignedToField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const statusField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.STATUS);
  const taskTypeField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.TASK_TYPE);
  const automatedEmailField = bobjectFieldsEntity?.findByLogicRole(TASK_ACTION.AUTOMATED_EMAIL);
  const opportunityField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const priorityField = bobjectFieldsEntity?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const noPriorityField = priorityTasks?.find(
    priorityTask => priorityTask.logicRole === TASK_PRIORITY_VALUE.NO_PRIORITY,
  );

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    [statusField?.id]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE],
    [taskTypeField?.id]: [TASK_TYPE.PROSPECT_CADENCE],
    [automatedEmailField?.id]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO, '__MATCH_EMPTY_ROWS__'],
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

    setORsValues(parsedOrs);
  }

  return {
    query,
    setQuery: (value: { [id: string]: any }) => {
      const noPriorityQuery = parseNonImportantQuery(value, priorityField, noPriorityField);
      setQuery({ ...defaultQuery, ...value, ...noPriorityQuery });
    },
    resetQuery: () => setQuery(defaultQuery),
    setSubqueryBobjectType: (value: MainBobjectTypes[]) => handleOrsBobjectTypeChange(value),
  };
};

export const useProspectingOnCadenceSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);
  return {
    sort,
    setSort: (value: SortValues | 'select') => {
      if (!value || value === DEFAULT_ORDER) {
        resetSort();
      } else {
        setSort({ value, hasChanged: true });
      }
    },
  };
};

export const useProspectingOnCadenceFooter = () => {
  const [query] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');

  const dateFilter = useMemo(() => {
    const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    );
    const dateFilterValue = query && query[scheduledDateField?.id];
    return parsedDateValueToRelativeDates(dateFilterValue?.query);
  }, [bobjectFieldsEntity, query]);

  return { dateFilter };
};
