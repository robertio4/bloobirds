import { useState } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import spacetime from 'spacetime';

import { useActiveUser } from '../../hooks';
import useModalVisibility from '../../hooks/useModalVisibility';
import { api } from '../../utils/api';

interface RescheduleOptions {
  rescheduleTask: (date: Date, shouldRescheduleAllCadence: boolean) => Promise<void>;
  openRescheduleTaskModal: (task: Bobject) => void;
  closeRescheduleTaskModal: () => void;
  isOpen: boolean;
  isBulk: boolean;
  isSubmitting: boolean;
  task: Bobject | Bobject[];
}

const taskAtom = atom({
  key: 'taskToReschedule',
  default: null,
});

export const useRescheduleCadenceTask = (): RescheduleOptions => {
  const { isOpen, openModal, closeModal } = useModalVisibility('rescheduleTask');
  const { activeUser } = useActiveUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [task, setTask] = useRecoilState<Bobject | Bobject[]>(taskAtom);
  const resetTask = useResetRecoilState(taskAtom);
  const isBulk = Array.isArray(task) && task?.length !== 1;
  const { createToast } = useToasts();

  const openRescheduleTaskModal = (task: Bobject | Bobject[]) => {
    if (task) {
      setTask(task);
    }
    if (!isOpen) {
      openModal();
    }
  };

  const closeRescheduleTaskModal = () => {
    if (isOpen) {
      closeModal();
      resetTask();
    }
  };

  const rescheduleTask = async (date: Date, shouldRescheduleAllCadence: boolean) => {
    setIsSubmitting(true);
    let requestInfo;
    if (isBulk) {
      const body =
        task.map(t => ({
          userId: activeUser?.id,
          taskFromId: t?.id?.objectId,
          rescheduleAllCadence: shouldRescheduleAllCadence,
          newDate: spacetime(date, 'UTC').format('iso-utc'),
        })) || [];
      requestInfo = { url: '/messaging/cadences/rescheduleStepBulk', body };
    } else {
      const sampledBobject = Array.isArray(task) ? task[0] : task;
      const body = {
        userId: activeUser?.id,
        taskFromId: sampledBobject?.id?.objectId,
        rescheduleAllCadence: shouldRescheduleAllCadence,
        newDate: spacetime(date, 'UTC').format('iso-utc'),
      };
      requestInfo = { url: '/messaging/cadences/rescheduleStep', body };
    }
    const response = await api.put(requestInfo.url, requestInfo.body);
    if (response.status === 204) {
      createToast({
        type: 'info',
        message: shouldRescheduleAllCadence ? 'Rescheduling tasks...' : 'Rescheduling task...',
      });
      closeRescheduleTaskModal();
    }
  };

  return {
    isBulk,
    rescheduleTask,
    isOpen,
    isSubmitting,
    openRescheduleTaskModal,
    closeRescheduleTaskModal,
    task,
  };
};
