import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
export const useCadences = (bobjectTypeName) => {
  const { settings } = useActiveUserSettings();
  const getBobjectTypesNames = () => {
    if (bobjectTypeName) {
      return Array.isArray(bobjectTypeName) ? bobjectTypeName : [bobjectTypeName];
    }
    return null;
  };
  const fetchCadences = ([url, ...filters]) => api.get(`${url}/?bobjectTypes=${filters[0]}`, {});
  const markAsDefault = (cadenceId) => api.put(`/messaging/cadences/${cadenceId}/markAsDefault`);
  const clone = ({
    cadenceId,
    bobjectTypeToClone,
    name
  }) => api.post(`/messaging/cadences/${cadenceId}/clone`, {
    name,
    bobjectType: bobjectTypeToClone
  });
  const deleteCadence = (cadenceId) => api.delete(`/messaging/cadences/${cadenceId}`);
  const bobjectTypesToRequest = getBobjectTypesNames();
  const { data: entities, mutate } = useSWR(
    bobjectTypesToRequest ? ["/messaging/cadences", bobjectTypesToRequest.join(",")] : null,
    fetchCadences,
    {}
  );
  const getUsesCadence = async (cadenceId, bobjectTypeName2) => {
    const query = {
      [`${bobjectTypeName2.toUpperCase()}__CADENCE`]: cadenceId
    };
    const searchQuery = {
      query,
      page: 0,
      formFields: true,
      pageSize: 1e3,
      injectReferences: true,
      sort: []
    };
    const response = await api.post(
      `/bobjects/${settings?.account?.id}/${bobjectTypeName2}/aggregation`,
      searchQuery
    );
    const count = response?.data?.contents[0]?.value;
    return count || 0;
  };
  return {
    cadences: entities?.data?.cadences,
    refreshCadences: mutate,
    markAsDefault,
    clone,
    delete: deleteCadence,
    getUsesCadence
  };
};
