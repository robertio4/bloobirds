import useSWR from 'swr';
import { ServiceApi } from '../../../../misc/api/service';

export const useUsersList = ({ filtersBody = {} }) => {
  const { data: users } = useSWR('/users', () =>
    ServiceApi.request({
      url: '/service/users/search',
      method: 'POST',
      body: filtersBody,
    }),
  );

  return {
    users,
  };
};
