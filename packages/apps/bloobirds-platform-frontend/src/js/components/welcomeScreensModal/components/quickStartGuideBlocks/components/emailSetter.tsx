import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { ConnectionResponse, Connections, PermissionType } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR, { SWRResponse } from 'swr';

import { useActiveUser } from '../../../../../hooks';
import ManageSignatures from '../../../../../pages/userSettingsPages/emailSettings/manageSignatures/manageSignatures';
import { useUserSettings, useUserSettingsReload } from '../../../../userPermissions/hooks';
import { EmailDisplay } from './emailDisplay';
import styles from './otoQSGSteps.module.css';

const fetchConnections = async (url: string) => {
  const response: ConnectionResponse = await api.get('/utils' + url).then(res => res.data);
  const defaultConnection = response.nylasTokens.find(connection => connection.default);

  return {
    list: response.nylasTokens,
    defaultConnection: defaultConnection?.email,
    stoppedConnections: response.nylasTokens.filter(
      token => token.syncState === 'stopped' || token.syncState === 'invalid',
    ),
  };
};

export const EmailSetter = () => {
  const settings = useUserSettings();
  const userSettings = settings?.user;
  const { t } = useTranslation('translation', {
    keyPrefix: 'quickStartGuide.oto.blocks.email.content',
  });
  const { selectSignaturesPermission, autoInsertSignaturePermission } = userSettings;
  const [permissions, setPermissions] = useState({
    enableAutoInsertSignature: autoInsertSignaturePermission !== PermissionType.DISABLED,
    enableSelectSignature: selectSignaturesPermission !== PermissionType.DISABLED,
  });
  const [emailTrackingNotificationsEnabled, setEmailTrackingNotificationsEnabled] = useState(false);
  useEffect(() => {
    api
      .get(`/entities/users/${activeUser.id}`)
      .then(reponse => {
        setEmailTrackingNotificationsEnabled(reponse?.data?.emailTrackingNotificationsEnabled);
      })
      .catch(console.error);
  }, []);

  const { activeUser } = useActiveUser();
  const { createToast } = useToasts();
  const userSettingsReload = useUserSettingsReload();

  const { data: connections }: SWRResponse<Connections> = useSWR(
    '/nylas/connections',
    fetchConnections,
  );
  const hasConnections = connections?.list && connections.list.length > 0;

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

  return (
    <div className={styles._signature__container}>
      <EmailDisplay connections={connections} />
      {hasConnections && (
        <>
          <Text color="peanut" size="s" weight="medium">
            {t('tracking.title')}
          </Text>
          <Checkbox
            expand
            size="small"
            checked={emailTrackingNotificationsEnabled}
            onClick={() => onSubmitEmailTrackingInfo(!emailTrackingNotificationsEnabled)}
          >
            {t('tracking.notifyCheck')}
          </Checkbox>
          <ManageSignatures isQSG />
          <Checkbox
            expand
            size="small"
            checked={permissions.enableAutoInsertSignature}
            disabled={autoInsertSignaturePermission === PermissionType.FORCED}
            onClick={() =>
              onSubmit({
                enabledAutoInsertSignature: !permissions.enableAutoInsertSignature,
              })
            }
          >
            {t('addCheck')}
          </Checkbox>
          <Checkbox
            expand
            size="small"
            checked={permissions.enableSelectSignature}
            disabled={selectSignaturesPermission === PermissionType.FORCED}
            onClick={() =>
              onSubmit({
                enabledSelectSignature: !permissions.enableSelectSignature,
              })
            }
          >
            {t('changeCheck')}
          </Checkbox>
        </>
      )}
    </div>
  );
};
