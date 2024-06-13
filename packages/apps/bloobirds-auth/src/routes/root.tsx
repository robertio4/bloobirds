import { useEffect, useState } from 'react';
import * as React from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router';

import { Spinner } from '@bloobirds-it/flamingo-ui';

import logo from '../assets/logo.svg';
import {
  isElementLoaded,
  logout,
  redirectIfTokenIsPresentAndNotExpired,
} from '../utils/authentication';
import styles from './root.module.css';

async function logoutFlow(setIsLoading, navigate, redirectUrl) {
  await isElementLoaded('#bb-root');
  window?.postMessage({ type: 'FROM_AUTH_LOGOUT' }, '*');
  setIsLoading(false);
  if (redirectUrl) {
    logout();
    window.location.href = redirectUrl;
  }
  navigate(logout());
  window.history.replaceState({}, '', window.location.pathname);
}

function Root() {
  const navigate = useNavigate();
  const isInvitation = useMatch('/auth/userInvitation');
  const isResetPassword = useMatch('/auth/resetPassword');
  const isSignAs = useMatch('/auth/signAs');
  const isRecoverPassword = useMatch('/auth/recoverPassword');
  const isValidateEmail = useMatch('/auth/validateEmail');

  const [isLoading, setIsLoading] = useState(false);

  // Checks if there is a valid token in the local storage and redirects to the proper route.
  useEffect(() => {
    //Cheks if there is a refUrl as a query param
    const urlParams = new URLSearchParams(window.location.search);
    const refUrl = urlParams.get('refUrl');
    const fromExtensionInstall = urlParams.get('fromExtensionInstall');
    const logoutParam = urlParams.get('logout');

    setIsLoading(true);

    if (logoutParam) {
      console.log('logout event recieved');
      //Send the logout message to the extension
      const redirectUrl = urlParams.get('afterLogout');
      logoutFlow(setIsLoading, navigate, redirectUrl);
    } else {
      redirectIfTokenIsPresentAndNotExpired(refUrl, {
        fromExtensionInstall: !!fromExtensionInstall,
        navigate,
        shouldRedirect:
          !isInvitation && !isResetPassword && !isSignAs && !isRecoverPassword && !isValidateEmail,
        queryParams: window.location.search,
      }).then(() => {
        console.log('Executing then');
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.spinner}>
            <Spinner name="loadingCircle" />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Root;
