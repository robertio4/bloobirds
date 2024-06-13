import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { api, getUserId, getUserName } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const userIdAtom = atom({
  key: "userIdAtom",
  default: null
});
export const useActiveUserId = () => {
  const [userId, setUserId] = useRecoilState(userIdAtom);
  useEffect(() => {
    getUserId().then((id) => setUserId(id));
  }, []);
  return userId;
};
export const useActiveUserName = () => {
  const { data: userName } = useSWR("/user/me/name", getUserName);
  return userName;
};
const getUserSettings = () => {
  return api.get("/utils/service/users/settings").then((result) => result?.data);
};
export const useActiveUserSettings = (isLoggedIn = true) => {
  const { data: settings, mutate } = useSWR(
    !isLoggedIn ? null : "/utils/service/users/settings",
    getUserSettings,
    {
      revalidateOnFocus: false
    }
  );
  const saveUserSettings = async (activeUserId, settingsToSet) => {
    await api.patch(`/entities/users/${activeUserId}`, settingsToSet);
  };
  return { settings, mutate, saveUserSettings };
};
export const useUserTimeZone = () => {
  const { settings } = useActiveUserSettings();
  return settings?.user.timeZone;
};
