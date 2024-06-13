import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { api, getAccountId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWRImmutable from "/vendor/.vite-deps-swr_immutable.js__v--bb1109a9.js";
import { useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useUserSettings.ts.js";
const accountIdAtom = atom({
  key: "accountIdAtom",
  default: null
});
export const useActiveAccountId = () => {
  const [accountId, setAccountId] = useRecoilState(accountIdAtom);
  useEffect(() => {
    getAccountId()?.then((id) => setAccountId(id));
  }, []);
  return accountId;
};
export const useActiveAccountSettings = () => {
  const accountId = useActiveAccountId();
  const isLoggedIn = !!accountId;
  const { data: settings } = useSWRImmutable(
    isLoggedIn ? "/utils/service/accounts/settings" : null,
    () => api.get("/utils/service/accounts/settings").then((res) => res.data)
  );
  const getAccountSetting = (setting) => {
    return settings ? settings[setting] : false;
  };
  return { settings, getAccountSetting, isLoading: !settings };
};
export const useNoStatusOppSetting = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting("NO_STATUS_OPP");
};
export const useB2CShowAccountPhonesSetting = () => {
  const { getAccountSetting, isLoading } = useActiveAccountSettings();
  return isLoading ? null : getAccountSetting("B2C_SHOW_ACCOUNT_PHONES");
};
export const useIsOTOAccount = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  const userData = useUserSettings();
  return getAccountSetting("OTO_ACCOUNT") || userData?.user?.otoUser;
};
export const useEmailIntegrationMode = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  const accountSetting = getAccountSetting("EMAIL_INTEGRATION_MODE");
  return {
    userIntegrationMode: accountSetting === "user_integration",
    accountIntegrationMode: accountSetting !== "user_integration"
  };
};
export const useIsB2CAccount = () => {
  const { getAccountSetting, isLoading } = useActiveAccountSettings();
  return isLoading ? null : getAccountSetting("B2C_ACCOUNT");
};
export const useIsNoStatusPlanAccount = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting("NO_STATUS_PLAN");
};
export const useIsPersonAccountAsAccount = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting("PERSONACCOUNT_AS_ACCOUNT");
};
export const useAircallPhoneLinkEnabled = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting("AIRCALL_PHONE_LINK");
};
export const useOpenCCFWithoutObject = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting("OPEN_CCF_WITHOUT_OBJECT");
};
export const useIsAutoSyncFromDifferentOwner = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting("AUTO_SYNC_FROM_DIFFERENT_OWNER");
};
