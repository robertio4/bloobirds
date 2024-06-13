import React from 'react';

import { Icon } from '@bloobirds-it/flamingo-ui';
import {
  CustomTask,
  TASK_ACTION,
  TASK_ACTION_VALUE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
  Bobject,
} from '@bloobirds-it/types';

import { getFieldByLogicRole } from '../../../../../utils/bobjects.utils';
import styles from './taskIconDisplay.module.css';

export const TaskIconDisplay = ({
  bobject,
  customTask,
}: {
  bobject: Bobject;
  customTask?: CustomTask;
}) => {
  const isScheduled =
    getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
    TASK_TYPE.NEXT_STEP;
  const isCadenceTask =
    getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
    TASK_TYPE.PROSPECT_CADENCE;
  const isCall =
    getFieldByLogicRole(bobject, TASK_ACTION.CALL)?.valueLogicRole === TASK_ACTION_VALUE.CALL_YES;
  const isEmail =
    getFieldByLogicRole(bobject, TASK_ACTION.EMAIL)?.valueLogicRole === TASK_ACTION_VALUE.EMAIL_YES;
  const isAutomatedEmail =
    getFieldByLogicRole(bobject, TASK_ACTION.AUTOMATED_EMAIL)?.valueLogicRole ===
    TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES;
  const isLinkedinMessage =
    getFieldByLogicRole(bobject, TASK_ACTION.LINKEDIN_MESSAGE)?.valueLogicRole ===
    TASK_ACTION_VALUE.LINKEDIN_MESSAGE_YES;
  const getMeetingType = () => {
    const taskType = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
    return taskType === TASK_TYPE.MEETING || taskType === TASK_TYPE?.CONTACT_BEFORE_MEETING;
  };
  const isMeeting = getMeetingType();

  return (
    <>
      {customTask && (
        <div className={styles._icons}>
          <Icon size={20} name={customTask.icon} color={customTask.iconColor} />
        </div>
      )}
      {isScheduled && !isCall && !isEmail && !isLinkedinMessage && !customTask && (
        <div className={styles._icons}>
          <Icon size={20} name="clock" color="melon" />
        </div>
      )}
      {isMeeting && (
        <div className={styles._icons}>
          <Icon size={20} name="calendar" color="tomato" />
        </div>
      )}
      {isAutomatedEmail && (
        <div className={styles._icons}>
          <Icon size={20} name="autoMail" color="tangerine" />
        </div>
      )}
      {isScheduled && (isCall || isEmail || isLinkedinMessage) && (
        <div className={styles._icons}>
          {isCall && <Icon size={20} name="phone" color="melon" />}
          {isEmail && <Icon size={20} name="mail" color="tangerine" />}
          {isLinkedinMessage && <Icon size={20} name="linkedin" color="darkBloobirds" />}
        </div>
      )}
      {isCadenceTask && !isAutomatedEmail && !customTask && (
        <div className={styles._icons}>
          <Icon
            size={20}
            name={isCall ? 'phone' : 'circle'}
            color={isCall ? 'melon' : 'lightPeanut'}
          />
          <Icon
            size={20}
            name={isEmail ? 'mail' : 'circle'}
            color={isEmail ? 'tangerine' : 'lightPeanut'}
          />
          <Icon
            size={20}
            name={isLinkedinMessage ? 'linkedin' : 'circle'}
            color={isLinkedinMessage ? 'darkBloobirds' : 'lightPeanut'}
          />
        </div>
      )}
    </>
  );
};
