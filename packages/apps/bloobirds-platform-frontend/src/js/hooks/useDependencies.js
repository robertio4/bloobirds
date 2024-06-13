import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useRecoilState, atom } from 'recoil';
import useSWR, { mutate } from 'swr';

import { ServiceApi } from '../misc/api/service';
import { WebApi } from '../misc/api/web';
import { useBobjectFieldGroupsCleaning } from './useBobjectFieldGroups';

const dependenciesFiltersAtom = atom({
  key: 'dependenciesFilters',
  default: {},
});

export const useDependenciesFilters = dependencyType => {
  const [dependenciesFilters, setDependenciesFilters] = useRecoilState(dependenciesFiltersAtom);

  const { data: filtersDefinition } = useSWR(
    dependencyType ? `/${dependencyType}/filters` : null,
    () =>
      ServiceApi.request({
        url: `/service/dependencies/${dependencyType}/filters`,
        method: 'GET',
      }),
  );

  const updateDependenciesFilters = (filter, value) => {
    let currentValue = { ...dependenciesFilters };
    if (!value) {
      delete currentValue[filter];
    } else {
      currentValue = {
        ...currentValue,
        [filter]: value,
      };
    }
    setDependenciesFilters(currentValue);
    mutate(`/${dependencyType}/search`, dependenciesFilters);
  };

  const resetDependenciesFilters = () => setDependenciesFilters({});

  return {
    dependenciesFilters,
    filtersDefinition,
    setDependenciesFilters,
    updateDependenciesFilters,
    resetDependenciesFilters,
  };
};

export const useDependencies = dependencyType => {
  const { dependenciesFilters } = useDependenciesFilters();

  const { data: dependencies } = useSWR([`/${dependencyType}/search`, dependenciesFilters], () =>
    ServiceApi.request({
      url: `/service/dependencies/${dependencyType}/search`,
      method: 'POST',
      body: dependenciesFilters,
    }),
  );

  return {
    dependencies,
  };
};

export const useDependenciesActions = () => {
  const { createToast } = useToasts();
  const { cleanCachedBobjectGroups } = useBobjectFieldGroupsCleaning();
  const { dependenciesFilters } = useDependenciesFilters();

  const handleSaveDependency = (type, data, callback) => {
    WebApi.genericCreate({
      path: `service/dependencies/${type}`,
      method: 'POST',
      body: data,
    })
      .then(() => {
        createToast({ message: 'Condition created succesfully!', type: 'success' });
        mutate([`/${type}/search`, dependenciesFilters]);
        mutate(`/${type}/filters`);
        cleanCachedBobjectGroups();
        callback();
      })
      .catch(() => {
        createToast({
          message: 'This condition already exists, try to edit the existing one!',
          type: 'error',
        });
      });
  };

  const removeDependency = (type, data, callback) => {
    WebApi.delete({
      path: `service/dependencies/${type}`,
      method: 'DELETE',
      body: data,
    })
      .then(() => {
        createToast({ message: 'Condition deleted succesfully!', type: 'success' });
        mutate([`/${type}/search`, dependenciesFilters]);
        cleanCachedBobjectGroups();
        callback();
      })
      .catch(() => {
        createToast({
          message: 'There was a problem deleting the condition',
          type: 'error',
        });
      });
  };

  return {
    handleSaveDependency,
    removeDependency,
  };
};
