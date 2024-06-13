import { useEffect, useMemo } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  BOBJECT_TYPES,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_ACTION,
} from '@bloobirds-it/types';
import { injectReferencesSearchProcess, getSimpleDate } from '@bloobirds-it/utils';
import {
  atom,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { activeCompanyAtom } from '../../../../hooks/useActiveCompany';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';

type QuerySelectorParams = {
  companyId: string | undefined;
  leadId: string | undefined;
  opportunityId: string | undefined;
  customQuery?: object;
};

export const TASK_COLUMNS = [
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  TASK_FIELDS_LOGIC_ROLE.STATUS,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE,
  TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
  TASK_FIELDS_LOGIC_ROLE.COMPLETED_DATE,
  TASK_FIELDS_LOGIC_ROLE.TASK_TYPE,
  TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED,
  TASK_FIELDS_LOGIC_ROLE.DESCRIPTION,
  TASK_FIELDS_LOGIC_ROLE.CADENCE,
  TASK_FIELDS_LOGIC_ROLE.AUTOMATION_ERROR,
  TASK_FIELDS_LOGIC_ROLE.AUTOMATION_PAUSE_REASON,
  TASK_ACTION.CALL,
  TASK_ACTION.EMAIL,
  TASK_ACTION.LINKEDIN_MESSAGE,
  TASK_ACTION.AUTOMATED_EMAIL,
  TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
  TASK_FIELDS_LOGIC_ROLE.EMAIL_METADATA,
  TASK_FIELDS_LOGIC_ROLE.AUTOMATED_EMAIL_TO,
  TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS,
  TASK_FIELDS_LOGIC_ROLE.PRIORITY,
];

export const TASK_REFERENCED_COLUMNS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
  COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE,
  COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  LEAD_FIELDS_LOGIC_ROLE.STATUS,
  LEAD_FIELDS_LOGIC_ROLE.SOURCE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
];

const PAGE_SIZE = 20;

const typeFilterAtom = atom({
  key: 'tasksTabTypeFilter',
  default: [],
});

const isFullSalesEnabledAtom = atom({
  key: 'tasksTabIsFullSalesEnabled',
  default: false,
});

const pageAtom = atom({
  key: 'tasksTabPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'tasksTabHasNextPage',
  default: true,
});

const currentItemsAtom = atom({
  key: 'tasksTabCurrentItemsAtom',
  default: [],
});

const overdueItemsAtom = atom({
  key: 'tasksTabOverdueItemsAtom',
  default: [],
});

const completedItemsAtom = atom({
  key: 'tasksTabCompletedItemsAtom',
  default: [],
});

const responseCurrentAtom = selector({
  key: 'tasksTabCurrentResponse',
  get: () => null,
  set: ({ set }, response) => {
    const { contents }: any = response;
    set(currentItemsAtom, contents);
  },
});

const responseOverdueAtom = selector({
  key: 'tasksTabOverdueResponse',
  get: () => null,
  set: ({ set }, response) => {
    const { contents }: any = response;
    set(overdueItemsAtom, contents);
  },
});

const responseCompletedAtom = selector({
  key: 'tasksTabCompletedResponse',
  get: () => null,
  set: ({ set }, response) => {
    const { contents }: any = response;
    set(completedItemsAtom, contents);
  },
});

const filtersAtom = selector({
  key: 'tasksTabFilters',
  get: ({ get }) => {
    const typeFilter = get(typeFilterAtom);

    return {
      type: typeFilter,
    };
  },
  set: ({ set, reset }, value: any) => {
    if (value instanceof DefaultValue) {
      reset(typeFilterAtom);
    } else {
      if (value.type) set(typeFilterAtom, value.type);
    }
    reset(hasNextPageAtom);
    reset(pageAtom);
  },
});

