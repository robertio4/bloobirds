import React, { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';

import { Button, Checkbox, useToasts } from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';

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
import { api } from '../../../../utils/api';

interface CompanyCreationResponse {
  enabled: boolean;
}

interface CompanyCreationInputs {
  enabled: boolean;
}

const useCompanyCreationSettings = () => {
  const { data, mutate, isValidating } = useSWR('/linkedin/settings/companyCreation', async url => {
    const response = await api.get<CompanyCreationResponse>(url);
    return response.data;
  });

  return {
    isLoading: isValidating,
    enabled: data ? data.enabled : false,
    updateEnabled: async (enabled: boolean) => {
      const response = await api.put('/linkedin/settings/companyCreation', { enabled });
      if (response.status === 200) {
        await mutate({ enabled });
      }
    },
  };
};

const LinkedCompanyCreationTab = () => {
  const { enabled, updateEnabled, isLoading } = useCompanyCreationSettings();
  const { createToast } = useToasts();

  const {
    formState: { isSubmitting, isDirty },
    reset,
    handleSubmit,
    control,
  } = useForm<CompanyCreationInputs>({
    defaultValues: {
      enabled: false,
    },
  });

  const {
    field: { value: checked, onChange: setChecked },
  } = useController({ name: 'enabled', control });

  useEffect(() => {
    if (!isLoading) {
      reset({ enabled });
    }
  }, [enabled, isLoading, reset]);

  const saveSettings = async (data: CompanyCreationInputs) => {
    try {
      await updateEnabled(data.enabled);
      createToast({ type: 'success', message: 'LinkedIn layout successfully updated' });
    } catch (e) {
      createToast({ type: 'error', message: 'Something went wrong' });
    }
  };

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="company">Creating companies</AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            These defaults will be applied to the entire account.
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <form onSubmit={handleSubmit(saveSettings)}>
          <AccountSettingsSection>
            <AccountSettingsSectionTitle>
              Do you also want to create the company when does not exist?
            </AccountSettingsSectionTitle>
            <AccountSettingsSectionContent>
              <div style={{ width: 450 }}>
                <Checkbox expand checked={checked} onClick={value => setChecked(value)}>
                  Create a company when it does not exist in Bloobirds
                </Checkbox>
              </div>
            </AccountSettingsSectionContent>
            <AccountSettingsSectionFooter>
              <Button type="submit" disabled={isSubmitting || !isDirty}>
                Save
              </Button>
            </AccountSettingsSectionFooter>
          </AccountSettingsSection>
        </form>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default LinkedCompanyCreationTab;
