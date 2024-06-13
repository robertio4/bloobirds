import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { keepPreviousResponse } from "/src/utils/swr.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
function getBobjectKey(bobjectType) {
  switch (bobjectType) {
    case "Company":
      return "company";
    case "Lead":
      return "leads";
    case "Opportunity":
      return "opportunities";
    default:
      return "";
  }
}
export const useContextBobjects = () => {
  const { useGetActiveBobject, setActiveBobject } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const activeBobjectId = activeBobject?.id;
  const { data, mutate, isValidating } = useSWR(
    activeBobject && `/context/bobjects/${activeBobjectId?.value}`,
    () => api.get(`/linkedin/context/${activeBobjectId?.typeName}/${activeBobjectId?.objectId}`),
    { use: [keepPreviousResponse] }
  );
  function handleMutateAndRefresh() {
    return mutate()?.then(({ data: data2 }) => {
      const activeEntity = data2[getBobjectKey(activeBobjectId.typeName)];
      const bobjectToSet = Array.isArray(activeEntity) ? activeEntity.find((bobject) => bobject.id.value === activeBobjectId.value) : activeEntity;
      setActiveBobject(bobjectToSet);
      return bobjectToSet;
    });
  }
  return {
    data: data?.data,
    mutate,
    handleMutateAndRefresh,
    isValidating
  };
};
