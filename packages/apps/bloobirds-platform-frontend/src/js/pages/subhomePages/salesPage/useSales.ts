import { useEffect, useMemo } from 'react';

import { useAggregationSubscription, useSearchSubscription } from '@bloobirds-it/plover';
import {
  Bobject,
  BobjectTypes,
  Direction,
  FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  TASK_AUTOMATED_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  injectReferencesSearchProcess,
  endOfDay,
  isAfterDate,
  isAfterToday,
  isSameDayDate,
  isToday,
  startOfDay,
} from '@bloobirds-it/utils';
import { RecoilValueReadOnly, useRecoilValue } from 'recoil';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { useEntity } from '../../../hooks';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import SessionManagerFactory from '../../../misc/session';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import { keepPreviousResponse } from '../../../utils/swr.utils';
import { COMPANY_COLUMNS, LEAD_COLUMNS } from '../prospectingPage/useProspecting.constants';
import {
  OPPORTUNITY_COLUMNS,
  OPPORTUNITY_REFERENCED_COLUMNS,
  TASK_COLUMNS,
  TASK_REFERENCED_COLUMNS,
} from './useSales.constants';

const SessionManager = SessionManagerFactory();

const PAGE_SIZE = 50;

export const COLUMNS_BY_BOBJECT_TYPE = {
  [BobjectTypes.Opportunity]: OPPORTUNITY_COLUMNS,
  [BobjectTypes.Lead]: LEAD_COLUMNS,
  [BobjectTypes.Company]: COMPANY_COLUMNS,
  [BobjectTypes.Task]: TASK_COLUMNS,
};

export const COLUMNS_REFERENCED_BY_BOBJECT_TYPE = {
  [BobjectTypes.Opportunity]: OPPORTUNITY_REFERENCED_COLUMNS,
  [BobjectTypes.Task]: TASK_REFERENCED_COLUMNS,
};

