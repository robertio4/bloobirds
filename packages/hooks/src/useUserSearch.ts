import { UserResponse } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export const searchUsers = async () => {
  try {
    const { data } = await api.post('/utils/service/users/search', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        active: true,
      },
    });
    return data;
  } catch (e) {
    return null;
  }
};

export const useUserSearch: () => UserResponse = () => {
  const { data } = useSWR('/utils/view/users/search', searchUsers, {
    revalidateOnFocus: false,
  });

  return { ...data, users: data?.users.filter(user => user.active) };
};
