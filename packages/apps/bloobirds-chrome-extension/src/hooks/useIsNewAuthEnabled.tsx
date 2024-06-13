import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export function useIsNewAuthEnabled(): boolean {
  const { data } = useSWR('authEnabled', () => api.get('/auth/service/jwt/new-auth-enabled'));
  return !!data?.data?.newAuthEnabled;
}
