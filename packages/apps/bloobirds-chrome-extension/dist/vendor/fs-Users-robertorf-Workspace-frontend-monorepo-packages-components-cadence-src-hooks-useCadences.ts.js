import { useFullSalesEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const fetchCadences = async (url) => {
  const response = await api.get(url, {});
  return response.data;
};
export const useCadences = ({
  bobjectTypeName,
  accountId,
  filters,
  requestParams,
  includeDeleted = false
}) => {
  const { selectedAuthor, selectedTags, searchValue, showDisabled = true } = filters || {};
  const { page, pageSize } = requestParams || {};
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const getBobjectTypesNames = () => {
    if (bobjectTypeName) {
      return Array.isArray(bobjectTypeName) ? bobjectTypeName?.length === 0 ? [
        BobjectTypes.Company,
        BobjectTypes.Lead,
        isFullSalesEnabled ? BobjectTypes.Opportunity : ""
      ] : bobjectTypeName : [bobjectTypeName];
    }
    return null;
  };
  const markAsDefault = (cadenceId) => api.put(`/messaging/cadences/${cadenceId}/markAsDefault`);
  const clone = ({
    cadenceId,
    bobjectTypeToClone,
    name
  }) => api.post(`/messaging/cadences/${cadenceId}/clone`, {
    name,
    bobjectType: bobjectTypeToClone
  });
  const deleteCadence = (cadenceId) => api.delete(`/messaging/cadences/${cadenceId}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    data: {}
  });
  const bobjectTypesToRequest = getBobjectTypesNames()?.join(",");
  const { data: entities, mutate } = useSWR(
    `/messaging/cadences?bobjectTypes=${bobjectTypesToRequest}&includeDeleted=${includeDeleted}`,
    fetchCadences,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true
    }
  );
  const { data: paginatedEntities, mutate: mutatePaginatedEntities, error } = useSWR(
    selectedAuthor || searchValue || page || pageSize ? `/messaging/cadences?bobjectTypes=${bobjectTypesToRequest}&author=${selectedAuthor?.join(
      ","
    )}&tags=${selectedTags?.join(",")}&search=${searchValue ?? ""}&page=${page}&pageSize=${pageSize}${showDisabled ? "" : "&enabled=true"}` : null,
    (page || pageSize) && fetchCadences,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true
    }
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
      `/bobjects/${accountId}/${bobjectTypeName2}/aggregation`,
      searchQuery
    );
    const count = response?.data?.contents[0]?.value;
    return count || 0;
  };
  return {
    cadences: entities?.cadences,
    paginatedCadences: paginatedEntities?.cadences,
    totalCadences: paginatedEntities?.totalElements,
    refreshCadences: mutate,
    refreshPaginatedCadences: mutatePaginatedEntities,
    isLoading: !paginatedEntities,
    error,
    markAsDefault,
    clone,
    delete: deleteCadence,
    getUsesCadence
  };
};
