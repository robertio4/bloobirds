import { useTranslation } from 'react-i18next';

import { Button, createToast, Icon, Label } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import {
  BobjectPicklistValueEntity,
  BobjectTypes,
  MessagesEvents,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import { TaskFeedTask } from '../../../../../types/clusteredTaskFeed.type';

export const TaskPriorityButton = ({
  task,
  displayOnly = false,
}: {
  task: TaskFeedTask;
  displayOnly?: boolean;
}) => {
  const { t } = useTranslation();
  const dataModel = useDataModel();
  const priorityTaskFields = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const defaultValue: BobjectPicklistValueEntity = priorityTaskFields?.find(priorityTask =>
    [priorityTask.logicRole, priorityTask.name, priorityTask.id].includes(task.priority),
  );
  const isImportantSelected = defaultValue?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT;
  const handleChangePriority = e => {
    e?.preventDefault();
    e?.stopPropagation();
    api
      .patch(`/bobjects/${task?.id}/raw`, {
        contents: {
          [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: isImportantSelected
            ? TASK_PRIORITY_VALUE.NO_PRIORITY
            : TASK_PRIORITY_VALUE.IMPORTANT,
        },
        params: {
          skipEmptyUpdates: true,
        },
      })
      .then(() => {
        createToast({ type: 'success', message: t('extension.card.toasts.changesSaved.success') });
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
      });
  };

  if (displayOnly)
    return isImportantSelected ? (
      <Label
        overrideStyle={{
          backgroundColor: defaultValue?.backgroundColor,
          color: defaultValue?.textColor,
          borderColor: defaultValue?.backgroundColor,
          textTransform: 'initial',
        }}
        hoverStyle={{
          opacity: 0.7,
        }}
        size={'small'}
        key={defaultValue?.id}
      >
        <Icon name="flagFilled" size={12} color={'softTomato'} />
      </Label>
    ) : null;

  return (
    <div onClick={handleChangePriority}>
      <Button
        variant="secondary"
        color={isImportantSelected ? 'softTomato' : 'bloobirds'}
        size={'small'}
        key={defaultValue?.id}
      >
        <Icon name="flagFilled" size={12} color={isImportantSelected ? 'tomato' : 'bloobirds'} />
      </Button>
    </div>
  );
};
