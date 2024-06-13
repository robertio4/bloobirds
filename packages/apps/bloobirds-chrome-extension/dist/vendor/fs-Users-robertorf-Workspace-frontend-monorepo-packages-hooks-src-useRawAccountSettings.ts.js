import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { api, getAccountId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWRImmutable from "/vendor/.vite-deps-swr_immutable.js__v--bb1109a9.js";
export const useRawActiveAccountId = () => {
  const [accountId, setAccountId] = useState("");
  useEffect(() => {
    getAccountId()?.then((id) => setAccountId(id));
  }, []);
  return accountId;
};
export const useRawAccountSettings = () => {
  const accountId = useRawActiveAccountId();
  const isLoggedIn = !!accountId;
  const { data: settings } = useSWRImmutable(
    isLoggedIn ? "/utils/service/accounts/settings" : null,
    () => api.get("/utils/service/accounts/settings").then((res) => res.data)
  );
  const getRawAccountSetting = (setting) => {
    return settings ? settings[setting] : false;
  };
  return { getRawAccountSetting, settings, isLoading: !settings };
};
