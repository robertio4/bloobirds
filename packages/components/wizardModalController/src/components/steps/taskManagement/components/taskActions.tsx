import React from 'react';

import { Icon, IconType, Skeleton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { useTaskManagementContext } from '../hooks/useTaskManagement';
import styles from '../taskManagement.module.css';
import { Actions, TaskActionStates, TaskManagementModals } from '../types/taskManagement.types';

const ActionDetails: Record<
  Actions,
  { title: string; icon: IconType; modal: TaskManagementModals }
> = {
  [Actions.StopCadence]: {
    icon: 'slash',
    title: 'stopCadence',
    modal: TaskManagementModals.StopCadence,
  },
  [Actions.AddNextSteps]: {
    icon: 'taskAction',
    title: 'addNextSteps',
    modal: TaskManagementModals.NextStep,
  },
  [Actions.StartCadence]: {
    icon: 'plus',
    title: 'startCadence',
    modal: TaskManagementModals.StartCadence,
  },
  [Actions.ChangeCadence]: {
    icon: 'plus',
    title: 'changeCadence',
    modal: TaskManagementModals.StartCadence,
  },
  [Actions.RescheduleCadence]: {
    icon: 'cadenceUpdate',
    title: 'rescheduleCadence',
    modal: TaskManagementModals.RescheduleCadence,
  },
};

const StateActions: Record<
  TaskActionStates,
  {
    title: string;
    subtitle: string;
    icon: IconType;
    actions: Actions[];
  }
> = {
  [TaskActionStates.CadenceOnGoing]: {
    title: 'cadenceOnGoing',
    subtitle: 'cadenceOnGoingSubtitle',
    icon: 'cadence',
    actions: [
      Actions.AddNextSteps,
      Actions.ChangeCadence,
      Actions.RescheduleCadence,
      Actions.StopCadence,
    ],
  },
  [TaskActionStates.NoTasks]: {
    title: 'noTasks',
    subtitle: 'noTasksSubtitle',
    icon: 'inbox',
    actions: [Actions.AddNextSteps, Actions.StartCadence],
  },
  [TaskActionStates.NextSteps]: {
    title: 'nextSteps',
    subtitle: 'nextStepsSubtitle',
    icon: 'taskAction',
    actions: [Actions.AddNextSteps, Actions.StartCadence],
  },
};

const ModalSkeleton = () => (
  <>
    <div className={styles.taskActionsIcon}>
      <Skeleton width={30} height={30} variant="rect" />
    </div>
    <div className={styles.taskActionsTitle}>
      <Skeleton width={132} height={32} variant="text" />
      <Skeleton width={154} height={26} variant="text" />
    </div>
  </>
);

const TaskActions = () => {
  const { t, stepState, currentTasksProps, machineContext } = useTaskManagementContext();
  const { icon, title, subtitle, actions } = StateActions[stepState];
  const { isLoading } = currentTasksProps || {};
  const { referenceBobject } = machineContext;
  const bobjectName = getValueFromLogicRole(
    referenceBobject,
    FIELDS_LOGIC_ROLE[referenceBobject?.id?.typeName].NAME,
  );

  return (
    <div className={styles.taskActionsWrapper}>
      {isLoading ? (
        <ModalSkeleton />
      ) : (
        <>
          <div className={styles.taskActionsIcon}>
            <Icon name={icon} color="white" size={32} />
          </div>
          <div className={styles.taskActionsTitle}>
            <Text>{t(`taskActions.titles.${title}`)}</Text>
            <Text size="m" color="softPeanut">
              {t(`taskActions.subtitles.${subtitle}`, { objectName: bobjectName })}
            </Text>
          </div>
        </>
      )}

      <div className={styles.actionButtonsWrapper}>
        {actions.map(action => (
          <ActionButton key={action} action={action} />
        ))}
      </div>
    </div>
  );
};

const ActionButton = ({ action }: { action: Actions }) => {
  const { title, icon, modal } = ActionDetails[action];
  const { t, setModalContext, currentTasksProps, lastModalOpened } = useTaskManagementContext();
  const { isLoading } = currentTasksProps || {};

  const onClick = () => {
    setModalContext({ modal });
  };

  return (
    <div
      className={clsx(styles.actionButton, {
        [styles.actionButtonDisabled]: isLoading && modal !== lastModalOpened?.current,
      })}
      onClick={!isLoading ? onClick : () => {}}
    >
      {isLoading && modal === lastModalOpened?.current ? (
        <Spinner name="loadingCircle" size={16} />
      ) : (
        <Icon name={icon} color={isLoading ? 'softPeanut' : 'bloobirds'} />
      )}
      <Text size="s" color={isLoading ? 'softPeanut' : 'bloobirds'}>
        {t(
          `taskActions.buttonsTitle.${
            title + (isLoading && modal === lastModalOpened?.current ? 'Loading' : '')
          }`,
        )}
      </Text>
    </div>
  );
};

export default TaskActions;
