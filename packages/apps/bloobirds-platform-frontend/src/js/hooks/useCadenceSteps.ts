import useSWR from 'swr';

import { CadenceStep, SaveCadenceStepCommand } from '../typings/messaging';
import { api } from '../utils/api';

/**
 * @deprecated use the one in cadence folder in pages
 * @param cadenceId
 */
export default function useCadenceSteps(cadenceId: string) {
  const url = `/messaging/cadences/${cadenceId}/steps`;
  const { data, error, mutate, isValidating } = useSWR(cadenceId && [url, cadenceId]);

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
    await api.delete(`${url}/${id}`);
    mutate();
  };

  return {
    steps: data?.data?.steps || [],
    loading: isValidating,
    createStep,
    updateStep,
    cloneStep,
    deleteStep,
  };
}
