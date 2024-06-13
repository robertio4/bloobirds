import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Icon, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useEmailConnections, useEmailIntegrationMode } from '@bloobirds-it/hooks';
import { UserHelperKeys, UserSettings, PermissionType } from '@bloobirds-it/types';
import clsx from 'clsx';

import { GoogleSignIn, MicrosoftSignIn } from '../../../components/BrandedButtons';
import ConnectionCard from '../../../components/connectionCard';
import { useUserSettings, useUserSettingsReload } from '../../../components/userPermissions/hooks';
import { useActiveUser, useQueryParams } from '../../../hooks';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import { api } from '../../../utils/api';
import styles from './emailSettings.module.css';
import { fetchAndOpenLegacyUrl, fetchAndOpenNylasUrl } from './emailSettings.services';
import ManageSignatures from './manageSignatures/manageSignatures';

const EmailSettings = ({ userSettings }: { userSettings: UserSettings }) => {
  const { selectSignaturesPermission, autoInsertSignaturePermission } = userSettings;
  const [permissions, setPermissions] = useState({
    enableAutoInsertSignature: autoInsertSignaturePermission !== PermissionType.DISABLED,
    enableSelectSignature: selectSignaturesPermission !== PermissionType.DISABLED,
  });
  const [emailTrackingNotificationsEnabled, setEmailTrackingNotificationsEnabled] = useState(false);
  const { connections } = useEmailConnections();
  const { activeUser } = useActiveUser();
  const hasConnections = connections?.list && connections.list.length > 0;
  const { createToast } = useToasts();
  const settings = useUserSettings();
  const params = useQueryParams();
  const error = params.get('error');
  const helpers = useUserHelpers();
  const { accountIntegrationMode } = useEmailIntegrationMode();
  const userSettingsReload = useUserSettingsReload();
  const { t } = useTranslation();

  const googleOnClick =
    settings?.settings.gmailConnectButtonType === 'LEGACY'
      ? fetchAndOpenLegacyUrl
      : () => fetchAndOpenNylasUrl({ provider: 'gmail' });

  const emailIsDuplicated = error === 'ALREADY_CONNECTED';

  const emailConnections = {
    ...connections,
    duplicateEmail: {
      isDuplicated: emailIsDuplicated,
      errorMessage: emailIsDuplicated ? 'Connection not created. Email account already exists' : '',
    },
  };
  const {
    duplicateEmail: { isDuplicated: isDuplicatedEmail, errorMessage: duplicatedEmailError },
    list: nylasConnections,
  } = emailConnections;

  useEffect(() => {
    api
      .get(`/entities/users/${activeUser.id}`)
      .then(reponse => {
        setEmailTrackingNotificationsEnabled(reponse?.data?.emailTrackingNotificationsEnabled);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (nylasConnections?.length > 0) {
      helpers.save(UserHelperKeys.CONNECT_EMAIL_ACCOUNT);
    }
  }, [nylasConnections]);

  const onSubmit = async (data: any) => {
    let body;

    if (data.enabledAutoInsertSignature !== undefined) {
      body = {
        autoInsertSignaturePermission: data.enabledAutoInsertSignature
          ? PermissionType.ENABLED
          : PermissionType.DISABLED,
      };
      setPermissions({
        ...permissions,
        enableAutoInsertSignature: !permissions.enableAutoInsertSignature,
      });
    }

    if (data.enabledSelectSignature !== undefined) {
      body = {
        selectSignaturesPermission: data.enabledSelectSignature
          ? PermissionType.ENABLED
          : PermissionType.DISABLED,
      };
      setPermissions({
        ...permissions,
        enableSelectSignature: !permissions.enableSelectSignature,
      });
    }

    if (!body) {
      return;
    }

    try {
      await api.patch(`/entities/users/${activeUser.id}`, body);
      createToast({ type: 'success', message: 'Email settings updated' });
      userSettingsReload();
    } catch (error) {
      createToast({ type: 'error', message: 'Error updating email settings' });
    }
  };

  const onSubmitEmailTrackingInfo = async (emailTrackingNotificationsEnabled: boolean) => {
    setEmailTrackingNotificationsEnabled(emailTrackingNotificationsEnabled);

    try {
      await api.patch(`/entities/users/${activeUser.id}`, {
        emailTrackingNotificationsEnabled: emailTrackingNotificationsEnabled,
      });
      createToast({ type: 'success', message: 'Email settings updated' });
      userSettingsReload();
    } catch (error) {
      createToast({ type: 'error', message: 'Error updating email settings' });
    }
  };

  return (
    <div className={styles._container} data-intercom="user-settings-page-email">
      <div className={styles._content__box}>
        <div className={styles._section__box}>
          <div
            className={clsx(styles._email_buttons__wrapper, {
              [styles._email_buttons__disconnected]: !hasConnections,
            })}
          >
            {hasConnections ? (
              <Text size="m" weight="medium" color="peanut" htmlTag="span">
                {t('userSetings.email.connections.title')}
              </Text>
            ) : (
              <Text size="m" weight="bold" color="softPeanut" htmlTag="span">
                {t('userSetings.email.connections.empty')}
              </Text>
            )}
            {!accountIntegrationMode && (
              <div className={styles._email_buttons__container}>
                {settings?.settings.gmailConnectButtonEnabled && (
                  <GoogleSignIn onClick={googleOnClick} />
                )}
                {settings?.settings.microsoftConnectButtonEnabled && (
                  <MicrosoftSignIn onClick={() => fetchAndOpenNylasUrl({ provider: 'outlook' })} />
                )}
              </div>
            )}
          </div>
          {isDuplicatedEmail && (
            <div className={styles._message_error__container}>
              <Icon name="alertTriangle" color="tomato" />
              <span className={styles._message_error__text}>{duplicatedEmailError}</span>
            </div>
          )}
          <div className={styles._connections_container}>
            {nylasConnections?.map((connection: any) => (
              <ConnectionCard
                data={connection}
                isNylas
                key={connection.email}
                isDefault={connection.email === connections.defaultConnection}
              />
            ))}
          </div>
        </div>
        <div className={styles._signature__container}>
          <Text dataTest={'Email signature'} size="m" weight="bold">
            {t('userSetings.email.signature.title')}
          </Text>
          <Text size="s" color="softPeanut" weight="bold">
            {t('userSetings.email.signature.subtitle')}
          </Text>
          <ManageSignatures />
          <Checkbox
            expand
            checked={permissions.enableAutoInsertSignature}
            disabled={autoInsertSignaturePermission === PermissionType.FORCED}
            onClick={() =>
              onSubmit({
                enabledAutoInsertSignature: !permissions.enableAutoInsertSignature,
              })
            }
          >
            {t('userSetings.email.signature.addCheck')}
          </Checkbox>
          <Checkbox
            expand
            checked={permissions.enableSelectSignature}
            disabled={selectSignaturesPermission === PermissionType.FORCED}
            onClick={() =>
              onSubmit({
                enabledSelectSignature: !permissions.enableSelectSignature,
              })
            }
          >
            {t('userSetings.email.signature.changeCheck')}
          </Checkbox>
        </div>
        <div className={styles._form__box}>
          <Text color="peanut" size="m" weight="medium">
            {t('userSetings.email.tracking.title')}
          </Text>
          <Checkbox
            expand
            checked={emailTrackingNotificationsEnabled}
            onClick={() => onSubmitEmailTrackingInfo(!emailTrackingNotificationsEnabled)}
          >
            {t('userSetings.email.tracking.notifyCheck')}
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
