import { useMemo } from 'react';

import { BobjectType } from '../typings/bobjects';
import { useEntity } from './entities/useEntity';
import { RawEntity } from './entities/useEntityTypes';
import { useFullSalesEnabled } from './useFeatureFlags';

export enum EXCLUDE_BOBJECT_TYPES {}
//RelatedProducts = 'OpportunityProduct',

export enum BOBJECT_TYPES {
  Product = 'Product',
  Company = 'Company',
  Lead = 'Lead',
  Opportunity = 'Opportunity',
  OpportunityProduct = 'OpportunityProduct',
  Activity = 'Activity',
  Task = 'Task',
}

export const useBobjectTypes = () => {
  const bobjectTypes = useEntity('bobjectTypes');
  const hasSalesEnabled = useFullSalesEnabled();

  const all = () => {
    const bobjectTypesEntity = bobjectTypes?.all();
    const bobjectTypesToRemove = !hasSalesEnabled
      ? [BOBJECT_TYPES.OpportunityProduct, BOBJECT_TYPES.Product]
      : [];

    return (
      bobjectTypesEntity?.filter(
        (bobject: RawEntity) => !bobjectTypesToRemove.includes(bobject.name as BOBJECT_TYPES),
      ) || []
    );
  };
  const filterBy = (field: string, value: string) => bobjectTypes.filterBy(field, value);

  const filterByLogicRole = () => {
    throw new Error("Bobject types doesn't have logic role");
  };
  const find = (filter: () => void) => bobjectTypes.find(filter);

  const findBy = (field: string) => (bobjectType: BobjectType) =>
    bobjectTypes?.findBy(field)(bobjectType);

  const findByLogicRole = () => {
    throw new Error("Bobject types doesn't have logic role");
  };
  const get = (id: string) => bobjectTypes.get(id);

  const ids = () => bobjectTypes.ids();

  return useMemo(
    () => ({
      all,
      filterBy,
      filterByLogicRole,
      find,
      findBy,
      findByLogicRole,
      get,
      ids,
    }),
    [bobjectTypes, hasSalesEnabled],
  );
};
