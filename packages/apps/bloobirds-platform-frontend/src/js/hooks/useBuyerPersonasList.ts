import useSWR from 'swr';

import { ServiceApi } from '../misc/api/service';

export const fetchBuyerPersonas = () =>
  ServiceApi.request({
    url: `/service/view/idealCustomerProfile`,
    method: 'GET',
  });

export const useBuyerPersonasList = (showDisabled?: true) => {
  const { data: buyerPersonas } = useSWR(`/idealCustomerProfiles`, fetchBuyerPersonas);

  if (!showDisabled) {
    return {
      buyerPersonas: Array.isArray(buyerPersonas)
        ? buyerPersonas?.filter((buyerPersona: any) => buyerPersona.enabled)
        : [],
    };
  }

  return {
    buyerPersonas,
  };
};
