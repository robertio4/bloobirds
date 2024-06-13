import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Input,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import {
  useUserSettings,
  useUserSettingsReload,
} from '../../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../../hooks';
import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import { api } from '../../../../../utils/api';
import styles from './twilioConfigModal.module.css';
import {useTranslation} from "react-i18next";

export const TwilioConfigModal = ({ setModalVisible, isTwilioInstalled }) => {
  const settings = useUserSettings();
  const reloadUserSettings = useUserSettingsReload();
  const methods = useForm({ defaultValues: { ...settings.account } });
  const { createToast } = useToasts();
  const dialerTypes = useEntity('dialerTypes');
  const { save } = useUserHelpers();
  const { t } = useTranslation();

  const handleUpdateAccount = () => {
    const currentDialerTypes = settings.account?.dialerTypes?.map(
      type => `dialerTypes/${dialerTypes.find(t => t.enumName === type)?.id}`,
    );
    const values = {
      ...methods.getValues(),
      dialerTypes: [
        `dialerTypes/${dialerTypes.find(type => type.enumName === 'BLOOBIRDS_DIALER')?.id}`,
        currentDialerTypes.length > 0 ? currentDialerTypes.join(',') : null,
      ],
    };

    api
      .patch(
        `/entities/accounts/${settings.account.id}`,
        isTwilioInstalled ? methods.getValues() : values,
      )
      .then(() => {
        createToast({
          message: t('accountSettings.dialers.twilio.integrationUpdatedSuccess'),
          type: 'success',
        });
        reloadUserSettings();
        setModalVisible(false);
      });
    save(UserHelperKeys.CHOOSE_DIALER);
  };

  return (
    <Modal open onClose={() => setModalVisible(false)} width={600}>
      <ModalHeader>
        <ModalTitle>{t('accountSettings.dialers.twilio.setUpTwilio')}</ModalTitle>
        <ModalCloseIcon onClick={() => setModalVisible(false)} />
      </ModalHeader>
      <ModalContent>
        <Text htmlTag="h5" size="s" color="softPeanut" className={styles._howTo__text}>
          {t('accountSettings.dialers.twilio.howToCreate')}
          <span
            className={styles._link__button}
            onClick={() =>
              window.open(
                'https://support.bloobirds.com/hc/en-us/articles/360011451399-Set-up-your-Twilio-account',
                '_blank',
              )
            }
          >
            {' '}
            {t('accountSettings.dialers.twilio.here')}
          </span>
        </Text>
        <FormProvider {...methods}>
          <div className={styles._form__container}>
            <Controller
              name="twilioApplicationSid"
              rules={{
                required: t('accountSettings.dialers.twilio.requiredField'),
              }}
              render={({ onChange, value }) => (
                <Input
                  error={methods.errors.twilioApplicationSid?.message}
                  value={value}
                  onChange={onChange}
                  placeholder={t('accountSettings.dialers.twilio.applicationSidPlaceholder')}
                  width={375}
                  className={styles._input__container}
                />
              )}
            />
            <Controller
              name="twilioAccountSid"
              rules={{
                required: t('accountSettings.dialers.twilio.requiredField'),
              }}
              render={({ onChange, value }) => (
                <Input
                  error={methods.errors.twilioAccountSid?.message}
                  value={value}
                  onChange={onChange}
                  placeholder={t('accountSettings.dialers.twilio.accountSidPlaceholder')}
                  width={375}
                  className={styles._input__container}
                />
              )}
            />
            <Controller
              name="twilioAuthToken"
              rules={{
                required: t('accountSettings.dialers.twilio.requiredField'),
              }}
              render={({ onChange, value }) => (
                <Input
                  error={methods.errors.twilioAuthToken?.message}
                  value={value}
                  onChange={onChange}
                  placeholder={t('accountSettings.dialers.twilio.authTokenPlaceholder')}
                  width={375}
                  className={styles._input__container}
                />
              )}
            />
          </div>
        </FormProvider>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={() => setModalVisible(false)}>
          {t('common.cancel').toUpperCase()}
        </Button>
        <Button onClick={methods.handleSubmit(handleUpdateAccount)}>
          {t('common.save').toUpperCase()}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
