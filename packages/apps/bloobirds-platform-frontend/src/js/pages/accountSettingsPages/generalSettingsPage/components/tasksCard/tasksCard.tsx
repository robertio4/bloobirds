import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Text, useToasts } from '@bloobirds-it/flamingo-ui';

import {
  useUserSettings,
  useUserSettingsReload,
} from '../../../../../components/userPermissions/hooks';
import {
  AccountSettingsSectionContent,
  AccountSettingsSectionSubtitle,
  AccountSettingsSectionTitle,
} from '../../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabTitle,
} from '../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { api } from '../../../../../utils/api';
import styles from '../../styles/generalSettingsPage.module.css';

export const TasksCard = ({ defaultValue }: { defaultValue: Record<string, boolean> }) => {
  const reloadUserSettings = useUserSettingsReload();
  const [hasChanges, setHasChanges] = useState(false);
  const methods = useForm({ defaultValues: defaultValue });
  const { createToast } = useToasts();
  const { t } = useTranslation();

  const handleSave = ({
    createActivitiesWhenCompletingCallTasks,
  }: {
    createActivitiesWhenCompletingCallTasks: boolean;
  }) => {
    setHasChanges(false);
    api
      .patch('/utils/service/accounts/setting/CREATE_ACTIVITIES_WHEN_COMPLETING_CALL_TASKS', {
        value: createActivitiesWhenCompletingCallTasks,
      })
      .then(() => {
        reloadUserSettings();
        createToast({
          message: t('accountSettings.generalSettings.tasks.successMessage'),
          type: 'success',
        });
      });
  };

  return (
    <FormProvider {...methods}>
      <AccountSettingsTab>
        <AccountSettingsTabTitle icon="person">
          <div style={{ display: 'flex', height: 24 }} id="tasksGeneralSettings">
            <Text>{t('accountSettings.generalSettings.tasks.title')}</Text>
          </div>
        </AccountSettingsTabTitle>
        <AccountSettingsTabContent>
          <AccountSettingsTab>
            <AccountSettingsSectionTitle>
              {t(
                'accountSettings.generalSettings.tasks.createActivitiesWhenCompletingCallTasksTitle',
              )}
            </AccountSettingsSectionTitle>
            <AccountSettingsSectionSubtitle>
              {t(
                'accountSettings.generalSettings.tasks.createActivitiesWhenCompletingCallTasksSubtitle',
              )}
            </AccountSettingsSectionSubtitle>
            <AccountSettingsSectionContent>
              <div className={styles._checkbox_wrapper}>
                <Controller
                  name="createActivitiesWhenCompletingCallTasks"
                  render={({ value, onChange }) => (
                    <Checkbox
                      checked={value}
                      onClick={v => {
                        onChange(v);
                        setHasChanges(true);
                      }}
                    >
                      <div>
                        <Text size="s">
                          {t(
                            'accountSettings.generalSettings.tasks.createActivitiesWhenCompletingCallTasksTitle',
                          )}
                        </Text>
                      </div>
                    </Checkbox>
                  )}
                />
              </div>
            </AccountSettingsSectionContent>
          </AccountSettingsTab>
        </AccountSettingsTabContent>
        <AccountSettingsTabContent>
          <Button disabled={!hasChanges} onClick={methods.handleSubmit(handleSave)}>
            {t('common.save').toUpperCase()}
          </Button>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
    </FormProvider>
  );
};
