import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const searchUsers = async () => {
  try {
    const { data } = await api.post("/utils/service/users/search", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {
        active: true
      }
    });
    return data;
  } catch (e) {
    return null;
  }
};
export const useUserSearch = () => {
  const { data } = useSWR("/utils/view/users/search", searchUsers, {
    revalidateOnFocus: false
  });
  return { ...data, users: data?.users.filter((user) => user.active) };
};
