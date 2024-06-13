import React from 'react';

import {
  IconButton,
  Modal,
  ModalCloseIcon,
  ModalHeader,
  ModalTitle,
} from '@bloobirds-it/flamingo-ui';
import { TaskForm, useTaskForm } from '@bloobirds-it/tasks';

import styles from './taskModalWrapper.css';

export const TaskModalWrapper = ({ id }: { id: string }) => {
  const taskFormHookValues = useTaskForm(id);
  const { isEditionModal, handleMinimize, handleClose } = taskFormHookValues || {};

  return (
    <Modal open={true} onClose={handleClose} width={460}>
      <ModalHeader size="small">
        <ModalTitle size="small" icon="checkDouble">
          {isEditionModal ? 'Edit' : 'Create'} task
        </ModalTitle>
        <div>
          <IconButton
            name="minus"
            size={24}
            onClick={() => {
              // @ts-ignore
              handleMinimize();
            }}
          />
          <ModalCloseIcon onClick={handleClose} size="small" />
        </div>
      </ModalHeader>
      <div className={styles.container}>
        <TaskForm isWebapp modalId={id} {...taskFormHookValues} />
      </div>
    </Modal>
  );
};

export default TaskModalWrapper;