export const getTaskAggregationQuery = (taskTypeLR: string[], hasSalesEnabled: boolean) => ({
  query: {
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: [SessionManager?.getUser()?.id],
    [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: Array.isArray(taskTypeLR) ? taskTypeLR : [taskTypeLR],
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
    ],
    [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
      'TASK__IS_ACTION_AUTOMATED_EMAIL__NO',
      '__MATCH_EMPTY_ROWS__',
    ],
    ...(!hasSalesEnabled ? { [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'] } : {}),
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        lte: endOfDay(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
  },

  formFields: false,
});

export const getButtonMarkAsDone = ({ task, company }: { task: Bobject; company: Bobject }) => {
  const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)
    ?.valueLogicRole as TASK_TYPE;
  const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)?.valueLogicRole;
  const date = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const companyLastAttemptDate = getValueFromLogicRole(
    company,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );
  const isAutomated = automated === TASK_AUTOMATED_VALUE.AUTOMATED_YES;
  const isOverdue = status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE;

  const defaultConfig = {
    disabled: false,
    tooltip: 'Mark as done',
  };

  if (
    isOverdue &&
    !!type &&
    ![TASK_TYPE.NEXT_STEP, TASK_TYPE.CONTACT_BEFORE_MEETING].includes(type)
  ) {
    if (!isAutomated) {
      return defaultConfig;
    }

    return {
      disabled: !(companyLastAttemptDate && isToday(companyLastAttemptDate)),
      tooltip:
        'When you complete this task it will be marked as overdue. If you have several, ' +
        'they will all be marked. In that case we recommend you to reschedule the cadence.',
    };
  }
  if (!!type && ![TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.START_CADENCE].includes(type)) {
    return defaultConfig;
  }
  if (
    type === TASK_TYPE.START_CADENCE &&
    companyLastAttemptDate &&
    date &&
    (isAfterDate(companyLastAttemptDate, new Date(date)) ||
      isSameDayDate(companyLastAttemptDate, new Date(date)))
  ) {
    return defaultConfig;
  }
  if (type === TASK_TYPE.START_CADENCE) {
    return {
      disabled: true,
      tooltip: 'Make at least one attempt to mark as done',
    };
  }
  if (date && isToday(date)) {
    if (
      companyLastAttemptDate &&
      (isAfterDate(companyLastAttemptDate, new Date(date)) ||
        isSameDayDate(companyLastAttemptDate, new Date(date)))
    ) {
      return defaultConfig;
    }
    if (!isAutomated) {
      return defaultConfig;
    }
    return {
      disabled: true,
      tooltip: 'Make at least one attempt to mark as done',
    };
  }
  if (isAfterToday(new Date(date))) {
    return {
      disabled: true,
      tooltip: 'This is a task for the future. You cannot mark it as done.',
    };
  }
  return {
    disabled: true,
    tooltip: 'This task cannot be marked as done',
  };
};

export const BASE_SALES_SEARCH_REQUEST = {
  formFields: true,
  injectReferences: true,
};

const injectMoreFiltersIntoSubQueries = (query, subQueries, bobjectFields) => {
  if (!query || !subQueries || !bobjectFields) return;
  const updatedSubqueries = [...subQueries];
  const taskCompanyField = bobjectFields?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.COMPANY);
  const taskLeadField = bobjectFields?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.LEAD);
  const taskOpportunityField = bobjectFields?.findByLogicRole(TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  const relatedFieldsQueries = Object.keys(query)?.reduce(
    (fieldsQueries: any, fieldKey: string) => {
      if (fieldKey === taskCompanyField?.id) {
        return { ...fieldsQueries, ['TASK__COMPANY']: query[fieldKey] };
      }
      if (fieldKey === taskLeadField?.id) {
        return { ...fieldsQueries, ['TASK__LEAD']: query[fieldKey] };
      }
      if (fieldKey === taskOpportunityField?.id) {
        return { ...fieldsQueries, [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: query[fieldKey] };
      }
      return fieldsQueries;
    },
    {},
  );

  Object.entries(relatedFieldsQueries)
    .filter(entry => {
      const [, value] = entry;
      return value;
    })
    .forEach((moreFiltersEntry, moreFilterIndex) => {
      const [key, value] = moreFiltersEntry;
      if (value) {
        subQueries.forEach(
          (subQuery: { [x: string]: { query: any }[] | string[] }, index: number) => {
            const test: { [key: string]: any } = {};
            if (subQuery[key]) {
              if (subQuery[key][0] === '__MATCH_FULL_ROWS__') {
                test[key] = value;
              } else if (subQuery[key][0] === '__MATCH_EMPTY_ROWS__') return;
              let queryValue;
              if (moreFilterIndex === 0) {
                queryValue = {
                  ...subQuery[key].query,
                  ...relatedFieldsQueries[key].query,
                };
              } else {
                queryValue = {
                  ...updatedSubqueries[index][key].query,
                  ...relatedFieldsQueries[key].query,
                };
              }

              updatedSubqueries[index] = {
                [key]: { query: { ...queryValue }, searchMode: 'SUBQUERY__SEARCH' },
              };
            }
          },
        );
      }
    });

  return updatedSubqueries;
};

export const useSalesItems = (
  query: { [x: string]: any },
  tabORs: any,
  tabSort: Array<{ field: string; direction: Direction }>,
  tabPageAtom: RecoilValueReadOnly<number>,
  bobjectType: BobjectTypes.Opportunity | BobjectTypes.Task,
) => {
  const bobjectFields = useEntity('bobjectFields');
  const hasSalesEnabled = useFullSalesEnabled();

  let queries = hasSalesEnabled
    ? tabORs
    : [{ [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'] }];
  if (hasSalesEnabled && bobjectType === BobjectTypes.Task)
    queries = injectMoreFiltersIntoSubQueries(query, tabORs, bobjectFields);
  const page = tabPageAtom ? useRecoilValue(tabPageAtom) : null;
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];
  const { data, error, isValidating } = useSearchSubscription(
    {
      query,
      /*@ts-ignore we should add this typing to the searchRequest typing in plover*/
      queries: queries?.length > 0 ? queries : undefined,
      columns,
      referencedColumns,
      sort: tabSort,
      ...BASE_SALES_SEARCH_REQUEST,
      pageSize: page ? page * PAGE_SIZE : 1000,
      page: 0,
    },
    bobjectType,
    [keepPreviousResponse],
  );

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const items = useMemo<any[]>(() => {
    if (data?.data) {
      return injectReferencesSearchProcess(data?.data).contents;
    }
    return [];
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { items, isLoading: isValidating, totalMatching };
};

export const useSalesFutureTasks = (
  filteredUser: string | Array<string> = SessionManager?.getUser()?.id,
) => {
  const { data: { data: { contents: futureTasks } = {} } = {} } = useSearchSubscription(
    {
      query: {
        [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: Array.isArray(filteredUser)
          ? filteredUser
          : [filteredUser],
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: [
          TASK_TYPE.PROSPECT_CADENCE,
          TASK_TYPE.NEXT_STEP,
          TASK_TYPE.START_CADENCE,
        ],
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
          query: {
            gte: startOfDay(new Date()),
          },
          searchMode: 'RANGE__SEARCH',
        },
      },
      //TODO add columns to plover SearchRequest
      //@ts-ignore
      columns: [
        TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
        TASK_FIELDS_LOGIC_ROLE.COMPANY,
        TASK_FIELDS_LOGIC_ROLE.LEAD,
      ],
      pageSize: 10000,
      page: 0,
    },
    BobjectTypes.Task,
  );
  return futureTasks;
};

export const getSalesCompaniesAndLeadsAggregationQuery = (
  bobjectType: Exclude<MainBobjectTypes, BobjectTypes.Opportunity>,
) => ({
  query: {
    [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: SessionManager?.getUser()?.id,
    [FIELDS_LOGIC_ROLE[bobjectType].STAGE]: `${bobjectType.toUpperCase()}__STAGE__SALES`,
  },
  formFields: false,
});

export const useSalesGlobalAggregation = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const { data } = useAggregationSubscription(
    //@ts-ignore need to update aggregation subscription
    getTaskAggregationQuery(
      [TASK_TYPE.MEETING, TASK_TYPE.NEXT_STEP, TASK_TYPE.PROSPECT_CADENCE],
      hasSalesEnabled,
    ),
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};
