import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const fetcher = (url) => api.get(url);
export const usePicklist = (parentId) => {
  const { data, mutate } = useSWR(`/utils/picklists/${parentId}`, fetcher);
  return {
    data: data?.data,
    mutate
  };
};
