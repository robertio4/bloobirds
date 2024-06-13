import useSWR from 'swr';

import { ServiceApi } from '../misc/api/service';

export const fetchTargetMarkets = () =>
  ServiceApi.request({
    url: `/service/view/targetMarket`,
    method: 'GET',
  });

export const useTargetMarketsList = (showDisabled?: true) => {
  const { data: targetMarkets } = useSWR(`/targetMarket`, fetchTargetMarkets);

  if (!showDisabled) {
    return {
      targetMarkets: targetMarkets?.filter((targetMarket: any) => targetMarket.enabled),
    };
  }

  return { targetMarkets };
};
