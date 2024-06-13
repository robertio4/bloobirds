import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

const fetcher = (url: string): Promise<{ [data: string]: any[] }> => api.get(url);

export const usePicklist = (parentId: string) => {
  const { data, mutate } = useSWR(`/utils/picklists/${parentId}`, fetcher);

  return {
    data: data?.data,
    mutate,
  };
};
