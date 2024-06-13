import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Text,
  ModalFooter,
  Button,
  ModalCloseIcon,
  Spinner,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import styles from '../workflowsPage.module.css';
import { useWorkflows } from '../../useAutomationsEdition';
import { useWorkflow } from '../../workflowEditionPage/context/workflowsContext';

export const WorkflowCounterResetModal = ({ onClose, onSave }) => {
  const { handleResetWorkflowRuns } = useWorkflows();
  const {
    state: {
      id,
      trigger: { bobjectType },
    },
  } = useWorkflow();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createToast } = useToasts();

  const resetRuns = () => {
    handleResetWorkflowRuns(id)
      .then(() => {
        createToast({ message: 'Workflow runs reset successfully', type: 'success' });
        setIsSubmitting(false);
        onClose();
        onSave();
      })
      .catch(() => {
        setIsSubmitting(false);
        createToast({ message: 'There has been an error', type: 'error' });
        onClose();
      });
  };

  return (
    <Modal width={640} open onClose={() => {}}>
      <ModalHeader>
        <ModalTitle>
          <div className={styles._title__container}>
            <Text size="l">Counter reset</Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <Text size="m" color="peanut" className={styles._main_info__text}>
          Do you want the {bobjectType.toLowerCase()} that had already been through this workflow to
          be passed in again?
        </Text>
      </ModalContent>
      <ModalFooter>
        <Button
          variant="clear"
          color="tomato"
          onClick={() => {
            onSave();
            onClose();
          }}
        >
          CANCEL
        </Button>
        <Button onClick={resetRuns}>
          {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : <>SAVE</>}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
