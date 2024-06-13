import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, createToast, Item, Select } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useUserHelpers } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useTimeZones } from '../../../../../hooks/useTimeZones';
import { ServiceApi } from '../../../../../misc/api/service';
import { useUserSettingsReload } from '../../../../userPermissions/hooks';
import styles from './otoQSGSteps.module.css';

export const TimezoneSetter = () => {
  const timeZones = useTimeZones();
  const { settings } = useActiveUserSettings();
  const [timezone, setTimezone] = useState(settings?.user?.timeZone);
  const userSettingsReload = useUserSettingsReload();
  const { save } = useUserHelpers();
  const { t } = useTranslation('translation', { keyPrefix: 'quickStartGuide.oto.blocks.timezone' });

  const userConfig = {
    color: settings?.user?.color,
    name: settings?.user?.name,
    shortname: settings?.user?.shortname || 'U',
  };

  const handleSubmit = () => {
    ServiceApi.request({
      url: '/service/users/me',
      method: 'POST',
      body: { ...userConfig, timeZone: timezone },
    })
      .then(() => {
        createToast({ type: 'success', message: t('toasts.success') });
        save(UserHelperKeys.SET_TIMEZONE);
        userSettingsReload();
      })
      .catch(() => {
        createToast({
          type: 'error',
          message: t('toasts.error'),
        });
      });
  };

  return (
    <div className={styles.timezone_container}>
      <Select
        onChange={setTimezone}
        value={timezone}
        width="350px"
        placeholder={t('myTimezone')}
        autocomplete
        size="small"
      >
        {timeZones?.map((tz: any) => (
          <Item label={tz.name} key={tz.location} value={tz.location}>
            {tz.name}
          </Item>
        ))}
      </Select>
      <Button variant="secondary" size="small" uppercase={false} onClick={handleSubmit}>
        {t('accept')}
      </Button>
    </div>
  );
};
