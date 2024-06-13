import React, { useEffect, useMemo } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { injectReferencesSearchProcess } from '@bloobirds-it/utils';
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import useSWR from 'swr';

import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/opportunity';
import { useActiveUser } from '../../../../../hooks';
import { Bobject } from '../../../../../typings/bobjects';
import { api } from '../../../../../utils/api';
import {
  BASE_SALES_SEARCH_REQUEST,
  COLUMNS_BY_BOBJECT_TYPE,
  COLUMNS_REFERENCED_BY_BOBJECT_TYPE,
} from '../../useSales';
import { useSalesQuerySortingState } from '../useSalesAllMyOpps';

const PAGE_SIZE = 20;

const pageByStatusAtom = atomFamily({
  key: 'pageByStatusAtomKey',
  default: 1,
});

const itemsAtom = atom({
  key: 'salesItemsKanbanAtom',
  default: undefined,
});

const responseAtom = selectorFamily({
  key: 'salesResponse',
  get: () => null,
  set: family => ({ get, set }, response: any) => {
    const status = family.toString();
    const currentItems: any = get(itemsAtom);

    set(itemsAtom, {
      ...currentItems,
      [status]: response?.contents,
    });
  },
});

const baseQueryAtom = atom({
  key: 'baseQueryAtom',
  default: {},
});

const queryWithStatusAtom = selectorFamily({
  key: 'queryWithStatusAtom',
  get: family => ({ get }) => {
    const queryAtom: any = get(baseQueryAtom);
    const query = {
      ...queryAtom,
    };

    query[OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS] = family;

    return query;
  },
});

// This hooks is an extensions of useSales to fetch opps by status, so all the constants are taken from there
export const useSalesKanbanItems = (family: string) => {
  const { query, sort } = useSalesQuerySortingState();
  const bobjectType = BOBJECT_TYPES.OPPORTUNITY;
  const columns = COLUMNS_BY_BOBJECT_TYPE[bobjectType];
  const referencedColumns = COLUMNS_REFERENCED_BY_BOBJECT_TYPE[bobjectType];
  const resetItems = useResetRecoilState(itemsAtom);
  const setBaseQueryAtom = useSetRecoilState(baseQueryAtom);
  const items = useRecoilValue<Bobject[]>(itemsAtom);
  const page = useRecoilValue(pageByStatusAtom(family));
  const setPage = useSetRecoilState(pageByStatusAtom(family));
  const setResponse = useSetRecoilState(responseAtom(family));
  const queryWithStatus = useRecoilValue(queryWithStatusAtom(family));

  useEffect(() => {
    setBaseQueryAtom(query);
  }, [query]);

  const { data, error, isLoading } = useSearchSubscription(
    {
      query: queryWithStatus,
      //@ts-ignore
      columns,
      referencedColumns,
      sort,
      ...BASE_SALES_SEARCH_REQUEST,
      pageSize: page ? page * PAGE_SIZE : 20,
      page: 0,
    },
    bobjectType,
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

  return {
    items,
    isLoading,
    totalMatching,
    resetItems,
    handleNextPage: () => setPage(page + 1),
  };
};

export const useKanbanAllOpps = () => {
  const [items, setItems] = useRecoilState(itemsAtom);

  const moveOpp = (id: string, originStatus: string, destinationStatus: string) => {
    const currentItems: any = items;
    const oppToMove = currentItems[originStatus]?.find((opp: any) => opp.id.objectId === id);

    if (oppToMove && originStatus !== destinationStatus) {
      const newArrayForDestinationColumn = [...currentItems[destinationStatus]];
      newArrayForDestinationColumn.unshift(oppToMove);

      setItems({
        ...currentItems,
        [originStatus]: currentItems[originStatus]?.filter(
          (opp: Bobject) => opp.id.objectId !== id,
        ),
        [destinationStatus]: newArrayForDestinationColumn,
      });
    }
  };

  return {
    items,
    moveOpp,
  };
};

export const useOpportunityAggregationAmount = (status: string) => {
  const { activeUser } = useActiveUser();
  const settings = useUserSettings();
  const queryWithStatus = useRecoilValue(queryWithStatusAtom(status));

  const opportunitiesRequest = React.useMemo(
    () => ({
      query: { ...queryWithStatus },
      aggregations: [
        {
          field: OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
          aggregationMode: 'SUM',
        },
      ],
      formFields: true,
      page: 0,
      pageSize: 5000,
    }),
    [activeUser, queryWithStatus],
  );
  const { data } = useSWR(
    '/bobjects/' +
      settings.account.id +
      '/Opportunity/aggregation/' +
      status +
      JSON.stringify(queryWithStatus),
    () => {
      return api.post(
        '/bobjects/' + settings.account.id + '/Opportunity/aggregation',
        opportunitiesRequest,
      );
    },
  );

  return data?.data?.contents[0]?.value;
};
