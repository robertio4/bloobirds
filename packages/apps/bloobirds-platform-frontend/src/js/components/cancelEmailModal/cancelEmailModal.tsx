import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import styles from './cancelEmailModal.module.css';
import useCancelEmail from '../../hooks/useCancelEmail';

const CancelEmailModal = ({ handleClose, open }: { handleClose: () => void; open: boolean }) => {
  const { cancelEmail, isSubmitting, bobject } = useCancelEmail();
  const isBulkAction = Array.isArray(bobject);

  return (
    <Modal title="Cancel email" open={open} onClose={handleClose} width={640}>
      <ModalContent>
        <div className={styles.text}>
          {!isBulkAction ? (
            <Text size="m" align="center">
              You are about to cancel this email, this action will delete the task and the email
              won&apos;t be sent.
              <br />
              <b>This action cannot be undone, are you sure you want to continue?</b>
            </Text>
          ) : (
            <Text size="m" align="center">
              You are about to cancel {bobject?.length} emails, this action will delete the tasks
              and the emails won&apos;t be sent.
              <br />
              <b>This action cannot be undone, are you sure you want to continue?</b>
            </Text>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={handleClose}>
          Back
        </Button>
        <Button color="tomato" onClick={cancelEmail}>
          {isSubmitting ? <Spinner color="white" size={14} name="loadingCircle" /> : 'Cancel email'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CancelEmailModal;
