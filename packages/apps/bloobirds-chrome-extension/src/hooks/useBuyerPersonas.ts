import useSWR from 'swr';

import { BuyerPersona } from '../types/entities';
import { getBuyerPersonas } from '../utils/leads';

export const useBuyerPersonas: () => BuyerPersona[] = () => {
  const { data } = useSWR('/utils/view/idealCustomerProfile', getBuyerPersonas);
  return data;
};
