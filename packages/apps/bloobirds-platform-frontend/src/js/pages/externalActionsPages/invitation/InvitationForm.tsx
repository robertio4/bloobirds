import { Button, Input, Text } from '@bloobirds-it/flamingo-ui';
import React, { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';

import { InputFeedbackItem } from '../../../components/inputFeedback/inputFeedbackItem';
import { InputFeedbackList } from '../../../components/inputFeedback/inputFeedbackList';
import { Message } from 'js-sha512';
import PasswordInput from '../../../components/passwordInput/passwordInput';
import styles from './invitationForm.module.css';

const InvitationForm = ({
  onSave,
  isInvitedUser,
}: {
  onSave: (newPassword: Message, newUsername?: string) => void;
  isInvitedUser: boolean;
}) => {
  const { control, handleSubmit, formState, errors, watch, trigger } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      newUsername: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

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
        minLength: data => data.length > 7,
        uppercaseCharacter: data => !!data.match(/[A-Z]/),
        lowercaseCharacter: data => !!data.match(/[a-z]/),
        specialSymbol: data => !!data.match(/[^A-z]/),
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

  // Invalidate errors initially
  useEffect(() => {
    trigger();
  }, []);

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const equalPasswords = newPassword && confirmPassword && newPassword === confirmPassword;

  const onSubmit = async (data: { newPassword: Message; newUsername: string }) => {
    onSave(data.newPassword, data?.newUsername);
  };

  const numCharactersValid = !(errors && errors.newPassword && errors.newPassword.types
    ? errors.newPassword.types.minLength
    : undefined);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} data-intercom="user-settings-page-security">
          <div className={styles.content}>
            {isInvitedUser ? (
              <Text color="softPeanut" weight="medium" size="m" htmlTag="span">
                Set the name and password for your account!
              </Text>
            ) : (
              <Text color="softPeanut" weight="medium" size="m" htmlTag="span">
                Create your password to set up your account!
              </Text>
            )}
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
                    !(errors && errors.newPassword && errors.newPassword.types
                      ? errors.newPassword.types.uppercaseCharacter
                      : undefined)
                  }
                >
                  One uppercase character
                </InputFeedbackItem>
                <InputFeedbackItem
                  valid={
                    !(errors.newPassword && errors.newPassword.types
                      ? errors.newPassword.types.lowercaseCharacter
                      : undefined)
                  }
                >
                  One lowercase character
                </InputFeedbackItem>
                <InputFeedbackItem
                  valid={
                    !(errors.newPassword && errors.newPassword.types
                      ? errors.newPassword.types.specialSymbol
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
      </div>
    </div>
  );
};

export default InvitationForm;
