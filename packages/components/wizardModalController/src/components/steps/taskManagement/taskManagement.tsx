import React from 'react';

import { Button, ModalContent, ModalFooter } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, MessagesEvents } from '@bloobirds-it/types';
import { EVENTS } from '@bloobirds-it/wizard-modal-context';

import CurrentTasks from './components/currentTasks';
import TaskActions from './components/taskActions';
import { TasksModalsController } from './components/taskModalsController';
import { TaskManagementProvider, useTaskManagementContext } from './hooks/useTaskManagement';
import styles from './taskManagement.module.css';

const withProvider = Component => props => {
  return (
    <TaskManagementProvider {...props}>
      <Component />
    </TaskManagementProvider>
  );
};

export const TaskManagementComponent = () => {
  const { t, send, buttonsConfig } = useTaskManagementContext();

  return (
    <>
      <ModalContent className={styles.modalContent}>
        <div className={styles.sectionContainer}>
          <CurrentTasks />
        </div>
        <div className={styles.sectionSeparator} />
        <div className={styles.sectionContainer}>
          <TaskActions />
        </div>
      </ModalContent>
      <ModalFooter className={styles._modal_footer}>
        <div>
          <Button variant="clear" onClick={() => send(EVENTS.PREVIOUS)} uppercase>
            {t('buttons.back')}
          </Button>
        </div>
        <Button
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Task },
              }),
            );
            send(EVENTS.FINISH);
          }}
          uppercase
        >
          {buttonsConfig?.nextButtonTitle || t('buttons.finish')}
        </Button>
      </ModalFooter>
      <TasksModalsController />
    </>
  );
};

export const TaskManagement = withProvider(TaskManagementComponent);
