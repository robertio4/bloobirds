import { atom, useRecoilState } from 'recoil';
import { TASK_STATUS_VALUE_LOGIC_ROLE } from '@bloobirds-it/types';
import { BobjectApi } from '../misc/api/bobject';
import { useTaskNavigationStorage } from './useTaskNavigation';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useSelectAll } from '@bloobirds-it/hooks';

const taskDoneVisibilityAtom = atom({
  key: 'taskDoneVisibilityAtom',
  default: false,
});

const taskToOpenAtom = atom({
  key: 'taskToOpenAtom',
  default: null,
});

const markAsDone = (taskId, createToast, reseteSelectedItems) => {
  const data = {
    TASK__STATUS: TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
  };
  if (typeof taskId === 'string') {
    BobjectApi.request()
      .Task()
      .partialSet({
        bobjectId: taskId,
        data,
      })
      .then(() => {
        createToast({
          type: 'success',
          message: 'Task completed successfully',
        });
      });
  } else {
    let tasksData = {};
    taskId?.forEach(id => {
      tasksData = { ...tasksData, [id]: data };
    });
    BobjectApi.request()
      .Task()
      .bulkPartialSet(tasksData)
      .then(() => {
        createToast({
          type: 'success',
          message: `${taskId?.length} task${taskId?.length > 1 ? 's' : ''} completed successfully.`,
        });
        reseteSelectedItems();
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
  const { setTaskAsCompleted } = useTaskNavigationStorage();
  const { resetSelectedItems } = useSelectAll();
  const { createToast } = useToasts();

  const showToast = (show, taskId) => {
    setTaskIdToMarkAsDone(taskId);
    changeVisibility(show);
  };

  return {
    isOpen,
    showToast,
    markAsDone: () => {
      markAsDone(taskIdToMarkAsDone, createToast, resetSelectedItems);
      setTaskAsCompleted(taskIdToMarkAsDone);
    },
    taskCount: Array.isArray(taskIdToMarkAsDone) ? taskIdToMarkAsDone?.length : 1,
  };
};
