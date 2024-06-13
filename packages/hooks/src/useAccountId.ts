import useSWR from 'swr';
import { getAccountId } from '@bloobirds-it/utils';

export function useAccountId(): string | undefined {
  const { data } = useSWR('accountId', getAccountId);
  return data;
}
