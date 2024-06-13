import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox, Text } from '@bloobirds-it/flamingo-ui';

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

export const InformationRequired = () => {
  const { t } = useTranslation();
  return (
    <AccountSettingsTab>
      <AccountSettingsTabContent>
        <AccountSettingsSection>
          <AccountSettingsSectionTitle>
            {t('accountSettings.generalSettings.meetings.informationRequiredTitle')}
          </AccountSettingsSectionTitle>
          <AccountSettingsSectionSubtitle>
            {t('accountSettings.generalSettings.meetings.informationRequiredSubtitle')}
          </AccountSettingsSectionSubtitle>
          <AccountSettingsSectionContent>
            <div className={styles._checkbox_wrapper}>
              <Controller
                name="meetingFieldsRequiredEnabled"
                render={({ onChange, value }) => (
                  <Checkbox onClick={onChange} checked={value}>
                    <div>
                      <Text size="s">
                        {t('accountSettings.generalSettings.meetings.mandatoryInformation')}
                      </Text>
                    </div>
                  </Checkbox>
                )}
              />
            </div>
          </AccountSettingsSectionContent>
        </AccountSettingsSection>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};
