import { CadenceTagType } from '@bloobirds-it/types';
import { api, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

export const useCadenceTags = (cadenceId?: string) => {
  const { data, isLoading, mutate } = useSWR<CadenceTagType[]>(
    cadenceId ? `/messaging/cadences/${cadenceId}/tags` : '/messaging/cadences/tags',
    () => api.get<Array<CadenceTagType>>('/messaging/cadences/tags').then(r => r.data),
    {
      use: [keepPreviousResponse],
    },
  );

  return {
    cadenceTags: data || [],
    refreshCadenceTags: mutate,
    isLoading,
  };
};
