import * as Sentry from '@sentry/react';
import curry from 'lodash/curry';
import keyBy from 'lodash/keyBy';
import { mutate } from 'swr';

import { RestApi } from '../../misc/api/rest';
import SessionManagerFactory from '../../misc/session';
import { LZString } from './lz-string';
import { RawEntity } from './useEntityTypes';

const BASE_PAGE_SIZE = 1000;

const NOT_ACCOUNT_OWNED_ENTITIES = Object.seal({
  fieldTypes: true,
});

export const CACHEABLE_ENTITIES = [
  'bobjectTypes',
  'fieldTypes',
  'bobjectFields',
  'bobjectPicklistFieldValues',
  'bobjectGlobalPicklists',
  'targetMarkets',
  'idealCustomerProfiles',
  'users',
  'cadenceActionTypes',
  'ringoverTokens',
  'ringoverUsers',
  'aircallUsers',
  'numintecUsers',
  'externalGenericUsers',
  'dialerTypes',
] as const;

const CACHE_REGEX = /bb-app-[a-zA-Z0-9]{16}-cache-entity-.+/;

export const CACHE_INTERVAL = 60 * 1000 * 60; // 60 * 1000 * 60;

interface EntityModelInterface {
  [id: string]: Partial<RawEntity>;
}

export const entityModel = (entities: EntityModelInterface) => ({
  find: (
    filter: (
      value: Partial<RawEntity>,
      index: number,
      obj: Partial<RawEntity>[],
    ) => value is Partial<RawEntity>,
  ) => Object.values(entities).find(filter),
  findBy: curry((field: keyof Partial<RawEntity>, value: any) =>
    Object.values(entities).find(entity => entity && entity[field] === value),
  ),
  filterBy: curry((field: keyof Partial<RawEntity>, value: any) =>
    Object.values(entities).filter(entity => entity && entity[field] === value),
  ),
  findByLogicRole: (value: string) =>
    Object.values(entities).find(entity => entity && entity.logicRole === value),
  filterByLogicRole: (value: string) =>
    Object.values(entities).filter(entity => entity && entity.logicRole === value),
  all: () => Object.values(entities),
  ids: () => Object.keys(entities),
  get: (id: string) => entities[id],
});

const cleanKeysOfOtherAccounts = (accountId: string) => {
  Object.keys(window.localStorage).forEach(key => {
    if (key.startsWith('bb-')) {
      const match = key.match(CACHE_REGEX);
      if (match && match[0] !== '') {
        if (!key.includes(accountId)) {
          localStorage.removeItem(key);
        }
      }
    }
  });
};

export const generateKey = (entity: string, accountId: string) =>
  `bb-app-${accountId}-cache-entity-${entity}`;

const isEntityLocallyCached = (entityType: typeof CACHEABLE_ENTITIES[number]) =>
  CACHEABLE_ENTITIES.includes(entityType);

const loadFromStorage = (entityName: string, accountId: string) => {
  const locallyCachedEntity = localStorage.getItem(generateKey(entityName, accountId));
  if (locallyCachedEntity !== null) {
    const parsedEntity = JSON.parse(locallyCachedEntity);
    if (parsedEntity.cacheTimestamp + CACHE_INTERVAL > new Date().getTime()) {
      return parsedEntity;
    }
  } else {
    // Try to load from the encoded version
    const encodedLocallyCachedEntity = localStorage.getItem(
      generateKey(entityName, accountId) + '-encoded',
    );
    if (encodedLocallyCachedEntity !== null) {
      const parsedEntity = JSON.parse(LZString.decompress(encodedLocallyCachedEntity));
      // @ts-ignore
      if (parsedEntity.cacheTimestamp + CACHE_INTERVAL > new Date().getTime()) {
        return parsedEntity;
      }
    }
  }
  return null;
};

const removeEntityFromStorage = (entityName: string, accountId: string) => {
  localStorage.removeItem(generateKey(entityName, accountId));
  localStorage.removeItem(generateKey(entityName, accountId) + '-encoded');
};

export const forceCacheRefresh = () => {
  CACHEABLE_ENTITIES.forEach(entity => {
    removeEntityFromStorage(entity, SessionManagerFactory().getAccount().id);
    mutate(`/entity/${entity}`).then(() => console.info(`${entity} reloaded`));
  });
};

export const forceSelectedEntitiesCacheRefresh = (entities: string[]) => {
  // eslint-disable-next-line no-unused-expressions
  entities?.forEach(entity => {
    removeEntityFromStorage(entity, SessionManagerFactory().getAccount().id);
    mutate(`/entity/${entity}`).then(() => console.info(`${entity} reloaded`));
  });
};

