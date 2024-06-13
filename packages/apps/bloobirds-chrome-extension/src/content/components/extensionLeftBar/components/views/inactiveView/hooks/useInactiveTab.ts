import { useMemo, useState } from 'react';

import { useDidMountEffect, useIsB2CAccount } from '@bloobirds-it/hooks';
import { useAggregationSubscription } from '@bloobirds-it/plover';
import {
  BobjectPicklistValueEntity,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
  SearchSort,
} from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useSubscribeListeners } from '../../../../../contactView/hooks/useSubscribeListeners';
import { useExtensionContext } from '../../../../../context';
import { TypeSearch } from '../../../../extensionLeftBar.utils';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { BASE_SEARCH_REQUEST } from '../../view.utils';
import {
  COLUMNS_BY_BOBJECT_TYPE,
  COLUMNS_REFERENCED_BY_BOBJECT_TYPE,
  getSortFields,
  INACTIVE_FIELDS_LOGIC_ROLE,
  INACTIVE_YES_FIELDS_LOGIC_ROLE,
  SALES_STATUS_FIELDS_LOGIC_ROLE,
  STATUS_FIELDS_LOGIC_ROLE,
  STATUS_VALUES_LOGIC_ROLE,
} from '../inactiveTab.constants';

const PAGE_SIZE = 25;

const getQueries = (tabBobject: BobjectTypes, dataModel: any) => {
  let statuses;
  if (tabBobject !== BobjectTypes.Opportunity) {
    statuses = dataModel
      .findValuesByFieldLogicRole(SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject])
      ?.filter(salesStatus => !['Discarded', 'On Hold', 'Client'].includes(salesStatus?.name))
      ?.map((status: BobjectPicklistValueEntity) => status?.id);
  } else {
    statuses = dataModel
      .findValuesByFieldLogicRole(SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject])
      ?.filter(
        (salesStatus: BobjectPicklistValueEntity) =>
          ![
            OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
            OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
          ].includes(salesStatus?.logicRole as OPPORTUNITY_STATUS_LOGIC_ROLE),
      )
      ?.map((status: BobjectPicklistValueEntity) => status?.id);
  }

  if (tabBobject === BobjectTypes.Opportunity) {
    return [
      {
        [SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject]]: statuses,
      },
    ];
  }

  return [
    {
      [STATUS_FIELDS_LOGIC_ROLE[tabBobject]]: STATUS_VALUES_LOGIC_ROLE[tabBobject],
    },
    {
      [SALES_STATUS_FIELDS_LOGIC_ROLE[tabBobject]]: statuses,
    },
  ];
};

export const fetchTasks = (
  bobjectType: BobjectTypes,
  query: { [x: string]: any },
  sort: SearchSort,
  accountId: string,
  page: number,
  dataModel: any,
  type: TypeSearch = TypeSearch.SEARCH,
  setIsLoading?: (isLoading: boolean) => void,
) => {
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];
  const queries = getQueries(bobjectType, dataModel);

  return api
    .post(`/bobjects/${accountId}/${bobjectType}/${type}`, {
      query,
      queries,
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

const getData = (key: string, page: number) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const { tabBobject, query, sort, setIsLoading } = useSubhomeContext();

  const sortValues = getSortFields(tabBobject)[sort];

  const { data, mutate, isValidating } = useSWR(
    key,
    () =>
      fetchTasks(
        tabBobject,
        query,
        sortValues,
        accountId,
        page,
        dataModel,
        TypeSearch.SEARCH,
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

export const useInactiveItems = (bobjectType: BobjectTypes) => {
  const [page, setPage] = useState(1);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const { data, mutate, isValidating } = getData(
    `/bobjects/inactive/${bobjectType}/search/${page}`,
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

export const useInactiveGlobalAggregation = () => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;
  const isB2CAccount = useIsB2CAccount();

  const useGetQueryByBobject = (tabBobject: BobjectTypes) => {
    const query = {
      [FIELDS_LOGIC_ROLE[tabBobject].ASSIGNED_TO]: userId,
      [INACTIVE_FIELDS_LOGIC_ROLE[tabBobject]]: [INACTIVE_YES_FIELDS_LOGIC_ROLE[tabBobject]],
    };

    const columns = COLUMNS_BY_BOBJECT_TYPE[tabBobject];
    const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[tabBobject];
    const queries = getQueries(tabBobject, dataModel);
    const { data } = useAggregationSubscription(
      tabBobject != BobjectTypes.Company || !isB2CAccount
        ? {
            query,
            queries,
            columns,
            referencedColumns,
            ...BASE_SEARCH_REQUEST,
            page: 0,
            pageSize: 1000,
            sort: undefined,
          }
        : null,
      tabBobject,
      [keepPreviousResponse],
    );

    return data?.data?.contents[0]?.value || 0;
  };

  return (
    useGetQueryByBobject(BobjectTypes.Company) +
    useGetQueryByBobject(BobjectTypes.Lead) +
    useGetQueryByBobject(BobjectTypes.Opportunity)
  );
};
