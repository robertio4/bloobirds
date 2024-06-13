import { useDataModel } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { MainBobjectTypes } from '../../../../hooks/useSubhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { parsedDateValueToRelativeDates } from '../../../../utils/subhomeFilters.utils';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { parseNonImportantQuery } from '../../subhomes.utils';
import { getTaskAggregationQuery, useProspectingItems } from '../useProspecting';
import { DEFAULT_SUBQUERY, subqueriesByBobjectType } from '../useProspecting.constants';
import { SORT_FIELDS } from './meetingReminders.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'select';

const queryAtom = atom({
  key: 'prospectingMeetingdQueryAtom',
  default: undefined,
});

const sortAtom = atom({
  key: 'prospectingMeetingRemindersSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

const subQueriesAtom = atom({
  key: 'prospectMeetingSubQueriesAtom',
  default: DEFAULT_SUBQUERY,
});

const subQueriesSelector = selector({
  key: 'prospectMeetingSubQueriesSelector',
  get: ({ get }) => {
    return get(subQueriesAtom);
  },
  set: ({ set }, newValue: any) => {
    const baseSubquery = [];

    if (newValue?.length === 0) {
      baseSubquery.push(...Object.values(subqueriesByBobjectType));
    } else {
      newValue?.forEach((value: MainBobjectTypes) => {
        baseSubquery.push(
          subqueriesByBobjectType[value as BobjectTypes.Company | BobjectTypes.Lead],
        );
      });
    }

    set(subQueriesAtom, baseSubquery);
  },
});

/* END - NEW ATOMS */

const pageAtom = atom({
  key: 'prospectingMeetingRemindersPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingMeetingRemindersHasNextPage',
  default: true,
});

export const useProspectingMeetingRemindersPage = () => {
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

export const useProspectingMeetingRemindersAggregation = () => {
  const { data } = useAggregationSubscription(
    getTaskAggregationQuery([TASK_TYPE.CONTACT_BEFORE_MEETING]),
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useProspectingTasksMeetingReminders = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value as keyof typeof SORT_FIELDS];
  const query = useRecoilValue(queryAtom);
  const currentSubQueries = useRecoilValue(subQueriesSelector);
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

export const useProspectingMeetingRemindersQuery = () => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const [query, setQuery] = useRecoilState(queryAtom);
  const setSubqueryBobjectType = useSetRecoilState(subQueriesSelector);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const dataModel = useDataModel();

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
    [statusField?.id]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
    [taskTypeField?.id]: [TASK_TYPE.CONTACT_BEFORE_MEETING],
    ...(isFullSalesEnabled ? { [opportunityField?.id]: ['__MATCH_EMPTY_ROWS__'] } : {}),
  };

  return {
    query,
    setQuery: (value: any) => {
      const noPriorityQuery = parseNonImportantQuery(value, priorityField, noPriorityField);
      setQuery({ ...defaultQuery, ...value, ...noPriorityQuery });
    },
    resetQuery: () => setQuery(defaultQuery),
    setSubqueryBobjectType,
  };
};

export const useProspectingMeetingRemindersSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);
  return {
    sort,
    setSort: (value: any) => {
      if (!value || value === DEFAULT_ORDER) {
        resetSort();
      } else {
        setSort({ value: value, hasChanged: true });
      }
    },
  };
};

export const useProspectingMeetingRemindersFooter = () => {
  const [query] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const scheduledDateField = bobjectFieldsEntity?.findByLogicRole(
    TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  );
  const dateFilterValue = query && query[scheduledDateField?.id];
  const dateFilter = parsedDateValueToRelativeDates(dateFilterValue?.query);

  return { dateFilter };
};
