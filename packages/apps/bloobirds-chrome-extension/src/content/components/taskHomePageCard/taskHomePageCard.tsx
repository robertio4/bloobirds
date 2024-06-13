import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  Button,
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardRight,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { checkIsOverdue, useCustomTasks, useMinimizableModals } from '@bloobirds-it/hooks';
import { BobjectTypes, MessagesEvents, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getTaskText } from '@bloobirds-it/utils';

import { api } from '../../../utils/api';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../utils/bobjects.utils';
import { TASK_STATUS_VALUE_LOGIC_ROLE } from '../../../utils/task';
import { PriorityLabel } from '../card/fieldTypeComponent';
import { ScheduledDateTime } from '../contactView/components/miniCard/components/cardDates';
import styles from '../contactView/components/miniCard/miniCard.module.css';
import { useExtensionContext } from '../context';
import { TaskIconDisplay } from '../taskIconDisplay/taskIconDisplay';
import style from './taskHomePageCard.module.css';

export const TaskHomePageCard = () => {
  const { setCurrentTask, useGetCurrentTask, useGetSidePeekEnabled } = useExtensionContext();
  const { customTasks } = useCustomTasks();
  const { t } = useTranslation();
  const isSidePeekEnabled = useGetSidePeekEnabled();
  const task = useGetCurrentTask();

  const taskTitle = getTaskText(task, 'Title', customTasks, true, t);
  const taskDescription = getTaskText(task, 'Description', customTasks, true, t);
  const scheduledDatetime = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);

  const assignee = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const taskPriority = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY);

  const isOverdue = checkIsOverdue(task);

  const { openMinimizableModal } = useMinimizableModals();

  const company = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const lead = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;

  const handleEdit = () => {
    openMinimizableModal({
      type: 'task',
      data: {
        [task?.id.typeName.toLowerCase()]: task,
        location: 'bubble',
        bobjectId: task?.id?.value,
        company,
        lead,
        opportunity,
      },
    });
  };

  const handleMarkAsDone = () => {
    api
      .patch(`/bobjects/${task?.id.value}/raw`, {
        contents: {
          [TASK_FIELDS_LOGIC_ROLE.STATUS]: checkIsOverdue(task)
            ? TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE
            : TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
        },
        params: {
          skipEmptyUpdates: true,
        },
      })
      .then(() => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.TaskCompleted, {
            detail: { id: task?.id?.value },
          }),
        );
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Task },
          }),
        );
        setCurrentTask(undefined);
      });
  };

  return (
    <div className={style.cardWrapper}>
      <Card borderColor="seagreen" expand>
        <CardHeader>
          <CardBody>
            <TaskIconDisplay bobject={task} size={isSidePeekEnabled ? 20 : 18} />
            <Text size="xs" weight="bold" className={styles.taskTitle}>
              {taskTitle}
            </Text>
            <div className={styles.rightSide}>
              <ScheduledDateTime
                isOverdue={isOverdue}
                scheduledDateTime={scheduledDatetime}
                isCadence={false}
              />
              <PriorityLabel priority={taskPriority} showOnlyImportant onlyFlag />
            </div>
          </CardBody>
        </CardHeader>
        <CardContent>
          <Text className={styles.verticalEllipsis} color="peanut" size="xs">
            {taskDescription}
          </Text>
        </CardContent>
        <CardContent>
          <CardRight>
            <AssigneeComponent value={assignee} />
          </CardRight>
        </CardContent>
        <CardBody>
          <div className={style.buttonsWrapper}>
            <Button
              expand
              inline
              size="small"
              variant="secondary"
              iconLeft={isSidePeekEnabled ? 'edit' : undefined}
              onClick={handleEdit}
              uppercase={false}
              className={style.cardButton}
            >
              {t('extension.card.editTaskButton')}
            </Button>
            <Button
              expand
              inline
              size="small"
              iconLeft={isSidePeekEnabled ? 'check' : undefined}
              onClick={handleMarkAsDone}
              uppercase={false}
              className={style.cardButton}
            >
              {t('extension.card.markAsDone')}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TaskHomePageCard;
