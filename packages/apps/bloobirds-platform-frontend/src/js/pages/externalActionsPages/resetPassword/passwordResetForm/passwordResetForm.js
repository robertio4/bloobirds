import React, { useEffect } from 'react';
import styles from './passwordResetForm.module.css';
import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { useController, useForm } from 'react-hook-form';
import PasswordInput from '../../../../components/passwordInput/passwordInput';
import { InputFeedbackList } from '../../../../components/inputFeedback/inputFeedbackList';
import { InputFeedbackItem } from '../../../../components/inputFeedback/inputFeedbackItem';

const PasswordResetForm = ({ onSave }) => {
  const { control, handleSubmit, formState, errors, watch, trigger } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
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

  const onSubmit = async data => onSave(data.newPassword);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} data-intercom="user-settings-page-security">
        <div className={styles.content}>
          <Text color="softPeanut" weight="medium" size="m" htmlTag="span">
            Create new passwords
          </Text>
          <div className={styles.passwordInputs}>
            <PasswordInput width="100%" placeholder="New Password" {...newPasswordField} />
            <PasswordInput width="100%" placeholder="Confirm Password" {...confirmPasswordField} />
          </div>
          <InputFeedbackList>
            <InputFeedbackItem valid={equalPasswords}>
              Both passwords should match
            </InputFeedbackItem>
            <InputFeedbackItem valid={!errors.newPassword?.types.minLength}>
              At least 8 characters
            </InputFeedbackItem>
            <InputFeedbackItem valid={!errors.newPassword?.types.uppercaseCharacter}>
              One uppercase character
            </InputFeedbackItem>
            <InputFeedbackItem valid={!errors.newPassword?.types.lowercaseCharacter}>
              One lowercase character
            </InputFeedbackItem>
            <InputFeedbackItem valid={!errors.newPassword?.types.specialSymbol}>
              One number or special symbol
            </InputFeedbackItem>
          </InputFeedbackList>
          <Button
            type="submit"
            className={styles.saveButton}
            disabled={formState.isSubmitting || !formState.isValid || !equalPasswords}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;
