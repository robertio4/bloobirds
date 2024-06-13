import useSWR from 'swr';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { api } from '../../../../utils/api';
import { keepPreviousResponse } from '../../../../utils/swr.utils';

export const useGeneralSettings = () => {
  const settings = useUserSettings();
  const { data: entities } = useSWR(
    '/entities/accounts',
    () => api.get(`/entities/accounts/${settings.account.id}`, {}),
    { use: [keepPreviousResponse] },
  );

  const updateEmailMatching = async value => {
    const data = { leadEmailMatchingEnabled: value };
    await api.patch(`/entities/accounts/${settings.account.id}`, data);
  };

  return {
    isEmailMatching: entities?.data?.leadEmailMatchingEnabled,
    updateEmailMatching,
  };
};
