import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton, createToast, Spinner, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useCustomTasks, useQuickLogActivity } from '@bloobirds-it/hooks';
import { useActivities } from '@bloobirds-it/hooks/src';
import {
  BobjectId,
  BobjectTypes,
  MIXPANEL_EVENTS,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { MessagesEvents } from '@bloobirds-it/types/src';
import { api, getReferencedBobject, getUserTimeZone, isBeforeToday } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { useTaskManagementContext } from '../../../../../../hooks/useTaskManagement';
import { TaskFeedTask } from '../../../../../../types/taskManagement.types';
import styles from '../../taskCard.module.css';
import { EditTaskButton } from './components/editTaskButton';
import { TaskPriorityButton } from './components/priorityButton';
import { RescheduleTaskButton } from './components/rescheduleButton';
import { SkipTaskButton } from './components/skipTaskButton';

enum ButtonStatus {
  Idle = 'idle',
  Processing = 'processing',
  Completed = 'completed',
}

export const TaskButtons = ({
  task,
  setBanished,
  setIsProcessing,
}: {
  task: TaskFeedTask;
  setBanished: () => void;
  setIsProcessing: (value: boolean) => void;
}) => {
  const [buttonStatus, setButtonStatus] = useState(ButtonStatus.Idle);
  const { currentTasksProps } = useTaskManagementContext();
  const { configuration, mutate } = currentTasksProps || {};
  const { settings } = useActiveUserSettings();
  const { logCustomActivity } = useQuickLogActivity();
  const hasAutoLogCustomActivity = settings?.user?.autoLogCustomActivity;
  const { t } = useTranslation();
  const { logActivityFromTask } = useActivities();

  // data needed from task
  const referencedBobject = getReferencedBobject(task as any);
  const type = task.type as TASK_TYPE;

  const isOverdue = isBeforeToday(new Date(task.scheduledDatetime), getUserTimeZone());
  const canEditTask = type === TASK_TYPE.NEXT_STEP;
  const isSkippable = task.skippable;
  const isCallAction = canEditTask && task.actionCall;

  const company = task.company;

  // Logic when checking tasks
  const buttonData = { disabled: !(task.canBeMarkedAsDone || task.skippable), tooltip: '' };

  const { customTasks } = useCustomTasks();

  const customTaskId = task?.customTaskId;
  const customTask = customTasks?.find(ct => ct.id === customTaskId);

  function handleHideAndComplete() {
    setButtonStatus(ButtonStatus.Completed);
    createToast({ type: 'success', message: t('tasks.toasts.completedSuccess') });

    setTimeout(() => {
      mutate?.();
      setBanished();
      setIsProcessing(false);
    }, 400);
  }

  const handleMarkAsDone = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    event?.preventDefault();
    event?.stopPropagation();
    setButtonStatus(ButtonStatus.Processing);
    setIsProcessing(true);
    api
      .patch(`/bobjects/${id}/raw`, {
        contents: {
          [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
        },
        params: {
          skipEmptyUpdates: true,
        },
      })
      .then(() => {
        if (hasAutoLogCustomActivity && customTask) {
          logCustomActivity({
            customTask,
            selectedBobject: referencedBobject,
            leads: [],
            companyId: company?.id as BobjectId<BobjectTypes.Company>['value'],
            company: company as any,
          });
        }
        if (isCallAction) {
          logActivityFromTask({
            taskId: task?.id,
            callback: () => {
              window.dispatchEvent(
                new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                  detail: { type: BobjectTypes.Activity },
                }),
              );
            },
          });
        }
        handleHideAndComplete();
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        paddingRight: '16px',
      }}
    >
      <div className={styles.cardButtons}>
        {canEditTask && <EditTaskButton task={task} />}
        {!!configuration?.canSeeImportance && <TaskPriorityButton task={task} />}
        <RescheduleTaskButton task={task} />
        {isSkippable && (
          <SkipTaskButton task={{ id: { value: task.id } }} onBanish={() => setBanished()} />
        )}
        <Tooltip title={buttonData?.tooltip} position="top">
          <CardButton
            dataTest="home-MarkAsDone"
            iconLeft={buttonStatus === ButtonStatus.Idle ? 'check' : undefined}
            variant={buttonData.disabled ? 'secondary' : 'primary'}
            color={buttonData.disabled ? 'verySoftPeanut' : 'bloobirds'}
            className={clsx(styles._mark_as_done, {
              [styles._mark_as_done_clicked]: buttonStatus === ButtonStatus.Completed,
            })}
            onClick={event => {
              mixpanel.track(MIXPANEL_EVENTS.HOME_MARK_AS_DONE_ACTION_CLICKED_ON_SINGLE_CARD);
              handleMarkAsDone(event, task?.id);
            }}
            disabled={buttonData.disabled}
            size="small"
          >
            {buttonStatus === ButtonStatus.Processing && (
              <div>
                <Spinner name="loadingCircle" size={10} color="melon" />
              </div>
            )}
          </CardButton>
        </Tooltip>
      </div>
    </div>
  );
};
