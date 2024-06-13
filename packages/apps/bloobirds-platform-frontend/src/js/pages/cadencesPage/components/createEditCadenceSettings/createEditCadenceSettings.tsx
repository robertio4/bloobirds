import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Checkbox,
  Icon,
  Input,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
// @ts-ignore
import { useCadenceV2Enabled, useRouter, useUserHelpers } from '@bloobirds-it/hooks';
import {
  APP_CADENCES_EDIT,
  APP_PLAYBOOK_CADENCES_EDIT,
  BobjectType,
  BobjectTypes,
  UserHelperKeys,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import SessionManagerFactory from '../../../../misc/session';
import { api } from '../../../../utils/api';
import styles from '../../manageTab/manageTab.module.css';
import { SetCadenceBobjectView } from '../selectCadenceBobjectModal/selectCadenceBobjectModal';

export const CADENCE_EDIT_PERMISSIONS = Object.freeze({
  OWNER: 'BY_OWNER',
  EVERYONE: 'BY_EVERYONE',
});

function CadenceSettingsView({
  cadence,
  refreshCadences,
  onClose,
  bobjectTypeId,
  selectedBobjectType,
}: {
  cadence: any;
  onClose: () => void;
  refreshCadences: () => void;
  bobjectTypeId: string;
  selectedBobjectType?: BobjectTypes;
}) {
  const SessionManager = SessionManagerFactory();
  const userId = SessionManager?.getUser()?.id;
  const isAdmin = useIsAccountAdmin();

  const { history } = useRouter();
  const isEdition = !!cadence;
  const canEditPermission = !isEdition || cadence?.owner === userId || isAdmin;
  const weekdays = cadence && !cadence.includesSaturday && !cadence.includesSunday;
  const defaultValues = cadence
    ? {
        ...cadence,
        weekdays,
        editableMode: cadence.editMode === CADENCE_EDIT_PERMISSIONS.EVERYONE,
        automationRescheduleMode: cadence?.automationRescheduleMode || 'FAIL',
        reschedulableMode: cadence?.reschedulableMode || 'RESCHEDULABLE',
        timeZoneToApplyMode: cadence?.timeZoneToApplyMode || 'USER_TIMEZONE',
      }
    : {
        name: '',
        automated: false,
        weekdays: true,
        editableMode: true,
        bobjectTypeId,
        automationRescheduleMode: 'FAIL',
        reschedulableMode: 'RESCHEDULABLE',
        timeZoneToApplyMode: 'USER_TIMEZONE',
      };
  const methods = useForm({ defaultValues });
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const { save } = useUserHelpers();
  const { createToast } = useToasts();
  const { data: emailSettings } = useSWR('/messaging/settings/email');
  const dailyLimit = emailSettings?.dailyLimit;
  const bobjectTypeName = useBobjectTypes().get(bobjectTypeId)?.name;
  const bobjectType = bobjectTypeName ?? selectedBobjectType;
  const cadenceV2Enabled = useCadenceV2Enabled(SessionManager?.getAccount()?.id);

  const onSave = async (values: {
    name: string;
    automated: boolean;
    weekdays: any;
    bobjectType: BobjectType;
    editableMode: boolean;
    automationRescheduleMode: boolean;
    reschedulableMode: string;
    isOfficial: boolean;
    isNurturingCadence: boolean;
    timeZoneToApplyMode: string;
  }) => {
    setIsSubmitting(true);

    const valuesToSave = {
      name: values?.name,
      bobjectType: bobjectType,
      canSkipTasks: `${values?.automated}`,
      editableMode: values?.editableMode
        ? CADENCE_EDIT_PERMISSIONS.EVERYONE
        : CADENCE_EDIT_PERMISSIONS.OWNER,
      activeOnWeekends: `${!values?.weekdays}`,
      automationRescheduleMode: values?.automationRescheduleMode,
      reschedulableMode: values?.reschedulableMode,
      isOfficial: values?.isOfficial,
      isNurturingCadence: values?.isNurturingCadence,
      timeZoneToApplyMode: values?.timeZoneToApplyMode,
      startTaskTime: values?.timeZoneToApplyMode === 'BOBJECT_TIMEZONE' ? '08:00:00' : '00:00:00',
    };
    try {
      if (!isEdition) {
        const response = await api.post(`/messaging/cadences`, {
          ...valuesToSave,
        });
        setIsSubmitting(false);
        save(UserHelperKeys.CREATE_YOUR_FIRST_CADENCE);
        onClose();
        createToast({ message: 'Cadence created successfully', type: 'success' });
        mixpanel.track(MIXPANEL_EVENTS.CADENCE_CREATED);
        history.push(
          `${
            cadenceV2Enabled ? APP_CADENCES_EDIT : APP_PLAYBOOK_CADENCES_EDIT
          }?cadence=${encodeURIComponent(response?.data?.id)}&name=${encodeURIComponent(
            response?.data?.name,
          )}&bobjectType=${encodeURIComponent(bobjectType)}`,
        );
      } else {
        await api.put(`/messaging/cadences/${cadence?.id}/settings`, {
          ...valuesToSave,
        });
        await refreshCadences();
        setIsSubmitting(false);
        onClose();
        createToast({ message: 'Cadence updated successfully', type: 'success' });
        mixpanel.track(MIXPANEL_EVENTS.CADENCE_UPDATED);
      }
    } catch (error) {
      setIsSubmitting(false);
      // @ts-ignore
      const message = error?.response?.data?.message || 'Something went wrong';
      createToast({ message: message, type: 'error' });
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalHeader size="small" color="lightBloobirds">
        <ModalTitle>
          <div className={styles._title__container}>
            <Icon size={24} color="bloobirds" name="cadence" />
            <Text size="m" color="peanut">
              {isEdition ? 'Edit' : 'New'} cadence
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} size="small" color="bloobirds" />
      </ModalHeader>
      <ModalContent>
        <ModalSection title="General" icon="alignLeft">
          <Controller
            name="name"
            rules={{ required: 'This field is required' }}
            render={({ onChange, value }) => (
              <Input
                placeholder="Cadence name"
                name="cadenceName"
                onChange={onChange}
                error={methods.errors.name?.message}
                value={value}
                className={styles._main_info__input}
                width="100%"
                color="bloobirds"
              />
            )}
          />
          <div className={styles.settingsBox}>
            <Controller
              name="editableMode"
              render={({ onChange, value }) => (
                <Checkbox
                  size="small"
                  color="bloobirds"
                  onClick={onChange}
                  expand={true}
                  checked={value}
                  disabled={!isAdmin}
                >
                  <Text size="s" color={!isAdmin ? 'verySoftPeanut' : 'peanut'}>
                    <b>Everyone</b> will be able to edit it and make changes.
                  </Text>
                </Checkbox>
              )}
            />
            <Controller
              name="isOfficial"
              render={({ onChange, value }) => (
                <Checkbox
                  size="small"
                  color="bloobirds"
                  onClick={onChange}
                  expand={true}
                  checked={value}
                  disabled={!isAdmin}
                >
                  <Text size="s" inline color={!isAdmin ? 'verySoftPeanut' : 'peanut'}>
                    Official Playbook Cadence
                  </Text>
                </Checkbox>
              )}
            />
            <Controller
              name="isNurturingCadence"
              render={({ onChange, value }) => (
                <Checkbox
                  size="small"
                  color="bloobirds"
                  onClick={onChange}
                  checked={value}
                  expand={true}
                  disabled={!canEditPermission}
                >
                  <Text size="s" color={!canEditPermission ? 'verySoftPeanut' : 'peanut'}>
                    Nurturing Cadence
                  </Text>
                </Checkbox>
              )}
            />
          </div>
        </ModalSection>
        <ModalSection title="More options" icon="chevronDown">
          <div className={styles._steps__section}>
            <Text size="m" weight="bold">
              What do you want to do if you reach the limit of emails allowed per day?
            </Text>
            <Text size="m" weight="regular" color="softPeanut">
              The current limit is {dailyLimit} emails per day.
            </Text>
            <Controller
              name="automationRescheduleMode"
              render={({ onChange, value }) => (
                <div className={styles._radio__container}>
                  <RadioGroup onChange={onChange} value={value}>
                    <Radio
                      value="FAIL"
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <div className={styles.radio_info}>
                        <span>
                          <b>Mark as failed</b> and ask me what to do in each case.
                        </span>
                        <Tooltip
                          title="The auto emails will be marked as 'Failed'. You will be able to edit, reschedule again, reschedule cadence or discard the email."
                          position="top"
                        >
                          <Icon name="info" color="bloobirds" />
                        </Tooltip>
                      </div>
                    </Radio>
                    <Radio
                      value="RESCHEDULE"
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <div className={styles.radio_info}>
                        <span>
                          <b>Reschedule</b> auto email tasks for the next available day.
                        </span>
                        <Tooltip
                          title="The auto emails will be automatically rescheduled to the next available day and you will see these emails marked as 'Reschedule' in your outbox."
                          position="top"
                        >
                          <Icon name="info" color="bloobirds" />
                        </Tooltip>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
              )}
            />
          </div>
          <div className={styles._steps__section}>
            <Text size="m" weight="bold">
              Do you want to be able to reschedule your steps and cadence for another day?
            </Text>
            <Controller
              name="reschedulableMode"
              render={({ onChange, value }) => (
                <div className={styles._radio__container}>
                  <RadioGroup onChange={onChange} value={value}>
                    <Radio
                      value="RESCHEDULABLE"
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <div className={styles.radio_info}>
                        <span>
                          <b>Reschedulable</b> tasks: Can be postponed individually or the entire
                          cadence.
                        </span>
                      </div>
                    </Radio>
                    <Radio
                      value="FIXED"
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <div className={styles.radio_info}>
                        <span>
                          <b>Fixed</b> tasks: can only be done on the day it is due.
                        </span>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
              )}
            />
          </div>
          <div className={styles._steps__section}>
            <Text size="m" weight="bold" className={styles._section__title}>
              Do you want the steps to be mandatory or skippable?
            </Text>
            <Controller
              name="automated"
              render={({ onChange, value }) => (
                <div className={styles._radio__container}>
                  <RadioGroup onChange={onChange} value={value}>
                    <Radio
                      value
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <span>
                        <b>Mandatory tasks:</b> An attempt should be made to mark it as done
                      </span>
                    </Radio>
                    <Radio
                      value={false}
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <span>
                        <b>Skippable tasks:</b> Task can be done without an attempt
                      </span>
                    </Radio>
                  </RadioGroup>{' '}
                </div>
              )}
            />
          </div>
          <div className={styles._steps__section}>
            <Text size="m" weight="bold" className={styles._section__title}>
              Which days of the week do you want the cadences to be played?
            </Text>
            <Controller
              name="weekdays"
              render={({ onChange, value }) => (
                <div className={styles._radio__container}>
                  <RadioGroup onChange={onChange} value={value}>
                    <Radio
                      size="small"
                      value
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      Schedule tasks only on weekdays
                    </Radio>
                    <Radio
                      size="small"
                      value={false}
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      Schedule tasks everyday
                    </Radio>
                  </RadioGroup>
                </div>
              )}
            />
          </div>
          <div className={styles._steps__section}>
            <Text size="m" weight="bold">
              When do you want to schedule the cadence tasks?
            </Text>
            <Text size="m" weight="regular" color="softPeanut">
              If the {bobjectType.toLowerCase()} does not have a timezone, your’s will be used by
              default
            </Text>
            <Controller
              name="timeZoneToApplyMode"
              render={({ onChange, value }) => (
                <div className={styles._radio__container}>
                  <RadioGroup onChange={onChange} value={value}>
                    <Radio
                      value="USER_TIMEZONE"
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <div className={styles.radio_info}>
                        <b>Create the daily tasks on your timezone</b>
                      </div>
                    </Radio>
                    <Radio
                      value="BOBJECT_TIMEZONE"
                      size="small"
                      color="bloobirds"
                      backgroundColor="veryLightBloobirds"
                    >
                      <div className={styles.radio_info}>
                        <span>
                          <b>Create tasks on {bobjectType.toLowerCase()}’s timezone.</b> Created at
                          timezone’s 08.00 AM
                        </span>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
              )}
            />
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose} color="softBloobirds">
          CANCEL
        </Button>
        <Button onClick={methods.handleSubmit(onSave)} disabled={isSubmitting} color="bloobirds">
          {isSubmitting ? (
            <Spinner name="loadingCircle" size={16} color="white" />
          ) : (
            <>{isEdition ? 'EDIT' : 'CREATE'}</>
          )}
        </Button>
      </ModalFooter>
    </FormProvider>
  );
}

export const CreateEditCadenceSettings = ({
  cadence,
  refreshCadences,
  onClose,
  bobjectType,
}: {
  cadence?: any;
  refreshCadences?: () => void;
  onClose: () => void;
  bobjectType?: BobjectType;
}) => {
  const [modalBobjectTypeId, setModalBobjectTypeId] = useState<string>();

  return (
    <Modal open onClose={onClose} variant="primary">
      {modalBobjectTypeId || cadence ? (
        <CadenceSettingsView
          cadence={cadence}
          onClose={onClose}
          refreshCadences={refreshCadences}
          bobjectTypeId={modalBobjectTypeId}
          selectedBobjectType={bobjectType}
        />
      ) : (
        <SetCadenceBobjectView
          bobjectType={bobjectType}
          setModalBobjectType={setModalBobjectTypeId}
          onClose={onClose}
        />
      )}
    </Modal>
  );
};
