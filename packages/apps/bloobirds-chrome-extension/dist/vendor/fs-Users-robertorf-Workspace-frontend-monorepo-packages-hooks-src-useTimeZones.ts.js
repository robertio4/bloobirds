import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const useTimeZones = () => {
  const { data } = useSWR(
    "/utils/service/timezones",
    () => api.get("/utils/service/timezones/gmt").then((res) => res?.data)
  );
  return data;
};
