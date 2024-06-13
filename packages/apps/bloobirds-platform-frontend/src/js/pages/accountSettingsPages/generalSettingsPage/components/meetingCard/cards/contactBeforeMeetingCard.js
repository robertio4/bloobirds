import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox, Icon, Input, Item, Select, Text } from '@bloobirds-it/flamingo-ui';

import {
  AccountSettingsSection,
  AccountSettingsSectionContent,
  AccountSettingsSectionSubtitle,
  AccountSettingsSectionTitle,
} from '../../../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import {
  AccountSettingsTabContent,
  AccountSettingsTab,
} from '../../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from '../../../styles/generalSettingsPage.module.css';

export const ContactBeforeMeeting = () => {
  const { t } = useTranslation();
  return (
    <AccountSettingsTab>
      <AccountSettingsTabContent>
        <AccountSettingsSection>
          <AccountSettingsSectionTitle>
            {t('accountSettings.generalSettings.meetings.contactBeforeMeetingTitle')}
          </AccountSettingsSectionTitle>
          <AccountSettingsSectionSubtitle>
            {t('accountSettings.generalSettings.meetings.contactBeforeMeetingSubtitle')}
          </AccountSettingsSectionSubtitle>
          <AccountSettingsSectionContent>
            <div className={styles._checkbox_wrapper}>
              <Controller
                name="contactBeforeMeetingWarning"
                render={({ onChange, value }) => (
                  <Checkbox onClick={onChange} checked={value}>
                    <div>
                      <Text size="s">
                        {t('accountSettings.generalSettings.meetings.contactBeforeMeetingSubtitle')}
                      </Text>
                    </div>
                  </Checkbox>
                )}
              />
            </div>
          </AccountSettingsSectionContent>
          <AccountSettingsSectionContent>
            <div className={styles._select_wrapper}>
              <Text color="softPeanut" size="m" weight="bold">
                {t('accountSettings.generalSettings.meetings.scheduleTask')}
              </Text>
              <Icon name="arrowRight" color="softPeanut" />
              <div className={styles._schedule_input}>
                <Controller
                  name="contactBeforeMeetingTime"
                  render={({ onChange, value }) => (
                    <Input
                      onChange={onChange}
                      value={value}
                      defaultValue={30}
                      type="number"
                      width="65px"
                    />
                  )}
                />
              </div>
              <Controller
                name="contactBeforeMeetingTimeRange"
                render={({ onChange, value }) => (
                  <Select
                    placeholder="Time"
                    defaultValue="MINUTES"
                    dataTest={'inboundLeadNotification'}
                    width="214px"
                    onChange={onChange}
                    value={value}
                  >
                    <Item value="MINUTES">{t('common.minute_other')}</Item>
                    <Item value="HOURS">{t('common.hour_other')}</Item>
                    <Item value="DAYS">{t('common.day_other')}</Item>
                  </Select>
                )}
              />
              <div className={styles._schedule_text}>
                <Text color="softPeanut" size="m" weight="bold">
                  {t('accountSettings.generalSettings.meetings.beforeMeeting')}
                </Text>
              </div>
            </div>
          </AccountSettingsSectionContent>
          <AccountSettingsSectionContent>
            <div className={styles._checkbox_wrapper}>
              <Controller
                name="contactBeforeMeetingOnWeekdays"
                render={({ onChange, value }) => {
                  return (
                    <Checkbox onClick={v => onChange(!v)} checked={!value} size="small">
                      <div>
                        <Text size="s">
                          {t(
                            'accountSettings.generalSettings.meetings.scheduledGeneratedOnWeekends',
                          )}
                        </Text>
                      </div>
                    </Checkbox>
                  );
                }}
              />
            </div>
          </AccountSettingsSectionContent>
        </AccountSettingsSection>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};
