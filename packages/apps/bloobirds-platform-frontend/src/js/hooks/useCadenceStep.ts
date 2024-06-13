import useSWR from 'swr';

import { CadenceStep } from '../typings/messaging';
import { api } from '../utils/api';

const useCadenceStep = (cadenceId: string, stepId: string) => {
  const stepExists = cadenceId && stepId;
  const stepsUrl = `/messaging/cadences/${cadenceId}/steps`;
  const url = `${stepsUrl}/${stepId}`;

  const { data, error, mutate, isValidating } = useSWR<CadenceStep>(stepExists ? url : null);

  const deleteStep = async () => {
    await api.delete(url);
    mutate();
  };

  return {
    step: data,
    error,
    loading: isValidating,
    deleteStep,
  };
};

export default useCadenceStep;
