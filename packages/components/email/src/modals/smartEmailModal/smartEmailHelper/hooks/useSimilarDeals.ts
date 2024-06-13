import { useState } from 'react';

import { BobjectId, CompanyCardType, DateFilterValues } from '@bloobirds-it/types';
import { api, subDays } from '@bloobirds-it/utils';
import isEqual from 'lodash/isEqual';
import spacetime from 'spacetime';
import useSWR from 'swr';

import { DATE_FILTER_DAY_VALUES } from '../smartEmailHelper.constants';

export type SimilarDealsHookType = {
  data: any;
  similarDeals: CompanyCardType[];
  isLoading: boolean;
  error: boolean;
  dateFilter: DateFilterValues;
  setDateFilter: (x: DateFilterValues) => void;
};

export const useSimilarDeals = (
  accountId: string,
  companyId?: BobjectId['objectId'],
): SimilarDealsHookType => {
  const [dateFilter, setDateFilter] = useState(DateFilterValues.LAST_90_DAYS);

  const fetchDeals = () => {
    const dateTo = spacetime(subDays(new Date(), 1)).format('iso-short');
    const dateFrom = spacetime(subDays(new Date(), DATE_FILTER_DAY_VALUES[dateFilter])).format(
      'iso-short',
    );

    if (!companyId) return;

    return api.get(
      `/bobjects/${accountId}/match/companies?bobjectId=${companyId}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );
  };

  const { data, error, isLoading } = useSWR(
    accountId && companyId && `/similarDeals/${companyId}/${dateFilter}`,
    fetchDeals,
  );

  return {
    data,
    isLoading,
    dateFilter,
    setDateFilter: (date: DateFilterValues) => {
      if (!isEqual(date, dateFilter)) {
        setDateFilter(date);
      }
    },
    error,
    similarDeals: data && data.data,
  };
};
