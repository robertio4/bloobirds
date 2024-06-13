import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { Call } from '@twilio/voice-sdk';
import clsx from 'clsx';

import { DialerStatus, useDialer } from './dialer';
import styles from './dialer.module.css';

function getHint(status: DialerStatus, warnings: any, errors: any, callStatus: Call.State, t: any) {
  if (warnings.length > 0) {
    return t('dialer.hints.unstableConnection');
  }
  if (errors.length > 0) {
    return t('dialer.hints.connectionError');
  }
  switch (status) {
    case DialerStatus.authorizing:
      return (
        <div className={styles.textAuthorizing}>
          <Text size="xs" color="softPeanut" align="center">
            {t('dialer.hints.noConfig')}
          </Text>
          <Text size="xs" color="softPeanut" align="center">
            {t('dialer.hints.logManually')}
          </Text>
          <Text size="xs" color="softPeanut" align="center">
            <a
              href="https://support.bloobirds.com/hc/en-us/articles/6956014352412-How-to-add-phone-numbers"
              target="_blank"
              rel="noreferrer"
            >
              {t('dialer.hints.help')}
            </a>
          </Text>
          <Text size="xs" color="softPeanut" align="center">
            {t('dialer.hints.onlyAdmins')}
          </Text>
        </div>
      );

    case DialerStatus.registering:
      return t('dialer.hints.buildingDialer');
    case DialerStatus.idle:
      return t('dialer.hints.readyToCall');
    case DialerStatus.connected:
      switch (callStatus) {
        case Call.State.Connecting:
          return t('dialer.hints.connecting');
        case Call.State.Ringing:
          return t('dialer.hints.ringing');
        case Call.State.Open:
          return t('dialer.hints.callInProgress');
        case Call.State.Closed:
          return t('dialer.hints.callEnded');
        case Call.State.Reconnecting:
          return t('dialer.hints.reconnecting');
        case Call.State.Pending:
          return t('dialer.hints.incomingCall');
      }
      break;
    case DialerStatus.callEnded:
      return t('dialer.hints.callEnded');
  }
}

export const DialerConnectionHint = () => {
  const status = useDialer(state => state.status);
  const callStatus = useDialer(state => state.callStatus);
  const errors = useDialer(state => state.errors);
  const warnings = useDialer(state => state.warnings);
  const { t } = useTranslation();

  const hint = getHint(status, warnings, errors, callStatus, t);

  const hintClasses = clsx(styles.connectionHint, {
    [styles.noConfig]: status === DialerStatus.authorizing,
  });

  return (
    <div className={hintClasses}>
      <Text size="xs" color="softPeanut">
        {hint}
      </Text>
    </div>
  );
};
