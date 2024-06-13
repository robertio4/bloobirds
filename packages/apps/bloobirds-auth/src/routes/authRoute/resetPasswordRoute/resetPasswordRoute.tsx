import * as React from 'react';
import { Controller, SubmitHandler, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Button, Input, Spinner } from '@bloobirds-it/flamingo-ui';
import { getOnKeyDownCaption } from '@udecode/plate';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import { sha512 } from 'js-sha512';

import logo from '../../../assets/logo.svg';
import PasswordInput from '../../../components/passwordInput.tsx';
import { getApiUrl } from '../../../utils/urls.ts';
import { InputFeedbackItem } from './components/inputFeedback/inputFeedbackItem.tsx';
import { InputFeedbackList } from './components/inputFeedback/inputFeedbackList.tsx';
import styles from './resetPasswordRoute.module.css';

interface IRecoverForm {
  password: string;
}

enum RecoverPasswordState {
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  REQUESTING = 'REQUESTING',
}

const requestPasswordReset = async ({ token, password }: { token: string; password: string }) => {
  return await axios.post(getApiUrl() + '/service/externalAction/recoverPassword', {
    token,
    password,
  });
};
const ResetPasswordRoute = () => {
  const [responseErrors, setResponseErrors] = React.useState<string[]>([]);
  const [state, setState] = React.useState<string>(RecoverPasswordState.INITIAL);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const {
    field: { ref: newPasswordRef, ...newPasswordField },
  } = useController({
    name: 'newPassword',
    defaultValue: '',
    control,
    rules: {
      required: true,
      validate: {
        minLength: (data: string | any[]) => data.length > 7,
        uppercaseCharacter: (data: string) => !!data.match(/[A-Z]/),
        lowercaseCharacter: (data: string) => !!data.match(/[a-z]/),
        specialSymbol: (data: string) => !!data.match(/[^A-z]/),
      },
    },
  });

  const {
    field: { ref: confirmPasswordRef, ...confirmPasswordField },
  } = useController({
    name: 'confirmPassword',
    defaultValue: '',
    control,
  });

  const hasResponseErrors = responseErrors?.length > 0;
  const headerClasses = clsx(styles.loginFormHeader, {
    [styles.noErrors]: !hasResponseErrors,
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const equalPasswords = newPassword && confirmPassword && newPassword === confirmPassword;

  const numCharactersValid = !(errors && errors?.newPassword && errors?.newPassword.types
    ? errors?.newPassword.types.minLength
    : undefined);

  const onSubmit: SubmitHandler<IRecoverForm> = async (data: any) => {
    try {
      const { newPassword: pass } = data;
      const token = new URLSearchParams(window.location.search).get('token');
      if (token && pass) {
        setState(RecoverPasswordState.REQUESTING);
        await requestPasswordReset({ token, password: sha512(pass) });
        setState(RecoverPasswordState.SUCCESS);
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 401) {
        setResponseErrors([
          'The link you are trying to use is invalid. Please request a new password reset link.',
        ]);
      }
      if (error?.response?.status === 400) {
        setResponseErrors(['The password reset link has expired. Please request a new one.']);
      }
      if (error?.response?.status === 500) {
        setResponseErrors([
          'An error has occurred. Please try again later. If the problem persists, please contact support.',
        ]);
      }
      setTimeout(() => {
        setResponseErrors([]);
        navigate('/auth/recoverPassword');
      }, 3000);
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
          {hasResponseErrors && <span className={styles.error}>{responseErrors[0]}</span>}
        </div>
        {state === RecoverPasswordState.INITIAL && (
          <>
            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>recover</span>
              <div className={styles.dividerLine} />
            </div>
            <form className={styles.loginFormInputs} onSubmit={handleSubmit(onSubmit)}>
              <PasswordInput width="100%" placeholder="New Password" {...newPasswordField} />
              <PasswordInput
                width="100%"
                placeholder="Confirm Password"
                {...confirmPasswordField}
              />
              <div className={styles.inputFeedback}>
                <InputFeedbackList>
                  <InputFeedbackItem valid={equalPasswords}>
                    Both passwords should match
                  </InputFeedbackItem>
                  <InputFeedbackItem valid={numCharactersValid}>
                    At least 8 characters
                  </InputFeedbackItem>
                  <InputFeedbackItem
                    valid={
                      !(errors && errors?.newPassword && errors?.newPassword.types
                        ? errors?.newPassword.types.uppercaseCharacter
                        : undefined)
                    }
                  >
                    One uppercase character
                  </InputFeedbackItem>
                  <InputFeedbackItem
                    valid={
                      !(errors?.newPassword && errors?.newPassword.types
                        ? errors?.newPassword.types.lowercaseCharacter
                        : undefined)
                    }
                  >
                    One lowercase character
                  </InputFeedbackItem>
                  <InputFeedbackItem
                    valid={
                      !(errors?.newPassword && errors?.newPassword.types
                        ? errors?.newPassword.types.specialSymbol
                        : undefined)
                    }
                  >
                    One number or special symbol
                  </InputFeedbackItem>
                </InputFeedbackList>
              </div>
              <Button variant="primary" width="100%" type="submit" className={styles.submitButton}>
                Reset Password
              </Button>
            </form>
          </>
        )}
        {state === RecoverPasswordState.SUCCESS && (
          <div className={styles.loginFormInputs}>
            <span className={styles.successText}>
              Your new password has been set successfully! 🎉
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

export default ResetPasswordRoute;
