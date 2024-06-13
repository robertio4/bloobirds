import useSWR, { SWRResponse } from 'swr';
import { api } from '@bloobirds-it/utils';
import { SalesforceDataModelResponse } from '@bloobirds-it/types';

export const useSalesforceDataModel = () => {
  const { data, mutate }: SWRResponse<SalesforceDataModelResponse> = useSWR(
    '/utils/service/sfdcdatamodel',
    key => api.get<SalesforceDataModelResponse>(key).then(data => data?.data),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    ...data,
    mutate,
  };
};
