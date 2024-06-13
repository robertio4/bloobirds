import {
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_SKIPPABLE_VALUE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';

import { useDataModel } from './useDataModel';

const skipTaskModalVisibilityAtom = atom({
  key: 'skipTaskModalVisibilityAtom',
  default: false,
});

const skipTaskAtom = atom({
  key: 'skipTaskAtom',
  default: null,
});

export const useSkipModal = () => {
  const dataModel = useDataModel();
  const isRequiredField = dataModel
    ?.getFieldsByBobjectType(BobjectTypes.Task)
    ?.find(datamodelField => datamodelField.logicRole === TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS)
    ?.required;

  const skipReasons = dataModel
    ?.getFieldsByBobjectType(BobjectTypes.Task)
    ?.find(datamodelField => datamodelField.logicRole === TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS)
    //@ts-ignore overview datamodel return types
    ?.values?.filter(value => value?.isEnabled);

  const hasSkipReasons = skipReasons?.length > 0;

  const skipTask = (task, skipReason?) => {
    const taskId = task.id.value;

    const taskData = {
      [TASK_FIELDS_LOGIC_ROLE.TASK_IS_SKIPPABLE]: TASK_SKIPPABLE_VALUE.YES,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED,
      ...(skipReason ? { [TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS]: skipReason } : {}),
    };
    return api.patch(`/bobjects/${taskId}/raw`, taskData);
  };

  return { skipTask, skipReasons, hasSkipReasons, isRequiredField };
};

export const useOpenSkipTaskModal = () => {
  const dataModel = useDataModel();
  const [skipInfo, setSkipInfo] = useRecoilState(skipTaskAtom);
  const [skipTaskModalVisibility, setSkipTaskModalVisibility] = useRecoilState(
    skipTaskModalVisibilityAtom,
  );

  return {
    openSkipTaskModal: (task, onSave?) => {
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
    dataModel,
  };
};
