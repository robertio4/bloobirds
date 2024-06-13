import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const getDynamicsCheckedIds = () => {
  const checkedIds = /* @__PURE__ */ new Set();
  document.querySelectorAll(".ag-row-selected").forEach((row) => {
    if (row.hasAttribute("row-id")) {
      const recordId = row.getAttribute("row-id");
      if (recordId) {
        checkedIds.add(recordId);
      }
    }
  });
  return checkedIds;
};
export const getTotalObjectsInList = (listId, objectType, wholeList) => {
  const key = wholeList ? "sync-msndynamics-list-" + listId : void 0;
  const { data, isLoading } = useSWR(
    key,
    () => api.get(`/integrations/sync/msndynamics/${objectType}/list/${listId}`)
  );
  return {
    total: data?.data?.totalElements || 0,
    isLoading
  };
};
export const syncDynamicsList = ({
  selectedDate,
  selectedCadence,
  objectType,
  replaceCadence,
  wholeList,
  listId,
  dynamicsIds
}) => {
  const body = {
    entity: objectType,
    startCadenceDate: selectedDate,
    cadenceId: selectedCadence,
    skipEnrollIfAlreadyInCadence: replaceCadence === "skip",
    injectReferences: true,
    ...dynamicsIds?.size > 0 && !wholeList && { ids: [...dynamicsIds] },
    ...wholeList && listId && { viewId: listId }
  };
  return api.post(`/integrations/sync/msndynamics`, body);
};
