import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Icon, Item, Select, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useMediaQuery } from '../../../../../hooks';
import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import { ServiceApi } from '../../../../../misc/api/service';
import { useUserSettings, useUserSettingsReload } from '../../../../userPermissions/hooks';
import styles from './otoQSGSteps.module.css';

const MINUTES_ADVANCE_RANGE = [1, 5, 10, 20, 30, 60, 120];

export const RemindersSetter = () => {
  const settings = useUserSettings();
  const userSettings = settings?.user;
  const { isBigDesktop } = useMediaQuery();

  const defaultValues = {
    ...userSettings,
    remindersBeforeMinutes: `${
      userSettings?.remindersBeforeMinutes === 0 ? '5' : userSettings?.remindersBeforeMinutes
    }`,
  };
  const { createToast } = useToasts();
  const [remindersEnabled, setRemindersEnabled] = useState();
  const methods = useForm({ defaultValues, reValidateMode: 'onChange' });
  const { getValues, watch } = methods;
  const values = getValues();
  const userSettingsReload = useUserSettingsReload();
  const helpers = useUserHelpers();
  const { t } = useTranslation('translation', {
    keyPrefix: 'quickStartGuide.oto.blocks.taskAndReminders.content',
  });

  const handleChange = (onChange: () => void) => {
    onChange?.();
    ServiceApi.request({
      url: '/service/users/me/updateReminders',
      method: 'POST',
      body: { ...getValues() },
    })
      .then(() => {
        helpers.save(UserHelperKeys.SET_UP_REMINDERS);
        userSettingsReload();
      })
      .catch(() => {
        createToast({
          type: 'error',
          message: t('toasts.error'),
        });
      });
  };

  useEffect(() => {
    const reminderEnabled = watch('remindersEnabled');
    setRemindersEnabled(reminderEnabled);
  }, [values]);

  return (
    <FormProvider {...methods}>
      <div className={styles._reminders_container}>
        <div className={styles._reminders_section}>
          <Controller
            name="remindersEnabled"
            onChangeName="onClick"
            render={({ onChange, value }) => (
              <Checkbox
                onClick={value => handleChange(() => onChange(value))}
                checked={value}
                size="small"
                expand
              >
                {t('enableReminders')}
              </Checkbox>
            )}
            control={methods.control}
          />
          <Controller
            name="remindersBeforeMinutes"
            render={({ onChange, value }) => (
              <Select
                onChange={value => handleChange(() => onChange(value))}
                value={value}
                disabled={!remindersEnabled}
                defaultValue={'5'}
                size="small"
                width={isBigDesktop ? '280px' : '140px'}
                placeholder={t('selectorPlaceholder')}
              >
                {MINUTES_ADVANCE_RANGE.map(option => (
                  <Item key={option} value={`${option}`}>
                    {t('options.' + option)}
                  </Item>
                ))}
              </Select>
            )}
            control={methods.control}
          />
        </div>
        <div className={styles._reminders_section}>
          <Controller
            name="autoMarkAsDone"
            onChangeName="onClick"
            render={({ onChange, value }) => (
              <Checkbox
                onClick={value => handleChange(() => onChange(value))}
                checked={value}
                size="small"
                expand
              >
                {t('autoComplete')}
              </Checkbox>
            )}
            control={methods.control}
          />
        </div>
      </div>
    </FormProvider>
  );
};
