import { useEffect, useMemo, useState } from 'react';

import { useDidMountEffect, useIsB2CAccount, useUserHelpers } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectTypes,
  DataModelResponse,
  ExtensionHelperKeys,
  FIELDS_LOGIC_ROLE,
  SearchSort,
} from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useSubscribeListeners } from '../../../../../contactView/hooks/useSubscribeListeners';
import { useExtensionContext } from '../../../../../context';
import { TypeSearch } from '../../../../extensionLeftBar.utils';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import {
  SALES_STATUS_FIELDS_LOGIC_ROLE,
  STATUS_FIELDS_LOGIC_ROLE,
} from '../../inactiveView/inactiveTab.constants';
import { BASE_SEARCH_REQUEST } from '../../view.utils';
import {
  COLUMNS_BY_BOBJECT_TYPE,
  COLUMNS_REFERENCED_BY_BOBJECT_TYPE,
  getSortFields,
} from '../pipelineTab.constants';

const PAGE_SIZE = 25;

export const fetchBobjects = (
  bobjectType: BobjectTypes,
  query: { [x: string]: any },
  queries: { [x: string]: any },
  sort: SearchSort,
  accountId: string,
  page: number,
  type: TypeSearch = TypeSearch.SEARCH,
  querieAggregation?: { [x: string]: any },
  setIsLoading?: (value: boolean) => void,
) => {
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];

  let withNestedKeys;
  if (queries && Object.keys(queries).length > 0) {
    withNestedKeys = Object.entries(queries).map(entry => {
      return { [entry[0]]: entry[1] };
    });
  }

  return api
    .post(`/bobjects/${accountId}/${bobjectType}/${type}`, {
      query,
      queries: querieAggregation || (withNestedKeys ? withNestedKeys : undefined),
      columns,
      referencedColumns,
      ...BASE_SEARCH_REQUEST,
      page: 0,
      pageSize: page ? page * PAGE_SIZE : 1000,
      sort: sort ? [sort] : undefined,
    })
    .then(response => {
      setIsLoading?.(false);
      return response;
    });
};

const parseStatusQueries = (
  query: { [x: string]: any },
  subquery: { [x: string]: any },
  tabBobject: BobjectTypes,
  dataModel: DataModelResponse,
) => {
  const statusFieldId = dataModel.findFieldByLogicRole(STATUS_FIELDS_LOGIC_ROLE[tabBobject])?.id;
  const salesStatusFieldId = dataModel.findFieldByLogicRole(
    SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject],
  )?.id;
  const prospectingStatuses = dataModel
    .findValuesByFieldLogicRole(STATUS_FIELDS_LOGIC_ROLE[tabBobject])
    ?.map(({ id }) => id);
  const salesStatuses = dataModel
    .findValuesByFieldLogicRole(SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject])
    ?.map(({ id }) => id);

  const statusQueryValue = query[statusFieldId];
  if (!statusQueryValue)
    return {
      query,
      subquery,
    };

  const hasProspectingStatus = prospectingStatuses.some(statusValue =>
    statusQueryValue.includes(statusValue),
  );
  const hasSalesStatus = salesStatuses.some(statusValue => statusQueryValue.includes(statusValue));

  if (hasProspectingStatus && hasSalesStatus) {
    delete query[statusFieldId];
    subquery = {
      [statusFieldId]: statusQueryValue.filter(statusValue =>
        prospectingStatuses.includes(statusValue),
      ),
      [salesStatusFieldId]: statusQueryValue.filter(statusValue =>
        salesStatuses.includes(statusValue),
      ),
    };
  } else if (hasSalesStatus && !hasProspectingStatus) {
    delete Object.assign(query, { [salesStatusFieldId]: query[statusFieldId] })[statusFieldId];
  }
  return {
    query,
    subquery,
  };
};

const getData = (key: string, page: number) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const { tabBobject, query, subquery, sort, setIsLoading } = useSubhomeContext();

  const sortValues = getSortFields(tabBobject)[sort];

  const { query: parsedQuery, subquery: parsedSubquery } = parseStatusQueries(
    query,
    subquery,
    tabBobject,
    dataModel,
  );

  const { data, mutate, isValidating } = useSWR(
    key,
    () =>
      fetchBobjects(
        tabBobject,
        parsedQuery,
        parsedSubquery,
        sortValues,
        accountId,
        page,
        TypeSearch.SEARCH,
        null,
        setIsLoading,
      ),
    {
      use: [keepPreviousResponse],
    },
  );

  useDidMountEffect(() => {
    setIsLoading?.(true);
    mutate();
  }, [query, sort]);

  useSubscribeListeners(tabBobject, mutate);

  return { data, mutate, isValidating };
};

