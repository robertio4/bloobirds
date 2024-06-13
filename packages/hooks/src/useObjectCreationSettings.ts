import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export interface ObjectCreationResponse {
  allowObjectCreation: boolean;
  allowChangeStatus: boolean;
  companyRequiredFromExtension: boolean;
}

export const useObjectCreationSettings = () => {
  const { data, mutate } = useSWR('/linkedin/settings', async url => {
    const response = await api.get<ObjectCreationResponse>(url);
    return response.data;
  });

  return {
    enabledObjectCreation: data ? data.allowObjectCreation : true,
    enabledChangeStatus: data ? data.allowChangeStatus : true,
    companyRequiredFromExtension: data ? data.companyRequiredFromExtension : false,
    mutate,
  };
};
