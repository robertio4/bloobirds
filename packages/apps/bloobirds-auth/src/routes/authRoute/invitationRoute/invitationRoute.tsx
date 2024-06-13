import * as React from 'react';
import { useEffect } from 'react';
import {set, SubmitHandler, useController, useForm} from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Button, Input, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import { sha512 } from 'js-sha512';

import logo from '../../../assets/logo.svg';
import PasswordInput from '../../../components/passwordInput.tsx';
import { getApiUrl } from '../../../utils/urls.ts';
import { InputFeedbackItem } from '../resetPasswordRoute/components/inputFeedback/inputFeedbackItem';
import { InputFeedbackList } from '../resetPasswordRoute/components/inputFeedback/inputFeedbackList';
import styles from './invitationRoute.module.css';

interface IInvitationPayload {
  tokenId: string;
  password: string;
  name: string;
  shortName: string;
}

interface IInvitationForm {
  newUsername: string;
  newPassword: string;
  confirmPassword: string;
}

enum InvitationState {
  INITIAL = 'INITIAL',
  VALIDATING = 'VALIDATING',
  VALIDATED = 'VALIDATED',
  EXPIRED = 'EXPIRED',
}

const checkInvitation = async (token: string) => {
  return await axios.post(getApiUrl() + '/service/externalAction/invitation', {
    token,
    requesterSystem: 'web_App',
  });
};

const confirmInvitation = async (data: IInvitationPayload) => {
  return await axios.post(getApiUrl() + '/service/externalAction/invitation/confirm', data);
};

function generateShortName(name: string) {
  const nameA = name.replace(/[^a-zA-Z ]/g, ' ').split(' ');
  return nameA.length >= 2
    ? nameA[0].slice(0, 1).toUpperCase() + nameA[1].slice(0, 1).toUpperCase()
    : nameA[0].slice(0, 2).toUpperCase();
}

const InvitationRoute = () => {
  const [responseErrors, setResponseErrors] = React.useState<string[]>([]);
  const [state, setState] = React.useState<string>(InvitationState.INITIAL);
  const [isInvitedUser, setIsInvitedUser] = React.useState<boolean>(false);
  const [tokenId, setTokenId] = React.useState<string>('');

  const navigate = useNavigate();

  const { control, handleSubmit, formState, watch, setValue } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const errors = formState?.errors;

  const {
    field: { ref: newUsernameRef, ...newUsernameField },
  } = useController({
    name: 'newUsername',
    defaultValue: '',
    control,
    rules: isInvitedUser
      ? {
          required: 'This field is required',
        }
      : {},
  });

  const {
    field: { ref: newPasswordRef, ...newPasswordField },
  } = useController({
    name: 'newPassword',
    defaultValue: '',
    control,
    rules: {
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

  useEffect(() => {
    if (state === InvitationState.INITIAL) {
      // Check if the invitation is valid
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        setState(InvitationState.VALIDATING);
        checkInvitation(token)
          .then(response => {
            setState(InvitationState.VALIDATED);
            setTokenId(response.data.tokenId);
            const isInvitedUser = response.data.email === response.data.username;
            setIsInvitedUser(isInvitedUser);
            if (!isInvitedUser) {
              setValue('newUsername', response?.data?.username);
            }
          })
          .catch(() => {
            setState(InvitationState.EXPIRED);
          });
      } else {
        // setState(InvitationState.EXPIRED);
      }
    }
  }, []);

  const onSubmit: SubmitHandler<IInvitationForm> = async (data: IInvitationForm) => {
    try {
      const shortName = generateShortName(data.newUsername);
      await confirmInvitation({
        tokenId,
        password: sha512(data.newPassword),
        name: data.newUsername,
        shortName,
      });
      // Redirect to login
      navigate('/auth/login');
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
          {state === InvitationState.VALIDATED &&
            (isInvitedUser ? (
              <Text color="peanut" weight="medium" size="s" htmlTag="p" className={styles.hintText}>
                Set the name and password for your account!
              </Text>
            ) : (
              <Text color="peanut" weight="medium" size="s" htmlTag="p" className={styles.hintText}>
                Create your password to set up your account!
              </Text>
            ))}
          {hasResponseErrors && <span className={styles.error}>{responseErrors[0]}</span>}
        </div>
        {state === InvitationState.VALIDATED && (
          <>
            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>let's get everything ready</span>
              <div className={styles.dividerLine} />
            </div>
            <form className={styles.loginFormInputs} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.content}>
                {isInvitedUser && (
                  <Input
                    width="100%"
                    placeholder="Username *"
                    className={styles.usernameInput}
                    {...newUsernameField}
                  />
                )}
                <div className={styles.passwordInputs}>
                  <PasswordInput width="100%" placeholder="New Password" {...newPasswordField} />
                  <PasswordInput
                    width="100%"
                    placeholder="Confirm Password"
                    {...confirmPasswordField}
                  />
                </div>
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

                <Button
                  type="submit"
                  className={styles.saveButton}
                  disabled={formState.isSubmitting || !formState.isValid || !equalPasswords}
                >
                  Create password
                </Button>
              </div>
            </form>
          </>
        )}
        {state === InvitationState.VALIDATING && (
          <div className={styles.loginFormInputs}>
            <Text htmlTag="h2" size="l">
              Validating your invitation...
            </Text>
            <Text htmlTag="p" size="m">
              Please wait while we validate your invitation.
            </Text>
            <Spinner size={36} name="dots" />
          </div>
        )}
        {state === InvitationState.EXPIRED && (
          <div className={styles.loginFormInputs}>
            <Text htmlTag="h2" size="m" align="center" className={styles.expiredHeader}>
              Invitation expired
            </Text>
            <Text htmlTag="p" size="s" align="center">
              The invitation you are trying to use has expired, please contact your administrator.
            </Text>
            <Button
              type="button"
              className={styles.saveButton}
              onClick={() => navigate('/auth/login')}
            >
              Go to login
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default InvitationRoute;
