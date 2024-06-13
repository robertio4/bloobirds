import React, { useEffect } from 'react';
import styles from './passwordChangeForm.module.css';
import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { useController, useForm } from 'react-hook-form';
import PasswordInput from '../../../../components/passwordInput/passwordInput';
import { InputFeedbackItem } from '../../../../components/inputFeedback/inputFeedbackItem';
import { InputFeedbackList } from '../../../../components/inputFeedback/inputFeedbackList';

const PasswordChangeForm = ({ onSave }) => {
  const { control, handleSubmit, formState, errors, trigger, reset } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const {
    field: { ref: oldPasswordRef, ...oldPasswordField },
  } = useController({
    name: 'oldPassword',
    control,
    rules: { required: true },
    defaultValue: '',
  });

  const {
    field: { ref: newPasswordRef, ...newPasswordField },
  } = useController({
    name: 'newPassword',
    control,
    rules: {
      validate: {
        minLength: data => data.length > 7,
        uppercaseCharacter: data => !!data.match(/[A-Z]/),
        lowercaseCharacter: data => !!data.match(/[a-z]/),
        specialSymbol: data => !!data.match(/[^A-z]/),
      },
    },
    defaultValue: '',
  });

  // Invalidate errors initially
  useEffect(() => {
    trigger();
  }, []);

  async function onSubmit({ oldPassword, newPassword }) {
    await onSave({ oldPassword, newPassword });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-intercom="user-settings-page-security">
      <div className={styles.content}>
        <Text color="softPeanut" weight="medium" size="m" htmlTag="span">
          Change your password
        </Text>
        <div className={styles.passwordInputs}>
          <PasswordInput width="100%" placeholder="Current Password" {...oldPasswordField} />
          <PasswordInput width="100%" placeholder="New Password" {...newPasswordField} />
        </div>
        <InputFeedbackList>
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
          disabled={formState.isSubmitting || !formState.isValid}
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
