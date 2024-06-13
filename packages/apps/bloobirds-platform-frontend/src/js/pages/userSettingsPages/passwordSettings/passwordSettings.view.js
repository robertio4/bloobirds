import React from 'react';
import { sha512 } from 'js-sha512';
import { ServiceApi } from '../../../misc/api/service';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import PasswordChangeForm from './passwordChangeForm/passwordChangeForm';

const PasswordSettings = ({ onSubmit }) => {
  const { createToast } = useToasts();

  const onSave = async ({ oldPassword, newPassword }) => {
    try {
      await ServiceApi.request({
        url: '/service/users/me/updatePassword',
        method: 'POST',
        body: { oldPassword: sha512(oldPassword), newPassword: sha512(newPassword) },
      });
      if (onSubmit) onSubmit();
      createToast({ type: 'success', message: 'Your password has been updated!' });
    } catch {
      createToast({ type: 'error', message: 'Your password is not correct!' });
    }
  };

  return <PasswordChangeForm onSave={onSave} />;
};

export default PasswordSettings;
