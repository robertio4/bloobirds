import React from 'react';
import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './saveEditConfirmationModal.module.css';

type SaveEditConfirmationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};
export const SaveEditConfirmationModal = (props: SaveEditConfirmationModalProps) => {
  const { isOpen, handleClose, handleConfirm } = props;
  return (
    <Modal open={isOpen} onClose={handleClose} width={'550px'}>
      <ModalHeader>
        <ModalTitle>Change default view</ModalTitle>
        <ModalCloseIcon onClick={handleClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.modalContent}>
          <Text size={'m'}>This action will change the default view for all users.</Text>
          <Text size={'m'} weight={'bold'}>
            Do you wish to continue?
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={handleClose} color={'tomato'}>
          cancel
        </Button>
        <Button
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};
