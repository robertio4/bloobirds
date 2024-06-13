import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';

import axios from 'axios';
import clsx from 'clsx';

import logo from '../../../assets/logo.svg';
import {
  ClaimerSystem,
  successExtensionLogin,
  successLogin,
} from '../../../utils/authentication.ts';
import { getApiUrl } from '../../../utils/urls.ts';
import styles from './signAsRoute.module.css';

async function signAs(token: string, claimerSystem: ClaimerSystem) {
  return axios.post(getApiUrl() + '/service/externalAction/signAs', {
    token: token,
    requesterSystem: claimerSystem,
  });
}

const SignAsRoute = () => {
  const [responseErrors, setResponseErrors] = React.useState<string[]>([]);
  const [requesting, setRequesting] = React.useState<boolean>(
    false);
  const [token, setToken] = React.useState<string>('');
  // Get the token from the query params

  useLayoutEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tok = urlParams.get('token');
    if (tok) {
      setToken(tok);
    } else {
      setResponseErrors(['No token provided']);
    }
  }, []);

  const hasResponseErrors = responseErrors.length > 0;
  const headerClasses = clsx(styles.loginFormHeader, {
    [styles.noErrors]: !hasResponseErrors,
  });

  const handleSignAs = async () => {
    if (!token || !token.length) {
      setResponseErrors(['No token provided']);
    } else {
      setRequesting(true);
      console.log('logging in chrome extension');
      const response = await signAs(token, 'linkedin_ce');
      successExtensionLogin(response);
      const webAppLoginResponse = await signAs(token, 'web_App');
      successLogin(webAppLoginResponse);
    }
  };

  useEffect(() => {
    if (token) {
      handleSignAs();
    }
  }, [token]);

  return (
    <>
      <div className={styles.loginForm}>
        <div className={headerClasses}>
          <img src={logo} alt="logo" className={styles.logo} />
          {hasResponseErrors && <span className={styles.error}>{responseErrors[0]}</span>}
        </div>
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <div className={styles.dividerText}>sing in as</div>
          <div className={styles.dividerLine} />
        </div>
        <div className={styles.loginFormInputs}>
          <div className={styles.message}>
            {requesting
              ? 'Signing in, please wait...'
              : 'Something went wrong, please try again later'}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignAsRoute;
