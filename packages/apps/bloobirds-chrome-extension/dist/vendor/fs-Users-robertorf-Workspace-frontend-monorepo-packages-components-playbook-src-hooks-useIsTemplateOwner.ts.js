import { UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
export const useIsTemplateOwner = (template) => {
  const { settings } = useActiveUserSettings();
  const isAdmin = settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) || settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);
  return settings?.user?.id === template?.createdBy || !template?.createdBy || isAdmin;
};
