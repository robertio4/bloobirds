import {
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_SKIPPABLE_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useDataModel.ts.js";
const skipTaskModalVisibilityAtom = atom({
  key: "skipTaskModalVisibilityAtom",
  default: false
});
const skipTaskAtom = atom({
  key: "skipTaskAtom",
  default: null
});
export const useSkipModal = () => {
  const dataModel = useDataModel();
  const isRequiredField = dataModel?.getFieldsByBobjectType(BobjectTypes.Task)?.find((datamodelField) => datamodelField.logicRole === TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS)?.required;
  const skipReasons = dataModel?.getFieldsByBobjectType(BobjectTypes.Task)?.find((datamodelField) => datamodelField.logicRole === TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS)?.values?.filter((value) => value?.isEnabled);
  const hasSkipReasons = skipReasons?.length > 0;
  const skipTask = (task, skipReason) => {
    const taskId = task.id.value;
    const taskData = {
      [TASK_FIELDS_LOGIC_ROLE.TASK_IS_SKIPPABLE]: TASK_SKIPPABLE_VALUE.YES,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED,
      ...skipReason ? { [TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS]: skipReason } : {}
    };
    return api.patch(`/bobjects/${taskId}/raw`, taskData);
  };
  return { skipTask, skipReasons, hasSkipReasons, isRequiredField };
};
export const useOpenSkipTaskModal = () => {
  const dataModel = useDataModel();
  const [skipInfo, setSkipInfo] = useRecoilState(skipTaskAtom);
  const [skipTaskModalVisibility, setSkipTaskModalVisibility] = useRecoilState(
    skipTaskModalVisibilityAtom
  );
  return {
    openSkipTaskModal: (task, onSave) => {
      setSkipInfo({ task, onSave });
      setSkipTaskModalVisibility(true);
    },
    isOpen: skipTaskModalVisibility,
    closeSkipTaskModal: () => {
      setSkipTaskModalVisibility(false);
      setSkipInfo(null);
    },
    task: skipInfo?.task,
    onSave: skipInfo?.onSave,
    dataModel
  };
};
