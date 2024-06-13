import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';
import isDate from 'lodash/isDate';
import mixpanel from 'mixpanel-browser';
import { atom, useRecoilState } from 'recoil';

import { MIXPANEL_EVENTS } from '../constants/mixpanel';
import { BobjectApi } from '../misc/api/bobject';

const rescheduleModalOpenAtom = atom({
  key: 'rescheduleModalOpenAtom',
  default: false,
});

const bobjectAtom = atom({
  key: 'rescheduledTaskBobjectAtom',
  default: null,
});

const updateTask = async (taskId, data) => {
  return await BobjectApi.request().bobjectType('Task').partialSet({ bobjectId: taskId, data });
};

const bulkUpdateTasks = async tasksData => {
  return await BobjectApi.request().bobjectType('Task').bulkPartialSet(tasksData);
};

const isBulkAction = bobjectToCheck => Array.isArray(bobjectToCheck);

export const useRescheduleTask = () => {
  const [rescheduleModalOpen, setRescheduleModalOpen] = useRecoilState(rescheduleModalOpenAtom);
  const [bobject, setBobject] = useRecoilState(bobjectAtom);

  const openRescheduleModal = ({ bobjectToSet }) => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }

    if (!rescheduleModalOpen) {
      setRescheduleModalOpen(true);
    }
  };

  const closeRescheduleModal = () => {
    if (rescheduleModalOpen) {
      setRescheduleModalOpen(false);
    }
  };

  const rescheduleTasks = (date, keepSameTime = false) => {
    if (isBulkAction(bobject) && isDate(date)) {
      let data;
      bobject.forEach(bobjectItem => {
        if (keepSameTime) {
          const currentDateTime = new Date(
            getValueFromLogicRole(bobjectItem, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME),
          );
          date.setHours(currentDateTime.getHours());
          date.setMinutes(currentDateTime.getMinutes());
        }
        data = {
          ...data,
          [bobjectItem?.id.objectId]: {
            [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: date.toISOString(),
            [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE]: date.toISOString(),
          },
        };
      });
      mixpanel.track(MIXPANEL_EVENTS.RESCHEDULE_BULK_ACTION_CONFIRMED_ON_SCHEDULED_TAB);
      return bulkUpdateTasks(data);
    }
    mixpanel.track(MIXPANEL_EVENTS.RESCHEDULE_ACTION_CONFIRMED_ON_SCHEDULE_TAB);
    return updateTask(bobject?.id?.objectId, {
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: date,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE]: date,
    });
  };

  return {
    isOpen: rescheduleModalOpen,
    bobject,
    closeRescheduleModal,
    openRescheduleModal,
    rescheduleTasks,
  };
};
