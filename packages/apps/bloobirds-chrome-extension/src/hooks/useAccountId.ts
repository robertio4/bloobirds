import { getAccountId } from '@bloobirds-it/utils';
import useSWR from 'swr';

export function useAccountId(): string | undefined {
  const { data } = useSWR('accountId', getAccountId);
  return data;
}