export const usePipelinesItems = (bobjectType: BobjectTypes) => {
  const [page, setPage] = useState(1);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const { data, mutate, isValidating } = getData(
    `/bobjects/pipeline/${bobjectType}/search/${page}`,
    page,
  );
  const items = useMemo<any[]>(() => {
    if (data?.data) {
      return injectReferencesSearchProcess(data?.data).contents;
    }
    return [];
  }, [data]);

  const totalMatching = useMemo(() => data?.data.totalMatching, [data]);

  return { items, isLoading: isValidating, totalMatching, mutate, fetchNextPage };
};

const useGetQueryByBobject = ({
  bobjectType,
  assignedDate,
  userId,
}: {
  bobjectType: BobjectTypes;
  assignedDate?: Date;
  userId: string;
}) => {
  const isB2CAccount = useIsB2CAccount();
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];

  const query = {
    [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: userId,
  };

  if (assignedDate) {
    query[FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_DATE] = {
      ['query']: { gte: assignedDate },
      searchMode: 'RANGE__SEARCH',
    };
  }

  const { data } = useAggregationSubscription(
    bobjectType != BobjectTypes.Company || !isB2CAccount
      ? {
          query,
          columns,
          referencedColumns,
          ...BASE_SEARCH_REQUEST,
          page: 0,
          pageSize: 1000,
          sort: undefined,
        }
      : null,
    bobjectType,
    [keepPreviousResponse],
  );

  return { data };
};

export const getPipelineAggregation = ({
  lastAssignedDate,
  bobjectType,
}: {
  lastAssignedDate?: Date | undefined;
  bobjectType: BobjectTypes;
}) => {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const { data } = useGetQueryByBobject({
    bobjectType,
    userId,
    assignedDate: lastAssignedDate,
  });

  return {
    count: lastAssignedDate ? data?.data?.contents[0]?.value || 0 : 0,
  };
};

export const useLastVisitedPipelineTab = (
  bobjectType: BobjectTypes,
): { count: number; resetCount: () => void; date: Date } => {
  const [date, setDate] = useState<Date>();
  const [stringDate, setStringDate] = useState<string>();
  const { deleteHelper, helpers, forceSave } = useUserHelpers();

  const key = ExtensionHelperKeys[`PIPELINE_TAB_${bobjectType.toUpperCase()}_LAST_VISIT`];
  const dateKeyValue = helpers ? helpers[key] : undefined;

  useEffect(() => {
    if (dateKeyValue !== stringDate && dateKeyValue) {
      setStringDate(dateKeyValue);
      setDate(new Date(dateKeyValue));
    }
  }, [dateKeyValue]);

  const { count } = getPipelineAggregation({ bobjectType, lastAssignedDate: date });

  const resetCount = async () => {
    await deleteHelper(key);
    await forceSave(key);
  };

  return { count, resetCount, date };
};

export const usePipelineGlobalAggregation = () => {
  const {
    count: companyCount,
    resetCount: resetCompanyCount,
    date: companyDate,
  } = useLastVisitedPipelineTab(BobjectTypes.Company);
  const {
    count: leadCount,
    resetCount: resetLeadCount,
    date: leadDate,
  } = useLastVisitedPipelineTab(BobjectTypes.Lead);
  const {
    count: opportunityCount,
    resetCount: resetOpportunityCount,
    date: opportunityDate,
  } = useLastVisitedPipelineTab(BobjectTypes.Opportunity);

  const pipelineCounters = {
    [BobjectTypes.Company]: companyCount,
    [BobjectTypes.Lead]: leadCount,
    [BobjectTypes.Opportunity]: opportunityCount,
  };
  const pipelineLastVisitDates = {
    [BobjectTypes.Company]: companyDate,
    [BobjectTypes.Lead]: leadDate,
    [BobjectTypes.Opportunity]: opportunityDate,
  };

  const updateLastVisitedPipeline = (type: BobjectTypes) => {
    switch (type) {
      case BobjectTypes.Lead:
        resetLeadCount();
        break;
      case BobjectTypes.Opportunity:
        resetOpportunityCount();
        break;
      case BobjectTypes.Company:
        resetCompanyCount();
        break;
      default:
        break;
    }
  };

  return { pipelineCounters, pipelineLastVisitDates, updateLastVisitedPipeline };
};
