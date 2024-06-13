import { useUserSettings } from '../components/userPermissions/hooks';

export default function useUserTimeZone() {
  const { user } = useUserSettings();
  return user.timeZone;
}
