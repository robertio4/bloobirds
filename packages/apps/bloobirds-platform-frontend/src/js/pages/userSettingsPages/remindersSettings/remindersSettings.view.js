import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { Button, Checkbox, Icon, Item, Select, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS, UserHelperKeys } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { useUserSettingsReload } from '../../../components/userPermissions/hooks';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import { ServiceApi } from '../../../misc/api/service';
import styles from './reminderSettings.module.css';

const MINUTES_ADVANCE_RANGE = {
  1: '1 minute',
  5: '5 minutes',
  10: '10 minutes',
  20: '20 minutes',
  30: '30 minutes',
  60: '1 hour',
  120: '2 hours',
};

const RemindersSettings = ({ userSettings }) => {
  const defaultValues = {
    ...userSettings,
    remindersBeforeMinutes: `${
      userSettings?.remindersBeforeMinutes === 0 ? '5' : userSettings?.remindersBeforeMinutes
    }`,
  };
  const { createToast } = useToasts();
  const [remindersEnabled, setRemindersEnabled] = useState();
  const methods = useForm({ defaultValues });
  const userSettingsReload = useUserSettingsReload();
  const helpers = useUserHelpers();

  const onSubmit = () => {
    ServiceApi.request({
      url: '/service/users/me/updateReminders',
      method: 'POST',
      body: { ...methods.getValues() },
    })
      .then(() => {
        createToast({ type: 'success', message: 'Your reminder settings have been updated!' });
        helpers.save(UserHelperKeys.SET_UP_REMINDERS);
        userSettingsReload();
      })
      .catch(() => {
        createToast({
          type: 'error',
          message: 'There was an error saving your reminder settings!',
        });
      });
  };

  const handleTestReminder = () => {
    createToast({
      message: `This is a test task due in ${methods.getValues().remindersBeforeMinutes} minutes`,
      subtitle: 'Example Company Inc.',
      duration: 5000,
      sound: methods.getValues().remindersSoundEnabled
        ? 'https://d38iwn7uw3305n.cloudfront.net/notification.mp3'
        : null,
      type: 'reminder',
    });
  };

  useEffect(() => {
    const reminderEnabled = methods.watch('remindersEnabled');
    setRemindersEnabled(reminderEnabled);
  }, [methods.getValues()]);

  return (
    <FormProvider {...methods}>
      <div className={styles._container}>
        <div className={styles._content__box}>
          <div className={styles._section__box}>
            <div className={styles._title__container}>
              <div className={styles._title__content}>
                <Text size="m" color="softPeanut" htmlTag="span">
                  Auto completion of tasks
                </Text>
              </div>
            </div>
            <div className={styles._section__box}>
              <Controller
                name="autoMarkAsDone"
                onChangeName="onClick"
                render={({ onChange, value }) => (
                  <Checkbox onClick={onChange} checked={value} size="medium" expand>
                    Auto complete your Cadence and Scheduled tasks when doing an attempt.
                  </Checkbox>
                )}
                control={methods.control}
              />
            </div>
            <div className={styles._title__container}>
              <div className={styles._title__content}>
                <Text size="m" color="softPeanut" htmlTag="span">
                  Auto-log custom activity
                </Text>
              </div>
            </div>
            <div className={styles._section__box}>
              <Controller
                name="autoLogCustomActivity"
                onChangeName="onClick"
                render={({ onChange, value }) => (
                  <Checkbox
                    onClick={value => {
                      onChange(value);
                      if (value) {
                        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_AUTOLOG_CUSTOM_ACTIVITY);
                      }
                    }}
                    checked={value}
                    size="medium"
                    expand
                  >
                    Auto-log custom activity when completing a custom task.
                  </Checkbox>
                )}
                control={methods.control}
              />
            </div>
            <div className={styles._title__container}>
              <div className={styles._title__content}>
                <Text size="m" color="softPeanut" htmlTag="span">
                  Task reminder
                </Text>
              </div>
            </div>
            <div className={styles._section__box}>
              <Controller
                name="remindersEnabled"
                onChangeName="onClick"
                render={({ onChange, value }) => (
                  <Checkbox onClick={onChange} checked={value} size="medium" expand>
                    Get notified with a pop-up toast prior to the scheduled task time
                  </Checkbox>
                )}
                control={methods.control}
              />
              <div className={styles._subSection__container}>
                <Text size="m" color="softPeanut" htmlTag="span">
                  How long in advance of the scheduled time do you want to be notified?
                </Text>
                <Controller
                  name="remindersBeforeMinutes"
                  render={({ onChange, value }) => (
                    <Select
                      onChange={onChange}
                      value={value}
                      disabled={!remindersEnabled}
                      defaultValue={'5'}
                    >
                      {Object.keys(MINUTES_ADVANCE_RANGE).map(option => (
                        <Item key={option} value={`${option}`}>
                          {MINUTES_ADVANCE_RANGE[option]}
                        </Item>
                      ))}
                    </Select>
                  )}
                  control={methods.control}
                />
                <div className={styles._sound__section}>
                  <Controller
                    name="remindersSoundEnabled"
                    onChangeName="onClick"
                    render={({ onChange, value }) => (
                      <Checkbox
                        onClick={onChange}
                        checked={value}
                        size="small"
                        disabled={!remindersEnabled}
                      >
                        Play a sound when you receive a new notification
                      </Checkbox>
                    )}
                  />
                  <Button size="small" variant="clear" onClick={handleTestReminder}>
                    <Icon name="music" />
                    Test
                  </Button>
                </div>
                <div className={styles._save__button__container}>
                  <Button
                    variant="primary"
                    onClick={methods.handleSubmit(onSubmit)}
                    disabled={!methods.formState.isDirty}
                  >
                    save changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default RemindersSettings;
