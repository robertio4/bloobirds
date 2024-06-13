import { getAccountId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export function useAccountId() {
  const { data } = useSWR("accountId", getAccountId);
  return data;
}
