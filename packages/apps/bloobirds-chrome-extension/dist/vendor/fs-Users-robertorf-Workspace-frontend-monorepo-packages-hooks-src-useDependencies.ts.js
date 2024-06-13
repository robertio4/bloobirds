import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export const useFieldDependencies = (parentLogicRole, childLogicRole) => {
  const { data } = useSWR([`/fieldConditions/search` + childLogicRole + parentLogicRole], () => {
    return api.post("/utils/service/dependencies/fieldValueConditions/search", {
      requiredParentFieldLogicRole: parentLogicRole,
      requiredChildFieldLogicRole: childLogicRole
    });
  });
  return data?.data;
};
