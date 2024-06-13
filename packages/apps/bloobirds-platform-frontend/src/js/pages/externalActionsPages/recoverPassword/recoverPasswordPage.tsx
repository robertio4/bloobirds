import React, { useState } from 'react';
import { Button, Input, Text } from '@bloobirds-it/flamingo-ui';
import { useDocumentTitle } from '../../../hooks';
import { JwtApi } from '../../../misc/api/jwt';
import styles from '../externalActions.module.css';
import { LogoSvg } from '../../../../assets/svg';

enum RecoverPasswordPageState {
  INITIAL,
  REQUESTING,
  SUCCESS,
  ERROR,
  EMAIL_NOT_FOUND,
}

export const RecoverPasswordPage = () => {
  useDocumentTitle('Recover password');
  const [email, setEmail] = useState<string>('');
  const [state, setState] = useState<RecoverPasswordPageState>(RecoverPasswordPageState.INITIAL);

  const onSubmit = () => {
    setState(RecoverPasswordPageState.REQUESTING);
    JwtApi.service.externalAction
      .requestRecoverPassword({ email })
      .then(res => {
        if (res?.response?.status >= 400) {
          setState(RecoverPasswordPageState.EMAIL_NOT_FOUND);
        } else {
          setState(RecoverPasswordPageState.SUCCESS);
        }
      })
      .catch(err => {
        setState(RecoverPasswordPageState.ERROR);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <LogoSvg fill="var(--bloobirds)" width={36} />
          <Text inline>Reset password</Text>
        </div>
        {state === RecoverPasswordPageState.SUCCESS && (
          <div className={styles.message}>
            <Text htmlTag="h2">Success</Text>
            <Text size="m" align="center">
              We have sent you an email with instructions on how to reset your password.
            </Text>
          </div>
        )}
        {state === RecoverPasswordPageState.ERROR && (
          <div className={styles.message}>
            <Text htmlTag="h2">Error</Text>
            <Text size="m" align="center">
              Something went wrong. Please try again later.
            </Text>
            <Button size="small" onClick={() => setState(RecoverPasswordPageState.INITIAL)}>
              Try again
            </Button>
          </div>
        )}
        {state === RecoverPasswordPageState.EMAIL_NOT_FOUND && (
          <div className={styles.message}>
            <Text htmlTag="h2" color="tomato">
              Email not found in Bloobirds
            </Text>
            <Text size="m" align="center">
              It seems like this email does not match with a Bloobirds user, try again with a
              different email.
            </Text>
            <Button size="small" onClick={() => setState(RecoverPasswordPageState.INITIAL)}>
              Try again
            </Button>
          </div>
        )}
        {state === RecoverPasswordPageState.INITIAL && (
          <div className={styles.form}>
            <Text size="m" align="center">
              Enter your email address and we will send you an email with instructions on how to
              reset your password.
            </Text>
            <form
              onSubmit={e => {
                e.preventDefault();
                onSubmit();
              }}
              className={styles.form}
            >
              <Input
                width="100%"
                placeholder="Email"
                type="email"
                value={email}
                onChange={value => setEmail(value)}
              />
              <Button type="submit">Send recovery email</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
