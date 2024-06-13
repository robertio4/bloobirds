import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export function useCadenceSteps(cadenceId) {
  const url = `/messaging/cadences/${cadenceId}/steps`;
  const { data, mutate, isValidating } = useSWR(
    cadenceId && [url, cadenceId],
    () => api.get(url),
    {}
  );
  const createStep = async (data2) => {
    await api.post(url, data2);
    mutate();
  };
  const updateStep = async (data2, stepId) => {
    const updateUrl = `${url}/${stepId}`;
    await api.put(updateUrl, data2);
    mutate();
  };
  const cloneStep = async (id) => {
    await api.post(`${url}/${id}/clone`);
    mutate();
  };
  const deleteStep = async (id) => {
    await api.delete(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      data: {}
    });
    mutate();
  };
  return {
    steps: data?.data?.steps || [],
    loading: isValidating,
    createStep,
    updateStep,
    cloneStep,
    deleteStep
  };
}
