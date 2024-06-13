import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Text } from '@bloobirds-it/flamingo-ui';

import { LeadsTooltip } from '../../../../../components/discoveryTooltips/generalSettingsTourTooltips/leadsTooltip';
import { useQuickStartEnabled } from '../../../../../hooks/useQuickStartGuide';
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
import { useGeneralSettings } from '../../hooks/useGeneralSettings';
import styles from '../../styles/generalSettingsPage.module.css';

export const LeadCard = ({ value }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [isEmailMatching, setIsEmailMatching] = useState(value);
  const { updateEmailMatching } = useGeneralSettings();

  const hasQSGEnabled = useQuickStartEnabled();

  const handleChanges = () => {
    setHasChanges(!hasChanges);
    setIsEmailMatching(!isEmailMatching);
  };
  const handleSubmit = () => {
    updateEmailMatching(isEmailMatching);
    setHasChanges(false);
  };
  const { t } = useTranslation();
  return (
    <AccountSettingsTab>
      <AccountSettingsTabTitle icon="person">
        <div style={{ display: 'flex', height: 24 }} id="leadsGeneralSettings">
          <Text>{t('accountSettings.generalSettings.leads.title')}</Text>
          {hasQSGEnabled && <LeadsTooltip defaultTooltipVisible />}
        </div>
      </AccountSettingsTabTitle>
      <AccountSettingsTabContent>
        <AccountSettingsTab>
          <AccountSettingsSectionTitle>
            {t('accountSettings.generalSettings.leads.leadEmailMatchingTitle')}
          </AccountSettingsSectionTitle>
          <AccountSettingsSectionSubtitle>
            {t('accountSettings.generalSettings.leads.leadEmailMatchingSubtitle')}
          </AccountSettingsSectionSubtitle>
          <AccountSettingsSectionContent>
            <div className={styles._checkbox_wrapper}>
              <Checkbox checked={isEmailMatching} onClick={handleChanges}>
                <div>
                  <Text size="s">
                    {t('accountSettings.generalSettings.leads.enableEmailMatching')}
                  </Text>
                </div>
              </Checkbox>
            </div>
          </AccountSettingsSectionContent>
        </AccountSettingsTab>
      </AccountSettingsTabContent>
      <AccountSettingsTabContent>
        <Button disabled={!hasChanges} onClick={handleSubmit}>
          {t('common.save').toUpperCase()}
        </Button>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};
