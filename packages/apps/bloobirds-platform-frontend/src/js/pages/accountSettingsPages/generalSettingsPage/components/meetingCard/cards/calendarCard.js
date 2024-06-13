import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox, Icon, Radio, RadioGroup, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import { useUserSettings } from '../../../../../../components/userPermissions/hooks';
import { useCreateReceivedMeeting } from '../../../../../../hooks/useFeatureFlags';
import {
  AccountSettingsSection,
  AccountSettingsSectionContent,
  AccountSettingsSectionSubtitle,
  AccountSettingsSectionTitle,
} from '../../../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
} from '../../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from '../../../styles/generalSettingsPage.module.css';

export const CalendarCard = ({ values }) => {
  const {
    settings: { openCalendarPopupAfterMeeting, createMeetingAfterCalendarEvent },
  } = useUserSettings();
  const [calendarCheckboxChecked, setCalendarCheckboxChecked] = useState(
    openCalendarPopupAfterMeeting,
  );
  const [meetingReceivedCheckboxChecked, setMeetingReceivedCheckboxChecked] = useState(
    createMeetingAfterCalendarEvent,
  );
  const isCreateMeetingReceivedEnabled = useCreateReceivedMeeting();
  const { t } = useTranslation();

  return (
    <AccountSettingsTab>
      <AccountSettingsTabContent>
        <AccountSettingsSection>
          <AccountSettingsSectionTitle>
            {t('accountSettings.generalSettings.meetings.calendarTitle')}
          </AccountSettingsSectionTitle>
          <AccountSettingsSectionSubtitle>
            {t('accountSettings.generalSettings.meetings.calendarSubtitle')}
          </AccountSettingsSectionSubtitle>
          <AccountSettingsSectionContent>
            <div className={styles._checkbox_wrapper}>
              <Controller
                name="openCalendarPopupAfterMeeting"
                render={({ onChange, value }) => (
                  <Checkbox
                    onClick={e => {
                      onChange(e);
                      setCalendarCheckboxChecked(e);
                    }}
                    checked={value}
                  >
                    <Text size="s">
                      {t('accountSettings.generalSettings.meetings.enableCalendarEventCreation')}
                    </Text>
                    <Tooltip
                      title={t(
                        'accountSettings.generalSettings.meetings.enableCalendarEventCreationTooltip',
                      )}
                      position="top"
                    >
                      <Icon name="infoFilled" color="darkBloobirds" className={styles._info_icon} />
                    </Tooltip>
                  </Checkbox>
                )}
              />
            </div>
          </AccountSettingsSectionContent>
          {calendarCheckboxChecked && (
            <AccountSettingsSectionContent>
              <div className={styles._radio_wrapper}>
                <Controller
                  name="calendarEventDecision"
                  render={({ onChange, value }) => (
                    <RadioGroup onChange={onChange} value={value}>
                      <Radio value="USER_DECISION" defaultChecked>
                        {t('accountSettings.generalSettings.meetings.calendarEventLetUsersDecide')}
                      </Radio>
                      <Radio value="IMPERATIVE">
                        {t('accountSettings.generalSettings.meetings.calendarEventCreateAlways')}
                      </Radio>
                    </RadioGroup>
                  )}
                />
              </div>
            </AccountSettingsSectionContent>
          )}
          {isCreateMeetingReceivedEnabled && (
            <AccountSettingsSectionContent>
              <div className={styles._checkbox_wrapper}>
                <Controller
                  name="createMeetingAfterCalendarEvent"
                  render={({ onChange, value }) => (
                    <Checkbox
                      onClick={e => {
                        onChange(e);
                        setMeetingReceivedCheckboxChecked(e);
                      }}
                      checked={value}
                    >
                      <Text size="s">
                        {t('accountSettings.generalSettings.meetings.createMeetingInBloobirds')}
                      </Text>
                    </Checkbox>
                  )}
                />
              </div>
            </AccountSettingsSectionContent>
          )}
        </AccountSettingsSection>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};