const queryAtom = selectorFamily<any, QuerySelectorParams>({
  key: 'tasksTabQuery',
  get: data => ({ get }) => {
    const { companyId, leadId, opportunityId, customQuery }: QuerySelectorParams = data;
    const filters = get(filtersAtom);
    const salesFeatureEnabled = get(isFullSalesEnabledAtom);

    return {
      ...(companyId ? { [TASK_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] } : {}),
      ...(salesFeatureEnabled
        ? { [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunityId ? [opportunityId] : undefined }
        : { [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_EMPTY_ROWS__'] }),
      ...(leadId ? { [TASK_FIELDS_LOGIC_ROLE.LEAD]: [leadId] } : {}),
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: filters.type,
      ...customQuery,
    };
  },
});

export const useTasksTabPage = () => {
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

export const useTasksTabFilters = () => {
  const typeFilter = useRecoilValue(typeFilterAtom);

  const resetTypeFilter = useResetRecoilState(typeFilterAtom);
  const resetAllFilters = useResetRecoilState(filtersAtom);
  const setFilters = useSetRecoilState(filtersAtom);

  return {
    typeFilter,
    resetTypeFilter,
    resetAllFilters,
    setTypeFilter: (value: []) => {
      setFilters({ type: value });
    },
  };
};

export const useCurrentTasks = ({ companyId, leadId, opportunityId }: QuerySelectorParams) => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const setIsFullSalesEnabled = useSetRecoilState(isFullSalesEnabledAtom);
  const company = useRecoilValue(activeCompanyAtom);
  const customQuery = {
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO],
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        gte: getSimpleDate(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
  };
  const query = useRecoilValue(queryAtom({ companyId, leadId, opportunityId, customQuery }));
  const page = useRecoilValue(pageAtom);
  const setResponse = useSetRecoilState(responseCurrentAtom);
  const items = useRecoilValue(currentItemsAtom);
  const resetItems = useResetRecoilState(currentItemsAtom);
  const { data, error, isLoading } = useSearchSubscription(
    !company.isFetching && {
      query,
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: 'DESC',
        },
        {
          field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
          direction: 'ASC',
        },
      ],
      formFields: true,
      injectReferences: true,
      pageSize: page ? page * PAGE_SIZE : 1000,
      page: 0,
    },
    BOBJECT_TYPES.TASK,
  );

  useEffect(() => {
    setIsFullSalesEnabled(isFullSalesEnabled);
  }, [isFullSalesEnabled]);

  useEffect(() => {
    setIsFullSalesEnabled(isFullSalesEnabled);
  }, [isFullSalesEnabled]);

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { items, isLoading, totalMatching, resetItems };
};

export const useOverdueTasks = ({ companyId, leadId, opportunityId }: QuerySelectorParams) => {
  const customQuery = {
    [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: {
      query: {
        lt: getSimpleDate(new Date()),
      },
      searchMode: 'RANGE__SEARCH',
    },
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE,
    ],
  };
  const query = useRecoilValue(queryAtom({ companyId, leadId, opportunityId, customQuery }));
  const page = useRecoilValue(pageAtom);
  const company = useRecoilValue(activeCompanyAtom);
  const setResponse = useSetRecoilState(responseOverdueAtom);
  const items = useRecoilValue(overdueItemsAtom);
  const resetItems = useResetRecoilState(overdueItemsAtom);

  const { data, error, isLoading } = useSearchSubscription(
    !company.isFetching && {
      query: query,
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
      formFields: true,
      injectReferences: true,
      pageSize: page ? page * PAGE_SIZE : 1000,
      page: 0,
    },
    BOBJECT_TYPES.TASK,
  );

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { items, isLoading, totalMatching, resetItems };
};

export const useCompletedTasks = ({ companyId, leadId, opportunityId }: QuerySelectorParams) => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const setIsFullSalesEnabled = useSetRecoilState(isFullSalesEnabledAtom);
  const company = useRecoilValue(activeCompanyAtom);
  const customQuery = {
    [TASK_FIELDS_LOGIC_ROLE.STATUS]: [
      TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED,
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
      TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
    ],
  };
  const query = useRecoilValue(queryAtom({ companyId, leadId, opportunityId, customQuery }));
  const page = useRecoilValue(pageAtom);
  const setResponse = useSetRecoilState(responseCompletedAtom);
  const items = useRecoilValue(completedItemsAtom);
  const resetItems = useResetRecoilState(completedItemsAtom);
  const { data, error, isLoading } = useSearchSubscription(
    !company.isFetching && {
      query,
      columns: TASK_COLUMNS,
      sort: [
        {
          field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
          direction: 'DESC',
        },
        {
          field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
          direction: 'ASC',
        },
      ],
      formFields: true,
      injectReferences: true,
      pageSize: page ? page * PAGE_SIZE : 1000,
      page: 0,
    },
    BOBJECT_TYPES.TASK,
  );

  useEffect(() => {
    setIsFullSalesEnabled(isFullSalesEnabled);
  }, [isFullSalesEnabled]);

  useEffect(() => {
    setIsFullSalesEnabled(isFullSalesEnabled);
  }, [isFullSalesEnabled]);

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      const extendedResponse = injectReferencesSearchProcess(data?.data);
      setResponse(extendedResponse);
    }
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);
  return { items, isLoading, totalMatching, resetItems };
};
