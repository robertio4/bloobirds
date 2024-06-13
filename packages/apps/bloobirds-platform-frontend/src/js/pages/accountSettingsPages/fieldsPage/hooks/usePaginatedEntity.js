import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { usePaginatedEntityFilters } from './usePaginatedEntityFilters';
import useSWR from 'swr';
import hash from 'object-hash';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { api } from '../../../../utils/api';

export const usePaginatedEntity = ({ entityName }) => {
  const settings = useUserSettings();
  const { params } = usePaginatedEntityFilters(entityName);

  const { data: entities, mutate } = useSWR(
    `/entities/${entityName}/${hash(params)}`,
    () => api.get(`/entities/${entityName}?account.id=${settings.account.id}`, { params }),
    { use: [keepPreviousResponse] },
  );

  const handleRefresh = () => {
    mutate();
  };

  return {
    entities: entities?.data?._embedded[entityName],
    currentPage: entities?.data?.page?.number,
    totalPages: entities?.data?.page?.totalPages,
    currentSize: entities?.data?.page?.size,
    totalElements: entities?.data?.page?.totalElements,
    handleRefresh,
  };
};
