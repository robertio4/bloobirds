import { Modal, ModalContent, ModalFooter } from '@bloobirds-it/flamingo-ui';
import React, { ReactNode } from 'react';
import styles from './confirmModal.module.css';

interface ConfirmModalProps {
  title: string;
  open?: boolean;
  body: ReactNode;
  buttons: Array<ReactNode>;
  onClose?: (value: any) => void;
}

const ConfirmModal = ({ title, open, onClose, body, buttons }: ConfirmModalProps) => {
  return (
    <Modal width={640} title={title} open={open} onClose={onClose}>
      <ModalContent>
        <div className={styles.content}>{body}</div>
      </ModalContent>
      <ModalFooter>{buttons}</ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
