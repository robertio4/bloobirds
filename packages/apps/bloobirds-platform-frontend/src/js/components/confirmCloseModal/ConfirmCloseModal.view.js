import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, Text } from '@bloobirds-it/flamingo-ui';
import styles from './ConfirmCloseModal.module.css';
import { useMinimizableModal, useMinimizableModals } from '../../hooks/emails/useMinimizableModals';

const ConfirmCloseModal = () => {
  const { confirmationModal } = useMinimizableModals();
  const { open, id } = confirmationModal;
  const { closeModal, type, cancelConfirmModal } = useMinimizableModal(id);

  const handleDelete = () => {
    cancelConfirmModal();
    closeModal(id);
  };

  return (
    <Modal width={600} title={'Close'} open={open} onClose={cancelConfirmModal}>
      <ModalContent>
        <div className={styles._content}>
          <Text size="m">
            You already filled some information on your new {type?.toLowerCase()}
          </Text>
          <Text size="m">
            <b>This action cannot be undone</b>, are you sure you want to continue?
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={cancelConfirmModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          color="tomato"
          dataTest="deleteModalDeleteButton"
          onClick={handleDelete}
        >
          Discard
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmCloseModal;
