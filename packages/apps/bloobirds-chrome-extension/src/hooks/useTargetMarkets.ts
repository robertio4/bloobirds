import useSWR from 'swr';

import { TargetMarket } from '../types/entities';
import { getTargetMarkets } from '../utils/leads';

export const useTargetMarkets: () => TargetMarket[] = () => {
  const { data } = useSWR('/utils/view/targetMarket', getTargetMarkets);
  return data;
};
