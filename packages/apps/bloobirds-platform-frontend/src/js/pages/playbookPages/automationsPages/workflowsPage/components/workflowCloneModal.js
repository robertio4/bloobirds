import {
  Input,
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
import { formatDate } from '@bloobirds-it/utils';

export const WorkflowCloneModal = ({ workflow, onClose }) => {
  const { handleCloneWorkflow } = useWorkflows();
  const cloneDate = formatDate(new Date(), 'MMM dd, yyyy');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(`Copy of ${workflow.name} - ${cloneDate}`);
  const { createToast } = useToasts();

  const cloneWorkflow = () => {
    handleCloneWorkflow(workflow.id, name)
      .then(() => {
        createToast({ message: 'Workflow cloned successfully', type: 'success' });
        setIsSubmitting(false);
        onClose();
      })
      .catch(() => {
        setIsSubmitting(false);
        createToast({ message: 'A workflow with that name already exists', type: 'error' });
      });
  };

  return (
    <Modal width={640} open onClose={() => {}}>
      <ModalHeader>
        <ModalTitle>
          <div className={styles._title__container}>
            <Text size="l">Clone workflow</Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <Text size="m" color="peanut" className={styles._main_info__text}>
          Enter a new name for the cloned workflow
        </Text>
        <Input
          placeholder="Workflow name"
          name="Workflow name"
          onChange={setName}
          value={name}
          className={styles._main_info__input}
          width="100%"
          color="purple"
        />
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" color="tomato" onClick={onClose}>
          CANCEL
        </Button>
        <Button onClick={cloneWorkflow}>
          {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : <>CLONE</>}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
