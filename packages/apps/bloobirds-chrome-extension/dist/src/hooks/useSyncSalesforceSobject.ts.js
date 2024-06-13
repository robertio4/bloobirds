import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const isNewId = (sobjectId) => {
  return sobjectId?.startsWith("new");
};
export const useSyncSalesforceSobject = (props) => {
  const { sobjectId, sobjectType } = props;
  const { data, mutate } = useSWR(
    sobjectId && !isNewId(sobjectId) && `/utils/service/salesforce/sync/${sobjectType}/${sobjectId}`,
    (key) => api.get(key)
  );
  return {
    data: data?.data,
    mutate
  };
};
export const useSyncWithParentsSalesforceSobject = (props) => {
  const { sobjectId, sobjectType } = props;
  const { data, mutate } = useSWR(
    sobjectId && !isNewId(sobjectId) && `/utils/service/salesforce/syncParents/${sobjectType}/${sobjectId}`,
    (key) => api.get(key)
  );
  return {
    data: data?.data,
    mutate
  };
};
