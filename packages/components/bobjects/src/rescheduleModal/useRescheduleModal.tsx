import { useActiveUserId } from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  MessagesEvents,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

export const useRescheduleModal = () => {
  const activeUserId = useActiveUserId();
  function handleSubmit({ bobject, data, rescheduleWholeCadence }) {
    if (rescheduleWholeCadence) {
      const body = {
        userId: activeUserId,
        taskFromId: bobject.id.value,
        rescheduleAllCadence: true,
        newDate: data,
      };

      return api.put('/messaging/cadences/rescheduleStep', body).then(() => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
      });
    } else {
      const body = {
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: data,
      };
      return api.patch(`/bobjects/${bobject.id.value}/raw`, body);
    }
  }

  return { handleSubmit };
};
