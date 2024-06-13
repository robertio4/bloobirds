import { Settings } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export const useUserSettings = (): Settings => {
  const { data } = useSWR<Settings>('/utils/service/users/extension/settings', () =>
    api
      .get('/utils/service/users/settings', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: {},
      })
      .then(res => res.data),
  );

  return data;
};
