import { useState } from 'react';

import { createToast } from '@bloobirds-it/flamingo-ui';
import {
  checkIsOverdue,
  useBaseSetEmailVariablesValues,
  useMinimizableModals,
} from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, EMAIL_MODE, getValueFromLogicRole, openWhatsAppWeb } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { useStatusNoteActionContext } from '../../hooks/useStatusNoteActions';
import { TASK_STATE } from '../../types/statusNoteActions.types';
import { ColumnHeader } from '../common/columnHeader';
import { ActionCard } from './components/actionCard/actionCard';
import styles from './quickActionColumn.module.css';

function forgeTask(icon, active) {
  //TODO translate
  switch (icon) {
    case 'mail':
      return {
        icon,
        title: 'email.title',
        description: active ? 'email.hasTask' : 'email.noTask',
      };
    case 'whatsapp':
      return {
        icon,
        title: 'whatsapp.title',
        description: active ? 'whatsapp.hasTask' : 'whatsapp.noTask',
      };
    case 'taskAction':
      return {
        icon,
        title: active ? 'task.activeTitle' : 'task.completedTitle',
        description: active ? 'task.hasTask' : 'task.noTask',
      };
  }
}

function Actions() {
  return (
    <div className={styles.quickActionContainer}>
      <QuickEmailCard />
      <QuickWhatsappCard />
      <QuickTaskForTodayCard />
    </div>
  );
}

export const QuickActionColumn = () => {
  const { t } = useStatusNoteActionContext();
  return (
    <>
      <ColumnHeader
        icon="zap"
        text={t('quickActionColumn.header')}
        subtext={t('quickActionColumn.description')}
      />
      <Actions />
    </>
  );
};

function QuickEmailCard() {
  const { hasEmailTask } = useStatusNoteActionContext();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const { openMinimizableModal } = useMinimizableModals();
  const { bobject, t, activityCompany, activityLead } = useStatusNoteActionContext();
  const defaultToLeadEmail = getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);

  function handleOnClick() {
    setEmailVariablesValue({
      company: null,
      // contextBobjects?.company?.rawBobject,
      lead: activityLead ? activityLead?.raw?.contents : null,
      opportunity: bobject?.id?.typeName === BobjectTypes.Opportunity ? bobject?.rawBobject : null,
    });
    openMinimizableModal({
      type: 'email',
      title: t('newEmail'),
      data: {
        template: {
          content: '',
          subject: '',
        },
        mode: EMAIL_MODE.SEND,
        activity: null,
        company: activityCompany ?? null,
        leads: [],
        ...(activityLead ? { lead: activityLead, defaultToEmail: defaultToLeadEmail } : {}),
      },
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  }
  return (
    <ActionCard
      icon="mail"
      color="tangerine"
      task={forgeTask('mail', hasEmailTask)}
      active={hasEmailTask}
      onClick={handleOnClick}
    />
  );
}

function getReferenceBobjectPhone(bobject): string {
  if (!bobject) return '';
  const bobjectType = bobject.id?.typeName;
  return (
    bobject.phoneNumbers?.[0] ||
    getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType]?.PHONE)
  );
}

function QuickWhatsappCard() {
  const { hasWhatsappTask, bobject, machineContext, activityLead } = useStatusNoteActionContext();
  const phone =
    getReferenceBobjectPhone(bobject) ||
    getReferenceBobjectPhone(machineContext?.referenceBobject) ||
    getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.PHONE);
  return (
    <ActionCard
      icon="whatsapp"
      color="whatsapp"
      task={forgeTask('whatsapp', hasWhatsappTask)}
      active={hasWhatsappTask}
      onClick={() => openWhatsAppWeb(true, phone)}
    />
  );
}

function completeTask(task: Bobject<BobjectTypes.Task>, setIsLoading) {
  const taskId = task?.id?.value;
  setIsLoading(TASK_STATE.COMPLETING);
  api
    .patch(`/bobjects/${taskId}/raw`, {
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
      mixpanel.track(MIXPANEL_EVENTS.COMPLETE_TASK_FROM_CONTACT_FLOW);
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.TaskCompleted, {
          detail: { id: taskId },
        }),
      );
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: { type: BobjectTypes.Task },
        }),
      );
      createToast({
        message: 'Task completed',
        type: 'success',
      });
      setIsLoading(TASK_STATE.COMPLETED);
    });
}

function QuickTaskForTodayCard() {
  const { taskForToday, bobject } = useStatusNoteActionContext();
  const [taskState, setTaskState] = useState<TASK_STATE>(TASK_STATE.IDLE);
  const { openMinimizableModal } = useMinimizableModals();
  const isCompleted = taskState === TASK_STATE.COMPLETED;
  if (taskForToday) {
    return (
      <ActionCard
        icon="taskAction"
        color="bloobirds"
        task={
          taskState === TASK_STATE.COMPLETED
            ? { ...taskForToday, title: 'Completed 🚀' }
            : taskForToday
        }
        active={true}
        onClick={() => {
          if (taskState === TASK_STATE.IDLE) {
            completeTask(taskForToday as Bobject<BobjectTypes.Task>, setTaskState);
          }
        }}
        taskState={taskState}
      />
    );
  } else {
    return (
      <ActionCard
        icon="taskAction"
        color="bloobirds"
        active={true}
        task={forgeTask('taskAction', !isCompleted)}
        onClick={() => {
          if (!isCompleted) {
            openMinimizableModal({
              type: 'taskStatic',
              data: {
                [bobject?.id?.typeName?.toLowerCase()]: bobject,
                companyContext: undefined,
              },
              onSave: () => {
                setTaskState(TASK_STATE.COMPLETED);
              },
            });
          }
        }}
        taskState={taskState}
      />
    );
  }
}
