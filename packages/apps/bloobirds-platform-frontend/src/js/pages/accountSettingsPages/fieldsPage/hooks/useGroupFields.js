import { useUserSettings } from '../../../../components/userPermissions/hooks';
import useSWR from 'swr';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { api } from '../../../../utils/api';

export const useGroupFields = () => {
  const settings = useUserSettings();

  const { data: entities, mutate } = useSWR(
    '/entities/bobjectFieldGroups',
    () =>
      api.get(
        `/entities/bobjectFieldGroups?account.id=${settings.account.id}&size=1000&sort=ordering`,
        {},
      ),
    { use: [keepPreviousResponse] },
  );

  const handleRefresh = () => {
    mutate();
  };

  return {
    groups: entities?.data?._embedded['bobjectFieldGroups'],
    totalElements: entities?.data?.page?.totalElements,
    handleRefresh,
  };
};
