import { useLayoutEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Checkbox, Icon, Input, Text } from '@bloobirds-it/flamingo-ui';
import { MessagesEvents } from '@bloobirds-it/types';
import { getAuthUrl, login } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { useIsNewAuthEnabled } from '../../../hooks/useIsNewAuthEnabled';
import { useExtensionContext } from '../context';
import LogoHeader from '../logoHeader/logoHeader';
import styles from './loginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { setLoggedIn, useGetSidePeekEnabled } = useExtensionContext();
  const isNewAuthEnabled = useIsNewAuthEnabled();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { t } = useTranslation('translation', { keyPrefix: 'extension.login' });

  useLayoutEffect(() => {
    setLoginError(false);
  }, [email, password]);

  const enableLogin = () => !processing && terms && email.length && password.length;

  const handleLogin = async () => {
    setProcessing(true);
    try {
      await login({ email, password });
      setLoginSuccess(true);
      setLoggedIn(true);
      window.dispatchEvent(new CustomEvent(MessagesEvents.UserLoggedIn));
      window.location.reload();
    } catch (error) {
      setLoginError(true);
    } finally {
      setProcessing(false);
    }
  };

  const logeWrapperClasses = clsx(styles._logoWrapper, {
    [styles._logoWrapperSidePeek]: sidePeekEnabled,
  });

  const formBottomClasses = clsx(styles._formBottom, {
    [styles._formBottomSidePeek]: sidePeekEnabled,
  });

  return (
    <>
      <div className={logeWrapperClasses}>
        <LogoHeader sidePeekEnabled={sidePeekEnabled} />
      </div>
      {!isNewAuthEnabled ? (
        <form className={styles._form}>
          <div className={styles._formTop}>
            <Input placeholder={t('emailPlaceholder')} value={email} onChange={setEmail} />
            <Input
              placeholder={t('passwordPlaceholder')}
              type="password"
              value={password}
              onChange={setPassword}
            />
            <Checkbox size="small" checked={terms} onClick={setTerms} dataTest="login-terms-agree">
              <span style={{ fontSize: 11 }}>
                <Trans
                  i18nKey="extension.login.termsAndConditions"
                  components={[
                    <a
                      key="0"
                      href="https://app.bloobirds.com/master-subscription-agreement"
                      target="_blank"
                      rel="noreferrer"
                    ></a>,
                  ]}
                />
              </span>
            </Checkbox>
            {loginError && (
              <div className={styles._errorWrapper}>
                <Icon name="alertCircle" color="tomato" />
                <Text color="tomato" size="s">
                  {t('failed')}
                </Text>
              </div>
            )}
          </div>
          <div className={formBottomClasses}>
            <Button expand disabled={!enableLogin()} onClick={handleLogin} dataTest="login-submit">
              {t('login')}
            </Button>
            <Button
              onClick={() => {
                window.open(
                  'https://app.bloobirds.com/externalAction/requestResetPassword',
                  '_blank',
                );
              }}
              variant="tertiary"
              expand
            >
              {t('forgotPassword')}
            </Button>
            {loginSuccess && <p>{t('success')}</p>}
          </div>
        </form>
      ) : (
        <div className={styles.external_login}>
          <Button
            onClick={() => window.open(getAuthUrl() + '?refUrl=' + window.location.href, '_blank')}
            dataTest="login-external-submit"
            expand
            iconRight="externalLink"
          >
            {t('login')}
          </Button>
        </div>
      )}
    </>
  );
};

export default LoginForm;
