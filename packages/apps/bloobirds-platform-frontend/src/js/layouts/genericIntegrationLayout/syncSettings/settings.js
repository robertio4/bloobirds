import React from 'react';
import { Input } from '@bloobirds-it/flamingo-ui';
import styles from './settings.module.css';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { api } from '../../../utils/api';
import AccountSettingsTab from '../../accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTabTitle,
} from '../../accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import PasswordInput from '../../../components/passwordInput/passwordInput';

const SyncSettings = ({ driver, integrationName }) => {
  const { data: configuration } = useSWR(
    `/integrations/manager/drivers/${driver}`,
    async () => await api.get(`/integrations/manager/drivers/${driver}`).then(res => res.data),
  );
  const methods = useForm({ defaultValues: configuration });
  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="settings">
            Configure your {integrationName} connection
          </AccountSettingsTabTitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight />
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <div className={styles.form}>
          <FormProvider {...methods}>
            <Controller
              name="resource"
              rules={{ required: `You should configure the ${integrationName} resource` }}
              render={({ onChange, value }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name="resource"
                  placeholder={`${integrationName} resource`}
                  width={400}
                  className={styles.input}
                />
              )}
            />
            <Controller
              name="username"
              rules={{ required: `You should configure the ${integrationName} username` }}
              render={({ onChange, value }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name="username"
                  placeholder={`${integrationName} username`}
                  width={400}
                  className={styles.input}
                />
              )}
            />
            <Controller
              name="password"
              rules={{ required: 'A password is required' }}
              render={({ onChange, value }) => (
                <PasswordInput
                  value={value}
                  onChange={onChange}
                  name="password"
                  placeholder={`${integrationName} password`}
                  width={400}
                  className={styles.input}
                />
              )}
            />
          </FormProvider>
        </div>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default SyncSettings;
