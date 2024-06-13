import { useUserSettings } from './useUserSettings';

export default function useUserTimeZone() {
  const userSettings = useUserSettings();
  return userSettings?.user?.timeZone;
}
