import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Button, Checkbox, Input, Text } from '@bloobirds-it/flamingo-ui';
import { useGoogleLogin } from '@react-oauth/google';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';

import logo from '../../../assets/logo.svg';
import PasswordInput from '../../../components/passwordInput.tsx';
import SSOButton from '../../../components/ssoButton/ssoButton';
import {
  login,
  socialLogin,
  successExtensionLogin,
  successLogin,
} from '../../../utils/authentication.ts';
import styles from './loginRoute.module.css';

interface ILoginForm {
  email: string;
  password: string;
  terms: boolean;
}

const EMAIL_REGEX_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const LoginRoute = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
  });
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [responseErrors, setResponseErrors] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: { access_token: string }) => {
      try {
        if (!tokenResponse.access_token) {
          throw new Error('No access token');
        }
        const response = await socialLogin(tokenResponse.access_token, 'GOOGLE', 'linkedin_ce');
        successExtensionLogin(response);

        const webAppLoginResponse = await socialLogin(
          tokenResponse.access_token,
          'GOOGLE',
          'web_App',
        );
        const urlParams = new URLSearchParams(window.location.search);
        const refUrl = urlParams.get('refUrl');
        const fromExtensionInstall = urlParams.get('fromExtensionInstall');
        successLogin(webAppLoginResponse, refUrl, fromExtensionInstall);
      } catch (e) {
        const error = e as AxiosError;
        if (
          error?.response?.data?.errorDescription &&
          typeof error.response.data.errorDescription === 'string'
        ) {
          setResponseErrors([error.response.data.errorDescription]);
        } else {
          setResponseErrors(["Couldn't login with Google, please try again later"]);
        }
      }
    },
    onError: () => setResponseErrors(["Couldn't login with Google, please try again later"]),
  });

  const hasResponseErrors = responseErrors.length > 0;
  const headerClasses = clsx(styles.loginFormHeader, {
    [styles.noErrors]: !hasResponseErrors,
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data: any) => {
    if (!termsAccepted) {
      setError('terms', {
        type: 'manual',
        message: 'You must accept the terms and conditions',
      });
      return;
    }
    try {
      const { email, password } = data;
      if (email && password) {
        const loginResponse = await login(email, password, 'linkedin_ce');
        successExtensionLogin(loginResponse);

        const webAppLoginResponse = await login(email, password, 'web_App');

        const urlParams = new URLSearchParams(window.location.search);
        const refUrl = urlParams.get('refUrl');
        const fromExtensionInstall = urlParams.get('fromExtensionInstall');
        successLogin(webAppLoginResponse, refUrl, fromExtensionInstall);
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 401) {
        setResponseErrors([
          'Invalid credentials. Make sure the username and password are correct.',
        ]);
      }
    }
  };

  return (
    <>
      <div className={styles.loginForm}>
        <div className={headerClasses}>
          <img src={logo} alt="logo" className={styles.logo} />
          {hasResponseErrors && <span className={styles.error}>{responseErrors[0]}</span>}
        </div>
        <div className={styles.loginFormConnections}>
          <SSOButton provider="Google" onClick={() => googleLogin()} />
        </div>
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>or continue with email</span>
          <div className={styles.dividerLine} />
        </div>
        <form className={styles.loginFormInputs} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: 'You need to fill the email' },
              pattern: {
                value: EMAIL_REGEX_PATTERN,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Email" width="100%" error={errors?.email?.message} />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: { value: true, message: 'You need to fill your password' } }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder="Password"
                width="100%"
                error={errors?.password?.message}
              />
            )}
          />
          <Button variant="primary" width="100%" type="submit">
            Log in
          </Button>
          <div className={styles.noSelectableText}>
            <Checkbox
              value={termsAccepted}
              onClick={(e: boolean) => {
                clearErrors('terms');
                setTermsAccepted(e);
              }}
              size="small"
            >
              I accept the{' '}
              <a
                href="https://app.bloobirds.com/master-subscription-agreement"
                className={styles.termsAndConditionsLink}
              >
                {' '}
                terms and conditions
              </a>
            </Checkbox>
            {errors.terms && <span className={styles.error}>{errors.terms.message}</span>}
            <div
              className={styles.recoverPassword}
              onClick={() => navigate('/auth/recoverPassword')}
            >
              <Text size="xs" color="peanut">
                Forgot your password?
              </Text>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginRoute;
