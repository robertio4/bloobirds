import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  Icon,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
  Input,
  Flag,
  countries,
  Button,
  ModalFooterButtons,
} from '@bloobirds-it/flamingo-ui';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { useAddPhoneNumberModal } from '../../../../../hooks/useAddPhoneNumberModal';
import styles from './addEditPhoneModal.module.css';

const AddEditPhoneModal = () => {
  const {
    open,
    handleClose,
    phoneNumber,
    handlePhoneCreation,
    handlePhoneEdit,
    handlePhoneDelete,
    isSubmitting,
  } = useAddPhoneNumberModal();
  const defaultValues = {
    phoneNumber: phoneNumber.phone?.phoneNumber,
    location: phoneNumber.phone?.location,
    phoneByDefault: phoneNumber.phone?.phoneByDefault,
    sid: phoneNumber.phone?.sid,
    verifiedCaller: phoneNumber.phone?.type === 'VERIFIED_NUMBER',
  };
  const methods = useForm({ defaultValues });
  const isVerified = methods.watch('verifiedCaller');
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={handleClose} width={700}>
      <form
        onSubmit={methods.handleSubmit(
          phoneNumber.mode === 'EDIT' ? handlePhoneEdit : handlePhoneCreation,
        )}
      >
        <ModalHeader>
          <ModalTitle>{t('accountSettings.dialers.twilio.addPhoneNumber')}</ModalTitle>
          <ModalCloseIcon onClick={handleClose} />
        </ModalHeader>
        <ModalContent>
          <div className={styles._content__container}>
            <div className={styles._header__container}>
              <div className={styles._icon__container}>
                <Icon name="phone" size={48} color="softPeanut" />
              </div>
              <div className={styles._divider} />
            </div>
            <div className={styles._form__container}>
              <div className={styles._form__section__container}>
                <Text size="s" weight="bold" className={styles._form__section__title}>
                  {t('accountSettings.dialers.twilio.enterTwilioNumber')}
                </Text>
                <div className={styles._inputs__container}>
                  <Controller
                    name="phoneNumber"
                    control={methods.control}
                    rules={{
                      required: t('accountSettings.dialers.twilio.mandatoryField'),
                    }}
                    render={({ onChange, value }) => {
                      const phone = value?.replace(/([a-zA-Z])/g, '')?.replace(/\s/g, '');
                      const countryCode = useMemo(() => {
                        if (value) {
                          const phoneNum = parsePhoneNumberFromString(value);
                          if (phoneNum?.isValid()) {
                            return countries.find(x => x.code === phoneNum.country)?.code;
                          }
                        }
                        return null;
                      }, [value]);
                      return (
                        <Input
                          value={phone}
                          error={methods.errors.phoneNumber?.message}
                          onChange={onChange}
                          placeholder={t('accountSettings.dialers.twilio.phoneNumber_one')}
                          width={280}
                          adornment={countryCode && <Flag code={countryCode} />}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="location"
                    control={methods.control}
                    render={({ onChange, value }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        placeholder={t('accountSettings.dialers.twilio.location')}
                        width={280}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="phoneByDefault"
                  control={methods.control}
                  render={({ onChange, value }) => (
                    <Checkbox checked={value} onClick={onChange} size="small">
                      {t('accountSettings.dialers.twilio.phoneByDefault')}
                    </Checkbox>
                  )}
                />
              </div>
              <div className={styles._form__section__container}>
                <div className={styles._form__section__title}>
                  <Text size="s" weight="bold">
                    {t('accountSettings.dialers.twilio.isVerifiedCalledId')}
                  </Text>
                </div>
                <div className={styles._inputs__container}>
                  <Controller
                    name="verifiedCaller"
                    control={methods.control}
                    onChangeName="onClick"
                    render={({ onChange, value }) => (
                      <Checkbox checked={value} onClick={onChange} size="small">
                        {t('common.yes')}
                      </Checkbox>
                    )}
                  />
                </div>
                <div className={styles._inputs__container}>
                  <Controller
                    name="sid"
                    rules={{
                      required: !isVerified && t('accountSettings.dialers.twilio.mandatoryField'),
                    }}
                    control={methods.control}
                    render={({ onChange, value }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        error={methods.errors.sid?.message}
                        width={580}
                        placeholder={t('accountSettings.dialers.twilio.sidNumber')}
                        disabled={isVerified}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <div>
            <Button variant="clear" color="bloobirds" onClick={handleClose}>
              {t('common.cancel')}
            </Button>
            {phoneNumber.mode === 'EDIT' && (
              <Button
                color="tomato"
                variant="tertiary"
                disabled={isSubmitting}
                onClick={handlePhoneDelete}
              >
                {t('common.delete')}
              </Button>
            )}
          </div>
          <ModalFooterButtons>
            {phoneNumber?.mode === 'EDIT' ? (
              <Button type="submit" disabled={isSubmitting}>
                {t('accountSettings.dialers.twilio.updatePhone')}
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} dataTest={'schedulePause'}>
                {t('common.create')}
              </Button>
            )}
          </ModalFooterButtons>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddEditPhoneModal;
