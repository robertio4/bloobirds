import SessionManagerFactory from '../misc/session';

export const useIsAccountAdmin = () => {
  const roleManager = SessionManagerFactory().getRoleManager();
  return roleManager.isAccountAdmin();
};
