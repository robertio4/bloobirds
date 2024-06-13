import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport1_objectHash from "/vendor/.vite-deps-object-hash.js__v--f8e8e6a0.js"; const hash = __vite__cjsImport1_objectHash.__esModule ? __vite__cjsImport1_objectHash.default : __vite__cjsImport1_objectHash;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const fetch = (accountId, typeName, bobjectsIds) => {
  if (accountId && bobjectsIds.length > 0 && typeName) {
    const response = api.post("/logging/v2/logs/integrations/getSyncStatus", {
      bobjectType: typeName,
      bobjectIdsList: bobjectsIds,
      accountId,
      integrationType: ["SALESFORCE", "INBOUND_SALESFORCE"]
    }).then((res) => res?.data);
    return response;
  }
};
export const useSyncBobjectStatus = (accountId, bobjects) => {
  const bobjectsIds = bobjects?.map((bobject) => bobject?.id?.objectId);
  const { data: bobjectsSync } = useSWR(
    bobjectsIds?.length > 0 && bobjectsIds[0] && `getSyncStatus/${accountId}/${hash(bobjectsIds)}`,
    () => fetch(accountId, bobjects?.[0]?.id?.typeName, bobjectsIds),
    { revalidateOnFocus: true }
  );
  const isAllSync = bobjectsSync?.every((bobject) => bobject?.syncStatusOk);
  return {
    syncStatus: isAllSync,
    bobjectsSync
  };
};
