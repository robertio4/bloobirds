import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';

import { Button, Icon, Input, Skeleton, Text, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useEmailSettings } from '../../../../hooks/useEmailSettings';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import AccountSettingsLayout from '../../../../layouts/accountSettingsLayout';
import { AccountSettingsSectionFooter } from '../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { EmailSettings } from '../../../../typings/messaging';
import EmailIntegrationPage from '../../emailIntegrationPage/emailIntegrationPage';
import { UserEmailMappings } from '../../emailIntegrationPage/userEmailMappings/userEmailMappings';
import styles from './emailSettingsForm.module.css';

function EmailSettingsForm({ tab }: { tab: string }) {
  const { settings, updateSettings, loading } = useEmailSettings();
  const { createToast } = useToasts();
  const { control, formState, errors, reset, handleSubmit, watch } = useForm<EmailSettings>({
    defaultValues: {
      dailyLimit: 200,
      minuteLimit: 30,
    },
  });

  const dailyLimitValue = watch('dailyLimit');
  const minuteLimitValue = watch('minuteLimit');

  const { save } = useUserHelpers();
  const { t } = useTranslation();

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  const onSave = async (values: EmailSettings) => {
    try {
      await updateSettings(values);
      createToast({
        type: 'success',
        message: 'Email settings updated',
      });
    } catch {
      createToast({
        type: 'error',
        message: 'Failed to update email settings',
      });
    }
    save(UserHelperKeys.CONNECT_EMAIL_ACCOUNT_ADMIN);
  };

  return (
    <AccountSettingsLayout title={t('accountSettings.email.title')} subtitle="">
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="unlock">
              {t('accountSettings.email.emailSafetyTitle')}
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('accountSettings.email.emailSafetySubtitle')}
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <form onSubmit={handleSubmit(onSave)}>
            <section className={styles.section}>
              <div className={styles.subtitle}>
                <Text size="s" color="peanut">
                  <Trans i18nKey="accountSettings.email.emailsPerDay" />
                </Text>
                <Tooltip title={t('accountSettings.email.emailsPerDayTooltip')} position="top">
                  <Icon name="infoFilled" color="darkBloobirds" size={20} />
                </Tooltip>
                <Icon name="arrowRight" color="softPeanut" />
                <div className={styles.input}>
                  {loading ? (
                    <Skeleton width={96} height={41} />
                  ) : (
                    <Controller
                      name="dailyLimit"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t('accountSettings.email.required'),
                        },
                        min: {
                          value: 1,
                          message: t('accountSettings.email.minimumPerDay'),
                        },
                      }}
                      render={({ value, onChange }) => (
                        <div className={styles.input}>
                          <Input
                            value={value}
                            width="124px"
                            errorStyle={!!errors.dailyLimit?.message}
                            onChange={onChange}
                            type="number"
                            placeholder={t('accountSettings.email.placeholder')}
                          />
                          <Text size="s" color="softPeanut">
                            / {t('common.day').toLowerCase()}
                          </Text>
                        </div>
                      )}
                    />
                  )}
                </div>
              </div>
              {errors.dailyLimit?.message ? (
                <Text size="s" color="tomato">
                  {errors.dailyLimit?.message}
                </Text>
              ) : null}
            </section>
            <section className={styles.section}>
              <div className={styles.subtitle}>
                <Text size="s" color="peanut">
                  <Trans i18nKey="accountSettings.email.emailsPerMinute" />
                </Text>
                <Tooltip title={t('accountSettings.email.emailsPerMinuteTooltip')} position="top">
                  <Icon name="infoFilled" color="darkBloobirds" size={20} />
                </Tooltip>
                <Icon name="arrowRight" color="softPeanut" />
                <div className={styles.input}>
                  {loading ? (
                    <Skeleton width={96} height={41} />
                  ) : (
                    <Controller
                      name="minuteLimit"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t('accountSettings.email.required'),
                        },
                        min: {
                          value: 1,
                          message: t('accountSettings.email.minimumPerMinute'),
                        },
                      }}
                      render={({ value, onChange }) => (
                        <div className={styles.input}>
                          <Input
                            value={value}
                            width="124px"
                            errorStyle={!!errors.minuteLimit?.message}
                            warningStyle={value > dailyLimitValue}
                            onChange={onChange}
                            type="number"
                            placeholder={t('accountSettings.email.placeholder')}
                          />
                          <Text size="s" color="softPeanut">
                            / {t('common.minute').toLowerCase()}
                          </Text>
                        </div>
                      )}
                    />
                  )}
                </div>
              </div>

              {minuteLimitValue > dailyLimitValue ? (
                <Text size="s" color="banana">
                  {t('accountSettings.email.limitValidation')}
                </Text>
              ) : null}
              {errors.minuteLimit?.message ? (
                <Text size="s" color="tomato">
                  {errors.minuteLimit?.message}
                </Text>
              ) : null}
            </section>
            <AccountSettingsSectionFooter>
              <Button type="submit" disabled={formState.isSubmitting || !formState.isDirty}>
                {t('common.save').toUpperCase()}
              </Button>
            </AccountSettingsSectionFooter>
          </form>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <EmailIntegrationPage tab={tab} />
    </AccountSettingsLayout>
  );
}

export default EmailSettingsForm;
