import React, { useState } from 'react';

import { CustomDateDialog } from '@bloobirds-it/email';
import { Button, Checkbox, IconButton, Modal, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { getValueFromLogicRole } from '@bloobirds-it/utils';
import clsx from 'clsx';
import spacetime from 'spacetime';
import useSWR from 'swr';

import useUserTimeZone from '../../hooks/useUserTimeZone';
import { api } from '../../utils/api';
import { DateTimeShortcut } from '../dateTimeShortcut/dateTimeShortcut';
import styles from './rescheduleCadenceTaskModal.module.css';
import { useRescheduleCadenceTask } from './useRescheduleCadenceTask';

const RescheduleCadenceTaskModal = () => {
  const userTimeZone = useUserTimeZone();
  const [customDateVisible, setCustomDateVisible] = useState<boolean>(false);
  const [rescheduleWholeCadence, setRescheduleWholeCadence] = useState<boolean>(false);
  const { closeRescheduleTaskModal, rescheduleTask, isBulk, task } = useRescheduleCadenceTask();

  const isSingleTask = !Array.isArray(task);
  const taskStepId = isSingleTask ? getValueFromLogicRole(task, 'TASK__CADENCE_STEP_ID') : null;

  const taskCadenceId = isSingleTask ? getValueFromLogicRole(task, 'TASK__CADENCE') : null;

  const { error } = useSWR(
    isSingleTask && taskCadenceId && taskStepId ? 'stepId' + task.id.value : null,
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

  const tomorrow = spacetime().add(1, 'day').goto('utc').toNativeDate();
  const nextMonday = spacetime().startOf('week').add(1, 'week').goto('utc').toNativeDate();
  const inTwoDays = spacetime().add(2, 'day').goto('utc').toNativeDate();
  const inOneWeek = spacetime().add(7, 'day').goto('utc').toNativeDate();

  const handleSubmit = async (date: Date) => {
    await rescheduleTask(date, rescheduleWholeCadence);
    setCustomDateVisible(false);
  };

  if (customDateVisible) {
    return (
      <CustomDateDialog
        onCancel={() => setCustomDateVisible(false)}
        showDateTime={false}
        onSubmit={async date => {
          const offsetDate = spacetime()
            .goto(userTimeZone)
            .year(date.getFullYear())
            .month(date.getMonth())
            .date(date.getDate())
            .hour(date.getHours())
            .minute(date.getMinutes())
            .toNativeDate();
          await handleSubmit(offsetDate);
        }}
        customButtonText="Reschedule"
        customButtonVariant="primary"
      />
    );
  }

  return (
    <Modal
      className={styles.modal}
      width={isBulk ? 383 : 300}
      open
      onClose={closeRescheduleTaskModal}
    >
      <header className={styles.header}>
        <Text size="xl">Reschedule task{isBulk && 's in bulk'}</Text>
        <IconButton size={40} name="cross" color="bloobirds" onClick={closeRescheduleTaskModal} />
      </header>
      <main className={clsx(styles.content, {})}>
        {isBulk && (
          <Text size="s" align="center">
            Reference date for rescheduling will be based on the <b>latest day</b> from all{' '}
            <b>selected tasks</b>
          </Text>
        )}
        <Tooltip
          title={
            error?.status === 404
              ? "The cadence has been edited and this step no longer exists, it's not possible to reschedule the whole cadence"
              : null
          }
          position={'top'}
        >
          <Checkbox
            checked={rescheduleWholeCadence}
            onClick={() => setRescheduleWholeCadence(!rescheduleWholeCadence)}
            size="small"
            disabled={error?.status === 404}
            expand
          >
            Reschedule {isBulk ? 'cadence for each task' : 'the whole cadence'}
          </Checkbox>
        </Tooltip>
        <div
          className={clsx(styles.shortcuts, {
            [styles.bulkOptions]: isBulk,
          })}
        >
          <DateTimeShortcut
            timezone={userTimeZone}
            text="Tomorrow"
            date={tomorrow}
            onClick={handleSubmit}
            format="{date-ordinal} {month-short}"
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text="Next Monday"
            date={nextMonday}
            onClick={handleSubmit}
            format="{date-ordinal} {month-short}"
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text="In two days"
            date={inTwoDays}
            onClick={handleSubmit}
            format="{date-ordinal} {month-short}"
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text="In one week"
            date={inOneWeek}
            onClick={handleSubmit}
            format="{date-ordinal} {month-short}"
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
          Select custom date
        </Button>
      </main>
    </Modal>
  );
};

export default RescheduleCadenceTaskModal;
