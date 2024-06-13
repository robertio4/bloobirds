import { servicesEnv } from '../api/ApiHosts';
import { useScript } from '../../hooks';
import { useUserSettings } from '../../components/userPermissions/hooks';
import { useIsAccountAdmin } from '../../hooks/usePermissions';

const appId = 'xo0jd4ph';

const buildIntercomSettings = (settings, isAccountAdmin) => {
  if (settings && settings?.user && settings?.account) {
    return {
      app_id: appId,
      user_id: settings.user.id,
      email: settings.user.email,
      name: settings.user.name,
      employee_role: settings.user.employeeRole,
      isAccountAdmin,
      user_type: settings.user.type,
      company: {
        company_id: settings.account.id,
        name: settings.account.name,
        account_type: settings.account.type,
      },
    };
  }
  return {};
};

const createUrl = settings => {
  if (
    appId &&
    (servicesEnv === 'production' || servicesEnv === 'staging') &&
    settings &&
    settings?.user?.type !== 'SUPPORT_USER'
  ) {
    return `https://widget.intercom.io/widget/${appId}`;
  }
  return undefined;
};

export const useIntercom = () => {
  const settings = useUserSettings();
  const isAccountAdmin = useIsAccountAdmin();
  const url = createUrl(settings);
  window.intercomSettings = buildIntercomSettings(settings, isAccountAdmin);
  useScript(url);
};
