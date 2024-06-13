import React, { useEffect } from 'react';

import { Button, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  BobjectTypes,
  Bobject,
} from '@bloobirds-it/types';
import { isSkippableTask } from '@bloobirds-it/utils';

import WithTooltip from '../../../../components/withTooltip/withTooltip';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { useTaskDone } from '../../../../hooks';
import { useBobjectChangesMonitor } from '../../../../hooks/useBobjectChangesMonitor';
import { api } from '../../../../utils/api';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { getButtonMarkAsDone } from '../../../../utils/tasks.utils';
import { SkipTaskButton } from '../../../subhomePages/components/subhomeCards/subcomponents/skipTaskButton';
import { useContactBobjects } from '../../contactPageContext';
import styles from './taskNavigator.module.css';

const getLead = (leads: Bobject<BobjectTypes.Lead>[], leadId: string) => {
  return leads?.find(l => l.id.value === leadId);
};

const TaskNavigator = ({
  finishNavigation,
  taskNavigation,
  isTaskCompleted,
}: {
  finishNavigation: () => void;
  taskNavigation: any;
  isTaskCompleted: () => boolean;
}) => {
  const {
    isFirstTask,
    isLastTask,
    goToFirstTask,
    goToLastTask,
    goToNextTask,
    goToPreviousTask,
    areAllTasksCompleted,
    tasks,
    index,
    setTaskAsCompleted,
    selectedTask,
  } = taskNavigation;
  const { status, type, automated, date, title, id: selectedTaskId } = selectedTask || {};
  const { showToast } = useTaskDone();
  const { company: activeCompany, active, leads } = useContactBobjects();
  const companyLastAttemptDate = getValueFromLogicRole(
    activeCompany,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  );
  const lead =
    active?.id.typeName === BobjectTypes.Lead
      ? active
      : getLead(leads, getValueFromLogicRole(activeCompany, LEAD_FIELDS_LOGIC_ROLE.COMPANY));
  const leadLastAttemptDate = lead
    ? getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY)
    : null;
  const markAsDoneControl = getButtonMarkAsDone({
    taskType: type,
    taskStatus: status,
    bobjectLastAttemptDate: leadLastAttemptDate || companyLastAttemptDate,
    taskDateField: date,
    taskIsAutomated: automated,
  });
  const isSkippable = isSkippableTask(selectedTask);
  const { hasChanged, bobjectChanged } = useBobjectChangesMonitor(selectedTaskId?.value, 'Task');

  useEffect(() => {
    if (bobjectChanged > 0 && selectedTaskId && !isTaskCompleted()) {
      api.get(`/bobjects/${selectedTaskId?.value}/form`).then(result => {
        const taskStatus = getFieldByLogicRole(result?.data, TASK_FIELDS_LOGIC_ROLE.STATUS)
          ?.valueLogicRole;
        if (
          taskStatus === TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED ||
          taskStatus === TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE
        ) {
          setTaskAsCompleted(result?.data?.id?.objectId);
        }
      });
    }
  }, [hasChanged, bobjectChanged]);

  return (
    <div className={styles._container}>
      {areAllTasksCompleted ? (
        <Text size="m" color="white">
          All tasks completed{' '}
          <span role="img" aria-label="rocket-emoji">
            🚀
          </span>
        </Text>
      ) : (
        <>
          <div className={styles._currentTask__container}>
            <Text size="s" color="white">
              {title}
            </Text>
            {isSkippable && <SkipTaskButton task={selectedTask} variant="tertiary" />}
            <WithTooltip
              title={markAsDoneControl?.tooltip}
              isDisabled={markAsDoneControl?.disabled}
              position="bottom"
            >
              <Button
                iconLeft="check"
                variant="tertiary"
                onClick={() => {
                  const selectedTaskIdValue = selectedTaskId?.objectId;
                  if (!isTaskCompleted() && selectedTaskIdValue) {
                    showToast(true, selectedTaskIdValue);
                  }
                }}
                size="small"
                disabled={markAsDoneControl?.disabled || isTaskCompleted()}
              >
                {isTaskCompleted() ? 'Completed' : 'Mark as Done'}
              </Button>
            </WithTooltip>
          </div>
          <div className={styles._paginator__container}>
            <IconButton
              size={16}
              color="white"
              name="chevronFirst"
              onClick={goToFirstTask}
              disabled={isFirstTask}
            />
            <IconButton
              size={16}
              color="white"
              name="chevronLeft"
              onClick={goToPreviousTask}
              disabled={isFirstTask}
            />
            <div className={styles._paginator__text}>
              <Text size="s" inline color="white">
                <b>{`${index + 1}/${tasks.length}`}</b> tasks <b>To do</b>
              </Text>
            </div>
            <IconButton
              size={16}
              color="white"
              name="chevronRight"
              onClick={goToNextTask}
              disabled={isLastTask}
              dataTest="button-next-task"
            />
            <IconButton
              size={16}
              color="white"
              name="chevronLast"
              onClick={goToLastTask}
              disabled={isLastTask}
            />
          </div>
        </>
      )}
      <div className={styles._actions__container}>
        <Button
          size="small"
          variant="clear"
          color="white"
          iconRight="cross"
          onClick={finishNavigation}
        >
          Exit
        </Button>
      </div>
    </div>
  );
};

export default TaskNavigator;
