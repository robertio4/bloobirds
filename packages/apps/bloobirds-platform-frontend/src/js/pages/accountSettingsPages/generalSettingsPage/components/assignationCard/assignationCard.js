import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Icon, Text, useToasts } from '@bloobirds-it/flamingo-ui';

import { AssignmentsTooltip } from '../../../../../components/discoveryTooltips/generalSettingsTourTooltips/assignmentsTooltip';
import {
  useUserSettings,
  useUserSettingsReload,
} from '../../../../../components/userPermissions/hooks';
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
import { api } from '../../../../../utils/api';
import styles from '../../styles/generalSettingsPage.module.css';

export const AssignationCard = ({ defaultValue }) => {
  const settings = useUserSettings();
  const reloadUserSettings = useUserSettingsReload();
  const [hasChanges, setHasChanges] = useState(false);
  const methods = useForm({ defaultValues: defaultValue });
  const { createToast } = useToasts();

  const hasQSGEnabled = useQuickStartEnabled();
  const { t } = useTranslation();

  const handleSave = values => {
    setHasChanges(false);
    api.patch(`/entities/accounts/${settings.account.id}`, values).then(() => {
      reloadUserSettings();
      createToast({
        message: t('accountSettings.generalSettings.assignment.successMessage'),
        type: 'success',
      });
    });
  };

  return (
    <FormProvider {...methods}>
      <AccountSettingsTab>
        <AccountSettingsTabTitle icon="personAdd">
          <div style={{ display: 'flex', height: 24 }}>
            <Text>{t('accountSettings.generalSettings.assignment.title')}</Text>
            {hasQSGEnabled && <AssignmentsTooltip defaultTooltipVisible />}
          </div>
        </AccountSettingsTabTitle>
        <AccountSettingsTabContent />
        <AccountSettingsTabContent>
          <AccountSettingsTab>
            <AccountSettingsSectionTitle>Assignment propagation</AccountSettingsSectionTitle>
            <AccountSettingsSectionSubtitle>
              {t('accountSettings.generalSettings.assignment.subtitle')}
            </AccountSettingsSectionSubtitle>
            <AccountSettingsSectionContent>
              <div className={styles._checkbox_wrapper}>
                <Controller
                  name="propagateAssignedFromLeadToCompany"
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
                          <Icon name="person" />
                          <Icon name="arrowRight" />
                          <Icon name="company" />{' '}
                          {t('accountSettings.generalSettings.assignment.ownerPropagationFromLead')}
                        </Text>
                      </div>
                    </Checkbox>
                  )}
                />
              </div>
              <div className={styles._checkbox_wrapper}>
                <Controller
                  name="propagateAssignedFromCompanyToLead"
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
                          <Icon name="company" /> <Icon name="arrowRight" /> <Icon name="people" />{' '}
                          {t(
                            'accountSettings.generalSettings.assignment.ownerPropagationFromCompany',
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
