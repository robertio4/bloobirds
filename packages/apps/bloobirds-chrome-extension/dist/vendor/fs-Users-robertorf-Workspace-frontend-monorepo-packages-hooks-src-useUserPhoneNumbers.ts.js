import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const useUserPhoneNumbers = (callback) => {
  const { settings } = useActiveUserSettings();
  const { data: userPhones } = useSWR(
    `/entities/users/${settings?.user?.id}/phoneNumbers`,
    async () => {
      const response = await api.get(
        `/entities/users/${settings?.user?.id}/phoneNumbers`
      );
      const filteredPhones = response?.data?._embedded?.phoneNumbers.filter(
        (phoneNumber) => phoneNumber?.type === "TWILIO_NUMBER" || phoneNumber?.type === "VERIFIED_NUMBER"
      );
      callback?.(filteredPhones);
      return filteredPhones;
    }
  );
  return { userPhones };
};
