import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export const getDynamicsCheckedIds = (): Set<string> => {
  const checkedIds = new Set<string>();
  document.querySelectorAll('.ag-row-selected').forEach(row => {
    if (row.hasAttribute('row-id')) {
      const recordId = row.getAttribute('row-id');
      if (recordId) {
        checkedIds.add(recordId);
      }
    }
  });

  return checkedIds;
};

export const getTotalObjectsInList = (
  listId: string,
  objectType: string,
  wholeList: boolean,
): {
  total: number;
  isLoading: boolean;
} => {
  const key = wholeList ? 'sync-msndynamics-list-' + listId : undefined;
  const { data, isLoading } = useSWR(key, () =>
    api.get(`/integrations/sync/msndynamics/${objectType}/list/${listId}`),
  );
  return {
    total: data?.data?.totalElements || 0,
    isLoading,
  };
};

export const syncDynamicsList = ({
  selectedDate,
  selectedCadence,
  objectType,
  replaceCadence,
  wholeList,
  listId,
  dynamicsIds,
}: {
  selectedDate?: Date;
  selectedCadence?: string;
  objectType: string;
  replaceCadence?: string;
  wholeList: boolean;
  listId: string;
  dynamicsIds: Set<string>;
}) => {
  const body = {
    entity: objectType,
    startCadenceDate: selectedDate,
    cadenceId: selectedCadence,
    skipEnrollIfAlreadyInCadence: replaceCadence === 'skip',
    injectReferences: true,
    ...(dynamicsIds?.size > 0 && !wholeList && { ids: [...dynamicsIds] }),
    ...(wholeList && listId && { viewId: listId }),
  };

  return api.post(`/integrations/sync/msndynamics`, body);
};
