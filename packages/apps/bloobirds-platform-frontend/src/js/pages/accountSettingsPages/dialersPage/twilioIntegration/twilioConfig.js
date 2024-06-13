import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useToasts,
  MultiSelect,
  CheckItem,
  Text,
} from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';

import { SearchLogs } from '../../../../../assets/svg';
import {
  useUserSettings,
  useUserSettingsReload,
} from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
import { useAddPhoneNumberModal } from '../../../../hooks/useAddPhoneNumberModal';
import {
  AccountSettingsSection,
  AccountSettingsSectionContent,
} from '../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { CallsApi } from '../../../../misc/api/calls';
import { RestApi } from '../../../../misc/api/rest';
import AddEditPhoneModal from './addEditPhoneModal/addEditPhoneModal';
import { ConfirmDeleteTwilioModal } from './confirmDeleteTwilioModal/confirmDeleteTwilioModal';
import styles from './twilio.module.css';

const PhoneNumberRow = ({ phone, handleEdit, userList }) => {
  const { createToast } = useToasts();
  const { data, mutate } = useSWR(`phoneNumbers/${phone.id}/users`, () =>
    RestApi.get({ path: `phoneNumbers/${phone.id}/users` }),
  );

  const handleAssignUsersToPhone = users => {
    CallsApi.patch({
      path: `twilio/sync/assignNumber/${phone.id}`,
      body: {
        users_id: users,
      },
    })
      .then(() => mutate())
      .catch(() =>
        createToast({ message: 'There was an error updating the phone number', type: 'error' }),
      );
  };
  const [selectedUsers, setSelectedUsers] = useState(data?._embedded?.users.map(user => user.id));

  useEffect(() => {
    if (data) {
      setSelectedUsers(data?._embedded?.users.map(user => user.id));
    }
  }, [data]);

  return (
    <TableRow>
      <TableCell>{phone.phoneNumber}</TableCell>
      <TableCell>
        <MultiSelect
          placeholder="Bloobirds users"
          size="small"
          width={200}
          onClose={handleAssignUsersToPhone}
          value={selectedUsers}
          defaultValue={selectedUsers}
          onChange={value => setSelectedUsers(value)}
        >
          {userList &&
            userList.map(user => (
              <CheckItem dataTest={user?.value} value={user?.id} key={user?.id}>
                {user?.value}
              </CheckItem>
            ))}
        </MultiSelect>
      </TableCell>
      <TableCell>{phone.location}</TableCell>
      <TableCell>{phone.type === 'VERIFIED_NUMBER' ? 'Yes' : 'No'}</TableCell>
      <TableCell>{phone.sid}</TableCell>
      <TableCell>{phone.phoneByDefault ? 'Yes' : 'No'}</TableCell>
      <TableCell>
        <div className={styles.__edit__button} onClick={handleEdit}>
          <Icon name="edit" size={19} />
        </div>
      </TableCell>
    </TableRow>
  );
};

