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
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useEntity, useOpportunity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import SessionManagerFactory from '../../../../misc/session';
import { api } from '../../../../utils/api';
import { getSimpleDate } from '@bloobirds-it/utils';
import { parseNonImportantQuery } from '../../subhomes.utils';
import { getTaskAggregationQuery, useSalesItems } from '../useSales';
import { nurturingSubQueryTypes, SORT_FIELDS } from './nurturing.constant';
import { keepPreviousResponse } from "@bloobirds-it/utils";

const SessionManager = SessionManagerFactory();

const DEFAULT_TASKS_STATUSES = [
  TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
  TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
];

const DEFAULT_TASK_TYPES = [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP];

const defaultOrderFilter = 'select';

const pageAtom = atom({
  key: 'salesNurturingPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'salesNurturingHasNextPage',
  default: true,
});

const queryAtom = atom({
  key: 'salesNurturingQueryAtom',
  default: undefined,
});

const ORsActiveBobjectTypesAtom = atom({
  key: 'salesNurturingORsActiveBobjectTypesAtom',
  default: Object.keys(nurturingSubQueryTypes),
});

const sortAtom = atom({
  key: 'salesNurturingSortAtom',
  default: { value: defaultOrderFilter, hasChanged: false },
});

export const useSalesNurturingPage = () => {
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

function injectOppNurturingStatusesIntoORs(ORs, statuses, filteredBobjectTypes) {
  const updatedORs: { [x: string]: { query: { [x: string]: any }; searchMode: string } }[] = [];
  const availableBobjectTypes = [BobjectTypes.Company, BobjectTypes.Lead];
  if (statuses?.length) availableBobjectTypes.push(BobjectTypes.Opportunity);
  const activeBobjectTypes =
    filteredBobjectTypes?.length > 0 ? filteredBobjectTypes : availableBobjectTypes;
  activeBobjectTypes.forEach((bobjectType: BobjectTypes) => {
    if (bobjectType === BobjectTypes.Opportunity) {
      updatedORs.push({
        [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: {
          query: {
            [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]:
              statuses.length === 0 ? ['__MATCH_EMPTY_ROWS__'] : statuses.map(status => status.id),
            [OPPORTUNITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'],
          },
          searchMode: 'SUBQUERY__SEARCH',
        },
      });
    } else {
      updatedORs.push(ORs[bobjectType]);
    }
  });

  return updatedORs;
}

export const useSalesNurturingAggregation = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const taskAggregationQuery = getTaskAggregationQuery(DEFAULT_TASK_TYPES, hasSalesEnabled);
  const { oppNurturingValues } = useOpportunity();

  const tabORs = injectOppNurturingStatusesIntoORs(
    nurturingSubQueryTypes,
    oppNurturingValues,
    undefined,
  );

  const { data } = useAggregationSubscription(
    {
      ...taskAggregationQuery,
      //@ts-ignore
      queries: tabORs,
    },
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useSalesTasksNurturing = () => {
  const query = useRecoilValue(queryAtom);
  const [ORsActiveBobjectTypes, setSubqueryBobjectType] = useRecoilState(ORsActiveBobjectTypesAtom);

  const salesConversionQuery = {
    ...query,
    ...{
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: DEFAULT_TASK_TYPES,
    },
  };
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value];
  const { oppNurturingValues } = useOpportunity();

  const tabORs = injectOppNurturingStatusesIntoORs(
    nurturingSubQueryTypes,
    oppNurturingValues,
    ORsActiveBobjectTypes,
  );

  return {
    ...useSalesItems(salesConversionQuery, tabORs, sort, pageAtom, BobjectTypes.Task),
    setSubqueryBobjectType,
  };
};

export const useSalesNurturingAllItems = () => {
  const settings = useUserSettings();
  const accountId = settings.account.id;

  const taskAggregationQuery = getTaskAggregationQuery(DEFAULT_TASK_TYPES, true);

  const getAllItems = () => {
    const searchQuery = {
      ...taskAggregationQuery,
      queries: Object.values(nurturingSubQueryTypes).flat(),
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
export const useSalesNurturingQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const setORsBobjectTypes = useSetRecoilState(ORsActiveBobjectTypesAtom);
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
    [taskTypeField?.id]: [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.NEXT_STEP],
    [automatedEmailField?.id]: [TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO, '__MATCH_EMPTY_ROWS__'],
    [scheduledDateField?.id]: {
      query: {
        lte: getSimpleDate(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
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
    setORsBobjectTypes,
  };
};

export const useSalesNurturingSort = () => {
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
