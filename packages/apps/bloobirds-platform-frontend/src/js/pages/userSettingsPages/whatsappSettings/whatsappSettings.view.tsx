import React, { useState } from 'react';

import { Checkbox, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { UserSettings, PermissionType } from '@bloobirds-it/types';

import { useUserSettingsReload } from '../../../components/userPermissions/hooks';
import { ServiceApi } from '../../../misc/api/service';
import styles from './whatsappSettings.module.css';

const WhatsappSettings = ({ userSettings }: { userSettings: UserSettings }) => {
  const { autoSyncWhatsappPermission, id } = userSettings;
  const [enableAutoSync, setEnableAutoSync] = useState(
    autoSyncWhatsappPermission !== PermissionType.DISABLED,
  );
  const userSettingsReload = useUserSettingsReload();
  const { createToast } = useToasts();

  const onChange = () => {
    setEnableAutoSync(!enableAutoSync);

    ServiceApi.request({
      url: `/service/users/${id}`,
      method: 'PATCH',
      body: {
        autoSyncWhatsappPermission: !enableAutoSync
          ? PermissionType.ENABLED
          : PermissionType.DISABLED,
      },
    })
      .then(() => {
        createToast({ type: 'success', message: 'Your settings have been updated!' });
        userSettingsReload();
      })
      .catch(() => {
        createToast({
          type: 'error',
          message: 'There was an error saving your personal settings!',
        });
      });
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <Text size="m" color="softPeanut" htmlTag="span" weight="bold">
          Enable auto-sync chats
        </Text>
        <Text size="s" color="peanut" htmlTag="span">
          Automatically sync a prospect&apos;s chat when accessing if from WhatsApp web as long as
          it is saved in the database.
        </Text>
        <Checkbox
          onClick={onChange}
          checked={enableAutoSync}
          size="medium"
          disabled={autoSyncWhatsappPermission === PermissionType.FORCED}
          expand
        >
          Enable auto-sync of WhatsApp chats
        </Checkbox>
        {autoSyncWhatsappPermission === PermissionType.FORCED && (
          <Text size="s" color="peanut" htmlTag="span">
            This function is enabled by default by an account admin. If you want to disable it,
            please talk to your supervisor.
          </Text>
        )}
      </div>
    </div>
  );
};

export default WhatsappSettings;