const TwilioConfig = ({ setModalVisible }) => {
  const settings = useUserSettings();
  const reloadUserSettings = useUserSettingsReload();
  const { createToast } = useToasts();
  const methods = useForm({ defaultValues: { ...settings.account } });
  const twilioNumbers = useEntity('phoneNumbers')
    ?.all()
    .filter(number => number.type === 'TWILIO_NUMBER' || number.type === 'VERIFIED_NUMBER');
  const { openCreateAddPhoneModal, openEditAddPhoneModal, open } = useAddPhoneNumberModal();
  const bobjectGlobalPicklist = useEntity('bobjectGlobalPicklists');
  const userGlobalPicklist = bobjectGlobalPicklist?.findByLogicRole('USER');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const dialerTypes = useEntity('dialerTypes');
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const { t } = useTranslation();

  const userList = bobjectPicklistFieldValues
    ?.filterBy('bobjectGlobalPicklist', userGlobalPicklist?.id)
    ?.filter(x => x.enabled);

  const handleDeleteTwilio = () => {
    const newDialerTypes = settings.account?.dialerTypes?.map(
      type =>
        `dialerTypes/${
          dialerTypes.find(t => t.enumName === type && t.enumName !== 'BLOOBIRDS_DIALER')?.id
        }`,
    );
    RestApi.patch({
      entity: 'accounts',
      id: settings.account?.id,
      body: {
        twilioApplicationSid: null,
        twilioAccountSid: null,
        twilioAuthToken: null,
        dialerTypes: newDialerTypes,
      },
    }).then(() => {
      createToast({
        message: t('accountSettings.dialers.twilio.integrationDeletedSuccess'),
        type: 'success',
      });
      reloadUserSettings();
    });
  };

  const handleToggleRecording = () => {
    RestApi.patch({
      entity: 'accounts',
      id: settings.account?.id,
      body: methods.getValues(),
    }).then(() => {
      createToast({
        message: t('accountSettings.dialers.twilio.integrationUpdatedSuccess'),
        type: 'success',
      });
      reloadUserSettings();
      setModalVisible(false);
    });
  };

  return (
    <>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              {t('accountSettings.dialers.twilio.title')}
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('accountSettings.dialers.twilio.subtitle')}
              <a
                className={styles._link__button}
                href="https://support.bloobirds.com/hc/en-us/articles/360011451399-Set-up-your-Twilio-account"
                target="_blank"
                rel="noreferrer"
              >
                {t('accountSettings.dialers.twilio.here')}
              </a>
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <FormProvider {...methods}>
            <AccountSettingsSection>
              <AccountSettingsSectionContent>
                <div className={styles._config__account}>
                  <Text className={styles._config__account_name} size="m" color="softPeanut">
                    {t('accountSettings.dialers.twilio.sid')}: {settings.account?.twilioAccountSid}
                  </Text>
                  <Button variant="clear" onClick={() => setModalVisible(true)}>
                    {t('common.edit').toUpperCase()}
                  </Button>
                  <Button
                    variant="tertiary"
                    color="tomato"
                    onClick={() => setConfirmModalOpen(true)}
                  >
                    {t('common.delete').toUpperCase()}
                  </Button>
                </div>
                <Controller
                  name="enableCallRecording"
                  onChangeName="onClick"
                  render={({ onChange, value }) => (
                    <Checkbox
                      checked={value}
                      onClick={v => {
                        onChange(v);
                        handleToggleRecording();
                      }}
                    >
                      {t('accountSettings.dialers.twilio.enableCallRecording')}
                    </Checkbox>
                  )}
                />
              </AccountSettingsSectionContent>
            </AccountSettingsSection>
          </FormProvider>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="phone">
              {t('accountSettings.dialers.twilio.connectedNumbers')}
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('accountSettings.dialers.twilio.connectedNumbersSubtitle')}
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <Button iconLeft="plus" onClick={openCreateAddPhoneModal}>
              {t('accountSettings.dialers.twilio.newPhoneNumber')}
            </Button>
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            {twilioNumbers?.length > 0 ? (
              <Table className={styles.__table_row__container}>
                <TableHead>
                  <TableCell>{t('accountSettings.dialers.twilio.phoneNumber_other')}</TableCell>
                  <TableCell>{t('accountSettings.dialers.twilio.bloobirdsUsers')}</TableCell>
                  <TableCell>{t('accountSettings.dialers.twilio.location')}</TableCell>
                  <TableCell>{t('accountSettings.dialers.twilio.verifiedCallerId')}</TableCell>
                  <TableCell>{t('accountSettings.dialers.twilio.sid')}</TableCell>
                  <TableCell>{t('accountSettings.dialers.twilio.phoneByDefault')}</TableCell>
                </TableHead>
                <TableBody>
                  {twilioNumbers?.map(phone => (
                    <PhoneNumberRow
                      key={phone.id}
                      phone={phone}
                      handleEdit={() => openEditAddPhoneModal(phone)}
                      userList={userList}
                    />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className={styles._phone_numbers_empty}>
                <SearchLogs className={styles._phone_numbers_empty_img} />
                <Text size="xl" weight="bold" align="center" color="softPeanut">
                  {t('accountSettings.dialers.twilio.noPhoneNumbersFound')}
                </Text>
              </div>
            )}
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
        {open && <AddEditPhoneModal />}
      </AccountSettingsTab>
      <ConfirmDeleteTwilioModal
        handleDeleteTwilio={handleDeleteTwilio}
        confirmModalOpen={confirmModalOpen}
        setConfirmModalOpen={setConfirmModalOpen}
      />
    </>
  );
};

export default TwilioConfig;
