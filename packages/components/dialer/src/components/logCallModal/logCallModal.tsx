import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Chip,
  ChipGroup,
  DateTimePicker,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useActiveUserSettings,
  useAircallPhoneLinkEnabled,
} from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  DataModelResponse,
  MessagesEvents,
  MIXPANEL_EVENTS,
  PluralBobjectTypes,
  BobjectTypes,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import md5 from 'md5';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import { fillReferenceFields, getMainBobjectId } from '../../utils';
import styles from './logCallModal.module.css';

export interface LogCallModalProps {
  leadId?: string;
  companyId?: string;
  opportunityId?: string;
  userPhoneNumber?: string;
  dialedNumber?: string;
  onClose: () => void;
  dataModel: DataModelResponse;
  leadsPhoneNumbers?: string[];
}

export const LogCallModal = (props: LogCallModalProps) => {
  const {
    leadId,
    companyId,
    userPhoneNumber,
    dialedNumber,
    onClose,
    opportunityId,
    leadsPhoneNumbers,
  } = props;
  const [loggingCall, setLoggingCall] = useState<boolean>();
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const { settings } = useActiveUserSettings();
  const { createToast } = useToasts();
  const { openWizard, resetWizardProperties } = useWizardContext();

  const { t } = useTranslation();

  const defaultValues = {
    direction: 'OUTGOING',
    userPhoneNumber,
    dialedNumber,
    callDateTime: new Date(),
  };
  const { control, getValues, setValue } = useForm({ defaultValues });

  async function openCorrectContactFlow(activity: Bobject) {
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(
        `/linkedin/${PluralBobjectTypes[mainBobjectId.split('/')[1]]?.toLowerCase()}/${
          mainBobjectId.split('/')[2]
        }`,
      );
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }

  async function logCall() {
    const values = getValues();
    setLoggingCall(true);
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LOG_CALL_BUTTON_ON_MODAL_OTO);
    const response = await api.post(`/calls/whiteLabel/call`, {
      sdrPhone: values?.userPhoneNumber,
      leadPhone: values?.dialedNumber,
      leadId: leadId,
      companyId: companyId,
      direction: values?.direction,
      callDateTime: values?.callDateTime?.toISOString(),
      callSid: `BB${md5(`${userPhoneNumber}${dialedNumber}${new Date().toISOString()}`)}`,
      otherFields: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunityId,
      },
    });

    try {
      createToast({ message: t('dialer.logCall.toast.success'), type: 'success' });
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Activity },
        }),
      );
    } catch (e) {
      console.error(e);
    }
    const activity = response?.data?.activity;
    if (activity) {
      api.get(`/bobjects/${activity?.value}/form?injectReferences=true`).then(response => {
        const activityToCCF = fillReferenceFields(response?.data);
        if (response?.data) {
          setActivityCCF(activityToCCF);
        }
        openCorrectContactFlow(activityToCCF);
      });
    } else {
      onClose();
    }
    // Wait 1.5 seconds and clear the activity log call
    setTimeout(() => {
      setLoggingCall(false);
    }, 1500);
  }

  const { data: userPhones } = useSWR(
    `/entities/users/${settings?.user?.id}/phoneNumbers`,
    async () => {
      const response = await api.get(`/entities/users/${settings?.user?.id}/phoneNumbers`);
      const filteredPhones = response?.data?._embedded?.phoneNumbers.filter(
        (phoneNumber: any) =>
          phoneNumber?.type === 'TWILIO_NUMBER' || phoneNumber?.type === 'VERIFIED_NUMBER',
      );
      if (!getValues()?.userPhoneNumber && filteredPhones.length > 0) {
        const defaultOrFirst =
          filteredPhones.find((phoneNumber: any) => phoneNumber?.phoneByDefault) ||
          filteredPhones[0];
        setValue('userPhoneNumber', defaultOrFirst.phoneNumber);
      }

      return filteredPhones;
    },
  );

  useEffect(() => {
    if (!getValues()?.userPhoneNumber && userPhones?.length > 0) {
      const defaultOrFirst =
        userPhones.find((phoneNumber: any) => phoneNumber?.phoneByDefault) || userPhones[0];
      setValue('userPhoneNumber', defaultOrFirst.phoneNumber);
    }
  }, []);

  function handleClose() {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: mainActivityBobject.id.typeName },
      }),
    );
    onClose();
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  return (
    <>
      {!showCorrectContactFlow ? (
        <>
          <Modal onClose={onClose} width={342} open={true}>
            <ModalHeader size="small" className={styles.header}>
              <ModalTitle size="small" icon="callOutgoing">
                {t('dialer.logCallModal.title')}
              </ModalTitle>
              <ModalCloseIcon onClick={onClose} size="small" />
            </ModalHeader>
            <ModalContent className={styles.content}>
              <Controller
                control={control}
                name="direction"
                render={({ field }) => {
                  const handleOnChange = field.onChange;
                  return (
                    <>
                      <Text size="s">{t('dialer.direction.title')}</Text>
                      <ChipGroup value={field.value} onChange={handleOnChange}>
                        <Chip value="OUTGOING" size="small">
                          {t('dialer.direction.outgoing')}
                        </Chip>
                        <Chip value="INCOMING" size="small">
                          {t('dialer.direction.incoming')}
                        </Chip>
                      </ChipGroup>
                    </>
                  );
                }}
              />
              <Controller
                control={control}
                name="callDateTime"
                render={({ field }) => {
                  const handleOnChange = field.onChange;
                  return (
                    <DateTimePicker
                      value={field.value}
                      onChange={handleOnChange}
                      placeholder={t('dialer.logCallModal.date')}
                      width="100%"
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="userPhoneNumber"
                render={({ field }) => {
                  const handleOnChange = field.onChange;
                  return (
                    <Select
                      width="100%"
                      value={field.value}
                      onChange={handleOnChange}
                      placeholder={t('dialer.logCallModal.yourPhoneNumber')}
                      borderless={true}
                    >
                      {userPhones?.map((phoneNumber: any) => (
                        <Item key={phoneNumber.id} value={phoneNumber?.phoneNumber}>
                          {phoneNumber?.phoneNumber}
                        </Item>
                      ))}
                    </Select>
                  );
                }}
              />
              <Controller
                control={control}
                name="dialedNumber"
                render={({ field }) => {
                  const handleOnChange = field.onChange;
                  return leadsPhoneNumbers?.length > 0 ? (
                    <Select
                      width="100%"
                      value={field.value}
                      onChange={handleOnChange}
                      placeholder={t('dialer.logCallModal.phoneNumber')}
                      borderless={true}
                    >
                      {leadsPhoneNumbers.map((phoneNumber, idx) => (
                        <Item key={phoneNumber + '-' + idx} value={phoneNumber}>
                          {phoneNumber}
                        </Item>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      width="100%"
                      value={field.value}
                      onChange={handleOnChange}
                      placeholder={t('dialer.logCallModal.phoneNumber')}
                      borderless={true}
                    />
                  );
                }}
              />
            </ModalContent>
            <ModalFooter className={styles.footer}>
              <Button size="small" variant="clear" onClick={onClose}>
                {t('common.cancel')}
              </Button>
              <Button size="small" variant="primary" onClick={logCall}>
                {!loggingCall ? (
                  t('dialer.logCall.button')
                ) : (
                  <Spinner name="loadingCircle" color="white" size={12} />
                )}
              </Button>
            </ModalFooter>
          </Modal>
        </>
      ) : (
        <>
          {activityCCF &&
            mainActivityBobject &&
            openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
              referenceBobject: mainActivityBobject,
              handleClose: handleClose,
            })}
        </>
      )}
    </>
  );
};
