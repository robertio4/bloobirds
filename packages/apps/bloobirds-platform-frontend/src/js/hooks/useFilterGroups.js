import useSWR from 'swr';
import { api } from '@bloobirds-it/utils';

export const useFilterGroups = tabName => {
  const { data: filterGroups, mutate } = useSWR(`/utils/service/filterGroups/${tabName}`, () =>
    api.get(`/utils/service/filterGroups?tabName=${tabName}`).then(response => response?.data),
  );

  const setDefaultFilterGroup = id =>
    api.patch(`/utils/service/filterGroups/${id}/setDefault/`).then(() => mutate());

  const saveFilterGroup = ({ id, filterName, order, filters }) => {
    const body = { id, name: filterName, tabName, order, filters };
    return api.post('/utils/service/filterGroups', body);
  };

  const deleteFilterGroup = id =>
    api.delete(`/utils/service/filterGroups/${id}`).then(() => mutate());

  const handleRefresh = () => {
    mutate();
  };

  return {
    filterGroups,
    handleRefresh,
    saveFilterGroup,
    deleteFilterGroup,
    setDefaultFilterGroup,
  };
};
