import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'clsx';
import { Button, Checkbox, Input, Text } from '@bloobirds-it/flamingo-ui';
import {
  APP_TASKS,
  EXTERNAL_ACTION_REQUEST_RESET_PASSWORD,
  TERMS_AND_CONDITIONS,
} from '../../../app/_constants/routes';
import styles from './loginForm.module.css';
import { useLogin } from '../../../hooks/useLogin';
import { useRouter } from '../../../hooks';

const LoginForm = () => {
  const { login } = useLogin();
  const [hasError, setHasError] = useState(false);
  const { history } = useRouter();
  const { handleSubmit, control, watch } = useForm({
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [allowedLogin, setAllowedLogin] = useState(false);
  const email = watch('email');
  const password = watch('password');
  const acceptTerms = watch('acceptTerms');

  const onSubmit = data => {
    if (!allowedLogin) {
      return;
    }
    login({ email: data?.email, password: data?.password })
      .then(() => history.push(APP_TASKS))
      .catch(() => setHasError(true));
  };

  useEffect(() => {
    setAllowedLogin(email && password && acceptTerms);
  }, [email, password, acceptTerms]);

  return (
    <div className={classNames(styles._container, { [styles._with_errors]: hasError })}>
      <div className={styles._title}>
        <Text htmlTag="h2" size="xl">
          Signing into Bloobirds
        </Text>
      </div>
      {hasError && (
        <div className={styles._error_message} data-test="loginErrorMessage">
          Your login attempt has failed. Make sure the username and password are correct.
        </div>
      )}
      <form className={styles._form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles._input_wrapper}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            as={
              <Input
                // error={errorValidatedEmail ? requiredMsg : ''}
                placeholder="Email"
                type="email"
                // value={email}
                width="100%"
                // onChange={value => setEmail(value)}
                dataTest="Login-Email"
              />
            }
          />
        </div>
        <div className={styles._input_wrapper}>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            as={
              <Input
                // error={errorValidatedPassword ? requiredMsg : ''}
                width="100%"
                placeholder="Password"
                dataTest="Login-Password"
                type={showPassword ? 'text' : 'password'}
                icon={showPassword ? 'eye' : 'eyeOff'}
                // value={password}
                onSubmit={() => setShowPassword(!showPassword)}
                // onChange={value => setPassword(value)}
                autoComplete="current-password"
              />
            }
          />
        </div>
        <Link to={EXTERNAL_ACTION_REQUEST_RESET_PASSWORD} className={styles._link}>
          Forgot your password?
        </Link>
        <Controller
          name="acceptTerms"
          control={control}
          render={({ onChange, value }) => (
            <Checkbox
              size="small"
              expand
              dataTest="Login-Checkbox"
              checked={value}
              onClick={onChange}
            >
              <span>
                Accept the{' '}
                <a
                  className={styles._terms_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={TERMS_AND_CONDITIONS}
                >
                  {' '}
                  master subscription agreement
                </a>
              </span>
            </Checkbox>
          )}
        />
        <div className={styles._button_wrapper}>
          <Button dataTest="Login-Submit" expand disabled={!allowedLogin} type="submit">
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
