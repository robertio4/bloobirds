import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';
import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useDocumentTitle } from '../../../hooks';
import { JwtApi } from '../../../misc/api/jwt';
import SessionManagerFactory from '../../../misc/session';
import { APP } from '../../../app/_constants/routes';
import styles from '../externalActions.module.css';
import { LogoSvg } from '../../../../assets/svg';

enum SignAsPageState {
  INITIAL,
  REQUESTING,
  VALIDATED,
  EXPIRED,
}

export const SignAsPage = () => {
  useDocumentTitle('Sign As');
  const [state, setState] = useState<SignAsPageState>(SignAsPageState.INITIAL);
  const [jwtToken, setJwtToken] = useState<string>('');

  useEffect(() => {
    if (state === SignAsPageState.INITIAL) {
      setState(SignAsPageState.REQUESTING);
      JwtApi.service.externalAction
        .signAs({ token: parse(window.location.search).token })
        .then(response => {
          setState(SignAsPageState.VALIDATED);
          setJwtToken(response.token);
        })
        .catch(() => setState(SignAsPageState.EXPIRED));
    }
  }, [state, jwtToken]);

  const handleRedirectOnValidation = () => {
    SessionManagerFactory().setToken(jwtToken);
    document.location = APP;
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <LogoSvg fill="var(--bloobirds)" width={36} />
          <Text inline>Sign as</Text>
        </div>
        {state === SignAsPageState.EXPIRED && (
          <div className={styles.message}>
            <Text htmlTag="h2">Expired</Text>
            <Text size="m" align="center">
              The link you used is expired. Please try again.
            </Text>
          </div>
        )}
        {state === SignAsPageState.VALIDATED && (
          <div className={styles.message}>
            <Text htmlTag="h2">Success</Text>
            <Text size="m" align="center">
              You have successfully signed in as another user.
            </Text>
            <Button onClick={handleRedirectOnValidation}>Go to the app</Button>
          </div>
        )}
        {state === SignAsPageState.REQUESTING && (
          <div className={styles.requesting}>
            <h1>Requesting</h1>
            <p>Please wait while we validate your request.</p>
            <Spinner size={36} name="loadingCircle" />
          </div>
        )}
      </div>
    </div>
  );
};
