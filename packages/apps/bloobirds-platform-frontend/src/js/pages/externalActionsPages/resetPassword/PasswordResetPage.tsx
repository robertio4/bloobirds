import React, { useState } from 'react';
import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { parse } from 'query-string';
import { Message, sha512 } from 'js-sha512';
import { useDocumentTitle } from '../../../hooks';
import styles from '../externalActions.module.css';
import PasswordResetForm from './passwordResetForm/passwordResetForm';
import { JwtApi } from '../../../misc/api/jwt';
import { LogoSvg } from '../../../../assets/svg';
import { APP, EXTERNAL_ACTION_REQUEST_RESET_PASSWORD } from '../../../app/_constants/routes';

enum PasswordResetPageState {
  INITIAL,
  SUCCESS,
  PENDING,
  ERROR,
}

export const PasswordResetPage = () => {
  useDocumentTitle('Password Reset');
  const [state, setState] = useState<PasswordResetPageState>(PasswordResetPageState.INITIAL);

  const onSave = async (password: Message) => {
    try {
      await JwtApi.service.externalAction.recoverPassword({
        token: parse(window.location.search).token,
        hashedPassword: sha512(password),
      });
      setState(PasswordResetPageState.SUCCESS);
    } catch (e) {
      setState(PasswordResetPageState.ERROR);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <LogoSvg fill="var(--bloobirds)" width={36} />
          <Text inline>Password Reset</Text>
        </div>
        {state === PasswordResetPageState.ERROR && (
          <div className={styles.message}>
            <Text size="m">
              There was an error resetting your password. Please try again later.
            </Text>
            <Button onClick={() => (document.location = EXTERNAL_ACTION_REQUEST_RESET_PASSWORD)}>
              Request a new password reset
            </Button>
          </div>
        )}
        {state === PasswordResetPageState.SUCCESS && (
          <div className={styles.message}>
            <Text size="m">
              Your password has been reset. You can now login with your new password.
            </Text>
            <Button onClick={() => (document.location = APP)}>Log back in</Button>
          </div>
        )}
        {state === PasswordResetPageState.PENDING && (
          <div className={styles.pending}>
            <Text size="m">Resetting your password...</Text>
            <Spinner size={36} name="loadingCircle" />
          </div>
        )}
        {state === PasswordResetPageState.INITIAL && <PasswordResetForm onSave={onSave} />}
      </div>
    </div>
  );
};
