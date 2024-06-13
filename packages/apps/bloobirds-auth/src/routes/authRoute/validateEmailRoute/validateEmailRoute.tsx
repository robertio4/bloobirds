import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';

import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';

import logo from '../../../assets/logo.svg';
import { getApiUrl } from '../../../utils/urls';
import styles from './validateEmailRoute.module.css';

enum ValidateEmailState {
  INITIAL,
  VALIDATING,
  VALIDATED,
  ERROR,
  EXPIRED,
}

const validateEmail = async (token: string) => {
  return await axios.post(getApiUrl() + '/service/externalAction/validateEmail', {
    token,
  });
};

const ValidateEmailRoute = () => {
  const [state, setState] = React.useState<ValidateEmailState>(ValidateEmailState.INITIAL);
  const [token, setToken] = React.useState<string>('');
  const [responseErrors, setResponseErrors] = React.useState<string[]>([]);
  const hasResponseErrors = responseErrors.length > 0;
  const headerClasses = clsx(styles.loginFormHeader, {
    [styles.noErrors]: !hasResponseErrors,
  });

  useLayoutEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tok = urlParams.get('token');
    if (tok) {
      setToken(tok);
    } else {
      setResponseErrors(['No token provided']);
    }
  }, []);

  const handleValidateEmail = async () => {
    if (!token || !token.length) {
      setResponseErrors(['No token provided']);
    }
    try {
      if (token) {
        setState(ValidateEmailState.VALIDATING);
        await validateEmail(token);
        setState(ValidateEmailState.VALIDATED);
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 500) {
        setState(ValidateEmailState.ERROR);
        setResponseErrors(['Something went wrong. If it keeps happening, please contact support.']);
      }
      if (error && error?.response?.status !== 500) {
        setState(ValidateEmailState.EXPIRED);
      }
    }
  };

  useEffect(() => {
    if (token) {
      handleValidateEmail();
    }
  }, [token]);

  return (
    <>
      <div className={styles.loginForm}>
        <div className={headerClasses}>
          <img src={logo} alt="logo" className={styles.logo} />
          {hasResponseErrors && <span className={styles.error}>{responseErrors[0]}</span>}
        </div>
        {(state === ValidateEmailState.INITIAL || state === ValidateEmailState.VALIDATING) && (
          <div className={styles.message}>
            <Text htmlTag="h2">Validating</Text>
            <Text size="m" align="center">
              Validating your email...
            </Text>
            <Spinner size={36} name="loadingCircle" />
          </div>
        )}
        {state === ValidateEmailState.EXPIRED && (
          <div className={styles.message}>
            <Text htmlTag="h2">Expired</Text>
            <Text size="m" align="center">
              The link has expired. Please request a new one.
            </Text>
          </div>
        )}
        {state === ValidateEmailState.VALIDATED && (
          <div className={styles.message}>
            <Text htmlTag="h2">Validated</Text>
            <Text size="m" align="center">
              Your email has been validated.
            </Text>
            <Button onClick={() => (document.location = 'https://app.bloobirds.com')}>
              Go to the app
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ValidateEmailRoute;
