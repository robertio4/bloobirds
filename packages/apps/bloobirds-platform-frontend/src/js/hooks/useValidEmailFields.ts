import useSWR from 'swr';
import { BobjectType } from '../typings/bobjects';

export const useValidEmailFields = (bobjectType: BobjectType) => {
  const { data, error } = useSWR<{
    fields: Array<{ id: string; name: string; readOnly: boolean }>;
  }>(`/messaging/emails/validFields?bobjectType=${bobjectType}`);
  return {
    fields: data?.fields || [],
    loading: !error && !data,
  };
};
