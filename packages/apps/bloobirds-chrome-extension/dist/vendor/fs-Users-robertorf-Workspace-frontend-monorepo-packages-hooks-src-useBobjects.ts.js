import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const searchQuery = {
  page: 0,
  formFields: true,
  pageSize: 100,
  injectReferences: true,
  sort: []
};
export const fetchLeadsByRelatedBobject = (bobjectType, bobjectId, accountId) => {
  return api.post("/bobjects/" + accountId + "/Lead/search", {
    query: { [`LEAD__${bobjectType.toUpperCase()}`]: [bobjectId] },
    ...searchQuery
  });
};
export const useGetBobjectByTypeAndId = (bobjectId, injectReferences = false) => {
  const { data, isValidating } = useSWR(
    bobjectId ? `/${bobjectId}/form` : null,
    () => api.get(`/bobjects/${bobjectId}/form?injectReferences=${injectReferences}`)
  );
  return { bobject: data?.data, isValidating };
};
export const useBobject = (bobjectType, accountId) => {
  const searchForBobject = (queryParams) => api.post(`/bobjects/${accountId}/Lead/search`, { query: queryParams, ...searchQuery });
  const patchBobject = (bobjectId, data) => api.patch(`/bobjects/${accountId}/${bobjectType}/${bobjectId}/raw`, data);
  const bulkPatchBobjects = (data) => api.patch(`/bobjects/${accountId}/${bobjectType}/bulk`, data);
  return {
    searchForBobject,
    patchBobject,
    bulkPatchBobjects
  };
};
