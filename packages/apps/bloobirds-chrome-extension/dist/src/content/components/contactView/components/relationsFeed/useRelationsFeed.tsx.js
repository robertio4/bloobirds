var _s = $RefreshSig$();
import { api, getSobjectTypeFromId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
export const useRelationsFeed = () => {
  _s();
  const {
    useGetActiveBobject
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const sobjectId = activeBobject.salesforceId;
  const sobjectType = getSobjectTypeFromId(sobjectId);
  const {
    data: relations,
    isLoading
  } = useSWR(sobjectType && sobjectId ? `/utils/service/salesforce/related/${sobjectType}/${sobjectId}` : null, (url) => api.get(url).then((data) => data?.data));
  return {
    relations,
    loading: isLoading
  };
};
_s(useRelationsFeed, "4EjgM0tnqv7SgqHayqW6/ePHBKU=", true, function() {
  return [useExtensionContext, useSWR];
});
