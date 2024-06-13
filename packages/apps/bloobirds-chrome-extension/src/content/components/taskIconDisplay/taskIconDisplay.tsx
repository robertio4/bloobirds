import { Icon } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import { Bobject, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import {
  isAutomatedEmailTask,
  isCadenceTask,
  isCallTask,
  isEmailTask,
  isLinkedinMessageTask,
  isMeetingTypeTask,
  isScheduledTask,
} from '@bloobirds-it/utils';

import { getFieldByLogicRole } from '../../../utils/bobjects.utils';
import { TASK_TYPE } from '../../../utils/task';
import styles from './taskIconDisplay.module.css';

export const TaskIconDisplay = ({ bobject, size = 18 }: { bobject: Bobject; size?: number }) => {
  const isScheduled = isScheduledTask(bobject);
  const isCadence = isCadenceTask(bobject);
  const isCall = isCallTask(bobject);
  const isEmail = isEmailTask(bobject);
  const isAutomatedEmail = isAutomatedEmailTask(bobject);
  const isLinkedinMessage = isLinkedinMessageTask(bobject);
  const isMeeting = isMeetingTypeTask(bobject);
  const isScheduledEmailTask =
    getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
    TASK_TYPE.SCHEDULED_EMAIL;
  const { customTasks } = useCustomTasks();
  const customTaskId = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);

  return (
    <>
      {isScheduled && !customTask && (
        <div className={styles._icons}>
          {!isCall && !isEmail && !isLinkedinMessage && (
            <Icon size={size} name="clock" color="melon" />
          )}
          {isCall && <Icon size={size} name="phone" color="melon" />}
          {isEmail && <Icon size={size} name="mail" color="tangerine" />}
          {isLinkedinMessage && <Icon size={size} name="linkedin" color="darkBloobirds" />}
        </div>
      )}
      {isMeeting && (
        <div className={styles._icons}>
          <Icon size={size} name="calendar" color="tomato" />
        </div>
      )}
      {isScheduledEmailTask && (
        <div className={styles._icons}>
          <Icon size={size} name="scheduleMail" color="tangerine" />
        </div>
      )}
      {isAutomatedEmail && (
        <div className={styles._icons}>
          <Icon size={size} name="autoMail" color="tangerine" />
        </div>
      )}
      {isCadence && !isAutomatedEmail && !customTask && (
        <div className={styles._icons}>
          {isCall && <Icon size={size} name="phone" color="melon" />}
          {isEmail && <Icon size={size} name="mail" color="tangerine" />}
          {isLinkedinMessage && <Icon size={size} name="linkedin" color="darkBloobirds" />}
        </div>
      )}
      {customTask && (
        <div className={styles._icons}>
          <Icon name={customTask.icon} color={customTask.iconColor} size={size} />
        </div>
      )}
    </>
  );
};
