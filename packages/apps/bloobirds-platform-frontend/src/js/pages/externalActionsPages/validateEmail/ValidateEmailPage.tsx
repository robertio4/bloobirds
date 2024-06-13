import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';
import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useDocumentTitle } from '../../../hooks';
import { JwtApi } from '../../../misc/api/jwt';
import styles from '../externalActions.module.css';
import { APP } from '../../../app/_constants/routes';
import { LogoSvg } from '../../../../assets/svg';

enum ValidateEmailState {
  INITIAL,
  VALIDATING,
  VALIDATED,
  ERROR,
  EXPIRED,
}

export const ValidateEmailPage = () => {
  useDocumentTitle('Validate Email');
  const [state, setState] = useState<ValidateEmailState>(ValidateEmailState.INITIAL);

  useEffect(() => {
    if (state === ValidateEmailState.INITIAL) {
      setState(ValidateEmailState.VALIDATING);
      JwtApi.service.externalAction
        .validateEmail({ token: parse(window.location.search).token })
        .then(() => setState(ValidateEmailState.VALIDATED))
        .catch(() => setState(ValidateEmailState.EXPIRED));
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <LogoSvg fill="var(--bloobirds)" width={36} />
          <Text inline>Validate email</Text>
        </div>
        {state === ValidateEmailState.EXPIRED && (
          <div className={styles.message}>
            <Text htmlTag="h2">Expired</Text>
            <Text size="m" align="center">
              The link has expired. Please request a new one.
            </Text>
          </div>
        )}
        {state === ValidateEmailState.VALIDATED && (
          <div className={styles.message}>
            <Text htmlTag="h2">Validated</Text>
            <Text size="m" align="center">
              Your email has been validated.
            </Text>
            <Button onClick={() => (document.location = APP)}>Go to the app</Button>
          </div>
        )}
        {state === ValidateEmailState.VALIDATING ||
          (state === ValidateEmailState.INITIAL && (
            <div className={styles.message}>
              <Text htmlTag="h2">Validating</Text>
              <Text size="m" align="center">
                Validating your email...
              </Text>
              <Spinner size={36} name="loadingCircle" />
            </div>
          ))}
      </div>
    </div>
  );
};
