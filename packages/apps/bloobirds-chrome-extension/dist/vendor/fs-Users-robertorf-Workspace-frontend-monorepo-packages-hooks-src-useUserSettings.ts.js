import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const useUserSettings = () => {
  const { data } = useSWR(
    "/utils/service/users/extension/settings",
    () => api.get("/utils/service/users/settings", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {}
    }).then((res) => res.data)
  );
  return data;
};
