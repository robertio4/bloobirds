import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export const useSalesforceDataModel = () => {
  const { data, mutate } = useSWR(
    "/utils/service/sfdcdatamodel",
    (key) => api.get(key).then((data2) => data2?.data),
    {
      revalidateOnFocus: false
    }
  );
  return {
    ...data,
    mutate
  };
};
