import { getAuthUrl } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';

import { JwtApi } from '../misc/api/jwt';
import SessionManagerFactory from '../misc/session';
import { cleanLocalStorageCache } from '../utils/localStorage.utils';
import { useSessionStorage } from './useSessionStorage';

const SessionManager = SessionManagerFactory();

const isLoggedAtom = atom({
  key: 'isLoggedAtom',
  default: !SessionManager.hasEmptySession(),
});

export const useLogin = () => {
  const [isLogged, setIsLogged] = useRecoilState(isLoggedAtom);

  const login = ({ email, password }) =>
    JwtApi.service
      .login(email, password)
      .then(response => {
        /* if response is not 200, then it has not been authorised */
        if (response?.token) {
          return response?.token;
        }
        throw new Error('No token');
      })
      .then(sessionToken => {
        SessionManager.setRootToken(sessionToken);
        const roleManager = SessionManager.getRoleManager();
        const success =
          roleManager.isGlobalAdmin() ||
          roleManager.isAccountAdmin() ||
          roleManager.isAccountUser();
        if (!success) {
          throw new Error('No permissions');
        } else {
          setIsLogged(true);
        }
      });

  const loginWithToken = ({ token }) => {
    SessionManager.setRootToken(token);
    const roleManager = SessionManager.getRoleManager();
    const success =
      roleManager.isGlobalAdmin() || roleManager.isAccountAdmin() || roleManager.isAccountUser();
    if (!success) {
      throw new Error('No permissions');
    } else {
      setIsLogged(true);
    }
  };

  const logoutRedirect = () => {
    const authUrl = getAuthUrl();
    console.log('logout', authUrl);
    window.location.href = `${authUrl}?logout=true`;
  };

  const logout = ({ callback, onError = () => {}, redirectToAuth = false }) => {
    const token = SessionManager.getUser()?.id;
    const { removeRegexKeys } = useSessionStorage();

    JwtApi.service.externalAction
      .logout({ token })
      .then(() => {
        cleanLocalStorageCache();
        SessionManager.cleanSession();

        removeRegexKeys(/subhomeFilters-[a-zA-Z]*/);

        callback();
        setIsLogged(false);
        // redirect to auth with logout param
        if (redirectToAuth) {
          logoutRedirect();
        } else {
          //window.location.reload(true);
        }
      })
      .catch(() => {
        console.info('LogOut Error');
        onError();
      });
  };

  return {
    login,
    logout,
    isLogged,
    loginWithToken,
    logoutRedirect,
  };
};
