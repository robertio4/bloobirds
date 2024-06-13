import { UserRole } from '@bloobirds-it/types';
import { useActiveUserSettings } from '@bloobirds-it/hooks';

export const useIsTemplateOwner = template => {
  const { settings } = useActiveUserSettings();
  const isAdmin =
    settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) ||
    settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);
  return settings?.user?.id === template?.createdBy || !template?.createdBy || isAdmin;
};