const saveToStorage = (
  newEntities: any[],
  accountId: string,
  entityType: typeof CACHEABLE_ENTITIES[number],
  fetchData: number,
) => {
  if (CACHEABLE_ENTITIES.includes(entityType)) {
    try {
      const cacheableEntity = JSON.stringify({
        newEntities,
        cacheTimestamp: fetchData,
      });
      console.log('Saving to local storage a string with size:', cacheableEntity.length);
      if (cacheableEntity.length <= 50000) {
        localStorage.setItem(generateKey(entityType, accountId), cacheableEntity);
      } else {
        const encodedString = LZString.compress(
          JSON.stringify({ newEntities, cacheTimestamp: fetchData }),
        );
        console.log('Saving to local storage a encoded string with size:', encodedString.length);
        localStorage.setItem(generateKey(entityType, accountId) + '-encoded', encodedString);
      }
    } catch (e) {
      // If the entity is too big, we try to compress it and save it encoded
      Sentry.captureException(e, {
        tags: {
          module: 'useEntity',
        },
        extra: {
          origin: 'Saving entity to local storage',
          size: JSON.stringify({ newEntities, cacheTimestamp: fetchData }).length,
        },
      });

      const encodedString = LZString.compress(
        JSON.stringify({ newEntities, cacheTimestamp: fetchData }),
      );
      console.log('Saving to local storage a encoded string with size:', encodedString.length);
      try {
        localStorage.setItem(generateKey(entityType, accountId) + '-encoded', encodedString);
      } catch (e) {
        console.warn('Error saving encoded entity to local storage');
        Sentry.captureException(e, {
          tags: {
            module: 'useEntity',
          },
          extra: {
            origin: 'Saving entity to local storage, encoded',
            size: encodedString.length,
          },
        });
      }
    }
  }
};

function hasRepeatedEntities(data: any[]) {
  const repeatedValues: Record<string, any> = data.reduce((acc, curr) => {
    if (curr.id && curr.id !== '') {
      if (acc[curr.id]) {
        acc[curr.id].push(curr);
      } else {
        acc[curr.id] = [curr];
      }
    }
    return acc;
  }, {});
  return Object.values(repeatedValues).find(value => value.length > 1);
}

const fetchEntities = async (
  query: { 'account.id'?: string; size?: number; page: number; sort?: string },
  entityName: string,
  allData: any[] = [],
) => {
  //@ts-ignore
  const data = await RestApi.search({
    query,
    entity: entityName,
  });
  allData = allData.concat(data._embedded[entityName]);
  //If the page of the query is the last one, and the totalPages is bigger than the current page, we should recursively call the function to get the rest of the pages
  if (data?.page?.totalPages > query.page + 1) {
    allData = await fetchEntities(
      {
        ...query,
        page: query.page + 1,
      },
      entityName,
      allData,
    );
    const repeatedEntities = hasRepeatedEntities(allData);
    if (repeatedEntities) {
      console.error(`Repeated entities found in ${entityName} entity: ${repeatedEntities}`);
      Sentry.captureException(
        new Error(`Repeated entities found in ${entityName} with id ${repeatedEntities.id}`),
        {
          tags: {
            module: 'useEntity',
          },
          extra: {
            origin: 'Repeated entities',
          },
        },
      );
    }
  }
  return allData;
};

const isUpdateNeeded = (lastFetchData: number) =>
  lastFetchData + CACHE_INTERVAL < new Date().getTime() || lastFetchData === undefined;

export const loadEntity = async (
  accountId: string,
  entityName: typeof CACHEABLE_ENTITIES[number],
) => {
  const query = {
    size: BASE_PAGE_SIZE,
    page: 0,
    sort: 'id,asc',
    ...(!NOT_ACCOUNT_OWNED_ENTITIES[entityName as keyof typeof NOT_ACCOUNT_OWNED_ENTITIES] && {
      'account.id': accountId,
    }),
  };
  if (isEntityLocallyCached(entityName)) {
    cleanKeysOfOtherAccounts(accountId);
    const localEntity = loadFromStorage(entityName, accountId);
    if (localEntity && !isUpdateNeeded(localEntity?.cacheTimestamp)) {
      if (isUpdateNeeded(localEntity?.cacheTimestamp)) {
        const newEntities = await fetchEntities(query, entityName);
        saveToStorage(newEntities, accountId, entityName, new Date().getTime());
      }
      return {
        lastFetchData: localEntity.cacheTimestamp,
        entityModel: entityModel(keyBy(localEntity.newEntities, 'id')),
      };
    }
  }

  const newEntities = await fetchEntities(query, entityName);
  const fetchData = new Date().getTime();
  saveToStorage(newEntities, accountId, entityName, fetchData);
  const model = entityModel(keyBy(newEntities, 'id'));
  return {
    lastFetchData: fetchData,
    entityModel: model,
  };
};
