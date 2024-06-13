import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Button, Input, Spinner } from '@bloobirds-it/flamingo-ui';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';

import logo from '../../../assets/logo.svg';
import { getApiUrl } from '../../../utils/urls.ts';
import styles from './recoverPasswordRoute.module.css';

interface IRecoverForm {
  email: string;
}

enum RecoverPasswordState {
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  REQUESTING = 'REQUESTING',
}

const EMAIL_REGEX_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const requestPasswordReset = async (email: string) => {
  return await axios.post(getApiUrl() + '/service/externalAction/requestRecoverPassword', {
    email,
  });
};
const RecoverPasswordRoute = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const [responseErrors, setResponseErrors] = React.useState<string[]>([]);
  const [state, setState] = React.useState<string>(RecoverPasswordState.INITIAL);
  const navigate = useNavigate();

  const hasResponseErrors = responseErrors.length > 0;
  const headerClasses = clsx(styles.loginFormHeader, {
    [styles.noErrors]: !hasResponseErrors,
  });

  const onSubmit: SubmitHandler<IRecoverForm> = async (data: any) => {
    try {
      const { email } = data;
      if (email) {
        setState(RecoverPasswordState.REQUESTING);
        await requestPasswordReset(email);
        setState(RecoverPasswordState.SUCCESS);
      }
      /*const response = await login(username, password);
      successLogin(response);*/
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        setState(RecoverPasswordState.INITIAL);
        setResponseErrors([
          'Invalid credentials. Make sure the email matches the one you used to create the user.',
        ]);
      }
      if (error?.response?.status === 403) {
        setState(RecoverPasswordState.INITIAL);
        setResponseErrors(['Your account has been disabled.']);
      }
      if (error?.response?.status === 500) {
        setState(RecoverPasswordState.INITIAL);
        setResponseErrors(['Something went wrong. If it keeps happening, please contact support.']);
      }
    }
  };

  return (
    <>
      <div className={styles.loginForm}>
        <div className={headerClasses}>
          <img src={logo} alt="logo" className={styles.logo} />
          {state === RecoverPasswordState.INITIAL && (
            <span className={styles.title}>
              Enter your email address and we will send you an email with instructions on how to
              reset your password.
            </span>
          )}
        </div>
        {state === RecoverPasswordState.INITIAL && (
          <>
            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>recover</span>
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
                  <Input
                    {...field}
                    placeholder="Email"
                    width="100%"
                    error={errors?.email?.message}
                  />
                )}
              />
              <Button variant="primary" width="100%" type="submit">
                Send recovery email
              </Button>
              <div className={styles.noSelectableText}>
                {errors.terms && <span className={styles.error}>{errors.terms.message}</span>}
                {hasResponseErrors && <span className={styles.error}>{responseErrors[0]}</span>}
              </div>
            </form>
          </>
        )}
        {state === RecoverPasswordState.SUCCESS && (
          <div className={styles.loginFormInputs}>
            <span className={styles.successText}>
              We have sent you an email with instructions on how to reset your password.
            </span>
            <Button variant="primary" width="100%" onClick={() => navigate('/auth/login')}>
              Back to login
            </Button>
          </div>
        )}
        {state === RecoverPasswordState.REQUESTING && (
          <div className={styles.loginFormInputs}>
            <span className={styles.successText}>Requesting password reset...</span>
            <div className={styles.spinner}>
              <Spinner name={'loadingCircle'} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecoverPasswordRoute;
