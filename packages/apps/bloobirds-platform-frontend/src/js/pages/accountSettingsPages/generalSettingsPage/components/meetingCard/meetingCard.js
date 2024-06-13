import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { MeetingsTooltip } from '../../../../../components/discoveryTooltips/generalSettingsTourTooltips/meetingsTooltip';
import {
  useUserSettings,
  useUserSettingsReload,
} from '../../../../../components/userPermissions/hooks';
import { useQuickStartEnabled } from '../../../../../hooks/useQuickStartGuide';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabTitle,
} from '../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { api } from '../../../../../utils/api';
import { CalendarCard } from './cards/calendarCard';
import { ContactBeforeMeeting } from './cards/contactBeforeMeetingCard';
import { InformationRequired } from './cards/informationRequiredCard';

export const MeetingCard = ({ value }) => {
  const settings = useUserSettings();
  const reloadUserSettings = useUserSettingsReload();
  const methods = useForm({ defaultValues: value });
  const [hasChanges, setHasChanges] = useState(false);
  const hasQSGEnabled = useQuickStartEnabled();
  const currentValues = methods.watch();
  const { t } = useTranslation();

  useEffect(() => {
    let change = false;
    Object.keys(value).forEach(key => {
      if (
        value[key]?.toString() !==
        (currentValues[key]?.toString() ||
          (key === 'calendarEventDecision' && !currentValues[key] && value[key].toString()))
      ) {
        change = true;
      }
    });
    setHasChanges(change);
  }, [currentValues]);

  const handleSave = values => {
    setHasChanges(false);
    api.patch(`/entities/accounts/${settings.account.id}`, values).then(reloadUserSettings);
  };

  return (
    <FormProvider {...methods}>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="calendar">
              <div style={{ display: 'flex', height: 24 }}>
                <Text>{t('accountSettings.generalSettings.meetings.title')}</Text>
                {hasQSGEnabled && <MeetingsTooltip defaultTooltipVisible />}
              </div>
            </AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <InformationRequired />
        </AccountSettingsTabContent>
        <AccountSettingsTabContent>
          <ContactBeforeMeeting />
        </AccountSettingsTabContent>
        <AccountSettingsTabContent>
          <CalendarCard values={value} />
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
