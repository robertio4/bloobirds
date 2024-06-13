import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const useObjectCreationSettings = () => {
  const { data, mutate } = useSWR("/linkedin/settings", async (url) => {
    const response = await api.get(url);
    return response.data;
  });
  return {
    enabledObjectCreation: data ? data.allowObjectCreation : true,
    enabledChangeStatus: data ? data.allowChangeStatus : true,
    companyRequiredFromExtension: data ? data.companyRequiredFromExtension : false,
    mutate
  };
};
