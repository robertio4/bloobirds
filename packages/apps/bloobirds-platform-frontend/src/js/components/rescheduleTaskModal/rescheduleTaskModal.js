import React, { useState } from 'react';

import { CustomDateDialog } from '@bloobirds-it/email';
import {
  Button,
  Checkbox,
  DateTimeShortcut,
  IconButton,
  Modal,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useUserTimeZone } from '@bloobirds-it/hooks';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import spacetime from 'spacetime';

import { useRescheduleTask } from '../../hooks/useRescheduleTask';
import { getTextFromLogicRole } from '../../utils/bobjects.utils';
import styles from './rescheduleTaskModal.modules.css';

const isBulkAction = bobjectToCheck => Array.isArray(bobjectToCheck);

const RescheduleTaskModal = ({ onSave }) => {
  const userTimeZone = useUserTimeZone();

  const { closeRescheduleModal, rescheduleTasks, bobject } = useRescheduleTask();
  const [customDateDialog, setCustomDateDialog] = useState(false);
  const [keepSameTime, setKeepSameTime] = useState(false);

  const getFormattedHour = () => {
    const dateTimeInfo = !isBulkAction(bobject)
      ? new Date(getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME))
      : null;
    return dateTimeInfo ? dateTimeInfo.getHours() + ':' + dateTimeInfo.getMinutes() + '' : '8:00';
  };

  const taskTime = getFormattedHour();

  const tomorrowMorning = spacetime()
    .startOf('day')
    .add(1, 'day')
    .time(taskTime)
    .goto('utc')
    .toNativeDate();

  const nextMonday = spacetime()
    .startOf('day')
    .startOf('week')
    .add(1, 'week')
    .time(taskTime)
    .goto('utc')
    .toNativeDate();

  const inTwoDays = spacetime()
    .startOf('day')
    .add(2, 'day')
    .time(taskTime)
    .goto('utc')
    .toNativeDate();

  const inOneWeek = spacetime()
    .startOf('day')
    .add(1, 'week')
    .time(taskTime)
    .goto('utc')
    .toNativeDate();

  if (customDateDialog) {
    return (
      <CustomDateDialog
        bobject={bobject}
        onCancel={() => setCustomDateDialog(false)}
        showDateTime={!keepSameTime}
        onSubmit={async date => {
          const offsetDate = spacetime()
            .goto(userTimeZone)
            .year(date.getFullYear())
            .month(date.getMonth())
            .date(date.getDate())
            .hour(date.getHours())
            .minute(date.getMinutes())
            .toNativeDate();
          await rescheduleTasks(offsetDate, keepSameTime);
          onDateChanged();
        }}
      />
    );
  }

  function onDateChanged() {
    onSave();
    closeRescheduleModal();
  }

  return (
    <Modal open className={styles.modal} onClose={closeRescheduleModal}>
      <header className={styles.header}>
        <Text size="xl">Reschedule tasks</Text>
        <IconButton size={40} name="cross" color="bloobirds" onClick={closeRescheduleModal} />
      </header>
      <main className={styles.content}>
        <div className={styles.shortcuts}>
          <DateTimeShortcut
            timezone={userTimeZone}
            text="Tomorrow"
            date={tomorrowMorning}
            format={keepSameTime ? '{day-short} {date-ordinal}' : '{nice-short}'}
            onClick={date => rescheduleTasks(date, keepSameTime).then(() => onDateChanged())}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text="Next Monday"
            date={nextMonday}
            format={keepSameTime ? '{day-short} {date-ordinal}' : '{nice-short}'}
            onClick={date => rescheduleTasks(date, keepSameTime).then(() => onDateChanged())}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text="In two days"
            date={inTwoDays}
            format={keepSameTime ? '{day-short} {date-ordinal}' : '{nice-short}'}
            onClick={date => rescheduleTasks(date, keepSameTime).then(() => onDateChanged())}
          />
          <DateTimeShortcut
            timezone={userTimeZone}
            text="In one week"
            date={inOneWeek}
            format={keepSameTime ? '{day-short} {date-ordinal}' : '{nice-short}'}
            onClick={date => rescheduleTasks(date, keepSameTime).then(() => onDateChanged())}
          />
        </div>
        {isBulkAction(bobject) && (
          <Checkbox
            checked={keepSameTime}
            onClick={() => setKeepSameTime(!keepSameTime)}
            size="small"
            expand
          >
            Keep the original time (hour and minute)
          </Checkbox>
        )}
        <Button
          className={styles.customButton}
          expand={true}
          variant="tertiary"
          uppercase={true}
          iconLeft="calendar"
          onClick={() => setCustomDateDialog(true)}
        >
          Select date and time
        </Button>
      </main>
    </Modal>
  );
};

export default RescheduleTaskModal;
