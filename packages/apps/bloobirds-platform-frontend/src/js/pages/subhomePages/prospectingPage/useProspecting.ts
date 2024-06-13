import { useEffect, useMemo } from 'react';

import { useAggregationSubscription, useSearchSubscription } from '@bloobirds-it/plover';
import {
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  BOBJECT_TYPES,
  BobjectTypes,
} from '@bloobirds-it/types';
import {
  keepPreviousResponse,
  injectReferencesSearchProcess,
  startOfDay,
} from '@bloobirds-it/utils';
import { RecoilValue, useRecoilValue } from 'recoil';
import spacetimeClass from 'spacetime';
import { Middleware } from 'swr';

import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../constants/lead';
import { useEntity } from '../../../hooks';
// eslint-disable-next-line import/no-unresolved
import { useFullSalesEnabled, useProspectingNurturingTab } from '../../../hooks/useFeatureFlags';
import { BobjectApi } from '../../../misc/api/bobject';
import SessionManagerFactory from '../../../misc/session';
import {
  COMPANY_COLUMNS,
  companyStatusesMinusNurturing,
  DEFAULT_SUBQUERY,
  LEAD_COLUMNS,
  LEAD_REFERENCED_COLUMNS,
  leadStatusesMinusNurturing,
  TASK_COLUMNS,
  TASK_REFERENCED_COLUMNS,
} from './useProspecting.constants';

const SessionManager = SessionManagerFactory();

const PAGE_SIZE = 25;

const COLUMNS_BY_BOBJECT_TYPE = {
  [BOBJECT_TYPES.COMPANY]: COMPANY_COLUMNS,
  [BOBJECT_TYPES.LEAD]: LEAD_COLUMNS,
  [BOBJECT_TYPES.TASK]: TASK_COLUMNS,
};

const COLUMNS_REFERENCED_BY_BOBJECT_TYPE: { [x: string]: any } = {
  [BOBJECT_TYPES.COMPANY]: null,
  [BOBJECT_TYPES.LEAD]: LEAD_REFERENCED_COLUMNS,
  [BOBJECT_TYPES.TASK]: TASK_REFERENCED_COLUMNS,
};

