import { CadenceStep, SaveCadenceStepCommand } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export function useCadenceSteps(cadenceId: string) {
  const url = `/messaging/cadences/${cadenceId}/steps`;
  const { data, mutate, isValidating } = useSWR(
    cadenceId && [url, cadenceId],
    () => api.get(url),
    {},
  );

  const createStep = async (data: Omit<CadenceStep, 'id'>) => {
    await api.post(url, data);
    mutate();
  };

  const updateStep = async (data: SaveCadenceStepCommand, stepId: string) => {
    const updateUrl = `${url}/${stepId}`;
    await api.put(updateUrl, data);
    mutate();
  };

  const cloneStep = async (id: string) => {
    await api.post(`${url}/${id}/clone`);
    mutate();
  };

  const deleteStep = async (id: string) => {
    await api.delete(`${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    });
    mutate();
  };

  return {
    steps: (data?.data?.steps as CadenceStep[]) || [],
    loading: isValidating,
    createStep,
    updateStep,
    cloneStep,
    deleteStep,
  };
}
