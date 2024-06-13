import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { Button, Checkbox, Item, Select, Text, useToasts } from '@bloobirds-it/flamingo-ui';

import { useTimeZones } from '../../../../hooks/useTimeZones';
import { fetchAndOpenNylasUrl } from '../../../../pages/userSettingsPages/emailSettings/emailSettings.services';
import { api } from '../../../../utils/api';
import { MINUTES_ADVANCE_RANGE } from '../../../../utils/conts.utils';
import { GoogleSignIn, MicrosoftSignIn } from '../../../BrandedButtons';
import { useUserSettings, useUserSettingsReload } from '../../../userPermissions/hooks';
import styles from './slides.module.css';

type Props = {
  onFinish: () => void;
};

function LastScreen({ onFinish }: Props) {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const timeZones = useTimeZones();
  const { user: userSettings, settings } = useUserSettings();
  const userSettingsReload = useUserSettingsReload();

  const userId = userSettings.id;

  const defaultValues = {
    ...userSettings,
    remindersBeforeMinutes: `${
      userSettings?.remindersBeforeMinutes === 0 ? '1' : userSettings?.remindersBeforeMinutes
    }`,
    remindersEnabled: userSettings?.remindersEnabled ?? true,
  };
  const methods = useForm({ defaultValues });
  const { createToast } = useToasts();

  useEffect(() => {
    const isEnabled = methods.watch('remindersEnabled');
    setRemindersEnabled(isEnabled);
  }, [methods.getValues()]);

  const handleSubmit = () => {
    const { remindersBeforeMinutes } = methods.getValues();

    api
      .patch(`/utils/service/users/${userId}/basicInfo`, {
        ...methods.getValues(),
        reminderBeforeMinutes: parseInt(remindersBeforeMinutes),
      })
      .then(() => {
        onFinish();
        userSettingsReload();
      })
      .catch(() => {
        createToast({
          type: 'error',
          message: 'There was an error saving data!',
        });
      });
  };

  return (
    <div
      key={'lastScreen'}
      className={styles.backgroundWhite}
      data-testid={'lastScreen'}
      style={{ height: '100%' }}
    >
      <div className={styles.subtitleContent}>
        <Text size="l" align="center" weight="bold">
          Let&apos;s get things started...
        </Text>
      </div>
      <div className={styles.container}>
        <FormProvider {...methods}>
          <div className={styles.column} data-testid="timeZoneSelect">
            <Text className={styles.text} color="softPeanut" size="m" weight="bold">
              Time zone
            </Text>
            <Controller
              name="timeZone"
              render={({ onChange, value }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  width="100%"
                  placeholder="My timezone"
                  autocomplete
                >
                  {timeZones?.map((tz: any) => (
                    <Item label={tz.name} key={tz.location} value={tz.location}>
                      {tz.name}
                    </Item>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className={styles.column}>
            <Text className={styles.text} color="softPeanut" size="m" weight="bold">
              Task reminders
            </Text>
            <div className={styles.row}>
              <Controller
                name="remindersEnabled"
                onChangeName="onClick"
                render={({ onChange, value }) => (
                  <Checkbox
                    data-testid="remindersEnabled"
                    onClick={onChange}
                    checked={value}
                    size="small"
                    expand
                  >
                    Enable task reminders
                  </Checkbox>
                )}
                control={methods.control}
              />

              <Controller
                name="remindersBeforeMinutes"
                render={({ onChange, value }) => (
                  <Select
                    data-testid="remindersBeforeMinutes"
                    className={styles.smallSelect}
                    onChange={onChange}
                    value={value}
                    disabled={!remindersEnabled}
                    defaultValue={'1'}
                    placeholder="Time before to be notified"
                  >
                    {Object.keys(MINUTES_ADVANCE_RANGE).map(option => (
                      <Item key={option} value={option}>
                        {MINUTES_ADVANCE_RANGE[option]}
                      </Item>
                    ))}
                  </Select>
                )}
                control={methods.control}
              />
            </div>
          </div>

          <div className={styles.column}>
            <Text className={styles.text} size="m" weight="bold" color="softPeanut">
              Connect your email account
            </Text>
            <div className={styles.row}>
              {settings?.gmailConnectButtonEnabled && (
                <GoogleSignIn
                  onClick={() => fetchAndOpenNylasUrl({ bbPage: window.location.pathname })}
                />
              )}
              {settings?.microsoftConnectButtonEnabled && (
                <MicrosoftSignIn
                  onClick={() => fetchAndOpenNylasUrl({ bbPage: window.location.pathname })}
                />
              )}
            </div>
          </div>

          <div className={styles.column}>
            <Text className={styles.text} size="m" weight="bold" color="softPeanut">
              Chrome extension
            </Text>
            <div className={styles.row}>
              <span
                className={styles.link}
                onClick={() => {
                  window.open(
                    'https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh',
                  );
                }}
              >
                Download the latest version here.
              </span>
            </div>
          </div>
          <div className={styles.columnBtn}>
            <Button
              className={styles.btnFinish}
              iconRight="arrowRight"
              onClick={methods.handleSubmit(handleSubmit)}
            >
              Start using Bloobirds
            </Button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}

export default LastScreen;
