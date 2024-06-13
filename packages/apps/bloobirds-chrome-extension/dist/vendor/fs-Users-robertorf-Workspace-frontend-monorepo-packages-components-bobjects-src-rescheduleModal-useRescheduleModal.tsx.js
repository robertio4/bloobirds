var _s = $RefreshSig$();
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes, MessagesEvents, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export const useRescheduleModal = () => {
  _s();
  const activeUserId = useActiveUserId();
  function handleSubmit({
    bobject,
    data,
    rescheduleWholeCadence
  }) {
    if (rescheduleWholeCadence) {
      const body = {
        userId: activeUserId,
        taskFromId: bobject.id.value,
        rescheduleAllCadence: true,
        newDate: data
      };
      return api.put("/messaging/cadences/rescheduleStep", body).then(() => {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      });
    } else {
      const body = {
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: data
      };
      return api.patch(`/bobjects/${bobject.id.value}/raw`, body);
    }
  }
  return {
    handleSubmit
  };
};
_s(useRescheduleModal, "XCAJUVqc85Z+shDIZvXMBH3Zmv0=", false, function() {
  return [useActiveUserId];
});
