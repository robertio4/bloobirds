import { useEffect } from 'react';

import { Dictionary, Settings } from '@bloobirds-it/types';
import { api, getUserId, getUserName } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';
import useSWR, { SWRResponse } from 'swr';

const userIdAtom = atom({
  key: 'userIdAtom',
  default: null,
});

export const useActiveUserId = () => {
  const [userId, setUserId] = useRecoilState(userIdAtom);

  useEffect(() => {
    getUserId().then(id => setUserId(id));
  }, []);

  return userId;
};

type useActiveUserNameType = () => string;

export const useActiveUserName: useActiveUserNameType = () => {
  const { data: userName } = useSWR('/user/me/name', getUserName);
  return userName;
};

const getUserSettings = () => {
  return api.get('/utils/service/users/settings').then(result => result?.data);
};

export const useActiveUserSettings = (isLoggedIn = true) => {
  const { data: settings, mutate }: SWRResponse<Settings> = useSWR<Settings>(
    !isLoggedIn ? null : '/utils/service/users/settings',
    getUserSettings,
    {
      revalidateOnFocus: false,
    },
  );

  const saveUserSettings = async (activeUserId: string, settingsToSet: Dictionary<any>) => {
    await api.patch(`/entities/users/${activeUserId}`, settingsToSet);
  };

  return { settings, mutate, saveUserSettings };
};

export const useUserTimeZone = () => {
  const { settings } = useActiveUserSettings();
  return settings?.user.timeZone;
};
