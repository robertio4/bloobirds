import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  DateTimeShortcut,
  IconButton,
  Modal,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useCadenceInfo, useUserTimeZone } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getValueFromLogicRole } from '@bloobirds-it/utils';
import spacetime from 'spacetime';
import useSWR from 'swr';

import { CustomDateDialog } from '../customDateDialog/customDateDialog';
import styles from './rescheduleModal.module.css';
import { useRescheduleModal } from './useRescheduleModal';

export const RescheduleModal = ({
  bobject,
  onClose,
  onSave,
}: {
  bobject: Bobject<BobjectTypes.Task>;
  onClose: () => void;
  onSave?: any;
}) => {
  const { handleSubmit } = useRescheduleModal();
  const userTimeZone = useUserTimeZone();
  const [customDateVisible, setCustomDateVisible] = useState(false);
  const [rescheduleWholeCadence, setRescheduleWholeCadence] = useState<boolean>(false);

  const taskStepId = !Array.isArray(bobject)
    ? getValueFromLogicRole(bobject, 'TASK__CADENCE_STEP_ID')
    : null;

  const taskCadenceId = !Array.isArray(bobject)
    ? getValueFromLogicRole(bobject, 'TASK__CADENCE')
    : null;
  const status = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const isCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status as TASK_STATUS_VALUE_LOGIC_ROLE);
  const isRejected = status === TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED;
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;

  const mainBobject = opportunity || lead || company;

  const { getCadenceById } = useCadenceInfo(mainBobject);
  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.rescheduleModal' });
  const cadenceEntity = getCadenceById(taskCadenceId);

  const { error } = useSWR(
    !Array.isArray(bobject) && taskCadenceId && taskStepId ? 'stepId' + bobject.id.value : null,
    async () => {
      try {
        return await api.get(`/messaging/cadences/${taskCadenceId}/steps/${taskStepId}`);
      } catch (error) {
        const resError = new Error('Error fetching data');
        // @ts-ignore
        resError.status = error.response.status;
        throw resError;
      }
    },
  );

  const getFormattedHour = () => {
    const dateTimeInfo = !Array.isArray(bobject)
      ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME))
      : null;
    return dateTimeInfo && dateTimeInfo.getHours() !== 0
      ? dateTimeInfo.getHours() + ':' + dateTimeInfo.getMinutes() + ''
      : '8:00';
  };

  const taskTime = getFormattedHour();

  const tomorrowMorning = spacetime().startOf('day').add(1, 'day').time(taskTime).toNativeDate();

  const nextMondayDatetime = spacetime()
    .startOf('week')
    .add(1, 'week')
    .time(taskTime)
    .toNativeDate();

  const inTwoDays = spacetime().startOf('day').add(2, 'day').time(taskTime).toNativeDate();

  const inOneWeek = spacetime().startOf('day').add(1, 'week').time(taskTime).toNativeDate();

  const handleSave = async (date: Date) => {
    handleSubmit({ bobject, data: date, rescheduleWholeCadence }).then(() => {
      setCustomDateVisible(false);
      onSave();
      onClose();
    });
  };

  if (customDateVisible) {
    return (
      <CustomDateDialog
        bobject={bobject}
        onCancel={() => setCustomDateVisible(false)}
        onSubmit={async date => {
          const offsetDate = spacetime()
            .goto(userTimeZone)
            .year(date.getFullYear())
            .month(date.getMonth())
            .date(date.getDate())
            .hour(date.getHours())
            .minute(date.getMinutes())
            .toNativeDate();
          await handleSave(offsetDate);
        }}
      />
    );
  }

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <header className={styles.header}>
        <Text size="xl">{t('title')}</Text>
        <IconButton size={40} name="cross" color="bloobirds" onClick={onClose} />
      </header>
      <main className={styles.content}>
        {
          // @ts-ignore
          cadenceEntity?.reschedulableMode === 'RESCHEDULABLE' && !isCompleted && !isRejected && (
            <Tooltip title={error?.status === 404 ? t('error') : null} position="top">
              <Checkbox
                checked={rescheduleWholeCadence}
                onClick={() => setRescheduleWholeCadence(!rescheduleWholeCadence)}
                size="small"
                disabled={error?.status === 404}
                expand
              >
                {t('rescheduleWholeCadence')}
              </Checkbox>
            </Tooltip>
          )
        }
        <div className={styles.shortcuts}>
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('tomorrow')}
            date={tomorrowMorning}
            onClick={handleSave}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('nextMonday')}
            date={nextMondayDatetime}
            onClick={handleSave}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('inTwoDays')}
            date={inTwoDays}
            onClick={handleSave}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text={t('inOneWeek')}
            date={inOneWeek}
            onClick={handleSave}
          />
        </div>
        <Button
          className={styles.customButton}
          expand={true}
          variant="tertiary"
          uppercase={true}
          iconLeft="calendar"
          onClick={() => setCustomDateVisible(true)}
        >
          {t('selectDateAndTime')}
        </Button>
      </main>
    </Modal>
  );
};
