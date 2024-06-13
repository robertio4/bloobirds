import useSWR from 'swr';

import { useUserSettings } from '../../components/userPermissions/hooks';
import { CACHE_INTERVAL, CACHEABLE_ENTITIES, entityModel, loadEntity } from './useEntity.utils';
import { RawEntity } from './useEntityTypes';

export interface EntityInterface {
  all: () => RawEntity[];
  get: (id: string) => RawEntity;
  ids: () => RawEntity[];
  find: (filter: any) => any;
  findBy: (field: string) => (value: string) => RawEntity;
  filterBy: (bobjectField: string) => (value: string) => any;
  findByLogicRole: (logicRole: string) => any;
  filterByLogicRole: (logicRole: string) => any[];
}

export const useEntity = <T extends typeof CACHEABLE_ENTITIES[number]>(
  entityType: T,
): ReturnType<typeof entityModel> => {
  const settings = useUserSettings();

  const { data } = useSWR(
    settings ? `/entity/${entityType}` : null,
    async () => loadEntity(settings.account.id, entityType),
    {
      dedupingInterval: CACHE_INTERVAL,
    },
  );
  return data?.entityModel;
};
