import { useTranslation } from 'react-i18next';

import { ActionOptions, ReminderOptions, ToastOptions, useToasts } from '@bloobirds-it/flamingo-ui';
import { TFunction } from 'i18next';
import { atom, useRecoilState } from 'recoil';

import { BobjectApi } from '../misc/api/bobject';
import { TASK_STATUS_VALUE_LOGIC_ROLE } from '../utils/task';
import { useAccountId } from './useAccountId';

const taskDoneVisibilityAtom = atom({
  key: 'taskDoneVisibilityAtom',
  default: false,
});

const taskToOpenAtom = atom({
  key: 'taskToOpenAtom',
  default: null,
});

const markAsDone = (
  accountId: string,
  taskId: string,
  createToast: (config: ToastOptions | ReminderOptions | ActionOptions) => string,
  t: TFunction,
) => {
  const data = {
    TASK__STATUS: TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
  };
  if (typeof taskId === 'string') {
    BobjectApi.request(accountId)
      .Task()
      .partialSet({
        bobjectId: taskId,
        data,
      })
      .then(() =>
        createToast({
          type: 'success',
          message: t('tasks.toasts.completedSuccess'),
        }),
      );
  } else {
    let tasksData = {};
    taskId?.forEach(id => {
      tasksData = { ...tasksData, [id]: data };
    });
    BobjectApi.request(accountId)
      .Task()
      .bulkPartialSet(tasksData)
      .then(() => {
        createToast({
          type: 'success',
          message: t('tasks.toasts.bulkCompletedSuccess', { count: taskId?.length ?? 0 }),
        });
      });
  }
};
const useTaskDoneVisibility = () => {
  const [taskDoneVisibility, setTaskDoneVisibility] = useRecoilState(taskDoneVisibilityAtom);

  const changeVisibility = show => {
    setTaskDoneVisibility(show);
  };

  return {
    isOpen: taskDoneVisibility,
    changeVisibility,
  };
};

export const useTaskDone = () => {
  const { isOpen, changeVisibility } = useTaskDoneVisibility();
  const [taskIdToMarkAsDone, setTaskIdToMarkAsDone] = useRecoilState(taskToOpenAtom);
  const { createToast } = useToasts();
  const accountId = useAccountId();
  const { t } = useTranslation();

  const showToast = (show: boolean, taskId?: string) => {
    setTaskIdToMarkAsDone(taskId);
    changeVisibility(show);
  };

  return {
    isOpen,
    showToast,
    markAsDone: () => {
      markAsDone(accountId, taskIdToMarkAsDone, createToast, t);
    },
    taskCount: Array.isArray(taskIdToMarkAsDone) ? taskIdToMarkAsDone?.length : 1,
  };
};
