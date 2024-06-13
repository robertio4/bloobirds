import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, useToasts } from '@bloobirds-it/flamingo-ui';
import { useObjectCreationSettings } from '@bloobirds-it/hooks';
import { api } from '@bloobirds-it/utils';

import {
  AccountSettingsSection,
  AccountSettingsSectionContent,
  AccountSettingsSectionFooter,
  AccountSettingsSectionTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';

const useObjectCreation = () => {
  const { enabledObjectCreation, mutate } = useObjectCreationSettings();

  return {
    enabled: enabledObjectCreation,
    updateEnabled: async (enabled: boolean) => {
      const response = await api.put('/linkedin/settings', { allowObjectCreation: enabled });
      if (response.status === 200) {
        await mutate();
      }
    },
  };
};

const ObjectCreationTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enabled, updateEnabled } = useObjectCreation();
  const { createToast } = useToasts();
  const [checked, setChecked] = useState(enabled);
  const { t } = useTranslation('translation', { keyPrefix: 'accountSettings.objectCreation' });

  useEffect(() => {
    setChecked(enabled);
  }, [enabled]);

  const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateEnabled(checked);
      setIsLoading(false);
      createToast({ type: 'success', message: t('successMessage') });
    } catch (e) {
      createToast({ type: 'error', message: t('errorMessage') });
    }
  };

  const handleChange = (value: boolean) => {
    setChecked(value);
  };

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="settings">{t('title')}</AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>{t('subtitle')}</AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => saveSettings(e)}>
          <AccountSettingsSection>
            <AccountSettingsSectionTitle>{t('sectionTitle')}</AccountSettingsSectionTitle>
            <AccountSettingsSectionContent>
              <div style={{ width: 450 }}>
                <Checkbox expand checked={checked} onClick={handleChange}>
                  {t('sectionContent')}
                </Checkbox>
              </div>
            </AccountSettingsSectionContent>
            <AccountSettingsSectionFooter>
              <Button type="submit" disabled={isLoading || checked === enabled}>
                {t('save')}
              </Button>
            </AccountSettingsSectionFooter>
          </AccountSettingsSection>
        </form>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default ObjectCreationTab;
