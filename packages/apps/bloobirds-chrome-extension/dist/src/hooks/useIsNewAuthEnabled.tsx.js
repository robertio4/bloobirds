var _s = $RefreshSig$();
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export function useIsNewAuthEnabled() {
  _s();
  const {
    data
  } = useSWR("authEnabled", () => api.get("/auth/service/jwt/new-auth-enabled"));
  return !!data?.data?.newAuthEnabled;
}
_s(useIsNewAuthEnabled, "Bw9uScf/xQBWZKhLCWSR33xISM4=", false, function() {
  return [useSWR];
});