export const injectMoreFiltersIntoSubQueries = (query: any, ORs: any, bobjectFields: any) => {
  if (!query || !ORs || !bobjectFields) return;
  const updatedSubqueries = [...ORs];
  const taskCompanyField = bobjectFields?.findByLogicRole('TASK__COMPANY');
  const taskLeadField = bobjectFields?.findByLogicRole('TASK__LEAD');
  const relatedFieldsQueries = Object.keys(query)?.reduce(
    (fieldsQueries: any, fieldKey: string) => {
      if (fieldKey === taskCompanyField?.id) {
        return { ...fieldsQueries, ['TASK__COMPANY']: query[fieldKey] };
      }
      if (fieldKey === taskLeadField?.id) {
        return { ...fieldsQueries, ['TASK__LEAD']: query[fieldKey] };
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
        ORs.forEach((subQuery: any, index: number) => {
          const test: any = {};
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
            } else if (updatedSubqueries[index][key]) {
              queryValue = {
                ...updatedSubqueries[index][key].query,
                ...relatedFieldsQueries[key].query,
              };
            }

            updatedSubqueries[index] = {
              [key]: { query: { ...queryValue }, searchMode: 'SUBQUERY__SEARCH' },
            };
          }
        });
      }
    });

  return updatedSubqueries;
};
//TODO make a less specific function
export const getSubQueriesForTasksInProspectingStage = (
  hasSalesEnabled = false,
  hasFilteredLead = false,
  hasFilteredCompany = false,
  hasNurturingTab = false,
) => {
  if (!hasSalesEnabled) {
    return [{}];
  }

  const baseSubquery = [
    {
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: {
        query: {
          [LEAD_FIELDS_LOGIC_ROLE.STAGE]: ['__MATCH_EMPTY_ROWS__', LEAD_STAGE_LOGIC_ROLE.PROSPECT],
          ...(!hasNurturingTab
            ? { [LEAD_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'] }
            : { [LEAD_FIELDS_LOGIC_ROLE.STATUS]: leadStatusesMinusNurturing }),
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
    },
  ];

  if (!hasFilteredLead) {
    let data = {
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: {
        query: {
          ...(!hasNurturingTab
            ? { [COMPANY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: ['__MATCH_FULL_ROWS__'] }
            : { [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: companyStatusesMinusNurturing }),
          [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
            '__MATCH_EMPTY_ROWS__',
            COMPANY_STAGE_LOGIC_ROLE.PROSPECT,
          ],
        },
        searchMode: 'SUBQUERY__SEARCH',
      },
    };

    if (!hasFilteredCompany) {
      //@ts-ignore
      data = { ...data, [TASK_FIELDS_LOGIC_ROLE.LEAD]: ['__MATCH_EMPTY_ROWS__'] };
    }
    baseSubquery.push(data);
  }

  return baseSubquery;
};

export const getTaskAggregationQuery = (taskTypeLR: string | string[], customQuery?: any) => {
  const hasSalesEnabled = useFullSalesEnabled();
  const hasNurturingTab = useProspectingNurturingTab();
  const spacetime = spacetimeClass();
  return {
    query: {
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: Array.isArray(taskTypeLR) ? taskTypeLR : [taskTypeLR],
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
        TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
        TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
      ],
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
        query: {
          lte: spacetime.endOf('day').format('iso'),
        },
        searchMode: 'RANGE__SEARCH',
      },
      [TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL]: [
        '__MATCH_EMPTY_ROWS__',
        TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO,
      ],
      [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'],
      ...(customQuery || {}),
    },
    queries: getSubQueriesForTasksInProspectingStage(
      hasSalesEnabled,
      false,
      false,
      hasNurturingTab,
    ),
    formFields: false,
  };
};

export const getCompanyAggregationQuery = (companyStatusLR: string | string[]) => {
  const hasSalesEnabled = useFullSalesEnabled();
  return {
    query: {
      [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
      ...(hasSalesEnabled
        ? {
            [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
              '__MATCH_EMPTY_ROWS__',
              COMPANY_STAGE_LOGIC_ROLE.PROSPECT,
            ],
          }
        : {}),
      [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: Array.isArray(companyStatusLR)
        ? companyStatusLR
        : [companyStatusLR],
    },
    formFields: false,
  };
};

export const getLeadAggregationQuery = (leadStatusLR: string | string[]) => {
  const hasSalesEnabled = useFullSalesEnabled();
  return {
    query: {
      [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
      ...(hasSalesEnabled
        ? {
            [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [
              '__MATCH_EMPTY_ROWS__',
              LEAD_STAGE_LOGIC_ROLE.PROSPECT,
            ],
          }
        : {}),
      [LEAD_FIELDS_LOGIC_ROLE.STATUS]: Array.isArray(leadStatusLR) ? leadStatusLR : [leadStatusLR],
    },
    formFields: false,
  };
};

export const useProspectingItems = (
  query: { [x: string]: any },
  tabSort: any,
  tabPageAtom: RecoilValue<any>,
  bobjectType = BobjectTypes.Task,
  compoundableQueries?: any,
  middlewares?: Middleware[],
) => {
  const bobjectFields = useEntity('bobjectFields');

  let queries = compoundableQueries;
  if (compoundableQueries && bobjectType === BobjectTypes.Task)
    queries = injectMoreFiltersIntoSubQueries(query, compoundableQueries, bobjectFields);
  const page = tabPageAtom ? useRecoilValue(tabPageAtom) : null;
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType as BobjectTypes.Company | BobjectTypes.Lead];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];

  const { data, error, isValidating } = useSearchSubscription(
    query && {
      query,
      // @ts-ignore Improve this
      queries: queries?.length > 0 ? queries : DEFAULT_SUBQUERY,
      columns,
      referencedColumns,
      sort: tabSort,
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      formFields: true,
      injectReferences: true,
    },
    bobjectType,
    middlewares,
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const items = useMemo<any[]>(() => {
    if (data?.data) {
      return injectReferencesSearchProcess(data?.data)?.contents;
    }
    return [];
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  return {
    items,
    isLoading: isValidating,
    totalMatching,
  };
};

export const requestFutureTasks = (salesFeatureEnabled: boolean, filteredUsers: any[]) => {
  const query = {
    [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: filteredUsers
      ? filteredUsers
      : SessionManager?.getUser()?.id,
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
  };

  if (salesFeatureEnabled) {
    query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = ['__MATCH_EMPTY_ROWS__'];
  }

  return BobjectApi.request()
    .Task()
    .search({
      query,
      formFields: true,
      columns: [
        TASK_FIELDS_LOGIC_ROLE.TITLE,
        TASK_FIELDS_LOGIC_ROLE.COMPANY,
        TASK_FIELDS_LOGIC_ROLE.LEAD,
      ],
      injectReferences: false,
      page: 0,
      pageSize: 10000,
    })
    .then(response => response.contents);
};

export const useProspectingGlobalAggregation = () => {
  const { data } = useAggregationSubscription(
    getTaskAggregationQuery([
      TASK_TYPE.PROSPECT_CADENCE,
      TASK_TYPE.NEXT_STEP,
      TASK_TYPE.CONTACT_BEFORE_MEETING,
    ]),
    BobjectTypes.Task,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useReadyToProspectAndFindingLeadsCompanies = () => {
  const { data } = useAggregationSubscription(
    getCompanyAggregationQuery([
      COMPANY_STATUS_LOGIC_ROLE.READY_TO_PROSPECT,
      COMPANY_STATUS_LOGIC_ROLE.FINDING_LEADS,
    ]),
    BobjectTypes.Company,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};
