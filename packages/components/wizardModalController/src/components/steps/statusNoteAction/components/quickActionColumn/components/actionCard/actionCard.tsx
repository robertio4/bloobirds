import { MouseEventHandler } from 'react';

import { ColorType, Icon, IconType, Spinner, Text, useHover } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE } from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getValueFromLogicRole,
  isAutomatedEmailTask,
  isCadenceTask,
  isCallTask,
  isEmailTask,
  isLinkedinMessageTask,
  isMeetingTypeTask,
  isScheduledTask,
} from '@bloobirds-it/utils';

import { useStatusNoteActionContext } from '../../../../hooks/useStatusNoteActions';
import { TASK_STATE } from '../../../../types/statusNoteActions.types';
import styles from './actionCard.module.css';

export const TaskIconDisplay = ({ bobject, size = 18 }: { bobject: Bobject; size?: number }) => {
  const isScheduled = isScheduledTask(bobject);
  const isCadence = isCadenceTask(bobject);
  const isCall = isCallTask(bobject);
  const isEmail = isEmailTask(bobject);
  const isAutomatedEmail = isAutomatedEmailTask(bobject);
  const isLinkedinMessage = isLinkedinMessageTask(bobject);
  const isMeeting = isMeetingTypeTask(bobject);
  const isScheduledEmailTask =
    (getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE) as any)?.valueLogicRole ===
    TASK_TYPE.SCHEDULED_EMAIL;
  const { customTasks } = useCustomTasks();
  const customTaskId = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct?.id === customTaskId?.value);

  return (
    <>
      {isScheduled && !customTask && (
        <>
          {!isCall && !isEmail && !isLinkedinMessage && (
            <Icon size={size} name="clock" color="melon" />
          )}
          {isCall && <Icon size={size} name="phone" color="melon" />}
          {isEmail && <Icon size={size} name="mail" color="tangerine" />}
          {isLinkedinMessage && <Icon size={size} name="linkedin" color="darkBloobirds" />}
        </>
      )}
      {isMeeting && (
        <>
          <Icon size={size} name="calendar" color="tomato" />
        </>
      )}
      {isScheduledEmailTask && (
        <>
          <Icon size={size} name="scheduleMail" color="tangerine" />
        </>
      )}
      {isAutomatedEmail && (
        <>
          <Icon size={size} name="autoMail" color="tangerine" />
        </>
      )}
      {isCadence && !isAutomatedEmail && !customTask && (
        <>
          {isCall && <Icon size={size} name="phone" color="melon" />}
          {isEmail && <Icon size={size} name="mail" color="tangerine" />}
          {isLinkedinMessage && <Icon size={size} name="linkedin" color="darkBloobirds" />}
        </>
      )}
      {customTask && (
        <>
          <Icon name={customTask.icon} color={customTask.iconColor} size={size} />
        </>
      )}
    </>
  );
};

const backgroundDictionary: Record<'tangerine' | 'bloobirds' | 'whatsapp', string> = {
  bloobirds: '#F6FAFD',
  tangerine: '#FCF7F4',
  whatsapp: '#F4FDF8',
};

const applyHoverStyles = (event, color) => {
  const element = event.currentTarget;
  if (element) {
    element.style.backgroundColor = backgroundDictionary[color] || `var(--verySoft${color})`;
  }
};

const removeHoverStyles: MouseEventHandler<HTMLDivElement> = event => {
  const element = event.currentTarget;
  if (element) {
    element.style.backgroundColor = ''; // Revert to default
  }
};

function ActionIcon({
  icon,
  color,
  status,
}: {
  icon: IconType;
  color: ColorType;
  status: TASK_STATE;
}) {
  const isCompleted = status === TASK_STATE.COMPLETED;
  return (
    <div
      style={{
        width: '44px',
        height: '44px',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        backgroundColor: isCompleted ? 'var(--melon)' : `var(--${color})`,
      }}
    >
      {status === TASK_STATE.COMPLETING ? (
        <Spinner name="loadingCircle" size={32} color="white" />
      ) : (
        <Icon name={isCompleted ? 'checkDouble' : icon} size={32} color="white" />
      )}
    </div>
  );
}

function ActionContent({ task }) {
  const { t } = useStatusNoteActionContext();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Text size="s" weight="bold">
          {task?.title
            ? t('quickActionColumn.actionCard.' + task.title)
            : t('quickActionColumn.actionCard.completeCurrentTask')}
        </Text>
        {!task.description && (
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <TaskIconDisplay bobject={task} />
            <Text size="s">{getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE)}</Text>
          </div>
        )}
      </div>
      <Text size="xs" color="softPeanut">
        {task.description
          ? t('quickActionColumn.actionCard.' + task.description)
          : getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)}
      </Text>
    </div>
  );
}
const ImportantFlag = ({ color }) => {
  return (
    <div style={{ position: 'absolute', top: '-6px', right: '2px' }}>
      <Icon name="bookmark_big" size={24} color={color} />
    </div>
  );
};

function getIcon(icon, isHovered, task) {
  if (isHovered && icon === 'taskAction') {
    return task.title ? 'add' : 'check';
  }
  return icon;
}

export function ActionCard({
  icon,
  color,
  task,
  active,
  onClick,
  taskState,
}: {
  icon: IconType;
  color: ColorType;
  task?: Bobject<BobjectTypes.Task> | { title: string; description: string };
  active: boolean;
  onClick?: () => void;
  taskState?: TASK_STATE;
}) {
  const [ref, isHovered] = useHover();
  const isCompleted = icon === 'taskAction' && taskState === TASK_STATE.COMPLETED;
  return (
    <div
      className={styles.actionCard}
      style={{
        border: isCompleted ? `1px solid #D9F0C0` : `1px solid var(--${color})`,
        borderLeft: isCompleted ? `4px solid #D9F0C0` : `4px solid var(--${color})`,
      }}
      ref={ref}
      onMouseEnter={e => applyHoverStyles(e, color)}
      onMouseLeave={removeHoverStyles}
      onClick={onClick}
    >
      <ActionIcon icon={getIcon(icon, isHovered, task)} color={color} status={taskState} />
      <ActionContent task={task} />
      {active && !isCompleted && <ImportantFlag color={color} />}
    </div>
  );
}
